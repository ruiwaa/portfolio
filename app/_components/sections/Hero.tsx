import Link from "next/link";

export default function Hero() {
  return (
    <section aria-label="소개" className="flex flex-col justify-center">
      <h1 className="h1 text-light-text dark:text-dark-text">
        기록하고,
        <br />
        배우고,
        <br />
        나아갑니다
      </h1>
      <p className="body mt-6 flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
        <span
          aria-hidden="true"
          className="h-4 w-px bg-light-border dark:bg-dark-border"
        />
        FRONTEND DEVELOPER
      </p>
      <Link
        href="/experience"
        className="mt-8 inline-flex w-fit items-center rounded-full border px-4 py-2 border-light-border text-light-text-secondary badge transition-colors duration-200 hover:border-light-accent hover:text-light-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:text-dark-text-secondary dark:hover:border-dark-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
      >
        VIEW PROJECTS
      </Link>
    </section>
  );
}
