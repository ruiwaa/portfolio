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

📍 다음: Phase 9 (최종 검증)
```

---

## Phase 9️⃣: 최종 검증

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

📍 다음: Phase 🔟 (Posts를 TanStack Query로 전환)

---

## Phase 🔟: Posts를 TanStack Query로 전환

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

📍 다음: Phase 1️⃣1️⃣ (Footer 컴포넌트)
```

---

## Phase 1️⃣1️⃣: Footer 컴포넌트

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

## Phase 1️⃣2️⃣: About Me 페이지

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

## Phase 1️⃣3️⃣: Home Hero 섹션

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

📍 다음: Phase 14 - Posts 상세 페이지
```

---

## Phase 1️⃣4️⃣: Posts 상세 페이지

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

📍 다음: Phase 15 - Posts 페이지네이션
```

---

## Phase 1️⃣5️⃣: Posts 페이지네이션

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

📍 다음: Phase 1️⃣6️⃣: Experience Projects 섹션 테스트 콘텐츠
```

---

## Phase 1️⃣6️⃣: Experience Projects 섹션 테스트 콘텐츠

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

📍 다음: Phase 17 - Resume 그리드 배경 웨이브 효과
```

---

## Phase 1️⃣7️⃣: Resume 그리드 배경 웨이브 효과

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

## Phase 1️⃣8️⃣: WebGL 캔버스가 안 보이는 문제 수정

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

## Phase 1️⃣9️⃣: Resume 배경 셰이더 재작성 및 그리드 라인 버그 수정

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

## Phase 2️⃣0️⃣: 웨이브 배경 애니메이션 속도 조정 및 범위 한정

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

## Phase 2️⃣1️⃣: 웨이브 그리드 영역 채움 버그 및 속도 재조정

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

## Phase 2️⃣2️⃣: 마우스 호버 그리드 dent 효과 추가

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

## Phase 2️⃣3️⃣: 커스텀 404 페이지 추가

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

## Phase 2️⃣4️⃣: 마우스 파임 반경 및 404 자간 조정

**요청**: "pointer 크기를 좀 더 줄여줘 지금 너무 커", "404숫자 간격 좁혀"

**변경**:
- `app/_lib/wave-grid.ts`: `DENT_RADIUS`를 0.35 → 0.16으로 축소 (파이는 영역 지름이
  약 절반으로 작아짐)
- `app/not-found.tsx`: "404" 헤딩의 `tracking-widest` → `tracking-tighter`로 교체해
  숫자 사이 간격을 좁힘

**검증**: 헤드리스 Chrome + CDP `Input.dispatchMouseEvent`로 다시 마우스 이동을 보내
파임 영역이 이전보다 작아진 것을 스크린샷으로 확인. `bunx tsc --noEmit`, `bun run lint`,
`bun run build` 모두 통과.

## Phase 2️⃣5️⃣: MY RECORDER 카드 다크모드 색상 통일

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

## Phase 2️⃣6️⃣: 순차 도트 로딩 스피너 및 페이지 로딩 UI 추가

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

## Phase 2️⃣7️⃣: Projects 제목 애니메이션 타이밍 버그 수정

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

## Phase 2️⃣8️⃣: About 모바일 카드 테두리 및 Home Hero 인사말/기술스택 배지 추가

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

📍 다음: 없음 (Phase 9·10로 재배치된 최종 검증/Posts TanStack Query 전환 참고)
```

## Phase 2️⃣9️⃣: Resume 페이지 버튼을 피그마/노션 링크로 교체

**요청**: "이력서 페이지에 pdf 다운로드 버튼을 제거하고, 이력서 보기를 피그마로 보기, 노션으로 보기 버튼 두개로 나눠서, 현재 버튼 두개를 이걸로 교체해주고 피그마 노션 각각 로고디자인을 넣어서 버튼 텍스트와 함께 가로로 배치해"

**변경** (`app/_components/sections/Resume.tsx`):
- 기존 "이력서 보기"(채워진 버튼) + "PDF 다운로드"(아웃라인 버튼) 2개를 "피그마로 보기"(채워진 버튼) +
  "노션으로 보기"(아웃라인 버튼)로 전면 교체
- `RESUME_VIEW_URL`/`RESUME_PDF_URL` 상수를 `RESUME_FIGMA_URL`/`RESUME_NOTION_URL`로 교체
  (둘 다 아직 `#` 플레이스홀더, TODO 주석으로 실제 링크 교체 필요 명시)
- `react-icons/si`의 `SiFigma`/`SiNotion` 로고를 각 버튼 텍스트 왼쪽에 `inline-flex items-center gap-2`로
  가로 배치
- 로고 색상은 브랜드 고정 hex 대신 `currentColor`를 그대로 상속하도록 둬서, 기존 Header.tsx의
  GitHub/Velog 아이콘과 동일한 패턴 유지 - 채워진 버튼(흰 로고)/아웃라인 버튼(다크 텍스트 색 로고)
  모두 라이트·다크 모드 전환 시 버튼 텍스트 색과 자동으로 맞춰짐

**검증**:
- `bunx tsc --noEmit`, `bunx eslint app/_components/sections/Resume.tsx` 모두 통과
- 실제 브라우저에서의 시각적 확인(로고 정렬/크기, 라이트·다크 모드 대비)은 이 세션에 연결된
  대화형 브라우저가 없어 사용자 확인 필요

📍 다음: 실제 피그마/노션 이력서 링크로 `RESUME_FIGMA_URL`/`RESUME_NOTION_URL` 교체 필요

## Phase 3️⃣0️⃣: Badge 컴포넌트 모바일 대응 compact 사이즈 추가

**요청**: "aboutInfo에서 모바일 사이즈도 고려하여, 기술스택 뱃지 크기 수정해"

**변경** (`app/_components/ui/Badge.tsx`):
- `size?: "default" | "compact"` prop 추가, 기존 `h-8`/`px-2`/`py-1`/`text-[16px]` 등 크기 관련
  클래스를 `SIZE_CLASSES` 맵으로 이동
- `compact`: 모바일에서 `h-6`/`text-[12px]`/좁은 padding·gap으로 작게 시작해 `sm:` 이상에서
  기존 `default` 크기(`h-8`/`text-[16px]`)로 복귀
- `size`를 넘기지 않으면 `default`(기존과 동일)라 Projects/Posts/포스트 상세 페이지 등 다른
  Badge 사용처는 영향 없음 - className으로 크기 클래스를 덧붙이는 대신 통째로 교체하는 방식을
  택한 이유는, 같은 유틸리티 레이어 클래스끼리(컴포넌트 기본 클래스 vs 전달받은 className) 충돌하면
  어느 쪽이 이길지 컴파일 순서에 따라 불확실해지기 때문

**검증**:
- `bunx tsc --noEmit`, `bunx eslint` 통과
- 빌드 산출물(`.next/server/app/about.html`)에서 `h-6 ... sm:h-8 ...` 반응형 클래스가 실제로
  렌더링된 것 확인

📍 다음: Phase 3️⃣1️⃣ - Experience/Projects·About 섹션 공유 컴포넌트로 분리

## Phase 3️⃣1️⃣: Experience/Projects·About 섹션 공유 컴포넌트로 분리

**요청**: "about me를 먼저 보여줘, 그리고 경험 및 프로젝트 페이지 컴포넌트 그대로 쓰면 되잖아." →
이어서 "근데 home페이지의 page.tsx에 왜 about me만 section 태그를 썼어"(구조 일관성 지적) →
"about me 페이지에서는 aboutIntro가 필요해"

**변경**:
- 신규 `app/_components/sections/ExperienceProjects.tsx`, `app/_components/sections/AboutSections.tsx` -
  `/experience`, `/about` 페이지가 각각 쓰던 컴포넌트 조합(Experience+Projects, AboutVision+AboutInfo)을
  그대로 추출해, 홈/about/experience 세 곳이 동일한 컴포넌트를 공유하도록 함
- `Experience.tsx`, `Projects.tsx`, `AboutVision.tsx`에 `headingClassName?: string` prop 추가
  (기본값은 기존 스타일 그대로) - 홈페이지에서만 제목을 더 크고 다크모드에 흰색으로 강조할 수 있게
  하면서, `/about`·`/experience`는 prop을 넘기지 않아 원래(작고 회색) 스타일 유지
- `app/(routes)/experience/page.tsx`, `app/(routes)/about/page.tsx`를 새 공유 컴포넌트를 쓰도록 정리,
  `about/page.tsx`에는 `AboutIntro`를 다시 추가(홈페이지가 쓰는 공유 `AboutSections`에는 넣지 않아
  `/about`에서만 보임)
- 홈페이지(`app/page.tsx`)의 About Me 영역을 감싸던 불필요한 `<section aria-label="About Me">`를
  제거 - `AboutVision`/`AboutInfo`가 이미 각자 `<section aria-labelledby=...>`로 자체 랜드마크를
  갖고 있어(Experience/Projects도 마찬가지) 중복이었음

**검증**:
- 커밋 단위로 `git stash --keep-index`를 이용해 스테이징된 상태만 따로 `bunx tsc --noEmit` 통과 확인
- `bunx eslint`, `bun run build` 통과, `/`·`/about`·`/experience` 모두 여전히 `○ Static`

📍 다음: Phase 3️⃣2️⃣ - About 기술 스택 섹션 정리 및 호버 카드 오버플로우 수정

## Phase 3️⃣2️⃣: About 기술 스택 섹션 정리 및 호버 카드 오버플로우 수정

