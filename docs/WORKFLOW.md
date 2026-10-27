# 작업 순서 (WORKFLOW)

> 이 포트폴리오에서 수정 요청부터 main 병합까지 반복하는 작업 순서입니다.
> 모든 보고와 문서는 한국어로 작성합니다.

---

## 1. 수정 요청을 받았을 때

1. dev를 최신으로 받고, 작업 브랜치를 만든다.
   ```bash
   git checkout dev && git pull --ff-only
   git checkout -b style-<설명>   # 이슈 번호가 정해지기 전 임시 이름
   ```
2. 필요하면 현재 상태를 먼저 측정한다. 프로덕션 빌드에서 Playwright로 측정한다.
   ```bash
   bun run build && bunx next start -p 3123
   ```
3. 해석이 갈리거나 결정이 필요한 부분은 먼저 묻는다.
   - 색처럼 말로 고르기 어려운 것은 실제 화면에 후보를 입혀 비교 이미지로 보여 준다.
4. 수정한다.
   - 왜 그렇게 했는지 주석으로 남긴다.
   - 주변 코드의 스타일을 따른다.
5. 검사를 실행한다.
   ```bash
   bunx tsc --noEmit
   bunx eslint
   bun run build
   ```
6. 결과를 측정한다.
   - 화면 폭: 1280 / 768 / 390px
   - 라이트·다크 모드
   - 가로 스크롤
   - 글자 대비 4.5:1 이상 (그래픽 3:1 이상)
   - 스크린샷을 직접 확인한다.
7. 커밋하지 않은 상태로 보고한다.
   - 바꾼 것, 측정값, 알아둘 점, 브랜치 이름을 적는다.
   - 측정한 값과 계산한 값은 구분해서 쓴다.

---

## 2. 이슈 → 커밋 → PR → 병합

"이슈 만들고 커밋부터 병합까지 진행해"라는 요청을 받으면 아래 순서로 진행한다.

1. **이슈 생성**
   - `.github/ISSUE_TEMPLATE/`의 형식을 따른다.
   - 라벨은 `style`·`feature`·`bug`·`docs` 중에서 붙이고, assignee는 `ruiwaa`로 한다.
   - 제목 머리말: `[STYLE]` / `[FEAT]` / `[FIX]` / `[DOCS]`
2. **브랜치 이름 변경**: `<이슈번호>-<type>-<설명>` (예: `248-style-post-card-sky`)
3. **코드 커밋 → push**
   - 커밋 메시지: `type: 메시지`
   - 커밋 본문에 `Refs #이슈번호`를 넣는다.
4. **변경 전/후 스크린샷** (스타일 변경일 때는 반드시)
   - 변경 전: `origin/dev`를 worktree로 받아 빌드한다.
     ```bash
     bun install --frozen-lockfile && bun run build
     ```
   - 변경 후: 작업 브랜치를 빌드한다.
   - 스크린샷 보관용 orphan 브랜치 `pr-screenshots`의 `<이슈번호>/` 폴더에 올린다. 이 브랜치는 dev·main에 병합하지 않는다.
   - PR 본문에는 커밋 SHA가 들어간 raw 주소를 넣는다. 브랜치 주소는 캐시 때문에 이전 이미지나 404가 보일 수 있다.
   - 이미지 주소가 200으로 열리는지 확인한다.
5. **Phase 문서 작성 → 커밋 → push**
   - `docs/ PHASE_SUMMARY.md`: 요청, 변경, 트러블슈팅, 검증
   - `docs/PHASE_COMMITS.md`: 체크리스트, 커밋 메시지, 명령어
   - 직전 병합 PR과 브랜치 정리 기록도 함께 적는다.
   - 커밋 메시지: `docs: Phase N 작업 완료 사항 정리`
6. **PR 문서는 맨 마지막에 작성한다**
   - `docs/Pr_template.md` 형식을 채우되, 템플릿 파일과 저장소에는 저장하지 않는다.
   - 트러블슈팅 결과에는 "이전에는 ~, 이제는 ~" 같은 이점을 한 줄 넣는다.
7. **dev로 PR 생성**
   - 본문은 PR 문서의 "작업 개요"부터 넣고, 마지막에 `close #이슈번호`를 쓴다.
8. **검사 후 병합**
   - `gh pr checks --watch`로 Vercel 검사를 기다린다.
   - `mergeStateStatus`가 `CLEAN`일 때만 merge commit으로 병합한다.
   - 이슈가 닫혔는지 확인한다.
9. **dev 재확인**
   - pull 받은 뒤 tsc, eslint, build를 다시 실행한다.
   - 주요 페이지 5개(`/`, `/about`, `/experience`, `/posts`, `/resume`)가 200으로 응답하는지 확인한다.
   - 기능 측정값을 다시 잰다.
10. **main 병합**
    - PR 제목: `[MERGE] … 후 main 브랜치 병합`
    - 본문: `.github/PULL_REQUEST_TEMPLATE/merge_to_main.md`
    - 검사를 기다린 뒤 병합하고, main과 dev의 내용이 같은지 확인한다.
11. **보고**: 진행 순서, 측정 결과, 남은 브랜치, 현재 브랜치(`dev`)

---

## 3. 브랜치 정리

1. 열린 PR이 없는지 확인한다.
2. dev에 병합된 브랜치만 원격과 로컬에서 지운다.
   ```bash
   git branch -r --merged origin/dev
   git branch --merged origin/dev
   git push origin --delete <브랜치들>
   git branch -d <브랜치들>
   ```
3. `main`, `dev`, `pr-screenshots`는 항상 남긴다.
4. 정리한 뒤 PR 이미지가 정상으로 열리는지 확인한다.
5. 정리 기록은 다음 Phase 문서의 "직전 병합"에 적는다.

---

## 4. 문서만 정리할 때

"작업 내용 정리 문서에 작성해"라는 요청을 받으면 아래 순서로 진행한다.

1. 빠진 병합·정리 기록을 해당 Phase 안에 "병합·브랜치 정리" 항목으로 보완한다.
2. 커밋 → push → PR 문서 순서로 진행한다.
3. 이슈가 필요하면 2번 흐름을 따른다. 브랜치 이름을 바꾸고, 커밋 본문에 `Refs`를 추가한다.

---

## 공통 원칙

- `gh` CLI는 `ruiwaa/portfolio` 저장소에만 사용한다.
- 측정용 서버는 포트로 종료한다: `lsof -ti tcp:<포트> | xargs kill`
- 작업 중에 새 요청이 들어오면, 진행 중인 병합을 마친 뒤 이어서 처리하고 보고에 둘 다 적는다.
