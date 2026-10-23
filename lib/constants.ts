export const LAYOUT = {
  container: "w-full", // full-bleed (좌우 여백은 padding으로만 처리)
  padding: "px-6 sm:px-12", // 24px 모바일, 48px Desktop
  sectionGap: "gap-20", // 80px - 홈의 About Me 띠와 Experience 사이
  componentGap: "gap-6", // 24px
  navHeight: "h-14", // 56px
  // 본문 섹션(About Me, Experience & Projects) 공통 폭 - 넓은 화면에서 화면 전체로 퍼지지 않도록 최대 1024px로
  // 가운데 배치하고, md 이상에서는 좌우 여백을 더 줌. 섹션 제목도 같은 값을 써서 내용과 같은 선에서 시작하게 함
  contentContainer: "mx-auto w-full max-w-5xl md:px-8",
} as const;

// 섹션을 배경색 띠로 구분 (라이트 모드만, 다크는 배경 없음). 띠는 본문 폭(contentContainer) 안에 있어도 화면 양끝까지 칠해지도록
// 같은 색 box-shadow를 좌우로 100vmax만큼 펼치고 clip-path로 위아래만 잘라냄 - 요소 폭은 그대로라 가로 스크롤이 생기지 않음.
// Tailwind 클래스는 빌드 시 정적 문자열이어야 해서 색을 직접 씀 (#f8f8f8 = light-surface-dim, #e3f2fd = sky)
export const SECTION_BAND = {
  about:
    "bg-light-surface-dim shadow-[0_0_0_100vmax_#f8f8f8] [clip-path:inset(0_-100vmax)] dark:bg-transparent dark:shadow-none",
  projects:
    "bg-sky shadow-[0_0_0_100vmax_#e3f2fd] [clip-path:inset(0_-100vmax)] dark:bg-transparent dark:shadow-none",
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
