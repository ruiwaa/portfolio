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
    <div className="relative border-l-2 pb-8 pl-6 border-light-border last:border-transparent dark:border-dark-border dark:last:border-transparent">
      <span
        aria-hidden="true"
        className="absolute -left-1.25 top-1 h-3 w-3 rounded-full bg-light-accent"
      />
      <p className="badge text-light-text-secondary dark:text-dark-text-secondary">
        {date}
      </p>
      <p className="body mt-1 font-bold text-light-text dark:text-dark-text">
        {role}
      </p>
      <p className="body mt-1 text-light-text-secondary dark:text-dark-text-secondary">
        {description}
      </p>
    </div>
  );
}
