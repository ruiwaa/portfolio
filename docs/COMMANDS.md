# COMMANDS.md - 명령어 모음

---

## 🛠️ 개발

```bash
bun install          # 패키지 설치
bun run dev           # 개발 서버 (localhost:3000)
bun run type-check     # 타입 체크
bun run lint            # ESLint
bun run format           # Prettier
bun run build             # 프로덕션 빌드
bun start                  # 빌드 결과 실행
```

## 🌿 Git

```bash
# 브랜치 생성
git checkout -b feature/기능명

# 상태 확인
git status
git diff

# 커밋 (수동)
git add .
git commit -m "feat: 한국어 설명"
git push origin feature/기능명

# 머지 후 정리
git checkout main
git pull origin main
git branch -d feature/기능명
```

## 🐙 GitHub CLI (선택)

```bash
gh issue create --title "제목"
gh pr create --fill
gh pr merge
```

## 🔍 디버깅

```bash
# 특정 파일만 타입체크
bunx tsc --noEmit app/_components/common/Header.tsx

# 특정 파일만 린트
bunx eslint app/_components/common/Header.tsx

# 캐시 초기화
rm -rf .next node_modules/.cache
```

## 🔐 환경 변수 확인

```bash
# 민감 정보 노출 확인 (배포 전 필수)
grep -r "SERVICE_ROLE_KEY" app/ lib/
```

---

**다음**: [`DOMAIN.md`](./DOMAIN.md)
