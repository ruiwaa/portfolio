import Link from "next/link";
import AdminPostList from "@/app/_components/admin/AdminPostList";
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
            className="text-sm rounded-full bg-light-accent px-4 py-2 badge text-white transition-opacity duration-200 hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:bg-dark-accent dark:text-dark-surface dark:focus-visible:outline-dark-accent"
          >
            새 글 작성
          </Link>
          <form action={signOut}>
            <button
              type="submit"
              className="text-sm rounded-full border border-light-border px-4 py-2 badge text-light-text-secondary transition-colors duration-200 hover:border-light-accent hover:text-light-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:text-dark-text-secondary dark:hover:border-dark-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
            >
              로그아웃
            </button>
          </form>
        </div>
      </div>

      <AdminPostList posts={posts} />
    </main>
  );
}
