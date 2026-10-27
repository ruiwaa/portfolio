# 테스트 방법 (TESTING)

> 이 포트폴리오에서 수정한 내용을 확인하는 방법을 한곳에 모은 문서입니다.
> 작업 순서 안에서 언제 실행하는지는 [WORKFLOW.md](./WORKFLOW.md)를 따릅니다.

---

## 0. 현재 상태

- 자동화 테스트(Vitest, Jest, Playwright 테스트 파일)는 없습니다. `package.json`에 `test` 스크립트도 없습니다.
- 그래서 **정적 검사 3가지 + 프로덕션 빌드에서 브라우저로 측정**하는 방식으로 확인합니다.
- Playwright와 axe-core는 저장소 의존성에 넣지 않습니다. 저장소 밖 임시 폴더에 설치해서 씁니다(3번 참고).
- 테스트 도입 계획은 [RECOMMENDATIONS.md](./RECOMMENDATIONS.md)의 "테스트" 항목에 있습니다.

---

## 1. 정적 검사

수정할 때마다 세 가지를 모두 통과해야 합니다.

```bash
bunx tsc --noEmit   # 타입 검사
bunx eslint         # 린트 (= bun run lint)
bun run build       # 프로덕션 빌드
```

`public/`에 한글 이름 파일을 넣었다면 파일 이름 검사도 실행합니다.

```bash
bun run check:filenames   # NFD 이름이 있으면 종료 코드 1
bun run fix:filenames     # NFD 이름을 NFC로 바꾼다
```

macOS Finder로 넣은 한글 파일은 이름이 자모 분리형(NFD)으로 저장될 수 있습니다. 그러면 로컬 서버에서 다운로드 링크가 404가 됩니다.

> `docs/TODO.md`에 있는 `bun run type-check`와 `bun run format`은 `package.json`에 없는 스크립트입니다. 위의 명령을 씁니다.

---

## 2. 측정용 서버 실행

측정은 개발 서버(`bun run dev`)가 아니라 **프로덕션 빌드**에서 합니다. 개발 서버에는 오버레이가 뜨고, 렌더링 결과도 실제 배포와 다를 수 있습니다.

```bash
bun run build && bunx next start -p 3123
```

| 용도 | 포트 |
|---|---|
| 작업 브랜치 측정 | 3123 |
| 변경 전 스크린샷 (`origin/dev` worktree) | 3131 |
| 변경 후 스크린샷 (작업 브랜치) | 3133 |

측정이 끝나면 서버를 포트로 종료합니다.

```bash
lsof -ti tcp:3123 | xargs kill
```

---

## 3. 브라우저 측정 (Playwright)

### 3-1. 설치 (저장소 밖에서)

```bash
mkdir -p /tmp/portfolio-pw && cd /tmp/portfolio-pw
bun init -y
bun add playwright axe-core
bunx playwright install chromium
```

### 3-2. 확인 항목

| 항목 | 기준 | 측정 방법 |
|---|---|---|
| 응답 | 주요 5개 페이지 200 | `page.goto()` 응답 상태 |
| 화면 폭 | 1280 / 768 / 390px | `viewport` |
| 테마 | 라이트·다크 | 첫 렌더 전에 `localStorage.theme` 설정 |
| 가로 스크롤 | 0px | `scrollWidth - innerWidth` |
| 글자 대비 | 4.5:1 이상 (큰 글자·그래픽 3:1 이상) | axe-core `color-contrast` |
| 화면 | 스크린샷을 직접 열어 확인 | `page.screenshot({ fullPage: true })` |

주요 5개 페이지: `/`, `/about`, `/experience`, `/posts`, `/resume`

테마는 `app/layout.tsx`의 초기화 스크립트가 `localStorage.getItem("theme")`를 읽고 `<html>`에 `dark` 클래스를 붙여 정합니다. 그래서 측정 스크립트에서는 `addInitScript`로 값을 먼저 넣어 둡니다.

### 3-3. 측정 스크립트

`/tmp/portfolio-pw/measure.mjs`로 저장하고 `node measure.mjs`로 실행합니다. 스크린샷은 `shots/` 폴더에 저장됩니다.

