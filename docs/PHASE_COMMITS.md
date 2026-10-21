# 📝 Phase별 커밋 메시지 가이드

**컨벤션**: 사용자 제공 테이블 기반  
**언어**: 한국어  
**형식**: `타입: 한글 메시지`

---

## Phase 1️⃣: 색상/폰트/다크모드 설정

### ✅ 커밋 전 체크리스트

```
- [ ] tailwind.config.ts 생성/수정
- [ ] styles/typography.css 생성
- [ ] lib/constants.ts 생성
- [ ] 다크 모드 테스트 (라이트도 테스트)
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`  
**메시지**: `feat: 색상, 폰트, 다크모드 시스템 설정`

```bash
git add tailwind.config.ts styles/typography.css lib/constants.ts
git commit -m "feat: 색상, 폰트, 다크모드 시스템 설정"
git push
```

---

## Phase 2️⃣: Header 네비게이션

### ✅ 커밋 전 체크리스트

```
- [ ] Header.tsx 생성
- [ ] YEJI. 로고 표시
- [ ] 메뉴 항목 (About Me, Experience & Projects, Posts, Resume) 표시
- [ ] 라이트 모드 테스트
- [ ] 다크 모드 테스트
- [ ] Hover 상태 확인 (#0066CC 또는 흰색)
- [ ] Active 상태 (Underline) 확인
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`  
**메시지**: `feat: 헤더 네비게이션 컴포넌트 추가`

```bash
git add app/_components/common/Header.tsx
git commit -m "feat: 헤더 네비게이션 컴포넌트 추가"
git push
```

---

## Phase 3️⃣: 테마 토글 버튼

### ✅ 커밋 전 체크리스트

```
- [ ] ThemeToggle.tsx 생성
- [ ] 🌙 아이콘 (라이트 모드) 표시
- [ ] ☀️ 아이콘 (다크 모드) 표시
- [ ] 클릭 시 테마 전환 확인
- [ ] localStorage 저장 확인
- [ ] 새로고침 후 테마 유지 확인
- [ ] 300ms Fade 애니메이션 확인
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`  
**메시지**: `feat: 테마 토글 버튼 추가`

```bash
git add app/_components/common/ThemeToggle.tsx
git commit -m "feat: 테마 토글 버튼 추가"
git push
```

---

## Phase 4️⃣: Card와 Badge 컴포넌트

### ✅ 커밋 전 체크리스트

```
- [ ] Card.tsx 생성
- [ ] Badge.tsx 생성
- [ ] 라이트 모드 스타일 확인
- [ ] 다크 모드 스타일 확인
- [ ] 배지 텍스트 가독성 확인 (JetBrains Mono)
- [ ] 테두리 색상 정확함 (라이트/다크)
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`  
**메시지**: `feat: Card, Badge 기본 컴포넌트 추가`

```bash
git add app/_components/ui/Card.tsx app/_components/ui/Badge.tsx
git commit -m "feat: Card, Badge 기본 컴포넌트 추가"
git push
```

---

## Phase 5️⃣: MY RECORDER 카드 섹션

### ✅ 커밋 전 체크리스트

```
- [ ] MyRecorder.tsx 생성
- [ ] 4개 카드 표시 (01-04)
- [ ] 배경색 정확함:
  - [ ] 01 About Me: Mint #E8F5E9
  - [ ] 02 Experience: Peach #FFE8D6
  - [ ] 03 Posts: Sky #E3F2FD
  - [ ] 04 Resume: Purple #F3E5F5
- [ ] Hover 효과:
  - [ ] 배경색 심화 확인
  - [ ] 스케일 1.02 확인
- [ ] 화살표 애니메이션 확인 (슈르르)
- [ ] 라이트/다크 모드 양쪽 테스트
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`  
**메시지**: `feat: MY RECORDER 카드 섹션 추가`

```bash
git add app/_components/sections/MyRecorder.tsx
git commit -m "feat: MY RECORDER 카드 섹션 추가"
git push
```

---

## Phase 6️⃣: 경력 타임라인 + 프로젝트 카드

### ✅ 커밋 전 체크리스트

```
- [ ] TimelineItem.tsx 생성
- [ ] Experience.tsx 생성
- [ ] 타임라인:
  - [ ] 2px 수직 선 표시
  - [ ] 원형 마커 (12px) 표시
  - [ ] 날짜 | 직책 | 설명 레이아웃 정렬
  - [ ] 선 색상 정확함 (라이트: #E0E0E0, 다크: #3A3939)
- [ ] 프로젝트 카드 (3개):
  - [ ] 배경색 정확함 (Sky, Peach, Mint)
  - [ ] 썸네일, 제목, 설명 표시
  - [ ] 기술 배지 표시
- [ ] 라이트/다크 모드 양쪽 테스트
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`  
**메시지**: `feat: 경력 타임라인과 프로젝트 카드 추가`

```bash
git add app/_components/ui/TimelineItem.tsx app/_components/sections/Experience.tsx
git commit -m "feat: 경력 타임라인과 프로젝트 카드 추가"
git push
```

---

## Phase 7️⃣: Posts 페이지 + 필터

### ✅ 커밋 전 체크리스트

```
- [ ] Posts.tsx 생성
- [ ] 필터 탭 표시:
  - [ ] All, Troubleshooting, Retrospective, Study
  - [ ] 첫 번째 탭 Underline 확인
  - [ ] 탭 클릭 시 필터 작동
- [ ] 포스트 카드:
  - [ ] 썸네일 (좌측) 표시
  - [ ] 제목 (우측 상단) 표시
  - [ ] 날짜 표시
  - [ ] 태그 (우측 하단) 표시
  - [ ] 다크 배경에 테두리 카드 스타일
- [ ] 라이트/다크 모드 양쪽 테스트
- [ ] Supabase 연동 (is_published=true만 표시) 확인
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`  
**메시지**: `feat: Posts 페이지와 카테고리 필터 추가`

```bash
git add app/_components/sections/Posts.tsx app/\(routes\)/posts/page.tsx
git commit -m "feat: Posts 페이지와 카테고리 필터 추가"
git push
```

---

## Phase 8️⃣: Resume 페이지

### ✅ 커밋 전 체크리스트

```
- [ ] Resume.tsx 생성
- [ ] 그리드 패턴 배경:
  - [ ] 세밀한 라인 표시
  - [ ] 색상 정확함 (다크: #3A3939 라인)
- [ ] "RESUME" 텍스트:
  - [ ] 크기 (매우 큼)
  - [ ] 위치 (중앙)
  - [ ] 폰트 (Syne Bold)
- [ ] 버튼:
  - [ ] "이력서 보기" (흰 배경, 검은 텍스트)
  - [ ] "PDF 다운로드" (흰 테두리, 투명 배경)
  - [ ] 호버 효과 확인
- [ ] 하단 라벨:
  - [ ] "SYS.READY // DOC.AVAILABLE" 표시
  - [ ] JetBrains Mono 폰트
  - [ ] 위치 고정
- [ ] 라이트/다크 모드 양쪽 테스트
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`  
**메시지**: `feat: Resume 페이지와 그리드 배경 추가`

```bash
git add app/_components/sections/Resume.tsx app/\(routes\)/resume/page.tsx
git commit -m "feat: Resume 페이지와 그리드 배경 추가"
git push
```

---

## 🎨 라이트 모드 추가

### ✅ 커밋 전 체크리스트

```
- [ ] 모든 컴포넌트에 라이트 모드 클래스 추가
  - [ ] light: 프리픽스 사용
  - [ ] 색상값:
    - [ ] 배경: #FFFFFF
    - [ ] 텍스트: #1A1A1A
    - [ ] 테두리: #E0E0E0
    - [ ] 악센트: #0066CC
- [ ] 라이트 모드 전체 테스트
- [ ] 라이트/다크 토글 테스트
- [ ] 새로고침 후 테마 유지 확인
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `style`  
**메시지**: `style: 모든 컴포넌트에 라이트 모드 스타일 추가`

```bash
git add app/_components/
git commit -m "style: 모든 컴포넌트에 라이트 모드 스타일 추가"
git push
```

---

## ✅ 최종 검증

### ✅ 커밋 전 체크리스트

```
- [ ] Lighthouse (라이트): 90+ (모든 항목)
- [ ] Lighthouse (다크): 90+ (모든 항목)
- [ ] 접근성 검증:
  - [ ] Tab 네비게이션 모두 가능
  - [ ] 포커스 인디케이터 명확
  - [ ] 색상 대비 (4.5:1 이상)
- [ ] 코드 검증:
  - [ ] bun run type-check ✅
  - [ ] bun run lint ✅
  - [ ] bun run format ✅
- [ ] 최종 빌드:
  - [ ] bun run build ✅
  - [ ] .next 폴더 생성 확인
