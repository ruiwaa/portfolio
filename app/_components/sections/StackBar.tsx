const STACK_ITEMS = [
  "REACT 18",
  "NEXT.JS (APP ROUTER)",
  "TYPESCRIPT",
  "TAILWIND CSS",
  "SUPABASE",
  "WEB PERFORMANCE & CORE VITALS",
  "ACCESSIBILITY FIRST",
  "DESIGN SYSTEMS",
];

export default function StackBar() {
  return (
    <section
      aria-label="기술 스택 및 개발 철학"
      className="anim-fade-up delay-300 -mx-6 mt-10 flex items-center gap-8 overflow-hidden border-y border-light-border py-4 sm:-mx-12 dark:border-dark-border"
    >
      <div className="flex shrink-0 items-center gap-2 pl-6 sm:pl-12">
        <span aria-hidden="true" className="status-dot" />
        <span className="badge tracking-wide whitespace-nowrap text-light-text-secondary dark:text-lime-600">
          STACK & PHILOSOPHY
        </span>
      </div>

      <div className="overflow-hidden" aria-hidden="true">
        <div className="marquee-track flex items-center gap-8">
          {[...STACK_ITEMS, ...STACK_ITEMS].map((item, index) => (
            <span
              key={index}
              className="badge tracking-wide whitespace-nowrap text-light-text-secondary dark:text-dark-text-secondary"
            >
              {item}
              <span aria-hidden="true" className="ml-8">
                •
              </span>
            </span>
          ))}
        </div>
      </div>

      <p className="sr-only">{STACK_ITEMS.join(", ")}</p>
    </section>
  );
}
