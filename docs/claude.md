# YEJI 포트폴리오 - Claude.md

**스택**: Next.js 16 + React 19 + TypeScript 5 + Supabase + Tailwind CSS  
**목적**: 포트폴리오 (Posts 데이터만 사용)

---

## 📚 문서 구조 (10개 파일)

| 파일 | 내용 | 필수 |
|------|------|------|
| **RULES.md** | 보안, 커밋, 토큰 최적화 규칙 | ⭐⭐⭐ |
| **ARCHITECTURE.md** | 폴더 구조, 데이터 흐름 | ✅ |
| **COMMANDS.md** | 개발/배포 명령어, Git | ✅ |
| **DOMAIN.md** | 포스트, 사용자 여정, 성능 목표 | ✅ |
| **CODING_CONVENTIONS.md** | 파일명, 컴포넌트, 함수 규칙 | ⭐⭐⭐ |
| **SEMANTIC_HTML_A11Y.md** | 시멘틱 HTML, aria- 속성 (11패턴) | ⭐⭐⭐ |
| **PERFORMANCE.md** | 동적 import, 이미지 최적화 | ✅ |
| **SECURITY.md** | 배포 전 보안 체크리스트 | ⭐⭐⭐ |
| **RECOMMENDATIONS.md** | 테스트, 모니터링, 장기 계획 | - |

---

## 🚀 빠른 시작

```bash
# 1. 세팅
git clone <repo>
bun install
cp .env.local.example .env.local

# 2. 개발
bun run dev

# 3. Claude Code
npx @anthropic-ai/claude-code init
```

---

## 💡 Claude Code 사용법

```
"docs/CODING_CONVENTIONS.md와 
docs/SEMANTIC_HTML_A11Y.md를 준수해서 
PostCard를 만들어줄래?"
```

배포 전: `docs/SECURITY.md` 체크리스트 확인

---

**다음**: [`docs/RULES.md`](./docs/RULES.md)
