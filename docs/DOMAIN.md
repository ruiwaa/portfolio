# DOMAIN.md - 도메인 지식

---

## 📝 Posts 데이터 모델

```sql
create table public.posts (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  slug text not null unique,
  description text,
  content text not null,
  category text not null,           -- Study, Troubleshooting, Retrospective
  thumnail_url text not null,       -- 오타 그대로 유지 (변경 금지)
  is_published boolean not null default false,
  published_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

- `category`: `All / Study / Troubleshooting / Retrospective` 필터 기준
- 목록 조회 시 `is_published = true` 조건 항상 포함
- `content`는 Tiptap 에디터로 작성된 HTML

## 🧭 사용자 여정

```
1. Home 진입 → MY RECORDER 카드로 섹션 이동
2. About Me → 프로필/기술스택/비전 확인
3. Experience & Projects → 경력 타임라인 + 프로젝트 확인
4. Posts → 카테고리 필터 → 글 읽기
5. Resume → Notion 링크 또는 PDF 다운로드
```

## 🎯 성능 목표

| 지표 | 목표 |
|------|------|
| FCP | < 1.5s |
| LCP | < 2.5s |
| CLS | < 0.1 |
| TTI | < 3.5s |
| Lighthouse | 90+ (전 항목) |

---

**다음**: [`CODING_CONVENTIONS.md`](./CODING_CONVENTIONS.md)
