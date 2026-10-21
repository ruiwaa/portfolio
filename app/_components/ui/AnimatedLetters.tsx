"use client";

import { useInView } from "@/app/_hooks/useInView";
import { LETTER_STAGGER_MS } from "@/app/_components/ui/letterTiming";

interface AnimatedLettersProps {
  text: string;
  staggerMs?: number;
}

// 스크린 리더에는 원문 그대로 한 번에 읽히도록 감싸는 span에 aria-label을 두고,
// 실제로 쪼개서 그리는 글자 span들은 aria-hidden 처리한다.
export default function AnimatedLetters({
  text,
  staggerMs = LETTER_STAGGER_MS,
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
              ? // 0.4s = LETTER_DURATION_MS (Tailwind 클래스는 빌드 시 정적 문자열로 읽어야 해서 값을 직접 씀)
                "motion-safe:animate-[letter-bounce-in_0.4s_cubic-bezier(0.34,1.56,0.64,1)_both]"
              : ""
          }`}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
