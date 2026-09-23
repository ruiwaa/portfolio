# ARCHITECTURE.md - 아키텍처

---

## 📁 폴더 구조

```
yeji-portfolio/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Home
│   ├── _components/
│   │   ├── common/                 # Header, ThemeToggle, Footer
│   │   ├── sections/                # Hero, About, Experience, Projects, Posts, Resume
│   │   └── ui/                      # Card, Badge, TimelineItem, Button
│   ├── (routes)/
│   │   ├── about/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── posts/page.tsx          # velogPosts 배열(외부) + posts/ 로컬 글을 합쳐 렌더링
│   │   ├── posts/[id]/page.tsx     # posts/<slug>/*.md를 MDXRemote로 렌더링
│   │   └── resume/page.tsx
│   └── api/                         # 필요시 Route Handler
├── lib/
│   ├── posts.ts                     # getLocalPost/getAllLocalPosts (gray-matter 파싱)
│   ├── markdown.ts                  # 폴더 안 .md 파일 탐색 (파일명 고정 아님)
│   └── constants.ts                 # 레이아웃/색상/POST_CATEGORIES 상수
├── posts/                           # 콘텐츠(코드 아님) - 포트폴리오 직접 작성 글
│   └── <slug>/
│       └── *.md
├── hooks/                           # 커스텀 훅
├── styles/
│   └── typography.css
├── docs/                            # 이 문서들
└── .env.local
```

> 콘텐츠 관리 방식(Supabase → Git 기반 Markdown/Velog 전환 배경)은 [`CONTENT_MANAGEMENT.md`](./CONTENT_MANAGEMENT.md) 참고

## 🔄 데이터 흐름

```
posts/<slug>/*.md (Git 파일)
   ↓ (getLocalPost, 빌드/요청 시 gray-matter로 파싱)
app/(routes)/posts/[id]/page.tsx
   ↓ (frontmatter + content)
MDXRemote (마크다운 렌더링)
```

- 로컬 글 상세: `generateStaticParams`로 `posts/` 하위 폴더를 빌드 시 정적 생성
- Posts 목록: `velogPosts` 배열(외부 Velog 링크)과 `getAllLocalPosts()`(로컬 글)를 합쳐 날짜순으로 정렬, 카테고리 탭(`?tab=`)으로 필터링 - 별도의 프로젝트 상세 페이지는 없고, 프로젝트 카드의 포스트 링크는 Velog 글 또는 이 목록의 로컬 글로 직접 연결됨
- 클라이언트 상태(테마)는 로컬 state + localStorage

## 🧱 컴포넌트 원칙

- `_components/common`: 모든 페이지 공통 (Header, Footer, ThemeToggle)
- `_components/sections`: 페이지 단위 큰 블록
- `_components/ui`: 재사용 가능한 최소 단위 (Props 기반, 로직 없음)

---

**다음**: [`DOMAIN.md`](./DOMAIN.md)
