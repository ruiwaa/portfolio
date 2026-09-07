"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useInView } from "@/app/_hooks/useInView";

// 카드에 적용된 rounded-xl(12px), border-4(4px)와 반드시 일치해야 점이 테두리에서 어긋나지 않음
const CARD_CORNER_RADIUS = 12;
const CARD_BORDER_WIDTH = 4;
// 점 사이 간격(px) - 카드 크기와 무관하게 이 간격을 유지하도록 점 개수를 역산함
const BORDER_DOT_SPACING = 8;
// 점이 많아져도(간격이 촘촘해져도) 테두리 한 바퀴를 도는 총 시간은 이 값으로 고정
const BORDER_SWEEP_DURATION_MS = 700;

function getRoundedRectPerimeterPoints(
  width: number,
  height: number,
  radius: number,
  spacing: number,
) {
  const r = Math.min(radius, width / 2, height / 2);
  const straightTop = width - 2 * r;
  const straightSide = height - 2 * r;
  const cornerArc = (Math.PI * r) / 2;
  const perimeter = 2 * straightTop + 2 * straightSide + 4 * cornerArc;
  const count = Math.max(8, Math.round(perimeter / spacing));

  const segments = [
    { end: straightTop, type: "top" as const },
    { end: straightTop + cornerArc, type: "corner-tr" as const },
    { end: straightTop + cornerArc + straightSide, type: "right" as const },
    {
      end: straightTop + 2 * cornerArc + straightSide,
      type: "corner-br" as const,
    },
    {
      end: 2 * straightTop + 2 * cornerArc + straightSide,
      type: "bottom" as const,
    },
    {
      end: 2 * straightTop + 3 * cornerArc + straightSide,
      type: "corner-bl" as const,
    },
    {
      end: 2 * straightTop + 3 * cornerArc + 2 * straightSide,
      type: "left" as const,
    },
    { end: perimeter, type: "corner-tl" as const },
  ];

  const points: { x: number; y: number }[] = [];

  for (let i = 0; i < count; i++) {
    const d = (perimeter * i) / count;
    let segStart = 0;
    const seg = segments.find((s) => {
      if (d < s.end) return true;
      segStart = s.end;
      return false;
    })!;
    const local = d - segStart;

    let x = 0;
    let y = 0;
    switch (seg.type) {
      case "top":
        x = r + local;
        y = 0;
        break;
      case "corner-tr": {
        const angle = -Math.PI / 2 + (local / cornerArc) * (Math.PI / 2);
        x = width - r + r * Math.cos(angle);
        y = r + r * Math.sin(angle);
        break;
      }
      case "right":
        x = width;
        y = r + local;
        break;
      case "corner-br": {
        const angle = (local / cornerArc) * (Math.PI / 2);
        x = width - r + r * Math.cos(angle);
        y = height - r + r * Math.sin(angle);
        break;
      }
      case "bottom":
        x = width - r - local;
        y = height;
        break;
      case "corner-bl": {
        const angle = Math.PI / 2 + (local / cornerArc) * (Math.PI / 2);
        x = r + r * Math.cos(angle);
        y = height - r + r * Math.sin(angle);
        break;
      }
      case "left":
        x = 0;
        y = height - r - local;
        break;
      case "corner-tl": {
        const angle = Math.PI + (local / cornerArc) * (Math.PI / 2);
        x = r + r * Math.cos(angle);
        y = r + r * Math.sin(angle);
        break;
      }
    }
    points.push({ x, y });
  }

  return points;
}

interface JourneyStep {
  step: string;
  title: string;
  description: string;
  detail: string;
}

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

function JourneyDetailCard({ active }: { active: JourneyStep }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );

  useLayoutEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const measure = () =>
      setSize({ width: el.offsetWidth, height: el.offsetHeight });
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const dots = size
    ? getRoundedRectPerimeterPoints(
        size.width,
        size.height,
        CARD_CORNER_RADIUS,
        BORDER_DOT_SPACING,
      )
    : [];

  return (
    <div
      ref={cardRef}
      aria-live="polite"
      className="flex flex-col relative h-full rounded-xl border-4 border-transparent bg-light-surface-dim p-6 motion-safe:animate-[fade-up-in_0.3s_ease-out_both] dark:bg-dark-surface-dim"
    >
      {dots.map((point, index) => (
        <span
          key={index}
          aria-hidden="true"
          style={{
            left: point.x - CARD_BORDER_WIDTH,
            top: point.y - CARD_BORDER_WIDTH,
            animationDelay: `${(index / dots.length) * BORDER_SWEEP_DURATION_MS}ms`,
          }}
          className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-light-accent motion-safe:animate-[pop-in_220ms_ease-out_both] dark:bg-dark-accent"
        />
      ))}

      <p className="badge text-light-text-secondary dark:text-dark-text-secondary">
        STEP {active.step}
      </p>
      <p className="body mt-2 text-xl font-bold text-light-text dark:text-dark-text">
        {active.title}
      </p>
      <p className="body mt-5 text-light-text-secondary dark:text-dark-text-secondary flex-1">
        {active.detail}
      </p>
    </div>
  );
}

export default function AboutVision() {
  const { ref, isInView } = useInView<HTMLElement>();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = JOURNEY[activeIndex];
  const stepRefs = useRef<(HTMLLIElement | null)[]>([]);

  // 뷰포트 중앙의 가느다란 띠를 스크롤로 지나가는 단계를 순서대로 활성화 (클릭 선택은 그대로 유지)
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
    <section ref={ref} aria-label="기록의 여정">
      <h3 className="section-header text-light-text-secondary dark:text-dark-text-secondary">
        기록의 여정
      </h3>

      <div className="mt-8 grid grid-cols-1 gap-10 md:grid-cols-2">
        <ol className="list-none">
          {JOURNEY.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <li
                key={item.title}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                style={{ animationDelay: `${index * 150}ms` }}
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
              </li>
            );
          })}
        </ol>

        <JourneyDetailCard key={activeIndex} active={active} />
      </div>
    </section>
  );
}