**요청**: "그리고 아예 학습이라는 컴포넌트 삭제해" → 이어서 "about me 페이지에서는... 기술스택에
호버시 나오는 기술스택 세부 내용이 해당 페이지 메인 높이 안에 들어오게 수정해" → "aboutInfo에서
모바일 사이즈도 고려하여, 기술스택 뱃지 크기 수정해"(Phase 30의 compact 배지를 실제 적용하는 부분)

**변경** (`app/_components/sections/AboutInfo.tsx`):
- "학습" 섹션(BookOpen 아이콘 + 학력/어학·자격증 플레이스홀더 타임라인) 전체 제거
- 트러블슈팅: 학습 섹션을 지우면서 `/about` 페이지의 마지막 콘텐츠인 AboutInfo 자체 높이가 크게
  줄어, 기술 스택 배지 호버 시 아래로 펼쳐지는 상세 설명 카드(`position: absolute; top-full`)가
  필요로 하는 공간을 받쳐줄 콘텐츠가 없어져 바로 뒤에 오는 Footer 쪽으로 넘치던 문제 발생 →
  `<section>`에 `pb-30`(이후 `pb-48`로 한 차례 더 조정) 추가로 해결
- Phase 30에서 만든 `Badge`의 `size="compact"`를 기술 스택 배지에 적용하고 아이콘도
  `h-3 w-3 sm:h-3.5 sm:w-3.5`로 축소, `<ul>`에 `flex-wrap` 추가해 좁은 화면에서 배지 5개가
  한 줄에 억지로 끼지 않도록 함
- "해당 기술 스택에 마우스를 올리면 세부 기술 내용을 확인할 수 있습니다" 안내 문구 추가

**검증**: `bunx tsc --noEmit`, `bunx eslint`, `bun run build` 통과

📍 다음: Phase 3️⃣3️⃣ - 홈페이지 MY RECORDER 카드 제거 및 Hero 중심 레이아웃 개편

## Phase 3️⃣3️⃣: 홈페이지 MY RECORDER 카드 제거 및 Hero 중심 레이아웃 개편

**요청**: "home 페이지에서 record card 제거하고, hero 컴포넌트를 중앙 배치하고, 스크롤 하면
exprience와 about 페이지의 내용들이 나오도록 레이아웃 수정해" → "stack bar 는 푸터 위에 와야지,
순서 변경해" → "hero 컴포넌트가 너무 가운데로 몰려있어 너비를 조정하고 싶어, 그리고 책 이모티콘
부분도 위의 텍스트 기준 맨아래 오른쪽에 위치했으면 좋겠어" → "기록하고 ,배우고 이 텍스트 문자
간격이 좀 더 있었으면 좋겟어"

**변경**:
- `app/_components/sections/MyRecorder.tsx` 삭제, `app/page.tsx`에서 제거
- 홈 레이아웃을 Hero(중앙 배치, `min-h`로 첫 화면 확보) → About Me → Experience & Projects →
  StackBar 순으로 재구성(Phase 31의 공유 컴포넌트 사용). 기존엔 Hero 바로 아래였던 StackBar를
  최하단(Footer 바로 위)으로 이동
- `Hero.tsx`: `<section>`에 `mx-auto w-full max-w-3xl` 적용해 텍스트가 너무 좁게 뭉쳐 보이던
  너비 문제 조정, 책 이모지+기술배지 묶음 wrapper에 `self-end` 적용해 텍스트 블록 기준 오른쪽
  아래로 위치 이동, "기록하고,/배우고,/나아갑니다" 헤드라인에 `tracking-wide` 자간 추가
- 트러블슈팅: 책 이모지 wrapper의 `w-*`/`h-*`를 조정해도 이모지 크기가 안 바뀐다는 질문에,
  이모지 크기는 `<span>`의 인라인 `fontSize` 스타일로 결정되고 wrapper의 `w-*`/`h-*`는 기술
  배지 5개를 절대좌표로 배치하기 위한 좌표 기준틀일 뿐이라는 원인을 설명 (해당 요청은 코드
  수정 없이 원인 설명으로 마무리)

**검증**: 최종적으로 이번 세션 전체 변경분을 유형별 4개 커밋(Badge/refactor/fix/feat)으로 분리해
커밋했고, `git stash --keep-index`로 각 커밋 단계별 스테이징 상태에서도 `bunx tsc --noEmit`
통과 확인. `bunx eslint`, `bun run build` 최종 통과.

📍 다음: Phase 3️⃣4️⃣ - Experience 실제 이력 데이터 반영 및 About 점 애니메이션 제거

## Phase 3️⃣4️⃣: Experience 실제 이력 데이터 반영 및 About 점 애니메이션 제거

**요청**: "About에서 세부 내용 카드에 도트 애니메이션 기능 아예 제거해" → "Experience에서 description
길이가 너무 길어서 한눈에 안 들어와, x축 패딩값을 줘야 될 것 같아"(이후 최대 너비 제약으로 해결) →
Experience 타임라인에 실제 경력 입력

**변경**:
- `JourneyDetailCard.tsx`에서 카드 테두리를 도는 점 애니메이션(`ResizeObserver` 기반 좌표 계산,
  `pop-in` 애니메이션 span 다수)을 통째로 제거하고, 모바일 전용이던 흰색 테두리를 모든 화면
  크기에 그대로 사용하도록 단순화. 점 좌표 계산에만 쓰이던 `app/_lib/geometry.ts` 파일 자체를 삭제
- `Experience.tsx`의 `TIMELINE` 플레이스홀더를 실제 이력(멋쟁이사자처럼 로켓단 23기 인턴십,
  프론트엔드 16기 최우수 수료)으로 교체
- `TimelineItem.tsx`: 타임라인 점 색상에 다크모드 분기(`dark:bg-lime-500`) 추가, description에
  `max-w-prose` 적용 - 와이드 화면에서 문장이 화면 끝까지 한 줄로 늘어나던 문제를 약 65자 지점에서
  줄바꿈되도록 해결

**검증**: `bunx eslint`, `bunx tsc --noEmit` 통과. 1600px 와이드 뷰포트로 실제 렌더링해 description이
2줄로 자연스럽게 줄바꿈되는 것을 스크린샷으로 확인

📍 다음: Phase 3️⃣5️⃣ - 예매의 정석 프로젝트 카드 완성

## Phase 3️⃣5️⃣: 예매의 정석 프로젝트 카드 완성

**요청**: Projects 섹션 첫 번째 카드에 실제 프로젝트("예매의 정석") 데이터 입력 → 시연 영상/GitHub
링크 연결 → 결제 페이지 썸네일 이미지 적용 → "자세히 보기 버튼 없애고 항상 세부 내용을 볼 수 있게
해줘" → 세부 내용 텍스트 크기·위치·폰트 반복 조정

**변경** (`app/_components/sections/Projects.tsx`):
- `ProjectLinks`에 `demoType?: "site" | "video"` 필드 추가 - 배포 사이트가 없는 프로젝트는 배포
  링크 아이콘(`Globe`) 대신 재생 아이콘(`PlayCircle`)과 "시연 영상" 라벨로 표시
- 첫 번째 카드를 실제 데이터(제목/소개/태그/개발기간/담당작업/시연영상·GitHub 링크/결제 페이지
  썸네일)로 교체, 세부 내용을 5줄(Local Storage 연동, 할인·포인트 검증, 결제 페이지 가드 로직,
  URLSearchParams 탭 상태 유지)로 요약
- "자세히 보기"/"접기" 토글 버튼과 `isOpen` state, `useId` 기반 `panelId`를 제거하고 세부 내용을
  항상 렌더링하도록 변경
- 세부 내용 텍스트를 `badge`(12px, monospace)에서 16px → 18px sans-serif(`font-medium`)로 확대,
  좌우 패딩 추가, 외부 링크 아이콘을 카드 하단으로 이동, 이미지를 세로 중앙 정렬(`my-auto`)하고
  가로폭을 256px → 320px로 확대
- 세부 내용 문장 속 영어 단어(Local Storage, URL, URLSearchParams 등)를 정규식으로 감지해 자동으로
  `font-semibold` 처리하는 `withBoldEnglish` 헬퍼 추가

**검증**: 매 단계마다 `bunx eslint` 통과 확인, Playwright로 데스크톱/모바일 렌더링을 스크린샷으로
확인하며 반복 조정. 최종 프로덕션 `next build` 통과

📍 다음: Phase 3️⃣6️⃣ - 행쇼마켓 프로젝트 카드 완성 및 카드 레이아웃 개편

## Phase 3️⃣6️⃣: 행쇼마켓 프로젝트 카드 완성 및 카드 레이아웃 개편

**요청**: 두 번째 카드에 "행쇼마켓" 데이터 입력 → "프로젝트 카드의 맨위의 프로젝트 소개 부분이
한줄을 다 차지하게 만들어줘" → "기술스택도 제목 바로 아래에 맨 왼쪽에 배치"

**변경** (`app/_components/sections/Projects.tsx`):
- 두 번째 카드를 실제 데이터(Next.js/React 기반 문구류 오픈마켓 소개, 소비자·판매자 마이페이지
  기능 4줄 요약, 실제 홈 화면 썸네일)로 교체
- 카드 구조를 `flex-row` 단일 행에서, 제목+태그+소개를 이미지 옆 좁은 텍스트 컬럼이 아니라 카드
  상단 전체 너비를 차지하는 독립 헤더 블록으로 분리하고, 그 아래에 이미지+세부내용+링크 행을 배치
  하도록 레이아웃 전면 개편
