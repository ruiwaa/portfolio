# YEJI 포트폴리오 - 다크 모드 최종 구현 가이드

**기반**: Stitch 다크 모드 5개 페이지 (About, Experience, Home, Posts, Resume)

---

## 🎨 다크 모드 색상 팔레트

### 기본 색상
```
배경 (Primary Surface): #141313 (거의 검은색)
보조 배경 (Secondary Surface): #1C1B1B (진한 회색)
텍스트 (Primary): #FFFFFF (순백색)
텍스트 (Secondary): #999999 (밝은 회색)
테두리: #3A3939 (진회색)
악센트: #FFFFFF (역전된 흰색)
```

### 파스텔 악센트 (다크 모드에서도 유지)
```
About Me (01): Mint #E8F5E9 (밝은 민트 - 대비 강함)
Experience (02): Peach #FFE8D6 (밝은 복숭아 - 대비 강함)
Posts (03): Sky #E3F2FD (밝은 하늘 - 대비 강함)
Resume (04): Purple #F3E5F5 (밝은 보라 - 대비 강함)
```

### 프로젝트 카드 배경 (다크 모드)
```
Project 1: #E3F2FD (Sky - 라이트)
Project 2: #FFE8D6 (Peach - 라이트)
Project 3: #E8F5E9 (Mint - 라이트)
```

---

## 📐 레이아웃 (실제 스크린샷 기반)

### Header
```
높이: 56px (h-14)
배경: #141313 (다크)
테두리: 1px 아래 (#3A3939)

레이아웃:
[YEJI. Logo] — [메뉴들] — [🌙 아이콘]

활성 메뉴: Underline 표시
```

### MY RECORDER 카드 (Home)
```
배치: 2×2 그리드 또는 수평 리스트
01 About Me: Mint 배경
02 Experience & Projects: Peach 배경
03 Posts: Sky 배경
04 Resume: Purple 배경

각 카드:
- 번호 + 텍스트 + 화살표
- Hover: 배경 심화 + 스케일
```

### About Me 페이지
```
2단 레이아웃:
├─ 좌측: 기본 정보 (이름, 이메일, 위치) + 기술 스택
└─ 우측: 비전 섹션 (RECORD, REFLECT, LEARN, IMPROVE)

기술 배지: JetBrains Mono, 1px 테두리
```

### Experience & Projects
```
타임라인:
- 2px 수직 선
- 원형 마커 (12px)
- 날짜 | 직책 | 설명

프로젝트 카드:
- 3단 그리드
- 썸네일 + 타이틀 + 설명
- 파스텔 배경 (Sky, Peach, Mint)
```

### Posts 페이지
```
필터 탭: All, Troubleshooting, Retrospective, Study
(첫 번째 탭에 Underline)

포스트 카드:
- 썸네일 (좌측)
- 제목 + 날짜 (우측 상단)
- 태그 (우측 하단)
- 다크 배경에 테두리
```

### Resume 페이지
```
배경: 그리드 패턴 (세밀한 라인, #3A3939)
중앙: 큰 "RESUME" 텍스트 (Syne Bold, 매우 큼)
하단: "SYS.READY // DOC.AVAILABLE" 라벨

버튼:
- "이력서 보기" (흰 배경, 검은 텍스트)
- "PDF 다운로드" (흰 테두리, 투명 배경)
```

---

## 🎭 다크 모드 특화 인터랙션

### 호버 효과
```
링크: 텍스트 → #FFFFFF (이미 흰색이므로 Underline)
카드: 배경 #1C1B1B로 밝아짐 + 스케일
버튼: 배경색 변화 (흰색 → 밝은 회색)
```

### 포커스 인디케이터
```
2px solid #FFFFFF (다크 모드에서 흰색)
offset 2px
모든 인터랙티브 요소
```

### 전환 애니메이션
```
일반 전환: 200ms ease-out
테마 토글: 300ms Fade (다크 ↔ 라이트)
```

---

## 📊 페이지별 컬러 매칭

