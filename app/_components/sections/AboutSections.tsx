import AboutInfo from "@/app/_components/sections/AboutInfo";
import AboutVision from "@/app/_components/sections/AboutVision";
import { LAYOUT } from "@/lib/constants";

// About Me 영역 공통 컨테이너 - 넓은 화면에서 화면 전체로 퍼지지 않도록 최대 폭을 두고 가운데 배치하고,
// md 이상에서는 좌우 여백을 더 줌. 홈의 "ABOUT ME" 제목도 같은 값을 써서 내용과 같은 선에서 시작하게 함
export const ABOUT_CONTAINER_CLASSNAME = "mx-auto w-full max-w-5xl md:px-8";

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
    <div
      className={`${ABOUT_CONTAINER_CLASSNAME} grid grid-cols-1 ${LAYOUT.sectionGap}`}
    >
      <AboutVision
        headingClassName={headingClassName}
        headingAnimationDelayMs={visionHeadingDelayMs}
      />
      <AboutInfo className={infoClassName} />
    </div>
  );
}
