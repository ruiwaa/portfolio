import type { ReactNode } from "react";

type CardAccent = "mint" | "peach" | "sky" | "purple" | "white";

interface CardProps {
  children: ReactNode;
  className?: string;
  accent?: CardAccent;
  // 기본 안쪽 여백(p-8) 사용 여부. className으로 p-0을 넘겨도 p-8과 우선순위가 같아 CSS 순서상 p-8이 이겨
  // 여백이 지워지지 않으므로, 여백이 필요 없는 카드는 이 값을 false로 넘김
  padded?: boolean;
  // 라이트 모드에서 테두리 대신 강조색(#0066cc) 블러 그림자로 카드 둘레를 은은하게 빛나게 함. 다크는 그림자 없이 기존처럼 아래쪽 테두리만
  // (다크의 ring도 box-shadow라 그림자를 남기면 섞이므로 dark:shadow-none)
  accentGlow?: boolean;
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
  accentGlow = false,
}: CardProps) {
  const lightBg = accent ? ACCENT_BG[accent] : "bg-light-surface-dim";
  const darkBg = accent ? "" : "dark:bg-dark-surface-dim";

  return (
    <div
      className={`rounded-lg ${padded ? "p-8" : ""} ${lightBg} ${accentGlow ? "border-b border-transparent shadow-[0_0_18px_rgba(0,102,204,0.35)] dark:shadow-none" : "border-b border-light-border"} ${darkBg} dark:border-dark-border ${className}`}
    >
      {children}
    </div>
  );
}
