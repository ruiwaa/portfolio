interface BadgeProps {
  label: string;
  variant?: "default" | "outline";
  className?: string;
}

export default function Badge({
  label,
  variant = "default",
  className = "",
}: BadgeProps) {
  const lightBg = variant === "outline" ? "bg-transparent" : "bg-light-surface";
  const darkBg = variant === "outline" ? "" : "dark:bg-dark-surface-dim";

  return (
    <span
      className={`inline-flex h-6 items-center rounded px-2 ${lightBg} border border-light-border text-light-text-secondary badge ${darkBg} dark:border-dark-border dark:text-dark-text-secondary ${className}`}
    >
      {label}
    </span>
  );
}
