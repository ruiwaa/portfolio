# 예지의 프론트엔드 포트폴리오

프론트엔드 개발자 장예지의 경력·프로젝트·글·이력서를 한 곳에 모은 개인 포트폴리오 사이트입니다.
DB 없이 **Git 기반 Markdown + Velog 링크**로 콘텐츠를 관리하며, 모든 페이지를 정적으로 생성합니다.

- GitHub: [@ruiwaa](https://github.com/ruiwaa)
- Velog: [@ruiwaa](https://velog.io/@ruiwaa)

<br />

## 🛠 기술 스택

| 구분 | 사용 기술 |
| --- | --- |
| Framework | Next.js 16 (App Router), React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS v4, `next/font` (Syne, JetBrains Mono) |
| Content | gray-matter, next-mdx-remote, remark-gfm |
| Icons | lucide-react, react-icons |
| Package Manager | Bun |

<br />

## 📄 페이지 구성

| 경로 | 내용 | 주요 기능 |
| --- | --- | --- |
| `/` | Hero와 함께 About Me, Experience & Projects 섹션이 스크롤로 이어서 등장 | - |
| `/about` | 프로필, 기술 스택, 비전 | - |
| `/experience` | 경력 타임라인과 프로젝트 카드 | 프로젝트별 데모·GitHub·관련 포스트 링크 |
| `/posts` | Velog 글 + 로컬 Markdown 글 통합 목록 | • **통합 목록** — Velog 외부 글과 `posts/` 로컬 글을 날짜순으로 합쳐 렌더링<br />• **카테고리 탭 + URL 동기화** — 전체/트러블슈팅/회고/기획/개발 탭 상태를 `?tab=` 쿼리스트링에 저장해 새로고침·링크 공유 시에도 유지<br />• **트러블슈팅 프로젝트별 아코디언** — frontmatter의 `project` 값으로 글을 그룹핑<br />• **Git 기반 콘텐츠 관리** — Supabase에서 로컬 Markdown/Velog 구조로 전환해 DB sleeping 문제를 없애고, 콘텐츠 변경 이력을 Git으로 추적 |
| `/posts/[id]` | 로컬 Markdown 글 상세 | • **MDX 렌더링** — next-mdx-remote + remark-gfm<br />• **정적 생성** — `generateStaticParams`로 빌드 시 상세 페이지 생성 |
| `/resume` | 이력서 | 이력서 PDF 다운로드, 피그마/노션 이력서 링크 |
| 공통 | Header, Footer, 테마 토글 | **다크 모드** — localStorage + `prefers-color-scheme` 기반, 초기 렌더 전 테마를 적용해 깜빡임 방지 |

<br />

## 📁 폴더 구조

```
.
├── app/
│   ├── layout.tsx / page.tsx      # 루트 레이아웃, Home
│   ├── (routes)/                  # about, experience, posts, posts/[id], resume
│   ├── _components/
│   │   ├── common/                # Header, Footer, ThemeToggle 등 공통 컴포넌트
│   │   ├── sections/              # 페이지 단위 섹션 (Hero, Projects, Posts ...)
│   │   └── ui/                    # Card, Badge 등 재사용 UI
│   ├── _hooks/                    # 커스텀 훅
│   └── _lib/                      # 페이지 전용 유틸
├── lib/
│   ├── posts.ts                   # 로컬 글 파싱 (gray-matter)
│   ├── markdown.ts                # 폴더 내 .md 파일 탐색
│   └── constants.ts               # 네비게이션, POST_CATEGORIES 등 상수
├── posts/<slug>/*.md              # 포트폴리오 직접 작성 글
├── public/                        # 프로젝트 이미지, 이력서 PDF
├── styles/                        # 타이포그래피 CSS
└── docs/                          # 설계·컨벤션 문서
```

<br />

## 🚀 시작하기

```bash
# 의존성 설치
bun install

# 개발 서버 실행 (http://localhost:3000)
bun dev

# 프로덕션 빌드 / 실행
bun run build
bun start

# 린트
bun lint
```

별도의 환경 변수 없이 실행됩니다.

<br />

## ✍️ 글 추가하기

### 로컬 Markdown 글

`posts/<slug>/` 폴더를 만들고 `.md` 파일을 작성합니다. 파일명은 자유이며(관례상 `post.md`), 폴더 안에서 이름순 첫 번째 `.md` 파일을 읽습니다.

```yaml
---
title: "글 제목"
excerpt: "요약"
date: "2026-09-22"
category: "트러블슈팅" # 트러블슈팅 | 회고 | 기획 | 개발
project: "중단어 창고" # 트러블슈팅 탭 아코디언 그룹 기준 (프로젝트 카드 제목과 동일하게)
tags: ["tag1", "tag2"]
---
```

글은 `/posts/<slug>` 경로로 노출됩니다.

### Velog 글

Velog에서 발행한 뒤 `app/_components/sections/Posts.tsx`의 `velogPosts` 배열에 메타데이터(제목, 요약, 날짜, URL, 카테고리, 프로젝트, 태그)를 추가합니다.

> 자세한 내용은 [`docs/CONTENT_MANAGEMENT.md`](./docs/CONTENT_MANAGEMENT.md)를 참고하세요.

<br />

## 🗂 소개된 프로젝트

| 프로젝트 | 설명 | 기술 |
| --- | --- | --- |
| 예매의 정석 | 영화 선택부터 결제까지 구현한 예매 사이트 | HTML, CSS, JavaScript |
| 행쇼마켓 | 소상공인 감성 문구 제품 오픈마켓 | Next.js, TypeScript, Supabase, TanStack Query |
| GENOVA 오디오 툴킷 | AI 효과음·자막 자동 생성 영상 편집 서비스 | Next.js, TypeScript, Zustand, TanStack Query |
| 중단어 창고 | 음성 인식을 지원하는 중국어 단어 학습 서비스 | Next.js, TypeScript, Supabase, React-Hook-Form, Zod |

<br />

## 📚 문서

| 문서 | 내용 |
| --- | --- |
| [ARCHITECTURE.md](./docs/ARCHITECTURE.md) | 폴더 구조, 데이터 흐름, 컴포넌트 원칙 |
| [CONTENT_MANAGEMENT.md](./docs/CONTENT_MANAGEMENT.md) | 콘텐츠 관리 방식과 글 작성 규칙 |
| [CODING_CONVENTIONS.md](./docs/CODING_CONVENTIONS.md) | 코딩 컨벤션 |
| [DESIGN_SYSTEM_IMPLEMENTATION.md](./docs/DESIGN_SYSTEM_IMPLEMENTATION.md) | 디자인 시스템 |
| [DARK_MODE_IMPLEMENTATION.md](./docs/DARK_MODE_IMPLEMENTATION.md) | 다크 모드 구현 |
| [PERFORMANCE.md](./docs/PERFORMANCE.md) | 성능 최적화 |
| [SEMANTIC_HTML_A11Y.md](./docs/SEMANTIC_HTML_A11Y.md) | 시맨틱 HTML·접근성 |
