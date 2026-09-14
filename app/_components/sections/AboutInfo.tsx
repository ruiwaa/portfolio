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

// TODO: 실제 숙련도 문구로 교체
const SKILLS: Skill[] = [
  {
    name: "Next.js",
    Icon: SiNextdotjs,
    level: [
      "App Router와 라우트 그룹, 동적 라우팅으로 페이지 구조를 설계했습니다.",
      "서버/클라이언트 컴포넌트를 구분해 데이터 패칭과 렌더링 전략을 최적화했습니다.",
    ],
  },
  {
    name: "React",
    Icon: SiReact,
    color: "#61DAFB",
    level: [
      "함수형 컴포넌트와 훅을 기반으로 재사용 가능한 UI를 구성했습니다.",
      "useSyncExternalStore 등으로 외부 상태를 안전하게 동기화한 경험이 있습니다.",
    ],
  },
  {
    name: "TypeScript",
    Icon: SiTypescript,
    color: "#3178C6",
    level: [
      "Props와 API 응답에 명시적 타입을 정의해 런타임 오류를 줄였습니다.",
      "any 사용을 지양하고 타입 가드로 안전성을 확보했습니다.",
    ],
  },
  {
    name: "Tailwind CSS",
    Icon: SiTailwindcss,
    color: "#06B6D4",
    level: [
      "디자인 토큰 기반의 커스텀 테마와 다크 모드를 구축했습니다.",
      "유틸리티 클래스만으로 반응형 레이아웃을 빠르게 구현했습니다.",
    ],
  },
  {
    name: "Supabase",
    Icon: SiSupabase,
    color: "#3ECF8E",
    level: [
      "클라이언트 지연 초기화와 API 라우트로 데이터를 안전하게 조회했습니다.",
      "게시글 등 도메인 데이터를 스키마 기반으로 관리했습니다.",
    ],
  },
];

export default function AboutInfo() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section ref={ref} aria-labelledby="about-info-heading" className="pb-30">
      <h2 id="about-info-heading" className="sr-only">
        프로필 정보
      </h2>
      <h3 className="section-header mt-10 text-center text-light-accent dark:text-dark-accent flex  flex-row items-center gap-2 justify-center font-bold">
        <Code2 aria-hidden="true" /> 기술 스택
      </h3>
      <p className="text-lg text-center mt-2">
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
