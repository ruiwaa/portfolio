# 📋 Phase별 업무 요약 정리

**각 Phase 완료 후 Claude에게 요청해서 작업 내용을 요약받으세요!**

---

## 🚀 **사용 방법**

### Step 1: Phase 작업 완료

```
Claude Code에서 프롬프트 실행 후 코드 생성
```

### Step 2: 타입 체크 통과

```bash
bun run type-check
# 에러 없으면 통과!
```

### Step 3: Claude에게 요약 요청

```
Claude Code에 입력:

"PHASE_SUMMARY.md를 참고해서 Phase 1 작업을 요약해줄래?
생성된 파일, 구현한 기능, 테스트 완료 항목을 정리해줘"
```

### Step 4: 요약 받기

```
Claude가 다음 형식으로 답변:

✅ 생성된 파일:
   - [파일 경로]

✅ 구현한 것:
   - [기능들]

✅ 테스트:
   - [테스트 항목들]
```

### Step 5: 커밋

```
PHASE_COMMITS.md에서 해당 Phase 커밋 메시지 복사
git add, git commit, git push
```

---

# 📚 Phase별 작업 정의

## Phase 1️⃣: 색상/폰트/다크모드 설정

**이 Phase에서 해야 할 것:**

Tailwind CSS와 폰트를 프로젝트에 설정하고, 라이트/다크 모드를 구성합니다.

**Claude Code 요청:**

```
"CLAUDE_CODE_PROMPTS.md의 Phase 1 프롬프트 실행해줄래?"
```

**요약 템플릿 (Claude가 작성):**

```
✅ 생성된 파일:
   - app/globals.css (수정)
   - app/layout.tsx (수정 - 폰트 교체)
   - styles/typography.css (신규)
   - lib/constants.ts (신규)

✅ 구현한 것:
   - next/font/google로 Syne(400/700), JetBrains Mono(400) 로드
   - Tailwind v4 @theme에 라이트/다크 색상 토큰(surface, surface-dim, text,
     text-secondary, border, accent) + 파스텔 악센트(mint/peach/sky/purple) 정의
   - @custom-variant dark로 클래스 기반(.dark) 다크모드 체계 구축
     (tailwind.config.ts 대신 CSS @theme 방식 - Tailwind v4라 config 파일 자체가 없음)
   - 타이포그래피 클래스(.logo, .h1, .section-header, .body, .badge),
     레이아웃 상수(lib/constants.ts의 LAYOUT) 정의

✅ 테스트 완료:
   - 라이트 모드 (dev 서버 기동 및 렌더링 확인)
   - 다크 모드 (Phase 3 토글러 .dark 클래스 전환으로 검증)
   - bun run type-check → 프로젝트에 해당 스크립트가 없어 `bunx tsc --noEmit`으로 대체 실행, 통과

📍 다음: Phase 2 (Header 네비게이션) → 완료
```

---

## Phase 2️⃣: Header 네비게이션

**이 Phase에서 해야 할 것:**

페이지 상단의 네비게이션 헤더를 구현합니다. 로고, 메뉴, 토글 버튼 등이 포함됩니다.

**Claude Code 요청:**

```
"CLAUDE_CODE_PROMPTS.md의 Phase 2 프롬프트 실행해줄래?"
```

**요약 템플릿 (Claude가 작성):**

```
✅ 생성된 파일:
   - app/_components/common/Header.tsx

✅ 구현한 것:
   - h-14 sticky 헤더 + border-bottom, YEJI. 로고(.logo 클래스)
   - About Me / Experience & Projects / Posts / Resume 4개 메뉴 (next/link)
   - usePathname으로 현재 경로에 밑줄 표시(Active 상태)
   - hover 시 accent 색상 + 밑줄, 시멘틱 <header>/<nav>,
     aria-label="메인 네비게이션", focus-visible 아웃라인(2px accent)
   - app/layout.tsx에 마운트해 전 페이지에 노출

✅ 테스트 완료:
   - 로고 표시 (HTML 응답에서 "YEJI." 확인)
   - 메뉴 네비게이션 (4개 링크 렌더링 확인)
   - Hover 효과 (클래스 적용까지만 확인 - 실제 마우스 조작은 Chrome 확장 미연결로 미검증)
   - Active 상태 (usePathname 분기 로직 코드 확인)
   - 라이트/다크 모드 (다크모드 클래스 매핑 확인)
   - bun run type-check → `bunx tsc --noEmit` 통과, `bunx eslint` 통과

📍 다음: Phase 3 (테마 토글 버튼) → 완료
```

---

## Phase 3️⃣: 테마 토글 버튼

**이 Phase에서 해야 할 것:**

라이트/다크 모드를 전환하는 토글 버튼을 구현합니다. localStorage로 선택을 저장합니다.

**Claude Code 요청:**

```
"CLAUDE_CODE_PROMPTS.md의 Phase 3 프롬프트 실행해줄래?"
```

**요약 템플릿 (Claude가 작성):**

```
✅ 생성된 파일:
   - app/_components/common/ThemeToggle.tsx
   - app/layout.tsx (수정 - 테마 초기화 스크립트 + Header 마운트)

✅ 구현한 것:
   - 🌙(라이트)/☀️(다크) 아이콘 토글, role="switch" + aria-checked + aria-label="테마 변경"
   - useSyncExternalStore로 document.documentElement의 .dark 클래스를 외부 소스로 구독
     (useEffect+setState 대신 사용 - react-hooks/set-state-in-effect 린트 에러 및
     SSR 하이드레이션 불일치 방지)
   - 클릭 시 localStorage 저장 + 300ms opacity fade 애니메이션
   - layout.tsx <head>에 FOUC 방지용 인라인 스크립트 추가
     (localStorage 값 없으면 시스템 다크모드 설정을 기준으로 페인트 전에 <html>에 .dark 선반영)

✅ 테스트 완료:
   - 아이콘 표시 (HTML에서 aria-label="테마 변경" 확인)
   - 클릭 시 전환 (로직/타입 확인 - 실제 클릭 동작은 Chrome 확장 미연결로 미검증)
   - localStorage 저장 (코드 레벨 확인)
   - 새로고침 후 유지 (인라인 스크립트로 보장되는 구조 확인, 실사용 테스트는 미검증)
   - 애니메이션 (opacity transition 300ms 적용 확인)
   - bun run type-check → `bunx tsc --noEmit` 통과, `bunx eslint` 통과
     (초기 구현에서 react-hooks/set-state-in-effect 에러 발생 → useSyncExternalStore로 리팩터링해 해결)

📍 다음: Phase 4 (Card + Badge)
```

---

## Phase 4️⃣: Card + Badge 컴포넌트

**이 Phase에서 해야 할 것:**

재사용 가능한 기본 컴포넌트(Card, Badge)를 만듭니다. 라이트/다크 모드 모두 지원합니다.

**Claude Code 요청:**

```
"CLAUDE_CODE_PROMPTS.md의 Phase 4 프롬프트 실행해줄래?"
```

**요약 템플릿 (Claude가 작성):**

```
✅ 생성된 파일:
   - app/_components/ui/Card.tsx
   - app/_components/ui/Badge.tsx

✅ 구현한 것:
   - Card: bg-light-surface-dim/dark:bg-dark-surface-dim, border-b, p-6, rounded-lg
     accent?("mint"|"peach"|"sky"|"purple") 지정 시 파스텔 배경으로 교체(다크모드에서도 동일 색 유지)
   - Badge: h-6, border, .badge 클래스 재사용(JetBrains Mono 12px)
     bg-light-surface/dark:bg-dark-surface-dim, variant?("default"|"outline") - outline은 배경 투명
     (CLAUDE_CODE_PROMPTS.md에 variant 옵션이 구체적으로 명시되지 않아 두 가지로 직접 정의)
   - 둘 다 _components/ui 원칙대로 Props 기반, 내부 로직/상태 없음

✅ 테스트 완료:
   - Card 스타일 (기본/mint/peach accent 3종 렌더링 확인)
   - Badge 스타일 (default/outline 2종 렌더링 확인)
   - 라이트 모드
   - 다크 모드 (다크 클래스 매핑 확인)
   - bun run type-check → `bunx tsc --noEmit` 통과, `bunx eslint` 통과
   - 임시 라우트(app/phase4-smoke-tmp)에 마운트해 HTML 렌더링 직접 확인 후 정리

📍 다음: Phase 5 (MyRecorder 카드)
```

---

## Phase 5️⃣: MY RECORDER 카드 섹션

**이 Phase에서 해야 할 것:**

홈페이지의 4개 네비게이션 카드(01-04)를 구현합니다. 각각 다른 파스텔 배경색과 Hover 애니메이션이 있습니다.

**Claude Code 요청:**

```
"CLAUDE_CODE_PROMPTS.md의 Phase 5 프롬프트 실행해줄래?"
```

**요약 템플릿 (Claude가 작성):**

```
✅ 생성된 파일:
   - app/_components/sections/MyRecorder.tsx
   - app/_components/sections/Hero.tsx
   - app/_components/common/Footer.tsx

✅ 구현한 것:
   - MyRecorder: 01~04 카드(About Me/Experience & Projects/Posts/Resume)를 Card 컴포넌트로 렌더링,
     accent별 파스텔 배경(mint/peach/sky/purple), <article>+<Link> 구조
   - Hover 효과: 배경색 심화(group-hover:brightness-95), 스케일 1.02,
     화살표 슬라이드 애니메이션(group-hover:translate-x-1)
   - 실제 Stitch 시안(public/home.png) 확인 후 레이아웃 전면 재구성:
     - MyRecorder를 4열 그리드 → 세로 스택(flex flex-col)으로 변경
     - Hero.tsx 신규: 헤드라인("기록하고, 배우고, 나아갑니다") + "FRONTEND DEVELOPER" 라벨
       + "VIEW PROJECTS" 버튼(→ /experience)
     - Footer.tsx 신규: 로고 + 저작권(연도는 new Date().getFullYear()로 항상 최신)
       + GitHub/LinkedIn/Twitter 링크 (GitHub만 실제 URL, 나머지는 "#" 플레이스홀더)
     - page.tsx를 좌(Hero)/우(MyRecorder) 2단 그리드로 재구성, layout.tsx에 Footer 마운트
   - 접근성: section aria-label="포트폴리오 네비게이션", 화살표 aria-hidden,
     카드 텍스트는 다크모드에서도 text-light-text 고정(파스텔 배경과의 대비 유지)

✅ 테스트 완료:
   - 4개 카드 표시 (about/experience/posts/resume 라우트 연결 확인)
   - 배경색 정확함 (mint/peach/sky/purple 렌더링 확인)
   - Hover 효과 (brightness/scale/translate 클래스 생성 확인)
   - 애니메이션 (duration-200 transition)
   - 라이트/다크 모드
   - bun run type-check → `bunx tsc --noEmit` 통과, `bunx eslint` 통과
   - 실제 시안 이미지와 대조 후 재검증, dev 서버에서 헤드라인/버튼/Footer 렌더링 직접 확인

📍 다음: Phase 6 (Timeline + Experience)
```

