"use client";

import {
  SiClaude,
  SiHtml5,
  SiJavascript,
  SiLighthouse,
  SiNextdotjs,
  SiReact,
  SiReacthookform,
  SiReactquery,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiZod,
} from "react-icons/si";
import { GiBearFace } from "react-icons/gi";
import { MdAccessibilityNew } from "react-icons/md";

import Badge from "@/app/_components/ui/Badge";
import HoverDisclosure from "@/app/_components/ui/HoverDisclosure";
import { useInView } from "@/app/_hooks/useInView";

import type { IconType } from "react-icons";
import { Code2 } from "lucide-react";

interface Skill {
  name: string;
  Icon: IconType;
  color?: string;
  level: string[];
}

interface SkillGroup {
  category: string;
  skills: Skill[];
}

// 완성한 프로젝트들을 종합해, 각 기술로 실제 어느 수준까지 구현할 수 있는지 한 줄로 정리.
// Zustand·WAVE는 react-icons에 공식 로고가 없어 의미가 가까운 아이콘(곰, 접근성)으로 대체
const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Core",
    skills: [
      {
        name: "TypeScript",
        Icon: SiTypescript,
        color: "#3178C6",
        level: [
          "복잡하게 중첩된 API 응답에도 명시적 타입을 정의해 타입 안정성을 확보할 수 있습니다.",
        ],
      },
      {
        name: "JavaScript",
        Icon: SiJavascript,
        color: "#F7DF1E",
        level: [
          "프레임워크 없이 DOM과 이벤트를 다뤄 폼 유효성 검증, URL 기반 탭 상태 유지 같은 인터랙션을 구현할 수 있습니다.",
        ],
      },
      {
        name: "React",
        Icon: SiReact,
        color: "#61DAFB",
        level: [
          "컴포넌트를 재사용 가능한 단위로 나누고, Custom Hook으로 데이터 조회·검증 로직을 분리해 재사용성을 높일 수 있습니다.",
        ],
      },
      {
        name: "Next.js",
        Icon: SiNextdotjs,
        level: [
          "App Router 기반으로 서버·클라이언트 컴포넌트를 구분해 페이지 구조를 설계하고, Server Action으로 폼 데이터를 처리할 수 있습니다.",
        ],
      },
      {
        name: "HTML/CSS",
        Icon: SiHtml5,
        color: "#E34F26",
        level: [
          "시맨틱 태그로 문서 구조를 잡고, 키보드·스크린 리더 사용자를 고려한 마크업을 작성할 수 있습니다.",
        ],
      },
    ],
  },
  {
    category: "State",
    skills: [
      {
        name: "TanStack Query",
        Icon: SiReactquery,
        color: "#FF4154",
        level: [
          "서버 상태를 캐싱하고, 데이터 변경 후 쿼리를 invalidate해 새로고침 없이 화면을 최신 상태로 유지할 수 있습니다.",
        ],
      },
      {
        name: "Zustand",
        Icon: GiBearFace,
        color: "#8B5E3C",
        level: [
          "서버에 확정되기 전의 임시 작업 상태를 전역 스토어로 분리해, 서버 상태와 섞이지 않게 관리할 수 있습니다.",
        ],
      },
    ],
  },
  {
    category: "Form",
    skills: [
      {
        name: "React-Hook-Form",
        Icon: SiReacthookform,
        color: "#EC5990",
        level: [
          "회원가입·예문 작성 폼처럼 입력 항목이 많은 폼의 입력 상태와 에러 메시지를 관리할 수 있습니다.",
        ],
      },
      {
        name: "Zod",
        Icon: SiZod,
        color: "#3E67B1",
        level: [
          "스키마로 입력값 검증 규칙을 정의하고, React-Hook-Form과 연결해 회원가입·예문 작성 폼을 검증할 수 있습니다.",
        ],
      },
    ],
  },
  {
    category: "Backend",
    skills: [
      {
        name: "Supabase",
        Icon: SiSupabase,
        color: "#3ECF8E",
        level: [
          "RLS로 데이터 접근을 제어하고, RPC로 검색 로직을 서버에서 처리하며, @supabase/ssr로 서버·클라이언트 인증 상태를 관리할 수 있습니다.",
        ],
      },
    ],
  },
  {
    category: "Styling",
    skills: [
      {
        name: "Tailwind CSS",
        Icon: SiTailwindcss,
        color: "#06B6D4",
        level: [
          "유틸리티 클래스만으로 다크 모드 대응 UI와 반응형 레이아웃을 빠르게 구현할 수 있습니다.",
        ],
      },
    ],
  },
  {
    category: "Quality",
    skills: [
      {
        name: "Lighthouse",
        Icon: SiLighthouse,
        color: "#F44B21",
        level: [
          "LCP 등 성능 지표를 측정해 병목을 찾고, 이미지 우선 로딩·폰트 적용 범위 축소로 개선할 수 있습니다.",
        ],
      },
      {
        name: "WAVE",
        Icon: MdAccessibilityNew,
        color: "#2563EB",
        level: [
          "접근성 오류를 검사해 시맨틱 마크업, aria 속성, 대체 텍스트를 보완할 수 있습니다.",
        ],
      },
    ],
  },
  {
    category: "AI Tool",
    skills: [
      {
        name: "Claude Code",
        Icon: SiClaude,
        color: "#D97757",
        level: [
          "설계 문서(claude.md)로 작업 범위와 규칙을 먼저 정의하고, 이를 기반으로 기능을 개발할 수 있습니다.",
        ],
      },
    ],
  },
];

