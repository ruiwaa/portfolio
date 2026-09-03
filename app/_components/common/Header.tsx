"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-light-border bg-light-surface dark:border-dark-border dark:bg-dark-surface">
      <div
        className={`flex items-center justify-between ${LAYOUT.navHeight} ${LAYOUT.container} mx-auto ${LAYOUT.padding}`}
      >
        <Link href="/" className="text-light-text logo dark:text-dark-text">
          YEJI.
        </Link>

        <nav aria-label="메인 네비게이션" className="hidden md:block">
          <ul className={`flex items-center ${LAYOUT.componentGap}`}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`inline-block py-1 ${
                      isActive ? "text-light-accent underline" : "text-light-text"
                    } text-lg transition-colors duration-200 hover:text-light-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent ${
                      isActive ? "dark:text-dark-accent" : "dark:text-dark-text"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-light-text transition-colors duration-200 hover:bg-light-surface-dim focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:text-dark-text dark:hover:bg-dark-surface-dim dark:focus-visible:outline-dark-accent md:hidden"
          >
            {isMenuOpen ? (
              <X aria-hidden="true" />
            ) : (
              <Menu aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-nav"
          aria-label="모바일 메뉴"
          className="border-t border-light-border bg-light-surface dark:border-dark-border dark:bg-dark-surface md:hidden"
        >
          <ul className={`flex flex-col ${LAYOUT.padding} py-4 ${LAYOUT.componentGap}`}>
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive ? "page" : undefined}
                    className={`text-lg block py-2 ${
                      isActive ? "text-light-accent underline" : "text-light-text"
                    } transition-colors duration-200 hover:text-light-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent ${
                      isActive ? "dark:text-dark-accent" : "dark:text-dark-text"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
