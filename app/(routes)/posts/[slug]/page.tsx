import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import Badge from "@/app/_components/ui/Badge";
import PostContent from "@/app/_components/sections/PostContent";
import { getPostBySlug } from "@/app/_lib/posts";
import { LAYOUT } from "@/lib/constants";

export async function generateMetadata(
  props: PageProps<"/posts/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return { title: "게시물을 찾을 수 없습니다" };
  }

  return {
    title: post.title,
    description: post.description ?? undefined,
    openGraph: {
      title: post.title,
      description: post.description ?? undefined,
      images: [post.thumnail_url],
    },
  };
}

export default async function PostDetailPage(
  props: PageProps<"/posts/[slug]">,
) {
  const { slug } = await props.params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <article className="mx-auto max-w-3xl">
        <Badge label={post.category} />
        <h1 className="h1 mt-4 text-light-text dark:text-dark-text">
          {post.title}
        </h1>
        <time
          dateTime={post.published_at}
          className="badge mt-4 block text-light-text-secondary dark:text-dark-text-secondary"
        >
          {new Date(post.published_at).toLocaleDateString("ko-KR")}
        </time>

        <div className="relative mt-8 h-64 w-full overflow-hidden rounded-lg sm:h-96">
          <Image
            src={post.thumnail_url}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="(min-width: 768px) 768px, 100vw"
          />
        </div>

        <PostContent html={post.content} />
      </article>
    </main>
  );
}
