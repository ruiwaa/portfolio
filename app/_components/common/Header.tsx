"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LAYOUT } from "@/lib/constants";
import ThemeToggle from "./ThemeToggle";

const NAV_ITEMS = [
  { href: "/about", label: "About Me" },
  { href: "/experience", label: "Experience & Projects" },
  { href: "/posts", label: "Posts" },
  { href: "/resume", label: "Resume" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={`sticky top-0 z-50 ${LAYOUT.navHeight} border-b border-light-border bg-light-surface dark:border-dark-border dark:bg-dark-surface`}>
      <div className={`mx-auto flex h-full ${LAYOUT.container} items-center justify-between ${LAYOUT.padding}`}>
        <Link href="/" className="logo text-light-text dark:text-dark-text">
          YEJI.
        </Link>

        <nav aria-label="메인 네비게이션">
          <ul className={`flex items-center ${LAYOUT.componentGap}`}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`body inline-block py-1 transition-colors duration-200 hover:text-light-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent ${
                      isActive
                        ? "text-light-accent underline dark:text-dark-accent"
                        : "text-light-text dark:text-dark-text"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
}
