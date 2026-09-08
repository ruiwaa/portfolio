import type { NextRequest } from "next/server";
import { getPublishedPosts } from "@/app/_lib/posts";
import type { PostCategory } from "@/types/posts";

// TanStack Query가 클라이언트 캐싱을 전담하므로, 이 라우트 자체는 매 요청마다 최신 데이터를 반환한다
export const dynamic = "force-dynamic";

const VALID_CATEGORIES: PostCategory[] = [
  "Study",
  "Troubleshooting",
  "Retrospective",
];

function parseCategory(value: string | null): PostCategory | undefined {
  return VALID_CATEGORIES.includes(value as PostCategory)
    ? (value as PostCategory)
    : undefined;
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = parseCategory(searchParams.get("category"));
  const offset = Number(searchParams.get("offset")) || 0;

  try {
    const result = await getPublishedPosts({ category, offset });
    return Response.json(result);
  } catch {
    return Response.json(
      { error: "게시물을 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}
