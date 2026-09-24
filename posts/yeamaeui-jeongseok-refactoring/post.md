---
title: "예매의 정석 코드 리펙토링 기록"
excerpt: "바닐라 프로젝트의 마크업 접근성과 자바스크립트 구조를 리팩토링하며, URLSearchParams로 탭 상태를 유지하고 중복 함수를 통합한 과정을 기록합니다."
date: "2026-03-04"
category: "트러블슈팅"
project: "예매의 정석"
tags: ["접근성", "리팩토링"]
---

  
  ## 1. 마크업 리팩토링
  
  접근성과 시맨틱한 마크업을 하기 위해서 리펙토링을 진행하였다.
  
  - 영화 포스터 이미지 접근성
  - 탭 버튼 접근성
  - 중복되는 컴포넌트 data attribute 부여하여 분리된 마크업 구조
  
  ### 1) 접근성을 고려한 마크업 리펙토링
  
  #### 1-1) 영화 포스터 이미지 수정
  
  alt 속성에 해당 영화 이름이 반영되게 수정하였고, 또한 이미지가 로딩되기전에 나오는 로딩 ui에 role="status" + aria-live 속성을 추가해주었다.
  
  ```
  (수정 전)
  
  <div class="img-container"><img src="https://i.ibb.co/TBKYb860/b-Akhvi-Eo-Hhtc-H5-tmoh-Ry-DDt-MEn36-2-Cf-wk-fqi-NILm-P1o1140e-H0-NUO2wret0et-EEDl8yrzcg4x6-HHLgk-Q.webp" class="movie-img" alt="영화 포스터"></div>
   <span class="loader"></span>
  
  ```
  
  ```
  (수정 후)
  
  <div class="img-container">
  <img src="https://i.ibb.co/TBKYb860/b-Akhvi-Eo-Hhtc-H5-tmoh-Ry-DDt-MEn36-2-Cf-wk-fqi-NILm-P1o1140e-H0-NUO2wret0et-EEDl8yrzcg4x6-HHLgk-Q.webp" class="movie-img" alt="휴민트"></div>
   <span class="loader" role="status" aria-label="로딩중"></span>
  
  
  ```
  
  #### 1-2) 탭 버튼 및 탭 패널
  
  - 기본 활성화 될 탭 버튼 지정
    (aria-selected = "true") 부여
  - 각 tabpanel에 aria-labelledby로 연결되는 탭 id 부여하기
  
  ```
  코드가 다소 길어,  수정 후 코드만  문서에 추가하였다.

(수정 전)

<div class="point-tabpanel" role="tabpanel" id="panel-1"></div>
<div class="point-tabpanel" role="tabpanel" id="panel-2"></div>

(수정 후)

<div class="point-tab" role="tablist">
<ul role="none">
<li role="none">
<button
                    class="lion-point-button"
                    id="tab-1"
                    type="button"
                    role="tab"
                    aria-controls="panel-1"
                    aria-selected="true"
                  >
Lion-POINT 조회
</button>
</li>
<li role="none">
<button
                    class="lion-point-button"
                    id="tab-2"
                    type="button"
                    role="tab"
                    aria-controls="panel-2"
                    aria-selected="false"
                    aria-label="lion-POINT 카드 번호로 적립"
                  >
Lion-POINT 카드 번호
</button>
</li>
</ul>
<div class="point-tabpanel" role="tabpanel" id="panel-1" aria-labelledby="tab-1">
<form class="lion-point-panel" method="post">
//탭 패널 1 해당 내용 ...
</form>
</div>

            <div class="point-tabpanel" role="tabpanel" id="panel-2" aria-labelledby="tab-2">
                  <form class="card-number-point-panel" method="post">
                    //탭 패널 2 해당 내용 ...
                  </form>
                </div>
            </div>

```

#### 1-3) 체크박스 접근성 속성 수정

- aria-disabled 오타 수정 및 초기값 누락 보완
- disabled는 키보드 조작조차도 접근을 막아버리므로, aria-disabled라는 접근 속성을 사용하여, 접근을 제어하는 것이 모든 사용자가 이용하기 편리한 구현이다.
수정 전
```

html<input type="checkbox" id="card-number-point" aria-disabled="fal" />

수정 후
html<input type="checkbox" id="card-number-point" aria-disabled="false" />
aria-disabled="fal" → "false" 오타 수정, 모든 하위 체크박스에 aria-disabled 초기값을 명시하여 보조기술이 상태를 올바르게 인식하도록 처리.

```

