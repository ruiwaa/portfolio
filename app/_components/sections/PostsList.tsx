"use client";

import { useState } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import Badge from "@/app/_components/ui/Badge";
import { LAYOUT, POST_CATEGORIES, type PostCategory } from "@/lib/constants";

export interface PostItem {
  key: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  category: PostCategory;
  tags: string[];
  href: string;
  external: boolean;
}

const TABS = ["전체", ...POST_CATEGORIES] as const;
type Tab = (typeof TABS)[number];

export default function PostsList({ posts }: { posts: PostItem[] }) {
  const [selectedTab, setSelectedTab] = useState<Tab>("전체");

  const filteredPosts =
    selectedTab === "전체"
      ? posts
      : posts.filter((post) => post.category === selectedTab);

  return (
    <>
      <div
        role="tablist"
        aria-label="포스트 카테고리"
        className="mt-6 flex flex-wrap gap-2"
      >
        {TABS.map((tab) => {
          const isActive = tab === selectedTab;

          return (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setSelectedTab(tab)}
              className={`badge rounded-full px-4 py-1.5 transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent ${
                isActive
                  ? "bg-light-accent text-white dark:bg-dark-accent dark:text-dark-surface"
                  : "bg-light-surface-dim text-light-text-secondary hover:text-light-accent dark:bg-dark-surface-dim dark:text-dark-text-secondary dark:hover:text-dark-accent"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {filteredPosts.length === 0 ? (
        <p className="body mt-6 text-light-text-secondary dark:text-dark-text-secondary text-center">
          {posts.length === 0
            ? "아직 등록된 포스트가 없습니다."
            : "해당 카테고리에 등록된 포스트가 없습니다."}
        </p>
      ) : (
        <ul
          className={`mt-6 grid grid-cols-1 md:grid-cols-2 ${LAYOUT.componentGap}`}
        >
          {filteredPosts.map((post) => {
            const cardClassName =
              "block h-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent";
            const card = (
              <article className="flex h-full flex-col rounded-lg bg-light-surface-dim p-6 dark:bg-dark-surface-dim">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="body font-bold text-light-text dark:text-dark-text">
                    {post.title}
                  </h3>
                  {post.external && (
                    <ExternalLink
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-light-text-secondary dark:text-dark-text-secondary"
                    />
                  )}
                </div>
                <p className="body mt-2 flex-1 text-light-text-secondary dark:text-dark-text-secondary">
                  {post.excerpt}
                </p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  <li>
                    <Badge label={post.category} variant="outline" />
                  </li>
                  {post.tags.map((tag) => (
                    <li key={tag}>
                      <Badge label={tag} />
                    </li>
                  ))}
                </ul>
                <div className="badge mt-4 flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString("ko-KR")}
                  </time>
                  <span aria-hidden="true">·</span>
                  <span>{post.readingTime}분 읽기</span>
                </div>
              </article>
            );

            return (
              <li key={post.key}>
                {post.external ? (
                  <a
                    href={post.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClassName}
                  >
                    {card}
                  </a>
                ) : (
                  <Link href={post.href} className={cardClassName}>
                    {card}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