```js
// 사용법: node measure.mjs [기본주소]
import { chromium } from "playwright";
import { createRequire } from "node:module";
import { mkdirSync, readFileSync } from "node:fs";

const BASE = process.argv[2] ?? "http://localhost:3123";
const PAGES = ["/", "/about", "/experience", "/posts", "/resume"];
const WIDTHS = [1280, 768, 390];
const THEMES = ["light", "dark"];
// 등장 애니메이션 도중에 재면 반투명 글자가 대비 위반으로 잡히므로 끝날 때까지 기다린다
const SETTLE_MS = 3000;
const axeSource = readFileSync(
  createRequire(import.meta.url).resolve("axe-core/axe.min.js"),
  "utf8",
);

mkdirSync("shots", { recursive: true });
const browser = await chromium.launch();
for (const theme of THEMES) {
  for (const width of WIDTHS) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    // 테마는 첫 렌더 전에 localStorage("theme")로 정해진다
    await context.addInitScript((t) => localStorage.setItem("theme", t), theme);
    const page = await context.newPage();
    for (const path of PAGES) {
      const res = await page.goto(BASE + path, { waitUntil: "networkidle" });
      await page.waitForTimeout(SETTLE_MS);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - window.innerWidth,
      );
      await page.addScriptTag({ content: axeSource });
      const contrast = await page.evaluate(async () => {
        const r = await window.axe.run(document, { runOnly: ["color-contrast"] });
        return r.violations.flatMap((v) =>
          v.nodes.map((n) => `${n.any[0]?.message.split(" (")[0]} | ${n.target.join(" ")}`),
        );
      });
      const name = `${theme}-${width}${path === "/" ? "-home" : path.replaceAll("/", "-")}.png`;
      await page.screenshot({ path: `shots/${name}`, fullPage: true });
      console.log(
        `${theme}\t${width}px\t${path}\tstatus=${res.status()}\toverflow=${overflow}px\tcontrast=${contrast.length}`,
      );
      contrast.forEach((line) => console.log(`    ${line}`));
    }
    await context.close();
  }
}
await browser.close();
```

### 3-4. 결과 읽는 법

- `status`가 200이 아니면 해당 페이지가 깨진 것입니다.
- `overflow`가 0보다 크면 가로 스크롤이 생깁니다. 어떤 요소가 화면 밖으로 나갔는지 따로 찾아야 합니다.
- `contrast` 아래에 나온 요소는 실제 배경색과 글자색을 확인합니다.
  - 등장 애니메이션 중에는 글자가 반투명이라 위반으로 잡힐 수 있습니다. 그래서 `SETTLE_MS`만큼 기다린 뒤에 잽니다.
  - 그래도 남는 항목은 실제 위반입니다.
- 숫자가 정상이어도 스크린샷은 꼭 직접 엽니다. 요소가 겹치거나 잘리는 문제는 숫자에 드러나지 않습니다.

### 3-5. 필요할 때 쓰는 측정

| 상황 | 방법 |
|---|---|
| 요소가 부모 경계를 넘는지 | `getBoundingClientRect()`로 자식의 `right`와 부모의 `right` 비교. 폭은 320~1280px 사이에서 여러 개로 잰다 |
| 정렬(시작선) 확인 | 같은 줄 요소들의 `left` 좌표가 모두 같은지 비교 |
| 호버·클릭 동작 | `page.hover()` / `page.click()` 후 스크린샷이나 DOM 상태 확인 |
| 서버 데이터가 부족해 재현이 안 될 때 | `page.route()`로 응답을 가로채 가상 데이터로 확인. 실제 데이터는 건드리지 않는다 |

---

## 4. 수동 확인

- 테마 토글: 헤더의 🌙/☀️ 버튼으로 전환되는지, 새로고침해도 유지되는지(`localStorage.theme`)
- 시스템 설정 따라가기: `localStorage.theme`이 없을 때 OS 테마를 따르는지
  - Chrome DevTools → Rendering → Emulate CSS media feature `prefers-color-scheme`
- 키보드: Tab으로 모든 링크·버튼에 접근되는지, 포커스 표시가 보이는지, 순서가 자연스러운지

---

## 5. 언제 무엇을 하나

| 시점 | 할 일 |
|---|---|
| 코드를 수정할 때마다 | 1. 정적 검사 |
| 수정 결과를 보고하기 전 | 2~3. 프로덕션 빌드에서 측정 + 스크린샷 직접 확인 |
| 스타일 PR을 만들 때 | 변경 전(3131)/후(3133) 스크린샷 → `pr-screenshots` 브랜치 ([WORKFLOW.md](./WORKFLOW.md) 2-4) |
| dev에 병합한 뒤 | dev에서 1번 다시 실행 + 주요 5개 페이지 200 확인 + 기능 측정값 다시 재기 |

보고할 때는 **측정한 값**과 **계산한 값**을 구분해서 씁니다.
