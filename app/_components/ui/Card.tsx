import type { ReactNode } from "react";

type CardAccent = "mint" | "peach" | "sky" | "purple" | "white";

interface CardProps {
  children: ReactNode;
  className?: string;
  accent?: CardAccent;
  // 기본 안쪽 여백(p-8) 사용 여부. className으로 p-0을 넘겨도 p-8과 우선순위가 같아 CSS 순서상 p-8이 이겨
  // 여백이 지워지지 않으므로, 여백이 필요 없는 카드는 이 값을 false로 넘김
  padded?: boolean;
  // 라이트 모드에서 사방에 파란 테두리(light-accent). className으로 테두리 색을 덮으면 아래 border-light-border와 우선순위가 같아
  // 어느 쪽이 적용될지 보장되지 않으므로 옵션으로 둠. 다크는 기존처럼 아래쪽 테두리만
  accentBorder?: boolean;
}

const ACCENT_BG: Record<CardAccent, string> = {
  mint: "bg-mint",
  peach: "bg-peach",
  sky: "bg-sky",
  purple: "bg-purple",
  // 색 배경(띠) 위에 놓이는 카드용
  white: "bg-light-surface",
};

export default function Card({
  children,
  className = "",
  accent,
  padded = true,
  accentBorder = false,
}: CardProps) {
  const lightBg = accent ? ACCENT_BG[accent] : "bg-light-surface-dim";
  const darkBg = accent ? "" : "dark:bg-dark-surface-dim";

  return (
    <div
      className={`rounded-lg ${padded ? "p-8" : ""} ${lightBg} ${accentBorder ? "border border-light-accent dark:border-x-0 dark:border-t-0" : "border-b border-light-border"} ${darkBg} dark:border-dark-border ${className}`}
    >
      {children}
    </div>
  );
}
