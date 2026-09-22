import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export interface ProjectFrontmatter {
  title: string;
  duration: string;
  role: string;
  technologies?: string[];
}

export interface ProjectData {
  frontmatter: ProjectFrontmatter;
  content: string;
}

const PROJECTS_DIR = path.join(process.cwd(), "projects");

// projects/ 아래 case-study.md를 가진 폴더 이름을 전부 반환 - generateStaticParams에서 사용
export async function getAllProjectIds(): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(PROJECTS_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export async function getProject(
  projectId: string,
): Promise<ProjectData | null> {
  const filePath = path.join(PROJECTS_DIR, projectId, "case-study.md");

  let raw: string;
  try {
    raw = await readFile(filePath, "utf-8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);

  return {
    frontmatter: data as ProjectFrontmatter,
    content,
  };
}
