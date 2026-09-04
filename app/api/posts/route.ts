import { getPublishedPosts } from "@/app/_lib/posts";

// TanStack Query가 클라이언트 캐싱을 전담하므로, 이 라우트 자체는 매 요청마다 최신 데이터를 반환한다
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await getPublishedPosts();
    return Response.json(posts);
  } catch {
    return Response.json(
      { error: "게시물을 불러오지 못했습니다." },
      { status: 500 },
    );
  }
}
