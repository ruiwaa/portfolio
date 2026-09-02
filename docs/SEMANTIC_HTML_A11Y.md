# SEMANTIC_HTML_A11Y.md - 시멘틱 HTML & 접근성

**WCAG 2.1 AA 기준 준수**

---

## 11가지 패턴

1. **아이콘**: 의미 있는 아이콘은 `aria-label`, 장식용은 `aria-hidden="true"`

2. **폼**: 모든 input에 `<label htmlFor>` 명시적 연결

3. **에러 메시지**: `aria-describedby`로 input과 연결, `aria-invalid="true"` 표시

4. **버튼 vs 링크**: 액션 실행은 `<button>`, 페이지 이동은 `<a>`/`<Link>`

5. **포커스 순서**: DOM 순서와 시각적 순서를 일치시켜 자연스러운 Tab 이동 보장

6. **동적 콘텐츠**: 필터링/로딩 등 변경 사항은 `aria-live="polite"`로 알림

7. **색상 의존 금지**: 색상만으로 정보 전달 금지, 아이콘/텍스트 병행

8. **이미지 alt**: 의미 있는 이미지는 설명적 alt, 장식용은 `alt=""`

9. **헤딩 계층**: h1 → h2 → h3 순서 유지, 단계 건너뛰기 금지

10. **컴포넌트 역할**: 탭은 `role="tablist/tab/tabpanel"`, 모달은 `role="dialog"` + `aria-modal="true"`

11. **포커스 인디케이터**: 모든 인터랙티브 요소에 `focus-visible` 스타일 필수 (2px solid, offset 2px)

---

## 색상 대비 기준

- 일반 텍스트: 4.5:1 이상
- 큰 텍스트(18px+ bold 또는 24px+): 3:1 이상
- 라이트 모드: `#1A1A1A on #FFFFFF` → 21:1 (충분)
- 다크 모드: `#FFFFFF on #141313` → 19.4:1 (충분)

## 시멘틱 태그 필수 사용

```
<header> 네비게이션 영역
<nav>    메뉴 그룹
<main>   페이지 핵심 콘텐츠 (페이지당 1개)
<section> 의미 있는 콘텐츠 그룹
<article> 독립적으로 읽힐 수 있는 콘텐츠 (포스트 카드 등)
<footer> 하단 정보
```

## 체크리스트

- [ ] 모든 인터랙티브 요소 Tab으로 접근 가능
- [ ] 스크린리더로 페이지 구조 파악 가능
- [ ] 이미지 alt 텍스트 존재
- [ ] 포커스 인디케이터 명확
- [ ] 색상 대비 4.5:1 이상

---

**다음**: [`PERFORMANCE.md`](./PERFORMANCE.md)
