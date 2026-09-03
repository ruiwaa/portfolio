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

| Phase | 타입 | 메시지 | 파일 |
|-------|------|--------|------|
| 1 | feat | 색상, 폰트, 다크모드 시스템 설정 | config, css |
| 2 | feat | 헤더 네비게이션 컴포넌트 추가 | Header.tsx |
| 3 | feat | 테마 토글 버튼 추가 | ThemeToggle.tsx |
| 4 | feat | Card, Badge 기본 컴포넌트 추가 | ui/*.tsx |
| 5 | feat | MY RECORDER 카드 섹션 추가 | MyRecorder.tsx |
| 6 | feat | 경력 타임라인과 프로젝트 카드 추가 | Experience.tsx |
| 7 | feat | Posts 페이지와 카테고리 필터 추가 | Posts.tsx |
| 8 | feat | Resume 페이지와 그리드 배경 추가 | Resume.tsx |
| 라이트 | style | 모든 컴포넌트에 라이트 모드 스타일 추가 | *.tsx |
| 최종 | perf | 최종 검증 및 성능 최적화 완료 | . |

---

## 🚀 커밋 명령어 템플릿

```bash
# Phase 1-8 (기본 패턴)
git add [파일들]
git commit -m "[타입]: [한글 메시지]"
git push

# 예시
git add tailwind.config.ts styles/typography.css lib/constants.ts
git commit -m "feat: 색상, 폰트, 다크모드 시스템 설정"
git push
```

---

**각 Phase 끝날 때마다 이 가이드를 참고하면 돼!** ✨
