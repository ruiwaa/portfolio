export const LAYOUT = {
  container: "w-full", // full-bleed (좌우 여백은 padding으로만 처리)
  padding: "px-6 sm:px-12", // 24px 모바일, 48px Desktop
  sectionGap: "gap-40", // 80px
  componentGap: "gap-6", // 24px
  navHeight: "h-14", // 56px
} as const;

// TODO: LINKEDIN, TWITTER 실제 프로필 URL로 교체
export const SOCIAL_LINKS = [
  { label: "GITHUB", href: "https://github.com/ruiwaa" },
  { label: "VELOG", href: "https://velog.io/@ruiwaa" },
] as const;

// 클라이언트(Posts.tsx)와 서버(app/_lib/posts.ts) 양쪽에서 페이지당 개수를 동일하게 맞추기 위해 공용 상수로 둠
export const POSTS_PAGE_SIZE = 6;

// Posts 탭 필터에서 사용 - velogPosts와 posts/<slug>/post.md frontmatter의 category가 이 값 중 하나여야 함
export const POST_CATEGORIES = ["트러블슈팅", "회고", "기획", "개발"] as const;
export type PostCategory = (typeof POST_CATEGORIES)[number];

// /posts 쿼리스트링 키 - PostsList(읽기·갱신)와 프로젝트 카드 링크(생성)가 같은 키를 쓰도록 공용으로 둠
export const POSTS_TAB_PARAM = "tab";
export const POSTS_PROJECT_PARAM = "project";

// 트러블슈팅 탭 프로젝트 아코디언 정렬 순서 - Projects.tsx의 프로젝트 카드 순서와 맞춤.
// 값은 글의 project 이름이라 카드 제목과 다를 수 있음(GENOVA 오디오 툴킷 → "인턴십 프로젝트").
// 여기 없는 프로젝트(예: 포트폴리오)는 목록 뒤에 기존 순서대로 붙음
export const TROUBLESHOOTING_PROJECT_ORDER = [
  "인턴십 프로젝트",
  "중단어 창고",
  "행쇼마켓",
  "예매의 정석",
] as const;

// 트러블슈팅 탭에서 특정 프로젝트 아코디언이 열린 상태로 진입하는 링크.
// project는 글 frontmatter/velogPosts의 project 값과 정확히 같아야 함
export function getTroubleshootingHref(project: string) {
  const params = new URLSearchParams({
    [POSTS_TAB_PARAM]: "트러블슈팅",
    [POSTS_PROJECT_PARAM]: project,
  });
  return `/posts?${params.toString()}`;
}

// next.config.ts의 images.remotePatterns와 반드시 동기화 - 여기 없는 호스트의 썸네일은
// next/image가 아니라 일반 <img>로 렌더링해서, 관리자가 이미지가 아닌(Pinterest 페이지 등)
// URL을 잘못 입력해도 공개 페이지 전체가 크래시하지 않게 방어한다
const ALLOWED_THUMBNAIL_HOSTS = [
  "ofiuwsugnnltbhyydozz.supabase.co",
  "picsum.photos",
];

export function isOptimizableImageUrl(url: string): boolean {
  try {
    return ALLOWED_THUMBNAIL_HOSTS.includes(new URL(url).hostname);
  } catch {
    return false;
  }
}
