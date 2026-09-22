import Posts from "@/app/_components/sections/Posts";
import { LAYOUT } from "@/lib/constants";

export default function PostsPage() {
  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <h1 className="h1 text-light-text dark:text-dark-text">Posts</h1>
      <div className="mt-12">
        <Posts />
      </div>
    </main>
  );
}
