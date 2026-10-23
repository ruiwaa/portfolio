import Hero from "@/app/_components/sections/Hero";
import StackBar from "@/app/_components/sections/StackBar";
import ExperienceProjects from "@/app/_components/sections/ExperienceProjects";
import AboutSections from "@/app/_components/sections/AboutSections";
import AnimatedLetters from "@/app/_components/ui/AnimatedLetters";
import { LAYOUT, SECTION_BAND } from "@/lib/constants";

const SECTION_HEADING_CLASSNAME =
  "text-xl md:text-3xl text-light-text-secondary dark:text-dark-text mt-3";

const ABOUT_HEADING_TEXT = "ABOUT ME";
// 성장의 여정 제목 지연 - "ABOUT ME"(약 645ms)는 자기 글자 영역이 보이는 순간 시작하지만, 이 지연은 더 늦게 화면에 들어오는 성장의 여정 영역
// 기준이라 글자 시간 전체(645ms)를 기다리면 ABOUT ME가 끝나고도 약 0.5초를 더 쉬었음. 300ms만 기다려 ABOUT ME가 끝날 무렵 이어서 나오게 함
const ABOUT_VISION_HEADING_DELAY_MS = 300;

export default function Home() {
  return (
    <main
      className={`flex-1 ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20`}
    >
      {/* 히어로는 내용 높이만 차지 - 이전에는 화면 높이(min-h-screen)를 채워 히어로 내용 아래로 약 350px(1440×900) 빈 공간이 생기고
          About Me가 그만큼 아래로 밀렸음 */}
      <div className="flex flex-col">
        <Hero />
      </div>

      <div className={`mt-20 flex flex-col ${LAYOUT.sectionGap}`}>
        {/* About Me 전체(제목~기술 스택)를 회색 띠로 구분. 아래쪽 여백은 기술 스택의 pb-30이 맡음 */}
        <div className={`${SECTION_BAND.about} pt-20`}>
          <h2
            className={`section-header ${SECTION_HEADING_CLASSNAME} ${LAYOUT.contentContainer}`}
          >
            <AnimatedLetters text={ABOUT_HEADING_TEXT} />
          </h2>
          <div>
            <AboutSections
              headingClassName={SECTION_HEADING_CLASSNAME}
              visionHeadingDelayMs={ABOUT_VISION_HEADING_DELAY_MS}
              onBand
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
