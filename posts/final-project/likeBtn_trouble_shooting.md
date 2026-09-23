---
title: "찜하기 버튼 재사용을 위한 리펙토링"
excerpt: "상품 목록 전용이던 찜하기 API 함수를 분리해, 찜 여부 확인 함수와 커스텀 훅으로 어디서든 재사용할 수 있게 리팩토링한 과정을 기록합니다."
date: "2026-09-23"
category: "트러블슈팅"
project: "최종 프로젝트"
tags: ["Supabase", "TanStack Query"]
---

## 문제 상황

- 기존 찜한 상품 데이터를 불러오는 api 함수인 fetchLikes를 찜하기 버튼에도 그대로 적용시도.
- 찜한 상품 페이지 전용으로 만든 함수였으므로, page, limit, sort 와 같은 인자가 찜하기 버튼자체에서는 불필요했음. 불필요한 인자에 임의의 값을 전달할 경우 추후 오류가 발생할 가능성 있음.

```js
// 찜한 상품 페이지에 필요한 데이터 가져오기
export const fetchLikes = async (
  page: number,
  limit: number,
  category: string = 'all',
) => {
  const from = (page - 1) * limit
  const to = from + limit - 1

  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { items: [], count: 0 }

  let filteredProductIds: string[] | null = null

  if (category !== 'all') {
    const group = CATEGORY_GROUPS.find((g) => g.id === category)
    const categoryNames = group?.categories ?? []

    const { data: categoryData } = await supabase
      .from('categories')
      .select('id')
      .in('name', categoryNames)

    const categoryIds = categoryData?.map((c) => c.id) ?? []

    const { data: categoryProducts } = await supabase
      .from('product_categories')
      .select('product_id')
      .in('category_id', categoryIds)
    filteredProductIds = categoryProducts?.map((c) => c.product_id) ?? []
  }

  let query = supabase
    .from('product_likes')
    .select(
      `
    id,
    created_at,
    user_id,
    product_id,
    products (
      id,
      name,
      thumbnail_image,
      price,
      discount_rate,
      product_categories (
        id,
        product_id,
        category_id,
        categories (id, name)
      )
    )
  `,
      { count: 'exact' }, // 나눠서 가져오는 데이터의 총 개수 (표시용)
    )
    .eq('user_id', user.id)

  if (filteredProductIds !== null) {
    query = query.in('product_id', filteredProductIds)
  }

  const { data, error, count } = await query
    .range(from, to)
    .returns<ProductLikeWithProductRaw[]>()

  if (error) throw error
  if (!data) return { items: [], count: 0 }

  const rows = data ?? []

  return {
    items: rows.map((item) => {
      const product = Array.isArray(item.products)
        ? item.products[0]
        : item.products

      return {
        ...item,
        products: product,
      }
    }),
    count: count ?? 0,
  }
}
```

## 해결 과정 : api 함수 분리

- 찜 목록 상품의 데이터를 가져오는 훅과 찜 여부 확인을 하는 훅을 분리하였습니다.

- fetchIsLikes는 productId 하나만 받아 해당 상품의 찜 여부를 Boolean 값으로 반환하도록 만들었음.

```js
// 찜 여부 확인용 (상품 상세, 메인용)
export const fetchIsLiked = async (productId: string) => {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return false

  const { data } = await supabase
    .from('product_likes')
    .select('id')
    .eq('user_id', user.id)
    .eq('product_id', productId)
    .maybeSingle()

  return !!data
}

```

- 해당 api 함수를 어디서든 사용할 수 있도록, useIsLiked라는 커스텀 훅으로 감싸 메인, 상품 목록, 상품 상세 어느 페이지에서든 재사용할 수 있도록 리펙토링하였음.

```js
import { fetchIsLiked } from '@/app/mypage/api/fetchLikes'
import { useQuery } from '@tanstack/react-query'

export const useIsLikedQuery = (productId: string) => {
  return useQuery({
    queryKey: ['likes', productId],
    queryFn: () => fetchIsLiked(productId),
  })
}

```

### 사용 예시

- 찜한 여부에 따른 논리값을 initialLiked에 전달하여, 하트 스타일링을 조건에 따라 다르게 렌더링함.
- 찜한 상품 추가/ 삭제에 따라서 해당 상품이 렌더링되어져 있는 페이지라면, 찜한 여부가 동일하게 적용이 됨.
  => 이로써 로그인한 사용자라면, 어디서나 찜하기 기능을 추가 또는 제거할 수 있음.

```jsx
function ProductsCard({
  product,
  isPriority = false,
  category,
  inventoryTag,
}: ProductCardProps) {

// ....
const { data: isLiked } = useIsLikedQuery(product.id)

return(

 <div className="absolute right-3 bottom-17 flex aspect-square">
        <HeartButton
          aria-hidden="true"
          productId={product.id}
          initialLiked={isLiked}
          product_name={productName}
        />
      </div>
)

}
```

---

#### 찜하기 버튼 리펙토링 적용된 참고 이미지

- 1. 메인페이지
     ![](https://velog.velcdn.com/images/ruiwaa/post/712869c1-71bf-4034-a842-765f7a08ebf1/image.png)

- 2. 상품 목록 페이지
     ![](https://velog.velcdn.com/images/ruiwaa/post/8bc5cffe-9e4a-463d-9d6e-ceaab18253fd/image.png)

- 3. 상품 상세 페이지
     ![](https://velog.velcdn.com/images/ruiwaa/post/5c20286f-7b29-44e3-a0cd-c8a2c07edaf9/image.png)

- 4. 나의 찜한 상품 페이지

![](https://velog.velcdn.com/images/ruiwaa/post/8be0aeec-8cf8-44d4-bed6-b91a2ddb96da/image.png)