수정된 마크업에 따라서 자바스크립트 또한 수정을 하였다.
```

function checkboxAuth() {
const checked = EARN_POINTS_METHOD_CHECKBOX.checked;
const ALL_EARN_POINTS = CHECKBOX_CONTAINER.querySelectorAll('input[type= "checkbox"]');

if (!checked) {
attr(EARN_POINTS_METHOD_CHECKBOX, 'checked', null)
for (const point of ALL_EARN_POINTS) {
setAttr(point, 'aria-disabled', 'true');
removeAttr(point, 'checked');
}
} else {
attr(EARN_POINTS_METHOD_CHECKBOX, 'checked', 'true')
for (const point of ALL_EARN_POINTS) {
setAttr(point, 'aria-disabled', 'false');
}
}
}

```

### 2) 코드 품질을 고려한 마크업 리펙토링
-  탭 패널 1과 2에 중복되는 data-value="maximum-point" 버튼이 2개 있음
→ 자바스크립트에서 제어하기 용이하게  data attribute 추가
```

(수정 후)
패널 1)
<button
   type="button"
   data-value="maximum-point"
   data-action="apply-max-point"
   data-target="panel-1" > 최대 적용</button>

패널 2)
<button
  type="button"
  data-value="maximum-point"
  data-action="apply-max-point"
  data-target="panel-2" >최대 적용</button>

```
## 2. 할인 영역의  탭에  UrlSearchParams 사용
해당 탭을 클릭 시, 해당 탭 패널로 전환이 될 때  tab과 tabapanel의 id가 들어간 Url를 UrlSearchParams 사용한  함수를 추가하였다.
탭 클릭 시 발생하는 handelTabClick 함수 안에 url이 저장된 함수를  넣어주기  위해서 url를 저장하는 함수를  먼저 만들어 주었다.
URL과 URLSearchParams 함께 사용하여, 기존의  URL를 조작하는 방식으로 함수를 만들었다.

```

// url searchParams 사용하여, 해당 탭 패널 id 저장 함수
function setActiveTabUrl(tab, panelValue) {
const url = new URL(location.href);
url.searchParams.set('tab', tab.id);
url.searchParams.set('panel', panelValue);
history.pushState({}, '', url.toString()); // 해당 URL를 주소창에 업데이트 해주기
}

```

이렇게 한 후, 새로고침 시에 기존에 활성화가 되어있던 탭패널이 화면에 보여야 하기 때문에,  새로고침을 해당 페이지가 보이는 함수를 다시 만들어 줘야 했다.

새로 고침 시  해당 url의 활성화 된 Ui가 브라우저에 보여져야 하므로, 새로고침 url에 해당되는 타켓을 찾아서 활성화시켜주는 구조로 함수 구조를 구성했다.

```

// 새로고침 시, 현재 페이지의 url의 활성화 탭을 그대로 읽어오는 함수
function resetTabUrl() {
const resetUrl = new URL(location.href);
const tabId = resetUrl.searchParams.get('tab');

// 안전한 프로그래밍 해당 타켓이 아닐 시 즉시 함수 종료
if (!tabId) return;

// 해당 url의 해당 탭과 탭패널 찾은 후에 활성화 속성 부여
const target = document.getElementById(tabId);
const targetValue = getAttr(target, 'aria-controls');
const activeTargetPanel = document.getElementById(targetValue);
activeTab(target, activeTargetPanel);
}
resetTabUrl();

```


## 3. 자바스크립트 리팩토링

### 1) 접근성을 고려한 탭 및 탭패널 리펙토링

리펙토링이 필요한 부분들은 다음과 같다.

- 탭 버튼/패널 상태 변경 시 해당 탭 패널의 hidden + aria-labelledby 까지 함께 제어하기
 - 활성 탭: `aria-selected="true" tabindex="0"`
 - 비활성 탭: `aria-selected="false" tabindex="-1"`
 - 활성 패널: `hidden=false` / 비활성 패널: `hidden=true`
- `handleTabClick`에서 “hidden 처리”

이렇게 기능을 구현한 handleTabClick 함수는 다음과 같다.

