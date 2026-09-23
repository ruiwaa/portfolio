# 콘텐츠 관리

## 개요

포트폴리오 콘텐츠 관리 방식을 Supabase에서 Git 기반 Markdown/Velog로 전환했습니다. 프로젝트별 트러블슈팅·회고를 포함한 모든 글은 `posts/` 폴더의 로컬 Markdown 또는 Velog 외부 링크, 두 가지로만 관리하며, 프로젝트 카드의 "포스트" 링크는 이 중 하나로 연결됩니다. 별도의 프로젝트 상세 페이지는 두지 않습니다.

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

### 1. 기술 블로그 (Velog)

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
  category: "트러블슈팅", // "트러블슈팅" | "회고" | "기획" | "개발" (lib/constants.ts의 POST_CATEGORIES)
  project: "중단어 창고", // 트러블슈팅 탭에서 프로젝트별 아코디언 그룹핑에 사용
  tags: ["tag1", "tag2"]
}
```

### 2. 포트폴리오 직접 작성 글 (Markdown)

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
---
```

`project` 값은 Experience 섹션의 프로젝트 카드 제목과 맞춰야 트러블슈팅 탭 아코디언에서 같은 그룹으로 묶입니다 (예: "예매의 정석", "중단어 창고", "포트폴리오").

**렌더링:**

- 파서: gray-matter (frontmatter 분리)
- 렌더러: MDXRemote (마크다운 → HTML)
- 구현 위치: `lib/posts.ts` (`getAllLocalPostIds`, `getLocalPost`, `getAllLocalPosts`), `lib/markdown.ts` (`.md` 파일 탐색)
- 라우트: `app/(routes)/posts/[id]/page.tsx`
- Posts 섹션(`app/_components/sections/Posts.tsx`)이 `velogPosts` 배열과 `getAllLocalPosts()` 결과를 날짜순으로 합쳐 한 목록을 만들고, 클라이언트 컴포넌트 `PostsList.tsx`가 카테고리 탭(전체/트러블슈팅/회고/기획/개발)으로 필터링해 렌더링 — 로컬 글은 내부 링크(`/posts/[id]`), Velog 글은 외부 링크로 연결됩니다.
- 트러블슈팅 탭은 `project` 값으로 그룹핑해 프로젝트별 아코디언(호버로 열기, 클릭으로 토글)으로 렌더링됩니다.
- 선택된 탭은 URL 쿼리스트링 `?tab=<카테고리명>`으로 저장됩니다 (전체는 파라미터 생략). 새로고침·직접 링크 공유 시에도 같은 탭이 유지됩니다. `useSearchParams`를 쓰는 클라이언트 컴포넌트라 `Posts.tsx`에서 `<Suspense>`로 감싸 정적 렌더링을 유지합니다.
- 카테고리 값 목록: `lib/constants.ts`의 `POST_CATEGORIES`

### 3. 프로젝트 카드의 포스트 링크

Experience 섹션(`app/_components/sections/Projects.tsx`)의 각 프로젝트 카드에는 "포스트" 아이콘 링크가 있습니다. 이 링크는 별도의 프로젝트 상세 페이지가 아니라, 그 프로젝트를 다룬 **Velog 글 또는 `posts/` 로컬 글**로 바로 연결됩니다.

- 로컬 글이 있으면: `links.post`에 해당 글의 `/posts/[id]` 경로, 또는 트러블슈팅 탭에서 프로젝트별로 모아보게 하려면 `/posts?tab=트러블슈팅`
- 아직 글이 없으면: `"#"` 플레이스홀더로 둡니다

## 워크플로우

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

### 마크다운 파싱 (lib/posts.ts)

- getLocalPost(slug): findMarkdownFile로 찾은 파일을 읽어 파싱
- getAllLocalPosts(): posts/ 디렉토리 전체를 읽어 Posts 섹션 목록에 전달

### Posts 섹션 (app/_components/sections/Posts.tsx)

- velogPosts 배열(외부 Velog 링크)과 getAllLocalPosts() 결과(로컬 글)를 날짜순으로 병합
- 각 포스트 카드 렌더링
- 로컬 글 → 내부 링크(`/posts/[id]`), Velog 글 → 외부 링크(velog.io, 새 탭)

## 마크다운 작성 규칙

### Frontmatter

- 필수: title, excerpt, date, category, project
- 선택: tags

### 본문 형식

- 자유로운 마크다운 구조
- 헤딩, 코드 블록, 표 등 모두 지원
- GitHub Flavored Markdown 문법 준수
- MDXRemote로 렌더링되므로 본문에 원본 HTML을 그대로 붙여넣을 때는 JSX로 파싱 가능한 문법인지 확인 (예: `style="padding: 30px"` 같은 문자열 style 속성은 JSX에서 에러가 남 - 필요 없으면 래퍼 태그 자체를 제거)

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
- Experience 섹션 중단어 창고 카드의 포스트 링크를 /posts?tab=트러블슈팅으로 연결
- **projects/<id>/case-study.md + app/(routes)/projects/[id]/page.tsx + lib/projects.ts 시스템을 완전히 제거**하고 posts/로 통합 — 별도 프로젝트 상세 페이지 없이, 프로젝트 카드의 포스트 링크는 Velog 글 또는 posts/ 로컬 글로만 연결
- yeamaeui-jeongseok 프로젝트의 리팩토링 기록을 posts/yeamaeui-jeongseok-refactoring/post.md로 이전 (category: 트러블슈팅, project: 예매의 정석)
- 내용이 비어 있던 genova-audio-toolkit/haengsho-market/junghdaneo-changgo의 case-study.md 플레이스홀더는 삭제 (실제 작성된 콘텐츠 없었음)
- 예매의 정석 카드의 포스트 링크를 /posts?tab=트러블슈팅 대신 /posts/yeamaeui-jeongseok-refactoring으로 직접 연결
- frontmatter가 없는 글 때문에 발생한 Posts 페이지 크래시 수정 - lib/posts.ts에 isValidFrontmatter 검증 추가 (필수 필드 누락 시 콘솔 경고만 남기고 목록에서 제외)
- readingTime 필드를 frontmatter/타입에서 완전히 제거 (카드·상세 페이지 표시는 이미 제거된 상태였음)
- posts/final-project/likeBtn_trouble_shooting.md, posts/final-project-proxy/proxy_trouble_shooting.md 추가 (project: 최종 프로젝트 - 실제 프로젝트명 확인 필요)

## 향후 개선

- Velog RSS 피드 자동 파싱
- 검색 기능 추가
