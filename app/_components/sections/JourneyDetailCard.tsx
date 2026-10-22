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
  onBand = false,
}: {
  active: JourneyStep;
  isInView: boolean;
  animationDelayMs?: number;
  // 회색 띠(홈 About Me) 위에서는 카드가 배경과 같은 색이 되어 묻히므로 흰색으로. /about처럼 흰 배경에서는 기존 회색 유지
  onBand?: boolean;
}) {
  return (
    <div
      aria-live="polite"
      style={{ animationDelay: `${animationDelayMs}ms` }}
      className={`flex flex-col relative h-full rounded-xl border-4 border-white ${onBand ? "bg-light-surface" : "bg-light-surface-dim"} p-6 motion-safe:opacity-0 dark:bg-dark-surface-dim ${
        isInView ? "motion-safe:animate-[fade-up-in_0.3s_ease-out_both]" : ""
      }`}
    >
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
