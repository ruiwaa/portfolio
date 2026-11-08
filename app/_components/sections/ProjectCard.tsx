"use client";

import Image from "next/image";
import { Globe, PlayCircle } from "lucide-react";
import {
  SiCss,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiSupabase,
  SiTypescript,
  SiZod,
} from "react-icons/si";
import { GiBearFace } from "react-icons/gi";
import type { IconType } from "react-icons";
import Badge from "@/app/_components/ui/Badge";
import Card from "@/app/_components/ui/Card";
import { useInView } from "@/app/_hooks/useInView";
import ProjectDetails from "@/app/_components/sections/ProjectDetails";
import type { ProjectEntry, ProjectLinks } from "@/app/_components/sections/projectsData";

// 프로젝트 카드의 사용 기술을 아이콘으로만 표시하기 위한 매핑 - 아이콘·색은 About 기술 스택과 동일.
// Zustand는 공식 로고가 없어 곰 아이콘으로 대체, color가 없는 Next.js는 글자색(currentColor)을 따름
const TECH_ICONS: Record<string, { Icon: IconType; color?: string }> = {
  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: SiCss, color: "#663399" },
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs },
  Supabase: { Icon: SiSupabase, color: "#3ECF8E" },
  "TanStack Query": { Icon: SiReactquery, color: "#FF4154" },
  Zustand: { Icon: GiBearFace, color: "#8B5E3C" },
  "React-Hook-Form": { Icon: SiReacthookform, color: "#EC5990" },
  Zod: { Icon: SiZod, color: "#3E67B1" },
};

// 모든 프로젝트 카드 배경을 한 색으로 통일 - 라이트는 흰색(파란 띠 위, Card accent white), 다크는 라임색.
// 다크는 라임을 10%만 투명하게 깔고 1px 라임 테두리(ring, 50% - 페이지 배경 대비 3:1 이상)로 카드 경계를 보여줌. 테두리를 border가 아닌 ring으로 둔 이유:
// Card가 이미 dark:border-dark-border를 주고 있어 border 색을 또 주면 우선순위가 같아 어느 쪽이 적용될지 보장되지 않음
const CARD_DARK_BG = "dark:bg-lime-400/10 dark:ring-1 dark:ring-lime-400/50";

// 이미지를 눌렀을 때 열 주소 - 시연 영상이 있으면 영상(여러 개면 첫 번째), 없으면 배포 사이트
function getMediaLink(links: ProjectLinks) {
  if (links.demos?.[0]) return { href: links.demos[0].href, isVideo: true };
  if (links.demo)
    return { href: links.demo, isVideo: links.demoType === "video" };
  return null;
}

