import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";
import Badge from "@/app/_components/ui/Badge";
import { getAllProjectIds, getProject } from "@/lib/projects";
import { LAYOUT } from "@/lib/constants";

export async function generateStaticParams() {
  const ids = await getAllProjectIds();
  return ids.map((id) => ({ id }));
}

export async function generateMetadata(
  props: PageProps<"/projects/[id]">,
): Promise<Metadata> {
  const { id } = await props.params;
  const project = await getProject(id);

  if (!project) {
    return { title: "프로젝트를 찾을 수 없습니다" };
  }

  return {
    title: project.frontmatter.title,
  };
}

export default async function ProjectDetailPage(
  props: PageProps<"/projects/[id]">,
) {
  const { id } = await props.params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  const { frontmatter, content } = project;

  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <article className="mx-auto max-w-3xl">
        <h1 className="h1 text-light-text dark:text-dark-text">
          {frontmatter.title}
        </h1>

        <dl className="mt-6 flex flex-wrap gap-x-8 gap-y-2 badge text-light-text-secondary dark:text-dark-text-secondary">
          <div className="flex gap-2">
            <dt className="font-bold">개발 기간</dt>
            <dd>{frontmatter.duration}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="font-bold">담당 역할</dt>
            <dd>{frontmatter.role}</dd>
          </div>
        </dl>

        {frontmatter.technologies && frontmatter.technologies.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {frontmatter.technologies.map((tech) => (
              <li key={tech}>
                <Badge label={tech} />
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
