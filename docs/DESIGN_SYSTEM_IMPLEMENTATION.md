# YEJI 포트폴리오 - 디자인 시스템 구현 가이드

**설계 기반**: Stitch SCREEN_4~15 (라이트/다크 모드 통일)

---

## 🎨 색상 시스템 (Tailwind 설정)

### 라이트 모드 (Light)
```typescript
// tailwind.config.ts
colors: {
  light: {
    surface: '#FFFFFF',           // Primary BG
    'surface-dim': '#F8F8F8',     // Secondary BG
    text: '#1A1A1A',              // Primary Text
    'text-secondary': '#666666',  // Secondary Text
    border: '#E0E0E0',            // Border
    accent: '#0066CC',            // Primary Accent
  },
  // 파스텔 악센트
  mint: '#E8F5E9',    // About Me
  peach: '#FFE8D6',   // Experience & Projects
  sky: '#E3F2FD',     // Posts
  purple: '#F3E5F5',  // Resume
}
```

### 다크 모드 (Dark)
```typescript
dark: {
  surface: '#141313',           // Primary BG
  'surface-dim': '#1C1B1B',     // Secondary BG
  text: '#FFFFFF',              // Primary Text
  'text-secondary': '#999999',  // Secondary Text
  border: '#3A3939',            // Border
  accent: '#FFFFFF',            // Primary Accent (Inverted)
}
```

---

## 📝 타이포그래피 (Fonts)

### 설정
```typescript
// next.config.js
const { Syne, JetBrains_Mono } = require('@next/font/google');

const syne = Syne({ weight: ['400', '700'] });
const jetbrains = JetBrains_Mono({ weight: ['400'] });

module.exports = {
  experimental: {
    fontDir: './public/fonts'
  }
};
```

### 스타일 정의
```css
/* styles/typography.css */

.logo {
  font-family: Syne, sans-serif;
  font-size: 20px;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.h1 {
  font-family: Syne, sans-serif;
  font-size: 48px;
  font-weight: 700;
  line-height: 1.3;
}

.section-header {
  font-family: Syne, sans-serif;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.body {
  font-family: Syne, sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.6;
}

.badge {
  font-family: JetBrains Mono, monospace;
  font-size: 12px;
}
```

---

## 🏗️ 그리드 & 레이아웃

```typescript
// constants.ts
export const LAYOUT = {
  container: 'max-w-7xl',      // 1440px
  padding: 'px-12',             // 48px Desktop
  section_gap: 'gap-20',        // 80px
  component_gap: 'gap-6',       // 24px
  nav_height: 'h-14',           // 56px
};
```

---

## ⚡ 핵심 컴포넌트

### 1. 네비게이션 바
```
[YEJI. Logo] — [메뉴] — [🌙/☀️ 토글]
- 높이: 56px, Sticky
- Hover: 텍스트 #0066CC, Underline
```

### 2. MY RECORDER 카드 (01-04)
```
[번호] [텍스트] →
- 배경: 파스텔 악센트
- Hover: 배경색 심화 + 화살표 애니메이션
```

### 3. 경력 타임라인
```
⚫ 2024 | 직책
⚫ 2023 | 직책
- 수직선 (2px)
- 원형 마커 (12px)
```

### 4. 기술 배지
```
[React] [TypeScript] [Tailwind]
- White/F8F8F8 배경
- 1px Border, 4px Radius
- JetBrains Mono 12px
```

### 5. 이력서 섹션
```
배경: 그리드 패턴 + "RESUME" 와이드 텍스트
하단: "SYS.READY // DOC.AVAILABLE" 라벨
```

---

## 🎭 인터랙션

| 요소 | 상태 | 효과 |
|------|------|------|
| 링크 | Hover | 색상 → #0066CC |
| 버튼 | Focus | 2px solid #0066CC, offset 2px |
| 카드 | Hover | 배경 + 스케일 (1.02) |
| 테마 토글 | Click | 300ms Fade Transition |
| 일반 전환 | - | 200ms ease-out |

---

## ♿ 접근성

✅ WCAG AA 준수  
✅ 텍스트 대비 4.5:1 이상  
✅ 명확한 포커스 인디케이터  
✅ 시멘틱 HTML (header, nav, main, section, article)  
✅ aria-label, aria-describedby 적용  

---

## 📋 페이지별 컬러 매칭

| 페이지 | 악센트 | 용도 |
|--------|--------|------|
| **About Me** | Mint #E8F5E9 | MY RECORDER 01 배경 |
| **Experience** | Peach #FFE8D6 | 카드 배경 |
| **Posts** | Sky #E3F2FD | 리스트 배경 |
| **Resume** | Purple #F3E5F5 | 배경 + 악센트 |

---

**다음**: Claude Code 프롬프트 → 컴포넌트 구현
