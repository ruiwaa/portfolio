import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Card from "@/app/_components/ui/Card";
import { LAYOUT } from "@/lib/constants";

type Accent = "mint" | "peach" | "sky" | "purple";

// About Intro 배경 도형과 동일한 다크모드 처리(45% 불투명도) - AboutIntro에는 purple 색상이
// 없어 mint/peach/sky와 균형을 맞춰 동일한 45%를 그대로 적용
const DARK_ACCENT_BG: Record<Accent, string> = {
  mint: "dark:bg-mint/45",
  peach: "dark:bg-peach/45",
  sky: "dark:bg-sky/45",
  purple: "dark:bg-purple/45",
};

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
        {RECORDER_ITEMS.map((item, index) => (
          <article key={item.href} className={`anim-card-${index + 1}`}>
            <Link
              href={item.href}
              className="group block rounded-lg transition-transform duration-200 hover:-translate-y-1.5 hover:scale-[1.01] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent"
            >
              <Card
                accent={item.accent}
                className={`flex min-h-30 items-center transition-[filter] duration-200 group-hover:brightness-95 ${DARK_ACCENT_BG[item.accent]}`}
              >
                <div className="flex  flex-row w-full items-center justify-between">
                  <h2 className="headline-lg min-w-0 text-light-text dark:text-dark-accent dark:[-webkit-text-stroke:1px_gray]">
                    {item.label}
                  </h2>
                  <span
                    aria-hidden="true"
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-light-surface text-light-text transition-transform duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 dark:bg-dark-text dark:text-dark-surface"
                  >
                    <ArrowUpRight size={16} strokeWidth={3} />
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
