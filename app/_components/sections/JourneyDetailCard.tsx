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

// 마침표 뒤 공백에서 문장을 나눔 ("2,000개"의 쉼표처럼 마침표가 아닌 곳은 나누지 않음)
const SENTENCE_BREAK = /(?<=\.)\s+/;

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
      {/* 문장마다 줄을 바꿔 한 단락(문장)이 한 줄로 보이게 함 - 넓은 화면(1280px)에서는 모든 문장이 한 줄에 들어가고,
          좁은 화면에서는 긴 문장만 자기 줄 안에서 줄바꿈됨 */}
      <p className="body mt-5 text-light-text-secondary dark:text-dark-text-secondary flex-1">
        {active.detail.split(SENTENCE_BREAK).map((sentence, index) => (
          <span key={index} className="block">
            {withHighlightedNumbers(sentence)}
          </span>
        ))}
      </p>
    </div>
  );
}
