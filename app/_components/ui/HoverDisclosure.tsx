import type { CSSProperties, ReactNode } from "react";

interface HoverDisclosureProps {
  id: string;
  // 문장 단위로 줄바꿈되도록 배열로 받는다 (각 문장을 block 요소로 렌더링).
  content: string[];
  children: ReactNode;
  // 트리거에만 적용되는 등장 애니메이션 (transform 사용 시 절대 panel의 조상에 두지 말 것 —
  // fill-mode: both가 남기는 non-none transform이 새 containing block을 만들어 panel의
  // 위치 기준이 바깥 컨테이너가 아닌 이 요소로 바뀌어 버림)
  triggerClassName?: string;
  triggerStyle?: CSSProperties;
}

export default function HoverDisclosure({
  id,
  content,
  children,
  triggerClassName = "",
  triggerStyle,
}: HoverDisclosureProps) {
  return (
    <div className="group/disclosure">
      <span
        tabIndex={0}
        aria-describedby={id}
        style={triggerStyle}
        className={`flex rounded transition-transform duration-200 group-hover/disclosure:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent ${triggerClassName}`}
      >
        {children}
      </span>
      <p
        id={id}
        className="body text-center pointer-events-none absolute top-full left-1/2 -translate-x-1/2 z-10 mt-3 w-full  max-w-2xl -translate-y-2 space-y-1.5 rounded-lg border-2 border-dashed border-light-border bg-light-surface px-5 py-7 text-light-text-secondary opacity-0 shadow-sm transition-all duration-200 group-hover/disclosure:translate-y-0 group-hover/disclosure:opacity-100 group-hover/disclosure:pointer-events-auto group-focus-within/disclosure:translate-y-0 group-focus-within/disclosure:opacity-100 group-focus-within/disclosure:pointer-events-auto dark:border-blue-500/30 dark:bg-dark-surface dark:text-white"
      >
        {content.map((sentence, index) => (
          <span key={index} className="block">
            {sentence}
          </span>
        ))}
      </p>
    </div>
  );
}
