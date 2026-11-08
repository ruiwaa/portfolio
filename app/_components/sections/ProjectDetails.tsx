import Link from "next/link";
import { ArrowRight, FileText, Globe, PlayCircle } from "lucide-react";
import { SiGithub } from "react-icons/si";
import type { ProjectDetail, ProjectLinks } from "@/app/_components/sections/projectsData";

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

interface ProjectDetailsProps {
  detail: ProjectDetail[];
  links: ProjectLinks;
}

// 카드 아래 영역 - 세부 내용 목록과 링크 버튼
export default function ProjectDetails({ detail, links }: ProjectDetailsProps) {
  // min-w-0: flex 자식은 기본적으로 내용 최소 너비 아래로 줄어들지 않아, "@supabase/ssr"처럼
  // 끊을 수 없는 긴 단어가 있으면 칸 밖으로 넘쳤음
  return (
    <div className="flex min-w-0 flex-col px-2">
      {/* 항목 사이 16px - 쉼표 줄바꿈으로 한 항목이 2~3줄이 되어, 줄 간격보다 확실히 넓어야 새 항목의 시작이 보임 */}
      <ul className="space-y-4">
        {detail.map((item, index) => {
          const text = typeof item === "string" ? item : item.text;
          const parts = text.split(COMMA_BREAK);
          const post = typeof item === "string" ? null : item.post;
          const isExternal = post?.href.startsWith("http");

          return (
            <li
              key={index}
              className="flex gap-2 font-sans text-[17px] leading-[1.7] font-medium text-[#444] sm:text-lg dark:text-white/80"
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
                    {/* 세부 내용 끝과 링크 사이 간격 약 8px - 공백(17~18px Presentation 기준 약 3px)에 word-spacing 5px를 더함.
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

      {/* 링크 버튼(라이트) - 흰 원 배경 + 파란 아이콘(#0066cc, 흰 배경 대비 5.57:1), 테두리 없음. 버튼 경계 대신 아이콘 자체가 3:1 이상이라
          무엇을 누르는지 알아볼 수 있음. 마우스를 올리면 파란 배경 + 흰 아이콘으로 반전. 다크는 기존 테두리·흰 아이콘 그대로 */}
      {/* mt-auto: 세부 내용 높이가 같아진 칸의 맨 아래로 링크 버튼을 내려 카드끼리 버튼 줄을 맞춤 (pt-4는 세부 내용과의 최소 간격) */}
      <ul className="mt-auto flex flex-wrap gap-3 self-end pt-4">
        {[
          ...(links.demos
            ? links.demos.map(
                (d) => [d.label, d.href, PlayCircle] as const,
              )
            : links.demo
              ? [
                  links.demoType === "video"
                    ? (["시연 영상", links.demo, PlayCircle] as const)
                    : (["배포 링크", links.demo, Globe] as const),
                ]
              : []),
          ...(links.github
            ? [["GitHub", links.github, SiGithub] as const]
            : []),
          ["포스트", links.post, FileText] as const,
        ].map(([label, href, Icon]) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (새 탭에서 열림)`}
              title={label}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-light-accent transition-colors duration-200 hover:bg-light-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border dark:border-white/40 dark:bg-transparent dark:text-white/80 dark:hover:border-dark-accent dark:hover:bg-transparent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
            >
              <Icon aria-hidden="true" size={16} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