```

function handleTabClick(e) {
if (!e.target.closest('.lion-point-button')) return;
removeAllActive(POINT_TABS, 'active'); // 모든 버튼 활성화 초기화
removeAllActive(LION_POINT_BUTTON, 'active');
setAllAttr(LION_POINT_BUTTON, 'aria-selected', 'false'); // 모든 버튼 접근성 속성 초기화
const target = e.target.closest('button'); // 부모요소에서 가장 가까운 버튼 찾기
const targetValue = getAttr(target, 'aria-controls'); // 해당 속성값 읽기
const activeTarget = document.getElementById(targetValue);
isActive(target);
isActive(activeTarget); // 해당되는 타켓에 active 클래스명 추가
attr(target, 'aria-selected', 'true');
attr(activeTarget, 'tabindex', '0'); // 해당되는 타켓에 상태 전환
attr(activeTarget, 'hidden', null); // 해당되는 타켓에 hidden 속성 삭제

// 비활성 패널 hidden 처리
POINT_TABS.forEach((panel) => {
if (panel !== activeTarget) {
attr(panel, 'hidden', '');
attr(panel, 'tabindex', '-1');
}
});
}

```

이렇게 하나의 함수에 활성화/ 비활성화 탭에 대한 제어를 동시에 하니 코드가 길어지고, 가독성이 떨어져 다시 탭 속성 초기화와 활성화 탭에 대한 함수를 나누고 최종적으로 handleTabClick 함수에 넣어주는 식의 구조를 설계했다.

```

(수정 후)
// url searchParams 사용하여, 해당 탭 패널 id 저장 함수
function setActiveTabUrl(panel) {
const url = new URL(location.href);
const panelValue = getAttr(panel, 'aria-controls');

url.searchParams.set('tab', panelValue);
history.pushState({}, '', url.toString());
}

// 새로고침 시, 현재 페이지의 url의 활성화 탭을 그대로 읽어오는 함수
function resetTabUrl() {
const resetUrl = new URL(location.href);
const panelId = resetUrl.searchParams.get('tab'); //해당 panel 찾기
const target = document.getElementById(panelId);
if (!panelId) return;
const targetValue = getAttr(target, 'aria-labelledby'); //해당 tab 찾기
const activeTargetPanel = document.getElementById(targetValue);
activeTab(target, activeTargetPanel);
}
resetTabUrl();
function handleTabClick(e) {
if (!e.target.closest('.lion-point-button')) return;
const target = e.target.closest('button'); // 부모요소에서 가장 가까운 버튼 찾기
const targetValue = getAttr(target, 'aria-controls'); // 해당 속성값 읽기
const activeTargetPanel = document.getElementById(targetValue);
resetTabsState(POINT_TABS, LION_POINT_BUTTON);
activeTab(target, activeTargetPanel);
}

```


### 2) 가드/라우팅 · 초기 진입 안정화를 위한 리펙토링
이하 목록들 위주로 초기 페이지 진입 시 가드 함수를 리펙토링하였다.
- redirectPage()에서 state를 외부 destructuring이 아니라 함수 인자로 받아 순수 함수 형태로 만들기
- 가드 조건을 “필수 state 키 목록”으로 표준화하기
- redirect 시 return으로 함수 흐름 종료 확실히 하기

```

(가드/ 라우팅 함수 수정 전)
const { price, movieId, timetableId, seats } = state;

redirectPage();
function redirectPage() {
if (movieId === null) {
location.href = '/src/page/main/index.html';
} else if (timetableId === null) {
location.href = '/src/page/booking/index.html';
} else if (!seats || seats.length === 0) {
location.href = '/src/page/seat/index.html';
} else return;
}

```

```

(수정 후)
// 함수 실행
redirectPage(state);

// state를 함수 인자로 받기
function redirectPage(state) {

// state의 필수 조건 목록 상수 선언
const required = ['movieId', 'timetableId', 'seats', 'price'];
if (state[required[0]] === null) {
return (location.href = '/src/page/main/index.html');
}
if (state[required[1]] === null) {
return (location.href = '/src/page/booking/index.html');
}
if (!state[required[2]] || state[required[2]].length === 0) {
return (location.href = '/src/page/seat/index.html');
}
return;
}

```

### 3) 이벤트 설계 · 역할 맞는 이벤트에 연결
버블링 오작동 또는  다소 어색한 UX 측면을  고려하여, 이벤트가 발생하는 요소에 적절한 이벤트를 연결해주는 설계 리펙토링 과정을 거쳤다.