export default function ProjectCard({
  project,
  canAppear,
}: {
  project: ProjectEntry;
  // 제목이 다 나타나기 전에는 화면에 들어와도 기다림 (홈의 글자 제목)
  canAppear: boolean;
}) {
  const { ref, isInView } = useInView<HTMLLIElement>();
  const mediaLink =
    project.media.type === "image" ? getMediaLink(project.links) : null;
  const mediaLinkLabel = mediaLink?.isVideo ? "시연 영상" : "배포 사이트";

  // 한 줄에 두 카드 - 부모 grid의 행을 subgrid로 물려받아, 같은 줄 두 카드의 높이와 아래 세부 내용 시작선이 같아짐.
  // 카드(1행)와 세부 내용(2행) 사이는 gap-y-5, 줄과 줄 사이는 부모의 gap-y
  return (
    <li
      ref={ref}
      className={`row-span-2 grid min-w-0 grid-rows-subgrid gap-y-5 motion-safe:opacity-0 ${
        isInView && canAppear
          ? "motion-safe:animate-[fade-up-in_0.35s_ease-out_both]"
          : ""
      }`}
    >
      {/* 카드에는 제목~이미지까지만 담고, 세부 내용·링크는 카드 아래에 둠 */}
      <Card
        accent="white"
        padded={false}
        accentGlow
        className={`flex flex-col overflow-hidden ${CARD_DARK_BG}`}
      >
        {/* 카드 가로 패딩은 위쪽(제목~소개 문구)과 아래쪽(이미지~링크) 모두 px-10(40px)으로 맞춤 */}
        <div className="flex flex-col px-10 pt-5 sm:pt-6">
          <h3 className="text-center text-xl font-bold text-light-text sm:text-2xl dark:text-dark-text">
            {project.title}
          </h3>
          {/* 기간·팀 구성 배지 - 화면에서는 제목 위(-order-1)지만 DOM은 제목 뒤에 둬서, 스크린 리더로 제목(h3)을 찾아 들어오면
              이 정보부터 이어서 읽힘. 포커스 받는 요소가 없어 Tab 순서와는 무관.
              Badge 컴포넌트는 줄바꿈 금지(whitespace-nowrap)라 카드 안쪽 폭이 가장 좁은 768px(208px)에서 긴 팀 구성이 넘칠 수 있어,
              같은 색을 쓰되 배지 안에서 줄이 바뀔 수 있게 직접 만듦 */}
          <ul
            aria-label="진행 기간과 팀 구성"
            className="-order-1 mb-2 flex flex-wrap justify-center gap-1.5"
          >
            {[project.period, ...project.team].map((item) => (
              <li
                key={item}
                className="rounded border border-light-border bg-light-surface px-2 py-0.5 text-center text-sm text-light-text-secondary dark:border-dark-border dark:bg-dark-surface-dim dark:text-white"
              >
                {item}
              </li>
            ))}
          </ul>
          {/* 아이콘만 보이지만 기술 이름은 스크린 리더(sr-only)와 마우스 툴팁(title)으로 제공.
              매핑에 없는 기술은 기존처럼 텍스트 배지로 표시 */}
          <ul
            aria-label="사용 기술"
            className="mt-2 flex flex-wrap justify-center gap-2"
          >
            {project.tags.map((tag) => {
              const tech = TECH_ICONS[tag];

              return (
                <li key={tag}>
                  {tech ? (
                    <span
                      title={tag}
                      className="flex h-8 w-8 items-center justify-center rounded border border-light-border bg-light-surface text-light-text dark:border-dark-border dark:bg-dark-surface-dim dark:text-white"
                    >
                      <tech.Icon
                        aria-hidden="true"
                        className="h-4 w-4"
                        style={tech.color ? { color: tech.color } : undefined}
                      />
                      <span className="sr-only">{tag}</span>
                    </span>
                  ) : (
                    <Badge label={tag} />
                  )}
                </li>
              );
            })}
          </ul>
          <p className="body mt-2 text-center text-light-text dark:text-white">
            <strong className="font-semibold  dark:text-white">
              담당 역할:
            </strong>{" "}
            {project.role}
          </p>
          {/* 다크 모드 본문은 흰색 80% - 제목·담당 역할(흰색 100%)과 위계를 두고 긴 문장의 눈부심을 줄임 */}
          <p className="body mt-2 text-light-text-secondary dark:text-white/80">
            {project.description}
          </p>
        </div>

        {/* mt-auto: 같은 줄 카드끼리 소개 문구 길이가 달라도 이미지가 카드 아래쪽에 맞춰짐 */}
        <div className="mt-auto px-10 pb-10">
          {/* p-[5px]: 이미지 둘레 5px 여백. next/image fill은 inset:0 절대 배치라 바깥 상자 패딩으로는 줄어들지 않아,
              패딩 안쪽에 둥근 모서리(rounded-lg)·그림자를 가진 상자를 하나 더 두고 그 안에 이미지를 채움 */}
          <div className="mt-6 aspect-16/10 w-full shrink-0 p-[5px]">
            <div className="group relative h-full w-full overflow-hidden rounded-lg shadow-xl">
              {project.media.type === "video" ? (
                <video
                  src={project.media.src}
                  controls
                  muted
                  playsInline
                  loop
                  className="h-full w-full object-cover"
                >
                  <track kind="captions" />
                </video>
              ) : (
                <Image
                  src={project.media.src}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.02]"
                  // 이미지 최대 폭 = 한 칸 폭((본문 960px - 칸 사이 32px) / 2 = 464px) - 안쪽 여백 40px×2 - 이미지 여백 5px×2 = 374px.
                  // md~1119px는 두 칸(화면의 절반 이하), md 미만은 한 칸
                  sizes="(min-width: 1120px) 374px, (min-width: 768px) 50vw, 90vw"
                />
              )}
              {/* 이미지 전체를 덮는 링크 - 시연 영상(없으면 배포 사이트)을 새 탭에서 엶. 이미지는 장식(alt="")이라
                  링크 이름은 aria-label로 제공. 안내 배지는 마우스가 있는 기기에서는 hover·포커스 때만, 터치 기기에서는 항상 표시.
                  모바일은 이미지 폭(약 250px)에 비해 배지가 커서 작은 글자·여백으로 줄임 */}
              {mediaLink && (
                <a
                  href={mediaLink.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} ${mediaLinkLabel} (새 탭에서 열림)`}
                  className="absolute inset-0 flex items-end justify-end rounded-lg p-2 sm:p-3 focus-visible:outline-3 focus-visible:-outline-offset-3 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent"
                >
                  <span
                    aria-hidden="true"
                    className="flex items-center gap-1 rounded-full bg-black/75 px-2.5 py-1 text-xs font-semibold sm:gap-1.5 sm:px-3 sm:py-1.5 sm:text-sm text-white transition-opacity duration-200 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-within:opacity-100"
                  >
                    {mediaLink.isVideo ? (
                      <PlayCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    ) : (
                      <Globe className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                    )}
                    {mediaLinkLabel} 보기
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </Card>

      <ProjectDetails detail={project.detail} links={project.links} />
    </li>
  );
}