- [ ] 모바일 반응형 (라이트/다크)
```

### 📝 커밋 메시지

**타입**: `perf`  
**메시지**: `perf: 최종 검증 및 성능 최적화 완료`

```bash
git add .
git commit -m "perf: 최종 검증 및 성능 최적화 완료"
git push
```

---

## 📋 Quick Reference

| Phase  | 타입  | 메시지                                          | 파일            |
| ------ | ----- | ----------------------------------------------- | --------------- |
| 1      | feat  | 색상, 폰트, 다크모드 시스템 설정                | config, css     |
| 2      | feat  | 헤더 네비게이션 컴포넌트 추가                   | Header.tsx      |
| 3      | feat  | 테마 토글 버튼 추가                             | ThemeToggle.tsx |
| 4      | feat  | Card, Badge 기본 컴포넌트 추가                  | ui/\*.tsx       |
| 5      | feat  | MY RECORDER 카드 섹션 추가                      | MyRecorder.tsx  |
| 6      | feat  | 경력 타임라인과 프로젝트 카드 추가              | Experience.tsx  |
| 7      | feat  | Posts 페이지와 카테고리 필터 추가               | Posts.tsx       |
| 8      | feat  | Resume 페이지와 그리드 배경 추가                | Resume.tsx      |
| 9      | feat  | 푸터 컴포넌트 추가                              | Footer.tsx      |
| 10     | feat  | About Me 페이지 추가                            | About\*.tsx     |
| 11     | feat  | 홈 Hero 섹션 추가                               | Hero.tsx        |
| 12     | feat  | Posts 상세 페이지와 콘텐츠 렌더링 추가          | [slug]/page.tsx |
| 13     | feat  | Posts 목록 페이지네이션 추가                    | Posts.tsx       |
| 14     | feat  | Experience 페이지에 Projects 테스트 콘텐츠 추가 | Experience.tsx  |
| 15     | feat  | Resume 그리드 배경 웨이브 효과 추가             | Resume.tsx      |
| 라이트 | style | 모든 컴포넌트에 라이트 모드 스타일 추가         | \*.tsx          |
| 최종   | perf  | 최종 검증 및 성능 최적화 완료                   | .               |

---

## Phase 9️⃣: Footer 컴포넌트

### ✅ 커밋 전 체크리스트

```
- [ ] Footer.tsx 생성
- [ ] 로고, 저작권 문구, 외부 링크 표시
- [ ] 외부 링크 새 탭에서 열림 확인 (target="_blank", rel="noopener noreferrer")
- [ ] 라이트/다크 모드 테스트
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`
**메시지**: `feat: 푸터 컴포넌트 추가`

```bash
git add app/_components/common/Footer.tsx
git commit -m "feat: 푸터 컴포넌트 추가"
git push
```

---

## Phase 🔟: About Me 페이지

### ✅ 커밋 전 체크리스트

```
- [ ] AboutInfo.tsx, AboutVision.tsx 생성
- [ ] app/(routes)/about/page.tsx 생성
- [ ] 정보 테이블(이름/생년월일/이메일/위치) 표시
- [ ] 기술 배지 목록 표시
- [ ] "기록의 여정" 4단계 타임라인 표시 (RECORD/REFLECT/LEARN/IMPROVE)
- [ ] 2단 레이아웃 확인
- [ ] 라이트/다크 모드 테스트
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`
**메시지**: `feat: About Me 페이지 추가`

```bash
git add app/_components/sections/AboutInfo.tsx app/_components/sections/AboutVision.tsx app/\(routes\)/about/page.tsx
git commit -m "feat: About Me 페이지 추가"
git push
```

---

## Phase 1️⃣1️⃣: Home Hero 섹션

### ✅ 커밋 전 체크리스트

```
- [ ] Hero.tsx 생성
- [ ] 메인 카피, 서브 텍스트, CTA 버튼 표시
- [ ] CTA 버튼 클릭 시 Experience 페이지 이동 확인
- [ ] Hero + MyRecorder 2단 레이아웃 확인 (app/page.tsx)
- [ ] 라이트/다크 모드 테스트
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`
**메시지**: `feat: 홈 Hero 섹션 추가`

```bash
git add app/_components/sections/Hero.tsx app/page.tsx
git commit -m "feat: 홈 Hero 섹션 추가"
git push
```

---

## Phase 1️⃣2️⃣: Posts 상세 페이지

### ✅ 커밋 전 체크리스트

```
- [ ] app/(routes)/posts/[slug]/page.tsx 생성
- [ ] PostContent.tsx 생성
- [ ] Supabase slug 단건 조회 (is_published=true 조건)
- [ ] 404 처리 (notFound()) 확인
- [ ] generateMetadata 동적 설정 확인
- [ ] 썸네일, 카테고리, 발행일, 본문 표시
- [ ] 라이트/다크 모드 테스트
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`
**메시지**: `feat: Posts 상세 페이지와 콘텐츠 렌더링 추가`

```bash
git add app/\(routes\)/posts/\[slug\]/page.tsx app/_components/sections/PostContent.tsx
git commit -m "feat: Posts 상세 페이지와 콘텐츠 렌더링 추가"
git push
```

---

## Phase 1️⃣3️⃣: Posts 페이지네이션

### ✅ 커밋 전 체크리스트

```
- [ ] "더 많은 글 보기" 버튼 표시
- [ ] 클릭 시 다음 페이지 로드 확인
- [ ] 더 불러올 글 없을 때 버튼 숨김/비활성화 확인
- [ ] 필터 변경 시 페이지네이션 초기화 확인
- [ ] 라이트/다크 모드 테스트
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`
**메시지**: `feat: Posts 목록 페이지네이션 추가`

```bash
git add app/_components/sections/Posts.tsx
git commit -m "feat: Posts 목록 페이지네이션 추가"
git push
```

---

## Phase 1️⃣4️⃣: Experience Projects 섹션 테스트 콘텐츠

### ✅ 커밋 전 체크리스트

```
- [ ] PROJECTS 섹션 헤더 표시 (EXPERIENCE와 구분선으로 분리)
- [ ] 프로젝트 카드 3개 표시 (이미지/제목/설명/태그)
- [ ] 카드 배경색 순환 (Sky, Peach, Mint) 확인
- [ ] 반응형 그리드 (모바일 1열) 확인
- [ ] "TODO: 실제 데이터로 교체" 주석 존재 확인
- [ ] 라이트/다크 모드 테스트
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`
**메시지**: `feat: Experience 페이지에 Projects 테스트 콘텐츠 추가`

```bash
git add app/_components/sections/Experience.tsx
git commit -m "feat: Experience 페이지에 Projects 테스트 콘텐츠 추가"
git push
```

---

## Phase 1️⃣5️⃣: Resume 그리드 배경 웨이브 효과

### ✅ 커밋 전 체크리스트

```
- [ ] 그리드 배경 물결 효과 확인 (매우 느린 속도)
- [ ] 무한 반복, 끊김 없는지 확인
- [ ] RESUME 텍스트/버튼 등 전경 요소 고정 확인
- [ ] prefers-reduced-motion 시 정적 배경 확인
- [ ] 스크롤/인터랙션 성능 저하 없음 확인
- [ ] 라이트/다크 모드 테스트
- [ ] 타입 체크: bun run type-check
```

### 📝 커밋 메시지

**타입**: `feat`
**메시지**: `feat: Resume 그리드 배경 웨이브 효과 추가`

```bash
git add app/_components/sections/Resume.tsx
git commit -m "feat: Resume 그리드 배경 웨이브 효과 추가"
git push
```

---

## Phase 2️⃣9️⃣: Resume 페이지 버튼을 피그마/노션 링크로 교체

### ✅ 커밋 전 체크리스트

```
- [ ] "이력서 보기" + "PDF 다운로드" 버튼 제거
- [ ] "피그마로 보기"(채워진 버튼) + "노션으로 보기"(아웃라인 버튼) 추가
- [ ] SiFigma/SiNotion 로고가 버튼 텍스트 왼쪽에 가로로 배치됨
- [ ] 로고 색상이 버튼 텍스트 색(currentColor)을 그대로 따라감 확인
- [ ] RESUME_FIGMA_URL/RESUME_NOTION_URL 플레이스홀더 확인 (실제 링크는 추후 교체)
- [ ] 라이트/다크 모드 테스트
- [ ] 타입 체크: bun run type-check
- [ ] 린트: bun run lint
```

### 📝 커밋 메시지

**타입**: `feat`
**메시지**: `feat: Resume 버튼을 피그마/노션 링크로 교체`

```bash
git add app/_components/sections/Resume.tsx docs/DOMAIN.md
git commit -m "feat: Resume 버튼을 피그마/노션 링크로 교체"
git push
```

---

## Phase 3️⃣0️⃣: Badge 컴포넌트 모바일 대응 compact 사이즈 추가

### ✅ 커밋 전 체크리스트

```
- [ ] Badge에 size?: "default" | "compact" prop 추가
- [ ] compact가 모바일에서 더 작게, sm: 이상에서 기존 크기로 복귀하는지 확인
- [ ] size 생략 시 기존과 동일(default)한지 확인 - Projects/Posts/포스트 상세의
      기존 Badge 사용처가 그대로인지 확인
- [ ] 타입 체크: bun run type-check
- [ ] 린트: bun run lint
```

### 📝 커밋 메시지

**타입**: `feat`
**메시지**: `feat: Badge 컴포넌트에 모바일 대응 compact 사이즈 옵션 추가`

```bash
git add app/_components/ui/Badge.tsx
git commit -m "feat: Badge 컴포넌트에 모바일 대응 compact 사이즈 옵션 추가"
git push
```

---

## Phase 3️⃣1️⃣: Experience/Projects·About 섹션 공유 컴포넌트로 분리

### ✅ 커밋 전 체크리스트

```
- [ ] ExperienceProjects.tsx, AboutSections.tsx 신규 생성
- [ ] Experience/Projects/AboutVision에 headingClassName prop 추가 (기본값 = 기존 스타일)
- [ ] /experience, /about 페이지가 새 공유 컴포넌트를 쓰도록 정리
- [ ] /about 페이지에 AboutIntro 복원 확인
- [ ] 홈페이지 About Me의 불필요한 <section> 래퍼 제거 확인
- [ ] /, /about, /experience 모두 여전히 ○ Static 확인
- [ ] 타입 체크: bun run type-check
- [ ] 린트: bun run lint
```

### 📝 커밋 메시지

**타입**: `refactor`
**메시지**: `refactor: Experience/Projects, About 섹션을 홈·about·experience 페이지가 공유하는 컴포넌트로 분리`

```bash
git add app/_components/sections/Experience.tsx app/_components/sections/Projects.tsx \
  app/_components/sections/AboutVision.tsx app/_components/sections/AboutIntro.tsx \
  app/_components/sections/ExperienceProjects.tsx app/_components/sections/AboutSections.tsx \
  app/\(routes\)/experience/page.tsx app/\(routes\)/about/page.tsx
git commit -m "refactor: Experience/Projects, About 섹션을 홈·about·experience 페이지가 공유하는 컴포넌트로 분리"
git push
```

---

## Phase 3️⃣2️⃣: About 기술 스택 섹션 정리 및 호버 카드 오버플로우 수정

### ✅ 커밋 전 체크리스트

```
- [ ] "학습" 섹션(EDUCATION 플레이스홀더) 완전 제거 확인
- [ ] 기술 스택 배지 호버 카드가 페이지 하단(Footer)에 가려지지 않는지 확인
- [ ] 기술 스택 배지에 size="compact" 적용, 모바일에서 flex-wrap 확인
- [ ] 안내 문구("마우스를 올리면...") 표시 확인
- [ ] 타입 체크: bun run type-check
- [ ] 린트: bun run lint
```

### 📝 커밋 메시지

**타입**: `fix`
**메시지**: `fix: About 기술 스택 섹션 정리 및 호버 상세 설명 오버플로우 수정`

```bash
git add app/_components/sections/AboutInfo.tsx
git commit -m "fix: About 기술 스택 섹션 정리 및 호버 상세 설명 오버플로우 수정"
git push
```

---

## Phase 3️⃣3️⃣: 홈페이지 MY RECORDER 카드 제거 및 Hero 중심 레이아웃 개편

### ✅ 커밋 전 체크리스트

```
- [ ] MyRecorder.tsx 삭제 및 홈페이지에서 참조 제거 확인
- [ ] 홈 레이아웃 순서: Hero → About Me → Experience & Projects → StackBar 확인
- [ ] StackBar가 Footer 바로 위에 위치하는지 확인
- [ ] Hero 너비(max-w-3xl)와 책 이모지 위치(self-end) 확인
- [ ] 헤드라인 tracking-wide 자간 확인
- [ ] 라이트/다크 모드 테스트
- [ ] 타입 체크: bun run type-check
- [ ] 린트: bun run lint
```

### 📝 커밋 메시지

**타입**: `feat`
**메시지**: `feat: 홈페이지 MY RECORDER 카드 제거하고 Hero 중심 스크롤 레이아웃으로 개편`

```bash
git add app/page.tsx app/_components/sections/Hero.tsx app/_components/sections/MyRecorder.tsx
git commit -m "feat: 홈페이지 MY RECORDER 카드 제거하고 Hero 중심 스크롤 레이아웃으로 개편"
git push
```

---

## Phase 3️⃣9️⃣: 기술 스택 상세 내용 실제화 및 Resume 페이지 링크·PDF 연동

### ✅ 커밋 전 체크리스트

```
- [ ] AboutInfo.tsx의 SKILLS level이 프로젝트명 없이 "~할 수 있습니다" 형태로 작성됐는지 확인
- [ ] HoverDisclosure.tsx 패널 패딩(px-10 py-8)이 적용됐는지 확인
- [ ] Resume.tsx의 피그마 링크가 실제 프로토타입 URL이고 새 탭(target="_blank")으로 열리는지 확인
- [ ] PDF 다운로드 버튼 클릭 시 실제 파일이 다운로드되는지 확인 (public/resume/ 경로)
- [ ] 라이트/다크 모드에서 기술 스택 hover 패널 확인
- [ ] 타입 체크: bun run type-check
- [ ] 린트: bun run lint
```

### 📝 커밋 메시지

이번 Phase는 사용자 피드백에 따라 여러 차례에 걸쳐 아래 순서로 커밋했습니다.

1. `feat`: `기술 스택 상세 문구를 실제 프로젝트 사용 내용으로 교체`
2. `style`: `기술 스택 상세 문구에서 프로젝트명 제거, 도달 수준으로 표현`
3. `style`: `기술 스택 문구를 "~할 수 있는 수준입니다"에서 "~할 수 있습니다"로 수정`
4. `style`: `기술 스택 호버 패널 패딩 확대`
5. `feat`: `Resume 페이지에 피그마 링크 연결 및 PDF 다운로드 버튼 추가`
6. `style`: `피그마/노션 링크를 새 탭에서 열리도록 수정`
7. `feat`: `이력서 PDF 다운로드 버튼 실제 파일로 연결`

```bash
git add app/_components/sections/AboutInfo.tsx
git commit -m "feat: 기술 스택 상세 문구를 실제 프로젝트 사용 내용으로 교체"

