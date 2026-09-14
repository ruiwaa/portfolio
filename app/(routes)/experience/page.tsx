import ExperienceProjects from "@/app/_components/sections/ExperienceProjects";
import { LAYOUT } from "@/lib/constants";

export default function ExperiencePage() {
  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <h1 className="text-5xl font-extrabold md:h1 text-light-text dark:text-dark-text">
        Experience & Projects
      </h1>
      <div className="mt-24">
        <ExperienceProjects />
      </div>
    </main>
  );
}
