"use client";

export interface JourneyStep {
  step: string;
  title: string;
  description: string;
  detail: string;
}

// 본문 속 수치(예: "2,000개", "90점")를 강조색으로 표시하기 위해 숫자(쉼표 포함) 단위로 텍스트를 쪼갬
function withHighlightedNumbers(text: string) {
  return text.split(/(\d[\d,]*)/g).map((part, index) =>
    /^\d[\d,]*$/.test(part) ? (
      <strong
        key={index}
        className="font-bold text-light-accent dark:text-dark-accent"
      >
        {part}
      </strong>
    ) : (
      part
    ),
  );
}

export default function JourneyDetailCard({
  active,
  isInView,
  animationDelayMs = 0,
}: {
  active: JourneyStep;
  isInView: boolean;
  animationDelayMs?: number;
}) {
  return (
    <div
      aria-live="polite"
      style={{ animationDelay: `${animationDelayMs}ms` }}
      className={`flex flex-col relative h-full rounded-xl border-4 border-white bg-light-surface-dim p-6 motion-safe:opacity-0 dark:bg-dark-surface-dim ${
        isInView ? "motion-safe:animate-[fade-up-in_0.3s_ease-out_both]" : ""
      }`}
    >
      {/* 활성 단계를 가리키는 일직선 화살표 - 카드 왼쪽에서 단계 쪽(왼쪽)으로 향함.
          화살촉 중심(data-journey-connector-dot)이 AboutVision에서 활성 단계 번호 원과 높이를 맞추는 기준점 */}
      <svg
        aria-hidden="true"
        viewBox="0 0 40 16"
        className="pointer-events-none absolute top-8 -left-10 hidden h-4 w-10 md:block"
      >
        <line
          x1="8"
          y1="8"
          x2="40"
          y2="8"
          strokeWidth="2"
          strokeLinecap="round"
          className="stroke-light-accent dark:stroke-dark-accent"
        />
        <polygon
          data-journey-connector-dot
          points="0,8 9,3 9,13"
          className="fill-light-accent dark:fill-dark-accent"
        />
      </svg>

      <h3 className="badge text-light-text-secondary dark:text-dark-text-secondary">
        STEP {active.step}
      </h3>
      <h4 className="body mt-2 text-xl font-bold text-light-text dark:text-dark-text">
        {active.title}
      </h4>
      <p className="body mt-5 text-light-text-secondary dark:text-dark-text-secondary flex-1">
        {withHighlightedNumbers(active.detail)}
      </p>
    </div>
  );
}