### 3-1)  중복된 함수 하나로 합치기
#### 1)  포인트 검증 함수 리펙토링
패널 1과 패널 2에 동일하게 존재하는 요소의 적용되는 함수를 하나로 통일하기 위해서  마크업에 해당 요소에 공통으로 들어가는 데이터 속성(data-point)을  추가해주었다.
중복된 함수를 하나로 합친 후에 각 해당 패널의 전체적인 부분을 검증하는 함수 내부에 넣어주었다.

```

<마크업 수정 후>
<input
type="text"
id="use-current-point"
data-point
placeholder="포인트 입력(100p 단위로 사용가능)"
aria-describedby="panel-2-point-description"
                      />

(수정 전)
// 패널 1
function pointInputAuth(e) {
e.preventDefault();
if (!e.target) return;
const target = document.querySelector('[data-target]');
let value = parseInt(target.value, 10);
// 조건문 만들기
// 거짓: 숫자가 아니면 알림창 뜨기
// 참: 해당 값 표시
if (isNaN(value) || value % 100 !== 0 || value === 0) {
alert('100 단위로 포인트를 입력하세요');
return false;
}

return value;
}
// 패널 2
function currentInputAuth() {
const target = document.getElementById('use-current-point');
if (!target) return;
let value = parseInt(target.value, 10);
// 조건문 만들기
// 거짓: 숫자가 아니면 알림창 뜨기
// 참: 해당 값 표시
if (isNaN(value) || value % 100 !== 0 || value === 0) {
alert('포인트를 100 단위로 입력하세요');
return false;
}
return value;
}

```

```

(수정 후)

// 패널 1/ 패널 2
function pointInputAuth(e) {
e.preventDefault();
if (!e.target) return;
const form = e.target.closest('form');
const target = form.querySelector('[data-point]');
console.log(target);

let value = parseInt(target.value, 10);
// 조건문 만들기
// 거짓: 숫자가 아니면 알림창 뜨기
// 참: 해당 값 표시
if (isNaN(value) || value % 100 !== 0 || value === 0) {
alert('100 단위로 포인트를 입력하세요');
return false;
}

return value;
}

```

#### 2) 비밀번호 검증 함수 리펙토링
비밀번호 검증 함수 또한 패널별로 분리를 하였는데, 함수의 로직이 동일하므로, 하나로 통일을 하는 리펙토링 과정을 거쳤다.
```

(수정 전)
// 패널 1
function lionPointCardPasswordAuth() {
const target = document.querySelector('#card-point-password');
if (!target) return;
if (target.value.length < 6 || target.value.length > 8) {
alert('비밀번호를 6~8자리로 입력하세요');
return false;
} else {
return target.value;
}
}

//패널 2
function lionPointCardNumberPasswordAuth() {
const target = document.getElementById('card-number-password');
if (!target) return false;
if (target.value.length < 6 || target.value.length > 8) {
alert('비밀번호를 6~8자리로 입력하세요');
return false;
} else {
return target.value;
}
}

```


```

(수정 후)
// 패널 1/패널 2 공통 함수
function cardPasswordAuth(e) {
const form = e.target.closest('form');
const target = form.querySelector('input[type="password"]');
if (!target) return;
if (target.value.length < 6 || target.value.length > 8) {
alert('비밀번호를 6~8자리로 입력하세요');
return false;
} else {
return target.value;
}
}

```


### 3-2) 이벤트 설계에 맞는  이벤트 연결
#### 1) 최대 적용 이벤트를 공통 부모에 위임
-  “최대 적용”은 `POINT_TAB` 전체 click에 붙어있음 → 버블링 비용/오작동 위험
-  `.tabpanel-container` 또는 공통 부모에 위임하되 `data-action`으로 명확히 분기하기
```

(수정 전)

<button type="button" data-value="maximum-point">최대 적용</button>
const target = e.target.closest('[data-value="maximum-point"]');

(수정 후)
function maximumPoint(e) {
const target = e.target.closest('[data-target]');

if (!target) return;
const input = target.parentElement.querySelector('input');
e.preventDefault();
if (input.value === '' || input.value % 100 !== 0 || input.value === '0') {
return alert('포인트 최대 적용 실패 ❌');
}
if (!discountPriceAuth(e)) return;

// 위의 할인 가격 검증까지 다 통과된 후에 포인트 최대 적용 완료
alert('포인트 최대 적용 완료 ✅');

// 할인 가격 푸터에 즉시 표시
discountPrice(input.value);
// 총 가격 푸터에 즉시 표시
totalPriceCal();
}

// 공통 부모요소에 이벤트 연결
TAB_PANEL_CONTAINER.addEventListener('click', maximumPoint);

```

