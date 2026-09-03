import { supabase } from "@/lib/supabase";
import type { Post } from "@/types/posts";

export async function getPublishedPosts(): Promise<Post[]> {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (error) {
      throw error;
    }

    return data ?? [];
  } catch (error) {
    console.error("getPublishedPosts failed:", error);
    throw new Error("게시물을 불러오지 못했습니다.");
  }
}
