import Link from "next/link";
import Card from "@/app/_components/ui/Card";
import { LAYOUT } from "@/lib/constants";

type Accent = "mint" | "peach" | "sky" | "purple";

interface RecorderItem {
  number: string;
  label: string;
  href: string;
  accent: Accent;
}

const RECORDER_ITEMS: RecorderItem[] = [
  { number: "01", label: "About Me", href: "/about", accent: "mint" },
  {
    number: "02",
    label: "Experience & Projects",
    href: "/experience",
    accent: "peach",
  },
  { number: "03", label: "Posts", href: "/posts", accent: "sky" },
  { number: "04", label: "Resume", href: "/resume", accent: "purple" },
];

export default function MyRecorder() {
  return (
    <section aria-label="포트폴리오 네비게이션">
      <h2 className="section-header text-light-text-secondary dark:text-dark-text-secondary">
        MY RECORDER
      </h2>
      <div className={`mt-6 flex flex-col ${LAYOUT.componentGap}`}>
        {RECORDER_ITEMS.map((item) => (
          <article key={item.href}>
            <Link
              href={item.href}
              className="group block rounded-lg transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent"
            >
              <Card
                accent={item.accent}
                className="transition-[filter] duration-200 group-hover:brightness-95"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <span className="badge text-light-text">{item.number}</span>
                    <p className="body mt-2 text-light-text">{item.label}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="text-light-text transition-transform duration-200 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </Card>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
