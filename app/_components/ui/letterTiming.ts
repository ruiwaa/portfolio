// AnimatedLetters(글자가 하나씩 튀어 오르는 제목)의 타이밍 - 서버 컴포넌트(app/page.tsx)에서도
// 계산에 쓰도록 "use client" 없는 파일로 분리

export const LETTER_STAGGER_MS = 35;
export const LETTER_DURATION_MS = 400;

// 제목 전체가 다 나타나기까지 걸리는 시간 = 마지막 글자가 시작하는 시점 + 글자 하나의 애니메이션 시간.
// 제목 아래 내용은 이 시간만큼 기다렸다 나오게 해서 제목보다 먼저 보이지 않게 함
export function getLettersDurationMs(
  text: string,
  staggerMs = LETTER_STAGGER_MS,
) {
  return (Array.from(text).length - 1) * staggerMs + LETTER_DURATION_MS;
}
