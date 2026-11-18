"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Check, Copy, KeyRound } from "lucide-react";
import type { ProjectTestAccounts } from "@/app/_components/sections/projectsData";

interface TestAccountProps {
  testAccounts: ProjectTestAccounts;
}

// 면접관이 로그인해 볼 수 있는 테스트 계정(소비자·판매자 등 역할별) - 버튼 하나를 누르면 링크 버튼 줄 위에 겹쳐 열림.
// 역할마다 버튼을 따로 두면 768px(줄 폭 272px)에서 링크 아이콘이 다음 줄로 밀려 네 카드 칸이 모두 높아지므로 한 창에 모음.
// 세부 내용 칸 높이는 같은 줄·다른 줄 카드 모두 가장 긴 칸에 맞춰지는데(Projects.tsx의 auto-rows 1fr), 행쇼마켓 칸이 가장 길어
// 계정 정보를 칸 안에 바로 펼쳐 두면 네 카드 모두 아래 빈 공간이 늘어남 - 겹쳐 여는 방식은 닫혀 있을 때 높이가 그대로
export default function TestAccount({ testAccounts }: TestAccountProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 열려 있을 때 Esc나 바깥 클릭으로 닫음 - Esc로 닫으면 포커스를 열기 버튼으로 돌려 키보드 위치를 잃지 않게 함
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      buttonRef.current?.focus();
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [isOpen]);

  // 복사 표시는 2초 뒤 원래 아이콘으로 되돌림
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(null), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
    } catch {
      // 권한이 막힌 브라우저에서는 복사 대신 글자를 직접 선택해 복사할 수 있으므로 별도 안내 없이 둠
    }
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex h-9 items-center gap-1.5 rounded-full bg-white px-3 text-sm font-semibold text-light-accent transition-colors duration-200 hover:bg-light-accent hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:border dark:border-white/40 dark:bg-transparent dark:text-white/80 dark:hover:border-dark-accent dark:hover:bg-transparent dark:hover:text-dark-accent dark:focus-visible:outline-dark-accent"
      >
        <KeyRound aria-hidden="true" size={16} />
        테스트 계정
      </button>

      {isOpen && (
        <div
          id={panelId}
          role="group"
          aria-labelledby={`${panelId}-title`}
          className="absolute bottom-full left-0 z-10 mb-2 w-72 max-w-[calc(100vw-48px)] rounded-lg border border-light-border bg-white p-4 shadow-lg dark:border-dark-border dark:bg-dark-surface-dim"
        >
          <p
            id={`${panelId}-title`}
            className="mb-3 text-sm font-semibold text-light-text dark:text-dark-text"
          >
            테스트 계정
          </p>
          <div className="space-y-4">
            {testAccounts.accounts.map((account) => (
              <section
                key={account.role}
                aria-labelledby={`${panelId}-${account.role}`}
              >
                <h4
                  id={`${panelId}-${account.role}`}
                  className="mb-1 text-sm font-semibold text-light-accent dark:text-lime-400"
                >
                  {account.role}
                </h4>
                <dl className="space-y-1">
                  {(
                    [
                      ["아이디", account.id],
                      ["비밀번호", account.password],
                    ] as const
                  ).map(([field, value]) => {
                    // 복사 버튼 이름·알림에 역할을 붙여 "소비자 아이디"와 "판매자 아이디"를 구분
                    const label = `${account.role} ${field}`;

                    return (
                      <div key={field} className="flex items-center gap-2">
                        <dt className="w-16 shrink-0 text-sm text-light-text-secondary dark:text-dark-text-secondary">
                          {field}
                        </dt>
                        <dd className="min-w-0 flex-1 font-mono text-sm break-all text-light-text dark:text-dark-text">
                          {value}
                        </dd>
                        <button
                          type="button"
                          onClick={() => copy(label, value)}
                          aria-label={`${label} 복사`}
                          title={`${label} 복사`}
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded text-light-accent hover:bg-light-surface-dim focus-visible:outline-2 focus-visible:outline-light-accent dark:text-white/80 dark:hover:bg-white/10 dark:focus-visible:outline-dark-accent"
                        >
                          {copied === label ? (
                            <Check aria-hidden="true" size={16} />
                          ) : (
                            <Copy aria-hidden="true" size={16} />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </dl>
              </section>
            ))}
          </div>
          <p className="mt-3 text-sm break-keep text-light-text-secondary dark:text-dark-text-secondary">
            {testAccounts.note}
          </p>
          {/* 복사 결과를 스크린 리더에 알림 - 아이콘만 바뀌면 화면을 보지 않는 사용자는 복사됐는지 알 수 없음 */}
          <p aria-live="polite" className="sr-only">
            {copied ? `${copied}를 복사했어요` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
