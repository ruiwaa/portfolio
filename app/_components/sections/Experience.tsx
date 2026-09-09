"use client";

import TimelineItem from "@/app/_components/ui/TimelineItem";
import { useInView } from "@/app/_hooks/useInView";

interface TimelineEntry {
  date: string;
  role: string;
  description: string;
}

// TODO: 실제 경력 데이터로 교체
const TIMELINE: TimelineEntry[] = [
  {
    date: "0000.00 - 현재",
    role: "직책을 입력하세요",
    description: "이 자리에 실제 경력 설명을 입력하세요.",
  },
  {
    date: "0000.00 - 0000.00",
    role: "직책을 입력하세요",
    description: "이 자리에 실제 경력 설명을 입력하세요.",
  },
];

export default function Experience() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section ref={ref} aria-label="경력 타임라인">
      <h2 className="section-header text-light-text-secondary dark:text-dark-text-secondary">
        EXPERIENCE
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
