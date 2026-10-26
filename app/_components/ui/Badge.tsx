import type { ReactNode } from "react";

interface BadgeProps {
  label: string;
  variant?: "default" | "outline";

  size?: "default" | "compact";
  icon?: ReactNode;
  className?: string;
}

const SIZE_CLASSES = {
  default: "h-8 gap-1.5 px-2 py-1 text-[16px]",
  compact:
    "h-6 gap-1 px-1.5 py-0.5 text-[12px] sm:h-8 sm:gap-1.5 sm:px-2 sm:py-1 sm:text-[16px]",
} as const;

// 라이트 모드 배경·테두리·글자색 (+ 다크 배경)
const VARIANT_CLASSES = {
  default:
    "bg-light-surface border-light-border text-light-text-secondary dark:bg-dark-surface-dim",
  outline: "bg-transparent border-light-border text-light-text-secondary",
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
