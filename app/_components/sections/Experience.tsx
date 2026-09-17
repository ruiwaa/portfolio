"use client";

import AnimatedLetters from "@/app/_components/ui/AnimatedLetters";
import TimelineItem from "@/app/_components/ui/TimelineItem";
import { useInView } from "@/app/_hooks/useInView";

interface TimelineEntry {
  date: string;
  role: string;
  description: string;
}

interface ExperienceProps {
  headingClassName?: string;
  animateHeading?: boolean;
}

const DEFAULT_HEADING_CLASSNAME =
  "text-light-text-secondary dark:text-dark-text-secondary";

const TIMELINE: TimelineEntry[] = [
  {
    date: "2026.07 - 2026.08",
    role: "멋쟁이 사자처럼 로켓단 23기 인턴십",
    description:
      "KX 엔터테인먼트 연계 프로젝트로, 영상 업로드 시 AI가 효과음을 추천하고 자막을 생성해주는 영상 편집 프로그램의 프론트엔드 전체 개발을 담당했습니다.",
  },
  {
    date: "2025.11 - 2026.05",
    role: "멋쟁이 사자처럼 프론트엔드 16기 최우수 수료",
    description:
      "HTML, CSS, JavaScript부터 React, Next.js까지 프론트엔드 핵심 기술을 익혔고, 6개월간 팀 프로젝트 2회를 경험했습니다.",
  },
];

export default function Experience({
  headingClassName = DEFAULT_HEADING_CLASSNAME,
  animateHeading = false,
}: ExperienceProps) {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section ref={ref} aria-label="경력 타임라인">
      <h2 className={`section-header ${headingClassName}`}>
        {animateHeading ? <AnimatedLetters text="EXPERIENCE" /> : "EXPERIENCE"}
      </h2>
      <ol className="mt-6 list-none">
        {TIMELINE.map((entry, index) => (
          <li
            key={index}
            style={{ animationDelay: `${index * 150}ms` }}
            className={`motion-safe:opacity-0 ${
              isInView
                ? "motion-safe:animate-[fade-up-in_0.6s_ease-out_both]"
                : ""
            }`}
          >
            <TimelineItem {...entry} />
          </li>
        ))}
      </ol>
    </section>
  );
}
