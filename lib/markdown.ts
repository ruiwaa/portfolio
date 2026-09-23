import { readdir } from "node:fs/promises";
import path from "node:path";

// dir 안에서 .md 파일을 하나 찾아 전체 경로를 반환한다 (파일명은 자유, 폴더당 1개만 사용).
// 여러 개가 있으면 이름순으로 정렬해 첫 번째를 사용한다.
export async function findMarkdownFile(dir: string): Promise<string | null> {
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return null;
  }

  const fileName = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
    .map((entry) => entry.name)
    .sort()[0];

  return fileName ? path.join(dir, fileName) : null;
}