- 기술스택 태그 목록을 헤더 블록 안, 제목 바로 아래(좌측 정렬)로 이동

**검증**: `bunx eslint` 통과, 데스크톱/모바일 렌더링 스크린샷으로 헤더 블록이 카드 전체 너비를
차지하고 태그가 제목 아래 좌측 정렬로 표시되는 것을 확인

📍 다음: Phase 3️⃣7️⃣ - GENOVA 오디오 툴킷 카드 완성 및 다크모드 접근성 수정

## Phase 3️⃣7️⃣: GENOVA 오디오 툴킷 카드 완성 및 다크모드 접근성 수정

**요청**: 세 번째 카드에 "GENOVA 오디오 툴킷"(AI 효과음/자막 생성 인턴십 프로젝트) 데이터 입력 →
"오디오툴킷 프로젝트만 배포사이트 대신 시연 영상 링크가 두개야, 그리고 깃허브는 올릴 수 없어" →
"exprien, project 제목 태그 색상이 색상 대조가 매우 낮아서 접근성 위반이래"

**변경** (`app/_components/sections/Projects.tsx`):
- 세 번째 카드를 실제 데이터(서버·클라이언트 상태 분리 관리, toast·포커스 트랩 확인 모달,
  WAVE·Web Developer 기반 웹접근성 개선 등 3줄 요약)와 메인 화면 썸네일로 교체
- `ProjectLinks`에 `demos?: { label, href }[]`(기능별 시연 영상 여러 개), 선택적 `github?: string`
  필드를 추가 - GENOVA는 효과음/자막 생성 시연 영상 2개를 보여주고, 비공개 레포라 GitHub 아이콘
  자체를 생략하도록 렌더링 로직을 배열 spread 방식으로 재작성 (기존 단일 `demo` 프로젝트와 하위 호환)
- **트러블슈팅**: Playwright + axe-core로 Experience/Projects 섹션 색상 대비를 실측한 결과,
  Experience는 문제없었으나 프로젝트 카드 다크 모드에서 설명·세부 내용 텍스트(`dark:text-white/80`)
  가 카드의 색상 배경과 대비 3.49~3.6:1로 측정되어 WCAG AA 기준(4.5:1) 위반. 텍스트를 완전
  불투명한 `dark:text-white`로 바꾸는 것만으로는 mint 배경에서 최대 4.46:1까지밖에 안 나온다는
  것을 계산으로 확인하고, 카드 다크 모드 배경 틴트를 45%→35%로 낮춰(sky/peach/mint 공통 적용)
  네 색상 모두 여유 있게 기준을 넘기도록 수정

**검증**: 수정 후 axe-core `color-contrast` 룰로 다크 모드 프로젝트 섹션을 재검사한 결과 **위반
0건**으로 확인. `bunx eslint`, `bunx tsc --noEmit` 통과

📍 다음: Phase 3️⃣8️⃣ - 중단어 창고 카드 신설 및 완성

## Phase 3️⃣8️⃣: 중단어 창고 카드 신설 및 완성

**요청**: "프로젝트 카드가 하나더 필요해. 기본 구조로 넣어서 색상을 이전 카드들과 겹치지 않게 하나
만들어" → 중국어 단어 학습 서비스 "중단어 창고" 데이터 입력 → 썸네일 2회 교체(급수별 단어 목록
→ 홈 화면) → 외부 링크 연결

**변경** (`app/_components/sections/Projects.tsx`):
- 기존 sky/peach/mint 세 액센트와 겹치지 않는 `purple` 액센트를 `Accent` 타입과 `DARK_ACCENT_BG`에
  추가해 네 번째 placeholder 카드 신설
- 네 번째 카드를 실제 데이터(중국어 단어 검색·저장 및 예문 학습 서비스 소개, Supabase RLS 접근
  제어·SSR 인증·RPC 기반 검색·Lighthouse 성능 개선 4줄 요약, 실제 서비스 화면 썸네일, 배포·GitHub·
  포스트 링크)로 교체

**검증**: axe-core로 새 `purple` 카드도 다크 모드 색상 대비 재검사해 위반 0건 확인. `bunx eslint`,
`bunx tsc --noEmit`, `next build` 프로덕션 빌드 통과. `feat-exprience-project-content` 브랜치가
origin과 완전히 동기화된 상태로 마무리

📍 다음: Phase 3️⃣9️⃣ - 기술 스택 상세 내용 실제화 및 Resume 페이지 링크·PDF 연동

## Phase 3️⃣9️⃣: 기술 스택 상세 내용 실제화 및 Resume 페이지 링크·PDF 연동

**요청**: "프로젝트 카드의 내가 사용한 기술을 종합해서 tech stack 컴포넌트의 세부 내용을 간단하게
1줄씩 실제 내용을 추가해줘" → "프로젝트 이름은 거론하지말고... 각 기술의 어느 수준까지의 능력에
도달했는지를 간단하게 정리해주면 돼" → "~할 수 있습니다. 이렇게해 지금 문장표현이 어색해" →
"애매하게 텍스트가 가운데 배치되어있어, 패딩값을 더 줘봐" → 피그마 보기 링크 연결 및 PDF 다운로드
버튼 추가 요청 → 이력서 PDF 파일 전달 후 "옮기고 연결해줘"

**변경**:
- `AboutInfo.tsx`의 `SKILLS` 배열 `level`을 플레이스홀더 2줄에서, 완성한 프로젝트들을 종합한 실제
  내용 1줄로 교체 → 이후 프로젝트명을 거론하지 않고 "~할 수 있습니다" 형태로 각 기술의 도달 수준을
  설명하는 문장으로 재작성 (Next.js/React/TypeScript/Tailwind CSS/Supabase 5개)
- `HoverDisclosure.tsx`의 세부 내용 패널 패딩을 `px-5 py-7` → `px-10 py-8`로 확대 - 가운데 정렬된
  텍스트가 점선 테두리에 너무 붙어 어색해 보이던 문제 완화
- `Resume.tsx`: `RESUME_FIGMA_URL`을 실제 피그마 프로토타입 링크로 교체, 피그마/노션 버튼에
  `target="_blank" rel="noopener"` 추가, `FileDown` 아이콘의 PDF 다운로드 버튼 신규 추가
- **트러블슈팅**: 이력서 PDF를 받아 임시로 `public/projects/`에 넣었더니 VS Code에서 텍스트가
  깨져 보인다는 문의 → PDF는 바이너리 파일이라 텍스트 에디터로 열면 원래 그렇게 보이는 정상
  동작이고, `file` 명령으로 실제 PDF 손상 여부만 확인해드림. 다만 위치가 프로젝트 썸네일 폴더라
  부적절해 `public/resume/`로 이동, 다운로드 버튼 href를 `encodeURIComponent`로 정확히
  URL 인코딩한 실제 경로로 연결하고 `download="장예지_개발자이력서.pdf"`로 공백 없는 파일명 지정

**검증**: 매 단계 `bunx eslint` 통과. Playwright로 기술 스택 hover 패널과 Resume 버튼 3개 렌더링을
스크린샷으로 확인, `curl`로 PDF가 `application/pdf`·2.6MB로 정상 응답하는 것과 `<a>` 태그의
`href`/`download` 속성이 의도대로 렌더링되는 것을 직접 확인

📍 다음: Phase 4️⃣0️⃣ - 콘텐츠 관리 방식을 Supabase에서 Git 기반 Markdown/Velog로 전환

## Phase 4️⃣0️⃣: 콘텐츠 관리 방식을 Supabase에서 Git 기반 Markdown/Velog로 전환

**요청**: `docs/CONTENT_MANAGEMENT.md`를 참고 문서로 제시하며 "콘텐츠 관리 시스템 구현" 스펙(lib/projects.ts
신규 생성, app/posts/page.tsx의 Supabase 쿼리 제거, 프로젝트 상세 페이지에서 MDXRemote로 case-study.md
렌더링, app/api/posts·app/admin·Supabase 관련 코드 삭제)을 상세히 전달 → "피그마 프로필사진 바꿨는데
pdf에 반영이 안됐네" → 새 PDF 파일 전달 후 "업로드했어"

**변경**:
- `lib/projects.ts` 신규: `getProject(id)`(gray-matter로 frontmatter 분리), `getAllProjectIds()`(빌드
  타임 정적 생성용) 구현
- `app/(routes)/projects/[id]/page.tsx` 신규: `next-mdx-remote/rsc`의 `MDXRemote`(+remark-gfm)로
  case-study.md 렌더링, `generateStaticParams`로 빌드 시 4개 프로젝트 페이지 전부 SSG 확인,
  frontmatter(기간/역할/기술스택) 표시
- `projects/{yeamaeui-jeongseok,haengsho-market,genova-audio-toolkit,junghdaneo-changgo}/case-study.md`
  신규 작성 - 기존 프로젝트 카드(`Projects.tsx`)에 이미 있던 실제 개발 내용을 "기술적 결정" 섹션으로
  재구성해 재사용 (트러블슈팅/회고는 입력 대기 상태로 남김)
- `app/(routes)/posts/page.tsx`, `Posts.tsx`: Supabase 쿼리·TanStack Query 무한 스크롤 완전 제거,
  `velogPosts` 정적 배열 + velog.io 외부 링크 카드로 교체 (현재 빈 배열이라 빈 상태 UI 표시)
