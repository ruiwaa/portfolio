import Experience from "@/app/_components/sections/Experience";
import Projects from "@/app/_components/sections/Projects";
import { LAYOUT } from "@/lib/constants";

export default function ExperiencePage() {
  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <h1 className="h1 text-light-text dark:text-dark-text">
        Experience & Projects
      </h1>
      <div className="mt-24 flex flex-col">
        <div className="mb-[5vh]">
          <Experience />
        </div>
        <Projects />
      </div>
    </main>
  );
}
