export const LAYOUT = {
  container: "w-full", // full-bleed (좌우 여백은 padding으로만 처리)
  padding: "px-6 sm:px-12", // 24px 모바일, 48px Desktop
  sectionGap: "gap-30", // 80px
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
