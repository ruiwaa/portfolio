"use client";

import { useId, useState } from "react";
import Image from "next/image";
import { FileText, Globe } from "lucide-react";
import { SiGithub } from "react-icons/si";
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
    title: "프로젝트 이름을 입력하세요",
    description: "이 자리에 프로젝트 설명을 입력하세요.",
    tags: ["Next.js", "TypeScript"],
    accent: "sky",
    media: {
      type: "image",
      src: "https://picsum.photos/seed/project-1/800/600",
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
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`motion-safe:opacity-0 ${
        isInView
          ? "motion-safe:animate-[fade-up-in_0.35s_ease-out_both]"
          : ""
      }`}
    >
      <Card
        accent={project.accent}
        className={`mx-auto flex max-w-4xl flex-col items-start overflow-hidden p-0 sm:flex-row ${DARK_ACCENT_BG[project.accent]}`}
      >
        {/* 고정 높이 - "자세히 보기"로 옆 콘텐츠 열이 늘어나도(sm:flex-row) 미디어 크기가 안 바뀌게 함 */}
        <div className="relative h-48 w-full shrink-0 sm:h-64 sm:w-64">
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
              sizes="(min-width: 640px) 256px, 100vw"
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

          <ul className="mt-4 flex flex-wrap gap-3 self-end">
            {(
              [
                ["배포 링크", project.links.demo, Globe],
                ["GitHub", project.links.github, SiGithub],
                ["포스트", project.links.post, FileText],
              ] as const
            ).map(([label, href, Icon]) => (
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

          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls={panelId}
            onClick={() => setIsOpen((open) => !open)}
            className="badge mt-4 w-fit text-light-accent transition-colors duration-200 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:text-dark-accent dark:focus-visible:outline-dark-accent"
          >
            {isOpen ? "접기" : "자세히 보기"}
          </button>

          {isOpen && (
            <ul id={panelId} className="mt-3 space-y-1.5">
              {project.detail.map((line, index) => (
                <li
                  key={index}
                  className="badge flex gap-2 text-light-text-secondary dark:text-white/80"
                >
                  <span aria-hidden="true">•</span>
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </Card>
    </div>
  );
}

export default function Projects() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section ref={ref} aria-label="프로젝트">
      <h2
        className={`section-header motion-safe:opacity-0 text-light-text-secondary dark:text-dark-text-secondary ${
          isInView
            ? "motion-safe:animate-[fade-up-in_0.35s_ease-out_both]"
            : ""
        }`}
      >
        PROJECTS
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
