import PostForm from "@/app/_components/admin/PostForm";
import { createPost } from "@/app/_lib/admin-posts";
import { LAYOUT } from "@/lib/constants";

export default async function NewPostPage({
  searchParams,
}: PageProps<"/admin/posts/new">) {
  const { error } = await searchParams;

  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="h1 text-light-text dark:text-dark-text">
          새 글 작성
        </h1>
        <div className="mt-8">
          <PostForm
            action={createPost}
            error={typeof error === "string" ? error : undefined}
          />
        </div>
      </div>
    </main>
  );
}
