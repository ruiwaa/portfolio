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
