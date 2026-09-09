# 📋 TODO 리스트

---

## 🚀 **Step 1: 준비 (지금)**

### 문서 준비

- [ ] FINAL_EXECUTION_GUIDE.md 읽기 (30분) ⭐ 필독
- [ ] DARK_MODE_IMPLEMENTATION.md 읽기 (10분)
- [ ] DESIGN_SYSTEM_IMPLEMENTATION.md 참고 (필요시)

### 환경 준비

- [ ] 프로젝트에 `docs/` 폴더 생성
- [ ] 상세 버전 4개 파일 배치:
  - [ ] docs/RULES.md
  - [ ] docs/CODING_CONVENTIONS.md
  - [ ] docs/SEMANTIC_HTML_A11Y.md
  - [ ] docs/SECURITY.md
- [ ] `claude.md` (간결 버전) 프로젝트 루트에 배치
- [ ] Git 커밋: `git commit -m "docs: add claude documentation"`

---

## 💻 **Step 2: 개발 (Phase 1~8)**

### Phase 1 (15분): 색상/폰트/다크모드

- [ ] CLAUDE_CODE_PROMPTS.md Phase 1 프롬프트 복사
- [ ] Claude Code 실행
- [ ] 결과 확인:
  - [ ] tailwind.config.ts 생성/수정
  - [ ] styles/typography.css 생성
  - [ ] lib/constants.ts 생성
- [ ] 다크 모드 테스트
- [ ] Git 커밋: `git commit -m "feat: setup colors, fonts, and dark mode"`

### Phase 2-3 (25분): Header + ThemeToggle

- [ ] CLAUDE_CODE_PROMPTS.md Phase 2 프롬프트 실행
  - [ ] Header.tsx 생성
  - [ ] 로고 + 메뉴 + 토글 버튼
- [ ] Phase 3 프롬프트 실행
  - [ ] ThemeToggle.tsx 생성
  - [ ] localStorage 저장
- [ ] 테스트:
  - [ ] 라이트 모드
  - [ ] 다크 모드
  - [ ] 메뉴 Hover/Active 상태
  - [ ] 토글 작동
- [ ] Git 커밋: `git commit -m "feat: add Header and ThemeToggle components"`

### Phase 4 (15분): Card + Badge

- [ ] CLAUDE_CODE_PROMPTS.md Phase 4 프롬프트 실행
  - [ ] Card.tsx 생성
  - [ ] Badge.tsx 생성
- [ ] 테스트:
  - [ ] 라이트 모드 스타일
  - [ ] 다크 모드 스타일
  - [ ] 배지 텍스트 가독성
- [ ] Git 커밋: `git commit -m "feat: add Card and Badge components"`

### Phase 5 (20분): MyRecorder 카드

- [ ] CLAUDE_CODE_PROMPTS.md Phase 5 프롬프트 실행
  - [ ] MyRecorder.tsx 생성
  - [ ] 01-04 카드 배경색 (Mint, Peach, Sky, Purple)
- [ ] 테스트:
  - [ ] 4개 카드 표시
  - [ ] Hover 효과 (배경 + 스케일)
  - [ ] 화살표 애니메이션
  - [ ] 라이트/다크 모드
- [ ] Git 커밋: `git commit -m "feat: add MyRecorder cards with animations"`

### Phase 6 (20분): Timeline + Experience

- [ ] CLAUDE_CODE_PROMPTS.md Phase 6 프롬프트 실행
  - [ ] TimelineItem.tsx 생성
  - [ ] Experience.tsx 생성
  - [ ] 프로젝트 카드 (3개)
- [ ] 테스트:
  - [ ] 타임라인 라인 표시 (2px)
  - [ ] 원형 마커 (12px)
  - [ ] 날짜 | 직책 | 설명 레이아웃
  - [ ] 프로젝트 카드 배경색 (Sky, Peach, Mint)
  - [ ] 라이트/다크 모드
