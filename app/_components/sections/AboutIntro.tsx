"use client";

import { SiGithub, SiVelog } from "react-icons/si";

import Badge from "@/app/_components/ui/Badge";
import { useInView } from "@/app/_hooks/useInView";

const PROFILE_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/ruiwaa",
    Icon: SiGithub,
  },
  {
    label: "Velog",
    href: "https://velog.io/@ruiwaa",
    Icon: SiVelog,
    color: "#20C997",
  },
];

export default function AboutIntro() {
  const { ref, isInView } = useInView<HTMLElement>();

  return (
    <section ref={ref} aria-label="소개" className="overflow-x-hidden">
      <h2
        style={{ animationDelay: "0ms" }}
        className={`relative mt-10 text-2xl text-center motion-safe:opacity-0 text-light-text-secondary dark:text-dark-text-secondary ${
          isInView ? "motion-safe:animate-[fade-up-in_0.6s_ease-out_both]" : ""
        }`}
      >
        <span aria-hidden="true" className="absolute inset-0 -z-10">
          <span className="absolute top-1/2 left-1/2 h-20 w-56 -translate-x-[58%] -translate-y-[95%] -rotate-6 rounded-[50%] bg-mint sm:h-24 sm:w-72 dark:bg-mint/45" />
          <span className="absolute top-1/2 left-1/2 h-20 w-56 -translate-x-[50%] -translate-y-[50%] rotate-2 rounded-[50%] bg-peach sm:h-24 sm:w-72 dark:bg-peach/45" />
          <span className="absolute top-1/2 left-1/2 h-20 w-56 -translate-x-[42%] -translate-y-[5%] -rotate-3 rounded-[50%] bg-sky sm:h-24 sm:w-72 dark:bg-sky/45" />
        </span>
        <strong>기록</strong>하고 배우며 <strong>성장</strong>하는
        <br />
        프론트엔드 개발자 <strong>장예지</strong>입니다.
      </h2>

      <ul
        aria-label="외부 링크"
        style={{ animationDelay: "80ms" }}
        className={`mt-6 flex flex-wrap justify-center gap-2 motion-safe:opacity-0 ${
          isInView ? "motion-safe:animate-[fade-up-in_0.5s_ease-out_both]" : ""
        }`}
      >
        {PROFILE_LINKS.map(({ label, href, Icon, color }) => (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded transition-transform duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent"
            >
              <Badge
                label={label}
                icon={
                  <Icon
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                    style={color ? { color } : undefined}
                  />
                }
              />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