- Admin 전체(`app/admin/**`, `app/_components/admin/**` - TiptapEditor/ThumbnailInput/PostForm/
  AdminPostList), `app/api/posts/**`, `app/_lib/{admin-auth,admin-posts,admin-storage,posts,
  query-client}.ts`, `app/_components/providers/QueryProvider.tsx`, `app/(routes)/posts/[slug]/
  page.tsx`, `PostContent.tsx`/`PostsSkeleton.tsx`, `lib/{supabase,supabase-server}.ts`, `proxy.ts`
  (관리자 인증 전용 미들웨어), `types/posts.ts` 삭제
- 요청받은 목록 외에, 삭제 대상 파일들에서만 쓰이던 게 맞는지 grep으로 전수 확인한 뒤
  `@supabase/ssr`·`@supabase/supabase-js`·`@tanstack/react-query`·`@tiptap/*` 의존성과
  `next.config.ts`의 admin 전용 `serverActions.bodySizeLimit`, 미사용 picsum·pinimg·Supabase Storage
  `remotePatterns`도 함께 제거
- `app/globals.css`의 `.post-content`에 `h1` 스타일 추가(case-study 최상위 섹션용), `docs/
  ARCHITECTURE.md`를 새 폴더 구조·데이터 흐름으로 갱신
- 이력서 PDF를 피그마에서 프로필 사진이 바뀐 최신 버전(`장예지_이력서.pdf`)으로 교체, 기존 파일
  삭제 및 다운로드 버튼 href/파일명 갱신

**트러블슈팅**: 존재하지 않는 `/projects/[id]`로 접근 시 `notFound()`가 정상 호출되지만 `curl`로는
200이 반환됨 → 앱 전역 `app/loading.tsx`(루트 스트리밍 경계) 때문에 응답이 이미 200으로 스트리밍을
시작한 뒤 `notFound()`가 던져지는 구조였음. Next.js 공식 문서(node_modules/next/dist/docs)에 명시된
표준 동작(soft 404, `noindex` 메타 태그)이고 기존 `/posts/[slug]`도 동일 구조였음을 확인, 이번 범위
밖이라 별도 수정 없이 사실만 기록

**검증**: 매 파일 삭제/의존성 제거 전 grep으로 사용처 전수 확인. `bunx eslint` 프로젝트 전체 통과,
`next build` 프로덕션 빌드로 4개 project 페이지 SSG 확인, `/admin` 404, `curl`로 PDF `application/pdf`
정상 응답 확인, Playwright로 홈/Posts(빈 상태)/프로젝트 상세 페이지 실제 렌더링 확인

📍 다음: Phase 4️⃣1️⃣ - Posts 시스템 완성 (Velog 등록, 카테고리/프로젝트 아코디언, 프로젝트 상세 페이지 통합 제거)

## Phase 4️⃣1️⃣: Posts 시스템 완성 - Velog 등록, 카테고리/프로젝트 아코디언, 프로젝트 상세 페이지 통합 제거

**요청**: "이 파일을 portfolio 폴더의 case-study.md 파일로 만들어"(포트폴리오 자체 CMS 마이그레이션
회고 글) → "posts 페이지에 안보이는데" → "velog.io/@예지 프로필 링크 확인해서 등록해줘"(실제
계정은 @ruiwaa로 확인) → "각 프로젝트에 게시글 쓴 건데, 무조건 이름을 case-study.md로 파일명 안
써도 되는거 아니야? posts 폴더 안에 있는 글들을 다 불러오는 형식 아니야?" → "posts에 넣으려고
폴더구조 만든거 아니야??" → "해당 md파일의 방식으로 게시글 데이터 관리" → "학습노트 포스트는 전부
다 제거해줘" → "트러블슈팅, 회고 등으로 나눠서 포스트를 정렬해" → "최근 포스터는 트러블 슈팅이야"
→ "트러블슈팅 탭메뉴는 호버시 아코디언 컴포넌트처럼 각 프로젝트 단위로 들어가서 확인 할 수
있도록" → "탭 메뉴의 이름을 searchparams로 읽게 만들어" → "중단어 창고 포스트 링크를 트러블
슈팅 링크로 연결해" → "파일명 자유롭게 아무 .md나 찾아서 읽도록 바꿔줘" → "프로젝트 상세 페이지는
없어. 프로젝트 카드 안에 포스트 링크를 누르면 벨로그 외부 링크 또는 로컬에 md로 저장한 포스트랑
연결되게 하려고 구조를 짠거야" → "완전히 제거하고 posts로 통합" → 런타임 에러 리포트("Cannot read
properties of undefined (reading 'localeCompare')") → "오류 수정해" → "이 문서도 필요해"(프록시
인증 트러블슈팅 글, 실제 내용 전달) → "fratter에 readingtime 제거해" → "나머지 부분 문서 확인해서
커밋해"

**변경**:
- `posts/portfolio-cms-migration/post.md` 신규: 포트폴리오 자체 CMS 마이그레이션 과정을 case
  study가 아닌 일반 글로 작성 (이후 파일 구조 재검토 과정에서 최종적으로 이 위치가 맞는 것으로 확정)
- Velog(`@ruiwaa`) RSS 피드(`v2.velog.io/rss/@ruiwaa`)를 직접 파싱해 실제 발행글을 `Posts.tsx`의
  `velogPosts` 배열에 등록 (처음 20개 → 학습노트 태그 4개 제거 후 16개, 이후 사용자가 직접
  타이틀·카테고리·프로젝트를 여러 차례 정정)
- `lib/posts.ts`, `lib/markdown.ts` 신규: `projects/<id>/case-study.md` 패턴과 동일하게
  `posts/<slug>/*.md`를 gray-matter로 파싱하는 로컬 글 시스템 구축, `app/(routes)/posts/[id]/
  page.tsx`에서 `MDXRemote`로 렌더링. 파일명을 `case-study.md`/`post.md`로 고정하지 않고
  `findMarkdownFile`이 폴더 안의 `.md` 파일을 이름순으로 찾아 읽도록 변경(여러 개면 첫 번째만 사용)
- `lib/constants.ts`에 `POST_CATEGORIES`(트러블슈팅/회고/기획/개발) 추가, `velogPosts`와 로컬 글
  frontmatter 모두에 `category`·`project` 필드 추가
- `PostsList.tsx` 신규(클라이언트 컴포넌트)로 렌더링 분리: 카테고리 탭 필터 UI 추가, 선택된 탭을
  `?tab=<카테고리명>`으로 `useSearchParams`/`router.replace` 동기화(전체는 파라미터 생략, 새로고침
  ·링크 공유 시 유지) - 정적 페이지에서 `useSearchParams`를 쓰려면 `<Suspense>` 경계가 필요해
  `Posts.tsx`에서 감쌈
- 트러블슈팅 탭은 `project` 값으로 그룹핑해 프로젝트별 아코디언으로 렌더링(마우스 호버 시 열림,
  클릭으로 토글 - 키보드/터치 접근성 대응), 카드 렌더링은 `PostCard`로 공통화
- **`app/(routes)/projects/[id]/page.tsx` + `lib/projects.ts` + `projects/<id>/case-study.md` 전체
  삭제**하고 posts로 완전히 통합 - 별도 프로젝트 상세 페이지 없이 Experience 섹션 프로젝트 카드의
  "포스트" 링크가 Velog 글 또는 `posts/` 로컬 글로 직접 연결되도록 함(원래 의도했던 구조로 정정).
  실제 내용이 있던 `yeamaeui-jeongseok`의 리팩토링 기록은 `posts/yeamaeui-jeongseok-refactoring/
  post.md`로 이전(원본의 `<div style="...">` 문자열 style 속성이 MDX/JSX 파싱 에러를 일으켜 제거,
  끝부분 짝 안 맞는 코드펜스도 정리). 내용이 비어 있던 나머지 3개 프로젝트의 `case-study.md`
  플레이스홀더는 손실 없이 삭제
- Experience 섹션 프로젝트 카드 포스트 링크 순차 연결: 중단어 창고 → `/posts?tab=트러블슈팅`,
  예매의 정석 → `/posts/yeamaeui-jeongseok-refactoring`(직접), 행쇼마켓 → `/posts?tab=트러블슈팅`,
  GENOVA 오디오 툴킷 → 관련 Velog 글 직접 연결. 행쇼마켓 카드의 demo/github 링크도 실제 배포·레포
  URL로 교체
- `posts/final-project/likeBtn_trouble_shooting.md`, `posts/final-project-proxy/
  proxy_trouble_shooting.md` 신규(사용자가 직접 작성한 실제 트러블슈팅 기록 전달) - `project`
  값을 사용자가 직접 "행쇼마켓"으로 정정, 같은 폴더에 `.md` 파일 2개를 두면 하나가 조용히
  무시되는 구조적 한계 때문에 `final-project-proxy`로 슬러그 폴더 분리
- `readingTime` 필드를 frontmatter·타입 전체(`PostFrontmatter`, `VelogPost`, `PostItem`,
  `isValidFrontmatter`, 기존 로컬 글 3개, `CONTENT_MANAGEMENT.md`)에서 완전히 제거 (카드/상세
  페이지 표시는 이미 이전 단계에서 제거된 상태였음)
- `docs/CONTENT_MANAGEMENT.md`, `docs/ARCHITECTURE.md`를 posts 단일 구조에 맞게 전면 갱신

**트러블슈팅**: 사용자가 frontmatter 없이 `posts/final-project/likeBtn_trouble_shooting.md`를
직접 추가하면서 `date`가 `undefined`가 되어 `Posts.tsx`의 정렬 로직
(`b.date.localeCompare(a.date)`)에서 런타임 에러 발생 → 해당 글에 frontmatter를 채워 즉시 해결하고,
`lib/posts.ts`에 `isValidFrontmatter` 검증을 추가해 앞으로 필수 필드가 빠진 글은 콘솔 경고만 남기고
목록에서 자동 제외되도록 방어 처리(사이트 전체 크래시 재발 방지)