---

## Phase 6️⃣: 경력 타임라인 + 프로젝트

**이 Phase에서 해야 할 것:**

경력 페이지의 타임라인(수직선과 마커)을 구현하고, 프로젝트 카드 3개를 추가합니다.

**Claude Code 요청:**

```
"CLAUDE_CODE_PROMPTS.md의 Phase 6 프롬프트 실행해줄래?"
```

**요약 템플릿 (Claude가 작성):**

```
✅ 생성된 파일:
   - app/_components/ui/TimelineItem.tsx
   - app/_components/sections/Experience.tsx

✅ 수정된 파일:
   - app/(routes)/experience/page.tsx (Experience 섹션 마운트)

✅ 구현한 것:
   - TimelineItem: 원형 마커(w-3 h-3, bg-light-accent #0066CC 고정 - 다크모드에서도 동일),
     2px 수직선(border-l-2, border-light-border/dark:border-dark-border),
     날짜(.badge)/직책(.body font-bold)/설명(.body) 순 콘텐츠
   - 마지막 항목은 last:border-transparent로 선이 마지막 마커 아래로 삐져나오지 않게 처리
   - Experience: <section aria-label="경력 타임라인"> + <ol>로 타임라인 구성
     (스펙의 "시멘틱 <timeline>"은 유효한 HTML 태그가 아니라서 순서 목록으로 대체 구현)

✅ 테스트 완료:
   - 타임라인 라인 (border-l-2 렌더링 확인)
   - 마커 표시
   - 라이트/다크 모드
   - bun run type-check → `bunx tsc --noEmit` 통과, `bunx eslint` 통과
   - dev 서버에서 /experience 렌더링 직접 확인

⚠️ 미완료:
   - 프로젝트 카드 3개는 이번에 다루지 않음 (CLAUDE_CODE_PROMPTS.md의 실제 Phase 6 프롬프트에는
     타임라인만 명시되어 있고 프로젝트 카드는 요구사항에 없었음 - 이 요약 항목의 제목/체크리스트와는
     범위가 다름)
   - 실제 경력 데이터(회사/기간/직책/설명) 없어서 전부 플레이스홀더로 채움 - 실제 데이터 필요

📍 다음: Phase 7 (Posts 페이지)
```

---

## Phase 7️⃣: Posts 페이지 + 필터

**이 Phase에서 해야 할 것:**

포스트 목록 페이지를 구현합니다. 카테고리별 필터, 포스트 카드, Supabase 연동이 포함됩니다.

**Claude Code 요청:**

```
"CLAUDE_CODE_PROMPTS.md의 Phase 7 프롬프트 실행해줄래?"
```

**요약 템플릿 (Claude가 작성):**

```
✅ 생성된 파일:
   - app/_lib/posts.ts (Supabase 쿼리 - lib/ 아닌 app/_lib에 배치, ARCHITECTURE.md의
     "SSR/RSC에서 직접 fetch" 흐름 유지하면서 lib/ 폴더는 supabase.ts/constants.ts 전용으로 유지)
   - app/_components/sections/Posts.tsx
   - app/_components/sections/PostsSkeleton.tsx

✅ 수정된 파일:
   - app/(routes)/posts/page.tsx (Suspense + 비동기 서버 컴포넌트로 데이터 스트리밍)
   - next.config.ts (Supabase Storage 도메인을 images.remotePatterns에 등록)

✅ 구현한 것:
   - POSTS 헤더, 카테고리 필터(All/Study/Troubleshooting/Retrospective) -
     role="tablist/tab/tabpanel" 전체 ARIA 패턴 적용
   - md:grid-cols-2 카드 그리드 - 썸네일(next/image) + 카테고리 배지 + 제목 + 설명 + 날짜
   - aria-live="polite"로 필터 변경 시 결과 개수 스크린리더 알림
   - getPublishedPosts(): is_published=true 필터, published_at 내림차순,
     에러는 console.error로 상세 로깅 후 사용자에겐 일반 메시지만 노출 (RULES.md 준수)
   - Suspense + PostsSkeleton으로 로딩 상태 처리

✅ 테스트 완료:
   - Supabase 연동 (실제 프로젝트 연결 확인 - 중간에 anon 권한(GRANT SELECT) 문제 발견 후 해결)
   - 실제 게시물 1건(is_published=true) 추가 후 카드 레이아웃 검증 완료:
     제목/설명/카테고리 배지("Study")/날짜(한국어 포맷)/썸네일(next/image 경유, 200 응답) 모두 정상 렌더링
   - bun run type-check → `bunx tsc --noEmit` 통과, `bunx eslint` 통과
   - dev 서버에서 /posts 200 응답 확인

⚠️ 여전히 브라우저 미연결로 직접 클릭까지는 확인 못한 것:
   - 필터 탭 클릭 시 실제 전환 동작 (로직/렌더링 결과는 HTML로 확인, 클릭 이벤트 자체는 미검증)
   - 라이트/다크 모드 전환 시 카드 색상 대비 (클래스 적용은 확인, 실제 시각적 대비는 미확인)
   - 카드 hover 등 인터랙션

📍 다음: Phase 8 (Resume 페이지)
```

---

## Phase 8️⃣: Resume 페이지

**이 Phase에서 해야 할 것:**

이력서 페이지를 구현합니다. 그리드 배경, 큰 "RESUME" 텍스트, 버튼 2개, 하단 라벨이 포함됩니다.

**Claude Code 요청:**

```
"CLAUDE_CODE_PROMPTS.md의 Phase 8 프롬프트 실행해줄래?"
```

**요약 템플릿 (Claude가 작성):**

```
✅ 생성된 파일:
   - app/_components/sections/Resume.tsx

✅ 수정된 파일:
   - app/globals.css (.grid-pattern-bg 추가)
   - app/(routes)/resume/page.tsx (Resume 섹션 마운트, 풀블리드로 전환)

✅ 구현한 것:
   - 그리드 패턴 배경: repeating-linear-gradient로 32px 격자,
     border-light-border(#E0E0E0)/dark:border-dark-border(#3A3939) 사용
   - "RESUME" 대형 텍스트: text-[clamp(4rem,15vw,12rem)] font-bold tracking-widest
     (Syne Bold, 화면 크기에 따라 64px~192px 반응형 스케일)
   - 하단 라벨 "SYS.READY // DOC.AVAILABLE": .badge(JetBrains Mono) 재사용, 섹션 하단 절대 위치
   - 버튼 2개: "이력서 보기"(채워진 버튼) + "PDF 다운로드"(아웃라인 버튼)
     - DARK_MODE_IMPLEMENTATION.md 스펙 반영 (CLAUDE_CODE_PROMPTS.md엔 "선택"으로만 표시됨)
   - "RESUME"을 페이지의 h1으로 사용 - /resume 페이지엔 별도 패딩/컨테이너 없이
     이 섹션만 풀블리드로 채워서 그리드 배경+초대형 텍스트의 임팩트 유지

✅ 테스트 완료:
   - 그리드 배경 (컴파일된 CSS로 repeating-linear-gradient 규칙 직접 확인)
   - RESUME 텍스트, 버튼 스타일, 라벨 표시 (dev 서버 HTML 응답으로 렌더링 확인)
   - 라이트/다크 모드 (다크 클래스 매핑 확인)
   - bun run type-check → `bunx tsc --noEmit` 통과, `bunx eslint` 통과

⚠️ 미완료:
   - "이력서 보기"/"PDF 다운로드" 링크는 실제 Notion 링크나 PDF 파일이 없어서 href="#" 플레이스홀더

📍 다음: 라이트 모드 추가
```

---

## Phase 9️⃣: Footer 컴포넌트

**요약 (이전 세션에서 완료, 이번 세션에서 문서만 정리):**

```
✅ 생성된 파일:
   - app/_components/common/Footer.tsx

✅ 구현한 것:
   - 로고(YEJI.) + 저작권 문구 + GitHub/Velog 외부 링크
   - 외부 링크는 http로 시작할 때만 target="_blank" rel="noopener noreferrer" 적용
   - app/layout.tsx에 전역 마운트 (모든 페이지 하단 공통 표시)

📍 다음: About Me 페이지
```

---

## Phase 🔟: About Me 페이지

**이 Phase에서 해야 할 것:**

About Me 페이지를 구현합니다. 인사말/외부 링크, 기술 스택, 학력, "기록의 여정" 타임라인이 포함됩니다.
대화가 이어지며 요구사항이 여러 차례 조정되어, 최종 결과물은 최초 기획(2단 레이아웃 + 인적사항 테이블)과는
꽤 달라졌습니다.

**요약:**

