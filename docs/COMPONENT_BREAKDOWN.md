# YEJI 포트폴리오 - 컴포넌트 분해 & 구현 순서

---

## 🏗️ 컴포넌트 계층도

```
app/
├── layout.tsx (루트 레이아웃)
│   └── _components/
│       ├── common/
│       │   ├── Header.tsx (네비게이션 바)
│       │   ├── ThemeToggle.tsx (🌙/☀️)
│       │   └── Footer.tsx
│       ├── sections/
│       │   ├── Hero.tsx (홈 헤로우)
│       │   ├── MyRecorder.tsx (카드 01-04)
│       │   ├── About.tsx (프로필)
│       │   ├── Experience.tsx (타임라인)
│       │   ├── Projects.tsx
│       │   ├── Posts.tsx (목록)
│       │   └── Resume.tsx (그리드 배경)
│       └── ui/
│           ├── Card.tsx (기본 카드)
│           ├── Badge.tsx (기술 배지)
│           ├── TimelineItem.tsx
│           └── Button.tsx
```

---

## 📊 구현 우선순위

### Phase 1️⃣: 기초 설정 (1일)
```
1. Syne, JetBrains Mono 폰트 설정
2. Tailwind 색상 시스템 정의
3. CSS 변수/클래스 (typography, layout)
4. ThemeProvider (라이트/다크 모드)
```

### Phase 2️⃣: 네비게이션 (1일)
```
1. Header.tsx (YEJI. 로고 + 메뉴)
2. ThemeToggle.tsx (🌙/☀️)
3. 스타일링 (Hover, Active 상태)
4. 접근성 (aria-label, 포커스)
```

### Phase 3️⃣: 홈 페이지 (2일)
```
1. Hero.tsx (메인 헤드라인)
2. MyRecorder.tsx (카드 01-04)
3. Card.tsx 컴포넌트 (기본 카드)
4. Badge.tsx (기술 배지)
```

### Phase 4️⃣: 상세 페이지 (3일)
```
1. TimelineItem.tsx (경력 타임라인)
2. Experience.tsx (경력 섹션)
3. Posts.tsx (포스트 목록)
4. Resume.tsx (그리드 배경)
```

### Phase 5️⃣: 포스트 상세 (2일)
```
1. posts/[slug]/page.tsx
2. PostContent.tsx (Tiptap 렌더링)
3. 네비게이션 (이전/다음)
```

---

## 🎯 각 컴포넌트 스펙

### Header.tsx
```
사이즈: 56px (h-14)
배경: light/surface | dark/surface
테두리: border-b light/border | dark/border
레이아웃: flex justify-between items-center
내용: Logo | Menus | ThemeToggle
```

### MyRecorder.tsx
```
레이아웃: 수평 리스트 (grid grid-cols-4)
카드 배경: [Mint, Peach, Sky, Purple]
카드 내용: [번호] [텍스트] [→ 아이콘]
Hover: 배경 심화 + 스케일 1.02 + 화살표 애니메이션
```

### Card.tsx
```
배경: light/surface-dim | dark/surface-dim
테두리: 1px border-b light/border | dark/border
내부 간격: p-6
둥글기: rounded-lg
```

### Badge.tsx
```
배경: light/surface | dark/surface-dim
텍스트: light/text-secondary | dark/text-secondary
테두리: 1px border-b
폰트: JetBrains Mono 12px
```

### TimelineItem.tsx
```
마커: 원형 (w-3 h-3 rounded-full)
선: 2px 수직 라인
콘텐츠: 날짜 | 직책 | 설명
```

### Resume.tsx
```
배경: 그리드 패턴 (background-image)
텍스트: "RESUME" 와이드 스타일
하단: "SYS.READY // DOC.AVAILABLE" 고정 라벨
```

---

## 🎨 Tailwind 클래스 사용 규칙

### 색상 적용
```typescript
// 배경
className="bg-light-surface dark:bg-dark-surface"

// 텍스트
className="text-light-text dark:text-dark-text"

// 테두리
className="border-light-border dark:border-dark-border"

// 악센트 (조건부)
className={condition ? 'bg-mint' : 'bg-light-surface-dim'}
```

### 레이아웃
```typescript
// 컨테이너
className="max-w-7xl mx-auto px-12"

// 섹션 간격
className="gap-20"

// 컴포넌트 간격
className="gap-6"
```

### 인터랙션
```typescript
// Hover
className="hover:text-light-accent transition-colors duration-200"

// Focus
className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent"

// 전환
className="duration-200 ease-out"
```

---

## 📋 확인 체크리스트

- [ ] 모든 색상이 WCAG AA 기준 준수?
- [ ] 모든 텍스트에 시멘틱 태그 사용?
- [ ] Hover/Focus 상태 정의?
- [ ] 라이트/다크 모드 모두 테스트?
- [ ] 접근성 속성 추가? (aria-*, role)

---

**다음**: Claude Code 프롬프트 시작