#### 2) 불필요한 함수 삭제 및 푸터 영역에 연결한  이벤트 삭제
결제하기 버튼을 눌렀을 때 해당 데이터를 저장해주는 loadReservation 함수에 결제하기 버튼 클릭 시 aria-pressed 속성이 바뀌게 해주는 코드를 추가하므로, 결제버튼 함수를 삭제하였다.

### 3) 금액 계산 · 정책/단위/데이터 타입 정리
영화 예매 후에 금액 계산하는 부분의 함수를 다음과 같이 리펙토링하였다.
- 상품 가격, 할인된 가격, 총 금액을 계산용 숫자와 표시용 숫자(문자열)로 분리하여 함수 구현
- 할인 적용 시 총액이 음수가 될 수 있는 점을 감안하여 할인 금액에 Math.max 메서드를 사용

```

// 금액 계산/표기 로직 함수

// 기본 상품 가격 표시
const productPriceValue = (PRODUCT_PRICE.textContent = formatPrices(state.price)); // 브라우저에 보이는 가격 (문자열)
const productPrice = Number(state.price) //데이터에 보낼 상품 가격

// 할인 티켓 가격 관련 함수
// 할인된 티켓 가격 반환
function discountPrice(value) {
const discount = Number(value);
if (isNaN(discount)) return 0;
return Math.max(0, discount);
}

// 할인된 티켓 가격 DOM 표시
function renderDiscountPrice(value){
const discount = discountPrice(value)
if(discount > productPrice){
alert('할인 금액이 결제 금액을 초과하였습니다. 포인트를 다시 적용하세요')
DISCOUNT_PRICE.textContent = formatPrices(0)
resetForm()
return false

}
DISCOUNT_PRICE.textContent = formatPrices(discount)
return true
}

// 현재 어떤 패널이 활성화되어 있는지 확인한 후 검증
function discountPriceAuth(e) {
const isPanel1Active = POINT_TABS[0].classList.contains('active');
const isPanel2Active = POINT_TABS[1].classList.contains('active');

if (isPanel1Active) {
if (!cardPasswordAuth(e)) return false;
return true;
}

if (isPanel2Active) {
if (!cardNumberAuth()) return false;
if (!cardPasswordAuth(e)) return false;
return true;
}
}

// 총 예매 티켓 가격
// 총 금액 계산용 함수
function totalPriceCal() {
let totalPriceValue = null;
const discountPriceValue = DISCOUNT_PRICE.textContent;
if (discountPriceValue === '') {
return totalPriceValue = Number(productPriceValue.replace(/,/g, ''));

} else {
return Number(productPriceValue.replace(/,/g, '')) - Number(discountPriceValue.replace(/,/g, ''));
}

}

// 총 금액 DOM에 표시
function renderTotalPrice(){
const total = totalPriceCal()
return TOTAL_PRICE.textContent = `${formatPrices(total)} `;
}
renderTotalPrice()

// 취소 버튼 클릭 시 적용된 할인 금액 초기화 함수
function handlePointReset(e) {
const target = e.target.closest('button[type="reset"]');
if (!target) return;

discountPrice(0);
totalPriceCal();
alert('포인트 적용이 해제되었습니다.');
}

```

### 4) 상태관리(LocalStorage) · bookingState 업데이트 규칙

- 결제 완료 후에는 “예약 완료 영수증 화면”으로 넘기거나, reset은 “빈 상태”로 해야 함
-> 결제 완료 후에 로딩 효과를 비동기로 주어서 구현하였고, reset은 resetBookingState(storageData)로 처리하였다.

```

// 로더 넣어주는 함수
function showLoder(elment){
const fragment = document.createDocumentFragment()
const paymentLoading = document.createElement('span')
paymentLoading.classList.add('payment-loading','loader')

fragment.appendChild(paymentLoading)
elment.appendChild(fragment)
document.querySelector('main').classList.add('body-blur');
document.querySelector('header').classList.add('body-blur');

```