interface AboutInfoProps {
  className?: string;
}

export default function AboutInfo({ className = "" }: AboutInfoProps) {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section
      ref={ref}
      aria-labelledby="about-info-heading"
      className={`pb-30 ${className}`}
    >
      <h2 id="about-info-heading" className="sr-only">
        프로필 정보
      </h2>
      <h3
        className={`section-header mt-10 text-center text-light-accent dark:text-dark-accent flex  flex-row items-center gap-2 justify-center font-bold motion-safe:opacity-0 ${
          isInView ? "motion-safe:animate-[fade-up-in_0.6s_ease-out_both]" : ""
        }`}
      >
        <Code2 aria-hidden="true" /> 기술 스택
      </h3>
      <p
        style={{ animationDelay: "450ms" }}
        className={`text-lg text-center mt-2 motion-safe:opacity-0 ${
          isInView ? "motion-safe:animate-[fade-up-in_0.6s_ease-out_both]" : ""
        }`}
      >
        해당 기술 스택에 마우스를 올리면 세부 기술 내용을 확인할 수 있습니다.
      </p>
      <div className="relative mx-auto mt-5 flex flex-col gap-3 sm:w-fit">
        {SKILL_GROUPS.map(({ category, skills }, groupIndex) => {
          // 등장 애니메이션은 그룹을 넘어 전체 배지 순서대로 이어지게 함
          const offset = SKILL_GROUPS.slice(0, groupIndex).reduce(
            (sum, group) => sum + group.skills.length,
            0,
          );

          return (
            // relative는 HoverDisclosure 패널의 위치 기준 - 행 전체 너비를 기준으로 패널이 펼쳐짐.
            // 데스크톱에서는 카테고리 라벨 너비를 고정하고 행을 왼쪽 정렬해 배지 시작선을 맞춤
            <div
              key={category}
              className="relative flex flex-col items-center gap-2 sm:flex-row"
            >
              <span className="badge w-24 shrink-0 text-light-text-secondary sm:text-right dark:text-dark-text-secondary">
                {category}
              </span>
              <ul
                aria-label={`${category} 기술 스택`}
                className="flex flex-row flex-wrap justify-center gap-2 sm:justify-start"
              >
                {skills.map(({ name, Icon, color, level }, index) => {
                  const detailId = `skill-detail-${name
                    .toLowerCase()
                    .replace(/[^a-z0-9]+/g, "-")}`;

                  return (
                    <li key={name}>
                      <HoverDisclosure
                        id={detailId}
                        content={level}
                        triggerStyle={{
                          animationDelay: `${550 + (offset + index) * 90}ms`,
                        }}
                        triggerClassName={`motion-safe:opacity-0 ${
                          isInView
                            ? "motion-safe:animate-[pop-in_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]"
                            : ""
                        }`}
                      >
                        <Badge
                          label={name}
                          size="compact"
                          icon={
                            <Icon
                              aria-hidden="true"
                              className="h-3 w-3 sm:h-3.5 sm:w-3.5"
                              style={color ? { color } : undefined}
                            />
                          }
                        />
                      </HoverDisclosure>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}