git add app/_components/sections/AboutInfo.tsx
git commit -m "style: 기술 스택 상세 문구에서 프로젝트명 제거, 도달 수준으로 표현"

git add app/_components/sections/AboutInfo.tsx
git commit -m 'style: 기술 스택 문구를 "~할 수 있는 수준입니다"에서 "~할 수 있습니다"로 수정'

git add app/_components/ui/HoverDisclosure.tsx
git commit -m "style: 기술 스택 호버 패널 패딩 확대"

git add app/_components/sections/Resume.tsx
git commit -m "feat: Resume 페이지에 피그마 링크 연결 및 PDF 다운로드 버튼 추가"

git add app/_components/sections/Resume.tsx
git commit -m "style: 피그마/노션 링크를 새 탭에서 열리도록 수정"

git add app/_components/sections/Resume.tsx "public/resume/장예지 개발자이력서.pdf"
git commit -m "feat: 이력서 PDF 다운로드 버튼 실제 파일로 연결"

git push
```

---

## Phase 4️⃣1️⃣: Posts 시스템 완성 - Velog 등록, 카테고리/프로젝트 아코디언, 프로젝트 상세 페이지 통합 제거

### ✅ 커밋 전 체크리스트

```
- [ ] velogPosts 배열의 실제 Velog(@ruiwaa) 글 URL·날짜가 정확한지 확인
- [ ] lib/posts.ts, lib/markdown.ts가 posts/<slug>/*.md를 파일명 무관하게 찾아 읽는지 확인
- [ ] PostsList.tsx 카테고리 탭 클릭 시 ?tab= 쿼리스트링이 갱신/제거되는지, 새로고침해도 유지되는지 확인
- [ ] 트러블슈팅 탭에서 project별 아코디언이 호버로 열리고 클릭으로 토글되는지 확인
- [ ] /projects/[id] 라우트가 완전히 삭제되어 404가 뜨는지 확인
- [ ] Experience 섹션 각 프로젝트 카드의 포스트 링크가 의도한 목적지로 연결되는지 확인
- [ ] frontmatter 필수 필드가 빠진 글이 있어도 Posts 페이지가 크래시하지 않고 목록에서만 제외되는지 확인
- [ ] readingTime 필드가 frontmatter/타입/화면 어디에도 남아있지 않은지 확인
- [ ] 타입 체크: bunx tsc --noEmit
- [ ] 린트: bunx eslint .
- [ ] 프로덕션 빌드: next build
```

### 📝 커밋 메시지

이번 Phase는 사용자 피드백에 따라 여러 차례에 걸쳐 아래 순서로 커밋했습니다.

1. `feat`: `포트폴리오 자체 case-study 추가 (Supabase→Markdown 마이그레이션 회고)`
2. `style`: `포트폴리오 case-study 마크다운 포맷팅 정리`
3. `feat`: `Velog에 발행된 실제 글 20개를 Posts 페이지에 등록`
4. `feat`: `포트폴리오 직접 작성 글을 위한 로컬 Markdown Posts 시스템 추가`
5. `docs`: `CONTENT_MANAGEMENT.md에 로컬 Posts 구조 및 Velog 등록 반영`
6. `fix`: `학습노트 태그 Velog 글 제거 및 마이그레이션 글 내용 최신화`
7. `feat`: `Posts 섹션에 카테고리 탭 필터(트러블슈팅/회고/기획/개발) 추가`
8. `fix`: `포트폴리오 CMS 마이그레이션 글 카테고리를 회고에서 트러블슈팅으로 변경`
9. `feat`: `트러블슈팅 탭을 프로젝트별 아코디언으로 재구성`
10. `fix`: `카드에서 예상 읽기 시간 표시 제거, 모달창 글 프로젝트 태깅 수정`
11. `feat`: `프로젝트/포스트 마크다운 파일명을 고정에서 자유롭게 변경`
12. `feat`: `Posts 카테고리 탭 선택 상태를 URL searchParams와 동기화`
13. `fix`: `중단어 창고 프로젝트의 포스트 링크를 트러블슈팅 탭으로 연결`
14. `refactor`: `프로젝트 상세 페이지 시스템 제거하고 posts로 완전히 통합`
15. `fix`: `예매의 정석 프로젝트의 포스트 링크를 리팩토링 기록 글로 직접 연결`
16. `fix`: `frontmatter 없는 새 글 때문에 발생한 Posts 페이지 크래시 수정`
17. `feat`: `프록시 인증 트러블슈팅 글 추가, readingTime 필드 제거`
18. `fix`: `final-project 글들의 실제 프로젝트명(행쇼마켓) 반영`
19. `docs`: `남은 프로젝트 링크/카테고리 정보 반영`

```bash
git add projects/portfolio/case-study.md app/globals.css
git commit -m "feat: 포트폴리오 자체 case-study 추가 (Supabase→Markdown 마이그레이션 회고)"

git add projects/portfolio/case-study.md
git commit -m "style: 포트폴리오 case-study 마크다운 포맷팅 정리"

git add app/_components/sections/Posts.tsx
git commit -m "feat: Velog에 발행된 실제 글 20개를 Posts 페이지에 등록"

git add "app/(routes)/posts/[id]/page.tsx" app/_components/sections/Posts.tsx lib/posts.ts posts/portfolio-cms-migration/post.md
git commit -m "feat: 포트폴리오 직접 작성 글을 위한 로컬 Markdown Posts 시스템 추가"

git add docs/CONTENT_MANAGEMENT.md
git commit -m "docs: CONTENT_MANAGEMENT.md에 로컬 Posts 구조 및 Velog 등록 반영"

git add app/_components/sections/Posts.tsx posts/portfolio-cms-migration/post.md
git commit -m "fix: 학습노트 태그 Velog 글 제거 및 마이그레이션 글 내용 최신화"

git add app/_components/sections/Posts.tsx app/_components/sections/PostsList.tsx lib/constants.ts lib/posts.ts docs/CONTENT_MANAGEMENT.md posts/portfolio-cms-migration/post.md
git commit -m "feat: Posts 섹션에 카테고리 탭 필터(트러블슈팅/회고/기획/개발) 추가"

git add posts/portfolio-cms-migration/post.md
git commit -m "fix: 포트폴리오 CMS 마이그레이션 글 카테고리를 회고에서 트러블슈팅으로 변경"

git add app/_components/sections/Posts.tsx app/_components/sections/PostsList.tsx lib/posts.ts docs/CONTENT_MANAGEMENT.md posts/portfolio-cms-migration/post.md
git commit -m "feat: 트러블슈팅 탭을 프로젝트별 아코디언으로 재구성"

git add app/_components/sections/Posts.tsx app/_components/sections/PostsList.tsx
git commit -m "fix: 카드에서 예상 읽기 시간 표시 제거, 모달창 글 프로젝트 태깅 수정"

git add lib/markdown.ts lib/posts.ts lib/projects.ts docs/CONTENT_MANAGEMENT.md
git commit -m "feat: 프로젝트/포스트 마크다운 파일명을 고정에서 자유롭게 변경"

git add app/_components/sections/Posts.tsx app/_components/sections/PostsList.tsx docs/CONTENT_MANAGEMENT.md
git commit -m "feat: Posts 카테고리 탭 선택 상태를 URL searchParams와 동기화"

git add app/_components/sections/Projects.tsx
git commit -m "fix: 중단어 창고 프로젝트의 포스트 링크를 트러블슈팅 탭으로 연결"

git add "app/(routes)/projects/[id]/page.tsx" app/_components/sections/Projects.tsx docs/ARCHITECTURE.md docs/CONTENT_MANAGEMENT.md lib/projects.ts posts/portfolio-cms-migration/post.md posts/yeamaeui-jeongseok-refactoring/post.md projects/genova-audio-toolkit/case-study.md projects/haengsho-market/case-study.md projects/junghdaneo-changgo/case-study.md projects/yeamaeui-jeongseok/case-study.md
git commit -m "refactor: 프로젝트 상세 페이지 시스템 제거하고 posts로 완전히 통합"

git add app/_components/sections/Projects.tsx
git commit -m "fix: 예매의 정석 프로젝트의 포스트 링크를 리팩토링 기록 글로 직접 연결"

git add lib/posts.ts posts/final-project/likeBtn_trouble_shooting.md
git commit -m "fix: frontmatter 없는 새 글 때문에 발생한 Posts 페이지 크래시 수정"

git add "app/(routes)/posts/[id]/page.tsx" app/_components/sections/Posts.tsx app/_components/sections/PostsList.tsx lib/posts.ts docs/CONTENT_MANAGEMENT.md posts/final-project-proxy/proxy_trouble_shooting.md posts/final-project/likeBtn_trouble_shooting.md posts/portfolio-cms-migration/post.md posts/yeamaeui-jeongseok-refactoring/post.md
git commit -m "feat: 프록시 인증 트러블슈팅 글 추가, readingTime 필드 제거"

git add app/_components/sections/Projects.tsx docs/CONTENT_MANAGEMENT.md posts/final-project-proxy/proxy_trouble_shooting.md posts/final-project/likeBtn_trouble_shooting.md
git commit -m "fix: final-project 글들의 실제 프로젝트명(행쇼마켓) 반영"

git add app/_components/sections/Posts.tsx app/_components/sections/Projects.tsx posts/final-project-proxy/proxy_trouble_shooting.md
git commit -m "docs: 남은 프로젝트 링크/카테고리 정보 반영"

git push
```

---

## Phase 4️⃣2️⃣: README 작성 및 페이지 구성 표 중심으로 재구성

### ✅ 커밋 전 체크리스트

```
- [ ] README의 docs/ 문서 링크가 모두 실제 파일로 연결되는지 확인
- [ ] 기술 스택 표기와 시작하기 명령어가 package.json(dependencies, scripts)과 일치하는지 확인
- [ ] frontmatter 예시에 Phase 41에서 제거한 readingTime이 남아있지 않은지 확인
- [ ] 페이지 구성 표의 주요 기능이 실제 해당 페이지에 있는 기능인지 확인
- [ ] 로컬 feat-add-readme가 origin/feat-add-readme와 어긋나지 않았는지 확인 (git status, git log)
```

### 📝 커밋 메시지

1. `docs`: `README 작성`
2. `docs`: `Phase 42 작업 완료 사항 정리`
3. `docs`: `README 페이지 구성에 페이지별 주요 기능 통합, 주요 기능 섹션 삭제`
4. `docs`: `Phase 42 요약에 README 최종 구성 및 브랜치 정리 트러블슈팅 반영`

### 💻 커밋 명령어

```bash
git add README.md
git commit -m "docs: README 작성"

git add "docs/ PHASE_SUMMARY.md"
git commit -m "docs: Phase 42 작업 완료 사항 정리"

git add README.md
git commit -m "docs: README 페이지 구성에 페이지별 주요 기능 통합, 주요 기능 섹션 삭제"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 42 요약에 README 최종 구성 및 브랜치 정리 트러블슈팅 반영"

git push
```

---

## Phase 4️⃣3️⃣: 행쇼마켓·인턴십 회고 및 성능 최적화 트러블슈팅 포스트 추가

### ✅ 커밋 전 체크리스트

```
- [ ] 새 글 frontmatter가 isValidFrontmatter 스키마(title, excerpt, date, category, project)를 만족하는지 확인
- [ ] category 값이 POST_CATEGORIES(트러블슈팅/회고/기획/개발) 중 하나인지 확인
- [ ] project 값이 같은 프로젝트의 기존 글과 정확히 같은 이름인지 확인 (아코디언 그룹 기준)
- [ ] 본문에 # 제목이 남아 상세 페이지 h1이 중복되지 않는지 확인
- [ ] 카드에서 카테고리와 같은 단어가 태그로 한 번 더 표시되지 않는지 확인
- [ ] 회고 탭 / 트러블슈팅 탭에서 새 글이 보이고 상세 페이지로 이동하는지 확인
- [ ] 성능 최적화 글의 점수(61 → 71 → 82)가 실측값과 맞는지 확인
- [ ] 프로덕션 빌드: next build
```

### 📝 커밋 메시지

1. `feat`: `행쇼마켓 파이널 프로젝트 회고 포스트 추가`
2. `feat`: `행쇼마켓 성능 최적화 트러블슈팅 포스트 추가`
3. `feat`: `인턴십 프로젝트(오디오 툴킷) 회고 포스트 추가`
4. `fix`: `카테고리와 중복되는 기획 태그 제거`
5. `docs`: `Phase 43 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add posts/final-project-retrospective
git commit -m "feat: 행쇼마켓 파이널 프로젝트 회고 포스트 추가"

git add posts/final-project-performance
git commit -m "feat: 행쇼마켓 성능 최적화 트러블슈팅 포스트 추가"

git add posts/internship-retrospective
git commit -m "feat: 인턴십 프로젝트(오디오 툴킷) 회고 포스트 추가"

git add app/_components/sections/Posts.tsx
git commit -m "fix: 카테고리와 중복되는 기획 태그 제거"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 43 작업 완료 사항 정리"

git push
```

---

## Phase 4️⃣4️⃣: 사이트 metadata 변경, 포스트 excerpt 어미 통일, 프로젝트 카드 GitHub 링크·담당 범위

### ✅ 커밋 전 체크리스트

```
- [ ] 페이지별 브라우저 탭 제목이 "yeji's portfolio | 페이지 이름" 형태인지 확인 (홈은 "yeji's portfolio")
- [ ] 페이지 이름이 헤더 내비게이션 라벨과 일치하는지 확인
- [ ] description이 create-next-app 기본값이 아닌지 확인
- [ ] 로컬 트러블슈팅·회고 글 excerpt가 모두 "기록했습니다."로 끝나는지 확인
- [ ] 프로젝트 카드 GitHub 링크가 올바른 저장소로 열리는지 확인
- [ ] 프로젝트 카드 4개 모두 사용 기술 아래에 담당 범위가 표시되는지 (모바일·다크 모드 포함) 확인
- [ ] 타입 체크: bunx tsc --noEmit
- [ ] 린트: bunx eslint app
- [ ] 프로덕션 빌드: next build
```

### 📝 커밋 메시지

1. `feat`: `사이트 metadata를 yeji's portfolio로 변경하고 페이지별 제목 템플릿 적용`
2. `style`: `로컬 트러블슈팅·회고 포스트 excerpt 어미를 '기록했습니다'로 통일`
3. `style`: `중단어창고 페이지네이션 Velog 포스트 excerpt 문구 수정`
4. `fix`: `프로젝트 카드 GitHub 링크를 개인 저장소 주소로 수정`
5. `docs`: `Phase 44 작업 완료 사항 정리`
6. `feat`: `프로젝트 카드 사용 기술 아래에 담당 범위 표시`
7. `docs`: `Phase 44 정리 문서에 프로젝트 카드 담당 범위 추가 내용 반영`

### 💻 커밋 명령어

```bash
git add app/layout.tsx "app/(routes)/about/page.tsx" "app/(routes)/experience/page.tsx" "app/(routes)/posts/page.tsx" "app/(routes)/resume/page.tsx"
git commit -m "feat: 사이트 metadata를 yeji's portfolio로 변경하고 페이지별 제목 템플릿 적용"

git add posts
git commit -m "style: 로컬 트러블슈팅·회고 포스트 excerpt 어미를 '기록했습니다'로 통일"

git add app/_components/sections/Posts.tsx
git commit -m "style: 중단어창고 페이지네이션 Velog 포스트 excerpt 문구 수정"

git add app/_components/sections/Projects.tsx
git commit -m "fix: 프로젝트 카드 GitHub 링크를 개인 저장소 주소로 수정"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 44 작업 완료 사항 정리"

git push -u origin feat-add-metadata

git add app/_components/sections/Projects.tsx
git commit -m "feat: 프로젝트 카드 사용 기술 아래에 담당 범위 표시"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 44 정리 문서에 프로젝트 카드 담당 범위 추가 내용 반영"

git push
```

---

## Phase 4️⃣5️⃣: 프로젝트 카드 성과 bullet에 실제 측정값 반영

### ✅ 커밋 전 체크리스트

```
- [ ] 카드에 적은 수치가 모두 posts/Velog 글에 실제 측정값으로 기록되어 있는지 확인
- [ ] 측정 기록이 없는 항목(예: Long Task, GENOVA 전체)은 수치 없이 정성적으로 서술했는지 확인
- [ ] 원본 안에서 값이 서로 다른 수치(행쇼마켓 성능 점수)는 쓰지 않았는지 확인
- [ ] 커밋 전 git diff로 내가 수정하지 않은 변경(사용자 직접 수정)이 섞여 있는지 확인
- [ ] 타입 체크: bunx tsc --noEmit
- [ ] 린트: bunx eslint app
- [ ] 프로덕션 빌드: next build
```

### 📝 커밋 메시지

1. `feat`: `프로젝트 카드 성과 bullet에 실제 측정값 반영`
2. `docs`: `Phase 45 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "feat: 프로젝트 카드 성과 bullet에 실제 측정값 반영"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 45 작업 완료 사항 정리"

git push
```

---

## Phase 4️⃣6️⃣: 기술 스택 카테고리 재구성, Hero 요약 추가, 성장의 여정 간격 축소

### ✅ 커밋 전 체크리스트

```
- [ ] 기술 스택 7개 카테고리와 15개 배지가 전달받은 목록과 일치하는지 확인
- [ ] 각 배지 hover/focus 시 세부 설명 패널이 해당 행 아래에 펼쳐지는지 확인 (키보드 Tab 포함)
- [ ] 데스크톱에서 카테고리 행의 배지 시작선이 맞는지, 모바일에서 줄바꿈이 자연스러운지 확인
- [ ] Hero 아래 이름·주요 경력 문구가 인사말 전환 뒤에 등장하는지, 모바일에서 세 줄로 보이는지 확인
- [ ] 성장의 여정 간격(pb-13)이 빌드 CSS에 생성되고 스크롤에 따른 단계 전환이 유지되는지 확인
- [ ] 라이트/다크 모드 확인
- [ ] 타입 체크: bunx tsc --noEmit
- [ ] 린트: bunx eslint app
- [ ] 프로덕션 빌드: next build
```

### 📝 커밋 메시지

1. `fix`: `행쇼마켓 1번째 개선 사항에 단어 추가` (사용자 커밋)
2. `feat`: `기술 스택을 카테고리별로 재구성하고 스택 추가 및 세부 설명 수정`
3. `feat`: `Hero 아래에 이름·직무와 주요 경력 요약 추가`
4. `style`: `성장의 여정 단계 간 세로 간격 축소`
5. `docs`: `Phase 46 작업 완료 사항 정리`
6. `fix`: `행쇼마켓 CLS 문구에서 잘못된 '초' 단위 제거`
7. `docs`: `Phase 46 정리 문서에 CLS 문구 수정 반영`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "fix: 행쇼마켓 1번째 개선 사항에 단어 추가"

git add app/_components/sections/AboutInfo.tsx
git commit -m "feat: 기술 스택을 카테고리별로 재구성하고 스택 추가 및 세부 설명 수정"

git add app/_components/sections/HeroSummary.tsx app/page.tsx
git commit -m "feat: Hero 아래에 이름·직무와 주요 경력 요약 추가"

git add app/_components/sections/AboutVision.tsx
git commit -m "style: 성장의 여정 단계 간 세로 간격 축소"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 46 작업 완료 사항 정리"

git add app/_components/sections/Projects.tsx
git commit -m "fix: 행쇼마켓 CLS 문구에서 잘못된 '초' 단위 제거"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 46 정리 문서에 CLS 문구 수정 반영"

git push
```

---

## Phase 4️⃣7️⃣: 트러블슈팅 아코디언 project 쿼리 연동, 클릭 전용 전환, 프로젝트 카드 순서 정렬

### ✅ 커밋 전 체크리스트

```
- [ ] 프로젝트 카드 포스트 링크로 진입하면 해당 프로젝트 아코디언이 열려 있는지 확인 (4개 모두)
- [ ] 아코디언 클릭 시 ?project= 가 갱신되고, 다시 클릭하면 삭제되는지 확인
- [ ] 마우스 호버만으로는 아코디언이 열리거나 주소가 바뀌지 않는지 확인
- [ ] 키보드(Tab + Enter)로 아코디언을 열 수 있는지 확인
- [ ] 새로고침 시 열린 프로젝트가 유지되고, 다른 탭으로 바꾸면 project 파라미터가 지워지는지 확인
- [ ] 프로젝트 카드 순서와 트러블슈팅 아코디언 순서가 같은지 확인
- [ ] 타입 체크: bunx tsc --noEmit
- [ ] 린트: bunx eslint app lib
- [ ] 프로덕션 빌드: next build
```

### 📝 커밋 메시지

1. `feat`: `트러블슈팅 아코디언 열림 상태를 project 쿼리로 관리하고 클릭으로만 열리도록 변경`
2. `feat`: `프로젝트 카드 순서 변경 및 포스트 링크를 프로젝트별 트러블슈팅 주소로 연결`
3. `docs`: `Phase 47 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add lib/constants.ts app/_components/sections/PostsList.tsx
git commit -m "feat: 트러블슈팅 아코디언 열림 상태를 project 쿼리로 관리하고 클릭으로만 열리도록 변경"

git add app/_components/sections/Projects.tsx
git commit -m "feat: 프로젝트 카드 순서 변경 및 포스트 링크를 프로젝트별 트러블슈팅 주소로 연결"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 47 작업 완료 사항 정리"

git push
```

---

## Phase 4️⃣8️⃣: 프로젝트 카드 모바일·태블릿 반응형 재구성, 이력서 PDF 교체

### ✅ 커밋 전 체크리스트

```
- [ ] 320~430px 모바일에서 프로젝트 카드 4개의 글이 카드 밖으로 넘치거나 잘리지 않는지 확인
- [ ] 640~1023px에서 이미지 아래에 세부 내용이 전체 폭으로 표시되는지 확인
- [ ] 1024px 이상에서 이미지와 세부 내용이 나란히 표시되는지 확인
- [ ] 라이트/다크 모드 확인
- [ ] 이력서 PDF가 public/resume/ 안에 있고, /resume 페이지 PDF 다운로드가 200으로 받아지는지 확인
- [ ] 타입 체크: bunx tsc --noEmit
- [ ] 린트: bunx eslint app
- [ ] 프로덕션 빌드: next build
```

### 📝 커밋 메시지

1. `refactor`: `프로젝트 카드를 모바일·태블릿 화면 폭에 맞게 반응형으로 재구성`
2. `docs`: `이력서 pdf파일 최신 버전으로 교체` (사용자 커밋)
3. `fix`: `이력서 PDF를 다운로드 링크 경로(public/resume)로 이동`
4. `docs`: `Phase 48 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "refactor: 프로젝트 카드를 모바일·태블릿 화면 폭에 맞게 반응형으로 재구성"

git add public
git commit -m "docs: 이력서 pdf파일 최신 버전으로 교체"

git mv "public/장예지_이력서.pdf" "public/resume/장예지_이력서.pdf"
git commit -m "fix: 이력서 PDF를 다운로드 링크 경로(public/resume)로 이동"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 48 작업 완료 사항 정리"

git push
```

---

## Phase 4️⃣9️⃣: GitHub CLI 연동, 이슈 템플릿 및 main 병합 PR 템플릿 추가

### ✅ 커밋 전 체크리스트

```
- [ ] 각 템플릿의 labels 값이 저장소에 실제로 있는 라벨인지 확인 (gh label list)
- [ ] 템플릿 제목 머리말([FEAT]/[FIX]/[REFACTOR]/[STYLE]/[DOCS])이 서로 겹치지 않는지 확인
- [ ] front matter(name/about/title/labels/assignees) 형식이 기존 feature_request.md와 같은지 확인
- [ ] 머지 후 GitHub "New issue" 화면에 템플릿 5개가 모두 노출되는지 확인
- [ ] 머지 후 ?template=merge_to_main.md 로 병합 PR 템플릿이 채워지고, 일반 PR에는 기존 기본 템플릿이 그대로 들어가는지 확인
```

### 📝 커밋 메시지

1. `docs`: `버그·리팩토링·스타일·문서 이슈 템플릿 추가`
2. `docs`: `Phase 49 작업 완료 사항 정리`
3. `docs`: `dev → main 병합 전용 PR 템플릿 추가`
4. `docs`: `Phase 49 정리 문서에 병합 PR 템플릿 추가 내용 반영`

### 💻 커밋 명령어

```bash
git add .github/ISSUE_TEMPLATE
git commit -m "docs: 버그·리팩토링·스타일·문서 이슈 템플릿 추가"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 49 작업 완료 사항 정리"

git push -u origin docs-add-issue-templates

git add .github/PULL_REQUEST_TEMPLATE
git commit -m "docs: dev → main 병합 전용 PR 템플릿 추가"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 49 정리 문서에 병합 PR 템플릿 추가 내용 반영"

git push
```

---

## Phase 5️⃣0️⃣: dev → main 병합 및 이력서 PDF 최신 버전 교체

### ✅ 커밋 전 체크리스트

```
- [ ] 새 PDF가 public/resume/장예지_이력서.pdf 경로·파일명 그대로인지 확인
- [ ] 파일명이 조합형(NFC)인지 확인 - Finder로 넣은 한글 파일명은 자모 분리형(NFD)일 수 있음
      python3 -c "import os,unicodedata as u;[print(n,u.is_normalized('NFC',n)) for n in os.listdir('public/resume')]"
- [ ] 프로덕션 빌드에서 /resume/장예지_이력서.pdf 가 200 application/pdf, 새 파일 크기로 받아지는지 확인
- [ ] Resume 페이지 PDF 다운로드 버튼의 href·download 속성이 그대로인지 확인
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `docs`: `이력서 PDF 다운로드 파일 최신 버전으로 교체` (본문 `Refs #83`)
2. `docs`: `Phase 50 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add public/resume
git commit -m "docs: 이력서 PDF 다운로드 파일 최신 버전으로 교체" -m "Refs #83"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 50 작업 완료 사항 정리"

git push -u origin 83-docs-resume-pdf
```

---

## Phase 5️⃣1️⃣: About 성장의 여정·Hero 문구 순서 변경 및 개선 요청 수치 수정

### ✅ 커밋 전 체크리스트

```
- [ ] About 성장의 여정이 STEP 01 CONNECT → 02 INCLUDE → 03 RECORD 순서인지 확인
- [ ] 각 단계의 설명·세부 내용이 제목과 맞게 함께 옮겨졌는지 확인
- [ ] 스크롤 시 단계 활성화와 세부 카드 전환이 새 순서대로 동작하는지 확인
- [ ] Hero 첫 화면 제목이 "배우고, / 기록하고, / 나아갑니다"인지 확인
- [ ] 개선 요청 수치가 Hero 주요 경력·About CONNECT 설명 모두 30건으로 일치하는지 확인 (37/35 잔존 없음)
- [ ] 타입 체크: bunx tsc --noEmit
- [ ] 린트: bunx eslint app
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `refactor`: `성장의 여정 순서를 소통·사용자 고려·기록 순으로 변경하고 개선 사항 수치 수정` (본문 `Refs #86`)
2. `refactor`: `Hero 제목 문구 순서 변경 및 주요 경력 개선 요청 수치 수정` (본문 `Refs #86`)
3. `docs`: `Phase 51 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/AboutVision.tsx
git commit -m "refactor: 성장의 여정 순서를 소통·사용자 고려·기록 순으로 변경하고 개선 사항 수치 수정" -m "Refs #86"

git add app/_components/sections/Hero.tsx app/_components/sections/HeroSummary.tsx
git commit -m "refactor: Hero 제목 문구 순서 변경 및 주요 경력 개선 요청 수치 수정" -m "Refs #86"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 51 작업 완료 사항 정리"

git push -u origin 86-refactor-about-hero-order
```

---

## Phase 5️⃣2️⃣: Hero 아래 이름·주요 경력 요약(HeroSummary) 삭제

### ✅ 커밋 전 체크리스트

```
- [ ] 홈에서 Hero 아래 구분선·"장예지 · FRONTEND DEVELOPER"·주요 경력 3줄이 모두 사라졌는지 확인
- [ ] Hero 안의 "FRONTEND DEVELOPER" 문구는 그대로인지 확인
- [ ] grep으로 HeroSummary 참조가 남아 있지 않은지 확인
- [ ] 데스크톱·모바일에서 홈 첫 화면 여백·레이아웃 확인
- [ ] 타입 체크: bunx tsc --noEmit
- [ ] 린트: bunx eslint app
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `refactor`: `Hero 아래 이름·주요 경력 요약(HeroSummary) 삭제` (본문 `Refs #89`)
2. `docs`: `Phase 52 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git rm app/_components/sections/HeroSummary.tsx
git add app/page.tsx
git commit -m "refactor: Hero 아래 이름·주요 경력 요약(HeroSummary) 삭제" -m "Refs #89"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 52 작업 완료 사항 정리"

git push -u origin 89-refactor-remove-hero-summary
```

---

## Phase 5️⃣3️⃣: 성장의 여정 세부 카드와 활성 단계 높이 정렬

### ✅ 커밋 전 체크리스트

```
- [ ] 데스크톱에서 스크롤로 단계가 바뀔 때 카드 연결선 끝점과 활성 단계 번호 원의 높이가 같은지 확인
- [ ] 단계(01~03)를 클릭했을 때도 높이가 같은지 확인
- [ ] 창 크기를 바꿨을 때 위치가 다시 맞춰지는지 확인
- [ ] STEP 03에서 카드가 다음 섹션(기술 스택)과 겹치지 않는지 확인
- [ ] 모바일에서 카드가 활성 단계 아래에 기존처럼 표시되는지 확인
- [ ] 타입 체크: bunx tsc --noEmit
- [ ] 린트: bunx eslint app
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `fix`: `성장의 여정 세부 카드를 활성 단계 높이에 맞춰 배치` (본문 `Refs #92`)
2. `docs`: `Phase 53 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/AboutVision.tsx app/_components/sections/JourneyDetailCard.tsx
git commit -m "fix: 성장의 여정 세부 카드를 활성 단계 높이에 맞춰 배치" -m "Refs #92"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 53 작업 완료 사항 정리"

git push -u origin 92-fix-journey-card-alignment
```

---

## Phase 5️⃣4️⃣: 이력서 PDF 새 버전 교체 및 피그마 이력서 링크 삭제

### ✅ 커밋 전 체크리스트

```
- [ ] 새 PDF가 public/resume/장예지_이력서.pdf 경로·파일명 그대로인지 확인
- [ ] 파일명이 조합형(NFC)인지 확인
      python3 -c "import os,unicodedata as u;[print(n,u.is_normalized('NFC',n)) for n in os.listdir('public/resume')]"
- [ ] 프로덕션 빌드에서 PDF 다운로드가 200, 새 파일 크기로 받아지는지 확인
- [ ] Resume 페이지에 피그마 버튼이 없고, 노션 버튼이 강조 스타일·새 링크인지 확인 (라이트/다크, 모바일)
- [ ] README /resume 설명에 피그마 문구가 남지 않았는지 확인
- [ ] 타입 체크: bunx tsc --noEmit
- [ ] 린트: bunx eslint app
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `docs`: `이력서 PDF 새 버전으로 교체` (본문 `Refs #95`)
2. `refactor`: `피그마 이력서 링크 삭제 및 노션 버튼 강조·링크 변경` (본문 `Refs #95`)
3. `docs`: `Phase 54 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add public/resume
git commit -m "docs: 이력서 PDF 새 버전으로 교체" -m "Refs #95"

git add app/_components/sections/Resume.tsx README.md
git commit -m "refactor: 피그마 이력서 링크 삭제 및 노션 버튼 강조·링크 변경" -m "Refs #95"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 54 작업 완료 사항 정리"

git push -u origin 95-refactor-resume-pdf-figma
```

---

## Phase 5️⃣5️⃣: 중단어 창고 비밀번호 재설정 글을 트러블슈팅 카테고리로 이동

### ✅ 커밋 전 체크리스트

```
- [ ] 트러블슈팅 탭 > 중단어 창고 아코디언에 글이 노출되는지 확인 (7 → 8)
- [ ] 개발 탭에서 더 이상 노출되지 않는지 확인
- [ ] 중단어 창고 프로젝트 카드 포스트 링크로 진입 시 글이 보이는지 확인
- [ ] 글의 제목·요약·URL·태그가 그대로인지 확인 (category만 변경)
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `docs`: `중단어 창고 비밀번호 재설정 글을 트러블슈팅 카테고리로 이동` (본문 `Refs #98`)
2. `docs`: `Phase 55 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Posts.tsx
git commit -m "docs: 중단어 창고 비밀번호 재설정 글을 트러블슈팅 카테고리로 이동" -m "Refs #98"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 55 작업 완료 사항 정리"

git push -u origin 98-docs-password-reset-post-category
```

---

## Phase 5️⃣6️⃣: 트러블슈팅 글 제목을 [트러블 슈팅] [프로젝트] 형식으로 통일

### ✅ 커밋 전 체크리스트

```
- [ ] 트러블슈팅 카테고리 글 제목이 모두 "[트러블 슈팅] [프로젝트명] 제목" 형식인지 확인 (Velog·로컬 모두)
- [ ] 프로젝트명이 아코디언 그룹명과 같은지 확인 (예: [중단어 창고])
- [ ] 제목 외 필드(excerpt·url·category·project·tags)가 바뀌지 않았는지 git diff로 확인
- [ ] 로컬 글 상세 페이지 h1·브라우저 탭 제목이 새 제목인지 확인
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `docs`: `트러블슈팅 글 제목을 [트러블 슈팅] [프로젝트] 형식으로 통일` (본문 `Refs #101`)
2. `docs`: `Phase 56 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Posts.tsx posts
git commit -m "docs: 트러블슈팅 글 제목을 [트러블 슈팅] [프로젝트] 형식으로 통일" -m "Refs #101"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 56 작업 완료 사항 정리"

git push -u origin 101-docs-troubleshooting-title-prefix
```

---

## Phase 5️⃣7️⃣: Resume 페이지 노션 이력서 링크 새 주소로 교체

### ✅ 커밋 전 체크리스트

```
- [ ] 새 노션 주소가 브라우저에서 정상적으로 열리는지 확인
- [ ] /resume 노션 버튼 href가 새 주소이고 새 탭으로 열리는지 확인
- [ ] grep으로 이전 노션 주소가 남아 있지 않은지 확인
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `refactor`: `Resume 페이지 노션 이력서 링크 새 주소로 교체` (본문 `Refs #104`)
2. `docs`: `Phase 57 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Resume.tsx
git commit -m "refactor: Resume 페이지 노션 이력서 링크 새 주소로 교체" -m "Refs #104"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 57 작업 완료 사항 정리"

git push -u origin 104-refactor-notion-resume-link
```

---

## Phase 5️⃣8️⃣: 이력서 PDF 다운로드 파일 새 버전으로 교체

### ✅ 커밋 전 체크리스트

```
- [ ] 새 PDF가 public/resume/장예지_이력서.pdf 경로·파일명 그대로인지 확인
- [ ] 파일명이 조합형(NFC)인지 확인 (Finder로 넣은 파일은 NFD일 수 있음)
      python3 -c "import os,unicodedata as u;[print(n,u.is_normalized('NFC',n)) for n in os.listdir('public/resume')]"
- [ ] 프로덕션 빌드에서 PDF 다운로드가 200, 새 파일 크기·해시로 받아지는지 확인
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `docs`: `이력서 PDF 다운로드 파일 새 버전으로 교체` (본문 `Refs #107`)
2. `docs`: `Phase 58 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add public/resume
git commit -m "docs: 이력서 PDF 다운로드 파일 새 버전으로 교체" -m "Refs #107"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 58 작업 완료 사항 정리"

git push -u origin 107-docs-resume-pdf
```

---

## Phase 5️⃣9️⃣: public 폴더 한글 파일명 NFC 자동 변환 스크립트 추가

### ✅ 커밋 전 체크리스트

```
- [ ] bun run check:filenames 가 NFD 이름이 있을 때 목록 출력 + 종료 코드 1, 없을 때 0인지 확인
- [ ] bun run fix:filenames 가 파일·폴더 이름만 NFC로 바꾸고 내용은 유지하는지 확인 (임시 NFD 파일로 테스트 후 삭제)
- [ ] 테스트용 임시 파일이 public/에 남아 있지 않은지 확인
- [ ] 린트: bunx eslint app lib scripts
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `feat`: `public 폴더 한글 파일명 NFC 자동 변환 스크립트 추가` (본문 `Refs #110`)
2. `docs`: `이력서 PDF 교체 시 파일명 변환 명령 사용법 추가` (본문 `Refs #110`)
3. `docs`: `Phase 59 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add scripts/normalize-filenames.mjs package.json
git commit -m "feat: public 폴더 한글 파일명 NFC 자동 변환 스크립트 추가" -m "Refs #110"

git add README.md docs/CONTENT_MANAGEMENT.md
git commit -m "docs: 이력서 PDF 교체 시 파일명 변환 명령 사용법 추가" -m "Refs #110"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 59 작업 완료 사항 정리"

git push -u origin 110-feat-normalize-filenames
```

---

## Phase 6️⃣0️⃣: About Me 성장의 여정 좌우 여백 균일하게 조정

### ✅ 커밋 전 체크리스트

```
- [ ] 성장의 여정 단계 번호 원 왼쪽 끝이 "성장의 여정" 제목과 같은 선인지 확인
- [ ] 보이는 내용의 좌우 여백이 같은지 확인 (모바일 24px, 768px 이상 48px)
- [ ] 세부 카드와 활성 단계 높이 정렬(#92)이 그대로인지 확인
- [ ] 모바일에서 단계 아래 카드 표시와 가로 스크롤 0 확인
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `About Me 성장의 여정 좌우 여백 균일하게 조정` (본문 `Refs #113`)
2. `docs`: `Phase 60 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/AboutVision.tsx
git commit -m "style: About Me 성장의 여정 좌우 여백 균일하게 조정" -m "Refs #113"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 60 작업 완료 사항 정리"

git push -u origin 113-style-about-horizontal-padding
```

---

## Phase 6️⃣1️⃣: About Me 가운데 배치, 성장의 여정 열 간격 축소 및 일직선 화살표 연결선

### ✅ 커밋 전 체크리스트

```
- [ ] 768px 이상에서 About Me 좌우 여백이 같고, 넓은 화면에서 최대 폭으로 가운데 배치되는지 확인
- [ ] 성장의 여정 두 열 간격이 20px(md:gap-5)인지 확인
- [ ] 세부 카드 연결선이 일직선 화살표로 활성 단계를 가리키고, 높이가 단계 번호 원과 같은지 확인 (스크롤·클릭)
- [ ] 단계 3개를 각각 활성화했을 때 화살표가 단계 글자와 겹치지 않는지 확인 (768~1280px)
- [ ] 모바일 레이아웃 변화 없음, 가로 스크롤 0 확인
- [ ] 라이트/다크 모드에서 화살표 색 확인
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `About Me 최대 폭·가운데 배치 및 성장의 여정 열 간격 축소` (본문 `Refs #116`)
2. `style`: `성장의 여정 세부 카드 연결선을 일직선 화살표로 변경` (본문 `Refs #116`)
3. `docs`: `Phase 61 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/AboutSections.tsx app/_components/sections/AboutVision.tsx
git commit -m "style: About Me 최대 폭·가운데 배치 및 성장의 여정 열 간격 축소" -m "Refs #116"

git add app/_components/sections/JourneyDetailCard.tsx
git commit -m "style: 성장의 여정 세부 카드 연결선을 일직선 화살표로 변경" -m "Refs #116"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 61 작업 완료 사항 정리"

git push -u origin 116-style-about-layout-arrow
```

---

## Phase 6️⃣2️⃣: ABOUT ME 제목 여백 통일 및 성장의 여정 화살표 방향·간격 조정

### ✅ 커밋 전 체크리스트

```
- [ ] 홈 "ABOUT ME" 제목이 "성장의 여정"과 같은 선에서 시작하는지 확인 (모바일·태블릿·데스크톱)
- [ ] 화살표가 오른쪽(세부 카드)을 가리키는지 확인
- [ ] 화살촉 끝과 카드 바깥 테두리 사이가 12px인지 확인 (다크 모드에서 흰 테두리 기준)
- [ ] 세부 카드·활성 단계 높이 정렬(#92) 유지, 화살표와 단계 글자 겹침 없음 확인
- [ ] 라이트/다크 모드 확인
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `홈 ABOUT ME 제목에 About Me 컨테이너 여백 적용` (본문 `Refs #119`)
2. `style`: `성장의 여정 화살표를 세부 카드 방향으로 바꾸고 카드와 12px 간격 적용` (본문 `Refs #119`)
3. `docs`: `Phase 62 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/AboutSections.tsx app/page.tsx
git commit -m "style: 홈 ABOUT ME 제목에 About Me 컨테이너 여백 적용" -m "Refs #119"

git add app/_components/sections/JourneyDetailCard.tsx
git commit -m "style: 성장의 여정 화살표를 세부 카드 방향으로 바꾸고 카드와 12px 간격 적용" -m "Refs #119"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 62 작업 완료 사항 정리"

git push -u origin 119-style-about-heading-arrow
```

---

## Phase 6️⃣3️⃣: 성장의 여정 레이아웃을 모든 화면에서 모바일 레이아웃으로 통일

### ✅ 커밋 전 체크리스트

```
- [ ] 모든 화면 크기에서 세부 카드가 활성 단계 바로 아래에 1개만 보이는지 확인
- [ ] 데스크톱에 오른쪽 카드·화살표가 남아 있지 않은지 확인
- [ ] 삭제한 정렬 코드의 잔재(useLayoutEffect, ResizeObserver, data-journey-* 속성)가 없는지 grep으로 확인
- [ ] 스크롤 시 활성 단계 전환이 그대로 동작하는지 확인
- [ ] 라이트/다크 모드, 가로 스크롤 0 확인
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `refactor`: `성장의 여정 레이아웃을 모든 화면에서 모바일 레이아웃으로 통일` (본문 `Refs #122`)
2. `docs`: `Phase 63 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/AboutVision.tsx app/_components/sections/JourneyDetailCard.tsx
git commit -m "refactor: 성장의 여정 레이아웃을 모든 화면에서 모바일 레이아웃으로 통일" -m "Refs #122"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 63 작업 완료 사항 정리"

git push -u origin 122-refactor-journey-single-layout
```

---

## Phase 6️⃣4️⃣: Experience·Projects 본문 폭 통일, 경력 가로 배치 및 Hero 문구 자간 조정

### ✅ 커밋 전 체크리스트

```
- [ ] ABOUT ME·EXPERIENCE·PROJECTS 제목과 프로젝트 카드 좌우 끝이 같은 선인지 확인 (홈·/experience, 모바일~1920px)
- [ ] 768px 이상에서 경력이 가로로 나란히, 모바일에서 세로로 표시되는지 확인
- [ ] 경력 세부 내용 줄 길이가 짧아졌는지(max-w-sm), 타임라인 점이 제목과 같은 선인지 확인
- [ ] 라이트/다크 모드에서 가로 배치 시 두 항목 모두 세로선이 보이는지 확인
- [ ] Hero 소개 두 줄 자간 확인
- [ ] 가로 스크롤 0
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `본문 폭을 LAYOUT.contentContainer로 공용화하고 Experience·Projects에 적용` (본문 `Refs #125`)
2. `style`: `Experience 경력을 가로로 배치하고 세부 내용 줄 길이 축소` (본문 `Refs #125`)
3. `style`: `Hero 소개 문구 자간 축소` (본문 `Refs #125`)
4. `docs`: `Phase 64 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add lib/constants.ts app/_components/sections/AboutSections.tsx app/page.tsx app/_components/sections/ExperienceProjects.tsx app/_components/sections/Projects.tsx
git commit -m "style: 본문 폭을 LAYOUT.contentContainer로 공용화하고 Experience·Projects에 적용" -m "Refs #125"

git add app/_components/sections/Experience.tsx app/_components/ui/TimelineItem.tsx
git commit -m "style: Experience 경력을 가로로 배치하고 세부 내용 줄 길이 축소" -m "Refs #125"

git add app/_components/sections/Hero.tsx
git commit -m "style: Hero 소개 문구 자간 축소" -m "Refs #125"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 64 작업 완료 사항 정리"

git push -u origin 125-style-experience-layout
```

---

## Phase 6️⃣5️⃣: Experience 타임라인 점 아래 세로선 제거

### ✅ 커밋 전 체크리스트

```
- [ ] Experience 두 항목 모두 세로선 없이 점만 보이는지 확인 (라이트/다크)
- [ ] 점의 왼쪽 끝이 EXPERIENCE 제목과 같은 선인지 확인 (모바일·데스크톱)
- [ ] 가로 스크롤 0
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `Experience 타임라인 점 아래 세로선 제거` (본문 `Refs #128`)
2. `docs`: `Phase 65 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/ui/TimelineItem.tsx app/_components/sections/Experience.tsx
git commit -m "style: Experience 타임라인 점 아래 세로선 제거" -m "Refs #128"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 65 작업 완료 사항 정리"

git push -u origin 128-style-experience-remove-line
```

---

## Phase 6️⃣6️⃣: 기술 스택 카테고리 소제목·배지 세로 배치 및 그룹 간격 추가

### ✅ 커밋 전 체크리스트

```
- [ ] 모든 화면에서 카테고리 소제목이 배지 위에 있는지 확인 (모바일 가운데, sm 이상 왼쪽 정렬)
- [ ] 카테고리 묶음 사이 간격(32px) 확인
- [ ] 배지 호버/포커스 시 세부 설명 패널이 정상 표시되는지 확인
- [ ] 라이트/다크 모드, 가로 스크롤 0 확인
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `기술 스택 카테고리 소제목·배지 세로 배치 및 그룹 간격 추가` (본문 `Refs #131`)
2. `docs`: `Phase 66 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/AboutInfo.tsx
git commit -m "style: 기술 스택 카테고리 소제목·배지 세로 배치 및 그룹 간격 추가" -m "Refs #131"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 66 작업 완료 사항 정리"

git push -u origin 131-style-tech-stack-column
```

---

## Phase 6️⃣7️⃣: 프로젝트 카드 사용 기술을 아이콘으로만 표시

### ✅ 커밋 전 체크리스트

```
- [ ] 프로젝트 카드 4개의 사용 기술이 아이콘으로만 보이고, 개수가 기존 태그 수와 같은지 확인
- [ ] 아이콘에 마우스를 올리면 기술 이름 툴팁이 뜨는지 확인
- [ ] 스크린 리더용 이름(sr-only)과 목록 aria-label 확인
- [ ] 라이트/다크 모드에서 아이콘이 카드 배경에 묻히지 않는지 확인
- [ ] 가로 스크롤 0
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `프로젝트 카드 사용 기술을 아이콘으로만 표시` (본문 `Refs #134`)
2. `docs`: `Phase 67 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "style: 프로젝트 카드 사용 기술을 아이콘으로만 표시" -m "Refs #134"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 67 작업 완료 사항 정리"

git push -u origin 134-style-project-tech-icons
```

---

## Phase 6️⃣8️⃣: 프로젝트 카드 색상 통일 및 이미지·세부 내용 세로 배치

### ✅ 커밋 전 체크리스트

```
- [ ] 프로젝트 카드 4개 배경이 라이트 파란색(sky)·다크 라임색으로 같은지 확인
- [ ] 카드 안 글자 대비가 WCAG AA(4.5:1) 이상인지 확인 (라이트·다크)
- [ ] 모든 화면에서 이미지 아래에 세부 내용이 오는지 확인
- [ ] 가로 스크롤 0
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `프로젝트 카드 색상 통일(라이트 파랑·다크 라임) 및 이미지·세부 내용 세로 배치` (본문 `Refs #137`)
2. `docs`: `Phase 68 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "style: 프로젝트 카드 색상 통일(라이트 파랑·다크 라임) 및 이미지·세부 내용 세로 배치" -m "Refs #137"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 68 작업 완료 사항 정리"

git push -u origin 137-style-project-card-color-layout
```

---

## Phase 6️⃣9️⃣: 프로젝트 카드 세부 내용 좌우 여백 추가 및 줄 길이 축소

### ✅ 커밋 전 체크리스트

```
- [ ] 세부 내용이 이미지 아래 가운데에 놓이는지(좌우 여백 동일) 확인 (768·1280px)
- [ ] 세부 내용 줄 길이가 짧아졌는지 확인
- [ ] 링크 아이콘이 카드 오른쪽 끝에 있는지 확인
- [ ] 모바일 레이아웃 변화 없음, 가로 스크롤 0
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `프로젝트 카드 세부 내용 좌우 여백 추가 및 줄 길이 축소` (본문 `Refs #140`)
2. `docs`: `Phase 69 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "style: 프로젝트 카드 세부 내용 좌우 여백 추가 및 줄 길이 축소" -m "Refs #140"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 69 작업 완료 사항 정리"

git push -u origin 140-style-project-detail-padding
```

---

## Phase 7️⃣0️⃣: 프로젝트 카드에 의도하지 않은 32px 기본 여백이 적용되는 문제 수정

### ✅ 커밋 전 체크리스트

```
- [ ] 프로젝트 카드의 계산된 padding이 0px인지 확인 (개발자 도구 Computed)
- [ ] 제목·이미지·링크 아이콘이 카드 가장자리에서 같은 거리(모바일 20px, sm 이상 24px)인지 확인
- [ ] Card를 padded 지정 없이 쓰는 곳은 기존처럼 p-8이 적용되는지 확인
- [ ] 라이트/다크 모드, 가로 스크롤 0 확인
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `fix`: `프로젝트 카드에 의도하지 않은 32px 기본 여백이 적용되는 문제 수정` (본문 `Refs #143`)
2. `docs`: `Phase 70 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/ui/Card.tsx app/_components/sections/Projects.tsx
git commit -m "fix: 프로젝트 카드에 의도하지 않은 32px 기본 여백이 적용되는 문제 수정" -m "Refs #143"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 70 작업 완료 사항 정리"

git push -u origin 143-fix-project-card-padding
```

---

## Phase 7️⃣1️⃣: 프로젝트 제목 가운데 정렬, 이미지 둥근 모서리·5px 여백 추가

### ✅ 커밋 전 체크리스트

```
- [ ] 프로젝트 제목이 카드 가운데에 있는지 확인
- [ ] 이미지(·영상) 모서리가 둥글게 잘리는지 확인
- [ ] 이미지 둘레 여백이 상하좌우 5px인지 확인
- [ ] 라이트/다크 모드, 모바일, 가로 스크롤 0 확인
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `프로젝트 제목 가운데 정렬, 이미지 둥근 모서리·5px 여백 추가` (본문 `Refs #146`)
2. `docs`: `Phase 71 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "style: 프로젝트 제목 가운데 정렬, 이미지 둥근 모서리·5px 여백 추가" -m "Refs #146"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 71 작업 완료 사항 정리"

git push -u origin 146-style-project-title-image
```

---

## Phase 7️⃣2️⃣: 프로젝트 카드 기술 아이콘·담당 역할 가운데 정렬

### ✅ 커밋 전 체크리스트

```
- [ ] 제목·기술 아이콘·담당 역할이 카드 가운데에 정렬되는지 확인 (모바일 줄바꿈 포함)
- [ ] 소개 문구는 왼쪽 정렬 유지 확인
- [ ] 라이트/다크 모드, 가로 스크롤 0 확인
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `프로젝트 카드 기술 아이콘·담당 역할 가운데 정렬` (본문 `Refs #149`)
2. `docs`: `Phase 72 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "style: 프로젝트 카드 기술 아이콘·담당 역할 가운데 정렬" -m "Refs #149"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 72 작업 완료 사항 정리"

git push -u origin 149-style-project-header-center
```

---

## Phase 7️⃣3️⃣: 다크 모드 프로젝트 카드 투명 배경 및 접근성·가독성 색상 조정

### ✅ 커밋 전 체크리스트

```
- [ ] 다크 모드 카드 배경이 투명한 라임(10%)이고 라임 테두리가 보이는지 확인
- [ ] 다크 모드 글자 대비 4.5:1 이상 (제목·담당 역할·소개 문구·세부 내용)
- [ ] 링크 아이콘·버튼 테두리·카드 테두리 대비 3:1 이상
- [ ] 라이트 모드 변화 없음 확인
- [ ] 가로 스크롤 0
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `다크 모드 프로젝트 카드 투명 배경 및 접근성·가독성 색상 조정` (본문 `Refs #152`)
2. `docs`: `Phase 73 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "style: 다크 모드 프로젝트 카드 투명 배경 및 접근성·가독성 색상 조정" -m "Refs #152"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 73 작업 완료 사항 정리"

git push -u origin 152-style-project-card-dark
```

---

## Phase 7️⃣4️⃣: 라이트 모드 프로젝트 링크 버튼 테두리 대비 개선

### ✅ 커밋 전 체크리스트

```
- [ ] 라이트 모드 링크 버튼 테두리 대비 3:1 이상 (파란 카드 배경 기준)
- [ ] 링크 아이콘 대비 유지, hover 색 유지
- [ ] 다크 모드 변화 없음 확인
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `라이트 모드 프로젝트 링크 버튼 테두리 대비 개선` (본문 `Refs #155`)
2. `docs`: `Phase 74 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "style: 라이트 모드 프로젝트 링크 버튼 테두리 대비 개선" -m "Refs #155"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 74 작업 완료 사항 정리"

git push -u origin 155-style-project-link-border-light
```

---

## Phase 7️⃣5️⃣: 스타일 PR 변경 전/후 스크린샷 첨부 및 PR #153·#156 스크린샷 추가

### ✅ 커밋 전 체크리스트

```
- [ ] pr-screenshots 브랜치 이미지 raw 주소가 열리는지 확인 (HTTP 200)
- [ ] PR #153·#156 본문 스크린샷 칸에 변경 전/후가 보이는지 확인
- [ ] pr-screenshots 브랜치는 dev·main에 병합하지 않음
```

### 📝 커밋 메시지

1. `docs`: `PR #153·#156 변경 전/후 스크린샷 추가` (`pr-screenshots` 브랜치)
2. `docs`: `Phase 75 작업 완료 사항 정리` (본문 `Refs #158`)

### 💻 커밋 명령어

```bash
# 스크린샷 보관 브랜치 (orphan, 병합하지 않음)
git worktree add --orphan -b pr-screenshots <경로>
git add 152 155 README.md
git commit -m "docs: PR #153·#156 변경 전/후 스크린샷 추가"
git push -u origin pr-screenshots

# 정리 문서
git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 75 작업 완료 사항 정리" -m "Refs #158"

git push -u origin 158-docs-pr-screenshots
```

---

## Phase 7️⃣6️⃣: 프로젝트 카드·이미지 가로 패딩 px-10으로 통일

### ✅ 커밋 전 체크리스트

```
- [ ] 카드 위쪽·아래쪽 가로 여백 40px (390·768·1280px, 카드 4개 동일)
- [ ] 이미지 sizes 최대 폭이 실제 표시 폭(870px)과 일치
- [ ] 가로 스크롤 0
- [ ] PR 스크린샷(변경 전/후) pr-screenshots 브랜치에 업로드
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `프로젝트 카드·이미지 가로 패딩 px-10으로 통일` (본문 `Refs #161`)
2. `docs`: `Phase 76 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "style: 프로젝트 카드·이미지 가로 패딩 px-10으로 통일" -m "Refs #161"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 76 작업 완료 사항 정리"

git push -u origin 161-style-project-card-padding
```

#### 병합 후 기록 보완

- `docs`: `Phase 76 병합 과정 정리` (본문 `Refs #164`) - PR #162·#163 병합, dev 재확인, PR 문서 수정 2건 기록

```bash
git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 76 병합 과정 정리" -m "Refs #164"

git push -u origin 164-docs-phase-76-merge
```

- `docs`: `Phase 76 기록 보완 PR 병합 내역 추가` (본문 `Refs #167`) - PR #165·#166 병합 기록

```bash
git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 76 기록 보완 PR 병합 내역 추가" -m "Refs #167"

git push -u origin 167-docs-phase-76-merge-record
```

---

## Phase 7️⃣7️⃣: 기본 폰트 Presentation(프리젠테이션)으로 변경

### ✅ 커밋 전 체크리스트

```
- [ ] 주요 페이지 body·제목 font-family가 Presentation인지 확인 (390·1280px)
- [ ] 한글이 Presentation으로 표시되는지 확인
- [ ] 실제 사용 굵기 파일만 로드되고 모두 200인지 확인
- [ ] 가로 스크롤 0
- [ ] pr-screenshots 원격 브랜치 존재 확인 후 스크린샷 업로드
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `기본 폰트 Presentation(프리젠테이션)으로 변경` (본문 `Refs #170`)
2. `docs`: `Phase 77 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/globals.css app/layout.tsx styles/typography.css
git commit -m "style: 기본 폰트 Presentation(프리젠테이션)으로 변경" -m "Refs #170"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 77 작업 완료 사항 정리"

git push -u origin 170-style-base-font-presentation
```

---

## Phase 7️⃣8️⃣: 프로젝트 이미지 클릭 시 시연 영상(배포 사이트) 열기

### ✅ 커밋 전 체크리스트

```
- [ ] 카드 4개 이미지 링크 주소 확인 (영상 우선, 없으면 배포 사이트)
- [ ] 새 탭 열기, aria-label, 키보드 포커스 표시 확인
- [ ] 안내 배지: 마우스 기기는 hover·포커스 때만, 터치 기기는 항상 표시
- [ ] 모바일 배지 크기, 가로 스크롤 0
- [ ] pr-screenshots 원격 브랜치 확인 후 스크린샷 업로드 (PR 본문은 커밋 SHA 주소)
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `feat`: `프로젝트 이미지 클릭 시 시연 영상(배포 사이트) 열기` (본문 `Refs #173`)
2. `style`: `모바일 프로젝트 이미지 안내 배지 크기 축소` (본문 `Refs #173`)
3. `docs`: `Phase 78 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "feat: 프로젝트 이미지 클릭 시 시연 영상(배포 사이트) 열기" -m "Refs #173"

git add app/_components/sections/Projects.tsx
git commit -m "style: 모바일 프로젝트 이미지 안내 배지 크기 축소" -m "Refs #173"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 78 작업 완료 사항 정리"

git push -u origin 173-feat-project-image-demo-link
```

---

## Phase 7️⃣9️⃣: 프로젝트 2열 배치 및 세부 내용별 트러블 슈팅 글 링크

### ✅ 커밋 전 체크리스트

```
- [ ] 카드 안에는 제목~이미지까지만, 세부 내용·링크는 카드 아래
- [ ] md 이상 2열, 모바일 1열, 같은 줄 카드 높이·세부 내용 시작선 동일
- [ ] "자세히 보기" 링크 6개 주소·새 탭 여부·링크 이름 확인, 글자 대비 4.5:1 이상
- [ ] 가로 스크롤 0
- [ ] pr-screenshots 원격 브랜치 확인 후 스크린샷 업로드 (PR 본문은 커밋 SHA 주소)
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `feat`: `프로젝트 2열 배치 및 세부 내용별 트러블 슈팅 글 링크` (본문 `Refs #176`)
2. `docs`: `Phase 79 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "feat: 프로젝트 2열 배치 및 세부 내용별 트러블 슈팅 글 링크" -m "Refs #176"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 79 작업 완료 사항 정리"

git push -u origin 176-feat-project-grid-detail-posts
```

---

## Phase 8️⃣0️⃣: 성장의 여정·기술 스택 사이 간격 10px 축소

### ✅ 커밋 전 체크리스트

```
- [ ] 성장의 여정 ~ 기술 스택 제목 간격 홈 270px·/about 190px (각 10px 감소)
- [ ] 가로 스크롤 0
- [ ] pr-screenshots 원격 브랜치 확인 후 스크린샷 업로드 (PR 본문은 커밋 SHA 주소)
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `성장의 여정·기술 스택 사이 간격 10px 축소` (본문 `Refs #179`)
2. `docs`: `Phase 80 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/AboutInfo.tsx
git commit -m "style: 성장의 여정·기술 스택 사이 간격 10px 축소" -m "Refs #179"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 80 작업 완료 사항 정리"

git push -u origin 179-style-about-tech-stack-gap
```

---

## Phase 8️⃣1️⃣: 메인 페이지 제목 등장 속도 조정 및 내용보다 먼저 나오게 수정

### ✅ 커밋 전 체크리스트

```
- [ ] 홈 각 구역에서 제목이 다 나온 뒤 내용이 시작되는지 (보통·빠른 스크롤, 1280·390px)
- [ ] 움직임 줄이기 설정에서도 내용이 보이는지 (motion-safe)
- [ ] pr-screenshots 원격 브랜치 확인 후 스크린샷 업로드 (PR 본문은 커밋 SHA 주소)
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `메인 페이지 제목 등장 속도 조정 및 내용보다 먼저 나오게 수정` (본문 `Refs #182`)
2. `docs`: `Phase 81 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/ui/letterTiming.ts app/_components/ui/AnimatedLetters.tsx \
  app/_components/sections/Experience.tsx app/_components/sections/Projects.tsx app/page.tsx
git commit -m "style: 메인 페이지 제목 등장 속도 조정 및 내용보다 먼저 나오게 수정" -m "Refs #182"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 81 작업 완료 사항 정리"

git push -u origin 182-style-home-heading-timing
```

---

## Phase 8️⃣2️⃣: 세부 내용·자세히 보기 간격 추가 및 화살표 앞으로 이동

### ✅ 커밋 전 체크리스트

```
- [ ] 세부 내용 끝 ~ 자세히 보기 간격 8px, 화살표가 글자 앞
- [ ] 링크가 다음 줄로 넘어갈 때 들여쓰기 없음
- [ ] 링크가 있는 줄 높이가 다른 줄과 같음
- [ ] pr-screenshots 원격 브랜치 확인 후 스크린샷 업로드 (PR 본문은 커밋 SHA 주소)
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `세부 내용·자세히 보기 간격 추가 및 화살표 앞으로 이동` (본문 `Refs #185`)
2. `fix`: `자세히 보기 링크 줄 높이 어긋남 수정` (본문 `Refs #185`)
3. `docs`: `Phase 82 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/_components/sections/Projects.tsx
git commit -m "style: 세부 내용·자세히 보기 간격 추가 및 화살표 앞으로 이동" -m "Refs #185"

git add app/_components/sections/Projects.tsx
git commit -m "fix: 자세히 보기 링크 줄 높이 어긋남 수정" -m "Refs #185"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 82 작업 완료 사항 정리"

git push -u origin 185-style-detail-link-arrow
```

#### 병합 후 기록 보완

- `docs`: `Phase 82 병합·브랜치 정리 기록` (본문 `Refs #188`) - PR #186·#187 병합, dev 재확인, 브랜치 정리

```bash
git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 82 병합·브랜치 정리 기록" -m "Refs #188"

git push -u origin 188-docs-phase-82-merge
```

---

## Phase 8️⃣3️⃣: About Me mt 제거 및 간격 gap-20으로 축소

### ✅ 커밋 전 체크리스트

```
- [ ] 성장의 여정 ~ 기술 스택 제목 간격 홈·/about 모두 110px
- [ ] 다른 섹션 간격(ABOUT ME ↔ EXPERIENCE 등) 변화 없음
- [ ] 가로 스크롤 0
- [ ] pr-screenshots 원격 브랜치 확인 후 스크린샷 업로드 (PR 본문은 커밋 SHA 주소)
- [ ] 프로덕션 빌드: bun run build
```

### 📝 커밋 메시지

1. `style`: `About Me mt 제거 및 간격 gap-20으로 축소` (본문 `Refs #191`)
2. `docs`: `Phase 83 작업 완료 사항 정리`

### 💻 커밋 명령어

```bash
git add app/page.tsx app/_components/sections/AboutSections.tsx app/_components/sections/AboutInfo.tsx
git commit -m "style: About Me mt 제거 및 간격 gap-20으로 축소" -m "Refs #191"

git add "docs/ PHASE_SUMMARY.md" docs/PHASE_COMMITS.md
git commit -m "docs: Phase 83 작업 완료 사항 정리"

git push -u origin 191-style-about-gap
```

---

## 🚀 커밋 명령어 템플릿

```bash
# 기본 패턴
git add [파일들]
git commit -m "[타입]: [한글 메시지]"
git push

# 예시
git add tailwind.config.ts styles/typography.css lib/constants.ts
git commit -m "feat: 색상, 폰트, 다크모드 시스템 설정"
git push
```
