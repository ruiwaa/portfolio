"use client";

import { useEffect, useState } from "react";
import {
  SiNextdotjs,
  SiReact,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

// 밑줄 애니메이션(anim-underline-3)이 delay 1100ms + duration 500ms로 1600ms에 끝남 -
// 그 직후에 인사말 문구로 전환
const GREETING_SWITCH_DELAY_MS = 1700;

// 핵심 기술 스택(StackBar.tsx의 STACK_ITEMS 중 핵심 5개) - 책 등장 후 주위에 흩뿌려지는 배지.
// Next.js 로고는 원+N 컷아웃이 이미 하나의 path로 합쳐진 완결된 마크라 별도 원(bg-black)으로
// 감싸면 흰색이 그 원까지 칠해버려 이상해짐 - standalone으로 표시해 감싸지 않고 그대로 렌더링
//
// top/left는 책 박스(140x140, 중심 70,70) 중심에서 각도(3개는 -50/0/50도, 2개는 130/230도)는
// 고정하되 반지름을 배지마다 82~98px로 조금씩 다르게 줘서 기계적으로 똑같은 간격이 아니라
// 자연스럽게 흩뿌려진 느낌을 내고, -translate-x/y-1/2로 모든 배지의 "중심"을 기준점으로 통일해
// 배지마다 모서리/중심으로 기준점이 다르게 섞여 높이가 들쭉날쭉해 보이던 문제도 함께 해결
const TECH_BADGES = [
  {
    Icon: SiReact,
    label: "React",
    color: "#61DAFB",
    top: 15,
    left: 5,
    standalone: false,
    size: 18,
  },
  {
    Icon: SiSupabase,
    label: "Supabase",
    color: "#3ECF8E",
    top: -28,
    left: 70,
    standalone: false,
    size: 18,
  },
  {
    Icon: SiNextdotjs,
    label: "Next.js",
    color: "currentColor",
    top: 12,
    left: 139,
    standalone: true,
    size: 34,
  },
  {
    Icon: SiTypescript,
    label: "TypeScript",
    color: "#3178C6",
    top: 123,
    left: 135,
    standalone: false,
    size: 18,
  },
  {
    // SiTailwindcss는 24x24 viewBox 안에 실제 로고가 세로 14.4px만 차지해(TypeScript는 24px 전체
    // 사용) 같은 size에서는 훨씬 작아 보임 - TypeScript와 시각적 높이(18px)를 맞추기 위해
    // size를 24/14.4배(=30)로 키움
    Icon: SiTailwindcss,
    label: "Tailwind CSS",
    color: "#38BDF8",
    top: 123,
    left: 9,
    standalone: false,
    size: 30,
  },
] as const;
// 책이 먼저 팝업(delay 300ms + 600ms 지속 ≈ 900ms)한 다음 순서대로 흩뿌려지도록 뒤이어 시작
const TECH_BADGE_START_DELAY_MS = 700;
const TECH_BADGE_STAGGER_MS = 120;

export default function Hero() {
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(
      () => setShowGreeting(true),
      GREETING_SWITCH_DELAY_MS,
    );
    return () => clearTimeout(timer);
  }, []);

  return (
    <section aria-label="소개" className="flex flex-col justify-center md:ml-8">
      <span className="anim-badge-in mb-10 inline-flex w-fit items-center gap-2 rounded-full border border-light-border px-3 py-1 badge tracking-wide text-light-text-secondary dark:border-dark-border dark:text-dark-text-secondary">
        <span aria-hidden="true" className="status-dot" />
        SYS.LOG // CONTINUOUS LEARNING_
      </span>
      {showGreeting ? (
        <h1 className="h1 motion-safe:animate-[fade-up-in_1.2s_ease-out_both] text-light-text dark:text-dark-text">
          <span className="block w-fit">안녕하세요.</span>
          <span className="block w-fit">
            <span className="bg-linear-to-r from-blue-500 via-blue-700 to-blue-900 bg-clip-text text-transparent dark:from-gray-300 dark:via-gray-400 dark:to-gray-500">
              장예지
            </span>{" "}
            입니다.
          </span>
        </h1>
      ) : (
        <h1 className="h1 text-light-text dark:text-dark-text">
          <span className="anim-headline-line1 relative block w-fit">
            기록하고,
            <span
              aria-hidden="true"
              className="anim-underline-1 absolute inset-x-0 -bottom-1 h-1 rounded-full bg-blue-300 dark:bg-gray-300"
            />
          </span>
          <span className="anim-headline-line2 relative block w-fit">
            배우고,
            <span
              aria-hidden="true"
              className="anim-underline-2 absolute inset-x-0 -bottom-1 h-1 rounded-full bg-blue-400 dark:bg-gray-400"
            />
          </span>
          <span className="anim-headline-line3 relative block w-fit">
            나아갑니다
            <span
              aria-hidden="true"
              className="anim-underline-3 absolute inset-x-0 -bottom-1 h-1 rounded-full bg-blue-500 dark:bg-gray-500"
            />
          </span>
        </h1>
      )}
      {showGreeting && (
        <>
          <p
            style={{ animationDelay: "190ms" }}
            className="font-mono motion-safe:opacity-0 motion-safe:animate-[fade-up-in_0.6s_ease-out_both] max-w-md text-lg font-medium text-light-text-secondary dark:text-dark-text-secondary whitespace-nowrap"
          >
            다양한 사용자를 고려하고,
          </p>
          <p
            style={{ animationDelay: "190ms" }}
            className="font-mono motion-safe:opacity-0 motion-safe:animate-[fade-up-in_0.6s_ease-out_both] max-w-md text-lg font-medium text-light-text-secondary dark:text-dark-text-secondary whitespace-nowrap"
          >
            배우는 것을 멈추지 않습니다.
          </p>
        </>
      )}
      <div className="anim-cta-entrance mt-6">
        <p className="body flex items-center gap-2 text-green-600/70 text-shadow-sm dark:text-lime-400">
          <span
            aria-hidden="true"
            className="h-4 w-px bg-light-border dark:bg-dark-border "
          />
          FRONTEND DEVELOPER
        </p>
      </div>
      {showGreeting && (
        <div className="group relative mt-10 h-35 w-35 ml-auto mr-10 md:mr-0">
          <span
            aria-hidden="true"
            style={{
              animationDelay: "400ms",
              fontSize: "140px",
              lineHeight: 1,
            }}
            // 호버 시 리프트(-translate-y-2)만으로는 눈에 덜 띄어서, 살짝 커지고(scale) 기울어지며
            // (rotate) 테마별 브랜드 색상(라이트 blue accent #0066cc / 다크 흰색)으로 은은하게
            // 빛나는 글로우(drop-shadow)까지 함께 줘서 호버했을 때 확실히 시선이 가도록 강화
            className="motion-safe:opacity-0 motion-safe:animate-[fade-up-in_0.6s_ease-out_both] motion-safe:transition-[transform,filter] motion-safe:duration-1000 motion-safe:ease-out motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:scale-110 motion-safe:group-hover:-rotate-3 motion-safe:group-hover:filter-[drop-shadow(0_0_18px_rgba(0,102,204,0.55))] dark:motion-safe:group-hover:filter-[drop-shadow(0_0_18px_rgba(255,255,255,0.4))] block"
          >
            📖
          </span>
          {TECH_BADGES.map(
            ({ Icon, label, color, top, left, standalone, size }, index) => (
              <span
                key={label}
                style={{ top: `${top}px`, left: `${left}px` }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <span
                  aria-hidden="true"
                  title={label}
                  style={{
                    animationDelay: `${TECH_BADGE_START_DELAY_MS + index * TECH_BADGE_STAGGER_MS}ms`,
                    ...(standalone
                      ? { filter: "drop-shadow(0 0 6px currentColor)" }
                      : { boxShadow: `0 0 10px 0px ${color}80` }),
                  }}
                  className={`motion-safe:opacity-0 motion-safe:animate-[pop-in_300ms_ease-out_both] motion-safe:transition-transform motion-safe:duration-500 motion-safe:ease-out motion-safe:group-hover:-translate-y-2 ${
                    standalone
                      ? "flex h-9 w-9 items-center justify-center text-black dark:text-white"
                      : "flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black"
                  }`}
                >
                  <Icon aria-hidden="true" size={size} color={color} />
                </span>
              </span>
            ),
          )}
        </div>
      )}
    </section>
  );
}
