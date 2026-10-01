"use client";

import { useCallback } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronDown, ExternalLink } from "lucide-react";
import Badge from "@/app/_components/ui/Badge";
import {
  LAYOUT,
  POST_CATEGORIES,
  POSTS_PROJECT_PARAM,
  POSTS_TAB_PARAM,
  TROUBLESHOOTING_PROJECT_ORDER,
  type PostCategory,
} from "@/lib/constants";

export interface PostItem {
  key: string;
  title: string;
  excerpt: string;
  date: string;
  category: PostCategory;
  project: string;
  tags: string[];
  href: string;
  external: boolean;
}

const TABS = ["전체", ...POST_CATEGORIES] as const;
type Tab = (typeof TABS)[number];

function PostCard({ post }: { post: PostItem }) {
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
      </div>
    </article>
  );

  return post.external ? (
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
  );
}

// 열린 프로젝트는 ?project= 쿼리스트링으로 관리 - 프로젝트 카드 링크로 특정 프로젝트가 열린 상태로
// 진입하거나, 새로고침·링크 공유 시에도 같은 프로젝트가 열려 있도록 함.
// 호버로는 열지 않고 클릭으로만 열고 닫음 - 마우스가 지나가는 것만으로 다른 프로젝트가 열리며
// 목록이 움직이거나 주소가 바뀌지 않게 하기 위함
function ProjectAccordion({
  posts,
  openProject,
  onOpenProjectChange,
}: {
  posts: PostItem[];
  openProject: string | null;
  onOpenProjectChange: (project: string | null) => void;
}) {
  const groups = posts.reduce<Map<string, PostItem[]>>((acc, post) => {
    const group = acc.get(post.project) ?? [];
    group.push(post);
    acc.set(post.project, group);
    return acc;
  }, new Map());

  // 정렬 순서에 없는 프로젝트는 뒤로 보내고, 그들끼리는 기존(최신 글 날짜) 순서를 유지
  const rank = (project: string) => {
    const index = (TROUBLESHOOTING_PROJECT_ORDER as readonly string[]).indexOf(
      project,
    );
    return index === -1 ? TROUBLESHOOTING_PROJECT_ORDER.length : index;
  };
  const sortedGroups = [...groups.entries()].sort(
    ([a], [b]) => rank(a) - rank(b),
  );

  return (
    <div className="mt-6 flex flex-col gap-3">
      {sortedGroups.map(([project, projectPosts]) => {
        const isOpen = openProject === project;
        const panelId = `troubleshooting-panel-${project}`;

        return (
          <div
            key={project}
            className="rounded-lg border border-light-border dark:border-dark-border"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => onOpenProjectChange(isOpen ? null : project)}
              className="flex w-full items-center justify-between gap-2 rounded-lg px-6 py-4 text-left transition-colors duration-200 hover:bg-light-surface-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:hover:bg-dark-surface-dim dark:focus-visible:outline-dark-accent"
            >
              <span className="body font-bold text-light-text dark:text-dark-text">
                {project}{" "}
                <span className="text-light-text-secondary dark:text-dark-text-secondary">
                  ({projectPosts.length})
                </span>
              </span>
              <ChevronDown
                aria-hidden="true"
                className={`h-5 w-5 shrink-0 text-light-text-secondary transition-transform duration-200 dark:text-dark-text-secondary ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isOpen && (
              <ul
                id={panelId}
                className={`grid grid-cols-1 border-t border-light-border p-6 md:grid-cols-2 dark:border-dark-border ${LAYOUT.componentGap}`}
              >
                {projectPosts.map((post) => (
                  <li key={post.key}>
                    <PostCard post={post} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}

function isTab(value: string | null): value is Tab {
  return (TABS as readonly string[]).includes(value ?? "");
}

export default function PostsList({ posts }: { posts: PostItem[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rawTab = searchParams.get(POSTS_TAB_PARAM);
  const selectedTab: Tab = isTab(rawTab) ? rawTab : "전체";
  const openProject = searchParams.get(POSTS_PROJECT_PARAM);

  const replaceParams = useCallback(
    (update: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      update(params);
      const query = params.toString();
      router.replace(query ? `${pathname}?${query}` : pathname, {
        scroll: false,
      });
    },
    [pathname, router, searchParams],
  );

  const selectTab = useCallback(
    (tab: Tab) => {
      replaceParams((params) => {
        if (tab === "전체") {
          params.delete(POSTS_TAB_PARAM);
        } else {
          params.set(POSTS_TAB_PARAM, tab);
        }
        // 프로젝트 아코디언은 트러블슈팅 탭에만 있으므로 탭을 바꾸면 열린 프로젝트도 초기화
        params.delete(POSTS_PROJECT_PARAM);
      });
    },
    [replaceParams],
  );

  const selectProject = useCallback(
    (project: string | null) => {
      replaceParams((params) => {
        if (project === null) {
          params.delete(POSTS_PROJECT_PARAM);
        } else {
          params.set(POSTS_PROJECT_PARAM, project);
        }
      });
    },
    [replaceParams],
  );

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
              onClick={() => selectTab(tab)}
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
      ) : selectedTab === "트러블슈팅" ? (
        <ProjectAccordion
          posts={filteredPosts}
          openProject={openProject}
          onOpenProjectChange={selectProject}
        />
      ) : (
        <ul
          className={`mt-6 grid grid-cols-1 md:grid-cols-2 ${LAYOUT.componentGap}`}
        >
          {filteredPosts.map((post) => (
            <li key={post.key}>
              <PostCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
