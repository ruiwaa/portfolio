import { FileDown } from "lucide-react";
import { SiFigma, SiNotion } from "react-icons/si";

import ResumeWaveGrid from "@/app/_components/sections/ResumeWaveGrid";

const RESUME_FIGMA_URL =
  "https://www.figma.com/proto/sQ07QbfY8jb13qkYDQ5pHD/resume?node-id=0-1&t=Ju3wuINpA5XnSosD-1";
const RESUME_NOTION_URL =
  "https://app.notion.com/p/3dc01fb4da2a80fe89e4c308d593093f?source=copy_link";
const RESUME_PDF_URL = "/resume/%EC%9E%A5%EC%98%88%EC%A7%80_%EC%9D%B4%EB%A0%A5%EC%84%9C.pdf";

export default function Resume() {
  return (
    <section
      aria-label="이력서"
      className="relative flex flex-1 min-h-[70vh] flex-col items-center justify-center overflow-hidden py-20"
    >
      <ResumeWaveGrid />

      <h1 className="text-[clamp(4rem,15vw,12rem)] font-bold tracking-widest text-light-text dark:text-dark-text">
        RESUME
      </h1>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <a
          href={RESUME_FIGMA_URL}
          target="_blank"
          rel="noopener"
          className="body inline-flex items-center gap-2 rounded-full bg-light-text px-6 py-3 text-light-surface transition-colors duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:bg-dark-text dark:text-dark-surface dark:focus-visible:outline-dark-accent"
        >
          <SiFigma aria-hidden="true" className="h-4 w-4" />
          피그마로 보기
        </a>
        <a
          href={RESUME_NOTION_URL}
          target="_blank"
          rel="noopener"
          className="body inline-flex items-center gap-2 rounded-full border px-6 py-3 border-light-border text-light-text transition-colors duration-200 hover:border-light-accent hover:text-light-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:text-dark-text dark:hover:border-dark-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
        >
          <SiNotion aria-hidden="true" className="h-4 w-4" />
          노션으로 보기
        </a>
        <a
          href={RESUME_PDF_URL}
          download="장예지_이력서.pdf"
          className="body inline-flex items-center gap-2 rounded-full border px-6 py-3 border-light-border text-light-text transition-colors duration-200 hover:border-light-accent hover:text-light-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:text-dark-text dark:hover:border-dark-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
        >
          <FileDown aria-hidden="true" className="h-4 w-4" />
          PDF 다운로드
        </a>
      </div>

      <p className="badge absolute bottom-6 text-light-text-secondary dark:text-dark-text-secondary">
        SYS.READY // DOC.AVAILABLE
      </p>
    </section>
  );
}
