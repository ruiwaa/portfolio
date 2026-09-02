export type PostCategory = "Study" | "Troubleshooting" | "Retrospective";

export interface Post {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  content: string;
  category: PostCategory;
  // DB 컬럼명 오타 그대로 유지 (docs/DOMAIN.md 명시, 변경 금지)
  thumnail_url: string;
  is_published: boolean;
  published_at: string;
  created_at: string;
  updated_at: string;
}
