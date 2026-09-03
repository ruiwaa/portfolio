# CODING_CONVENTIONS.md - 코딩 컨벤션

---

## 📛 네이밍 규칙

| 대상 | 규칙 | 예시 |
|------|------|------|
| 라우팅 폴더 | kebab-case | `app/user-profile/` |
| 컴포넌트 파일 | PascalCase | `PostCard.tsx` |
| 함수/훅 파일 | camelCase | `useFetchPosts.ts` |
| 동적 라우트 | 대괄호 | `[slug]/page.tsx` |
| 비라우팅 폴더 | 언더바 접두사 | `app/_components/` |
| 타입/인터페이스 | PascalCase | `Post`, `PostCardProps` |
| 상수 | UPPER_SNAKE_CASE | `LAYOUT.CONTAINER` |

## 🧩 컴포넌트 작성 규칙

- 함수형 컴포넌트만 사용 (`function` 또는 화살표 함수)
- Props는 인터페이스로 명시적 정의
- 기본 export는 컴포넌트 하나만
- 컴포넌트당 하나의 책임만 (UI만 담당, 데이터 fetch는 상위에서)

```typescript
interface PostCardProps {
  title: string;
  description: string;
  slug: string;
}

export function PostCard({ title, description, slug }: PostCardProps) {
  return (...)
}
```

## 🗂️ import 순서

```typescript
// 1. React/Next
import { useState } from 'react';
import Link from 'next/link';

// 2. 외부 라이브러리
import { motion } from 'motion/react';

// 3. 내부 절대경로
import { Card } from '@/app/_components/ui/Card';

// 4. 타입
import type { Post } from '@/types/posts';
```

## 🎨 Tailwind 클래스 순서

```
레이아웃 → 크기 → 여백 → 색상 → 타이포그래피 → 상태(hover/focus) → 다크모드
```

```typescript
className="flex items-center w-full p-6 bg-light-surface text-light-text hover:text-light-accent dark:bg-dark-surface dark:text-dark-text"
```

## 🔒 타입 규칙

- `any` 사용 금지 (불가피할 경우 `unknown` + 타입 가드)
- Supabase 응답은 반드시 타입 정의 후 사용
- 옵셔널 체이닝(`?.`) 적극 사용, null/undefined 방어

---

**다음**: [`SEMANTIC_HTML_A11Y.md`](./SEMANTIC_HTML_A11Y.md)
