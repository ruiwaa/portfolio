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

### Phase 9: Footer 컴포넌트

```prompt
docs/CODING_CONVENTIONS.md와 docs/SEMANTIC_HTML_A11Y.md를 준수해서
모든 페이지 하단에 들어가는 Footer 컴포넌트를 만들어줄래?

요구사항:
1. 좌측: YEJI. 로고 (작게)
2. 우측: 저작권 문구 "© 2026 YEJI. All rights reserved."
3. 우측 끝: 외부 링크 (GitHub, Velog 또는 LinkedIn, Twitter)
   - 아이콘 + 텍스트 조합
   - 새 탭에서 열기 (target="_blank", rel="noopener noreferrer")
4. 스타일:
   - 상단 테두리 (border-t)
   - 배경: light/surface, dark/surface
   - 텍스트: light/text-secondary, dark/text-secondary
5. 접근성:
   - 시멘틱 <footer>
   - 외부 링크에 aria-label로 "새 탭에서 열림" 명시

파일:
- app/_components/common/Footer.tsx
```

### Phase 10: About Me 페이지

```prompt
docs/CODING_CONVENTIONS.md와 docs/SEMANTIC_HTML_A11Y.md를 준수해서
About Me 페이지를 만들어줄래?

요구사항:
1. 2단 레이아웃 (좌: 정보, 우: 비전 타임라인)

좌측 (정보 섹션):
- "ABOUT ME" 섹션 헤더 (Syne Bold 12px, 자간 1px)
- 인사말 텍스트 (안녕하세요 + 소개)
- 정보 테이블: 이름 / 생년월일 / 이메일 / 위치 (라벨-값 구조)
- 구분선
- "TECH STACK" 섹션 헤더
- 기술 배지 목록 (HTML, CSS, JavaScript, TypeScript, React, Next.js 등)

우측 (비전 타임라인, "기록의 여정"):
- 4단계 세로 타임라인: RECORD, REFLECT, LEARN, IMPROVE
- 각 단계: 아이콘(원형 배경) + 제목(영문) + 부제(한글) + 설명 텍스트
- 세로 연결선

2. 라이트/다크 모드 대응
3. 접근성: <main>, <section>, 정보 테이블은 <dl>/<dt>/<dd> 사용 고려

파일:
- app/_components/sections/AboutInfo.tsx
- app/_components/sections/AboutVision.tsx
- app/(routes)/about/page.tsx
```

### Phase 11: Home Hero 섹션

```prompt
docs/CODING_CONVENTIONS.md와 docs/SEMANTIC_HTML_A11Y.md를 준수해서
Home 페이지의 Hero 섹션을 만들어줄래?

Hero 섹션 요구사항:
1. 좌측 배치 (MyRecorder 카드와 나란히, 2단 레이아웃)
2. 메인 카피: "기록하고, 배우고, 나아갑니다" (Syne Bold 48px, 줄바꿈 3줄)
3. 서브 텍스트: "FRONTEND DEVELOPER" (자간 넓게, 작은 크기)
4. CTA 버튼: "VIEW PROJECTS" (테두리만 있는 버튼, hover 시 배경 채움)
5. 버튼 클릭 시 Experience & Projects 페이지로 이동

파일:
- app/_components/sections/Hero.tsx
- app/page.tsx (Hero + MyRecorder 배치)
```

### Phase 12: Posts 상세 페이지 (Tiptap 렌더링)

```prompt
docs/CODING_CONVENTIONS.md, docs/SEMANTIC_HTML_A11Y.md, docs/SECURITY.md를 준수해서
Posts 상세 페이지를 만들어줄래?

요구사항:
1. 동적 라우팅: app/(routes)/posts/[slug]/page.tsx
2. Supabase에서 slug 기준 단건 조회 (is_published=true 조건 포함)
3. 상세 페이지 구성:
   - 카테고리 배지 + 발행일
   - 제목 (큰 헤딩)
   - 설명(description)
   - 썸네일 이미지 (next/image)
   - 본문(content, Tiptap HTML) 렌더링
   - 하단: 이전글/다음글 네비게이션 (선택)
4. PostContent 컴포넌트로 HTML 렌더링 분리
   - Tiptap 출력 HTML은 신뢰된 소스이므로 직접 렌더링 가능하되, 구조는 분리
5. 404 처리: slug에 해당하는 글이 없거나 is_published=false면 notFound()
6. 메타데이터: generateMetadata로 title/description 동적 설정
7. 접근성: <article>, 헤딩 계층 준수

파일:
- app/(routes)/posts/[slug]/page.tsx
- app/_components/sections/PostContent.tsx
```

### Phase 13: Posts 페이지네이션

