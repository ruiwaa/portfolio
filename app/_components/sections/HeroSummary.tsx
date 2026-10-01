// Hero 인사말 전환(1700ms) 이후에 등장하도록 지연 - Hero의 GREETING_SWITCH_DELAY_MS와 맞춤
const SUMMARY_ANIMATION_DELAY_MS = 1900;

const HIGHLIGHTS = [
  "기업 연계 프로젝트 프론트엔드 단독",
  "개선 요청 37건 중 35건 반영",
  "기술 블로그 25편",
] as const;

export default function HeroSummary() {
  return (
    <div
      style={{ animationDelay: `${SUMMARY_ANIMATION_DELAY_MS}ms` }}
      className="mx-auto mt-10 w-full max-w-3xl border-t border-light-border pt-6 motion-safe:opacity-0 motion-safe:animate-[fade-up-in_0.6s_ease-out_both] dark:border-dark-border"
    >
      <p className="badge tracking-wide text-light-text dark:text-dark-text">
        장예지 · FRONTEND DEVELOPER
      </p>
      <ul
        aria-label="주요 경력"
        className="mt-3 flex flex-col gap-1 body text-light-text-secondary sm:flex-row sm:flex-wrap sm:gap-0 dark:text-dark-text-secondary"
      >
        {HIGHLIGHTS.map((item) => (
          <li
            key={item}
            className="sm:border-l sm:border-light-border sm:px-4 sm:first:border-l-0 sm:first:pl-0 dark:sm:border-dark-border"
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
