// public/ 아래 파일·폴더 이름을 조합형(NFC)으로 맞추는 스크립트.
//
// macOS Finder로 넣은 한글 파일은 이름이 자모 분리형(NFD)으로 저장될 수 있다
// (예: "장예지_이력서.pdf"가 11글자가 아니라 19글자). Git은 core.precomposeunicode로
// NFC로 기록해 git status에는 드러나지 않지만, 로컬 Next.js 서버는 NFC로 인코딩된 URL로
// 디스크 파일을 찾아서 다운로드 링크가 404가 된다.
//
// 사용법
//   bun run fix:filenames     NFD 이름을 NFC로 바꾼다 (파일 내용은 그대로)
//   bun run check:filenames   바꾸지 않고 확인만 한다. NFD 이름이 있으면 종료 코드 1

import { readdir, rename } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "public");
const checkOnly = process.argv.includes("--check");

// 하위 항목을 먼저 처리한 뒤 자기 이름을 바꿔야, 폴더 이름이 바뀐 뒤 안쪽 경로를 잃지 않는다
async function walk(dir, found) {
  const entries = await readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const current = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(current, found);

    const normalized = entry.name.normalize("NFC");
    if (normalized === entry.name) continue;

    const target = path.join(dir, normalized);
    found.push(path.relative(process.cwd(), target));

    if (!checkOnly) {
      // 대소문자·정규화 차이를 같은 이름으로 보는 파일 시스템(APFS)에서도 이름이 확실히 바뀌도록
      // 임시 이름을 거쳐서 바꾼다
      const temp = path.join(dir, `.normalize-${process.pid}-${Date.now()}`);
      await rename(current, temp);
      await rename(temp, target);
    }
  }
}

const found = [];
await walk(ROOT, found);

if (found.length === 0) {
  console.log("public/ 아래 파일 이름이 모두 NFC입니다.");
} else if (checkOnly) {
  console.error(`NFD(자모 분리형) 이름 ${found.length}개:`);
  for (const file of found) console.error(`  ${file}`);
  console.error("bun run fix:filenames 로 NFC로 바꿀 수 있습니다.");
  process.exitCode = 1;
} else {
  console.log(`NFC로 바꾼 이름 ${found.length}개:`);
  for (const file of found) console.log(`  ${file}`);
}
