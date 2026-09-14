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

export default function Badge({
  label,
  variant = "default",
  size = "default",
  icon,
  className = "",
}: BadgeProps) {
  const lightBg = variant === "outline" ? "bg-transparent" : "bg-light-surface";
  const darkBg = variant === "outline" ? "" : "dark:bg-dark-surface-dim";

  return (
    <span
      className={`inline-flex items-center rounded ${SIZE_CLASSES[size]} ${lightBg} border border-light-border text-light-text-secondary badge ${darkBg} dark:border-dark-border dark:text-white whitespace-nowrap ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}
