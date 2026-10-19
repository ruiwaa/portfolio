import Experience from "@/app/_components/sections/Experience";
import Projects from "@/app/_components/sections/Projects";
import { LAYOUT } from "@/lib/constants";

interface ExperienceProjectsProps {
  headingClassName?: string;
  animateHeadings?: boolean;
}

export default function ExperienceProjects({
  headingClassName,
  animateHeadings,
}: ExperienceProjectsProps) {
  return (
    // 홈·experience 공용 - About Me와 같은 본문 폭(LAYOUT.contentContainer)으로 제목과 내용을 맞춤
    <div className={`${LAYOUT.contentContainer} flex flex-col`}>
      <div className="mb-[5vh]">
        <Experience
          headingClassName={headingClassName}
          animateHeading={animateHeadings}
        />
      </div>
      <Projects
        headingClassName={headingClassName}
        animateHeading={animateHeadings}
      />
    </div>
  );
}
