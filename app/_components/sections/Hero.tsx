export default function Hero() {
  return (
    <section aria-label="소개" className="flex flex-col justify-center">
      <span className="anim-badge-in mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-light-border px-3 py-1 badge tracking-wide text-light-text-secondary dark:border-dark-border dark:text-dark-text-secondary">
        <span aria-hidden="true" className="status-dot" />
        SYS.LOG // CONTINUOUS LEARNING_
      </span>
      <h1 className="h1 text-light-text dark:text-dark-text">
        <span className="anim-headline-line1 relative block w-fit">
          기록하고,
          <span
            aria-hidden="true"
            className="anim-underline-1 absolute inset-x-0 -bottom-1 h-1 rounded-full bg-light-accent dark:bg-dark-accent"
          />
        </span>
        <span className="anim-headline-line2 relative block w-fit">
          배우고,
          <span
            aria-hidden="true"
            className="anim-underline-2 absolute inset-x-0 -bottom-1 h-1 rounded-full bg-light-accent dark:bg-dark-accent"
          />
        </span>
        <span className="anim-headline-line3 relative block w-fit">
          나아갑니다
          <span
            aria-hidden="true"
            className="anim-underline-3 absolute inset-x-0 -bottom-1 h-1 rounded-full bg-light-accent dark:bg-dark-accent"
          />
        </span>
      </h1>
      <div className="anim-cta-entrance mt-6">
        <p className="body flex items-center gap-2 text-light-text-secondary dark:text-lime-400">
          <span
            aria-hidden="true"
            className="h-4 w-px bg-light-border dark:bg-dark-border "
          />
          FRONTEND DEVELOPER
        </p>
      </div>
    </section>
  );
}
