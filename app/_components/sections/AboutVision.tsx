"use client";

import { useEffect, useRef, useState } from "react";

import { useInView } from "@/app/_hooks/useInView";
import JourneyDetailCard, {
  type JourneyStep,
} from "@/app/_components/sections/JourneyDetailCard";

const JOURNEY: JourneyStep[] = [
  {
    step: "01",
    title: "RECORD",
    description: "경험과 문제를 기록하며 히스토리를 남깁니다.",
    detail:
      "문제를 마주친 순간의 맥락, 시도한 방법, 겪은 오류를 최대한 구체적으로 남깁니다. 나중에 다시 찾아볼 수 있도록 재현 가능한 형태로 정리하는 것을 목표로 합니다.",
  },
  {
    step: "02",
    title: "REFLECT",
    description: "기록을 돌아보며 원인과 맥락을 분석합니다.",
    detail:
      "기록을 다시 읽으며 근본 원인이 무엇이었는지, 어떤 판단이 잘못됐는지를 되짚습니다. 표면적인 증상이 아니라 구조적인 이유를 찾으려 합니다.",
  },
  {
    step: "03",
    title: "LEARN",
    description: "분석한 내용을 정리해 지식으로 흡수합니다.",
    detail:
      "돌아본 내용을 개념 단위로 정리해 문서나 노트로 남깁니다. 비슷한 문제를 다시 만났을 때 빠르게 참고할 수 있는 지식 베이스를 만드는 과정입니다.",
  },
  {
    step: "04",
    title: "IMPROVE",
    description: "배운 것을 적용해 다음 시도를 개선합니다.",
    detail:
      "정리한 지식을 실제 코드와 작업 방식에 적용합니다. 다음 기록에서 같은 실수를 반복하지 않는지 스스로 점검합니다.",
  },
];

interface AboutVisionProps {
  headingClassName?: string;
  headingAnimationDelayMs?: number;
}

const DEFAULT_HEADING_CLASSNAME =
  "text-light-text-secondary dark:text-dark-text-secondary";

// "기록의 여정" 제목(fade-up-in 0.6s)이 다 나온 뒤에 RECORD/REFLECT/LEARN/IMPROVE 목록이
// 이어서 등장하도록, 목록 각 항목의 시작 지연에 제목 지연 + 제목 애니메이션 길이를 더한다
const HEADING_ANIMATION_DURATION_MS = 600;
const ITEM_STAGGER_MS = 150;
const ITEM_ANIMATION_DURATION_MS = 600;

export default function AboutVision({
  headingClassName = DEFAULT_HEADING_CLASSNAME,
  headingAnimationDelayMs = 0,
}: AboutVisionProps) {
  const { ref, isInView } = useInView<HTMLElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = JOURNEY[activeIndex];
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  const itemsBaseDelayMs = headingAnimationDelayMs + HEADING_ANIMATION_DURATION_MS;
  // 목록이 전부 나온 뒤에야 세부 내용 카드가 등장하도록 - 단, 이건 페이지 진입 시 첫 등장에만
  // 적용하고(activeIndex === 0), 이후 스크롤로 다른 단계를 활성화할 때는 지연 없이 바로 전환되게 함
  const detailCardDelayMs =
    activeIndex === 0
      ? itemsBaseDelayMs +
        (JOURNEY.length - 1) * ITEM_STAGGER_MS +
        ITEM_ANIMATION_DURATION_MS
      : 0;

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        const closest = visible.reduce((a, b) =>
          b.intersectionRatio > a.intersectionRatio ? b : a,
        );
        const index = stepRefs.current.findIndex((el) => el === closest.target);
        if (index !== -1) setActiveIndex(index);
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    stepRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} aria-labelledby="about-vision-heading">
      <h2
        id="about-vision-heading"
        style={{ animationDelay: `${headingAnimationDelayMs}ms` }}
        className={`section-header ${headingClassName} motion-safe:opacity-0 ${
          isInView ? "motion-safe:animate-[fade-up-in_0.6s_ease-out_both]" : ""
        }`}
      >
        기록의 여정
      </h2>

      <div className="mt-8 grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-24">
        <ol className="list-none">
          {JOURNEY.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <li
                key={item.title}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                style={{
                  animationDelay: `${itemsBaseDelayMs + index * ITEM_STAGGER_MS}ms`,
                }}
                className={`group/step motion-safe:opacity-0 relative border-l-2 pb-28 pl-10 last:border-transparent last:pb-0 ${
                  isActive
                    ? "border-light-accent dark:border-dark-accent"
                    : "border-light-border dark:border-dark-border"
                } ${
                  isInView
                    ? "motion-safe:animate-[fade-up-in_0.6s_ease-out_both]"
                    : ""
                }`}
              >
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                  className="block w-full rounded text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent"
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-4.25 top-0 flex h-8 w-8 items-center justify-center rounded-full border-2 badge transition-all duration-300 ${
                      isActive
                        ? "scale-110 border-light-accent bg-light-surface text-light-accent dark:border-dark-accent dark:bg-dark-surface dark:text-dark-accent"
                        : "border-light-border bg-light-surface text-light-text-secondary group-hover/step:scale-110 group-hover/step:border-light-accent group-hover/step:text-light-accent dark:border-dark-border dark:bg-dark-surface dark:text-dark-text-secondary dark:group-hover/step:border-dark-accent dark:group-hover/step:text-dark-accent"
                    }`}
                  >
                    {item.step}
                  </span>
                  <p
                    className={`badge transition-colors duration-300 ${
                      isActive
                        ? "text-light-accent dark:text-dark-accent"
                        : "text-light-text-secondary group-hover/step:text-light-accent dark:text-dark-text-secondary dark:group-hover/step:text-dark-accent"
                    }`}
                  >
                    STEP {item.step}
                  </p>
                  <p
                    className={`body mt-1 font-bold transition-transform duration-300 group-hover/step:translate-x-1 ${
                      isActive
                        ? "translate-x-1 text-light-accent dark:text-dark-accent"
                        : "text-light-text dark:text-dark-text"
                    }`}
                  >
                    {item.title}
                  </p>
                  <p className="body mt-1 text-light-text-secondary dark:text-dark-text-secondary">
                    {item.description}
                  </p>
                </button>

                {isActive && (
                  <div className="mt-4 md:hidden">
                    <JourneyDetailCard
                      active={item}
                      isInView={isInView}
                      animationDelayMs={detailCardDelayMs}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="sticky top-[45vh] hidden md:block">
          <JourneyDetailCard
            key={activeIndex}
            active={active}
            isInView={isInView}
            animationDelayMs={detailCardDelayMs}
          />
        </div>
      </div>
    </section>
  );
}
