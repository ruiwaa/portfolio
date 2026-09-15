import Experience from "@/app/_components/sections/Experience";
import Projects from "@/app/_components/sections/Projects";

interface ExperienceProjectsProps {
  headingClassName?: string;
  animateHeadings?: boolean;
}

export default function ExperienceProjects({
  headingClassName,
  animateHeadings,
}: ExperienceProjectsProps) {
  return (
    <div className="flex flex-col">
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
