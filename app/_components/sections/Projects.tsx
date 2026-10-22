"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, FileText, Globe, PlayCircle } from "lucide-react";
import {
  SiCss,
  SiGithub,
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
import AnimatedLetters from "@/app/_components/ui/AnimatedLetters";
import { getLettersDurationMs } from "@/app/_components/ui/letterTiming";
import Badge from "@/app/_components/ui/Badge";
import Card from "@/app/_components/ui/Card";
import { getTroubleshootingHref, SECTION_BAND } from "@/lib/constants";
import { useInView } from "@/app/_hooks/useInView";

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

// 세부 내용 한 줄 - 그 내용을 다룬 트러블 슈팅 글이 있으면 post로 연결해 "자세히 보기" 링크를 붙임.
// href가 http로 시작하면 Velog 글(새 탭), 아니면 사이트 안 글(/posts/...)
type ProjectDetail =
  string | { text: string; post: { title: string; href: string } };

interface ProjectEntry {
  title: string;
  description: string;
  tags: string[];
  // 팀 프로젝트에서 내가 맡은 범위 (사용 기술 바로 아래에 표시)
  role: string;
  media: ProjectMedia;
  detail: ProjectDetail[];
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
    media: {
      type: "image",
      src: "/projects/jungdanuh-changgo-home.png",
    },
    detail: [
      {
        text: "Lighthouse로 LCP 병목을 분석해 이미지 fetchPriority/preload·중국어 폰트 적용 범위 축소를 적용, 데스크탑 기준 LCP를 회원가입 5초·메인 0.5초 단축하고 검색 페이지 성능 점수 6점 향상",
        post: {
          title: "lighthouse 검사 후 성능 개선 작업",
          href: "https://velog.io/@ruiwaa/%EC%A4%91%EB%8B%A8%EC%96%B4-%EC%B0%BD%EA%B3%A0-lighthouse-%EA%B2%80%EC%82%AC-%ED%9B%84-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0-%EC%9E%91%EC%97%85",
        },
      },
      {
        text: "@supabase/ssr로 서버·클라이언트 인증 상태를 관리하고, Proxy에서 세션을 확인해 인증이 필요한 경로 접근을 제어하며 PASSWORD_RECOVERY 상태로 비밀번호 재설정 흐름 구분",
        post: {
          title: "비밀번호 재설정 링크를 통한 접근 여부 검증",
          href: "https://velog.io/@ruiwaa/%EC%A4%91%EB%8B%A8%EC%96%B4-%EC%B0%BD%EA%B3%A0-%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EC%9E%AC%EC%84%A4%EC%A0%95-%EB%A7%81%ED%81%AC%EB%A5%BC-%ED%86%B5%ED%95%9C-%EC%A0%91%EA%B7%BC-%EC%97%AC%EB%B6%80-%EA%B2%80%EC%A6%9D",
        },
      },
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
    media: {
      type: "image",
      src: "/projects/hangsho-market-home.png",
    },
    detail: [
      {
        text: "Navi가 클라이언트에서 늦게 렌더링되며 Footer를 밀어내던 문제를 서버 컴포넌트 전환으로 해결해 CLS를 0.608에서 0으로 개선",
        post: {
          title: "성능 최적화",
          href: "/posts/final-project-performance",
        },
      },
      "배송 상태 변경 후 관련 쿼리를 invalidate해 새로고침 없이 주문 목록에 변경 사항이 바로 반영되도록 구현",
      "Supabase 관계형 조회로 주문·상품 정보를 연동하고, 중첩된 응답 데이터에 타입을 정의해 타입 안정성 확보",
      {
        text: "Supabase 호출은 API 함수로, 조회·검증 로직은 Custom Hook으로, 상태 변경 로직은 UI와 분리해 재사용성 향상",
        post: {
          title: "찜하기 버튼 재사용을 위한 리펙토링",
          href: "/posts/final-project",
        },
      },
      {
        text: "사용하지 않는 three.js 패키지(약 600KB)를 의존성에서 제거",
        post: {
          title: "성능 최적화",
          href: "/posts/final-project-performance",
        },
      },
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
    media: {
      type: "image",
      src: "/projects/booking-payment-preview.png",
    },
    detail: [
      "포인트·카드 할인 폼과 유효성 검증 로직을 구현해 할인 금액을 총 합계에 정확히 반영",
      "필수 정보 없이 결제 페이지 URL로 바로 접근 시 이전 단계로 리디렉션하는 가드 로직 구현",
      {
        text: "URLSearchParams로 탭 상태를 URL에 저장해 새로고침·뒤로가기에도 활성 탭이 유지되도록 개선",
        post: {
          title: "코드 리펙토링 기록",
          href: "/posts/yeamaeui-jeongseok-refactoring",
        },
      },
    ],
    links: {
      demoType: "video",
      demo: "https://www.youtube.com/shorts/lYYqKjHCCrM?feature=share",
      github: "https://github.com/ruiwaa/vanilla-project-team1",
      post: getTroubleshootingHref("예매의 정석"),
    },
  },
];

// 세부 내용 속 영어 표기(예: "TanStack Query", "URLSearchParams")를 굵게 표시해 기술 용어를 눈에 띄게 함 - 첫 줄·나머지 줄 모두 같은 굵기
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

// 세부 내용 줄바꿈 기준 - 쉼표 뒤 공백 (쉼표는 앞 줄 끝에 남김)
const COMMA_BREAK = /(?<=,)\s+/;

// 이미지를 눌렀을 때 열 주소 - 시연 영상이 있으면 영상(여러 개면 첫 번째), 없으면 배포 사이트
function getMediaLink(links: ProjectLinks) {
  if (links.demos?.[0]) return { href: links.demos[0].href, isVideo: true };
  if (links.demo)
    return { href: links.demo, isVideo: links.demoType === "video" };
  return null;
}

function ProjectCard({
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
        className={`flex flex-col overflow-hidden ${CARD_DARK_BG}`}
      >
        {/* 카드 가로 패딩은 위쪽(제목~소개 문구)과 아래쪽(이미지~링크) 모두 px-10(40px)으로 맞춤 */}
        <div className="px-10 pt-5 sm:pt-6">
          <h3 className="text-center text-xl font-bold text-light-text sm:text-2xl dark:text-dark-text">
            {project.title}
          </h3>
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

      {/* min-w-0: flex 자식은 기본적으로 내용 최소 너비 아래로 줄어들지 않아, "@supabase/ssr"처럼
          끊을 수 없는 긴 단어가 있으면 칸 밖으로 넘쳤음 */}
      <div className="flex min-w-0 flex-col px-2">
        {/* 항목 사이 16px - 쉼표 줄바꿈으로 한 항목이 2~3줄이 되어, 줄 간격보다 확실히 넓어야 새 항목의 시작이 보임 */}
        <ul className="space-y-4">
          {project.detail.map((item, index) => {
            const text = typeof item === "string" ? item : item.text;
            const parts = text.split(COMMA_BREAK);
            const post = typeof item === "string" ? null : item.post;
            const isExternal = post?.href.startsWith("http");

            return (
              <li
                key={index}
                className="flex gap-2 font-sans text-base leading-[1.7] font-medium text-[#444] dark:text-white/80"
              >
                <span aria-hidden="true">•</span>
                <span className="min-w-0 wrap-anywhere">
                  {/* 쉼표 뒤에서 줄을 바꿔 한 줄에 한 내용씩 보이게 함 - 마지막 조각은 줄을 나누지 않아 "자세히 보기"가 그 뒤에 이어짐.
                      첫 줄(쉼표 앞)은 더 진한 글자색으로만 요약처럼 구분 - 굵기까지 올리면 첫 줄의 영문만 굵어져 다른 줄 영문과 굵기가 달라 보였음.
                      쉼표가 없는 한 줄짜리 항목은 그대로 둠 */}
                  {parts.slice(0, -1).map((part, partIndex) => (
                    <span
                      key={partIndex}
                      className={
                        partIndex === 0
                          ? "block text-light-text dark:text-white"
                          : "block"
                      }
                    >
                      {withBoldEnglish(part)}
                    </span>
                  ))}
                  {withBoldEnglish(parts[parts.length - 1])}
                  {/* 이 내용을 다룬 트러블 슈팅 글 - 링크 이름이 보이는 글자("자세히 보기")로 시작해야 음성 명령으로도 누를 수 있음 */}
                  {post && (
                    <>
                      {/* 세부 내용 끝과 링크 사이 간격 약 8px - 공백(16px Presentation 기준 약 3px)에 word-spacing 5px를 더함.
                          margin 대신 공백을 쓰는 이유: 링크가 다음 줄로 넘어가면 공백은 줄 끝에 남아 사라지지만,
                          margin은 새 줄 앞에 남아 링크가 글자 시작선보다 안쪽으로 들어감 */}
                      <span className="[word-spacing:5px]"> </span>
                      <Link
                        href={post.href}
                        {...(isExternal
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        aria-label={`자세히 보기: ${post.title} 트러블 슈팅 글${isExternal ? " (새 탭에서 열림)" : ""}`}
                        className="whitespace-nowrap font-semibold text-light-accent underline-offset-4 hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:text-lime-400 dark:focus-visible:outline-lime-400"
                      >
                        {/* 아이콘을 inline-flex 첫 항목으로 두면 줄의 기준선이 아이콘 아래 끝이 되어 이 줄만 높아지므로,
                            링크는 일반 inline으로 두고 아이콘만 글자 높이 가운데쯤으로 내림 */}
                        <ArrowRight
                          aria-hidden="true"
                          className="mr-0.5 inline h-4 w-4 align-[-0.15em]"
                        />
                        자세히 보기
                      </Link>
                    </>
                  )}
                </span>
              </li>
            );
          })}
        </ul>

        {/* 링크 버튼 테두리 - 라이트는 아이콘과 같은 회색을 80%로 깔아 파란 배경(sky) 대비 3:1 이상 확보
                (기존 light-border #e0e0e0은 1.16:1로 버튼 경계가 거의 보이지 않았음). 아이콘보다 한 단계 옅게 두어 다크와 같은 위계 유지 */}
        {/* mt-auto: 세부 내용 높이가 같아진 칸의 맨 아래로 링크 버튼을 내려 카드끼리 버튼 줄을 맞춤 (pt-4는 세부 내용과의 최소 간격) */}
        <ul className="mt-auto flex flex-wrap gap-3 self-end pt-4">
          {[
            ...(project.links.demos
              ? project.links.demos.map(
                  (d) => [d.label, d.href, PlayCircle] as const,
                )
              : project.links.demo
                ? [
                    project.links.demoType === "video"
                      ? (["시연 영상", project.links.demo, PlayCircle] as const)
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
                className="flex h-9 w-9 items-center justify-center rounded-full border border-light-text-secondary/80 text-light-text-secondary transition-colors duration-200 hover:border-light-accent hover:text-light-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-white/40 dark:text-white/80 dark:hover:border-dark-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
              >
                <Icon aria-hidden="true" size={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

const HEADING_TEXT = "PROJECTS";

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
  // 카드는 각자 화면에 들어올 때 나타나서, 글자 제목(홈)이 다 나타나기 전에 첫 줄 카드가 먼저 보였음 -
  // 제목이 화면에 들어온 뒤 글자가 다 나타날 시간만큼 지나야 카드가 나타나도록 함
  const [isHeadingDone, setIsHeadingDone] = useState(!animateHeading);

  useEffect(() => {
    if (!animateHeading || !isHeadingInView) return;
    const timer = setTimeout(
      () => setIsHeadingDone(true),
      getLettersDurationMs(HEADING_TEXT),
    );
    return () => clearTimeout(timer);
  }, [animateHeading, isHeadingInView]);

  return (
    // 프로젝트 영역을 파란 띠로 구분하고 카드는 흰색으로 (홈·/experience 공통)
    <section aria-label="프로젝트" className={`${SECTION_BAND.projects} py-16`}>
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
        {animateHeading ? (
          <AnimatedLetters text={HEADING_TEXT} />
        ) : (
          HEADING_TEXT
        )}
      </h2>
      {/* md 이상 한 줄에 두 프로젝트. 각 li가 2행(카드·세부 내용)을 차지하는 subgrid */}
      {/* md:auto-rows-[auto_1fr]: 행이 "카드(auto), 세부 내용(1fr)" 순서로 반복 - 1fr 행끼리는 가장 높은 세부 내용에 맞춰 같은 높이가 되어
          두 줄에 걸친 카드 4개의 세부 내용 높이가 모두 같아짐 (프로젝트 수와 무관). 모바일은 한 칸이라 내용 높이 그대로 */}
      <ul className="mt-6 grid gap-x-8 gap-y-[8vh] md:auto-rows-[auto_1fr] md:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            canAppear={isHeadingDone}
          />
        ))}
      </ul>
    </section>
  );
}