```
✅ 생성된 파일:
   - app/_components/sections/AboutIntro.tsx (인사말 + GitHub/Velog 외부 링크)
   - app/_components/sections/AboutInfo.tsx (기술 스택 + 교육 및 어학)
   - app/_components/sections/AboutVision.tsx ("기록의 여정" 4단계, 클릭형 상세 카드)
   - app/_components/ui/HoverDisclosure.tsx (호버/포커스 시 상세 설명을 보여주는 범용 UI)
   - app/_hooks/useInView.ts (IntersectionObserver 커스텀 훅, prefers-reduced-motion 대응)

✅ 수정된 파일:
   - app/(routes)/about/page.tsx (AboutIntro → AboutVision → AboutInfo 순서로 세로 배치)
   - app/_components/ui/Badge.tsx (icon prop 추가 - 브랜드 로고/lucide 아이콘을 라벨과 함께 표시)
   - app/layout.tsx (<html>에 suppressHydrationWarning 추가 - 트러블슈팅 1번 참고)
   - app/globals.css (fade-up-in, pop-in 키프레임 추가)
   - lib/constants.ts

✅ 구현한 것:
   - 기술 스택 배지: react-icons/si 브랜드 로고 + 시그니처 컬러(React #61DAFB, TypeScript #3178C6,
     Tailwind CSS #06B6D4, Supabase #3ECF8E). Next.js/GitHub는 모노톤 브랜드라 고정 색 대신
     currentColor 상속으로 라이트/다크 모드에 자동 대응
   - 배지 호버/포커스 시 HoverDisclosure로 구현 수준 설명 카드 표시 - 문장 배열(string[])로 받아
     한 문장씩 줄바꿈되도록 렌더링
   - "기록의 여정" 4단계(RECORD/REFLECT/LEARN/IMPROVE) - 좌측 타임라인을 클릭하면 우측에
     굵은 점선 테두리(border-4 border-dotted) 카드로 상세 설명 표시, aria-pressed/aria-live로 접근성 처리
   - "교육 및 어학" 섹션 - 인적사항 테이블(이름/생년월일/이메일/위치)을 완전히 대체, 날짜를
     모노스페이스(JetBrains Mono)로 강조한 "코딩 스타일" 타임라인으로 재구성
   - 전 구간에 걸쳐 motion-safe: 로만 게이팅한 등장 애니메이션 적용 (fade-up-in 순차 등장,
     pop-in 배지 등장) - prefers-reduced-motion 사용자는 애니메이션 없이 즉시 전체 노출
   - AboutInfo/AboutVision 각각 useInView로 자신의 섹션이 스크롤로 뷰포트에 들어올 때만
     1회성으로 애니메이션 트리거 (페이지 로드 시 일괄 재생 → 스크롤 연동으로 전환)
   - 레이아웃을 2단(그리드) → 세로 1단 스택으로 전환

✅ 트러블슈팅 (원인 → 해결 → 결과):

1. **다크모드 초기화 스크립트로 인한 hydration mismatch 경고**
   - 원인: `<head>`의 인라인 스크립트(THEME_INIT_SCRIPT)가 React 하이드레이션 전에
     `document.documentElement.classList.add("dark")`로 `<html>`의 class를 직접 수정 →
     서버가 렌더링한 className과 클라이언트의 실제 DOM className이 달라짐
   - 해결: `<html>`에 `suppressHydrationWarning` 추가 (next-themes 등에서 공식적으로 권장하는
     패턴 - 의도된 불일치이므로 해당 노드에 한해 경고만 억제, 하위 트리의 실제 버그는 계속 감지됨)
   - 결과: 콘솔 hydration 경고 제거, 다크모드 깜빡임 방지 스크립트는 그대로 유지

2. **기술 스택 호버 카드가 배지 하나 너비(~97px)로 극단적으로 좁게 깨짐**
   - 원인: 카드 등장 애니메이션(pop-in)을 배지를 감싼 `<li>`에 걸었는데, `animation-fill-mode: both`가
     끝난 뒤에도 `transform: scale3d(1,1,1)`(값은 유지되고 `none`이 아님) 상태로 남음. CSS 스펙상
     `transform`이 `none`이 아니면 그 요소가 absolute 자손의 새로운 containing block이 되어버려서,
     `position:absolute`인 카드가 의도했던 바깥의 넓은 컨테이너가 아니라 이 `<li>`를 기준으로 위치를
     잡아버림 (SSR HTML만 확인하고 실제 렌더링 크기를 안 봐서 처음엔 놓쳤고, Playwright로 헤드리스
     브라우저를 설치해 실제 computed style/스크린샷을 찍은 뒤에야 원인을 특정함)
   - 해결: 등장 애니메이션을 패널의 조상인 `<li>`에서, 패널과 형제 관계라 containing block에
     영향을 주지 않는 트리거 `<span>`으로 이동 (`HoverDisclosure`에 `triggerClassName`/`triggerStyle`
     prop 추가)
   - 결과: 카드가 의도한 너비로 정상 표시됨. 이후 유사 애니메이션(교육 타임라인의 `display:contents`
     `<li>` 등)에도 "패널의 조상에 transform 애니메이션을 걸지 않는다" 원칙을 코드 주석으로 남겨 재발 방지

3. **React "두 자식이 같은 key를 가짐" 경고 (Next.js 개발자 오버레이에 Issues로 표시됨)**
   - 원인: 학력/자격증 placeholder 데이터가 여러 항목에서 동일한 문자열이라, `key={entry.title+period}`
     / `key={detail}`처럼 콘텐츠 기반 key를 쓰면서 중복 발생
   - 해결: 인덱스 기반 key(`key={index}`)로 교체 (플레이스홀더 특성상 실데이터 입력 전까지는
     안전한 선택)
   - 결과: 개발자 오버레이 Issues 사라짐, 콘솔 경고 0건 확인

✅ 테스트 완료:
   - `bunx tsc --noEmit`, `bun run lint` 매 변경마다 통과 확인 (경고 0건)
   - Playwright(Chromium) 설치 후 실제 스크린샷/DOM 순서/computed style로 라이트·다크 모드,
     호버 카드 크기, 클릭 상호작용, 애니메이션 마크업을 다건 검증 (SSR 텍스트 확인만으로는
     실제 렌더링 크기 버그를 못 잡는다는 것을 이번에 확인함 → 이후 시각 버그는 스크린샷으로 우선 검증)

📍 다음: 실제 개인정보(이름/생년월일/이메일/위치/학력/어학·자격증 상세)로 placeholder 교체
```