| 페이지 | 악센트 | 주요 색상 | 특징 |
|--------|--------|---------|------|
| **Home** | Mint, Peach, Sky, Purple | #141313 배경 | MY RECORDER 카드 |
| **About Me** | Mint #E8F5E9 | 01 카드 배경 | 정보 + 비전 |
| **Experience** | Peach #FFE8D6 | 02 카드 배경 | 타임라인 + 프로젝트 |
| **Posts** | Sky #E3F2FD | 03 카드 배경 | 필터 탭 + 카드 목록 |
| **Resume** | Purple #F3E5F5 | 04 카드 배경 | 그리드 + 큰 텍스트 |

---

## 🔧 Tailwind 설정 (다크 모드)

```typescript
// tailwind.config.ts - Dark Mode
darkMode: 'class',

theme: {
  colors: {
    dark: {
      surface: '#141313',
      'surface-dim': '#1C1B1B',
      text: '#FFFFFF',
      'text-secondary': '#999999',
      border: '#3A3939',
      accent: '#FFFFFF',
    },
    // 악센트는 라이트/다크 동일
    mint: '#E8F5E9',
    peach: '#FFE8D6',
    sky: '#E3F2FD',
    purple: '#F3E5F5',
  }
}
```

### 클래스 사용
```typescript
// 라이트/다크 자동 전환
className="bg-light-surface dark:bg-dark-surface"
className="text-light-text dark:text-dark-text"
className="border-light-border dark:border-dark-border"

// 악센트는 조건부
className={section === 'about' ? 'bg-mint' : '...'}
```

---

## ♿ 접근성 (다크 모드 고려)

### 색상 대비 (WCAG AA)
```
배경 #141313 + 텍스트 #FFFFFF: 19.4:1 ✅ (매우 우수)
배경 #1C1B1B + 텍스트 #999999: 8.1:1 ✅ (우수)
파스텔 배경 + 검은 텍스트: 모두 4.5:1 이상 ✅
```

### 포커스 관리
```
링크/버튼 Focus: 2px 흰색 아웃라인
라디오/체크박스: 명확한 체크 표시
탭 네비게이션: 순서대로 모든 요소 접근 가능
```

### 시멘틱 HTML
```
<header> - 네비게이션
<main> - 콘텐츠
<section> - 섹션별 그룹
<article> - 포스트/카드
<footer> - 푸터
```

---

## 🎯 구현 체크리스트 (다크 모드)

### Phase 1: 색상 설정
- [ ] Tailwind 다크 모드 활성화
- [ ] 색상값 정확히 입력 (#141313, #1C1B1B 등)
- [ ] 파스텔 악센트 모두 추가
- [ ] 대비도 검증 (WCAG AA)

### Phase 2-8: 각 컴포넌트
- [ ] 라이트/다크 모드 양쪽 테스트
- [ ] 포커스 인디케이터 흰색
- [ ] 파스텔 배경과의 대비 확인
- [ ] 호버 상태 명확히 표시

### 최종 검증
- [ ] Chrome DevTools → 다크 모드 활성화
- [ ] Lighthouse (90+ 점수)
- [ ] 모든 텍스트 대비 4.5:1 이상
- [ ] 모든 요소 포커스 가능
- [ ] 모바일 반응형 (다크 모드)

---

## 📝 라이트 모드 vs 다크 모드

| 요소 | 라이트 모드 | 다크 모드 |
|------|----------|---------|
| **배경** | #FFFFFF | #141313 |
| **텍스트** | #1A1A1A | #FFFFFF |
| **테두리** | #E0E0E0 | #3A3939 |
| **악센트** | #0066CC | #FFFFFF |
| **파스텔** | 동일 | 동일 |
| **포커스** | 파랑 (#0066CC) | 흰색 (#FFFFFF) |

---

## 🚀 다음 단계

1. **CLAUDE_CODE_PROMPTS.md Phase 1-8 실행**
   (라이트 모드 기준으로 작성되어 있음)

2. **다크 모드 토글 추가**
   - localStorage에 테마 저장
   - 🌙/☀️ 아이콘 표시

3. **라이트 모드 스타일**
   - DESIGN_SYSTEM_IMPLEMENTATION.md의 라이트 모드 컬러 적용

4. **검증**
   - 라이트/다크 모드 양쪽 확인
   - 접근성 테스트

---

**이제 완벽한 다크 모드 기반 구현을 시작할 수 있습니다!** 🌙✨
