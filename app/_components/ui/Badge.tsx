import type { ReactNode } from "react";

interface BadgeProps {
  label: string;
  // onColor·onColorOutline: 파란 배경(포스트 카드, 라이트 모드) 위에 놓이는 배지 - 다크 모드는 default·outline과 같음
  variant?: "default" | "outline" | "onColor" | "onColorOutline";

  size?: "default" | "compact";
  icon?: ReactNode;
  className?: string;
}

const SIZE_CLASSES = {
  default: "h-8 gap-1.5 px-2 py-1 text-[16px]",
  compact:
    "h-6 gap-1 px-1.5 py-0.5 text-[12px] sm:h-8 sm:gap-1.5 sm:px-2 sm:py-1 sm:text-[16px]",
} as const;

// 라이트 모드 배경·테두리·글자색 (+ 다크 배경). 색 배경 위 배지는 흰 글자 대비 4.5:1 이상이 되도록 배경을 흰색 10%로만 깖
// (포스트 카드 #2f5f9e 위 흰색 10% → 흰 글자 대비 5.14:1)
const VARIANT_CLASSES = {
  default:
    "bg-light-surface border-light-border text-light-text-secondary dark:bg-dark-surface-dim",
  outline: "bg-transparent border-light-border text-light-text-secondary",
  onColor: "bg-white/10 border-white/40 text-white dark:bg-dark-surface-dim",
  onColorOutline: "bg-transparent border-white/70 text-white",
} as const;

export default function Badge({
  label,
  variant = "default",
  size = "default",
  icon,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded border ${SIZE_CLASSES[size]} ${VARIANT_CLASSES[variant]} badge dark:border-dark-border dark:text-white whitespace-nowrap ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}