**검증**: 매 단계 `bunx eslint`·`bunx tsc --noEmit` 통과. `next build` 프로덕션 빌드로 로컬 글
전부(포트폴리오 마이그레이션, 예매의 정석, 행쇼마켓 2건) SSG 생성 확인, `/projects/[id]` 라우트
완전히 404로 사라진 것 확인. Playwright로 탭 필터·프로젝트별 아코디언 호버/클릭 동작, `?tab=` URL
직접 진입 시 탭 상태 복원, Experience 카드의 각 포스트 링크가 의도한 목적지로 열리는 것을 실제
클릭·스크린샷으로 검증. 원본 마크다운의 `<div style="...">` 제거 전후로 정적 HTML에 문제되는
코드가 없는지 `curl`·`page.content()`로 직접 대조 확인

📍 다음: (사용자 지정 대기)

## Phase 4️⃣2️⃣: README 작성 및 페이지 구성 표 중심으로 재구성

**요청**: 저장소 루트에 프로젝트를 소개하는 README 작성 → "read.me 파일이 안보이는데?? 지금
브랜치에서" → README 주요 기능을 페이지별로 정리 → 페이지 구성 표에 페이지별 주요 기능 정렬 →
페이지 구성에 주요 기능 통합, 별도 주요 기능 섹션 삭제 → "왜 브랜치가 늘어났어????" → 통합
버전(`49b88dc`)을 최종본으로 선택

**변경**:
- `README.md` 신규: 사이트 소개(Git 기반 Markdown + Velog 콘텐츠 관리, 전 페이지 정적 생성),
  GitHub·Velog(`@ruiwaa`) 링크
- 기술 스택 표: Next.js 16(App Router)·React 19·TypeScript·Tailwind CSS v4·`next/font`, 콘텐츠
  파이프라인(gray-matter, next-mdx-remote, remark-gfm), 아이콘(lucide-react, react-icons), Bun
- 페이지 구성 표를 `경로 | 내용 | 주요 기능` 3열로 재구성: 처음 별도 `✨ 주요 기능` 섹션에 있던
  6개 항목을 해당 페이지 행으로 옮김 - `/posts`(통합 목록, 카테고리 탭 `?tab=` URL 동기화,
  트러블슈팅 프로젝트별 아코디언, Git 기반 콘텐츠 관리), `/posts/[id]`(MDX 렌더링,
  `generateStaticParams` 정적 생성), `/experience`(프로젝트별 데모·GitHub·포스트 링크),
  `/resume`(PDF 다운로드, 피그마/노션 링크), 공통 행(Header·Footer·테마 토글 - 깜빡임 없는 다크
  모드). 기능을 어느 페이지에서 볼 수 있는지 한 표에서 확인되도록 `✨ 주요 기능` 섹션은 삭제
- 폴더 구조 트리(`app/`, `lib/`, `posts/<slug>/`, `public/`, `styles/`, `docs/`)와 역할 주석
- 시작하기: `bun install`/`bun dev`/`bun run build`/`bun start`/`bun lint`, 별도 환경 변수 불필요 명시
- 글 추가하기: 로컬 Markdown 글 frontmatter 예시(`category`·`project` 필드 설명 포함, Phase 41에서
  제거한 `readingTime` 미포함), Velog 글은 `Posts.tsx`의 `velogPosts` 배열에 추가하는 방법,
  `docs/CONTENT_MANAGEMENT.md` 링크
- 소개된 프로젝트 표(예매의 정석, 행쇼마켓, GENOVA 오디오 툴킷, 중단어 창고)와 `docs/` 주요 문서 링크 표

**트러블슈팅**:
- 로컬 `feat-add-readme`에서 README가 제목 한 줄만 보임 → README 커밋(`db08fd8`)이 워크트리
  브랜치(`feat-add-readme-wt`)에서 만들어져 `origin/feat-add-readme`로만 push되고 로컬 브랜치는
  받아오지 않아 1커밋 뒤처진 상태였음. 작업 트리가 깨끗한 것을 확인하고 `git merge --ff-only`로
  원격과 맞춰 해결
- README 수정 요청마다 백그라운드 작업이 별도 워크트리·브랜치(`feat-readme-features`,
  `worktree-readme-page-features`, `readme-page-features-2`, `feat-add-readme-wt`)를 만들어 브랜치가
  늘어나고 README 버전이 브랜치마다 갈라짐 → 사용자가 최종본으로 고른 통합 버전(`49b88dc`)을
  `feat-add-readme`에 cherry-pick하고, 원격에 먼저 올라가 있던 Phase 42 요약(`4ae529b`)도
  fast-forward로 받아와 README·요약 문서를 한 브랜치로 합침

**검증**: README 안의 `docs/` 문서 링크 8개가 모두 실제 파일로 존재함을 확인. 기술 스택 표기를
`package.json`(next 16.3.4, react 19.2.8, tailwindcss ^4 등)과 대조, 스크립트 명령이 `package.json`
scripts와 일치함을 확인. `git log`로 `feat-add-readme`에 README 작성·요약·통합 커밋이 모두
순서대로 쌓인 것 확인. 코드 변경 없는 문서 전용 변경

📍 다음: Phase 4️⃣3️⃣ - 행쇼마켓·인턴십 회고 및 성능 최적화 트러블슈팅 포스트 추가

## Phase 4️⃣3️⃣: 행쇼마켓·인턴십 회고 및 성능 최적화 트러블슈팅 포스트 추가

