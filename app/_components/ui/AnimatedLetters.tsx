"use client";

import { useInView } from "@/app/_hooks/useInView";

interface AnimatedLettersProps {
  text: string;
  staggerMs?: number;
}

// 스크린 리더에는 원문 그대로 한 번에 읽히도록 감싸는 span에 aria-label을 두고,
// 실제로 쪼개서 그리는 글자 span들은 aria-hidden 처리한다.
export default function AnimatedLetters({
  text,
  staggerMs = 70,
}: AnimatedLettersProps) {
  const { ref, isInView } = useInView<HTMLSpanElement>();

  return (
    <span ref={ref} aria-label={text}>
      {Array.from(text).map((char, index) => (
        <span
          key={index}
          aria-hidden="true"
          style={{ animationDelay: `${index * staggerMs}ms` }}
          className={`inline-block motion-safe:opacity-0 ${
            isInView
              ? "motion-safe:animate-[letter-bounce-in_0.5s_cubic-bezier(0.34,1.56,0.64,1)_both]"
              : ""
          }`}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
