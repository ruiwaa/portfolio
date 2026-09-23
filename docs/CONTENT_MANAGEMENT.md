# 콘텐츠 관리

## 개요

포트폴리오 콘텐츠 관리 방식을 Supabase에서 Git 기반 Markdown으로 전환했습니다. 각 프로젝트의 깊이 있는 내용(기술 결정, 트러블슈팅, 회고)은 프로젝트별 마크다운으로 관리하고, 기술 블로그는 Velog와 연동합니다. 포트폴리오에서 직접 작성하는 글(운영기, 회고 등)은 프로젝트 케이스 스터디와 동일한 패턴으로 로컬 Markdown 파일로 관리합니다.

## 배경

### 이전 방식 (Supabase)의 문제점

- Supabase Free 플랜: 무활동 1주 후 자동 sleeping
- 포트폴리오 posts 테이블이 꺼지면 게시글 접근 불가능
- 콘텐츠 관리를 위한 Admin UI 필요
- 버전 관리 불가능 (히스토리 없음)

### 새로운 방식의 이점

- 안정성: DB 의존도 제거 (sleeping 걱정 없음)
- 간편성: 로컬 파일 + Git 기반 (Admin UI 불필요)
- 버전 관리: 콘텐츠 변경 히스토리 추적 가능
- 자동 배포: CI/CD로 즉시 반영
- 기존 자산 활용: 벨로그 글 재사용

## 구조

### 1. 프로젝트별 Case Study (Markdown)

**파일 위치:**

- `app/(routes)/projects/[id]/page.tsx` — 모든 프로젝트가 공유하는 동적 라우트
- `projects/haengsho-market/*.md` (기술 글, 파일명 자유 - 폴더 안 .md 파일 중 이름순으로 첫 번째를 읽음)
- `projects/haengsho-market/images/` (이미지, 선택)
- `projects/junghdaneo-changgo/*.md` (기술 글)
- `projects/junghdaneo-changgo/images/` (이미지, 선택)

각 프로젝트 폴더에는 `.md` 파일을 하나만 두는 것을 권장합니다 (여러 개면 이름순으로 첫 번째만 읽힘). 파일명은 자유지만, 관례상 `case-study.md`를 사용합니다.

**내용 구성:**

각 프로젝트의 특성에 맞게 자유로운 형식으로 작성합니다. 공통 요소는 frontmatter 메타데이터뿐입니다.

**Frontmatter 형식:**

```yaml
---
title: "프로젝트명"
duration: "개발 기간 (예: 3개월)"
role: "담당 역할 (예: 풀스택 프론트엔드)"
technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"]
---
```

**본문 작성 예시:**

```markdown
# 기술적 결정

## 상태 관리

- Context API vs TanStack Query 비교
- 최종 선택 및 이유

# 트러블슈팅

## 이슈 1

- 문제 상황
- 해결 방법
- 배운 점

# 회고

- 잘한 점
- 개선할 점
- 다음에 적용할 학습
```

**마크다운 렌더링:**

- 파서: gray-matter (frontmatter 분리)
- 렌더러: MDXRemote (마크다운 → HTML)
- 구현 위치: lib/projects.ts

### 2. 기술 블로그 (Velog)

**위치:** velog.io/@ruiwaa

**포트폴리오 표시:**

- app/_components/sections/Posts.tsx의 velogPosts 배열에 메타데이터 저장
- 클릭 시 → velog.io로 외부 링크

**메타데이터 형식:**

```typescript
{
  id: 1,
  title: "포스트 제목",
  excerpt: "요약",
  date: "2024-01-15",
  url: "https://velog.io/@ruiwaa/post-slug",
  readingTime: 8,
  category: "트러블슈팅", // "트러블슈팅" | "회고" | "기획" | "개발" (lib/constants.ts의 POST_CATEGORIES)
  project: "중단어 창고", // 트러블슈팅 탭에서 프로젝트별 아코디언 그룹핑에 사용
  tags: ["tag1", "tag2"]
}
```

### 3. 포트폴리오 직접 작성 글 (Markdown)

**파일 위치:**

- `posts/<slug>/*.md` (파일명 자유 - 폴더 안 .md 파일 중 이름순으로 첫 번째를 읽음, 관례상 `post.md` 사용)

**Frontmatter 형식:**

```yaml
---
title: "글 제목"
excerpt: "요약"
date: "2026-09-22"
category: "회고" # "트러블슈팅" | "회고" | "기획" | "개발"
project: "포트폴리오" # 트러블슈팅 탭에서 프로젝트별 아코디언 그룹핑에 사용
tags: ["tag1", "tag2"]
readingTime: 10
---
```

프로젝트 케이스 스터디(`projects/<id>/case-study.md`)와 동일한 gray-matter + MDXRemote 파이프라인을 쓰지만, frontmatter가 `duration`/`role` 대신 `excerpt`/`category`/`project`/`tags`/`readingTime`을 씁니다 (Velog 메타데이터 형식과 통일).

**렌더링:**

