# Claude Code 최적 프롬프트 가이드

---

## 🎯 프롬프트 템플릿

### Phase 1: 색상 & 폰트 설정

```prompt
Tailwind 설정 및 폰트를 YEJI 디자인 시스템에 맞게 구성해줄래?

요구사항:
1. Syne 폰트 (라이트/다크 모드용)
2. JetBrains Mono (배지용)
3. 색상:
   - 라이트: #FFFFFF(surface), #F8F8F8(dim), #1A1A1A(text), #666666(secondary), #0066CC(accent)
   - 다크: #141313(surface), #1C1B1B(dim), #FFFFFF(text), #999999(secondary), #FFFFFF(accent)
   - 악센트: mint #E8F5E9, peach #FFE8D6, sky #E3F2FD, purple #F3E5F5
4. 타이포그래피 CSS 클래스 (logo, h1, section-header, body, badge)
5. 레이아웃 상수 (container 1440px, padding 48px, gaps)

파일:
- tailwind.config.ts 수정
- styles/typography.css 생성
- lib/constants.ts 생성
```

### Phase 2: Header 컴포넌트

```prompt
YEJI 디자인에 맞는 Header 컴포넌트를 만들어줄래?

요구사항:
1. 높이: 56px (sticky, border-bottom)
2. 레이아웃: [YEJI. 로고] — [About Me, Experience..., Posts, Resume] — [🌙/☀️ 토글]
3. 스타일:
   - Syne Bold 20px 로고
   - Hover: 텍스트 #0066CC + Underline
   - Active: Underline 표시
4. 접근성:
   - 시멘틱 <header>, <nav>
   - aria-label="메인 네비게이션"
   - 포커스 인디케이터 (2px solid #0066CC)
5. 라이트/다크 모드 대응

파일:
- app/_components/common/Header.tsx
```

### Phase 3: ThemeToggle 컴포넌트

```prompt
라이트/다크 모드 토글 버튼을 만들어줄래?

요구사항:
1. 아이콘: 라이트 모드 시 🌙, 다크 모드 시 ☀️
2. 전환: 300ms Fade 애니메이션
3. 접근성:
   - aria-label="테마 변경"
   - role="switch"
4. 저장: localStorage에 테마 저장

파일:
- app/_components/common/ThemeToggle.tsx
```

### Phase 4: Card & Badge 컴포넌트

```prompt
기본 Card와 Badge 컴포넌트를 YEJI 디자인에 맞게 만들어줄래?

요구사항 (Card):
1. 배경: light/surface-dim | dark/surface-dim
2. 테두리: 1px border-b
3. 내부 간격: p-6
4. 둥글기: rounded-lg
5. Props: children, className, accent?(색상 지정)

요구사항 (Badge):
1. 배경: light/surface | dark/surface-dim
2. 테두리: 1px border
3. 폰트: JetBrains Mono 12px
4. 높이: h-6 정도
5. Props: label, variant?

파일:
- app/_components/ui/Card.tsx
- app/_components/ui/Badge.tsx
```

### Phase 5: MyRecorder 카드 섹션

```prompt
MY RECORDER 카드 섹션(01-04)을 YEJI 디자인에 맞게 구현해줄래?

요구사항:
1. 레이아웃: 4개 카드 수평 배치 (grid grid-cols-4 gap-6)
2. 각 카드:
   - 배경색: [01:Mint, 02:Peach, 03:Sky, 04:Purple]
   - 내용: [번호] [텍스트] [→ 아이콘]
3. Hover 효과:
   - 배경색 심화 (opacity 증가)
   - 스케일 1.02
   - 화살표 애니메이션 (→ 오른쪽으로 슈르르)
4. 접근성:
   - 시멘틱 <section>, <article>
   - aria-label="포트폴리오 네비게이션"
5. 데이터:
   - 01: About Me
   - 02: Experience & Projects
   - 03: Posts
   - 04: Resume

파일:
- app/_components/sections/MyRecorder.tsx
```

### Phase 6: 경력 타임라인

```prompt
Experience 섹션의 타임라인을 YEJI 디자인에 맞게 만들어줄래?

요구사항:
1. 마커: 원형 (w-3 h-3, 색상 #0066CC)
2. 선: 2px 수직 라인 (#E0E0E0 | dark/#3A3939)
3. 콘텐츠: [날짜] [직책] [설명]
4. 레이아웃: 마커 ─ 내용 (수평 배치)
5. 접근성:
   - 시멘틱 <timeline>
   - aria-label="경력 타임라인"

파일:
- app/_components/ui/TimelineItem.tsx
- app/_components/sections/Experience.tsx
```

### Phase 7: Posts 섹션

```prompt
Posts 섹션을 YEJI 디자인에 맞게 만들어줄래?

요구사항:
1. 헤더: "POSTS" (Syne Bold 12px, letter-spacing 1px)
2. 필터: 카테고리별 (All, Study, Troubleshooting, Retrospective)
3. 카드 레이아웃: 그리드 (cols-1 | md:cols-2)
4. 각 카드:
   - 배경: Sky #E3F2FD 또는 light/surface-dim
   - 썸네일, 제목, 설명, 날짜
5. 로딩 상태: Suspense + 스켈레톤
6. 접근성: aria-live="polite" (필터 변경 시 알림)

파일:
- app/_components/sections/Posts.tsx
```

### Phase 8: Resume 섹션

```prompt
Resume 섹션을 YEJI 디자인에 맞게 만들어줄래?

요구사항:
1. 배경: 그리드 패턴 (세밀한 라인, #E0E0E0 | dark/#3A3939)
2. 중앙 텍스트: "RESUME" (와이드 스타일, Syne Bold, 매우 큼)
3. 하단 라벨: "SYS.READY // DOC.AVAILABLE" (고정, JetBrains Mono)
4. 다운로드 버튼 (선택)
5. 배경 이미지/패턴으로 구현

파일:
- app/_components/sections/Resume.tsx
```

---

## 📋 사용 팁

### ✅ 효과적인 프롬프트

```
"구체적인 색상값, 크기, 상태를 모두 명시"
"접근성 요구사항 포함"
"파일 경로 명확히"
```

### ❌ 피해야 할 것

```
"좋은 Header를 만들어줄래?" (너무 모호함)
"디자인처럼 만들어줄래?" (구체성 부족)
```

---

## 🎯 실행 순서

1. **Phase 1** (색상, 폰트) → 모든 컴포넌트가 의존
2. **Phase 2** (Header) → 모든 페이지에서 사용
3. **Phase 3** (ThemeToggle) → Header와 함께
4. **Phase 4** (Card, Badge) → 기본 구성 요소
5. **Phase 5** (MyRecorder) → 홈 페이지
6. **Phase 6** (Timeline) → Experience 페이지
7. **Phase 7** (Posts) → Posts 페이지
8. **Phase 8** (Resume) → Resume 페이지

---
