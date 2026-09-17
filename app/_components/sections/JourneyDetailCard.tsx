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