**요청**: README PR(#64) 머지 후 "지금 내용 반영하고 feat-add-retrospection로 이동하려면 어떻게
해야돼?" → 파이널 프로젝트 회고 원고 전달 후 "로컬의 md 파일 하나 만들고 회고 탭 눌렀을때 확인할
수 있게 해" → 성능 최적화 PR 본문 전달 후 "파이널 프로젝트 트러블 슈팅에 성능 최적화라는 제목으로
게시글 작성해" → 인턴십 회고 원고 전달 후 "인턴십 프로젝트 회고 게시글로 만들어" → "회고 게시글들
안에 회고 태그가 두번이나 들어가. 수정해" → 같은 문제가 있던 Velog 기획 글도 "그것도 빼줘"

**변경**:
- 브랜치 준비: 로컬 `dev`가 초기 커밋에 멈춰 있어 `git pull --ff-only`로 PR #64 머지 커밋(`79378f8`)까지
  맞춘 뒤, 커밋이 없던 `feat-add-retrospection`을 `git merge --ff-only dev`로 따라잡게 하고 push
- `posts/final-project-retrospective/post.md` 신규(행쇼마켓 파이널 프로젝트 회고): 전달받은 원고의
  frontmatter를 `lib/posts.ts`의 `isValidFrontmatter` 스키마에 맞게 변환 - `category: "retrospective"` →
  `"회고"`(POST_CATEGORIES 값만 허용), `summary` → `excerpt`, 필수 필드 `project: "행쇼마켓"` 추가.
  상세 페이지가 `title`을 이미 `<h1>`로 렌더링하므로 본문 첫 줄 `# 파이널 프로젝트 회고` 제거(h1 중복
  방지). 원고의 `period` 필드는 사용처는 없지만 무해해서 유지
- `posts/final-project-performance/performance_optimization.md` 신규(`[행쇼마켓][트러블슈팅] 성능
  최적화`): 성능 최적화 PR 본문의 6개 항목(미사용 three.js 패키지 제거, RegisterProductForm
  `getInputProps` 통합, 취소 버튼·모달, CategorySelector 무한 렌더링, Navi 서버 컴포넌트 분리로 CLS
  0.608→0.000, 이미지 `sizes` 지정)을 각각 문제 상황/원인/해결 과정/결과 구조의 글로 재구성. 제목
  머리말은 같은 아코디언의 기존 행쇼마켓 글 형식에 맞춤. 스크린샷 2장은 GitHub user-attachments
  URL이 비로그인 상태에서 200으로 열리는 것을 확인한 뒤 그대로 사용
- `posts/internship-retrospective/post.md` 신규(인턴십 회고 - 오디오 툴킷): 파이널 회고와 같은 방식으로
  frontmatter 변환, `project`는 기존 Velog 인턴십 글과 같은 `"인턴십 프로젝트"`로 지정해 같은 그룹으로
  묶이도록 함
- 회고 글 2개의 `tags`에서 `"회고"` 제거, `Posts.tsx`의 Velog "포트폴리오 기획 단계" 글 `tags`에서
  `"기획"` 제거 - 카드가 카테고리 배지와 태그를 함께 보여줘서 같은 단어가 두 번 표시되던 문제

**트러블슈팅**:
- 성능 최적화 PR 원고 안에서 성능 점수가 세 가지로 서로 달랐음(체크리스트 61→80, 1번 항목 61→71,
  점수 표 작업 전 71→71→82) → 1번 항목을 기준으로 61 → 71 → 82로 정리하고, 점수 표의 "작업 전 71"은
  오타로 판단해 61로 적음. 실측값 확인이 필요하다고 사용자에게 알린 상태로 커밋됨
- 새 글을 추가하고 다시 빌드했는데 트러블슈팅 탭 행쇼마켓 아코디언에 새 글이 보이지 않음 → 앞서 띄운
  검증용 서버가 `next-server`라는 프로세스명으로 떠 있어 `pkill -f "next start -p 3123"`에 걸리지 않고
  이전 빌드를 계속 서빙하고 있었음. `lsof -ti tcp:3123`로 포트를 점유한 프로세스를 찾아 종료한 뒤 새
  빌드로 다시 띄워 행쇼마켓 (3)과 새 글 노출을 확인. 이후 검증 서버는 포트 기준으로 종료

**검증**: 매 글 추가 후 `next build`로 `/posts/final-project-retrospective`, `/posts/final-project-performance`,
`/posts/internship-retrospective` SSG 생성 확인. Playwright로 `/posts?tab=회고`에 회고 글 2개,
`/posts?tab=트러블슈팅` 행쇼마켓 아코디언(3)에 성능 최적화 글이 노출되고 클릭 시 상세 페이지로 이동하는
것, 상세 페이지 `<h1>` 1개·스크린샷 2장 로드(naturalWidth 463/409)를 확인. 태그 수정 후 회고·기획 탭
카드에서 카테고리 단어가 각각 1번만 표시되는 것 확인. `bunx eslint` 통과

📍 다음: Phase 4️⃣4️⃣ - 사이트 metadata 변경, 포스트 excerpt 어미 통일, 프로젝트 카드 GitHub 링크·담당 범위

## Phase 4️⃣4️⃣: 사이트 metadata 변경, 포스트 excerpt 어미 통일, 프로젝트 카드 GitHub 링크·담당 범위

**요청**: "layout.tsx에 metadata를 변경해야돼, yeji's portfolio로 라고 하고 내가 누른 페이지별로 옆에 |
페이지 이름 이렇게 보여야해, description도 수정" → "먼저 커밋해줘" → "로컬 안에 있는 md파일 중 트러블
슈팅 파일의 excerpt 부분에 기록했습니다라고 어미를 일괄 수정해" → "회고 그도 기록했습니다. 로 통일" →
"커밋해" → (사용자가 프로젝트 카드 GitHub 링크 직접 수정) "지금 외부 링크 수정했는데 커밋해줘" →
"push하고 마무리 작업해" → "프로젝트 카드 안에 사용 기술 밑에 내가 담당한 범위를 적어" → "커밋해줘" →
"push하고 마무리 작업해"

**변경**:
- 브랜치: 회고 PR과 무관한 작업이라 `origin/dev`에서 `feat-add-metadata`를 새로 만듦. 생성 시
  `origin/dev`를 upstream으로 추적하게 되어 있어 실수로 dev에 push되지 않도록 `--unset-upstream` 후,
  첫 push 때 `-u origin feat-add-metadata`로 연결
- `app/layout.tsx`: create-next-app 기본값("Create Next App", "Generated by create next app")을
  `title: { template: "yeji's portfolio | %s", default: "yeji's portfolio" }`와 포트폴리오 소개
  description으로 교체. Next.js 문서(`generate-metadata.md`)대로 template 사용 시 필수인 `default`를
  함께 지정
- About/Experience/Posts/Resume `page.tsx`에 `metadata.title`로 페이지 이름만 추가 - 헤더 내비게이션
  라벨(About Me, Experience & Projects, Posts, Resume)과 동일하게 맞춤. 글 상세 페이지는 기존
  `generateMetadata`가 글 제목을 반환하고 있어 코드 수정 없이 같은 템플릿이 적용됨
- 로컬 트러블슈팅 글 5개·회고 글 2개의 `excerpt` 어미를 "…기록했습니다."로 통일 (likeBtn 글은
  사용자가 먼저 직접 수정). 인턴십 회고는 "진행한 기록."이 명사형으로 끝나 "진행한 과정을
  기록했습니다."로 문장화
- `Posts.tsx`: 사용자가 직접 수정한 중단어창고 페이지네이션 Velog 글 excerpt 문구("고쳤습니다" →
  "수정하였습니다")를 어미 통일과 성격이 달라 별도 커밋으로 분리
- `Projects.tsx`(사용자 직접 수정): 프로젝트 카드 GitHub 링크를 개인 저장소로 교체 - 예매의 정석
  (`ruiwaa/vanilla-project-team1`), 행쇼마켓(예매의 정석 저장소로 잘못 연결돼 있던 것을
  `ruiwaa/final-project-team2`로), 중단어 창고(배포 주소가 들어가 있던 것을 `ruiwaa/hanzi-bank`로)
- `Projects.tsx`: `ProjectEntry`에 필수 필드 `role` 추가, 카드의 기술 태그와 소개 문구 사이에
  "**담당 범위** …" 한 줄 표시. 문구는 기존 자료에서 근거를 찾아 작성 - 예매의 정석 "영화표 결제 페이지"
  (Phase 35 때 사용자가 전달한 담당 작업), 행쇼마켓 "마이페이지 - 소비자 주문 내역·찜한 상품, 판매자 상품
  등록·상품 관리·상점 주문 관리"(파이널 프로젝트 회고 글), GENOVA "프론트엔드 전체 - 효과음 생성·자막 생성
  페이지"(Experience 섹션·인턴십 회고), 중단어 창고 "개인 프로젝트 - 전체 개발"(GitHub 저장소 기여자가 본인
  1명). Phase 35에서 카드 제목의 인원수 표기를 뺐던 결정을 따라 팀 인원수는 넣지 않음

**검증**: `bunx eslint app`, `bunx tsc --noEmit`, `next build` 통과. 프로덕션 서버에서 `curl`로 페이지별
`<title>` 확인 - `/` "yeji's portfolio", `/about` "yeji's portfolio | About Me", `/experience`
"… | Experience & Projects", `/posts` "… | Posts", `/resume` "… | Resume", 글 상세 "… | 글 제목",
없는 경로는 기본 제목, 모든 페이지에 새 description 적용. 변경된 GitHub 저장소 URL 3개 모두 200 응답 확인.
담당 범위 추가 후 Playwright로 `/experience` 카드 4개에 문구가 노출되는 것과 데스크톱(1280px)·모바일(390px)
× 라이트·다크 모드 스크린샷에서 줄바꿈·색상이 깨지지 않는 것 확인

📍 다음: Phase 4️⃣5️⃣ - 프로젝트 카드 성과 bullet에 실제 측정값 반영

## Phase 4️⃣5️⃣: 프로젝트 카드 성과 bullet에 실제 측정값 반영

