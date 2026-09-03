import { LAYOUT } from "@/lib/constants";

export default function PostsSkeleton() {
  return (
    <section aria-label="포스트 목록 로딩 중">
      <h2 className="section-header text-light-text-secondary dark:text-dark-text-secondary">
        POSTS
      </h2>
      <div
        className={`mt-6 grid grid-cols-1 md:grid-cols-2 ${LAYOUT.componentGap}`}
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="animate-pulse overflow-hidden rounded-lg bg-light-surface-dim dark:bg-dark-surface-dim"
          >
            <div className="h-40 w-full bg-light-border dark:bg-dark-border" />
            <div className="space-y-3 p-6">
              <div className="h-4 w-16 rounded bg-light-border dark:bg-dark-border" />
              <div className="h-5 w-3/4 rounded bg-light-border dark:bg-dark-border" />
              <div className="h-4 w-full rounded bg-light-border dark:bg-dark-border" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
