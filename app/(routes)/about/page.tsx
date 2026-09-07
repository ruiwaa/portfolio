import AboutInfo from "@/app/_components/sections/AboutInfo";
import AboutIntro from "@/app/_components/sections/AboutIntro";
import AboutVision from "@/app/_components/sections/AboutVision";
import { LAYOUT } from "@/lib/constants";

export default function AboutPage() {
  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <h1 className="h1 motion-safe:animate-[fade-up-in_0.6s_ease-out_both] text-light-text dark:text-dark-text">
        About Me
      </h1>

      <div className={`mt-12 grid grid-cols-1 ${LAYOUT.sectionGap}`}>
        <AboutIntro />
        <AboutVision />
        <AboutInfo />
      </div>
    </main>
  );
}
