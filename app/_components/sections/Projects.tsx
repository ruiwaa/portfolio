"use client";

import Image from "next/image";
import { FileText, Globe, PlayCircle } from "lucide-react";
import { SiGithub } from "react-icons/si";
import AnimatedLetters from "@/app/_components/ui/AnimatedLetters";
import Badge from "@/app/_components/ui/Badge";
import Card from "@/app/_components/ui/Card";
import { getTroubleshootingHref } from "@/lib/constants";
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
  // 팀 프로젝트에서 내가 맡은 범위 (사용 기술 바로 아래에 표시)
  role: string;
  accent: Accent;
  media: ProjectMedia;
  detail: string[];
  links: ProjectLinks;
}

// 카드 순서를 바꾸면 lib/constants.ts의 TROUBLESHOOTING_PROJECT_ORDER도 같은 순서로 맞출 것
const PROJECTS: ProjectEntry[] = [
  {
    title: "GENOVA 오디오 툴킷",
    description:
      "영상을 업로드 시 AI가 영상과 음성을 분석해 알맞은 효과음을 자동으로 채워 넣고, 음성을 텍스트로 변환해 자막까지 만들어주는 영상 편집 웹 서비스입니다.",
    tags: ["Next.js", "React", "TypeScript", "Zustand", "TanStack Query"],
    role: "프론트엔드 전체 - 효과음 생성·자막 생성 페이지",
    accent: "mint",
    media: {
      type: "image",
      src: "/projects/genova-main.png",
    },
    detail: [
      "서버에 저장된 데이터는 TanStack Query로, 아직 확정되지 않은 임시 작업 상태는 Zustand로 분리 관리해 사용자가 효과음을 여러 번 바꿔 들어봐도 서버 요청 없이 전환되도록 구현",
      "생성부터 다운로드까지 toast로 즉각 피드백을 제공하고, 되돌리기 어려운 동작에는 포커스 트랩이 적용된 확인 모달로 작업 유실 방지",
      "WAVE·Web Developer 확장으로 접근성을 검증해 의미 있는 태그로 마크업을 정리하고, 장식용 아이콘에는 aria-hidden 처리",
    ],
    links: {
      demos: [
        { label: "효과음 생성 시연", href: "https://youtu.be/Yb1hK9OoZ7g" },
        { label: "자막 생성 시연", href: "https://youtu.be/vo-SuEB4yI0" },
      ],
      // 트러블슈팅 글의 project 값이 카드 제목과 다른 "인턴십 프로젝트"로 등록되어 있음
      post: getTroubleshootingHref("인턴십 프로젝트"),
    },
  },
  {
    title: "중단어 창고",
    description:
      "중국어 단어를 검색·저장하고, 저장한 단어로 직접 예문을 작성·수정하며 학습할 수 있는 서비스입니다. 모든 사용자를 고려해 단어 검색과 예문 작성을 음성 인식으로도 할 수 있습니다.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "TanStack Query",
      "React-Hook-Form",
      "Zod",
    ],
    role: "개인 프로젝트 - 전체 개발",
    accent: "purple",
    media: {
      type: "image",
      src: "/projects/jungdanuh-changgo-home.png",
    },
    detail: [
      "Lighthouse로 LCP 병목을 분석해 이미지 fetchPriority/preload·중국어 폰트 적용 범위 축소를 적용, 데스크탑 기준 LCP를 회원가입 5초·메인 0.5초 단축하고 검색 페이지 성능 점수 6점 향상",
      "@supabase/ssr로 서버·클라이언트 인증 상태를 관리하고, Proxy에서 세션을 확인해 인증이 필요한 경로 접근을 제어하며 PASSWORD_RECOVERY 상태로 비밀번호 재설정 흐름 구분",
      "HSK 단어 검색을 Supabase RPC로 처리해 서버에서 관련성 기준으로 정렬 후 필요한 데이터만 전달, 데이터가 늘어도 확장 가능한 검색 구조 구현",
    ],
    links: {
      demo: "http://hanzi-bank.vercel.app",
      github: "https://github.com/ruiwaa/hanzi-bank",
      post: getTroubleshootingHref("중단어 창고"),
    },
  },
  {
    title: "행쇼마켓",
    description:
      "Next.js와 React를 기반으로, 소상공인의 감성 문구 제품을 한 곳에 모아 소비자가 다양한 상점의 상품을 구매 할 수 있도록 구현한 문구류 오픈마켓 사이트입니다.",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "TanStack Query"],
    role: "마이페이지 - 소비자 주문 내역·찜한 상품, 판매자 상품 등록·상품 관리·상점 주문 관리",
    accent: "peach",
    media: {
      type: "image",
      src: "/projects/hangsho-market-home.png",
    },
    detail: [
      "Navi가 클라이언트에서 늦게 렌더링되며 Footer를 밀어내던 문제를 서버 컴포넌트 전환으로 해결해 CLS를 0.608에서 0으로 개선",
      "배송 상태 변경 후 관련 쿼리를 invalidate해 새로고침 없이 주문 목록에 변경 사항이 바로 반영되도록 구현",
      "Supabase 관계형 조회로 주문·상품 정보를 연동하고, 중첩된 응답 데이터에 타입을 정의해 타입 안정성 확보",
      "Supabase 호출은 API 함수로, 조회·검증 로직은 Custom Hook으로, 상태 변경 로직은 UI와 분리해 재사용성 향상",
      "사용하지 않는 three.js 패키지(약 600KB)를 의존성에서 제거",
    ],
    links: {
      demo: "https://final-project-team2.vercel.app/",
      github: "https://github.com/ruiwaa/final-project-team2",
      post: getTroubleshootingHref("행쇼마켓"),
    },
  },
  {
    title: "예매의 정석",
    description:
      "HTML, CSS, JavaScript를 사용하여 영화 선택부터 결제까지 실제 예매 사이트에 필요한 기능을 구현한 사이트입니다.",
    tags: ["HTML", "CSS", "JavaScript"],
    role: "영화표 결제 페이지",
    accent: "sky",
    media: {
      type: "image",
      src: "/projects/booking-payment-preview.png",
    },
    detail: [
      "포인트·카드 할인 폼과 유효성 검증 로직을 구현해 할인 금액을 총 합계에 정확히 반영",
      "필수 정보 없이 결제 페이지 URL로 바로 접근 시 이전 단계로 리디렉션하는 가드 로직 구현",
      "URLSearchParams로 탭 상태를 URL에 저장해 새로고침·뒤로가기에도 활성 탭이 유지되도록 개선",
    ],
    links: {
      demoType: "video",
      demo: "https://www.youtube.com/shorts/lYYqKjHCCrM?feature=share",
      github: "https://github.com/ruiwaa/vanilla-project-team1",
      post: getTroubleshootingHref("예매의 정석"),
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
        <div className="p-5 pb-0 sm:p-6 sm:pb-0">
          <h3 className="text-xl font-bold text-light-text sm:text-2xl dark:text-dark-text">
            {project.title}
          </h3>
          <ul className="mt-2 flex flex-wrap md:flex-row gap-2">
            {project.tags.map((tag) => (
              <li key={tag}>
                <Badge label={tag} />
              </li>
            ))}
          </ul>
          <p className="body mt-2 text-light-text dark:text-white">
            <strong className="font-semibold  dark:text-white">
              담당 역할:
            </strong>{" "}
            {project.role}
          </p>
          <p className="body mt-2 text-light-text-secondary dark:text-white">
            {project.description}
          </p>
        </div>

        {/* 이미지와 세부 내용을 나란히 두는 건 lg(1024px)부터 - 그보다 좁으면 이미지(320px)를 빼고
            남는 폭이 좁아 긴 기술 용어가 카드 밖으로 밀리거나 단어 중간에서 끊겼음 */}
        <div className="flex flex-col items-start px-5 sm:px-6 lg:flex-row">
          <div className="relative mt-6 aspect-16/10 w-full shrink-0 lg:mt-8 lg:aspect-auto lg:h-64 lg:w-80">
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
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 848px, 100vw"
              />
            )}
          </div>
          {/* min-w-0: flex 자식은 기본적으로 내용 최소 너비 아래로 줄어들지 않아, "@supabase/ssr"처럼
              끊을 수 없는 긴 단어가 있으면 카드 밖으로 넘쳤음 */}
          <div className="flex w-full min-w-0 flex-1 flex-col py-5 sm:py-6 lg:p-6">
            <ul className="space-y-1.5 lg:pr-4">
              {project.detail.map((line, index) => (
                <li
                  key={index}
                  className="flex gap-2 font-sans text-base font-medium text-light-text-secondary sm:text-[18px] dark:text-white"
                >
                  <span aria-hidden="true">•</span>
                  <span className="min-w-0 wrap-anywhere">
                    {withBoldEnglish(line)}
                  </span>
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
