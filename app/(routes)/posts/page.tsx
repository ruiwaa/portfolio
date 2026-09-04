import { Suspense } from "react";
import Posts from "@/app/_components/sections/Posts";
import PostsSkeleton from "@/app/_components/sections/PostsSkeleton";
import { getPublishedPosts } from "@/app/_lib/posts";
import { LAYOUT } from "@/lib/constants";

export const revalidate = 60;

async function PostsData() {
  const posts = await getPublishedPosts();
  return <Posts posts={posts} />;
}

export default function PostsPage() {
  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <h1 className="h1 text-light-text dark:text-dark-text">Posts</h1>
      <div className="mt-12">
        <Suspense fallback={<PostsSkeleton />}>
          <PostsData />
        </Suspense>
      </div>
    </main>
  );
}
