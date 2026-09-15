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
    <div className={`grid grid-cols-1 ${LAYOUT.sectionGap} `}>
      <AboutVision
        headingClassName={headingClassName}
        headingAnimationDelayMs={visionHeadingDelayMs}
      />
      <AboutInfo className={infoClassName} />
    </div>
  );
}
