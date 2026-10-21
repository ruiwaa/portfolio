import Hero from "@/app/_components/sections/Hero";
import StackBar from "@/app/_components/sections/StackBar";
import ExperienceProjects from "@/app/_components/sections/ExperienceProjects";
import AboutSections from "@/app/_components/sections/AboutSections";
import AnimatedLetters from "@/app/_components/ui/AnimatedLetters";
import { getLettersDurationMs } from "@/app/_components/ui/letterTiming";
import { LAYOUT } from "@/lib/constants";

const SECTION_HEADING_CLASSNAME =
  "text-xl md:text-3xl text-light-text-secondary dark:text-dark-text mt-3";

const ABOUT_HEADING_TEXT = "ABOUT ME";
// "ABOUT ME" 글자가 다 나타난 뒤에 성장의 여정 제목이 나오도록 - 고정값(1000ms) 대신 글자 수로 계산
const ABOUT_VISION_HEADING_DELAY_MS = getLettersDurationMs(ABOUT_HEADING_TEXT);

export default function Home() {
  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      <div className="flex  flex-col min-h-screen">
        <Hero />
      </div>

      <div className={`mt-10 flex flex-col ${LAYOUT.sectionGap}`}>
        <div>
          <h2
            className={`section-header ${SECTION_HEADING_CLASSNAME} ${LAYOUT.contentContainer}`}
          >
            <AnimatedLetters text={ABOUT_HEADING_TEXT} />
          </h2>
          <div>
            <AboutSections
              headingClassName={SECTION_HEADING_CLASSNAME}
              visionHeadingDelayMs={ABOUT_VISION_HEADING_DELAY_MS}
            />
          </div>
        </div>

        <ExperienceProjects
          headingClassName={SECTION_HEADING_CLASSNAME}
          animateHeadings
        />
      </div>

      <StackBar />
    </main>
  );
}
