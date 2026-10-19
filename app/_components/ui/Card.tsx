import type { ReactNode } from "react";

type CardAccent = "mint" | "peach" | "sky" | "purple";

interface CardProps {
  children: ReactNode;
  className?: string;
  accent?: CardAccent;
  // 기본 안쪽 여백(p-8) 사용 여부. className으로 p-0을 넘겨도 p-8과 우선순위가 같아 CSS 순서상 p-8이 이겨
  // 여백이 지워지지 않으므로, 여백이 필요 없는 카드는 이 값을 false로 넘김
  padded?: boolean;
}

const ACCENT_BG: Record<CardAccent, string> = {
  mint: "bg-mint",
  peach: "bg-peach",
  sky: "bg-sky",
  purple: "bg-purple",
};

export default function Card({
  children,
  className = "",
  accent,
  padded = true,
}: CardProps) {
  const lightBg = accent ? ACCENT_BG[accent] : "bg-light-surface-dim";
  const darkBg = accent ? "" : "dark:bg-dark-surface-dim";

  return (
    <div
      className={`rounded-lg ${padded ? "p-8" : ""} ${lightBg} border-b border-light-border ${darkBg} dark:border-dark-border ${className}`}
    >
      {children}
    </div>
  );
}
