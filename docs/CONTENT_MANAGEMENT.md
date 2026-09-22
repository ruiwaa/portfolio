# 콘텐츠 관리

## 개요

포트폴리오 콘텐츠 관리 방식을 Supabase에서 Git 기반 Markdown으로 전환했습니다. 각 프로젝트의 깊이 있는 내용(기술 결정, 트러블슈팅, 회고)은 프로젝트별 마크다운으로 관리하고, 기술 블로그는 Velog와 연동합니다.

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

- `projects/haengsho-market/page.tsx` (프로젝트 상세 페이지)
- `projects/haengsho-market/case-study.md` (기술 글)
- `projects/haengsho-market/images/` (이미지)
- `projects/junghdaneo-changgo/page.tsx` (프로젝트 상세 페이지)
- `projects/junghdaneo-changgo/case-study.md` (기술 글)
- `projects/junghdaneo-changgo/images/` (이미지)

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

**위치:** velog.io/@예지

**포트폴리오 표시:**

- app/posts/page.tsx의 velogPosts 배열에 메타데이터 저장
- 클릭 시 → velog.io로 외부 링크

**메타데이터 형식:**

```typescript
{
  id: 1,
  title: "포스트 제목",
  excerpt: "요약",
  date: "2024-01-15",
  url: "https://velog.io/@예지/post-slug",
  readingTime: 8,
  tags: ["tag1", "tag2"]
}
```

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
# app/posts/page.tsx의 velogPosts 배열에 추가
git add app/posts/page.tsx
git commit -m "docs: velog 포스트 추가"
git push origin main
```

## 기술 구현

### 마크다운 파싱 (lib/projects.ts)

- getProject(projectId): 특정 프로젝트의 case-study.md 파싱
- gray-matter로 frontmatter 분리
- 마크다운 content 추출
- 프로젝트 페이지에서 MDXRemote로 렌더링

### Posts 페이지 (app/posts/page.tsx)

- velogPosts 배열 정의 (메타데이터)
- 각 포스트 카드 렌더링
- 외부 링크로 velog.io 연결

## 마크다운 작성 규칙

### 이미지 참조

```markdown
![설명](./images/filename.png)
```

- 상대 경로 사용
- 프로젝트 폴더 내 images 디렉토리에 저장

### Frontmatter

- 필수: title, duration, role
- 선택: technologies, tags 등

### 본문 형식

- 자유로운 마크다운 구조
- 헤딩, 코드 블록, 표 등 모두 지원
- GitHub Flavored Markdown 문법 준수

## 마이그레이션 기록

### 2026-09-22

- Supabase posts 테이블 비활성화
- Case Study 마크다운 방식으로 전환
- Velog 외부 링크 연동 시작

## 향후 개선

- Velog RSS 피드 자동 파싱
- 포스트 태그 기반 필터링
- 검색 기능 추가
- Case Study 자동 목차 생성
