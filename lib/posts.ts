import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { POST_CATEGORIES, type PostCategory } from "./constants";
import { findMarkdownFile } from "./markdown";

export interface PostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  category: PostCategory;
  project: string;
  tags?: string[];
  readingTime: number;
}

export interface PostData {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "posts");

// frontmatter가 없거나 필수 필드가 빠진 글이 정렬/렌더링 중 런타임 에러로 사이트 전체를
// 크래시시키지 않도록, 파싱 직후 필수 필드 존재 여부를 검증한다.
function isValidFrontmatter(data: unknown): data is PostFrontmatter {
  if (!data || typeof data !== "object") return false;
  const fm = data as Record<string, unknown>;

  return (
    typeof fm.title === "string" &&
    typeof fm.excerpt === "string" &&
    typeof fm.date === "string" &&
    typeof fm.project === "string" &&
    typeof fm.readingTime === "number" &&
    (POST_CATEGORIES as readonly string[]).includes(fm.category as string)
  );
}

// posts/ 아래 .md 파일을 가진 폴더 이름을 전부 반환 - generateStaticParams에서 사용
export async function getAllLocalPostIds(): Promise<string[]> {
  let entries;
  try {
    entries = await readdir(POSTS_DIR, { withFileTypes: true });
  } catch {
    return [];
  }

  const postDirs = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  const slugsWithMarkdown = await Promise.all(
    postDirs.map(async (slug) => {
      const filePath = await findMarkdownFile(path.join(POSTS_DIR, slug));
      return filePath ? slug : null;
    }),
  );

  return slugsWithMarkdown.filter((slug): slug is string => slug !== null);
}

export async function getLocalPost(slug: string): Promise<PostData | null> {
  const filePath = await findMarkdownFile(path.join(POSTS_DIR, slug));
  if (!filePath) return null;

  let raw: string;
  try {
    raw = await readFile(filePath, "utf-8");
  } catch {
    return null;
  }

  const { data, content } = matter(raw);

  if (!isValidFrontmatter(data)) {
    console.warn(
      `posts/${slug}: frontmatter가 없거나 필수 필드(title, excerpt, date, category, project, readingTime)가 누락되어 건너뜁니다.`,
    );
    return null;
  }

  return {
    slug,
    frontmatter: data,
    content,
  };
}

// Posts 섹션 목록에서 사용 - 모든 로컬 글의 frontmatter를 반환
export async function getAllLocalPosts(): Promise<PostData[]> {
  const ids = await getAllLocalPostIds();
  const posts = await Promise.all(ids.map((id) => getLocalPost(id)));
  return posts.filter((post): post is PostData => post !== null);
}
