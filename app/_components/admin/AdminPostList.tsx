"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Post } from "@/types/posts";

interface AdminPostListProps {
  posts: Post[];
}

export default function AdminPostList({ posts }: AdminPostListProps) {
  const [search, setSearch] = useState("");

  const filteredPosts = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return posts;

    return posts.filter((post) =>
      [post.title, post.description ?? "", post.category]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [posts, search]);

  return (
    <div className="mt-12">
      <label htmlFor="admin-post-search" className="sr-only">
        게시글 검색
      </label>
      <input
        id="admin-post-search"
        type="search"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
        placeholder="제목, 설명, 카테고리로 검색"
        className="w-full max-w-sm rounded-lg border border-light-border bg-light-surface px-3 py-2 text-light-text focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:bg-dark-surface dark:text-dark-text dark:focus-visible:outline-dark-accent"
      />

      <p aria-live="polite" className="sr-only">
        {filteredPosts.length}개의 게시물이 표시됩니다.
      </p>

      <ul className="mt-6 divide-y divide-light-border dark:divide-dark-border">
        {posts.length === 0 ? (
          <p className="body py-6 text-light-text-secondary dark:text-dark-text-secondary">
            아직 작성한 게시물이 없습니다.
          </p>
        ) : filteredPosts.length === 0 ? (
          <p className="body py-6 text-light-text-secondary dark:text-dark-text-secondary">
            검색 결과가 없습니다.
          </p>
        ) : (
          filteredPosts.map((post) => (
            <li
              key={post.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div>
                <h2 className="body font-bold text-light-text dark:text-dark-text">
                  {post.title}
                  {!post.is_published && (
                    <span className="badge ml-2 rounded-full border border-light-border px-2 py-0.5 text-light-text-secondary dark:border-dark-border dark:text-dark-text-secondary">
                      비공개
                    </span>
                  )}
                </h2>
                <p className="badge mt-1 text-light-text-secondary dark:text-dark-text-secondary">
                  {post.category} ·{" "}
                  {new Date(post.published_at).toLocaleDateString("ko-KR")}
                </p>
              </div>
              <Link
                href={`/admin/posts/${post.id}/edit`}
                aria-label={`"${post.title}" 수정`}
                className="badge shrink-0 text-sm font-medium text-light-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:text-dark-accent dark:focus-visible:outline-dark-accent"
              >
                수정
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
