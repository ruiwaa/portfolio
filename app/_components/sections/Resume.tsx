// TODO: 실제 이력서 링크(Notion 등)와 PDF 파일 경로로 교체
const RESUME_VIEW_URL = "#";
const RESUME_PDF_URL = "#";

export default function Resume() {
  return (
    <section
      aria-label="이력서"
      className="grid-pattern-bg relative flex min-h-[70vh] flex-col items-center justify-center overflow-hidden py-20"
    >
      <h1 className="text-[clamp(4rem,15vw,12rem)] font-bold tracking-widest text-light-text dark:text-dark-text">
        RESUME
      </h1>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href={RESUME_VIEW_URL}
          className="body rounded-full bg-light-text px-6 py-3 text-light-surface transition-colors duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:bg-dark-text dark:text-dark-surface dark:focus-visible:outline-dark-accent"
        >
          이력서 보기
        </a>
        <a
          href={RESUME_PDF_URL}
          className="body rounded-full border px-6 py-3 border-light-border text-light-text transition-colors duration-200 hover:border-light-accent hover:text-light-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:text-dark-text dark:hover:border-dark-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
        >
          PDF 다운로드
        </a>
      </div>

      <p className="badge absolute bottom-6 text-light-text-secondary dark:text-dark-text-secondary">
        SYS.READY // DOC.AVAILABLE
      </p>
    </section>
  );
}
