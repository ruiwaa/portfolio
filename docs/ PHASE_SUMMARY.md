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

## 🎨 라이트 모드 추가

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
