import type { ReactNode } from "react";

interface BadgeProps {
  label: string;
  variant?: "default" | "outline";
  icon?: ReactNode;
  className?: string;
}

export default function Badge({
  label,
  variant = "default",
  icon,
  className = "",
}: BadgeProps) {
  const lightBg = variant === "outline" ? "bg-transparent" : "bg-light-surface";
  const darkBg = variant === "outline" ? "" : "dark:bg-dark-surface-dim";

  return (
    <span
      className={`inline-flex h-8 items-center gap-1.5 rounded px-2 py-1 ${lightBg} border border-light-border text-light-text-secondary badge ${darkBg} dark:border-dark-border dark:text-white whitespace-nowrap  text-[16px] ${className}`}
    >
      {icon}
      {label}
    </span>
  );
}
