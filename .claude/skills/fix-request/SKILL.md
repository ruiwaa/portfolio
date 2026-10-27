---
name: fix-request
description: 이 포트폴리오의 수정 요청("~ 바꿔줘", "~ 고쳐줘", "~ 정리해줘")을 처리하는 순서. dev 최신화 → 작업 브랜치 → 측정 → 질문 → 수정 → 검사 → 측정 → 커밋하지 않은 채 보고. 코드·스타일·문서를 고치는 새 요청이 오면 사용한다.
---

# 수정 요청 처리

모든 보고와 질문은 한국어로 한다. 코드·명령·경로는 그대로 둔다.

## 순서

1. **dev 최신화 → 작업 브랜치**
   ```bash
   git checkout dev && git pull --ff-only
   git checkout -b <type>-<설명>   # 예: style-hero-contrast, docs-testing (이슈 번호는 아직 없음)
   ```
2. **현재 상태 측정 (필요할 때)**
   - 프로덕션 빌드에서 Playwright로 잰다. 방법과 측정 스크립트는 `docs/TESTING.md`를 따른다.
   ```bash
   bun run build && bunx next start -p 3123
   ```
3. **결정이 필요하면 먼저 묻는다**
   - 해석이 갈리거나 사용자가 정할 일이면 AskUserQuestion으로 묻는다.
   - 색처럼 말로 고르기 어려운 것은 실제 화면에 후보를 입힌 비교 이미지를 SendUserFile로 보낸다.
4. **수정**
   - 이 저장소의 Next.js는 학습 데이터와 다르다. 코드 작성 전 `node_modules/next/dist/docs/`의 관련 문서를 읽는다.
   - 주석에는 "왜"를 적는다. 주변 코드 스타일을 따른다.
5. **검사**
   ```bash
   bunx tsc --noEmit
   bunx eslint
   bun run build
   ```
6. **결과 측정** (`docs/TESTING.md` 3장)
   - 화면 폭 1280 / 768 / 390px, 라이트·다크
   - 가로 스크롤 0px
   - 글자 대비 4.5:1 이상 (큰 글자·그래픽 3:1 이상)
   - 스크린샷은 Read로 직접 열어 확인한다
   - 끝나면 서버 종료: `lsof -ti tcp:3123 | xargs kill`
7. **커밋하지 않은 상태로 보고**
   - 바꾼 것, 측정값, 알아둘 점, 브랜치 이름
   - 측정한 값과 계산한 값을 구분해서 쓴다. 사실과 다른 문장이 없는지 다시 확인한다.
   - 마지막에 다음 명령을 안내한다: "이슈 만들고 커밋부터 병합까지 진행해" (→ `merge-flow` 스킬)

## 주의

- 범위 밖에서 발견한 문제는 고치지 말고 보고의 "알아둘 점"에 적는다.
- 임시 파일과 Playwright 설치는 저장소 밖(`$CLAUDE_JOB_DIR/tmp` 등)에 둔다.
