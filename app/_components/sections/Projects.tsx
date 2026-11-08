"use client";

import { useEffect, useState } from "react";
import AnimatedLetters from "@/app/_components/ui/AnimatedLetters";
import { getLettersDurationMs } from "@/app/_components/ui/letterTiming";
import { SECTION_BAND } from "@/lib/constants";
import { useInView } from "@/app/_hooks/useInView";
import ProjectCard from "@/app/_components/sections/ProjectCard";
import { PROJECTS } from "@/app/_components/sections/projectsData";

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