"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase-server";
import type { Post, PostCategory } from "@/types/posts";

export async function getAllPostsForAdmin(): Promise<Post[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("getAllPostsForAdmin failed:", error);
    throw new Error("게시물을 불러오지 못했습니다.");
  }

  return data ?? [];
}

function readPostFields(formData: FormData) {
  return {
    title: String(formData.get("title") ?? "").trim(),
    slug: String(formData.get("slug") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim() || null,
    content: String(formData.get("content") ?? ""),
    category: String(formData.get("category") ?? "") as PostCategory,
    thumnail_url: String(formData.get("thumnail_url") ?? "").trim(),
    is_published: formData.get("is_published") === "on",
  };
}

export async function createPost(formData: FormData) {
  const fields = readPostFields(formData);
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("posts").insert(fields);

  if (error) {
    console.error("createPost failed:", error);
    redirect(
      `/admin/posts/new?error=${encodeURIComponent("게시물을 저장하지 못했습니다.")}`,
    );
  }

  revalidatePath("/posts");
  revalidatePath(`/posts/${fields.slug}`);
  redirect("/admin");
}

export async function updatePost(id: string, formData: FormData) {
  const fields = readPostFields(formData);
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase
    .from("posts")
    .update({ ...fields, updated_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    console.error("updatePost failed:", error);
    redirect(
      `/admin/posts/${id}/edit?error=${encodeURIComponent("게시물을 수정하지 못했습니다.")}`,
    );
  }

  revalidatePath("/posts");
  revalidatePath(`/posts/${fields.slug}`);
  redirect("/admin");
}

export async function deletePost(id: string, slug: string) {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("posts").delete().eq("id", id);

  if (error) {
    console.error("deletePost failed:", error);
    throw new Error("게시물을 삭제하지 못했습니다.");
  }

  revalidatePath("/posts");
  revalidatePath(`/posts/${slug}`);
  redirect("/admin");
}
