"use server";

import { createSupabaseServerClient } from "@/lib/supabase-server";

const THUMBNAIL_BUCKET = "post-thumbnails";

export async function uploadThumbnail(
  formData: FormData,
): Promise<{ url?: string; error?: string }> {
  const file = formData.get("file");

  if (!(file instanceof File) || file.size === 0) {
    return { error: "파일을 선택해주세요." };
  }

  if (!file.type.startsWith("image/")) {
    return { error: "이미지 파일만 업로드할 수 있습니다." };
  }

  const supabase = await createSupabaseServerClient();
  const extension = file.name.split(".").pop() ?? "png";
  const path = `${crypto.randomUUID()}.${extension}`;

  const { error } = await supabase.storage
    .from(THUMBNAIL_BUCKET)
    .upload(path, file, { contentType: file.type });

  if (error) {
    console.error("uploadThumbnail failed:", error);
    return { error: "이미지를 업로드하지 못했습니다." };
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(THUMBNAIL_BUCKET).getPublicUrl(path);

  return { url: publicUrl };
}
