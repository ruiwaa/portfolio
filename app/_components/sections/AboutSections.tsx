import AboutInfo from "@/app/_components/sections/AboutInfo";
import AboutVision from "@/app/_components/sections/AboutVision";
import { LAYOUT } from "@/lib/constants";

interface AboutSectionsProps {
  headingClassName?: string;
  visionHeadingDelayMs?: number;
  infoClassName?: string;
}

export default function AboutSections({
  headingClassName,
  visionHeadingDelayMs,
  infoClassName,
}: AboutSectionsProps) {
  return (
    // 홈·about 공용 - 넓은 화면에서 About Me가 화면 전체로 퍼지지 않도록 최대 폭을 두고 가운데 배치,
    // md 이상에서는 좌우 여백을 더 줘서 섹션 제목(ABOUT ME)보다 안쪽에 모이게 함
    <div
      className={`mx-auto grid w-full max-w-5xl grid-cols-1 md:px-8 ${LAYOUT.sectionGap}`}
    >
      <AboutVision
        headingClassName={headingClassName}
        headingAnimationDelayMs={visionHeadingDelayMs}
      />
      <AboutInfo className={infoClassName} />
    </div>
  );
}
