---
name: branch-cleanup
description: 이 포트폴리오에서 "브랜치 정리해"를 받았을 때 dev에 병합된 작업 브랜치만 원격·로컬에서 지우는 순서. main·dev·pr-screenshots는 항상 남긴다.
---

# 브랜치 정리

보고는 한국어로 한다.

## 순서

1. **열린 PR 확인**: `gh pr list -R ruiwaa/portfolio --state open`. 열린 PR의 브랜치는 지우지 않는다.
2. **병합된 브랜치만 고른다**
   ```bash
   git fetch --prune
   git branch -r --merged origin/dev
   git branch --merged origin/dev
   ```
3. **항상 남길 브랜치**: `main`, `dev`, `pr-screenshots` (PR 이미지가 여기 있어서, 지우면 모든 PR 이미지가 404가 된다)
4. **삭제**: 지울 목록을 보고에 먼저 적고 지운다.
   ```bash
   git push origin --delete <브랜치들>
   git branch -d <브랜치들>   # -D는 쓰지 않는다
   ```
5. **확인**
   - `git ls-remote --heads origin pr-screenshots`로 이미지 브랜치가 남아 있는지 본다.
   - 최근 스타일 PR 이미지 주소 하나를 `curl -sI`로 열어 200인지 본다.
6. **기록**: 지운 브랜치 목록은 다음 Phase 문서의 "직전 병합" 줄에 적는다(`merge-flow` 5단계). 지금 바로 문서를 고치지는 않는다.

## 보고

지운 브랜치(원격·로컬), 남은 브랜치, PR 이미지 확인 결과, 현재 브랜치.
