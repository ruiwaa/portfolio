import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Posts from "@/app/_components/sections/Posts";
import { getPublishedPosts } from "@/app/_lib/posts";
import { getQueryClient } from "@/app/_lib/query-client";
import { LAYOUT } from "@/lib/constants";

export default async function PostsPage() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["posts"],
    queryFn: getPublishedPosts,
  });

  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <h1 className="h1 text-light-text dark:text-dark-text">Posts</h1>
      <div className="mt-12">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Posts />
        </HydrationBoundary>
      </div>
    </main>
  );
}
