---
title: "[행쇼마켓][트러블슈팅] 성능 최적화"
excerpt: "미사용 패키지 제거, Navi 서버 컴포넌트 전환, 이미지 sizes 지정으로 CLS를 0.608에서 0.000으로 낮추고, 상품 등록 폼과 카테고리 선택 컴포넌트의 중복 코드·무한 렌더링 문제를 함께 정리한 과정을 기록합니다."
date: "2026-09-30"
category: "트러블슈팅"
project: "행쇼마켓"
tags: ["Next.js", "성능 최적화", "CLS", "리팩토링"]
---

프로젝트 마무리 단계에서 성능 점수를 측정해 보니 기대보다 낮게 나왔고, 페이지를 불러올 때 Footer가 아래로 밀리는 레이아웃 이동(CLS)도 눈에 띄었다. 번들 크기, 렌더링 방식, 이미지 로딩을 차례로 점검하면서, 같은 시기에 상품 등록 폼에서 발견한 문제들도 함께 정리했다.

## 1. 미사용 패키지 제거

### 문제 상황

- `three`, `@react-three/fiber`, `@react-three/drei`, `@types/three` 패키지가 설치되어 있었다.
- 프로젝트 안에 실제로 사용하는 곳이 없었지만 번들에 포함되어 약 600KB를 차지하고 있었다.

### 해결 과정

- 네 패키지를 모두 제거했다.

### 결과

- 성능 점수가 61점에서 71점으로 올랐다. 쓰지 않는 코드를 내려받느라 낭비되던 용량이 사라졌다.

---

## 2. RegisterProductForm 리팩토링

### 문제 상황

- 인풋마다 `value`, `onChange`, `onBlur`, `error` 4개의 props를 직접 전달하고 있었다.
- `handleInputChange`, `handleBlur` 함수가 따로 있어서 같은 코드가 반복되었다.

```tsx
<ProductName
  value={form.productName ?? ''}
  error={clientErrors.productName || serverErrors?.productName}
  onChange={(value) => handleInputChange('productName', value)}
  onBlur={() => handleBlur('productName')}
/>
```

### 해결 과정

- `getInputProps`로 4개의 props를 하나로 묶어, 인풋마다 한 줄로 연결되도록 줄였다.
- `ProductForm` 타입에서 `productImage`, `productOptions`를 빼고, 각각 별도의 상태로 관리하도록 나눴다.
- `validateProductForm`의 정규식을 고쳐 한글, 영어, 숫자, 이모지를 모두 허용하도록 했다.

### 결과

- 인풋을 추가할 때 props 4개와 핸들러를 매번 반복해서 쓰지 않아도 되었다.

---

## 3. 취소 버튼 및 모달 구현

### 문제 상황

- 상품 등록 폼에 취소 기능이 없었다.
- 입력한 내용을 초기화하는 기능도 없었다.

### 해결 과정

- `CancelButton` 컴포넌트를 분리하고, 모달과 라우터를 컴포넌트 안에서 직접 관리하도록 했다.
- 입력값이 있을 때만 확인 모달을 띄운 뒤 페이지를 이동하게 했다.
- 폼 초기값을 `INITIAL_FORM` 상수 하나로 모았다.
- `onConfirm` 시 `form`, `imgForm`, `optionForm`, `categoryKey`를 모두 초기화하게 했다.
- 입력 여부(`isInputted`)를 판단하는 범위를 `form`, `imgForm.preview`, `optionForm.state.options`까지 넓혔다.
- `useOptionForm`에 `resetOptions` 함수를 추가했다.

### 결과

- 이미지나 옵션만 입력한 상태에서도 취소 시 확인 모달이 뜨고, 확인하면 폼 전체가 처음 상태로 돌아간다.

---

## 4. CategorySelector 무한 렌더링

### 문제 상황

- `useState`와 `prevValue` 패턴으로, 렌더링 도중에 `setState`를 직접 호출하고 있었다.
- 그 결과 `Too many re-renders` 에러와 함께 무한 루프가 발생했다.

