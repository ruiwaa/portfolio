"use client";

import Image from "next/image";
import { FileText, Globe, PlayCircle } from "lucide-react";
import { SiGithub } from "react-icons/si";
import AnimatedLetters from "@/app/_components/ui/AnimatedLetters";
import Badge from "@/app/_components/ui/Badge";
import Card from "@/app/_components/ui/Card";
import { useInView } from "@/app/_hooks/useInView";

type Accent = "sky" | "peach" | "mint" | "purple";

// 세부 내용 문장 속 영어 단어(예: "Local Storage", "URLSearchParams")를 굵게 표시해 기술 용어를 눈에 띄게 함
function withBoldEnglish(text: string) {
  return text
    .split(/([A-Za-z][A-Za-z0-9]*(?:\s[A-Za-z][A-Za-z0-9]*)*)/g)
    .map((part, index) =>
      /^[A-Za-z]/.test(part) ? (
        <strong key={index} className="font-semibold">
          {part}
        </strong>
      ) : (
        part
      ),
    );
}

// About Intro 배경 도형과 동일한 다크모드 처리 - 다크에서는 카드 배경이 어두워지므로
// 아래 텍스트 색상도 다시 다크 톤으로 전환해야 함. 불투명도는 35%로, 위에 올라가는
// 흰 텍스트가 WCAG AA 대비(4.5:1)를 확보할 수 있는 한도 안에서 최대한 밝게 맞춤
// (45%였을 때는 mint 배경에서 흰 텍스트 대비가 4.46:1로 기준 미달이었음)
const DARK_ACCENT_BG: Record<Accent, string> = {
  sky: "dark:bg-sky/35",
  peach: "dark:bg-peach/35",
  mint: "dark:bg-mint/35",
  purple: "dark:bg-purple/35",
};

interface ProjectLinks {
  // 배포 사이트를 연결하지 못한 프로젝트는 "site" 대신 "video"로 두고
  // demo에 시연 영상 링크를 넣는다 - 이 경우 아이콘/라벨이 영상용으로 바뀜
  demoType?: "site" | "video";
  demo?: string;
  // 시연 영상이 기능별로 여러 개인 경우 demo 대신 사용 (예: 효과음 생성/자막 생성 각각의 데모)
  demos?: { label: string; href: string }[];
  // 비공개 레포 등으로 GitHub 링크를 공개할 수 없는 프로젝트는 생략
  github?: string;
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
    title: "행쇼마켓",
    description:
      "Next.js와 React를 기반으로, 소상공인의 감성 문구 제품을 한 곳에 모아 소비자가 다양한 상점의 상품을 구매 할 수 있도록 구현한 문구류 오픈마켓 사이트입니다.",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "TanStack Query"],
    accent: "peach",
    media: {
      type: "image",
      src: "/projects/hangsho-market-home.png",
    },
    detail: [
      "Supabase 관계형 데이터 조회로 주문·상품 정보를 연동하고, TypeScript로 중첩 데이터의 타입 안정성 확보",
      "Supabase update로 배송 상태를 조회·변경하고, 상태 변경 로직과 UI를 컴포넌트 단위로 분리해 관심사 분리",
      "TanStack Query로 서버 상태를 관리하고, 데이터 수정 후 Query invalidate로 최신 상태 유지",
      "Supabase 호출을 API 함수로, 조회·검증 로직을 Custom Hook으로 분리해 재사용성과 유지보수성 향상",
    ],
    links: {
      demo: "#",
      github: "#",
      post: "#",
    },
  },
  {
    title: "GENOVA 오디오 툴킷",
    description:
      "영상을 업로드 시 AI가 영상과 음성을 분석해 알맞은 효과음을 자동으로 채워 넣고, 음성을 텍스트로 변환해 자막까지 만들어주는 웹 서비스입니다.",
    tags: ["Next.js", "React", "TypeScript", "Zustand", "TanStack Query"],
    accent: "mint",
    media: {
      type: "image",
      src: "/projects/genova-main.png",
    },
    detail: [
      "서버에 저장된 데이터는 TanStack Query로, 아직 확정되지 않은 임시 작업 상태는 Zustand로 분리 관리해 불필요한 서버 요청 최소화",
      "생성부터 다운로드까지 toast로 즉각 피드백을 제공하고, 되돌리기 어려운 동작에는 포커스 트랩이 적용된 확인 모달로 작업 유실 방지",
      "WAVE·Web Developer로 접근성을 검증해 의미 있는 태그로 마크업을 정리하고, 장식용 아이콘에는 aria-hidden 처리",
    ],
    links: {
      demos: [
        { label: "효과음 생성 시연", href: "https://youtu.be/Yb1hK9OoZ7g" },
        { label: "자막 생성 시연", href: "https://youtu.be/vo-SuEB4yI0" },
      ],
      post: "#",
    },
  },
  {
    title: "프로젝트 이름을 입력하세요",
    description: "이 자리에 프로젝트 설명을 입력하세요.",
    tags: ["기술 스택을 입력하세요"],
    accent: "purple",
    media: {
      type: "image",
      src: "https://picsum.photos/seed/project-4/800/600",
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
        className={`mx-auto flex max-w-4xl flex-col overflow-hidden p-0 ${DARK_ACCENT_BG[project.accent]}`}
      >
        <div className="p-6 pb-0">
          <h3 className="text-2xl font-bold text-light-text dark:text-dark-text">
            {project.title}
          </h3>
          <ul className="mt-2 flex flex-wrap md:flex-row gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge label={tag} />
              </li>
            ))}
          </ul>
          <p className="body mt-2 text-light-text-secondary dark:text-white">
            {project.description}
          </p>
        </div>

        <div className="flex flex-col items-start sm:flex-row p-6">
          <div className="relative h-60 w-full shrink-0 sm:h-64 sm:w-80 mt-8">
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
                className="object-cover shadow-xl"
                sizes="(min-width: 640px) 320px, 100vw"
              />
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <ul className="space-y-1.5 pr-4">
              {project.detail.map((line, index) => (
                <li
                  key={index}
                  className="font-sans text-[18px] font-medium flex gap-2 text-light-text-secondary dark:text-white"
                >
                  <span aria-hidden="true">•</span>
                  <span>{withBoldEnglish(line)}</span>
                </li>
              ))}
            </ul>

            <ul className="mt-4 flex flex-wrap gap-3 self-end">
              {[
                ...(project.links.demos
                  ? project.links.demos.map(
                      (d) => [d.label, d.href, PlayCircle] as const,
                    )
                  : project.links.demo
                    ? [
                        project.links.demoType === "video"
                          ? ([
                              "시연 영상",
                              project.links.demo,
                              PlayCircle,
                            ] as const)
                          : (["배포 링크", project.links.demo, Globe] as const),
                      ]
                    : []),
                ...(project.links.github
                  ? [["GitHub", project.links.github, SiGithub] as const]
                  : []),
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
