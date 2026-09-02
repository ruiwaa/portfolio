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
│   │   ├── sections/                # Hero, MyRecorder, About, Experience, Posts, Resume
│   │   └── ui/                      # Card, Badge, TimelineItem, Button
│   ├── (routes)/
│   │   ├── about/page.tsx
│   │   ├── experience/page.tsx
│   │   ├── posts/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   └── resume/page.tsx
│   └── api/                         # 필요시 Route Handler
├── lib/
│   ├── supabase.ts                  # Supabase 클라이언트
│   └── constants.ts                 # 레이아웃/색상 상수
├── hooks/                           # 커스텀 훅
├── types/
│   └── posts.ts                     # posts 테이블 타입
├── styles/
│   └── typography.css
├── docs/                            # 이 문서들
└── .env.local
```

## 🔄 데이터 흐름

```
Supabase (posts 테이블)
   ↓ (SSR/RSC에서 fetch)
app/(routes)/posts/page.tsx
   ↓ (props로 전달)
Posts.tsx (섹션 컴포넌트)
   ↓
PostCard (ui 컴포넌트, 반복 렌더)
```

- 목록 조회: `is_published = true` 조건 필수
- 상세 조회: `slug` 기반 단건 조회
- 클라이언트 상태(필터, 테마)는 로컬 state + localStorage

## 🧱 컴포넌트 원칙

- `_components/common`: 모든 페이지 공통 (Header, Footer, ThemeToggle)
- `_components/sections`: 페이지 단위 큰 블록
- `_components/ui`: 재사용 가능한 최소 단위 (Props 기반, 로직 없음)

---

**다음**: [`COMMANDS.md`](./COMMANDS.md)
