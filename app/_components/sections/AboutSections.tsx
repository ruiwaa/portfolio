import AboutInfo from "@/app/_components/sections/AboutInfo";
import AboutVision from "@/app/_components/sections/AboutVision";
import { LAYOUT } from "@/lib/constants";

interface AboutSectionsProps {
  headingClassName?: string;
  visionHeadingDelayMs?: number;
}

export default function AboutSections({
  headingClassName,
  visionHeadingDelayMs,
}: AboutSectionsProps) {
  return (
    <div
      // 성장의 여정·기술 스택 사이는 gap-20(80px) - 페이지 섹션 간격(LAYOUT.sectionGap, gap-40)보다 좁게 두어 About Me 안의 두 구역이 한 묶음으로 보이게 함
      className={`${LAYOUT.contentContainer} grid grid-cols-1 gap-20`}
    >
      <AboutVision
        headingClassName={headingClassName}
        headingAnimationDelayMs={visionHeadingDelayMs}
      />
      <AboutInfo />
    </div>
  );
}
