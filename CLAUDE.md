@AGENTS.md

<!-- 위 줄은 next dev가 관리하는 AGENTS.md를 불러온다. AGENTS.md는 다시 쓰이므로 프로젝트 안내는 이 파일에 적는다. -->

# YEJI 포트폴리오

- **스택**: Next.js 16 (App Router) + React 19 + TypeScript 5 + Tailwind CSS 4, 패키지 매니저 bun
- **포스트**: `posts/<slug>/`의 로컬 Markdown(`lib/posts.ts`, gray-matter + next-mdx-remote) 또는 Velog 외부 링크. DB는 쓰지 않는다(Supabase에서 전환)
- **배포**: Vercel. 작업 브랜치 → `dev` → `main` 순서로 병합한다

## 응답

모든 보고·질문·이슈·PR·문서는 한국어로 쓴다. 코드·명령·경로는 그대로 둔다.

## 작업 순서 = 스킬

작업 순서는 `.claude/skills/`의 스킬을 따른다. 사람이 읽는 요약은 `docs/WORKFLOW.md`다.

| 요청 | 스킬 |
|---|---|
| "~ 바꿔줘", "~ 고쳐줘" | `fix-request` |
| "이슈 만들고 커밋부터 병합까지 진행해" | `merge-flow` |
| "브랜치 정리해" | `branch-cleanup` |
| "작업 내용 정리 문서에 작성해" | `docs-only` |

## 작업별로 먼저 볼 문서

| 할 일 | 문서 |
|---|---|
| 모든 작업 | `docs/RULES.md` (보안, 커밋, 컴포넌트 300줄 분리 규칙) |
| 컴포넌트·코드 작성 | `docs/CODING_CONVENTIONS.md`, `docs/SEMANTIC_HTML_A11Y.md` |
| 색·폰트·다크 모드 | `docs/DESIGN_SYSTEM_IMPLEMENTATION.md`, `docs/DARK_MODE_IMPLEMENTATION.md` |
| 폴더 구조·데이터 흐름 | `docs/ARCHITECTURE.md` |
| 사이트 목적·사용자 여정 | `docs/DOMAIN.md` |
| 포스트 추가·수정 | `docs/CONTENT_MANAGEMENT.md` |
| 검사·측정 | `docs/TESTING.md` |
| 성능·보안 점검 | `docs/PERFORMANCE.md`, `docs/SECURITY.md` |
| 지난 작업 기록 | `docs/ PHASE_SUMMARY.md` (파일 이름 앞에 공백 있음), `docs/PHASE_COMMITS.md` |

## 주의

- 검사 명령은 `bunx tsc --noEmit`, `bunx eslint`, `bun run build`다. 오래된 문서에 나오는 `bun run type-check`, `bun run format`은 `package.json`에 없다.
- `docs/Pr_template.md`는 빈 템플릿으로 둔다. 채운 PR 초안은 저장소 밖에 저장한다(`merge-flow` 6단계).
- `gh`는 `ruiwaa/portfolio`에만 쓴다.
