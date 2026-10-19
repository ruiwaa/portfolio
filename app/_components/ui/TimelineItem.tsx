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
    // 세로 배치(모바일)에서는 마지막 항목 아래로 선이 이어지지 않게 투명 처리,
    // 가로 배치(md 이상)에서는 항목마다 같은 모양이 되도록 마지막 항목도 선을 표시
    <div className="relative border-l-2 pb-8 pl-6 border-light-border last:border-transparent md:last:border-light-border dark:border-dark-border dark:last:border-transparent dark:md:last:border-dark-border">
      <span
        aria-hidden="true"
        className="absolute -left-1.25 top-1 h-3 w-3 rounded-full bg-light-accent dark:bg-lime-500"
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
