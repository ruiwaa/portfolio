interface TimelineItemProps {
  date: string;
  role: string;
  description: string;
}

export default function TimelineItem({
  date,
  role,
  description,
}: TimelineItemProps) {
  return (
    // 세로선 없이 점만 표시 - 점을 항목 왼쪽 끝(left-0)에 두어 섹션 제목과 같은 선에서 시작하게 함
    <div className="relative pb-8 pl-6">
      <span
        aria-hidden="true"
        className="absolute left-0 top-1 h-3 w-3 rounded-full bg-light-accent dark:bg-lime-500"
      />
      <p className="badge text-light-text-secondary dark:text-dark-text-secondary">
        {date}
      </p>
      <h3 className="body mt-1 font-bold text-light-text dark:text-dark-text">
        {role}
      </h3>
      <p className="body mt-1 max-w-sm text-light-text-secondary dark:text-dark-text-secondary">
        {description}
      </p>
    </div>
  );
}
