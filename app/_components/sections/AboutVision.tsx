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
    description: "커밋과 기록으로 개발 과정을 체계적으로 남깁니다.",
    detail:
      "이슈와 마일스톤 단위로 업무를 분류해 개발 워크플로우를 설계합니다. 이런 습관 덕분에 올해 기준 약 2,000개 이상의 커밋을 남겼고, 프로젝트별 트러블슈팅 과정을 기술 블로그에 꾸준히 정리하고 있습니다.",
  },
  {
    step: "02",
    title: "CONNECT",
    description: "코드 리뷰와 소통으로 팀의 결과물을 더 좋게 만듭니다.",
    detail:
      "PR 코드리뷰와 데일리 스크럼으로 팀원과 지속적으로 소통하며 업무 품질을 높였습니다. 인턴십 리팩토링 기간에는 PM님과 개선 작업 흐름을 제안해, 총 37개 개선 사항 중 35개를 함께 완료했습니다.",
  },
  {
    step: "03",
    title: "INCLUDE",
    description: "모두가 편하게 쓸 수 있는 웹을 고민합니다.",
    detail:
      "Wave Evaluation Tool과 Lighthouse로 매 프로젝트의 웹 접근성과 반응형 디자인을 점검합니다. 이러한 노력으로 지금까지 진행한 모든 프로젝트에서 Lighthouse 접근성 점수 90점 이상을 유지하고 있습니다.",
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
  // activeIndex === 0은 페이지 최초 진입 시뿐 아니라 3번 -> 1번처럼 스크롤을 되돌릴 때도
  // 참이 되므로, "정말 첫 등장인지"는 이 state로 따로 추적함(0번을 한 번이라도 벗어나면 true).
  // 렌더 중 이전 activeIndex와 비교해서만 갱신하는, effect 없이 상태를 따라가는 패턴
  // (https://react.dev/reference/react/useState#storing-information-from-previous-renders)
  const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);
  const [hasLeftInitialStep, setHasLeftInitialStep] = useState(false);
  if (activeIndex !== prevActiveIndex) {
    setPrevActiveIndex(activeIndex);
    if (activeIndex !== 0) setHasLeftInitialStep(true);
  }

  const itemsBaseDelayMs = headingAnimationDelayMs + HEADING_ANIMATION_DURATION_MS;
  // 목록이 전부 나온 뒤에야 세부 내용 카드가 등장하도록 - 단, 이건 페이지 진입 시 첫 등장에만
  // 적용하고, 이후 스크롤로 다른 단계를 활성화할 때(1번으로 되돌아갈 때 포함)는 지연 없이
  // 바로 전환되게 함
  const detailCardDelayMs =
    activeIndex === 0 && !hasLeftInitialStep
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
        성장의 여정
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
                className={`group/step motion-safe:opacity-0 relative border-l-2 pb-28 pl-10 last:border-transparent ${
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
