import { getSupabaseClient } from "@/lib/supabase";
import { POSTS_PAGE_SIZE } from "@/lib/constants";
import type { Post, PostCategory } from "@/types/posts";

export interface GetPublishedPostsResult {
  posts: Post[];
  hasMore: boolean;
}

export async function getPublishedPosts({
  category,
  offset = 0,
}: {
  category?: PostCategory;
  offset?: number;
} = {}): Promise<GetPublishedPostsResult> {
  try {
    let query = getSupabaseClient()
      .from("posts")
      .select("*", { count: "exact" })
      .eq("is_published", true);

    if (category) {
      query = query.eq("category", category);
    }

    const { data, error, count } = await query
      .order("published_at", { ascending: false })
      .range(offset, offset + POSTS_PAGE_SIZE - 1);

    if (error) {
      throw error;
    }

    const posts = data ?? [];
    const hasMore = count != null && offset + posts.length < count;

    return { posts, hasMore };
  } catch (error) {
    console.error("getPublishedPosts failed:", error);
    throw new Error("게시물을 불러오지 못했습니다.");
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    // 라우트 파라미터가 퍼센트 인코딩된 채로 들어올 때가 있어(한글 slug 등) 항상 디코딩 후 조회.
    // 이미 디코딩된 값이 들어와도 decodeURIComponent는 그대로 통과시키므로 안전함
    const decodedSlug = decodeURIComponent(slug);

    const { data, error } = await getSupabaseClient()
      .from("posts")
      .select("*")
      .eq("slug", decodedSlug)
      .eq("is_published", true)
      .maybeSingle();

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("getPostBySlug failed:", error);
    throw new Error("게시물을 불러오지 못했습니다.");
  }
}
