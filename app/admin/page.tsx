import Link from "next/link";
import { signOut } from "@/app/_lib/admin-auth";
import { getAllPostsForAdmin } from "@/app/_lib/admin-posts";
import { LAYOUT } from "@/lib/constants";

export default async function AdminDashboardPage() {
  const posts = await getAllPostsForAdmin();

  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <div className="flex items-center justify-between gap-4">
        <h1 className="h1 text-light-text dark:text-dark-text">Admin</h1>
        <div className="flex items-center gap-3">
          <Link
            href="/admin/posts/new"
            className="rounded-full bg-light-accent px-4 py-2 badge text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:bg-dark-accent dark:text-dark-surface dark:focus-visible:outline-dark-accent"
          >
            새 글 작성
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-light-border px-4 py-2 badge text-light-text-secondary transition-colors duration-200 hover:border-light-accent hover:text-light-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:text-dark-text-secondary dark:hover:border-dark-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
            >
              로그아웃
            </button>
          </form>
        </div>
      </div>

      <ul className="mt-12 divide-y divide-light-border dark:divide-dark-border">
        {posts.length === 0 ? (
          <p className="body py-6 text-light-text-secondary dark:text-dark-text-secondary">
            아직 작성한 게시물이 없습니다.
          </p>
        ) : (
          posts.map((post) => (
            <li
              key={post.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div>
                <p className="body font-bold text-light-text dark:text-dark-text">
                  {post.title}
                  {!post.is_published && (
                    <span className="badge ml-2 rounded-full border border-light-border px-2 py-0.5 text-light-text-secondary dark:border-dark-border dark:text-dark-text-secondary">
                      비공개
                    </span>
                  )}
                </p>
                <p className="badge mt-1 text-light-text-secondary dark:text-dark-text-secondary">
                  {post.category} ·{" "}
                  {new Date(post.published_at).toLocaleDateString("ko-KR")}
                </p>
              </div>
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className="badge shrink-0 text-light-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:text-dark-accent dark:focus-visible:outline-dark-accent"
              >
                수정
              </Link>
            </li>
          ))
        )}
      </ul>
    </main>
  );
}