**요청**: "posts 내용 확인해서 이 기준대로 about 프로젝트 카드에 내용을 수정해" (기준 누락 → 확인 요청) →
작업 기준 전달("프로젝트 카드의 성과 bullet에 실제 측정값을 추가해 결과를 구체적으로 전달한다. 중단어 창고:
Lighthouse LCP·Long Task 개선 전후 수치 / 행쇼마켓·GENOVA: 측정 가능한 지표 확인 후 반영 / 실제 측정한
값만 기재, 측정하지 못한 항목은 정성적 결과로 서술") → "커밋해줘" → "push하고 마무리 작업해"

**변경**:
- 브랜치: PR #69(`feat-add-metadata`) 머지 후 사용자가 만든 `docs-add-project-bullet`에서 작업
- 측정값 출처 조사: 로컬 `posts/`와 Velog RSS(`v2.velog.io/rss/@ruiwaa`)의 본문에서 프로젝트별 수치를 확인
  - 중단어 창고: Velog "lighthouse 검사 후 성능 개선 작업"의 개선 후 표 - 데스크탑 LCP 회원가입 5초·메인
    0.5초·로그인 0.4초 단축, 검색 성능 점수 6점 증가 등 페이지별 변화량만 텍스트로 있고 개선 전후 절대값은
    이미지로만 존재. Long Task는 측정 기록 없음
  - 행쇼마켓: 로컬 "성능 최적화" 글 - CLS 0.608 → 0.000, 미사용 three.js 약 600KB. 성능 점수는 원고 안에서
    값이 서로 달라(61→80 / 61→71 / 71→82) 제외
  - GENOVA: posts·Velog 어디에도 측정값 없음
- `Projects.tsx` `detail` 수정 (Claude 초안 + 사용자 직접 수정이 한 커밋에 함께 반영됨)
  - 중단어 창고: "Lighthouse로 LCP·Long Task 등… 성능 개선" → "…데스크탑 기준 LCP를 회원가입 5초·메인
    0.5초 단축하고 검색 페이지 성능 점수 6점 향상". 측정 기록이 없는 Long Task는 제외, 절대값 대신 변화량으로 서술
  - 행쇼마켓(사용자가 bullet 전체를 재작성): Navi 서버 컴포넌트 전환으로 CLS 0.608 → 0 개선, 배송 상태 변경
    후 invalidate로 새로고침 없이 주문 목록 반영, 중첩 응답 데이터 타입 정의, API 함수·Custom Hook·UI 분리,
    미사용 three.js(약 600KB) 제거 - 5개 bullet
  - GENOVA: 측정값이 없어 정성적 결과를 구체화 - "불필요한 서버 요청 최소화" → "사용자가 효과음을 여러 번
    바꿔 들어봐도 서버 요청 없이 전환되도록 구현"(인턴십 회고의 선택/적용 분리 설계 근거), 접근성 bullet에
    "확장" 표현 추가(사용자 수정)
  - 예매의 정석: 첫 bullet("Local Storage에 저장된 영화·좌석 정보를…") 삭제, 파일 상단 `// TODO: 실제
    프로젝트 데이터로 교체` 주석 제거(사용자 수정)

**트러블슈팅**: Claude가 3개 bullet만 수정한 뒤 사용자가 같은 파일을 추가로 직접 수정한 상태에서 커밋 요청이
와서, 커밋(`b3349f7`)에 두 변경이 함께 들어감 → 푸시 후 `git show`로 실제 커밋 내용을 확인해 사용자 수정분
(행쇼마켓 bullet 재작성, 예매의 정석 bullet 삭제, TODO 제거)을 파악하고, 커밋된 상태 기준으로 eslint·tsc·build를
다시 돌려 통과를 확인한 뒤 이 문서와 PR 문서를 실제 커밋 내용에 맞춰 작성

**검증**: `bunx eslint app`, `bunx tsc --noEmit`, `next build` 통과(커밋된 최종 상태 기준). 수정 직후 Playwright로
`/experience`의 행쇼마켓·중단어 창고 카드를 데스크톱(1280px)·모바일(390px)에서 스크린샷으로 확인

📍 다음: Phase 4️⃣6️⃣ - 기술 스택 카테고리 재구성, Hero 요약 추가, 성장의 여정 간격 축소

## Phase 4️⃣6️⃣: 기술 스택 카테고리 재구성, Hero 요약 추가, 성장의 여정 간격 축소

**요청**: 기술 스택 목록 전달("Core TypeScript · JavaScript · React · Next.js (App Router) · HTML/CSS / State
TanStack Query · Zustand / Form React-Hook-Form · Zod — 회원가입·예문 작성 폼 검증 / Backend Supabase — RLS
접근 제어, RPC 검색 로직, @supabase/ssr 인증 / Styling Tailwind CSS / Quality Lighthouse · WAVE / AI Tool Claude
Code — 설계 문서(claude.md) 기반 기능 개발") 후 "이 내용 참고해서 스택 추가하고 세부 사용 가능 기술 내용을
수정해" + "hero 컴포넌트 아래에 장예지 · FRONTEND DEVELOPER / 기업 연계 프로젝트 프론트엔드 단독 | 개선 요청
37건 중 35건 반영 | 기술 블로그 45편 이 문구들을 넣어서 보여줘" + "성장의 여정도 좀 더 세로 패딩값을 줄여" →
"성장의 여정 패딩 13으로 바꿔" → "커밋해줘" → "push하고 마무리 작업해"

**변경**:
- 브랜치: 사용자가 만든 `74-feat-posts-project-trouble-params`에서 작업. 이 브랜치에는 사용자가 먼저 커밋한
  `ea9195a fix: 행쇼마켓 1번째 개선 사항에 단어 추가`(Projects.tsx 행쇼마켓 CLS bullet에 "초" 단위 추가)가 포함됨
- `AboutInfo.tsx`: 평면 `SKILLS` 배열을 `SKILL_GROUPS`(Core/State/Form/Backend/Styling/Quality/AI Tool)로
  재구성해 카테고리 라벨 + 배지 행으로 렌더링, 스택 5개 → 15개(JavaScript, HTML/CSS, TanStack Query, Zustand,
  React-Hook-Form, Zod, Lighthouse, WAVE, Claude Code 추가)
  - 세부 설명(hover 패널)은 "~할 수 있습니다" 형태 유지. Form·Supabase·Claude Code는 전달받은 설명(회원가입·예문
    작성 폼 검증, RLS·RPC·@supabase/ssr, claude.md 기반 개발)을 그대로 반영하고, 나머지는 프로젝트 카드·회고 글에
    기록된 실제 사용 내용을 근거로 작성. Next.js는 Lighthouse가 별도 배지로 분리되어 "서버·클라이언트 컴포넌트
    구분, Server Action 폼 처리"로 교체
  - Zustand·WAVE는 react-icons에 공식 로고가 없어 `GiBearFace`(곰)·`MdAccessibilityNew`(접근성)로 대체
  - HoverDisclosure 패널이 행 전체 너비를 기준으로 펼쳐지도록 각 행에 `relative`, 데스크톱은 라벨 너비(`w-24`)
    고정 + 전체 블록 `sm:w-fit` 가운데 배치로 7개 행의 배지 시작선을 맞춤(Playwright로 7개 행 left 좌표가 모두
    389px로 같은 것 확인). 모바일은 라벨 아래 배지 가운데 정렬. 등장 애니메이션 지연은 그룹을 넘어 전체 배지
    순서대로 이어지게 계산
- `HeroSummary.tsx` 신규 + `app/page.tsx`: Hero 바로 아래 구분선과 함께 "장예지 · FRONTEND DEVELOPER", 주요
  경력 3개를 `<ul aria-label="주요 경력">`으로 표시(데스크톱 세로 구분선 한 줄, 모바일 세 줄). Hero 인사말 전환
  (1700ms) 직후인 1900ms에 fade-up 등장. "기술 블로그 45편"은 작업 중 사용자가 직접 "25편"으로 수정
- `AboutVision.tsx`: 성장의 여정 단계 간 세로 간격 `pb-28`(112px) → `pb-16` → 사용자 지정으로 `pb-13`(52px).
  빌드 CSS에 `.pb-13{padding-bottom:calc(var(--spacing) * 13)}`가 생성된 것 확인

**참고**: `ea9195a`에서 행쇼마켓 bullet이 "CLS를 0.608초에서 0초로 개선"이 되었는데, CLS는 시간이 아닌 단위 없는
점수라 "초"는 사실과 맞지 않음 → 사용자 확인 후 "CLS를 0.608에서 0으로 개선"으로 되돌림(`fix: 행쇼마켓 CLS 문구에서
잘못된 '초' 단위 제거`)

**검증**: `bunx eslint app`, `bunx tsc --noEmit`, `next build` 통과. Playwright로 홈 Hero 요약(데스크톱 1280px·모바일
390px × 라이트·다크), About 기술 스택(Supabase hover 패널 포함, 데스크톱·모바일 × 라이트·다크), 성장의 여정
간격을 스크린샷으로 확인

📍 다음: Phase 4️⃣7️⃣ - 트러블슈팅 아코디언 project 쿼리 연동, 클릭 전용 전환, 프로젝트 카드 순서 정렬

## Phase 4️⃣7️⃣: 트러블슈팅 아코디언 project 쿼리 연동, 클릭 전용 전환, 프로젝트 카드 순서 정렬

**요청**: "트러블 슈팅 게시글 링크 들어가면 각 프로젝트 클릭 시 param에도 문자열을 받도록 해. 그렇게 하고, 각
프로젝트 카드 게시글 링크에 해당 url를 연결시켜" → "아코디언이여서 호버시에 다른 탭의 url로 바뀌는 불편함이
있어" → "호버되지 않게 해줘, 클릭 시에만 해당 컨텐츠가 보이게 만들어" → "프로젝트 카드 순서 바꿔줘, 인턴십,
중단어,행쇼, 예매의 정석 순으로. 그러고 나서 트러블 슈팅도 프로젝트 카드 순서와 동일하게 정렬해" → "커밋해줘"
→ "push하고 마무리 작업해"

**변경**:
- 브랜치: Phase 46과 같은 `74-feat-posts-project-trouble-params`(PR 미머지 상태) - 브랜치 이름의 원래 목적인
  작업이라 같은 PR에 포함
- `lib/constants.ts`: `/posts` 쿼리 키 `POSTS_TAB_PARAM`("tab")·`POSTS_PROJECT_PARAM`("project")과
  `getTroubleshootingHref(project)`(`URLSearchParams`로 `/posts?tab=트러블슈팅&project=…` 생성),
  아코디언 정렬 순서 `TROUBLESHOOTING_PROJECT_ORDER` 추가 - 카드 링크(생성)와 PostsList(읽기·갱신)가 같은 키를 씀
- `PostsList.tsx`
  - `ProjectAccordion`의 내부 `useState`를 없애고 열린 프로젝트를 `?project=`에서 읽음(파생 상태) - 링크 진입·
    새로고침·공유 시에도 같은 프로젝트가 열림. 쿼리 갱신은 `replaceParams` 헬퍼로 묶어 `router.replace(…,
    { scroll: false })`
  - 탭을 바꾸면 `project` 파라미터를 함께 삭제(아코디언은 트러블슈팅 탭에만 있음)
  - 호버 열기 제거: 1차로 호버/클릭 모두 URL을 갱신했더니 마우스가 지나가기만 해도 주소가 다른 프로젝트로
    바뀜 → 2차로 호버는 URL 없는 미리보기(`hoveredProject`)로 분리 → 사용자 요청으로 최종적으로 호버 동작을
    완전히 제거하고 클릭으로만 열고 닫음
  - 프로젝트 그룹을 `TROUBLESHOOTING_PROJECT_ORDER` 순으로 정렬, 목록에 없는 프로젝트(포트폴리오)는 뒤에서
    기존 최신순 유지
- `Projects.tsx`
  - 카드 순서를 GENOVA 오디오 툴킷 → 중단어 창고 → 행쇼마켓 → 예매의 정석으로 변경(내용 변경 없음). 순서 변경
    시 `TROUBLESHOOTING_PROJECT_ORDER`도 맞추라는 주석 추가
  - 카드 4개의 포스트 링크를 `getTroubleshootingHref`로 교체 - 예매의 정석(기존 리팩토링 글 직접 링크)·GENOVA
    (기존 Velog 글 직접 링크)도 "각 프로젝트 카드" 요청에 따라 아코디언 주소로 변경. GENOVA는 트러블슈팅 글의
    project 값이 "인턴십 프로젝트"라 그 이름으로 연결하고 주석으로 이유 기록

**트러블슈팅**: 호버로 아코디언이 열리는 기존 동작에 URL 동기화를 붙이자, 마우스가 지나가는 프로젝트마다 주소가
바뀌고 위쪽 패널이 접히며 목록이 당겨져 의도하지 않은 프로젝트가 열림(Playwright에서 중단어 창고로 이동하던
마우스가 포트폴리오를 열어 `project=포트폴리오`로 바뀌는 것 재현) → 호버 미리보기와 URL 확정을 분리했다가, 사용자
피드백에 따라 호버 열기를 제거해 클릭으로만 열리게 함. 수정 후 호버 시 주소·열림 상태가 그대로이고 클릭·Enter로만
바뀌는 것 확인

**검증**: `bunx eslint app lib`, `bunx tsc --noEmit`, `next build` 통과. Playwright로 카드 포스트 링크 4개 진입 시 각각
예매의 정석 (1)·행쇼마켓 (3)·인턴십 프로젝트 (1)·중단어 창고 (7)이 열린 상태로 표시, 클릭 시 `project` 갱신·재클릭 시
삭제, 새로고침 유지, 탭 전환 시 `project` 삭제, 호버 시 변화 없음, 키보드 Enter로 열림, 카드 순서(`/`·`/experience`)와
아코디언 순서(인턴십 프로젝트 → 중단어 창고 → 행쇼마켓 → 예매의 정석 → 포트폴리오) 확인

📍 다음: Phase 4️⃣8️⃣ - 프로젝트 카드 모바일·태블릿 반응형 재구성, 이력서 PDF 교체

## Phase 4️⃣8️⃣: 프로젝트 카드 모바일·태블릿 반응형 재구성, 이력서 PDF 교체

**요청**: "프로젝트 에서 중단어 창고 프로젝트 카드가 모바일 버전에서 레이아웃이 깨져, 프로젝트 카드를 전반적으로
모바일 버전에서 사이즈가 반응형으로 적용되게 다시 스타일링해" → "커밋해줘" → (사용자가 이력서 PDF 교체 커밋 추가)
→ "push하고 마무리 작업해"

**변경**:
- 브랜치: PR #75 머지 후 사용자가 만든 `refactor-project-moblie-ver`
- `Projects.tsx` 프로젝트 카드 반응형 재구성
  - 세부 내용 텍스트 칸에 `min-w-0`, 문장 span에 `min-w-0 wrap-anywhere`(overflow-wrap:anywhere) - 끊을 수 없는 긴
    기술 용어가 칸 끝에서 줄바꿈되도록
  - 세부 내용 글자 `text-[18px]` 고정 → `text-base sm:text-[18px]`, 카드 제목 `text-2xl` → `text-xl sm:text-2xl`
  - 이미지·세부 내용 가로 배치 기준 `sm`(640px) → `lg`(1024px). 1차로 `md`(768px)로 옮겼으나 768px에서 글 칸이
    약 200px로 좁아 "fetchPriority/prelo·ad"처럼 단어 중간에서 끊겨 `lg`로 재조정. 1024px 미만은 이미지 아래 글이 전체 폭
  - 모바일 이미지 `h-60` 고정 → `aspect-16/10 w-full`(lg부터 `h-64 w-80`), 모바일 좌우 여백 바깥 `px-6` + 글 칸 `p-6`
    중첩(양옆 48px) → 바깥 `px-5 sm:px-6`, 글 칸은 lg부터만 `p-6`
  - `next/image` `sizes`를 새 배치에 맞게 `(min-width: 1024px) 320px, (min-width: 640px) 848px, 100vw`로 수정
- 이력서 PDF 교체(사용자 커밋 `1a15059`): 최신 버전 PDF(1.69MB)로 교체하면서 파일이 `public/장예지_이력서.pdf`(루트)에
  들어가고 기존 `public/resume/` 파일은 삭제됨 → `Resume.tsx`의 다운로드 링크는 `/resume/…`를 가리켜 404가 되는 것을
  확인하고, 링크 대신 파일을 `public/resume/`로 `git mv`해 기존 폴더 구조 유지

**트러블슈팅**:
- 중단어 창고 카드 모바일 레이아웃 깨짐 → 세부 내용 칸이 flex 자식이라 기본 `min-width: auto`로 내용 최소 너비
  (`@supabase/ssr`, `PASSWORD_RECOVERY` 같은 끊을 수 없는 단어 + 18px 고정 글자) 아래로 줄어들지 못해 카드 밖으로
  밀려나고 `overflow-hidden`에 잘림. 360px에서 최대 76px, 640px(가로 배치 시작)에서 최대 164px 초과 측정 →
  `min-w-0`·`wrap-anywhere`·반응형 글자 크기·가로 배치 기준 상향으로 해결, 8개 폭 모두 초과 요소 0개
- 이력서 PDF 다운로드 404 → 위 변경 참고. 수정 후 `/resume/장예지_이력서.pdf`가 200 `application/pdf` 1,692,239 bytes로
  응답하고 `/resume` 페이지 `<a>`의 `href`·`download` 속성이 그대로인 것 확인

**검증**: `bunx eslint`, `bunx tsc --noEmit`, `next build` 통과. Playwright로 320/360/390/430/640/768/1024/1280px에서 카드 4개의
자식 요소가 카드 오른쪽 경계를 넘는지 측정(수정 전 중단어 창고·예매의 정석 초과 → 수정 후 전부 0), 360px 라이트·다크,
768px, 1024px 스크린샷 확인. 320px에서만 페이지 가로 스크롤 3px가 남는데 화면 밖으로 나간 요소가 없어 카드와 무관한
것으로 보고 별도 확인 대상으로 남김

📍 다음: Phase 4️⃣9️⃣ - GitHub CLI 연동 및 이슈 템플릿 추가

## Phase 4️⃣9️⃣: GitHub CLI 연동 및 이슈 템플릿 추가

**요청**: "너가 이슈도 원격 깃허브에 올려줄 수도 있어?" → `brew install gh`, `gh auth login` 진행(브라우저 승인 화면에서
"이 두개 조직에는 접근 안했으면 좋겠는데" → 설명 후 "그냥 토큰없이 진행해") → feature 이슈 템플릿 전달 후 "이런식으로
각각 기능에 맞춰서 이슈 문서를 만들어야 해" → "커밋해줘" → "push하고 마무리 작업해"

**변경**:
- GitHub CLI(`gh` 2.102.0) 설치 및 `ruiwaa` 계정 로그인(브라우저 OAuth, scopes: `repo`·`read:org`·`gist`, `ruiwaa/portfolio`
  ADMIN 권한 확인). 사용자가 원하지 않은 두 조직(`FRONTENDBOOTCAMP-16th`, `kx-entertainment-C`)은 OAuth 승인 화면에서
  개별 해제가 불가능하고, 이를 기술적으로 막으려면 Resource owner를 `ruiwaa`로 한 Fine-grained 토큰이 필요하다고 안내 →
  사용자가 OAuth 방식을 선택. 대신 `gh`는 `ruiwaa/portfolio`에서 요청받은 작업에만 쓰고, 이슈·PR은 올리기 전에 내용을
  확인받기로 함 (저장소 밖 로컬 설정이라 커밋 대상 아님)
- 브랜치: `refactor-project-moblie-ver`가 이미 dev에 머지되어 `origin/dev`에서 `docs-add-issue-templates` 생성
  (`origin/dev`를 upstream으로 추적하지 않도록 `--unset-upstream` 후 첫 push 때 `-u`로 연결)
- `.github/ISSUE_TEMPLATE/`에 기존 `feature_request.md`(Feature, `[FEAT] `, feature)와 같은 형식(📝 작업 개요 +
  🏷️ 작업 유형 체크리스트 4줄)으로 4개 추가 - 저장소에 이미 있는 라벨에 1:1로 맞춤
  - `bug_report.md`: Bug, `[FIX] `, `bug` + 🐞 문제 상황(발생 위치·재현 방법·기대 동작)
  - `refactor.md`: Refactor, `[REFACTOR] `, `refactor` + 🔧 수정 이유
  - `style.md`: Style, `[STYLE] `, `style` + 🎨 적용 범위(페이지·컴포넌트, 반응형, 라이트·다크)
  - `docs.md`: Docs, `[DOCS] `, `docs` + 📌 기준(이슈 #71에서 사용자가 쓴 "기준" 형식)
  - 과거 이슈 제목의 `[Docs]`는 다른 머리말과 맞춰 `[DOCS]`로 통일

**트러블슈팅**: `! gh auth login`을 프롬프트에서 실행하자 120초 제한을 넘겨 백그라운드로 넘어감 → 오류가 아니라 브라우저의
일회용 코드 승인을 기다리는 상태였음(출력 파일에서 코드와 URL 확인). 이후 조직 접근 문제로 승인을 취소할 때 대기 중인 로그인
프로세스를 종료하고, 재시도는 선택 질문 없이 바로 코드를 띄우는 `gh auth login --hostname github.com --git-protocol https
--web`으로 안내해 정상 로그인(exit 0)

**검증**: `gh auth status`로 `ruiwaa` 로그인과 키체인 저장 확인, `gh repo view`로 `ruiwaa/portfolio` 이슈 활성화·ADMIN 권한 확인.
`gh label list`로 템플릿의 `labels` 값(feature·bug·refactor·style·docs)이 모두 저장소에 존재하는 라벨인지 확인. 템플릿 선택
목록은 기본 브랜치(dev) 기준으로 표시되므로 머지 후 GitHub "New issue" 화면에서 노출 확인 필요

📍 다음: (사용자 지정 대기)
