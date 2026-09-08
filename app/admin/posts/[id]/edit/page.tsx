import { notFound } from "next/navigation";
import PostForm from "@/app/_components/admin/PostForm";
import { deletePost, getPostById, updatePost } from "@/app/_lib/admin-posts";
import { LAYOUT } from "@/lib/constants";

export default async function EditPostPage({
  params,
  searchParams,
}: PageProps<"/admin/posts/[id]/edit">) {
  const { id } = await params;
  const { error } = await searchParams;
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const updatePostWithId = updatePost.bind(null, post.id);
  const deletePostWithId = deletePost.bind(null, post.id, post.slug);

  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <div className="mx-auto max-w-3xl">
        <h1 className="h1 text-light-text dark:text-dark-text">글 수정</h1>
        <div className="mt-8">
          <PostForm
            post={post}
            action={updatePostWithId}
            deleteAction={deletePostWithId}
            error={typeof error === "string" ? error : undefined}
          />
        </div>
      </div>
    </main>
  );
}
