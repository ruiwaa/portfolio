// Hero 헤드라인 밑줄과 동일한 순서(연한 → 진한)의 색상을 그대로 사용
const DOT_COLORS = [
  "bg-blue-300 dark:bg-gray-300",
  "bg-blue-400 dark:bg-gray-400",
  "bg-blue-500 dark:bg-gray-500",
];
const DOT_DELAY_STEP_SEC = 0.2;

type SpinnerSize = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<SpinnerSize, { dot: string; gap: string }> = {
  sm: { dot: "h-1.5 w-1.5", gap: "gap-1" },
  md: { dot: "h-2.5 w-2.5", gap: "gap-1.5" },
  lg: { dot: "h-4 w-4", gap: "gap-2.5" },
};

interface DotLoadingSpinnerProps {
  size?: SpinnerSize;
  className?: string;
}

export default function DotLoadingSpinner({
  size = "md",
  className = "",
}: DotLoadingSpinnerProps) {
  const { dot, gap } = SIZE_CLASSES[size];

  return (
    <span
      role="status"
      aria-label="로딩 중"
      className={`inline-flex items-center ${gap} ${className}`}
    >
      {DOT_COLORS.map((color, index) => (
        <span
          key={index}
          aria-hidden="true"
          style={{ animationDelay: `${index * DOT_DELAY_STEP_SEC}s` }}
          className={`dot-loading rounded-full ${dot} ${color}`}
        />
      ))}
    </span>
  );
}
