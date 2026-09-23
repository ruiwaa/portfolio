---
title: "Supabase에서 Markdown으로: 포트폴리오 콘텐츠 관리 마이그레이션"
excerpt: "Supabase 기반 콘텐츠 관리가 겪은 sleep·분산 관리·버전 관리 문제를 Git 기반 Markdown 구조로 해결한 과정을 기록합니다."
date: "2026-09-22"
tags: ["Next.js", "Markdown", "Architecture"]
readingTime: 10
---

## 들어가며

포트폴리오 사이트에서 게시글(Posts)을 관리하기 위해 Supabase 데이터베이스와 직접 만든 Admin UI를 사용해왔습니다. 그런데 실제 운영해보니 생각보다 많은 문제점들이 발생했고, 결국 완전히 다른 방식으로 마이그레이션하기로 결정했습니다. 그 과정을 기록합니다.

---

## 문제 상황

### 1. Supabase Free 플랜의 Sleep 문제

Supabase Free 플랜은 무활동 1주일 후 프로젝트가 자동으로 sleep 상태가 됩니다.

포트폴리오는 정적인 콘텐츠가 대부분이라 평소에 자주 들어가지 않습니다. 그럼 당연히 Supabase가 sleep 상태가 되는데, 방문자가 정확히 그 시점에 Posts 페이지를 클릭하면?

```
[방문자] Posts 페이지 진입
  ↓
[포트폴리오] Supabase에서 posts 테이블 쿼리
  ↓
[Supabase] 우리 프로젝트가 sleep 상태임. 깨우는 중...
  ↓
[방문자] 게시글 목록이 안 뜸 (DB가 깨어날 때까지 대기)
```

다른 섹션(About/Experience/Projects)은 모두 정적 콘텐츠라서 이런 리스크가 없는데, Posts만 홀로 DB 의존성을 안고 있었습니다.

### 2. 분산된 콘텐츠 관리

기술 글은 Velog에 꾸준히 발행하고 있는데, 포트폴리오에서도 그 글들을 소개하려면 Admin UI를 통해 따로 등록해야 했습니다.

작성 흐름:

```
Velog에서:           포트폴리오 Admin에서:
1. 글 작성           1. 로그인
2. 발행              2. 에디터로 글 정보 입력
3. 완료              3. 썸네일 업로드
                     4. 발행
                     → 총 2군데를 관리해야 함
```

결과적으로:

- 정작 글을 쓰는 곳(Velog)과 소개하는 곳(포트폴리오)이 분리됨
- Admin UI 때문에 또 다른 콘텐츠 관리 시스템이 생김
- 일관성 유지하기 어려움

### 3. 버전 관리 불가능

DB 테이블에만 있는 데이터라 git처럼 버전 관리를 할 방법이 없었습니다.

- 글을 수정했을 때 이전 버전 확인 불가능
- 실수로 삭제했을 때 복구 방법 없음
- 변경 히스토리 추적 불가능

---

## 해결 과정

### 1단계: 근본 원인 파악

세 가지 문제의 공통점을 찾아보니:

- **Supabase sleep** → DB 없앨 수 없을까?
- **분산된 관리** → 이미 Velog에 발행된 글을 그대로 재사용할 수는?
- **버전 관리 불가** → Git에서 관리할 수 있는 형식이 필요

결론: 모든 콘텐츠를 정적 파일 + Git으로 관리하자

### 2단계: 새로운 구조 설계

**기술 블로그 (Posts):**

- Velog에서 발행된 글 메타데이터만 배열로 관리
- 포트폴리오에서는 그 배열을 읽어서 Velog 링크로 표시
- 포트폴리오에서 직접 쓴 글은 Markdown + Frontmatter로 관리
- DB 쿼리 제거, Admin UI 삭제

```typescript
// app/_components/sections/Posts.tsx
const velogPosts: VelogPost[] = [
  {
    id: 1,
    title: "React Hooks 최적화",
    excerpt: "useCallback, useMemo의 올바른 사용",
    date: "2024-01-15",
    url: "https://velog.io/@ruiwaa/react-hooks",
    readingTime: 8,
    tags: ["React"],
  },
  // ... 더 많은 글들
];
```

**프로젝트 케이스 스터디:**

- 각 프로젝트 폴더에 case-study.md 파일 추가
- Markdown + Frontmatter 형식
- 빌드 시점에 정적 생성

파일 구조:

```
app/(routes)/
├── projects/[id]/page.tsx   ← 모든 프로젝트가 공유하는 동적 라우트
└── posts/[id]/page.tsx      ← 모든 글이 공유하는 동적 라우트

projects/
├── haengsho-market/
│   ├── case-study.md
│   └── images/ (선택)

posts/
├── portfolio-cms-migration/
│   └── post.md
```

### 3단계: 기술 구현

**마크다운 파싱 라이브러리:**

```bash
bun add gray-matter next-mdx-remote remark-gfm
```

**lib/projects.ts 구현:**

```typescript
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export interface ProjectFrontmatter {
  title: string;
  duration: string;
  role: string;
  technologies?: string[];
}

export interface ProjectData {
  frontmatter: ProjectFrontmatter;
  content: string;
}

const PROJECTS_DIR = path.join(process.cwd(), "projects");

// projects/ 아래 case-study.md를 가진 폴더 이름을 전부 반환 - generateStaticParams에서 사용
export async function getAllProjectIds(): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(PROJECTS_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export async function getProject(
  projectId: string,
): Promise<ProjectData | null> {
  const filePath = path.join(PROJECTS_DIR, projectId, "case-study.md");

  let raw: string;
  try {
    raw = await readFile(filePath, "utf-8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);

  return {
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}
```

