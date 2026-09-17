"use client";

import Image from "next/image";
import { FileText, Globe, PlayCircle } from "lucide-react";
import { SiGithub } from "react-icons/si";
import AnimatedLetters from "@/app/_components/ui/AnimatedLetters";
import Badge from "@/app/_components/ui/Badge";
import Card from "@/app/_components/ui/Card";
import { useInView } from "@/app/_hooks/useInView";

type Accent = "sky" | "peach" | "mint";

// About Intro 배경 도형과 동일한 다크모드 처리(45% 불투명도) - 다크에서는 카드 배경이 어두워지므로
// 아래 텍스트 색상도 다시 다크 톤으로 전환해야 함
const DARK_ACCENT_BG: Record<Accent, string> = {
  sky: "dark:bg-sky/45",
  peach: "dark:bg-peach/45",
  mint: "dark:bg-mint/45",
};

interface ProjectLinks {
  // 배포 사이트를 연결하지 못한 프로젝트는 "site" 대신 "video"로 두고
  // demo에 시연 영상 링크를 넣는다 - 이 경우 아이콘/라벨이 영상용으로 바뀜
  demoType?: "site" | "video";
  demo: string;
  github: string;
  post: string;
}

interface ProjectMedia {
  type: "image" | "video";
  src: string;
}

interface ProjectEntry {
  title: string;
  description: string;
  tags: string[];
  accent: Accent;
  media: ProjectMedia;
  detail: string[];
  links: ProjectLinks;
}

// TODO: 실제 프로젝트 데이터로 교체
const PROJECTS: ProjectEntry[] = [
  {
    title: "예매의 정석",
    description:
      "HTML, CSS, JavaScript를 사용하여 영화 선택부터 결제까지 실제 예매 사이트에 필요한 기능을 구현한 사이트입니다.",
    tags: ["HTML", "CSS", "JavaScript"],
    accent: "sky",
    media: {
      type: "image",
      src: "/projects/booking-payment-preview.png",
    },
    detail: [
      "개발 기간: 2026.02.09 ~ 2026.03.04",
      "Local Storage에 저장된 영화·좌석 정보를 불러와 결제 페이지에 표시",
      "포인트·카드 할인 폼과 유효성 검증 로직을 구현해 할인 금액을 총 합계에 정확히 반영",
      "필수 정보 없이 결제 페이지 URL로 바로 접근 시 이전 단계로 리디렉션하는 가드 로직 구현",
      "URLSearchParams로 탭 상태를 URL에 저장해 새로고침·뒤로가기에도 활성 탭이 유지되도록 개선",
    ],
    links: {
      demoType: "video",
      demo: "https://www.youtube.com/shorts/lYYqKjHCCrM?feature=share",
      github: "https://github.com/FRONTENDBOOTCAMP-16th/vanilla-project-team1",
      post: "#",
    },
  },
  {
    title: "프로젝트 이름을 입력하세요",
    description: "이 자리에 프로젝트 설명을 입력하세요.",
    tags: ["React", "Supabase"],
    accent: "peach",
    media: {
      type: "image",
      src: "https://picsum.photos/seed/project-2/800/600",
    },
    detail: [
      "이 자리에 문제 상황과 해결 과정을 입력하세요.",
      "이 자리에 맡은 역할과 기여한 부분을 입력하세요.",
    ],
    links: {
      demo: "#",
      github: "#",
      post: "#",
    },
  },
  {
    title: "프로젝트 이름을 입력하세요",
    description: "이 자리에 프로젝트 설명을 입력하세요.",
    tags: ["Tailwind CSS"],
    accent: "mint",
    media: {
      type: "image",
      src: "https://picsum.photos/seed/project-3/800/600",
    },
    detail: [
      "이 자리에 문제 상황과 해결 과정을 입력하세요.",
      "이 자리에 맡은 역할과 기여한 부분을 입력하세요.",
    ],
    links: {
      demo: "#",
      github: "#",
      post: "#",
    },
  },
];

function ProjectCard({ project }: { project: ProjectEntry }) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`motion-safe:opacity-0 ${
        isInView ? "motion-safe:animate-[fade-up-in_0.35s_ease-out_both]" : ""
      }`}
    >
      <Card
        accent={project.accent}
        className={`mx-auto flex max-w-4xl flex-col items-start overflow-hidden p-0 sm:flex-row ${DARK_ACCENT_BG[project.accent]}`}
      >
        <div className="relative h-60 w-full my-auto shrink-0 sm:h-64 sm:w-64">
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
              className="object-cover"
              sizes="280px, 100vw"
            />
          )}
        </div>
        <div className="flex flex-1 flex-col p-6">
          {/* 카드 배경이 다크모드에서 어두운 톤(45% 파스텔)으로 바뀌므로 텍스트도 다크 톤 사용 */}
          <h3 className="body font-bold text-light-text dark:text-dark-text">
            {project.title}
          </h3>
          <p className="body mt-2 flex-1 text-light-text-secondary dark:text-white/80">
            {project.description}
          </p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge label={tag} />
              </li>
            ))}
          </ul>

          <ul className="mt-4 space-y-1.5">
            {project.detail.map((line, index) => (
              <li
                key={index}
                className="font-mono text-base flex gap-2 text-light-text-secondary dark:text-white/80"
              >
                <span aria-hidden="true">•</span>
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-4 flex flex-wrap gap-3 self-end">
            {[
              project.links.demoType === "video"
                ? (["시연 영상", project.links.demo, PlayCircle] as const)
                : (["배포 링크", project.links.demo, Globe] as const),
              ["GitHub", project.links.github, SiGithub] as const,
              ["포스트", project.links.post, FileText] as const,
            ].map(([label, href, Icon]) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} (새 탭에서 열림)`}
                  title={label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-light-border text-light-text-secondary transition-colors duration-200 hover:border-light-accent hover:text-light-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-white/40 dark:text-white/80 dark:hover:border-dark-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
                >
                  <Icon aria-hidden="true" size={16} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </div>
  );
}

interface ProjectsProps {
  headingClassName?: string;
  animateHeading?: boolean;
}

const DEFAULT_HEADING_CLASSNAME =
  "text-light-text-secondary dark:text-dark-text-secondary";

export default function Projects({
  headingClassName = DEFAULT_HEADING_CLASSNAME,
  animateHeading = false,
}: ProjectsProps) {
  // 카드가 3개(간격 12vh)라 section 전체 높이가 매우 길어서, section 기준으로
  // threshold(20%)를 계산하면 각 카드 자체보다 훨씬 늦게 트리거됨 - 제목은 자기 자신의
  // 작은 영역만 관찰하도록 별도 ref를 둠
  const { ref: headingRef, isInView: isHeadingInView } =
    useInView<HTMLHeadingElement>();

  return (
    <section aria-label="프로젝트">
      <h2
        ref={headingRef}
        className={
          animateHeading
            ? `section-header ${headingClassName}`
            : `section-header motion-safe:opacity-0 ${headingClassName} ${
                isHeadingInView
                  ? "motion-safe:animate-[fade-up-in_0.35s_ease-out_both]"
                  : ""
              }`
        }
      >
        {animateHeading ? <AnimatedLetters text="PROJECTS" /> : "PROJECTS"}
      </h2>
      <ul className="mt-6 flex flex-col gap-[12vh]">
        {PROJECTS.map((project, index) => (
          <li key={index}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