- [ ] Git 커밋: `git commit -m "feat: add Experience timeline and Projects cards"`

### Phase 7 (30분): Posts + 필터

- [ ] CLAUDE_CODE_PROMPTS.md Phase 7 프롬프트 실행
  - [ ] Posts.tsx 생성
  - [ ] 필터 탭 (All, Troubleshooting, Retrospective, Study)
  - [ ] 포스트 카드 (썸네일 + 제목 + 날짜 + 태그)
- [ ] 테스트:
  - [ ] 필터 탭 작동
  - [ ] 첫 번째 탭 Underline
  - [ ] 카드 레이아웃 (썸네일 + 정보)
  - [ ] 태그 표시
  - [ ] 라이트/다크 모드
  - [ ] Supabase 연동 (is_published=true만 표시)
- [ ] Git 커밋: `git commit -m "feat: add Posts page with filtering"`

### Phase 8 (25분): Resume + 그리드 배경

- [ ] CLAUDE_CODE_PROMPTS.md Phase 8 프롬프트 실행
  - [ ] Resume.tsx 생성
  - [ ] 그리드 패턴 배경
  - [ ] 큰 "RESUME" 텍스트
  - [ ] 두 버튼 (이력서 보기 + PDF 다운로드)
- [ ] 테스트:
  - [ ] 그리드 배경 표시 (#3A3939 라인)
  - [ ] "RESUME" 텍스트 크기/위치
  - [ ] 버튼 스타일 (흰 배경 + 테두리)
  - [ ] 하단 라벨 ("SYS.READY // DOC.AVAILABLE")
  - [ ] 라이트/다크 모드
- [ ] Git 커밋: `git commit -m "feat: add Resume page with grid pattern"`

### Phase 9 (10분): Footer 컴포넌트

- [ ] CLAUDE_CODE_PROMPTS.md Phase 9 프롬프트 실행
  - [ ] Footer.tsx 생성
  - [ ] 로고, 저작권 문구, 외부 링크
- [ ] 테스트:
  - [ ] 외부 링크 새 탭 열림
  - [ ] 라이트/다크 모드
- [ ] Git 커밋: `git commit -m "feat: 푸터 컴포넌트 추가"`

### Phase 10 (25분): About Me 페이지

- [ ] CLAUDE_CODE_PROMPTS.md Phase 10 프롬프트 실행
  - [ ] AboutInfo.tsx, AboutVision.tsx 생성
  - [ ] app/(routes)/about/page.tsx 생성
- [ ] 테스트:
  - [ ] 정보 테이블 표시
  - [ ] 기술 배지 표시
  - [ ] 기록의 여정 4단계 타임라인
  - [ ] 2단 레이아웃
  - [ ] 라이트/다크 모드
- [ ] Git 커밋: `git commit -m "feat: About Me 페이지 추가"`

### Phase 11 (15분): Home Hero 섹션

- [ ] CLAUDE_CODE_PROMPTS.md Phase 11 프롬프트 실행
  - [ ] Hero.tsx 생성
- [ ] 테스트:
  - [ ] Hero 텍스트/CTA 버튼 표시
  - [ ] CTA 버튼 이동 확인
  - [ ] 라이트/다크 모드
- [ ] Git 커밋: `git commit -m "feat: 홈 Hero 섹션 추가"`

### Phase 12 (25분): Posts 상세 페이지

- [ ] CLAUDE_CODE_PROMPTS.md Phase 12 프롬프트 실행
  - [ ] app/(routes)/posts/[slug]/page.tsx 생성
  - [ ] PostContent.tsx 생성
- [ ] 테스트:
  - [ ] slug 단건 조회
  - [ ] 404 처리
  - [ ] 본문 렌더링
  - [ ] 메타데이터 동적 설정
  - [ ] 라이트/다크 모드
- [ ] Git 커밋: `git commit -m "feat: Posts 상세 페이지와 콘텐츠 렌더링 추가"`

### Phase 13 (20분): Posts 페이지네이션

- [ ] CLAUDE_CODE_PROMPTS.md Phase 13 프롬프트 실행
  - [ ] "더 많은 글 보기" 버튼 추가
  - [ ] Supabase range() 페이지네이션
- [ ] 테스트:
  - [ ] 버튼 클릭 시 추가 로드
  - [ ] 필터 변경 시 초기화
  - [ ] 마지막 페이지 처리
- [ ] Git 커밋: `git commit -m "feat: Posts 목록 페이지네이션 추가"`

### Phase 14 (30분): Experience Projects 섹션 테스트 콘텐츠

- [x] CLAUDE_CODE_PROMPTS.md Phase 14 프롬프트 실행
  - [x] PROJECTS 섹션 헤더 추가
  - [x] 테스트 프로젝트 카드 3개 추가
- [x] 테스트:
  - [x] 이미지/제목/설명/태그 표시 확인
  - [x] 카드 배경색 순환 확인 (sky/peach/mint accent)
  - [x] 반응형(모바일 1열) 확인
- [ ] Git 커밋: `git commit -m "feat: Experience 페이지에 Projects 테스트 콘텐츠 추가"`

### Phase 15 (25분): Resume 그리드 배경 웨이브 효과

- [x] CLAUDE_CODE_PROMPTS.md Phase 15 프롬프트 실행
  - [x] 그리드 배경 물결/입체 효과 (WebGL 프래그먼트 셰이더 - 3D Wave Terrain)
- [x] 테스트:
  - [x] 매우 느린 속도로 자연스럽게 반복 (시간 계수 0.2, 다중 주파수 사인파 + 방사형 리플)
  - [x] 전경 요소 영향 없음 (canvas는 fixed inset-0 -z-10 pointer-events-none)
  - [x] prefers-reduced-motion 처리 (감지 시 RAF 루프를 돌리지 않고 정적 프레임 1장만 렌더)
  - [x] 성능(스크롤 등) 영향 없음 (requestAnimationFrame + transform 계열 GPU 렌더링,
        스크롤 이벤트에 연결되어 있지 않음)
- [ ] Git 커밋: `git commit -m "feat: Resume 배경에 WebGL 3D 파도 격자 셰이더 적용"`

> 시도 기록: CSS 기반으로 대각선 드리프트 → 좌우 스웨이+하이라이트 → 물결 SVG 라인 →
> perspective 기울임 → 띠 분할 곡면 웨이브까지 다섯 차례 반복했으나 CSS만으로는 "굴곡있는
> 입체 웨이브"를 만들기 어려워 사용자가 효과를 제거 요청. 이후 사용자가 WebGL 셰이더
> 방식을 명시적으로 요청해 최종적으로 이 방식으로 재구현. 이후 사용자 피드백에 따라
> ① 화이트+연회색 격자로 단순화, ② 그리드가 Footer까지 비치던 버그 수정(fixed → absolute로
> Resume section에 한정), ③ 속도를 0.15 → 0.6 → 0.9로 조정, ④ main 영역을 다 못 채우던
> 레이아웃 버그 수정(main을 flex 컨테이너로, section을 flex-1로), ⑤ 마우스 호버 시 그리드가
> 움푹 파이는 인터랙션 추가 및 반경 축소(0.35 → 0.16)까지 추가로 반복.

### 추가 작업 (Phase 목록 외): 커스텀 404 페이지 + MY RECORDER 다크모드 색상 통일

- [x] `app/not-found.tsx` 신규 작성 - Resume의 WebGL 그리드 배경(`ResumeWaveGrid`)을 그대로
      재사용, SYS.WARN 상태 배지 + "404" + 서브텍스트 + "홈으로 돌아가기"/"이전 기록으로
      복귀" 버튼 2개 구성
  - [x] `app/_components/common/HistoryBackButton.tsx` 신규 - `useRouter().back()`을
        쓰는 클라이언트 컴포넌트로 분리(정적 링크로는 브라우저 히스토리 뒤로가기를
        구현할 수 없어서)
  - [x] "404" 숫자 자간 조정 (`tracking-widest` → `tracking-tighter`)
- [x] `app/_components/sections/MyRecorder.tsx` - MY RECORDER 카드 4개(mint/peach/sky/
      purple) 다크모드 배경을 About Intro 배경 도형과 동일한 `dark:bg-{accent}/45`로 통일.
      AboutIntro에는 purple 색상이 없어 나머지 3색과 균형을 맞춰 동일하게 45% 적용.
      원형 화살표 배지 색상도 어두워진 카드 배경에 묻히지 않도록
      `dark:bg-dark-surface/dark:text-dark-text` → `dark:bg-dark-text/dark:text-dark-surface`로 반전
- [x] 테스트: 헤드리스 Chrome + CDP로 실제 마우스 이동 이벤트를 캔버스에 보내 굴곡/파임
      효과 스크린샷 확보, `curl`로 404 상태 코드 확인, 다크모드 스크린샷으로 카드/404
      페이지 색상 확인
- [x] `bunx tsc --noEmit`, `bun run lint`, `bun run build` 매 변경마다 통과 확인
- [ ] Git 커밋: 아직 미완료 (여러 건 - 아래 PR 문서 참고)

---

## 🎨 **Step 3: 라이트 모드 추가 (30분)**

### 라이트 모드 스타일 적용

- [ ] 각 컴포넌트에 라이트 모드 클래스 추가
  - [ ] `light:` 프리픽스 사용
  - [ ] DESIGN_SYSTEM_IMPLEMENTATION.md 색상값 적용:
    - [ ] 배경: #FFFFFF
    - [ ] 텍스트: #1A1A1A
    - [ ] 테두리: #E0E0E0
    - [ ] 악센트: #0066CC

### 라이트 모드 테스트

- [ ] 홈 페이지 (라이트)
- [ ] About Me (라이트)
- [ ] Experience & Projects (라이트)
- [ ] Posts (라이트)
- [ ] Resume (라이트)

### 라이트/다크 모드 전환 테스트

- [ ] 토글 버튼으로 전환 가능
- [ ] 새로고침 후 기억 (localStorage)
- [ ] 모든 페이지에서 전환 작동

### Git 커밋

- [ ] `git commit -m "feat: add light mode to all components"`

---

## ✅ **Step 4: 검증 (30분)**

### 접근성 검증

- [ ] 모든 텍스트 색상 대비:
  - [ ] 라이트: #1A1A1A on #FFFFFF (21:1) ✅
  - [ ] 다크: #FFFFFF on #141313 (19.4:1) ✅
  - [ ] 파스텔 배경: 모두 4.5:1 이상 ✅
- [ ] Tab 네비게이션:
  - [ ] 모든 버튼/링크 접근 가능
  - [ ] 포커스 인디케이터 명확
  - [ ] 순서 논리적
- [ ] 스크린리더 (NVDA/JAWS):
  - [ ] 시멘틱 HTML 구조 명확
  - [ ] aria-label 존재
  - [ ] 페이지 구조 이해 가능

### 성능 검증

- [ ] Lighthouse (라이트 모드):
  - [ ] Performance: 90+
  - [ ] Accessibility: 95+
  - [ ] Best Practices: 90+
  - [ ] SEO: 90+
- [ ] Lighthouse (다크 모드):
  - [ ] 동일 점수 확인
- [ ] 번들 사이즈:
  - [ ] 불필요한 코드 없음
  - [ ] 동적 import 적용

### 기능 검증

- [ ] 라이트 모드:
  - [ ] 모든 페이지 렌더링
  - [ ] 모든 인터랙션 작동
  - [ ] 모든 색상 정확
- [ ] 다크 모드:
  - [ ] 모든 페이지 렌더링
  - [ ] 모든 인터랙션 작동
  - [ ] 모든 색상 정확 (Stitch 기반)
- [ ] 모바일:
  - [ ] 반응형 레이아웃 (라이트)
  - [ ] 반응형 레이아웃 (다크)
  - [ ] 터치 인터랙션

### 코드 검증

- [ ] TypeScript:
  - [ ] `bun run type-check` 통과
  - [ ] 타입 에러 0개
- [ ] ESLint:
  - [ ] `bun run lint` 통과
  - [ ] 경고 없음
- [ ] Prettier:
  - [ ] `bun run format` 완료
  - [ ] 코드 스타일 통일

---

## 🔐 **Step 5: 배포 전 (필수)**

### 보안 체크

- [ ] docs/SECURITY.md 체크리스트 완료:
  - [ ] .env.local이 .gitignore에 포함
  - [ ] 환경 변수 파일 커밋 안 됨
  - [ ] Supabase ANON_KEY만 클라이언트 사용
  - [ ] 민감 정보 로그 안 남음
  - [ ] XSS/CSRF 방지 확인

### 코드 리뷰

- [ ] docs/CODING_CONVENTIONS.md 준수:
  - [ ] 파일명 규칙
  - [ ] 컴포넌트 네이밍
  - [ ] 함수/훅 네이밍
  - [ ] 타입 정의
- [ ] docs/SEMANTIC_HTML_A11Y.md 준수:
  - [ ] 시멘틱 HTML
  - [ ] aria-\* 속성
  - [ ] 포커스 관리
  - [ ] 대비도

### 최종 빌드

- [ ] `bun run type-check` ✅
- [ ] `bun run lint` ✅
- [ ] `bun run build` ✅
- [ ] 빌드 폴더 (.next) 생성 확인

### Git 최종 정리

- [ ] 모든 커밋 완료
- [ ] 커밋 메시지 명확함
- [ ] `git log` 확인

---

## 🚀 **Step 6: 배포**

### Vercel 배포

- [ ] GitHub 저장소 연결
- [ ] Vercel 프로젝트 생성
- [ ] 환경 변수 설정:
  - [ ] NEXT_PUBLIC_SUPABASE_URL
  - [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] 자동 배포 확인

### 배포 후 검증

- [ ] 라이트 모드 작동
- [ ] 다크 모드 작동
- [ ] 모든 페이지 로드
- [ ] 포스트 조회 (Supabase)
- [ ] Lighthouse 90+
- [ ] 모바일 반응형

### 도메인 (선택)

- [ ] 도메인 구매
- [ ] Vercel 도메인 설정
- [ ] SSL 인증서 확인

---

## 📊 **체크리스트 요약**

```
Step 1 (문서 + 환경): 1시간
Step 2 (Phase 1-15): 약 5시간 35분
Step 3 (라이트 모드): 30분
Step 4 (검증): 30분
Step 5 (배포 전 체크): 30분
Step 6 (배포): 30분

총 소요 시간: 약 8-9시간
```

---

## 🎯 **우선순위**

### 🔴 필수 (반드시 해야함)

1. Step 1: 준비
2. Step 2: Phase 1-15 개발
3. Step 4: 검증 (접근성 + 성능)
4. Step 5: 배포 전 체크

### 🟡 권장 (권장)

1. Step 3: 라이트 모드
2. 추가 테스트 (모바일 등)

### 🟢 선택 (나중에)

1. Step 6: 배포
2. 도메인 구매
3. 추가 기능 (댓글, 분석 등)

---

## 💡 **진행 상황 체크**

### 현재 상태

```
✅ 디자인 시스템 완성
✅ 문서 17개 완성
✅ 다크 모드 설계 완료
✅ Claude Code 프롬프트 준비 완료
```

### 다음 할 일

```
🚀 FINAL_EXECUTION_GUIDE.md 읽기
🚀 Phase 1 시작
```

---