이 글 자체도 이 구조를 그대로 따라 `posts/portfolio-cms-migration/post.md`로 관리됩니다. `lib/posts.ts`가 같은 패턴으로 `posts/` 디렉터리를 읽어 목록과 상세 페이지를 만듭니다.

---

## 트러블슈팅

### 문제: HTTP 404 상태 코드 vs 200

존재하지 않는 프로젝트로 접근하면 Next.js는 notFound() 함수를 호출해 "찾을 수 없습니다" 페이지를 표시합니다.

그런데 curl로 확인해보니 HTTP 상태 코드가 404가 아닌 200으로 응답되고 있었습니다.

**원인:**

앱 루트에 app/loading.tsx(스트리밍 경계)가 있어서, 응답이 이미 200으로 스트리밍을 시작한 이후에 notFound()가 던져지는 구조였습니다.

흐름:

```
1. 클라이언트가 요청
   ↓
2. app/loading.tsx의 스트리밍 시작 (상태 200으로 응답 헤더 전송)
   ↓
3. 페이지 렌더링 중 notFound() 호출
   ↓
4. 하지만 이미 헤더는 전송된 후 (상태 코드 변경 불가)
```

**해결:**

Next.js 공식 문서에 명시된 표준 동작입니다.

- 콘텐츠는 정상적으로 "찾을 수 없습니다"로 표시됨 (soft 404)
- noindex 메타 태그가 자동으로 추가되어 검색엔진에 노출되지 않음
- 진짜 HTTP 404가 필요하려면 스트리밍 경계 구조 전체를 바꿔야 함 (별도 이슈로 분리)

---

## 최종 결과

| 항목        | 이전                    | 이후                    |
| ----------- | ----------------------- | ----------------------- |
| DB 안정성   | Supabase sleep 위험     | ✅ DB 의존도 0          |
| 콘텐츠 관리 | Admin UI 필수           | ✅ Git 기반             |
| 버전 관리   | 없음                    | ✅ 커밋 히스토리        |
| 배포        | 수동 (Admin에서)        | ✅ Git push → 자동 배포 |
| 유지보수    | Admin UI 코드 유지 필요 | ✅ 간단함               |

### 삭제된 코드

```
- app/api/posts/** (Posts API 엔드포인트)
- app/admin/** (Admin 페이지 전체)
- app/_lib/admin-*.ts (Admin 관련 함수)
- lib/{supabase,supabase-server}.ts (Supabase 클라이언트)
- 의존성: @supabase/ssr, @supabase/supabase-js, @tanstack/react-query, @tiptap/*
```

### 추가된 코드

```
- lib/projects.ts (프로젝트 케이스 스터디 마크다운 파싱)
- lib/posts.ts (포트폴리오 직접 작성 글 마크다운 파싱)
- app/(routes)/projects/[id]/page.tsx (case-study 렌더링)
- app/(routes)/posts/[id]/page.tsx (post 렌더링)
- projects/*/case-study.md (4개 프로젝트)
- posts/*/post.md (포트폴리오 직접 작성 글)
- docs/CONTENT_MANAGEMENT.md (관리 문서)
```

---

## 배운 점

### 1. "정적일 수 있으면 정적이 낫다"

처음엔 Posts를 동적으로 관리하는 게 유연할 거라고 생각했는데, 실제로는:

- 콘텐츠 변경이 그리 자주 일어나지 않음
- Admin UI는 오히려 복잡도만 증가시킴
- 정적 파일 + Git이 오히려 안전하고 추적 가능함

### 2. "콘텐츠 소스는 하나로"

Velog와 포트폴리오 Admin에 나눠진 콘텐츠 관리는 결국 동기화 문제를 낳습니다.

- Velog는 이미 완성된 블로그 플랫폼
- 포트폴리오는 그걸 소개하는 역할만
- 굳이 또 다른 관리 시스템을 만들 필요가 없었음

### 3. "의존성 제거는 신중하게"

Supabase, TanStack Query, Tiptap을 제거하기 전에 grep으로 모든 사용처를 확인했습니다.

- 단순히 "이 라이브러리 제거해도 될까"라고 가정하지 않음
- 실제로 다른 곳에서 쓰이고 있을 수 있음
- 제거 후 회귀 위험을 최소화

---

## 결론

포트폴리오 콘텐츠 관리 방식을 Markdown + Git 기반으로 전환함으로써:

✅ DB 의존성 제거 (Supabase sleep 문제 해결)
✅ Admin UI 삭제 (유지보수 부담 감소)
✅ 버전 관리 추가 (히스토리 추적 가능)
✅ 자동 배포 (Git push → 즉시 반영)

이제 새로운 콘텐츠를 추가하는 방법은:

1. 프로젝트 케이스 스터디: `projects/[projectName]/case-study.md` 작성
2. 직접 쓰는 글: `posts/[slug]/post.md` 작성
3. Git commit/push
4. Vercel이 자동으로 빌드 및 배포

단순하고 안정적입니다.
