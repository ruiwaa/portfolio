"use client";

import {
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

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

// 실제로 진행한 프로젝트(예매의 정석/행쇼마켓/GENOVA 오디오 툴킷/중단어 창고)에서
// 각 기술을 어떻게 썼는지 종합해 한 줄로 정리
const SKILLS: Skill[] = [
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    level: [
      "행쇼마켓·GENOVA 오디오 툴킷·중단어 창고에서 App Router 기반으로 페이지를 구성하고, Lighthouse 지표를 기준으로 이미지·폰트 요청을 최적화했습니다.",
    ],
  },
  {
    name: "React",
    Icon: SiReact,
    color: "#61DAFB",
    level: [
      "행쇼마켓과 GENOVA 오디오 툴킷에서 컴포넌트 단위로 UI를 나누고, Custom Hook으로 데이터 조회·검증 로직을 재사용 가능하게 분리했습니다.",
    ],
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    color: "#3178C6",
    level: [
      "행쇼마켓에서 Supabase의 중첩된 관계형 데이터 응답에 명시적 타입을 정의해 타입 안정성을 확보했습니다.",
    ],
  },
  {
    name: "Tailwind CSS",
    Icon: SiTailwindcss,
    color: "#06B6D4",
    level: [
      "이 포트폴리오를 포함한 모든 프로젝트에서 유틸리티 클래스로 다크 모드 대응 UI와 반응형 레이아웃을 구현했습니다.",
    ],
  },
  {
    name: "Supabase",
    Icon: SiSupabase,
    color: "#3ECF8E",
    level: [
      "행쇼마켓에서는 관계형 데이터 조회·수정과 Storage 이미지 업로드를, 중단어 창고에서는 RLS 기반 접근 제어와 RPC 검색 로직을 구현했습니다.",
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
      <div className="mt-5">
        <ul
          aria-label="기술 스택"
          className="relative flex flex-row flex-wrap justify-center gap-2"
        >
          {SKILLS.map(({ name, Icon, color, level }, index) => {
            const detailId = `skill-detail-${name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")}`;

            return (
              <li key={name}>
                <HoverDisclosure
                  id={detailId}
                  content={level}
                  triggerStyle={{ animationDelay: `${550 + index * 90}ms` }}
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
    </section>
  );
}
