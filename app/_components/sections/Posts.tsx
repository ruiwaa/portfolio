"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import Badge from "@/app/_components/ui/Badge";
import PostsSkeleton from "@/app/_components/sections/PostsSkeleton";
import { LAYOUT } from "@/lib/constants";
import type { Post, PostCategory } from "@/types/posts";
import type { GetPublishedPostsResult } from "@/app/_lib/posts";

type FilterCategory = "All" | PostCategory;

const CATEGORIES: FilterCategory[] = [
  "All",
  "Study",
  "Troubleshooting",
  "Retrospective",
];

async function fetchPostsPage(
  category: FilterCategory,
  offset: number,
): Promise<GetPublishedPostsResult> {
  const params = new URLSearchParams({ offset: String(offset) });
  if (category !== "All") {
    params.set("category", category);
  }

  const response = await fetch(`/api/posts?${params.toString()}`);

  if (!response.ok) {
    throw new Error("게시물을 불러오지 못했습니다.");
  }

  return response.json();
}

export default function Posts() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("All");

  const {
    data,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["posts", activeCategory],
    queryFn: ({ pageParam }) => fetchPostsPage(activeCategory, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.hasMore
        ? allPages.reduce((sum, page) => sum + page.posts.length, 0)
        : undefined,
  });

  const posts: Post[] = data?.pages.flatMap((page) => page.posts) ?? [];

  if (isError) {
    return (
      <section aria-label="포스트 목록">
        <h2 className="section-header text-light-text-secondary dark:text-dark-text-secondary">
          POSTS
        </h2>
        <p className="body mt-6 text-light-text-secondary dark:text-dark-text-secondary">
          게시물을 불러오지 못했습니다.
        </p>
      </section>
    );
  }

  if (isLoading) {
    return <PostsSkeleton />;
  }

  return (
    <section aria-label="포스트 목록">
      <h2 className="section-header text-light-text-secondary dark:text-dark-text-secondary">
        POSTS
      </h2>

      <div
        role="tablist"
        aria-label="카테고리 필터"
        className={`mt-6 flex flex-wrap ${LAYOUT.componentGap}`}
      >
        {CATEGORIES.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              key={category}
              id={`posts-tab-${category}`}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-controls="posts-panel"
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveCategory(category)}
              className={`badge rounded-full px-3 py-1 bg-light-surface-dim text-light-text-secondary transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:bg-dark-surface-dim dark:text-dark-text-secondary dark:focus-visible:outline-dark-accent ${
                isActive
                  ? "bg-light-accent! text-white! dark:bg-dark-accent! dark:text-dark-surface!"
                  : ""
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      <p aria-live="polite" className="sr-only">
        {posts.length}개의 포스트가 표시됩니다.
      </p>

      <div
        id="posts-panel"
        role="tabpanel"
        aria-labelledby={`posts-tab-${activeCategory}`}
      >
        {posts.length === 0 ? (
          <p className="body mt-6 text-light-text-secondary dark:text-dark-text-secondary text-center">
            해당 카테고리의 포스트가 없습니다.
          </p>
        ) : (
          <>
            <ul
              className={`mt-6 grid grid-cols-1 md:grid-cols-2 ${LAYOUT.componentGap}`}
            >
              {posts.map((post) => (
                <li key={post.id}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="block rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent"
                  >
                    <article className="h-full overflow-hidden rounded-lg bg-light-surface-dim dark:bg-dark-surface-dim">
                      <div className="relative h-40 w-full">
                        <Image
                          src={post.thumnail_url}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(min-width: 768px) 50vw, 100vw"
                        />
                      </div>
                      <div className="p-6">
                        <Badge label={post.category} />
                        <h3 className="body mt-3 font-bold text-light-text dark:text-dark-text">
                          {post.title}
                        </h3>
                        {post.description && (
                          <p className="body mt-2 text-light-text-secondary dark:text-dark-text-secondary">
                            {post.description}
                          </p>
                        )}
                        <time
                          dateTime={post.published_at}
                          className="badge mt-3 block text-light-text-secondary dark:text-dark-text-secondary"
                        >
                          {new Date(post.published_at).toLocaleDateString(
                            "ko-KR",
                          )}
                        </time>
                      </div>
                    </article>
                  </Link>
                </li>
              ))}
            </ul>

            {hasNextPage && (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() => fetchNextPage()}
                  disabled={isFetchingNextPage}
                  className="badge rounded-full border border-light-border px-6 py-2 text-light-text-secondary transition-colors duration-200 hover:border-light-accent hover:text-light-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent disabled:opacity-50 dark:border-dark-border dark:text-dark-text-secondary dark:hover:border-dark-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
                >
                  {isFetchingNextPage ? "불러오는 중..." : "더 많은 글 보기"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
