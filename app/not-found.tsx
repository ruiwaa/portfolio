import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import HistoryBackButton from "@/app/_components/common/HistoryBackButton";
import ResumeWaveGrid from "@/app/_components/sections/ResumeWaveGrid";

export default function NotFound() {
  return (
    <main className="flex flex-1 flex-col">
      <section
        aria-label="페이지를 찾을 수 없음"
        className="relative flex flex-1 min-h-[70vh] flex-col items-center justify-center overflow-hidden py-20"
      >
        <ResumeWaveGrid />

        <p className="badge flex items-center gap-2 rounded-full border border-light-border bg-light-surface-dim px-4 py-2 text-light-text-secondary dark:border-dark-border dark:bg-dark-surface-dim dark:text-dark-text-secondary">
          <span
            aria-hidden="true"
            className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-red-500"
          />
          SYS.WARN // ROUTE_NOT_FOUND :: UNRECORDED_PATH
        </p>

        <h1 className="mt-8 text-[clamp(4rem,15vw,12rem)] font-extrabold tracking-tighter text-light-text dark:text-dark-text">
          404
        </h1>

        <p className="badge mt-4 flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
          <span aria-hidden="true">|</span>
          기록되지 않은 경로입니다
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="body flex items-center gap-2 rounded-full bg-light-text px-6 py-3 text-light-surface transition-colors duration-200 hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:bg-dark-text dark:text-dark-surface dark:focus-visible:outline-dark-accent"
          >
            <ArrowLeft aria-hidden="true" size={18} />
            홈으로 돌아가기
          </Link>
          <HistoryBackButton />
        </div>
      </section>
    </main>
  );
}
