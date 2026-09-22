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
│   │   ├── posts/page.tsx          # velogPosts 배열 -> velog.io 외부 링크
│   │   ├── projects/[id]/page.tsx  # projects/[id]/case-study.md를 MDXRemote로 렌더링
│   │   └── resume/page.tsx
│   └── api/                         # 필요시 Route Handler
├── lib/
│   ├── projects.ts                  # getProject/getAllProjectIds (gray-matter 파싱)
│   └── constants.ts                 # 레이아웃/색상 상수
├── projects/                        # 콘텐츠(코드 아님) - 프로젝트별 case-study.md + images/
│   └── <project-id>/
│       ├── case-study.md
│       └── images/
├── hooks/                           # 커스텀 훅
├── styles/
│   └── typography.css
├── docs/                            # 이 문서들
└── .env.local
```

> 콘텐츠 관리 방식(Supabase → Git 기반 Markdown/Velog 전환 배경)은 [`CONTENT_MANAGEMENT.md`](./CONTENT_MANAGEMENT.md) 참고

## 🔄 데이터 흐름

```
projects/<id>/case-study.md (Git 파일)
   ↓ (getProject, 빌드/요청 시 gray-matter로 파싱)
app/(routes)/projects/[id]/page.tsx
   ↓ (frontmatter + content)
MDXRemote (마크다운 렌더링)
```

- 프로젝트 상세: `generateStaticParams`로 `projects/` 하위 폴더를 빌드 시 정적 생성
- Posts는 DB 없이 `app/_components/sections/Posts.tsx`의 `velogPosts` 배열을 직접 수정해 관리, 클릭 시 velog.io로 외부 링크
- 클라이언트 상태(테마)는 로컬 state + localStorage

## 🧱 컴포넌트 원칙

- `_components/common`: 모든 페이지 공통 (Header, Footer, ThemeToggle)
- `_components/sections`: 페이지 단위 큰 블록
- `_components/ui`: 재사용 가능한 최소 단위 (Props 기반, 로직 없음)

---

**다음**: [`DOMAIN.md`](./DOMAIN.md)
