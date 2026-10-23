import AboutInfo from "@/app/_components/sections/AboutInfo";
import AboutVision from "@/app/_components/sections/AboutVision";
import { LAYOUT } from "@/lib/constants";

interface AboutSectionsProps {
  headingClassName?: string;
  visionHeadingDelayMs?: number;
  // 회색 띠(SECTION_BAND.about) 안에 있을 때 true - 세부 내용 카드를 흰색으로
  onBand?: boolean;
}

export default function AboutSections({
  headingClassName,
  visionHeadingDelayMs,
  onBand,
}: AboutSectionsProps) {
  return (
    <div
      // 성장의 여정·기술 스택 사이 gap-20(80px) - 페이지 섹션 간격(LAYOUT.sectionGap)과 값은 같지만, 한쪽만 바꿔도 다른 쪽에 영향이 없도록 따로 둠
      className={`${LAYOUT.contentContainer} grid grid-cols-1 gap-20`}
    >
      <AboutVision
        headingClassName={headingClassName}
        headingAnimationDelayMs={visionHeadingDelayMs}
        onBand={onBand}
      />
      <AboutInfo />
    </div>
  );
}
