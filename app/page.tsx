import Hero from "@/app/_components/sections/Hero";
import StackBar from "@/app/_components/sections/StackBar";
import ExperienceProjects from "@/app/_components/sections/ExperienceProjects";
import AboutSections from "@/app/_components/sections/AboutSections";
import { LAYOUT } from "@/lib/constants";

// 홈페이지 스크롤 섹션 제목만 /about, /experience 페이지보다 크고(다크모드 흰색으로) 강조 -
// 두 라우트는 이 prop을 넘기지 않아 각 컴포넌트의 기본(section-header 20px, 다크 회색) 스타일 유지
const SECTION_HEADING_CLASSNAME =
  "text-2xl md:text-3xl text-light-text-secondary dark:text-dark-text";

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
          <h2 className={`section-header ${SECTION_HEADING_CLASSNAME}`}>
            ABOUT ME
          </h2>
          <div>
            <AboutSections headingClassName={SECTION_HEADING_CLASSNAME} />
          </div>
        </div>

        <ExperienceProjects headingClassName={SECTION_HEADING_CLASSNAME} />
      </div>

      <StackBar />
    </main>
  );
}