```tsx
if (value !== prevValue) {
  setPrevValue(value)
  setSelectedGroup(...)
} else {
  setSelectedGroup('')
  setSelectedCategory('')
}
```

### 원인

- `value`가 바뀌지 않은 경우에도 `else` 분기에서 매 렌더링마다 `setState`가 호출되었다. 상태가 바뀌면 다시 렌더링되고, 다시 `setState`가 호출되는 과정이 끝없이 반복되었다.

### 해결 과정

- 선택된 카테고리는 상태로 따로 두지 않고 `value`에서 바로 계산하도록 바꿨다.
- 대분류(`selectedGroup`)만 `useState`로 관리하게 했다.
- 외부에서 선택값을 초기화해야 할 때는 `categoryKey` prop을 바꿔 컴포넌트를 리마운트하는 방식을 적용했다.

### 결과

- 무한 루프가 더 이상 발생하지 않는다. 취소 버튼으로 폼을 초기화할 때 카테고리 선택도 함께 초기화된다.

---

## 5. Navi 서버 컴포넌트 분리 (CLS 개선)

### 문제 상황

- 페이지를 불러올 때 `Footer`가 아래로 밀리는 레이아웃 이동이 발생했다.
- CLS가 0.608 ~ 0.746으로 측정되었다.

### 원인

- `Navi.tsx` 전체가 `'use client'`로 선언된 클라이언트 컴포넌트였다.
- 그래서 서버에서 미리 렌더링되지 않았고, 클라이언트에서 뒤늦게 그려지면서 아래 콘텐츠를 밀어냈다.

### 해결 과정

- 클라이언트 기능이 필요한 `usePathname` 로직만 `LogoSection.tsx`로 분리했다.
- `Navi.tsx`에서 `'use client'`를 제거해 서버 컴포넌트로 전환했다.
- `Header.tsx`에는 `'use client'`를 명시적으로 추가했다.

### 결과

- CLS가 0.000이 되었다. 페이지를 처음 불러올 때 내비게이션이 서버에서 함께 렌더링되어 `Footer`가 밀리지 않는다.

---

## 6. 이미지 최적화

### 문제 상황

- `SellerProductItemCard`의 `Image` 컴포넌트에 `sizes`가 지정되어 있지 않았다.
- `SwiperSection`에서 사용하지 않는 `swiper/css/scrollbar`를 import하고 있었다.

### 원인

- `sizes`가 없으면 Next.js는 뷰포트 전체 너비를 기준으로 이미지를 고른다. 그래서 80px로 보이는 썸네일도 필요 이상으로 큰 이미지를 불러오고 있었다.

### 해결 과정

- `sizes="80px"`를 추가해 실제로 보이는 크기에 맞는 이미지만 불러오도록 했다.
- 사용하지 않는 CSS import를 제거했다.

### 결과

- 판매자 상품 목록의 썸네일이 실제 표시 크기에 맞는 이미지로 로드된다.

---

## 성능 점수 변화

| 측정 시점 | 점수 |
| --- | --- |
| 작업 전 | 61점 |
| three.js 제거 후 | 71점 |
| 최종 | 82점 |

### 소비자 페이지

![소비자 페이지 성능 측정 결과](https://github.com/user-attachments/assets/62544ae2-92c8-4f6a-8cfc-45bbfcba4f70)

### 판매자 페이지

![판매자 페이지 성능 측정 결과](https://github.com/user-attachments/assets/9d0622cd-6e20-4c82-b75f-a50f4b7f7761)

## 배운 점

- 설치만 해 두고 쓰지 않는 패키지도 번들 크기와 성능 점수에 그대로 반영된다. 의존성은 주기적으로 정리해야 한다.
- `'use client'`는 필요한 부분에만 선언해야 한다. 작은 로직 하나 때문에 컴포넌트 전체를 클라이언트로 만들면 서버 렌더링의 이점을 잃고 레이아웃 이동까지 생길 수 있다.
- 렌더링 중에 `setState`를 호출하면 무한 루프로 이어지기 쉽다. props에서 계산할 수 있는 값은 상태로 따로 두지 않는 것이 더 안전하다.
