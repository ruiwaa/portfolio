"use client";

import { useState, useSyncExternalStore } from "react";

const STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "theme-change";

function subscribe(callback: () => void) {
  window.addEventListener(THEME_CHANGE_EVENT, callback);
  return () => window.removeEventListener(THEME_CHANGE_EVENT, callback);
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleTheme = () => {
    const next = !isDark;

    setIsAnimating(true);
    window.setTimeout(() => setIsAnimating(false), 300);

    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem(STORAGE_KEY, next ? "dark" : "light");
    window.dispatchEvent(new Event(THEME_CHANGE_EVENT));
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label="테마 변경"
      onClick={toggleTheme}
      className="flex h-9 w-9 items-center justify-center rounded-full text-lg transition-colors duration-200 hover:bg-light-surface-dim focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:hover:bg-dark-surface-dim dark:focus-visible:outline-dark-accent"
    >
      <span
        aria-hidden="true"
        className={`inline-block transition-opacity duration-300 ${
          isAnimating ? "opacity-0" : "opacity-100"
        }`}
      >
        {isDark ? "☀️" : "🌙"}
      </span>
    </button>
  );
}
