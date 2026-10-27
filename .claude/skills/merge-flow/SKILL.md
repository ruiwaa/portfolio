---
name: merge-flow
description: 이 포트폴리오에서 "이슈 만들고 커밋부터 병합까지 진행해"를 받았을 때의 전체 순서. 이슈 생성 → 브랜치 이름 변경 → 커밋·push → (스타일이면) 변경 전/후 스크린샷 → Phase 문서 → PR 초안(마지막) → dev PR·병합 → dev 재확인 → main 병합 → 보고. fix-request로 만든 미커밋 변경을 올릴 때 사용한다.
---

# 이슈 → 커밋 → PR → 병합

모든 보고·이슈·PR·문서는 한국어로 쓴다. `gh`는 `ruiwaa/portfolio`에만 쓴다(다른 조직 저장소에는 접근하지 않는다). 측정 서버는 포트로 종료한다(`lsof -ti tcp:<포트> | xargs kill`).

## 1. 이슈 생성

- `.github/ISSUE_TEMPLATE/`에서 맞는 형식(style·feature·bug·docs·refactor)을 읽고 채운다.
- 제목 머리말: `[STYLE]` / `[FEAT]` / `[FIX]` / `[DOCS]`
- 라벨은 `style`·`feature`·`bug`·`docs` 중 하나, assignee는 `ruiwaa`
- 만들기 전에 본문을 보여 준다.
```bash
gh issue create -R ruiwaa/portfolio --title "[DOCS] …" --body-file <파일> --label docs --assignee ruiwaa
```

## 2. 브랜치 이름 변경

`<이슈번호>-<type>-<설명>` (예: `248-style-post-card-sky`)
```bash
git branch -m <임시이름> <이슈번호>-<type>-<설명>
```

## 3. 코드 커밋 → push

- 메시지: `type: 메시지` (type은 style·feat·fix·docs·refactor)
- 본문에 `Refs #이슈번호`와 시스템이 알려 준 Co-Authored-By·Claude-Session 줄을 넣는다.
- force push는 하지 않는다. 고칠 것이 있으면 새 커밋을 만든다.

## 4. 변경 전/후 스크린샷 (스타일 변경이면 반드시)

1. `git ls-remote --heads origin pr-screenshots`로 원격 브랜치가 있는지 확인한다. 없으면 로컬 브랜치로 다시 push하고 사용자에게 알린다(복구는 승인돼 있음).
2. 변경 전: `origin/dev`를 worktree로 받아 빌드 → 3131 포트
   ```bash
   git worktree add <임시경로> origin/dev
   cd <임시경로> && bun install --frozen-lockfile && bun run build && bunx next start -p 3131
   ```
3. 변경 후: 작업 브랜치 빌드 → 3133 포트
4. Playwright로 바뀐 부분을 잘라 찍는다. 영향받는 모드·폭(라이트/다크, 390/1280px)을 모두 넣는다.
5. orphan 브랜치 `pr-screenshots`의 `<이슈번호>/<이름>.png`에 커밋·push한다. 이 브랜치는 dev·main에 병합하지 않는다.
6. 주소는 브랜치 이름이 아니라 **커밋 SHA**로 쓴다(브랜치 주소는 약 5분 캐시돼 404나 이전 이미지가 보인다).
   `https://raw.githubusercontent.com/ruiwaa/portfolio/<sha>/<이슈번호>/<이름>.png`
7. `curl -sI <주소>`로 200인지 확인하고, worktree를 지운다.

## 5. Phase 문서 → 커밋 → push

- `docs/ PHASE_SUMMARY.md`(파일 이름 앞에 공백 있음): 마지막 `📍 다음: (사용자 지정 대기)`를 `📍 다음: Phase N - <제목>`으로 바꾸고 새 Phase를 추가한다.
  - **요청**(사용자 말 그대로 이어서), **변경**, **트러블슈팅**(있으면), **검증**
  - **변경** 첫 줄에 직전 병합 PR 번호와 브랜치 정리 기록을 적는다.
  - 끝은 다시 `📍 다음: (사용자 지정 대기)`
- `docs/PHASE_COMMITS.md`: `## 🚀 커밋 명령어 템플릿` 바로 앞에 커밋 전 체크리스트·커밋 메시지·커밋 명령어를 추가한다.
- 커밋 메시지: `docs: Phase N 작업 완료 사항 정리`
- 숫자(줄 수, 측정값)는 실제로 확인한 값만 쓴다.

## 6. PR 초안 (맨 마지막)

- `docs/Pr_template.md` 형식을 채운다. **템플릿 파일과 저장소에는 쓰지 않는다.**
- 저장 위치: 저장소 한 단계 위 `/Users/jang-yeji/project/portfolio/PR_DRAFT.md` (덮어쓰기 전에 Read로 확인)
- 머리말: `# PR 초안 (비공개 · 미커밋)` + 브랜치 `<브랜치> → dev`
- 커밋 목록과 변경 줄 수는 push한 최종 상태(`git diff --stat origin/dev...HEAD`) 기준으로 쓴다.
- 트러블슈팅 **결과**에는 실측한 사실과 함께 "이전에는 ~였고, 이제는 ~" 형태의 이점을 한 줄 넣는다. 측정하지 않은 숫자는 만들지 않는다.
- 스크린샷은 SHA 주소로 넣는다. UI 변경이 없으면 "해당 없음".
- 마지막 줄: `close #이슈번호` + 시스템이 알려 준 PR 서명 줄
- SendUserFile로 보낸다.

## 7. dev로 PR 생성

본문은 초안의 `## 작업 개요`부터 끝까지 넣는다.
```bash
sed -n '/^## 작업 개요/,$p' ../PR_DRAFT.md > <임시파일>
gh pr create -R ruiwaa/portfolio --base dev --head <브랜치> --title "<이슈 제목과 같게>" --body-file <임시파일> --label <라벨> --assignee ruiwaa
```

## 8. 검사 후 병합

- `gh pr checks <번호> --watch`로 Vercel 검사를 기다린다. "no checks"가 나오면 조금 더 기다렸다가 다시 본다.
- `gh pr view <번호> --json mergeStateStatus`가 `CLEAN`일 때만 merge commit으로 병합한다(`gh pr merge --merge`).
- 이슈가 `CLOSED`인지 확인한다.

## 9. dev 재확인

```bash
git checkout dev && git pull --ff-only
bunx tsc --noEmit && bunx eslint && bun run build
bunx next start -p 3123
```
- 주요 5개 페이지 `/`, `/about`, `/experience`, `/posts`, `/resume`가 200인지 확인한다.
- 이번 작업의 기능 측정값을 다시 잰다(`docs/TESTING.md` 측정 스크립트).

## 10. main 병합

- 제목: `[MERGE] <핵심 변경 요약> 후 main 브랜치 병합`
- 본문: `.github/PULL_REQUEST_TEMPLATE/merge_to_main.md` 형식(포함된 PR 표, 주요 변경, 체크리스트에 실제 확인 결과)
- `gh pr create --base main --head dev` → 검사 대기 → CLEAN이면 merge commit으로 병합
- `git fetch && git diff --quiet origin/main origin/dev`로 main == dev 확인

## 11. 보고

진행 순서, 측정 결과, 알아둘 점, 남은 브랜치, 현재 브랜치(`dev`)를 한국어로 적는다. 브랜치를 지우려면 "브랜치 정리해"(→ `branch-cleanup`)라고 안내한다.

## 작업 중 새 요청이 오면

진행 중인 병합을 끝낸 뒤 이어서 처리하고, 보고에 둘 다 적는다.
