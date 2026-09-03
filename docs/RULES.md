# RULES.md - 절대 규칙

**우선순위 최상위 문서. 모든 작업에서 이 규칙을 먼저 확인한다.**

---

## 🔐 보안 규칙

- `.env` 절대 git 커밋 금지 (`.gitignore`에 포함 확인)
- `NEXT_PUBLIC_*` 접두사라도 민감 정보(API 시크릿 키 등) 저장 금지
- 클라이언트 코드에서 `SUPABASE_SERVICE_ROLE_KEY` 사용 금지 (서버에서만)
- 모든 Supabase 호출은 try-catch로 감싼다
- 사용자에게는 구체적 에러 메시지 대신 일반적 메시지만 노출
- 배포 전 `grep -r "SERVICE_ROLE_KEY" src/`로 노출 여부 확인

## 🧩 Git / 커밋 규칙

- 자동 커밋 도구(Husky, lint-staged) 사용 금지 — 항상 수동으로 확인 후 커밋
- 커밋 메시지는 한국어로 작성
- 커밋 전 반드시 `bun run type-check` 통과 확인
- 브랜치 전략: `feature/`, `fix/`, `refactor/`, `chore/`, `docs/`, `style/`, `perf/`
- 커밋 타입: `feat`, `fix`, `refactor`, `chore`, `docs`, `style`, `perf`

## 💬 Claude Code 사용 규칙

- 프롬프트는 가능한 한 구체적으로 (색상값, 크기, 상태 명시)
- 코드 생성 후 반드시 타입체크 → 브라우저 확인 → 커밋 순서 유지
- 한 번에 하나의 컴포넌트/기능만 요청 (Phase 단위 진행)
- 에러 발생 시 전체 에러 메시지를 그대로 전달

## ⚡ 토큰 최적화 규칙

- 문서를 통째로 다시 작성 요청하지 않고 필요한 부분만 수정 요청
- 이미 구현된 컴포넌트는 새로 만들지 않고 참조/확장
- 큰 파일은 관련 섹션만 발췌해서 질문

---

**다음**: [`ARCHITECTURE.md`](./ARCHITECTURE.md)
