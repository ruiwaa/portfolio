"use client";

import { useLayoutEffect, useRef, useState } from "react";

import { getRoundedRectPerimeterPoints } from "@/app/_lib/geometry";

export interface JourneyStep {
  step: string;
  title: string;
  description: string;
  detail: string;
}

// 카드에 적용된 rounded-xl(12px), border-4(4px)와 반드시 일치해야 점이 테두리에서 어긋나지 않음
const CARD_CORNER_RADIUS = 12;
const CARD_BORDER_WIDTH = 4;
// 점 사이 간격(px) - 카드 크기와 무관하게 이 간격을 유지하도록 점 개수를 역산함
const BORDER_DOT_SPACING = 8;
// 점이 많아져도(간격이 촘촘해져도) 테두리 한 바퀴를 도는 총 시간은 이 값으로 고정
const BORDER_SWEEP_DURATION_MS = 700;

export default function JourneyDetailCard({
  active,
  isInView,
}: {
  active: JourneyStep;
  isInView: boolean;
}) {
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
      className={`flex flex-col relative h-full rounded-xl border-4 border-white md:border-transparent bg-light-surface-dim p-6 motion-safe:opacity-0 dark:bg-dark-surface-dim ${
        isInView ? "motion-safe:animate-[fade-up-in_0.3s_ease-out_both]" : ""
      }`}
    >
      {/* 타임라인에서 카드가 가지처럼 뻗어나온 듯한 연결부 - 모바일 인라인 카드에는 표시하지 않음 */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 60"
        className="pointer-events-none absolute top-8 -left-24 hidden h-16 w-24 md:block"
      >
        <path
          d="M100 30 C 60 30, 55 8, 10 8"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-light-accent dark:stroke-dark-accent"
        />
        <circle
          cx="10"
          cy="8"
          r="3.5"
          className="fill-light-accent dark:fill-dark-accent"
        />
      </svg>

      {/* 모바일에서는 점 애니메이션 대신 위의 border-white로 테두리를 표시하고,
          md 이상에서만 점이 테두리를 도는 애니메이션을 적용함 */}
      <div className="hidden md:contents">
        {dots.map((point, index) => (
          <span
            key={index}
            aria-hidden="true"
            style={{
              left: point.x - CARD_BORDER_WIDTH,
              top: point.y - CARD_BORDER_WIDTH,
              animationDelay: `${(index / dots.length) * BORDER_SWEEP_DURATION_MS}ms`,
            }}
            className={`absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-light-accent motion-safe:opacity-0 dark:bg-dark-accent ${
              isInView
                ? "motion-safe:animate-[pop-in_220ms_ease-out_both]"
                : ""
            }`}
          />
        ))}
      </div>

      <p className="badge text-light-text-secondary dark:text-dark-text-secondary">
        STEP {active.step}
      </p>
      <h3 className="body mt-2 text-xl font-bold text-light-text dark:text-dark-text">
        {active.title}
      </h3>
      <p className="body mt-5 text-light-text-secondary dark:text-dark-text-secondary flex-1">
        {active.detail}
      </p>
    </div>
  );
}
