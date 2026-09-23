import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import type { PostCategory } from "./constants";

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  category: PostCategory;
  tags?: string[];
  readingTime: number;
}

export interface PostData {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "posts");

// posts/ 아래 post.md를 가진 폴더 이름을 전부 반환 - generateStaticParams에서 사용
export async function getAllLocalPostIds(): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(POSTS_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  return entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

export async function getLocalPost(slug: string): Promise<PostData | null> {
  const filePath = path.join(POSTS_DIR, slug, "post.md");

  let raw: string;
  try {
    raw = await readFile(filePath, "utf-8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);

  return {
    slug,
    frontmatter: data as PostFrontmatter,
    content,
  };
}

// Posts 섹션 목록에서 사용 - 모든 로컬 글의 frontmatter를 반환
export async function getAllLocalPosts(): Promise<PostData[]> {
  const ids = await getAllLocalPostIds();
  const posts = await Promise.all(ids.map((id) => getLocalPost(id)));
  return posts.filter((post): post is PostData => post !== null);
}
