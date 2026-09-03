import type { ReactNode } from "react";

type CardAccent = "mint" | "peach" | "sky" | "purple";

interface CardProps {
  children: ReactNode;
  className?: string;
  accent?: CardAccent;
}

const ACCENT_BG: Record<CardAccent, string> = {
  mint: "bg-mint",
  peach: "bg-peach",
  sky: "bg-sky",
  purple: "bg-purple",
};

export default function Card({ children, className = "", accent }: CardProps) {
  const lightBg = accent ? ACCENT_BG[accent] : "bg-light-surface-dim";
  const darkBg = accent ? "" : "dark:bg-dark-surface-dim";

  return (
    <div
      className={`rounded-lg p-8 ${lightBg} border-b border-light-border ${darkBg} dark:border-dark-border ${className}`}
    >
      {children}
    </div>
  );
}
