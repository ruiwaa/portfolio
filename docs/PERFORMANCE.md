# PERFORMANCE.md - 성능 최적화

---

## 🖼️ 이미지 최적화

- `<img>` 대신 `next/image`의 `<Image>` 사용
- 썸네일은 `width`/`height` 명시로 CLS 방지
- Above the fold 이미지만 `priority` 속성 사용

```typescript
import Image from 'next/image';

<Image src={thumbnail_url} alt={title} width={400} height={300} />
```

## 📦 동적 import

- 초기 로딩에 불필요한 컴포넌트는 `next/dynamic`으로 지연 로드
- 예: Tiptap 에디터, 모달, 차트 등 무거운 컴포넌트

```typescript
import dynamic from 'next/dynamic';

const PostContent = dynamic(() => import('@/app/_components/PostContent'), {
  loading: () => <Skeleton />,
});
```

## 🔤 폰트 최적화

- `next/font`로 Syne, JetBrains Mono 로드 (자동 최적화, FOUT 방지)
- `display: swap` 옵션 사용

## 🗄️ 데이터 페칭

- 목록 페이지는 서버 컴포넌트에서 fetch (클라이언트 워터폴 방지)
- 불필요한 재요청 방지 (Supabase 쿼리는 필요한 컬럼만 select)

```typescript
const { data } = await supabase
  .from('posts')
  .select('id, title, slug, description, thumnail_url, category, published_at')
  .eq('is_published', true)
  .order('published_at', { ascending: false });
```

## 📊 목표 지표

| 지표 | 목표 |
|------|------|
| FCP | < 1.5s |
| LCP | < 2.5s |
| CLS | < 0.1 |
| TTI | < 3.5s |
| 번들 사이즈 | 불필요한 라이브러리 제거 |

## ✅ 배포 전 체크

- [ ] Lighthouse Performance 90+
- [ ] 이미지 모두 next/image 사용
- [ ] 무거운 컴포넌트 dynamic import 적용
- [ ] console.log 제거

---

**다음**: [`SECURITY.md`](./SECURITY.md)
