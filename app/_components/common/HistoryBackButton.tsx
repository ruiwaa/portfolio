"use client";

import { History } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HistoryBackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.back()}
      className="body flex items-center gap-2 rounded-full border border-light-border px-6 py-3 text-light-text transition-colors duration-200 hover:border-light-accent hover:text-light-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border-dark-border dark:text-dark-text dark:hover:border-dark-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
    >
      <History aria-hidden="true" size={18} />
      이전 기록으로 복귀
    </button>
  );
}