- 현재 결제하기 누르면 저장되는 데이터를 담고 있는 비동기 함수가 여러개의 역할을 수행하고 있는 점이 가독성이 떨어지고, 유지보수 측면에도 올바른 함수의 구성이 아니기때문에,  함수의 기능 분리를 하는 리펙토링 작업을 진행했다.

- 데이터 검증/ 결제 버튼 상태 변경/ 결제 처리/ 페이지 이동 총 4개의 함수로 분리한 후에 결제 요청 비동기 함수에 연결해주었다.

### 1단계 함수 분리
```

// 데이터 검증
function storageDataAuth (data){
if (paymentMethod === null) {
alert('최종 결제 수단을 선택하세요');
return false;
}

    data.paymentMethod = paymentMethod;
    data.totalPrice = totalPriceCal();
    storageData.price = Number(productPrice);
    return true

}
// 버튼 상태 변경
function changeButtonState(element, state){
attr(element, 'aria-pressed', state);

}
// 결제처리,상태 리셋,
async function paymentSucess(){
await patchBookingState(storageData);
alert(`결제 완료되었습니다.`);
resetBookingState();
movePage('/src/page/main/index.html')
}

// 페이지 이동
function movePage(page){
setTimeout(()=> {
showLoder(document.body);
location.href = page;
}, 500)
}

```

### 2단계 비동기 함수에 리펙토링한 함수 연결

```

(수정 전)
async function loadReservation() {
try {
// 결제 버튼 클릭 시 유효성 검사
// 비밀번호 입력해야 포인트 적용된 가격 결제 가능
// 최종 결제 수단 선택해야 결제 가능

    if (paymentMethod === null) {
      alert('최종 결제 수단을 선택하세요');
      return;
    }
    storageData.paymentMethod = paymentMethod;
    storageData.totalPrice = Number(totalPriceValue);

    //storageData.totalPrice = totalPriceValue 저장 시 타입 확인(숫자 유지) + format된 문자열 저장 금지
    attr(PAY_BUTTON, 'aria-pressed', 'true');
    // 상품 금액이 이전 페이지에서 저장되지 않았을 경우
    storageData.price = Number(productPrice);
    patchBookingState(storageData);
    console.log(storageData);

    alert(`결제 완료되었습니다.`);
    resetBookingState(storageData);
    //location.href = '/src/page/main/index.html';

} catch (e) {
console.error('에러내용:', e);
const retryPayment = confirm('결제에 실패하였습니다. 재시도하시겠습니까?');
if (retryPayment) return;
}

```


```

(수정 후)
async function loadReservation() {
try {
if (!storageDataAuth(storageData)) return;
changeButtonState(PAY_BUTTON, 'true');
await paymentSucess();
}
catch (e) {
console.error('에러내용:', e);
changeButtonState(PAY_BUTTON, 'false');
const retryPayment = confirm('결제에 실패하였습니다. 재시도하시겠습니까?');
if (retryPayment) return;
}
}

```
결제 성공/ 실패 시의 상황들에 실행되는 함수들을 각각 분리하는 리펙토링을 통해, 비동기 함수 내부의 작동이 좀 더 명확하게 보이는 구성이 되었다.


### 5) 불필요한 주석 삭제
자바스크립트 초기에 코드 구상을 위해 적어둔 주석들을 삭제하였다
## 이벤트 연결

- [x] active 클래스 명 추가
- [x] 할인/포인트 버튼 클릭시 화면 전환
- [x] 폼 변환될 때 스타일링
- [x] 폼 서식에 비밀번호 입력 안했을 시 해당 알림창 나오게 하기
- [x] 폼 서식 포인트 입력 및 비밀번호 입력 양식에 맞춰서 제어할 수 있게 버튼 연결
- [x] 폼 서식에 해당 값 적용하기 (해당 포인트 입력하고 적용 버튼 누르면 푸터 결제 영역에 보이게 하기)
- [x] 할인 및 포인트 적립 버튼 접근성 속성 변환
- [x] 버튼 클릭 시 아리아 속성 전환
- [x] 체크박스 체크된 상태 일 때 추가 옵션 체크 박스 체크 할 수 있게

## 데이터 받아와야 할 것들

- [x] 영화 예매 정보 (이미지, 상영날짜, 상영관, 인원)
- [x] 최종 결제 금액 (할인율이 적용된)
  - 최종 결제 금액은 데이터에서 받아오고, 할인율은 할인 및 포인트 섹션의 할인율 데이터와 연결
