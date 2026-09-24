import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import Badge from "@/app/_components/ui/Badge";
import { getAllLocalPostIds, getLocalPost } from "@/lib/posts";
import { LAYOUT } from "@/lib/constants";

export async function generateStaticParams() {
  const ids = await getAllLocalPostIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata(
  props: PageProps<"/posts/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const post = await getLocalPost(id);

  if (!post) {
    return { title: "글을 찾을 수 없습니다" };
  }

  return {
    title: post.frontmatter.title,
  };
}

export default async function PostDetailPage(props: PageProps<"/posts/[id]">) {
  const { id } = await props.params;
  const post = await getLocalPost(id);

  if (!post) {
    notFound();
  }

  const { frontmatter, content } = post;

  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <article className="mx-auto max-w-3xl">
        <h1 className="h1 text-light-text dark:text-dark-text">
          {frontmatter.title}
        </h1>

        <div className="badge mt-4 flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
          <time dateTime={frontmatter.date}>
            {new Date(frontmatter.date).toLocaleDateString("ko-KR")}
          </time>
        </div>

        {frontmatter.tags && frontmatter.tags.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {frontmatter.tags.map((tag) => (
              <li key={tag}>
                <Badge label={tag} />
              </li>
            ))}
          </ul>
        )}

        <div className="post-content mt-8">
          <MDXRemote
            source={content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </article>
    </main>
  );
}