```prompt
docs/CODING_CONVENTIONS.md와 docs/SEMANTIC_HTML_A11Y.md를 준수해서
Posts 목록 하단에 "더 많은 글 보기" 버튼을 추가해줄래?

요구사항:
1. 초기 로드: 4개 게시글만 표시
2. 하단 "더 많은 글 보기" 버튼 클릭 시 다음 페이지 게시글 추가 로드
   - Supabase range()로 페이지네이션 처리
3. 더 이상 불러올 글이 없으면 버튼 숨김 또는 비활성화
4. 필터(카테고리) 변경 시 페이지네이션 초기화
5. 로딩 중 버튼에 로딩 상태 표시
6. 접근성: aria-live="polite"로 새 글 추가 알림

파일:
- app/_components/sections/Posts.tsx (수정)
```

### Phase 14: Experience Projects 섹션 테스트 콘텐츠

```prompt
docs/CODING_CONVENTIONS.md와 docs/SEMANTIC_HTML_A11Y.md를 준수해서
Experience 페이지의 EXPERIENCE 타임라인 하단에 PROJECTS 섹션을 추가하고
테스트용 더미 콘텐츠로 채워줄래?

요구사항:
1. PROJECTS 섹션 헤더 추가 (EXPERIENCE 섹션과 동일한 스타일: Syne Bold 12px, 자간 1px, 대문자)
   - EXPERIENCE 섹션과 구분선(border-t)으로 분리
2. 프로젝트 카드 3개(테스트 데이터)를 가로 그리드로 배치 (그리드 3열, 반응형으로 모바일은 1열)
   - 이미지 영역: 실제 이미지 없이 회색 배경 + placeholder 아이콘 (lucide-react의 Image 아이콘 등)
   - 제목: "프로젝트 이름" (테스트 텍스트, 실제 데이터로 교체 예정)
   - 설명: 1~2줄 테스트 설명 텍스트
   - 하단 구분선 아래 기술 태그 배지 2개 (예: React/TypeScript, Next.js/Supabase, React/Tailwind CSS)
3. 카드 배경색: 파스텔 3색 순환 (Sky #E3F2FD, Peach #FFE8D6, Mint #E8F5E9)
4. 카드 레이아웃: 이미지 상단(고정 비율), 하단에 제목+설명, 구분선, 태그
5. 프로젝트 데이터는 컴포넌트 내 배열로 하드코딩하고 주석으로 "TODO: 실제 프로젝트 데이터로 교체" 표시
6. 캐러셀이나 좌우 스크롤 기능은 넣지 않음 (3개 고정 그리드만)
7. 카테고리 배지(운영/유지보수 등)는 타임라인에 추가하지 않음
8. 라이트/다크 모드 대응
9. 접근성: 각 카드 <article>, 이미지 alt 텍스트

파일:
- app/_components/sections/Experience.tsx (수정, PROJECTS 섹션 추가)
```

### Phase 15: Resume 그리드 배경 웨이브 효과

```prompt
docs/CODING_CONVENTIONS.md와 docs/PERFORMANCE.md를 준수해서
Resume 페이지의 그리드 패턴 배경에 아주 천천히 움직이는 입체적인 물결 효과를 추가해줄래?

요구사항:
1. 그리드 라인이 물결처럼 완만하게 일렁이는 느낌 (아주 미세하고 느린 움직임)
2. 구현 방식은 아래 중 성능/구현 난이도를 고려해서 판단:
   - CSS background-position 애니메이션 (그리드가 대각선으로 서서히 흐르는 느낌)
   - 또는 CSS 3D transform(perspective + rotateX 등)으로 배경에 미세한 원근감 추가
3. 애니메이션 속도: 매우 느리게 (20~40초 주기로 반복, 눈에 띄지 않을 정도)
4. 무한 반복(loop), 끊김 없이 이어지도록(seamless)
5. 성능: GPU 가속 속성(transform, opacity) 위주로 사용, 스크롤/인터랙션 성능에 영향 없어야 함
6. prefers-reduced-motion 사용자는 정적 배경으로 표시
7. "RESUME" 텍스트와 버튼 등 전경 요소는 애니메이션과 무관하게 고정

파일:
- app/_components/sections/Resume.tsx (수정)
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
9. **Phase 9** (Footer) → 전역 공통 컴포넌트
10. **Phase 10** (About Me) → 정보 + 비전 타임라인 페이지
11. **Phase 11** (Hero) → 홈 페이지 완성
12. **Phase 12** (Posts 상세) → Tiptap 콘텐츠 렌더링 (공개 열람)
13. **Phase 13** (Posts 페이지네이션) → Phase 7 보완
14. **Phase 14** (Experience Projects 테스트 콘텐츠) → 프로젝트 카드 더미 데이터
15. **Phase 15** (Resume 웨이브 배경) → 그리드 배경 물결 효과

> 참고: 글 작성/수정은 앱 내 UI가 아닌 **Supabase Studio(Table Editor)**에서 직접 수행합니다. 관리자가 본인뿐이므로 앱에 로그인 화면이나 CRUD UI를 두지 않습니다.

---

**준비 완료!** 이 프롬프트들로 Claude Code를 시작하세요! 🚀