- 구현 위치: `lib/posts.ts` (`getAllLocalPostIds`, `getLocalPost`, `getAllLocalPosts`)
- 라우트: `app/(routes)/posts/[id]/page.tsx`
- Posts 섹션(`app/_components/sections/Posts.tsx`)이 `velogPosts` 배열과 `getAllLocalPosts()` 결과를 날짜순으로 합쳐 한 목록을 만들고, 클라이언트 컴포넌트 `PostsList.tsx`가 카테고리 탭(전체/트러블슈팅/회고/기획/개발)으로 필터링해 렌더링 — 로컬 글은 내부 링크(`/posts/[id]`), Velog 글은 외부 링크로 연결됩니다.
- 트러블슈팅 탭은 `project` 값으로 그룹핑해 프로젝트별 아코디언(호버로 열기, 클릭으로 토글)으로 렌더링됩니다.
- 선택된 탭은 URL 쿼리스트링 `?tab=<카테고리명>`으로 저장됩니다 (전체는 파라미터 생략). 새로고침·직접 링크 공유 시에도 같은 탭이 유지됩니다. `useSearchParams`를 쓰는 클라이언트 컴포넌트라 `Posts.tsx`에서 `<Suspense>`로 감싸 정적 렌더링을 유지합니다.
- 카테고리 값 목록: `lib/constants.ts`의 `POST_CATEGORIES`

## 워크플로우

### Case Study 추가/수정

```bash
# 1. 로컬에서 마크다운 작성
vim projects/haengsho-market/case-study.md

# 2. 이미지 추가 (필요시)
# projects/haengsho-market/images/ 에 저장
# 마크다운에서: ![alt](./images/filename.png)

# 3. Git 커밋
git add projects/haengsho-market/case-study.md
git commit -m "docs: haengsho-market case study 추가"

# 4. Push
git push origin [branch-name]

# 5. 자동 배포
# Vercel이 빌드 → yeji.dev에 즉시 반영
```

### Velog 포스트 추가

```bash
# 1. velog.io에서 직접 작성 및 발행

# 2. 포트폴리오에 등록
# app/_components/sections/Posts.tsx의 velogPosts 배열에 추가
git add app/_components/sections/Posts.tsx
git commit -m "docs: velog 포스트 추가"
git push origin main
```

### 포트폴리오 직접 작성 글 추가

```bash
# 1. 로컬에서 마크다운 작성
mkdir posts/[slug]
vim posts/[slug]/post.md

# 2. Git 커밋
git add posts/[slug]/post.md
git commit -m "docs: [slug] 글 추가"

# 3. Push
git push origin [branch-name]

# 4. 자동 배포
```

## 기술 구현

### 마크다운 파일 탐색 (lib/markdown.ts)

- findMarkdownFile(dir): 폴더 안 .md 파일을 이름순으로 찾아 전체 경로 반환 (파일명 고정 아님)
- lib/projects.ts, lib/posts.ts가 공통으로 사용

### 마크다운 파싱 (lib/projects.ts)

- getProject(projectId): findMarkdownFile로 찾은 파일을 읽어 파싱
- gray-matter로 frontmatter 분리
- 마크다운 content 추출
- 프로젝트 페이지에서 MDXRemote로 렌더링

### 마크다운 파싱 (lib/posts.ts)

- getLocalPost(slug): findMarkdownFile로 찾은 파일을 읽어 파싱 (구조는 lib/projects.ts와 동일)
- getAllLocalPosts(): posts/ 디렉토리 전체를 읽어 Posts 섹션 목록에 전달

### Posts 섹션 (app/_components/sections/Posts.tsx)

- velogPosts 배열(외부 Velog 링크)과 getAllLocalPosts() 결과(로컬 글)를 날짜순으로 병합
- 각 포스트 카드 렌더링
- 로컬 글 → 내부 링크(`/posts/[id]`), Velog 글 → 외부 링크(velog.io, 새 탭)

## 마크다운 작성 규칙

### 이미지 참조

```markdown
![설명](./images/filename.png)
```

- 상대 경로 사용
- 프로젝트 폴더 내 images 디렉토리에 저장

### Frontmatter

- 프로젝트 케이스 스터디 (`projects/<id>/*.md`, 파일명 자유): 필수 - title, duration, role / 선택 - technologies
- 포트폴리오 직접 작성 글 (`posts/<slug>/*.md`, 파일명 자유): 필수 - title, excerpt, date, category, project, readingTime / 선택 - tags

### 본문 형식

- 자유로운 마크다운 구조
- 헤딩, 코드 블록, 표 등 모두 지원
- GitHub Flavored Markdown 문법 준수

## 마이그레이션 기록

### 2026-09-22

- Supabase posts 테이블 비활성화
- Case Study 마크다운 방식으로 전환
- Velog 외부 링크 연동 시작
- Velog(@ruiwaa) 발행글 20개를 velogPosts 배열에 실제 등록
- 포트폴리오 직접 작성 글을 위한 posts/<slug>/post.md 구조 추가 (lib/posts.ts, app/(routes)/posts/[id]/page.tsx)
- 기존 projects/portfolio/case-study.md를 posts/portfolio-cms-migration/post.md로 이전

### 2026-09-23

- 학습노트 태그 Velog 글 4개 제거
- velogPosts와 posts/<slug>/post.md frontmatter에 category 필드 추가 (트러블슈팅/회고/기획/개발)
- Posts 섹션에 카테고리 탭 필터(PostsList.tsx, 클라이언트 컴포넌트) 추가
- 포트폴리오 CMS 마이그레이션 글 카테고리를 회고 → 트러블슈팅으로 수정
- velogPosts와 posts/<slug>/post.md frontmatter에 project 필드 추가, 트러블슈팅 탭을 프로젝트별 아코디언(중단어 창고/포트폴리오)으로 재구성
- lib/markdown.ts 추가: projects/posts 폴더의 마크다운 파일명 고정(case-study.md/post.md) 대신, 폴더 안 .md 파일을 이름순으로 찾아 읽도록 변경
- Posts 탭 선택 상태를 URL 쿼리스트링(`?tab=`)과 동기화 (useSearchParams + Suspense)

## 향후 개선

- Velog RSS 피드 자동 파싱
- 검색 기능 추가
- Case Study 자동 목차 생성
