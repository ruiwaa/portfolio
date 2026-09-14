import Experience from "@/app/_components/sections/Experience";
import Projects from "@/app/_components/sections/Projects";

interface ExperienceProjectsProps {
  headingClassName?: string;
}

export default function ExperienceProjects({
  headingClassName,
}: ExperienceProjectsProps) {
  return (
    <div className="flex flex-col">
      <div className="mb-[5vh]">
        <Experience headingClassName={headingClassName} />
      </div>
      <Projects headingClassName={headingClassName} />
    </div>
  );
}
