import AboutIntro from "@/app/_components/sections/AboutIntro";
import AboutSections from "@/app/_components/sections/AboutSections";
import { LAYOUT } from "@/lib/constants";

export default function AboutPage() {
  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <h1 className="h1 motion-safe:animate-[fade-up-in_0.6s_ease-out_both] text-light-text dark:text-dark-text">
        About Me
      </h1>

      <AboutIntro />
      <div className="mt-50">
        <AboutSections />
      </div>
    </main>
  );
}