(추신: 미커밋 파일은 이후 커밋되어 PR #17로 dev에 머지 완료)

---

## Phase 1️⃣1️⃣: Home Hero 섹션

**요약 (Phase 5 MY RECORDER 세션에서 함께 구현되어 이미 커밋되어 있었음, 이번 세션은 검증 + 문서 정리):**

```
✅ 대상 파일:
   - app/_components/sections/Hero.tsx (Phase 5 "feat: MY RECORDER 카드 섹션 추가" 커밋에 포함)
   - app/page.tsx (Hero + MyRecorder를 2단 그리드로 배치)

✅ 구현 내용:
   - 좌측 메인 카피 "기록하고, / 배우고, / 나아갑니다" (h1, 3줄)
   - "FRONTEND DEVELOPER" 서브텍스트
   - "VIEW PROJECTS" CTA 버튼 → /experience로 이동 (pill 모양, 호버/포커스 시 accent 컬러)

✅ 검증 (Playwright, Chromium 헤드리스):
   - 헤딩/서브텍스트/CTA 버튼 텍스트 및 표시 여부 확인
   - CTA 버튼 클릭 → /experience 정상 이동 확인
   - 라이트/다크 모드 전환 후 스크린샷 비교, 콘솔 에러 0건 확인
   - bunx tsc --noEmit, bun run lint 통과 확인

📍 다음: Phase 12 - Posts 상세 페이지
```

---

## Phase 1️⃣2️⃣: Posts 상세 페이지

**요약:**

```
✅ 생성된 파일:
   - app/_components/sections/PostContent.tsx (Tiptap HTML을 dangerouslySetInnerHTML로 렌더링)

✅ 수정된 파일:
   - app/(routes)/posts/[slug]/page.tsx (플레이스홀더 → 실제 조회/렌더링/메타데이터로 구현)
   - app/_lib/posts.ts (getPostBySlug 추가 - slug + is_published 필터, maybeSingle)
   - app/globals.css (.post-content - h2/h3/p/ul/ol/a/code/pre/blockquote/img 등 커스텀 prose 스타일,
     @tailwindcss/typography 미설치라 디자인 시스템 토큰으로 직접 정의)

✅ 구현 내용:
   - 동적 라우팅 [slug] + Supabase 단건 조회 (getPostBySlug)
   - 존재하지 않거나 미공개(is_published=false) 게시물은 notFound()로 404 처리
   - generateMetadata로 title/description/OG 태그 동적 설정 (게시물 없을 때 폴백 타이틀도 처리)
   - 카테고리 배지 + 제목 + 발행일 + 썸네일(next/image) + 본문(PostContent) 순서로 렌더링

✅ 검증:
   - 실제 Supabase 데이터(slug: test-post-1)로 조회 성공 확인 (curl 200)
   - 존재하지 않는 slug → 404 상태 코드 확인 (curl 404)
   - <title>, og:description 태그에 실제 게시물 데이터 반영 확인
   - Playwright로 라이트/다크 모드 스크린샷 확인
   - bunx tsc --noEmit, bun run lint 통과
   - bun run build 프로덕션 빌드 성공, /posts/[slug]가 ƒ(Dynamic)로 정상 표시

✅ 트러블슈팅:
   - notFound() 호출 시 개발 모드 콘솔에 "Encountered a script tag..." React 경고 발견
     → 원인: layout.tsx의 테마 초기화 인라인 <script> + notFound() 바운더리 조합에서만 발생하는
       React 개발 모드 전용 경고 (프로덕션 빌드로 재현 시 사라짐 확인) → 실사용에 영향 없어 그대로 둠

📍 다음: Phase 13 - Posts 페이지네이션
```

---

## Phase 1️⃣3️⃣: Posts 페이지네이션

**요약:**

```
✅ 수정된 파일:
   - lib/constants.ts (POSTS_PAGE_SIZE=6 - 클라이언트/서버 공용 상수)
   - app/_lib/posts.ts (getPublishedPosts가 { category, offset }를 받아
     { posts, hasMore }를 반환하도록 변경, count: "exact" + range()로 hasMore 계산)
   - app/api/posts/route.ts (?category=&offset= 쿼리 파라미터 파싱, 유효하지 않은
     category는 무시)
   - app/(routes)/posts/page.tsx (prefetchQuery → prefetchInfiniteQuery로 전환)
   - app/_components/sections/Posts.tsx (useQuery → useInfiniteQuery, 카테고리 필터를
     클라이언트 필터링에서 서버 쿼리 파라미터로 이동, 하단 "더 많은 글 보기" 버튼 추가)

✅ 구현 내용:
   - 카테고리 필터가 이제 Supabase 쿼리 단에서 처리됨 (기존엔 전체를 받아 클라이언트에서
     필터링) - 카테고리 전환 시 useInfiniteQuery의 쿼리 키(["posts", category])가
     바뀌면서 자동으로 해당 카테고리의 1페이지부터 새로 로드
   - "더 많은 글 보기" 클릭 → fetchNextPage()로 다음 offset 요청, 기존 목록 뒤에 이어붙임
   - hasMore가 false면 버튼 자동 숨김 (마지막 페이지 처리)

✅ 검증:
   - 실 DB에는 테스트 게시물이 1건뿐이라 다중 페이지 상황을 재현할 수 없어,
     Playwright route 모킹으로 /api/posts 응답을 가로채 Study 14건 / Troubleshooting 3건 /
     Retrospective 0건의 가상 데이터로 테스트
   - 초기 6개 → 버튼 클릭 1회 12개 → 2회 14개(마지막 페이지, 버튼 사라짐) 확인
   - 카테고리 전환 시 해당 카테고리 1페이지로 리셋, 빈 카테고리는 안내 문구 표시 확인
   - 같은 카테고리로 복귀 시 기존에 불러온 페이지가 유지되는 것도 확인
     (TanStack Query가 쿼리 키별로 페이지를 누적 캐싱하는 기본 동작 - 의도한 대로임)
   - 실제 DB(게시물 1건)로도 /api/posts 응답 형태가 { posts, hasMore } 정상 확인
   - bunx tsc --noEmit, bun run lint 통과

✅ 트러블슈팅:
   - 서비스 롤 키로 테스트 게시물을 임시로 여러 건 추가해 실 DB에서 페이지네이션을
     검증하려 했으나 "permission denied for table posts" (INSERT 권한 없음)로 실패
     → DB 권한을 우회하지 않고, 대신 Playwright route 모킹으로 클라이언트 로직만
       독립적으로 검증하는 방식으로 전환 (실제 데이터베이스에 손대지 않아 더 안전했음)

📍 다음: Phase 1️⃣4️⃣: Experience Projects 섹션 테스트 콘텐츠
```

---

## Phase 1️⃣4️⃣: Experience Projects 섹션 테스트 콘텐츠

**요약:**

```
✅ 생성된 파일:
   - app/_components/sections/Projects.tsx (PROJECTS 섹션 + 테스트 프로젝트 카드 3개)

✅ 수정된 파일:
   - app/(routes)/experience/page.tsx (Projects 섹션 추가, Experience와의 mt/mb 간격 조정)
   - app/_components/sections/Experience.tsx (스크롤 진입 시 페이드인 애니메이션 추가)

✅ 구현 내용:
   - 테스트 프로젝트 카드 3개, accent 색상 sky/peach/mint로 순환 (Card 컴포넌트의
     accent prop 재사용, About Intro 배경 도형과 동일한 dark:bg-{accent}/45 처리)
   - 카드 내부: 이미지/비디오(next/image 또는 <video>) + 제목 + 설명 + 태그(Badge) +
     배포/GitHub/포스트 외부 링크(아이콘 버튼) + "자세히 보기" 토글로 여는 상세 설명 목록
   - GitHub 아이콘은 lucide-react에 없어 react-icons/si의 SiGithub로 대체 (Header.tsx와
     동일 패턴), 배포/포스트 링크는 lucide-react의 Globe/FileText 사용
   - 접근성: 링크에 aria-label(새 탭에서 열림 안내) + title, 토글 버튼에
     aria-expanded/aria-controls, 포커스 시 focus-visible:outline, 카드 배경이
     다크모드에서 어두운 파스텔 톤으로 바뀌므로 텍스트/보더 색상도 dark:text-dark-text /
     dark:text-white/80 / dark:border-white/40으로 재조정해 대비 확보
   - 반응형: 모바일에서는 flex-col(이미지 위, 콘텐츠 아래)로 1열, sm 이상에서
     flex-row로 전환, 카드 최대 너비 max-w-4xl + mx-auto로 중앙 정렬
   - 스크롤 위치 기반 페이드인: 카드마다 개별 useInView 훅으로 뷰포트 진입 시 애니메이션
     (섹션 전체가 한 번에 나타나지 않고 스크롤함에 따라 카드가 하나씩 나타남),
     Card 컴포넌트가 ref를 forward하지 않아 <div ref={ref}>로 감싸는 방식 사용,
     애니메이션 길이는 0.6s → 0.35s로 단축(사용자 요청)
   - Experience 섹션에도 동일한 스크롤 페이드인 패턴 적용, 페이지 진입 시 Experience만
     먼저 보이도록 mt-24 + mb-[5vh]로 간격 조정

✅ 테스트 완료:
   - bunx tsc --noEmit, bun run lint 매 변경마다 통과 확인 (경고 0건)
   - bun run build 프로덕션 빌드 성공, /experience가 ○(Static)으로 정상 프리렌더링 확인
   - 사용자가 실제 브라우저(라이트/다크 모드, 데스크톱/모바일 폭)에서 직접 확인하며
     카드 너비/이미지 크기/카드 간격/아이콘 대비/다크모드 배경 등을 여러 차례 반복
     피드백 → 즉시 반영하는 방식으로 시각 검증 진행 (본 세션에는 별도 스크린샷 자동화
     도구가 연결되어 있지 않아 Playwright 자동 캡처는 하지 못함)

✅ 트러블슈팅:
   - Card 컴포넌트가 ref를 forward하지 않아 <Card ref={ref}>가 동작하지 않음
     → <div ref={ref}>로 Card를 감싸고 페이드인 클래스를 그 wrapper에 적용하는 방식으로 해결
   - 섹션 레벨 단일 useInView로는 gap-[12vh]로 떨어진 카드들이 스크롤 진입 시점과
     무관하게 섹션 진입 시 한 번에 애니메이션이 끝나버림 → useInView를 ProjectCard 내부로
     옮겨 카드별로 독립적인 관찰자를 갖도록 수정

📍 다음: Phase 15 - Resume 그리드 배경 웨이브 효과
```

---

## Phase 1️⃣5️⃣: Resume 그리드 배경 웨이브 효과

**요약:**

```
✅ CSS 시도 기록 (다섯 차례 반복 후 사용자가 WebGL 셰이더 방식을 명시적으로 요청):
   1. 대각선 translate3d로 격자 전체를 32px/32s 한 방향 이동
      → "애니메이션이 안 보인다" 피드백. macOS Reduce Motion은 defaults read로 꺼져
        있음을 확인했고, 완전히 균일한 주기 패턴을 그대로 밀면 기준점이 없어 움직임이
        거의 감지되지 않고 속도도 초당 1px로 너무 느렸던 것이 원인으로 파악됨
   2. 좌우 스웨이 애니메이션 + 은은한 방사형 하이라이트 추가
      → "파도 물결 같은 웨이브 효과"를 원한다는 재요청
   3. 격자선을 곡선 물결 SVG 라인 3겹으로 교체, marquee와 동일한 가로 흐름 방식
      → "격자무늬가 파도 타는 느낌"이라고 재차 구체화 (물결선 교체가 아니라 격자 자체가
        웨이브를 타야 한다는 의도)
   4. 직선 격자를 유지한 채 판 전체를 perspective + rotateX로 기울이는(pitch/bob) 방식
      → "이런 느낌이 아니라 굴곡이 있는 것처럼 입체적인 웨이브"라고 재차 명확화
   5. 격자를 가로 띠 14개로 쪼개 띠마다 다른 위상(animation-delay)으로 스웨이시켜 곡면처럼
      굽이치는 웨이브 구현
      → "효과없애" 요청으로 CSS 웨이브 효과 자체를 제거, 정적 그리드로 임시 복귀
   6. 사용자가 WebGL 셰이더(Fragment Shader) 기반 3D Wave Terrain을 구체적인 기술 스펙
      (그리드 34~35분할, 색상 hex값, 시간 계수 0.2, u_mouse 반응, fixed 레이어 배치 등)과
      함께 명시적으로 요청 → CSS 반복을 중단하고 WebGL로 재구현 (아래 최종 구현)

✅ 최종 구현 (WebGL Fragment Shader):
   - 신규: app/_lib/wave-grid.ts - 정점/프래그먼트 셰이더 소스, WebGL 프로그램 컴파일·
     링크·유니폼 바인딩을 담당하는 순수 함수형 렌더러 팩토리(createWaveGridRenderer)
   - 신규: app/_components/sections/ResumeWaveGrid.tsx - canvas ref, RAF 루프,
     ResizeObserver, pointermove/테마 변경 이벤트 리스너 등 React 생명주기만 담당
   - 수정: app/_components/sections/Resume.tsx - <ResumeWaveGrid />를 섹션 최상단에
     마운트, 기존 grid-pattern-bg 클래스는 제거(셰이더가 배경/격자/비네팅을 전부 그림)
   - 수정: app/globals.css - 더 이상 쓰이지 않는 grid-pattern-bg 규칙 삭제
   - 프래그먼트 셰이더: 다중 주파수 사인파 3개 + 중심 방사형 리플 + 마우스 위치(u_mouse)
     반응 리플을 합성해 높이값(terrain)을 계산 → 그 높이값만큼 격자 UV를 미세하게 뒤틀어
     굴곡진 지형처럼 보이게 하고, 인접 지점과의 높이 차(기울기)로 능선을 추정해 라인
     컬러를 연회색(#E2E4EC)→슬레이트(#BAC3D4)로 그라데이션
   - 시간 계수 0.2를 곱해 매우 느리고 명상적인 속도로 조정, 모서리로 갈수록 흐려지는
     비네팅으로 중앙 텍스트 가독성 확보
   - fwidth 기반 안티앨리어싱은 OES_standard_derivatives 확장이 있을 때만 사용하고,
     없으면 고정 폭으로 대체(buildFragmentShaderSource(hasDerivatives) 분기) - 확장
     미지원 환경에서도 렌더링이 계속되도록 함
   - canvas는 pointer-events-none fixed inset-0 -z-10으로 배치해 텍스트/버튼 클릭을
     막지 않고 최하단 레이어로 표시
   - ResizeObserver로 canvas 레이아웃 크기 변화를 감지해 devicePixelRatio(최대 2)
     기준으로 backing store 해상도를 다시 맞춤
   - prefers-reduced-motion 감지 시 첫 프레임만 정적으로 렌더링하고 requestAnimationFrame
     루프를 시작하지 않음
   - 다크모드는 document.documentElement의 "dark" 클래스 + 기존 ThemeToggle이 쏘는
     "theme-change" 커스텀 이벤트를 그대로 구독해 u_dark 유니폼을 갱신 (라이트: #FFFFFF~
     #F9FAFC 배경/연회색·슬레이트 라인, 다크: #141313 배경에 기존 dark-border 톤 +
     블루 계열 능선 하이라이트)
   - 셰이더 컴파일/링크 실패 시 조용히 무시하지 않고 console.error로 정보 로그를 남기도록
     구현(디버깅 편의 + 실패해도 페이지 크래시 없이 캔버스만 비어있게 우아하게 저하)

✅ 테스트 완료:
   - bunx tsc --noEmit, bun run lint, bun run build(프로덕션 빌드 성공, /resume 여전히
     ○ Static) 통과 확인
   - 두 파일 모두 300줄 미만(wave-grid.ts 197줄, ResumeWaveGrid.tsx 88줄)으로
     CODING_CONVENTIONS.md의 컴포넌트 파일 300줄 제한 준수 확인
   - GLSL 셰이더 자체는 tsc/lint로 검증되지 않는 문자열이라, 실제 WebGL 컨텍스트에서
     별도로 컴파일·렌더링 테스트를 진행: mock gl로 wave-grid.ts가 실제로 생성하는
     정점/프래그먼트 셰이더 소스를 추출한 뒤, 로컬 정적 서버 + 헤드리스 Chrome에서 그
     소스를 그대로 컴파일·링크·draw까지 실행해 gl.getError()===0과 여러 지점의
     readPixels 값이 서로 다른(즉 배경색 고정이 아니라 지형/격자/비네팅이 실제로 계산되고
     있는) 것을 확인. OES_standard_derivatives 확장 분기(fwidth 사용 버전)는 이
     헤드리스 환경(소프트웨어 렌더러)이 해당 확장을 지원하지 않아 그 환경에서는
     컴파일이 실패했지만, 프로덕션 코드가 정확히 같은 gl.getExtension 결과에 따라
     자동으로 검증된 대체(고정 폭) 셰이더를 선택하도록 되어 있어 실제 동작에는 영향 없음
   - 실제 브라우저에서의 시각적 확인(격자 굴곡·색상 그라데이션·비네팅·마우스 반응이
     기대한 대로 "느껴지는지")은 이 세션에 연결된 대화형 브라우저가 없어 사용자 확인이
     필요함

📍 다음: 사용자가 실제 브라우저에서 /resume을 열어 시각적으로 확인 필요 (굴곡 강도,
   격자 촘촘함, 능선 색상 대비, 마우스 반응 정도 등 튜닝 여지 있음)
```

## 🔧 트러블슈팅: "적용이 안됐는데?" (WebGL 캔버스가 안 보임)

**문제**

위 최초 구현을 사용자가 개발 서버에서 확인했을 때 배경 효과가 전혀 보이지 않는다고 보고.

**원인 진단**

1. **실제 버그**: `<canvas>`는 대체 요소(replaced element)라서 `position: fixed; inset: 0;`만으로는
   뷰포트 전체로 늘어나지 않고 고유 크기(기본 300×150px)로 좌상단에만 렌더링됨 -
   `className`에 `h-full`/`w-full` 계열 클래스가 빠져 있었음
2. **실제 버그**: `resize()`에 `if (canvas.width === width && canvas.height === height) return;`
   가드가 있어, React가 개발 모드에서 effect를 두 번 실행(mount → cleanup → 재-mount)할 때
   두 번째 mount에서 만들어진(실제로 화면을 그리는) renderer는 `canvas.width/height`가
   이전 mount 값과 같다는 이유로 이 가드에 걸려 `renderer.resize()`(viewport/`u_resolution`
   설정)가 한 번도 호출되지 않음 → `u_resolution`이 0으로 남아 프래그먼트 셰이더에서
   0 나누기가 발생할 수 있는 상태였음
3. **GLSL 스펙 위반(잠재적 버그)**: `smoothstep(edge0, edge1, x)`는 GLSL 스펙상 `edge0 < edge1`을
   요구하는데, "중심에서 멀어질수록 감쇠"를 표현하려고 `smoothstep(0.85, 0.0, d)`처럼 edge
   순서를 반대로 쓴 곳이 3곳 있었음(스펙상 undefined behavior) → `1.0 - smoothstep(0.0, 0.85, d)`
   형태로 edge 순서를 올바르게 교정
4. **디버깅 방법론 이슈(실제 사용자 버그 아님)**: 위 1, 2를 고친 뒤에도 헤드리스 Chrome +
   CDP(Runtime.evaluate)로 비동기에 `readPixels`/`toDataURL`을 호출해 검증하니 계속 검은
   화면으로 나와 한동안 추가 원인을 의심함 → `preserveDrawingBuffer: true`를 임시로 켜서
   테스트해보니 실제로는 물결 리플이 정상 렌더링되고 있었음을 확인. 기본값
   `preserveDrawingBuffer: false`에서는 브라우저가 합성 직후 드로잉 버퍼를 비울 수 있는데,
   실제 브라우저 탭은 매 프레임을 화면에 연속으로 합성/표시하므로 이 문제와 무관하고,
   CDP로 루프 밖에서 비동기로 읽어들이는 내 테스트 방식에서만 발생하는 경합이었음
   (실제 사용자에게 영향 없어 최종 코드에는 preserveDrawingBuffer를 추가하지 않음)

**해결**

- `ResumeWaveGrid.tsx`의 canvas className에 `h-screen w-screen` 추가
- `resize()`를 "캔버스 백킹 버퍼 크기 재할당은 변경 시에만, `renderer.resize()` 호출은 항상"
  구조로 변경
- `wave-grid.ts`의 smoothstep 호출 3곳 모두 `edge0 < edge1` 순서로 교정

**결과**

- 헤드리스 Chrome + CDP로 `document.querySelector("canvas")`의 `clientWidth/Height`가
  `window.innerWidth/innerHeight`와 정확히 일치함을 확인 (뷰포트 전체를 덮음)
- `preserveDrawingBuffer: true`로 임시 전환해 `canvas.toDataURL()`을 디코딩한 결과, 중심에서
  퍼지는 동심원 리플과 의도한 라이트 톤 배경/그라데이션이 실제로 렌더링되고 있음을 시각적으로
  확인 (스크린샷 확보)
- `bunx tsc --noEmit`, `bun run lint`, `bun run build` 모두 재통과 확인
- 사용자가 화면이 안 보였던 근본 원인(캔버스 크기 0에 가까움 + Strict Mode 재마운트 시
  리사이즈 스킵)은 해결되었으므로, 새로고침 시 실제로 보일 것으로 기대됨 - 다만 실제
  브라우저에서의 최종 육안 확인은 사용자 몫으로 남아있음

## 🔧 Resume 배경 셰이더 재작성: 새 프롬프트로 단순화 + 그리드 라인 수식 버그 발견

**요청**: 사용자가 다음 프롬프트로 그리드 배경을 다시 만들어달라고 요청 - "화이트 배경 +
은은한 연회색 사각 격자선", "파도 물결처럼 매우 느리고 잔잔하게 일렁이는 3D 굴곡 효과",
"최하단 레이어(z-index: -10, pointer-events: none)로 고정".

**변경 내용**:
- `app/_lib/wave-grid.ts`를 이 세 조건에 맞춰 단순화: 방사형 리플/마우스 반응/능선
  하이라이트 그라데이션/비네팅을 모두 제거하고, 다중 주파수 사인파 지형(진폭도 더 낮춰
  "잔잔하게")으로 격자 UV만 미세하게 뒤트는 구조로 축소. `u_mouse` 유니폼과 관련 로직도
  `render()` 시그니처에서 제거
- `app/_components/sections/ResumeWaveGrid.tsx`에서 pointermove 리스너 및 마우스 좌표
  추적 코드 삭제, `TIME_SPEED`를 0.2 → 0.15로 낮춰 더 느긋하게 조정
- 다크 모드는 프롬프트에 언급 없었지만, 이 사이트 다크 토큰(`dark:text-dark-text`가
  흰색)과 화이트 배경이 겹치면 텍스트가 안 보이는 회귀가 생기므로 `u_dark` 분기는 유지

**트러블슈팅 - 그리드 라인이 안 보이고 균일한 회색으로만 채워짐**

- **문제**: 단순화 후 `preserveDrawingBuffer: true`로 스크린샷을 떠보니 격자선 없이
  전체가 라인 컬러(연회색)로 균일하게 채워져 있었음
- **원인**: `gridDist`(셀 중심 0 ~ 셀 경계 0.5)에 대해
  `1.0 - smoothstep(0.0, aa, gridDist - 0.48)` 형태로 계산했는데, `gridDist - 0.48`은
  셀 중심 근처에서 음수(-0.48)이고 경계 근처에서만 살짝 양수(+0.02)가 됨 →
  `smoothstep(0.0, aa, x)`는 x<0(edge0 미달)일 때 0을 반환하므로, 셀 중심을 포함한
  대부분 영역에서 `1.0 - 0 = 1.0`(=라인 색 100%)이 나오고, 오히려 경계 근처에서만 값이
  줄어드는 **완전히 뒤집힌 수식**이었음(이전의 더 복잡했던 버전에도 동일한 수식이 있었으나
  방사형/비네팅 효과에 시각적으로 가려져 있었던 것으로 추정)
- **해결**: `lineEdge = 0.5 - aa*1.5`로 두고 `smoothstep(lineEdge, 0.5, gridDist)`로
  교정 - gridDist가 0(중심)일 때 0, 0.5(경계)에 가까워질 때만 1로 올라가는 올바른 방향의
  수식으로 변경
- **결과**: `preserveDrawingBuffer: true`로 다시 스크린샷 확인 → 화이트 배경 위에 은은한
  연회색 사각 격자선이 선명하게 보이고, 격자선 자체가 완만하게 곡선처럼 휘어 있어(3D 굴곡)
  파도가 잔잔하게 일렁이는 느낌을 확인. 확인 후 `preserveDrawingBuffer`는 실제 사용자
  경험에는 불필요하므로 최종 코드에서 제거
- `bunx tsc --noEmit`, `bun run lint`, `bun run build` 모두 통과 확인

## 🔧 애니메이션 속도 조정 + 배경 범위를 Resume 섹션으로 한정

**요청**: "애니메이션 효과 속도가 너무 느려", "기존에 푸터까지 격자 그리드 배경이
들어가있었어? 그게 아니라면 푸터 부분에는 배경 제거해."

**진단**: `Footer.tsx`에는 배경색이 지정되어 있지 않음(`border-t`만 있음). 캔버스가
`position: fixed; inset: 0;`으로 뷰포트 전체에 고정되어 있었기 때문에, 스크롤해서
푸터가 보이는 시점에도 그 뒤로 그리드가 그대로 비쳐 보이는 게 실제 동작이었음 -
의도한 것이 아니라 배경 색이 없는 요소 뒤로 fixed 레이어가 계속 노출된 것.

**해결**:
- `app/_components/sections/ResumeWaveGrid.tsx`: canvas의 `fixed inset-0` →
  `absolute inset-0`으로 변경. 부모인 Resume `<section>`이 이미 `relative`
  `overflow-hidden`이라, absolute로 바꾸면 캔버스가 그 section 박스 안에만 그려지고
  스크롤에 딸려 함께 사라짐(더 이상 뷰포트에 고정되지 않음)
- `TIME_SPEED`를 0.15 → 0.6으로 올려 애니메이션을 눈에 띄게 빠르게 함

**검증**:
- 헤드리스 Chrome + CDP로 `canvas.getBoundingClientRect()`가 Resume section의
  `getBoundingClientRect()`와 정확히 일치(741×416.9, top 57)하고, 캔버스 하단(473.9)이
  Footer 시작 지점(473.9)과 정확히 맞아떨어져 더 이상 겹치지 않음을 확인
- `preserveDrawingBuffer: true`로 임시 전환해 스크린샷 재확인 - 그리드/곡률이 정상
  렌더링됨을 확인 후 해당 플래그 제거
- `bunx tsc --noEmit`, `bun run lint`, `bun run build` 모두 통과 확인

## 🔧 그리드가 메인 영역을 다 못 채움 + 속도 추가 조정

**요청**: "그리드 배경이 메인영역에 다 안찼어", "속도보다 0.3초 빠르게 바꿔"

**원인**: 이전 검증은 작은 헤드리스 뷰포트(469px 높이)에서만 확인했는데, 그 화면은
Resume 콘텐츠(거대한 RESUME 제목 폰트 등) 자체가 뷰포트보다 커서 우연히 section이
main과 크기가 맞아떨어졌던 것. 실제 데스크톱 크기(1440×900)로 다시 확인해보니 section
높이(569px)가 main의 실제 높이(655px)보다 작아 86px의 빈 공간이 있었음 - `min-h-[70vh]`
는 "최소" 높이일 뿐이라, `<main className="flex-1">`이 남는 세로 공간을 더 많이 차지할
때는 그 차이만큼 캔버스가 못 채우는 구조였음. 처음 시도한 `h-full`도 이 flex 체인에서
퍼센트 높이가 순환 참조로 무시되어 효과가 없었음

**해결**:
- `app/(routes)/resume/page.tsx`: `<main className="flex-1">` → `<main className="flex flex-1 flex-col">`
- `app/_components/sections/Resume.tsx`: section의 `h-full` → `flex-1`로 교체
  (`min-h-[70vh]`는 최소 높이 floor로 유지) - main이 flex 컨테이너가 되고 section이
  그 안에서 flex-1로 남는 공간을 모두 차지하도록 구조를 바꿔, 퍼센트 높이의 순환 참조
  문제를 근본적으로 피함
- `ResumeWaveGrid.tsx`의 `TIME_SPEED`를 0.6 → 0.9로 조정

**검증**: 헤드리스 Chrome을 3가지 뷰포트(800×600, 1440×900, 1440×1600)로 각각 새로
띄워 canvas/section/main의 `getBoundingClientRect()`가 세 크기 모두에서 완전히
일치하고(gap=0), Footer 시작 지점과도 정확히 맞아떨어짐을 확인. `bunx tsc --noEmit`,
`bun run lint`, `bun run build` 모두 통과.

## 🔧 마우스 호버 시 그리드가 움푹 파이는(dent) 효과 추가

**요청**: "그리드 배경에 마우스를 대면 그리드 굴곡이 움푹 파져보이는 효과를 추가해줘"

**구현**:
- `app/_lib/wave-grid.ts`: `u_mouse` 유니폼을 다시 추가하고, `dentAmount(p)` 함수로
  마우스 위치에서 `DENT_RADIUS`(0.35) 안쪽만 부드럽게 감쇠하는 depth(0~1)를 계산.
  `terrain()`에서 이 값만큼 높이를 **빼서**(이전 버전의 "튀어나오는" 리플과 반대 방향)
  마우스 주변이 움푹 파이게 하고, `main()`에서도 같은 값으로 색상을 살짝 어둡게 곱해
  파인 안쪽에 그림자가 지는 느낌을 더함
- `app/_components/sections/ResumeWaveGrid.tsx`: canvas 자체가 `pointer-events-none`이라
  자체 이벤트를 못 받으므로 `window`에서 `pointermove`를 추적하다가, 매번
  `canvas.getBoundingClientRect()`로 캔버스(=Resume 섹션) 영역 안인지 확인 후에만
  좌표를 셰이더의 p 공간(종횡비 보정 + Y축 반전)으로 변환해서 넘김. 영역 밖이거나
  `pointerleave` 시에는 화면 밖 값(-10,-10)으로 되돌려 파임 효과가 사라지게 함

**검증**: 헤드리스 Chrome + CDP `Input.dispatchMouseEvent`로 실제 마우스 이동 이벤트를
캔버스 좌표(30%, 50% 지점)로 보낸 뒤 `preserveDrawingBuffer: true`로 스크린샷 비교 -
마우스가 없을 때는 평평한 격자, 마우스를 올렸을 때는 그 지점 주변 격자선이 원형으로
안쪽으로 휘어져 들어가며 은은하게 어두워지는 것을 확인(스크린샷 확보). 확인 후
`preserveDrawingBuffer`는 제거. `bunx tsc --noEmit`, `bun run lint`, `bun run build`
모두 통과.

## ✨ 커스텀 404 페이지 추가 (Resume 배경 재사용)

**요청**: 사용자가 다크 톤 목업 이미지를 참고로 제시하며, Resume의 그리드 배경/애니메이션은
그대로 쓰고 안의 텍스트/버튼만 새로 구성한 404 페이지를 요청

**구현**:
- `app/not-found.tsx` (신규) - Next.js App Router의 전역 404 페이지. 다른 page.tsx와
  동일하게 `<main className="flex flex-1 flex-col">` + `<section flex-1 min-h-[70vh]>`
  구조를 그대로 따르고, 배경으로 `ResumeWaveGrid`를 그대로 재사용(별도 수정 없이
  import해서 그대로 사용 - Resume 전용 로직에 의존하지 않는 순수 배경 컴포넌트라
  재사용에 문제 없음)
- 콘텐츠: 빨간 점 + `SYS.WARN // ROUTE_NOT_FOUND :: UNRECORDED_PATH` 상태 배지(기존
  Resume의 `SYS.READY // DOC.AVAILABLE` 배지와 같은 `badge` 타이포그래피 규칙 재사용,
  점 색상만 기존 `.status-dot`의 초록 대신 경고 의미로 빨강 사용), 큰 "404" 헤딩,
  "| 기록되지 않은 경로입니다" 서브텍스트, 버튼 2개
- 버튼 2개는 Resume의 필드/아웃라인 버튼 컨벤션을 그대로 재사용:
  - "홈으로 돌아가기"(ArrowLeft 아이콘) - `next/link`로 `/`로 이동, 채워진 버튼
  - "이전 기록으로 복귀"(History 아이콘) - 브라우저 히스토리를 뒤로 가는 동작이라 정적
    링크로 불가능 → `app/_components/common/HistoryBackButton.tsx`(신규, client
    component)로 분리해 `useRouter().back()` 호출, 아웃라인 버튼

**트러블슈팅 - 다크모드 스크린샷에서 텍스트/버튼이 안 보임**
- **문제**: 헤드리스 Chrome으로 `document.documentElement.classList.add("dark")`만
  실행해 다크모드를 흉내내고 스크린샷을 찍었더니 404 텍스트와 버튼이 거의 안 보이는
  깨진 화면으로 나옴
- **원인**: 실제 `ThemeToggle`은 클래스 토글과 함께 `theme-change` 커스텀 이벤트를
  `window`에 디스패치하는데, `ResumeWaveGrid`는 그 이벤트를 구독해서만 `u_dark`
  유니폼을 갱신함. 테스트에서 클래스만 바꾸고 이벤트를 안 보냈으니 WebGL 배경만 계속
  라이트 모드로 남아, 다크모드로 하얗게 바뀐 텍스트가 (여전히 밝은) 배경과 거의 같은
  색이 되어 안 보이는 것처럼 보인 것 - 실제 사용자가 토글을 클릭하면 이벤트가 같이
  발생하므로 실제 버그 아니었음
- **해결**: 테스트 스크립트에서 클래스 토글과 함께 `window.dispatchEvent(new
  Event("theme-change"))`도 같이 실행하도록 수정
- **결과**: 다시 스크린샷 확인 - 다크 배경/흰 404 텍스트/채워진 버튼/아웃라인 버튼
  모두 정상 렌더링됨을 확인(스크린샷 확보)

**검증**: `curl`로 `/존재하지-않는-경로` 요청 시 404 상태 코드 및 기대한 텍스트가 모두
포함된 HTML 응답 확인, `bun run build`에서 `/_not-found`가 `○ (Static)`으로 정상
프리렌더링됨을 확인, 헤드리스 Chrome 스크린샷으로 라이트/다크 모드 모두 시각적으로
확인. `bunx tsc --noEmit`, `bun run lint`, `bun run build` 모두 통과.

## 🔧 마우스 파임 반경 축소 + 404 숫자 자간 조정

**요청**: "pointer 크기를 좀 더 줄여줘 지금 너무 커", "404숫자 간격 좁혀"

**변경**:
- `app/_lib/wave-grid.ts`: `DENT_RADIUS`를 0.35 → 0.16으로 축소 (파이는 영역 지름이
  약 절반으로 작아짐)
- `app/not-found.tsx`: "404" 헤딩의 `tracking-widest` → `tracking-tighter`로 교체해
  숫자 사이 간격을 좁힘

**검증**: 헤드리스 Chrome + CDP `Input.dispatchMouseEvent`로 다시 마우스 이동을 보내
파임 영역이 이전보다 작아진 것을 스크린샷으로 확인. `bunx tsc --noEmit`, `bun run lint`,
`bun run build` 모두 통과.

## 🎨 MY RECORDER 카드 다크모드 색상을 About Intro와 통일

**요청**: "홈페이지의 레코드 카드 색상 다크모드 시에 about의 intro 도형 모형 색상을
넣어줘, 1개 모자른 색상을 임의로 색상 균형이 맞는 조합으로 변경해"

**배경**: `MyRecorder.tsx`의 카드 4개(mint/peach/sky/purple)는 `Card` 컴포넌트의
accent가 지정되면 다크모드에서도 라이트 모드와 동일한 밝은 파스텔 색을 그대로 쓰도록
되어 있었음(이 세션에서 여러 차례 확인된 "파스텔 accent 배경은 라이트/다크 동일" 원칙).
반면 `AboutIntro.tsx`의 배경 도형 3개(mint/peach/sky)는 다크모드에서 45% 불투명도로
어둡게 처리되어 있었음 - 이 45% 처리를 MY RECORDER 카드에도 적용해달라는 요청.
AboutIntro에는 purple 도형이 없어 대응되는 값이 없는 상태("1개 모자른 색상").

**변경** (`app/_components/sections/MyRecorder.tsx`):
- `DARK_ACCENT_BG` 맵을 추가해 mint/peach/sky/purple 네 accent 모두
  `dark:bg-{accent}/45`를 Card의 className에 주입 - purple은 참고할 값이 없어
  나머지 3색과 동일한 45%를 그대로 적용(가장 균형 잡힌 선택으로 판단)
- 카드 배경이 다크모드에서 어두워지면서, 기존 `dark:bg-dark-surface
  dark:text-dark-text`(어두운 원 배지)가 카드 배경에 묻히게 되어
  `dark:bg-dark-text dark:text-dark-surface`(흰 원 + 어두운 아이콘)로 반전

**검증**: 헤드리스 Chrome으로 다크모드 전환(클래스 토글 + `theme-change` 이벤트
디스패치) 후 홈페이지 스크린샷 확보 - 네 카드가 은은하게 톤 다운된 파스텔로
통일되고, 원형 배지도 카드 배경 위에서 잘 보이는 것을 확인. `bunx tsc --noEmit`,
`bun run lint`, `bun run build` 모두 통과.

## ✨ 순차 도트 로딩 스피너 + 페이지 이동 로딩 UI 추가

**요청**: "3개의 점이 순차적으로 커지며 깜빡이다 사라지는 미니멀한 순차 도트 로딩
스피너를 만들어줘. 다크모드 및 라이트 모드 시 점의 색상은 home 페이지의 hero
컴포넌트의 밑줄 색상과 동일하게 적용해" → 이어서 "이제 대기 다른 페이지 이동시,
로딩 중임을 사용자에게 제공하기 위한 곳에 배치를 해줘, 필요한 곳에 따라서 로딩
스피너의 크기를 조절할 수 있게 크기를 props 로 받아서 처리해"

**구현**:
- `app/_components/ui/DotLoadingSpinner.tsx` (신규) - 점 3개, `role="status"
  aria-label="로딩 중"`으로 접근성 처리. 색상은 Home Hero 헤드라인 밑줄 3개와 동일한
  순서(라이트 `blue-300/400/500`, 다크 `gray-300/400/500`)를 그대로 사용, 점마다
  `animation-delay`(0/0.2/0.4s)를 줘서 순서대로 재생
  - `size?: "sm" | "md" | "lg"`(기본 `"md"`) prop으로 점 지름과 간격을 함께 조절
- `app/globals.css` - `dot-loading-pulse` 키프레임(작고 투명 → 커지며 밝아짐 → 한 번
  깜빡임 → 작아지며 사라짐) + `.dot-loading` 클래스, 기존 컨벤션대로
  `prefers-reduced-motion: no-preference` 블록 안에서만 애니메이션 적용
- `app/loading.tsx` (신규) - Next.js App Router의 전역 로딩 UI. 자체 `loading.tsx`가
  없는 모든 라우트 세그먼트에 적용되며, Header/Footer는 그대로 유지된 채 `<main>`
  영역만 스피너(`size="lg"`)로 교체됨. 실제로 서버에서 Supabase 데이터를 가져오는
  `/posts`, `/posts/[slug]`에서 체감 가능 (나머지 정적 페이지는 기다릴 데이터가 없어
  로딩 상태가 거의 안 보이는 게 정상 동작)

**검증**:
- 헤드리스 Chrome + CDP로 실제 애니메이션 프레임을 여러 장 캡처해 점 3개가 순서대로
  커지고 밝아졌다 사라지는 것, `getComputedStyle`로 `animation-name`/`delay`가 정상
  적용된 것, 라이트/다크 모드 색상이 각각 Hero 밑줄과 일치하는 것을 확인
- 네트워크 스로틀링만으로는 타이밍을 못 잡아, `/posts` 서버 컴포넌트에 1.5초 인위적
  지연을 임시로 걸어 실제 클릭 네비게이션 시 Header/Footer가 유지된 채 중앙에
  스피너가 뜨는 것을 스크린샷으로 확인 후 지연 코드는 완전히 원복(`git diff` 결과
  없음 확인)
- 사용자가 직접 개발 서버에서 동일한 임시 지연을 켠 상태로 브라우저에서 최종 확인,
  이후 지연 코드 제거 요청에 따라 다시 원복
- `bunx tsc --noEmit`, `bun run lint`, `bun run build` 매 변경마다 통과

## 🔧 Projects 제목이 카드보다 늦게 나타나는 애니메이션 타이밍 버그 수정

**요청**: "exprience 페이지에서 project 제목이 나오는 애니메이션 타이밍이 안 맞아.
프로젝트 카드 보다 늦게 나와 수정해"

**원인**: `app/_components/sections/Projects.tsx`에서 "PROJECTS" 제목의 `useInView`가
카드 3개(간격 `gap-[12vh]`)를 포함한 전체 `<section>`을 관찰 대상으로 삼고 있었음.
`useInView`의 기본 `threshold`는 0.2(관찰 대상의 20%가 보여야 트리거)인데, 이 관찰
대상이 여러 뷰포트 높이에 달하는 매우 긴 section 전체였기 때문에 20%를 채우려면
한참 스크롤해야 했음. 반면 각 카드는 자기 자신의 작은 요소만 관찰해서 뷰포트에
들어오자마자 빠르게 트리거됨 - 그 결과 제목이 카드들보다 항상 늦게 나타났음

**해결**: 제목(`<h2>`)에 섹션과는 별도의 `useInView` 훅과 `ref`를 부여해, 제목 자기
자신의 작은 영역만 관찰하도록 수정. 섹션 전체를 관찰하던 기존 `ref`는 제거

**검증**: 헤드리스 Chrome + CDP로 `/experience` 페이지를 스크롤 위치 0~1400px까지
100px 단위로 이동시키며 제목과 첫 카드의 `getComputedStyle().opacity`를 비교 -
수정 전 구조라면 제목이 늦게 트리거됐어야 하는데, 수정 후에는 스크롤 0px(페이지
로드 시점)에 제목이 이미 트리거되고, 첫 카드는 스크롤 200px에서야 트리거되는 것을
확인 - 제목이 카드보다 먼저(또는 최소한 늦지 않게) 나타나는 순서로 정상화됨.
`bunx tsc --noEmit`, `bun run lint`, `bun run build` 모두 통과.

## 🔄 추가 작업: About 모바일 카드 테두리 + Home Hero 인사말/기술스택 배지

**요청**: "about에서 모바일 버전일때는 레코드 세부 내용 카드의 점 애니메이션 적용하지
마. border 색상은 흰색으로" → 이어서 "hero부분에서 밑줄로 글귀 스타일링을 마친뒤에
해당 텍스트가 안녕하세요 장예지 입니다 라는 문구로 바꼈으면 좋겠어" → 이름에 밑줄
색상 그라데이션 → 두 줄 분리 → 소개 문구 추가 → 접근성 위반 색상 수정 → 책 이미지
추가 → 기술 스택 로고 흩뿌리기 → 로고 블러 효과까지 이어진 일련의 Home Hero 개편 요청

### About: 모바일에서 카드 테두리 점 애니메이션 제거

`app/_components/sections/JourneyDetailCard.tsx`에서 카드 테두리를 도는 점 애니메이션은
`md` 이상에서만 유지하고, 모바일에서는 `border-white`(다크모드는 기존 `dark:` 클래스
그대로) 고정 테두리로 대체. 점 자체는 `hidden md:contents`로 모바일 렌더링에서 완전히
제외해 레이아웃에 영향을 주지 않도록 함.

### Home Hero: 밑줄 헤드라인 → 인사말 전환

`app/_components/sections/Hero.tsx`를 클라이언트 컴포넌트로 전환하고 `showGreeting`
상태를 추가. 밑줄 애니메이션(`anim-underline-3`)이 delay 1100ms + duration 500ms로
1600ms에 끝나는 것에 맞춰 1700ms 뒤 "기록하고, 배우고, 나아갑니다" 3줄 헤드라인을
"안녕하세요. / 장예지 입니다." 두 줄 인사말로 교체. "장예지"는 기존 밑줄 3개와 같은
파란 계열 그라데이션(`bg-linear-to-r ... bg-clip-text text-transparent`)을 입힘.

**문제**: 첫 적용한 `blue-300 → blue-400 → blue-500` 그라데이션이 사용자가 지적한 대로
흰 배경 대비 접근성 기준(WCAG)을 위반함(`blue-300`은 약 1.8:1로 large-text 최소
기준인 3:1에도 못 미침).

**해결**: 같은 파란 계열에서 더 진한 톤인 `blue-600 → blue-700 → blue-800`(대비
5.17~8.72:1)으로 1차 수정해 4.5:1(일반 텍스트 기준)까지 여유 있게 충족시킴. 이후
"그라데이션 효과가 더 잘 보이게 바꿔" 요청에 따라, `.h1`이 60px bold로 WCAG
large-text 기준(24px 이상 또는 18.66px 이상 bold)을 충족해 최소 기준이 3:1이라는
점에 근거해 범위를 `blue-500 → blue-700 → blue-900`(대비 3.68~10.37:1)까지 넓혀
그라데이션 폭 자체를 더 크게 키움 - 전 구간이 large-text 기준(3:1) 이상을 유지.

**결과**: 실제 상대 휘도 공식(`L = 0.2126R + 0.7152G + 0.0722B`, sRGB 선형화 적용)으로
각 색상 단계의 대비비를 직접 계산해 확인 - 넓어진 그라데이션 구간에서도 모든 색상
단계가 WCAG AA large-text 기준(3:1)을 충족해, 접근성을 지키면서도 그라데이션이
육안으로 뚜렷이 구분되는 결과를 얻음. "FRONTEND DEVELOPER"와 같은 JetBrains Mono
폰트로 소개 문구 2줄("다양한 사용자를 고려하고," / "배우는 것을 멈추지 않습니다.")도
추가.

### Home Hero: 책 이미지 → 이모지, 기술 스택 배지 추가

**문제**: 인사말 아래에 책 이미지를 추가해달라는 요청에 따라 사용자가 제공한 이미지
(`yeji'sbook.png`, `book.png`, `book.svg`, `book.jpg`)의 배경(누끼)을 여러 차례
제거 시도함. 색상 기반 chroma-key, 체커보드 격자 감지, 기하학적 둥근 모서리 마스킹,
잔여 노이즈 알파 클리닝 등 다양한 방식을 반복했으나("아직도 깔끔하게 안 지워졌어")
사용자가 만족할 만큼 완전히 해결되지 않음.

**해결**: 사용자가 이미지 대신 iOS 책 이모지(📖)로 교체를 요청 - 별도 이미지 처리 없이
유니코드 문자를 `fontSize: 140px`로 렌더링하는 방식으로 전환해 누끼 문제 자체를
근본적으로 우회함.

**결과**: 배경 제거가 필요 없는 방식으로 바뀌어, 다시는 재현되지 않던 흰 배경 잔상
문제 자체가 발생할 수 없는 구조가 됨 - 사용자가 매 이미지마다 반복해서 지적해야
했던 피드백 루프가 사라짐.

이어서 책 주위에 핵심 기술 스택(React/Next.js/TypeScript/Tailwind CSS/Supabase)
배지 5개를 책이 팝업(delay 300ms)한 뒤 순서대로(120ms 간격) 팝업하도록 추가하고,
브랜드 색상을 그대로 블러 글로우(box-shadow/drop-shadow)로 적용.

**문제 1**: Tailwind 로고("기술스텍 로고들 배치 높이가 뒤죽박죽이야" 이전 피드백에서는
"tailwind 로고 높이를 타입스크립트랑 동등하게 해")가 TypeScript 로고보다 훨씬 작아
보임.

**원인**: `react-icons`의 `SiTailwindcss`는 24x24 viewBox 안에서 실제 로고가 세로
14.4px(60%)만 차지하는 반면, `SiTypescript`는 24px 전체(100%)를 채우는 사각형이라
같은 `size`를 줘도 실제 렌더링되는 잉크 높이가 다름.

**해결**: 브라우저에서 `getBBox()`로 각 아이콘의 실제 viewBox 내 콘텐츠 비율을
직접 측정한 뒤, Tailwind의 `size`를 TypeScript와 시각적 높이(18px)가 같아지도록
`24/14.4배 ≈ 30`으로 개별 조정.

**결과**: 두 배지를 근접 촬영한 스크린샷으로 비교해 로고의 실제 잉크 높이가
시각적으로 동일해진 것을 확인.

**문제 2**: 배지 5개의 배치 높이가 전체적으로 들쭉날쭉해 보임.

**원인**: 배지마다 위치 기준점이 서로 달랐음 - 일부는 모서리(top-left) 기준
Tailwind 임의값 클래스(`-top-3 -left-4` 등), 일부는 중심 기준(`left-1/2
-translate-x-1/2`)으로 섞여 있어 같은 오프셋 값이라도 실제 중심 위치가 배지마다
다르게 계산됨.

**해결**: 모든 배지를 `-translate-x-1/2 -translate-y-1/2`로 "중심" 기준점으로
통일하고, 책 박스 중심(70, 70)에서 반지름과 각도로 좌표를 계산하는 방식으로 재구성.
처음엔 5개 배지를 동일 반지름(76px → 이후 배지-책 간격 요청에 따라 93px)에 배치해
균일한 원형 배치로 정리했다가, "간격을 자연스럽게 조금씩 다르게" 요청에 따라 각도는
고정한 채 반지름만 배지마다 82~98px로 미세하게 다르게 조정.

**결과**: 스크린샷으로 확인한 결과 배지들이 더 이상 무작위로 들쭉날쭉해 보이지
않고, 책을 중심으로 한 층위(위쪽 3개/아래쪽 2개)와 배지-책 간 거리 변화가 모두
의도한 대로 자연스럽게 나타남.

**이 단계에서 해야 할 것:**

모든 컴포넌트에 라이트 모드 스타일을 추가합니다.

**Claude Code 요청:**

```
"모든 컴포넌트에 light: 프리픽스로 라이트 모드 스타일을 추가해줄래?"
```

**요약 템플릿 (Claude가 작성):**

```
✅ 수정된 파일:
   -
   -
   -

✅ 추가한 것:
   - light: 프리픽스 추가
   - 라이트 색상값 적용

✅ 테스트 완료:
   - 라이트 모드 전체
   - 라이트/다크 토글
   - 새로고침 후 유지
   - bun run type-check

📍 다음: 최종 검증
```

---

## ✅ 최종 검증

**이 단계에서 확인할 것:**

```bash
# 1. 타입 체크
bun run type-check

# 2. 린트
bun run lint

# 3. 빌드
bun run build

# 4. 개발 서버 (라이트/다크 모드 확인)
bun run dev
```

**확인 항목:**

- [x] 모든 페이지 렌더링 (`bun run build` + `next start`로 모든 라우트 200 확인, 없는 경로 404 확인)
- [ ] 모든 인터랙션 작동 (필터/햄버거 메뉴 로직·마크업은 확인, 실제 클릭은 브라우저 미연결로 미검증)
- [x] 라이트 모드
- [x] 다크 모드 (페이지당 `dark:` 클래스 약 60개 적용 확인)
- [ ] 라이트/다크 전환 (토글 로직은 확인, 실제 클릭 전환은 미검증)
- [ ] 모바일 반응형 (반응형 클래스는 적용, 실기기/브라우저 시각 확인은 못 함)
- [x] 폰트 로드 (Syne/JetBrains Mono `<html>` 클래스 확인)
- [ ] Lighthouse 90+ (선택) — 실행 환경 없어서 미실시

**완성:**

```
✅ 포트폴리오 완성! (Phase 1~8)
✅ WCAG AA 접근성 준수 (시멘틱 태그, aria-*, focus-visible 기준으로 구현)
✅ 배포 준비 - 코드 레벨은 완료, 브라우저 실사용 테스트는 남음
```

---

## 🔄 추가 작업: Posts를 TanStack Query로 전환

**계기**: 8개 Phase 완료 후, Posts의 캐싱을 TanStack Query로 관리하고 싶다는 요청으로 진행. 기존엔 SSR/RSC 직접 fetch + `revalidate=60`(ISR) 방식이었음.

**요약:**

```
✅ 생성된 파일:
   - app/api/posts/route.ts (Route Handler - ARCHITECTURE.md의 "필요시" 슬롯이 실제로 필요해짐)
   - app/_components/providers/QueryProvider.tsx (브라우저용 QueryClient, staleTime 60초)
   - app/_lib/query-client.ts (서버 컴포넌트 prefetch 전용, React.cache로 요청 단위 메모이제이션)

✅ 수정된 파일:
   - app/_components/sections/Posts.tsx (posts prop 제거 → useQuery로 /api/posts 직접 fetch,
     isLoading/isError 직접 처리)
   - app/(routes)/posts/page.tsx (Suspense+비동기 서버 컴포넌트 → prefetchQuery + dehydrate +
     HydrationBoundary로 교체, revalidate=60 제거)
   - app/layout.tsx (QueryProvider 마운트)

✅ 구현한 것:
   - /api/posts: dynamic="force-dynamic"으로 항상 최신 데이터 반환
   - 서버에서 미리 fetch(getPublishedPosts 직접 호출) → dehydrate → 클라이언트 하이드레이션
     (첫 로딩에 스켈레톤 깜빡임 없음), 이후 재검증은 /api/posts를 통해 클라이언트에서 fetch
   - staleTime 60초 - 그 안에는 캐시 재사용, 지나면 마운트/포커스 시 자동 백그라운드 refetch
   - QueryProvider는 최초 common/에 넣었다가 사용자 요청으로 providers/ 폴더 신설 후 이동

✅ 테스트 완료:
   - bun run type-check → `bunx tsc --noEmit` 통과, `bunx eslint` 통과
   - dev 서버에서 /api/posts 실제 Supabase 데이터 응답 확인
   - /posts 페이지 하이드레이션 데이터 렌더링 확인 (RSC 페이로드에 dehydratedState 포함 확인)
   - 프로덕션 빌드에서 /api/posts는 ƒ(Dynamic), /posts 페이지 자체는 여전히 ○(Static)로 잡히는 것
     확인 - 다만 클라이언트가 staleTime 기준으로 자동 재검증하므로 자체 치유됨을 확인

📍 다음: (사용자 지정 대기)
```

---
