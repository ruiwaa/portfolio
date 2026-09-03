import Link from "next/link";
import { LAYOUT } from "@/lib/constants";

// TODO: LINKEDIN, TWITTER 실제 프로필 URL로 교체
const SOCIAL_LINKS = [
  { label: "GITHUB", href: "https://github.com/ruiwaa" },
  { label: "LINKEDIN", href: "#" },
  { label: "TWITTER", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className={`border-t border-light-border ${LAYOUT.padding} py-8 dark:border-dark-border`}
    >
      <div
        className={`flex flex-col items-center justify-between gap-4 ${LAYOUT.container} mx-auto sm:flex-row`}
      >
        <Link href="/" className="text-light-text logo dark:text-dark-text">
          YEJI.
        </Link>

        <p className="badge text-light-text-secondary dark:text-dark-text-secondary">
          © {year} YEJI. ALL RIGHTS RESERVED.
        </p>

        <ul className={`flex ${LAYOUT.componentGap}`}>
          {SOCIAL_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                {...(link.href.startsWith("http")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="badge text-light-text-secondary transition-colors duration-200 hover:text-light-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:text-dark-text-secondary dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
