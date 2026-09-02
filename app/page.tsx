import Link from "next/link";
import Card from "@/app/_components/ui/Card";
import Badge from "@/app/_components/ui/Badge";
import { LAYOUT } from "@/lib/constants";

const TECH_STACK = ["Next.js", "React", "TypeScript", "Tailwind CSS", "Supabase"];

const RECORDER_ITEMS = [
  { number: "01", label: "About Me", href: "/about", accent: "mint" as const },
  {
    number: "02",
    label: "Experience & Projects",
    href: "/experience",
    accent: "peach" as const,
  },
  { number: "03", label: "Posts", href: "/posts", accent: "sky" as const },
  { number: "04", label: "Resume", href: "/resume", accent: "purple" as const },
];

export default function Home() {
  return (
    <main
      className={`flex-1 flex flex-col ${LAYOUT.container} mx-auto ${LAYOUT.padding} py-20 ${LAYOUT.sectionGap}`}
    >
      <section aria-label="소개">
        <h1 className="h1 text-light-text dark:text-dark-text">YEJI.</h1>
        <ul className={`mt-6 flex flex-wrap ${LAYOUT.componentGap}`}>
          {TECH_STACK.map((tech) => (
            <li key={tech}>
              <Badge label={tech} />
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="포트폴리오 네비게이션">
        <h2 className="section-header text-light-text-secondary dark:text-dark-text-secondary">
          MY RECORDER
        </h2>
        <ul
          className={`mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 ${LAYOUT.componentGap}`}
        >
          {RECORDER_ITEMS.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-lg transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent"
              >
                <Card accent={item.accent}>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="badge text-light-text">{item.number}</span>
                      <p className="body mt-2 text-light-text">{item.label}</p>
                    </div>
                    <span aria-hidden="true" className="text-light-text">
                      →
                    </span>
                  </div>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
