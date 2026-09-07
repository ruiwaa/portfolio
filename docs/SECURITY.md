# SECURITY.md - 보안 가이드

**배포 전 반드시 확인**

---

## 🔑 환경 변수

- 클라이언트에는 `NEXT_PUBLIC_SUPABASE_ANON_KEY`만 사용 (ANON_KEY는 공개되어도 안전하도록 RLS로 보호)
- `SUPABASE_SERVICE_ROLE_KEY`는 서버에서만, 절대 `NEXT_PUBLIC_` 접두사 붙이지 않음
- `.env.local`은 `.gitignore`에 포함 (커밋 이력에도 없어야 함)

```bash
# .gitignore 확인
cat .gitignore | grep env
```

## 🛡️ Supabase RLS (Row Level Security)

- posts 테이블에 RLS 활성화
- 공개 조회 정책만 존재: `is_published = true`인 행만 anon 사용자에게 노출
- **insert/update/delete 정책은 만들지 않는다** — 앱에는 글쓰기 기능이 전혀 없으므로 anon 키로는 쓰기가 원천적으로 불가능

```sql
-- 유일한 정책
create policy "공개된 글만 조회 가능"
on posts for select
using (is_published = true);
```

## 📝 글 관리 방식 (관리자 = 본인 1명)

- 앱 안에 로그인 화면이나 글쓰기 UI를 **만들지 않는다**
- 글 작성/수정/삭제는 **Supabase Studio(대시보드) → Table Editor**에서 직접 수행
  - Studio 로그인은 Supabase 계정 인증을 그대로 사용하므로 별도 구현이 필요 없음
  - 프로젝트 소유자 세션이므로 RLS와 무관하게 모든 작업 가능
- content 필드는 Tiptap이 만드는 것과 동일한 HTML 형식으로 직접 입력 (또는 추후 필요시 별도 에디터 도구 사용)
- 장점: 앱 코드에 인증/쓰기 로직이 전혀 없어 공격 표면이 최소화됨

## 🧼 XSS 방지

- Tiptap에서 생성된 HTML을 렌더링할 때 신뢰할 수 있는 소스인지 확인
- 사용자 입력을 직접 `dangerouslySetInnerHTML`에 전달하지 않음 (본인만 작성하는 구조이므로 낮은 위험, 그래도 sanitize 권장)

## 🚫 커밋 금지 목록

```
.env
.env.local
.env.*.local
*.pem
*.key
```

## ✅ 배포 전 최종 체크리스트

- [ ] `grep -r "SERVICE_ROLE_KEY" app/ lib/` → 결과 없음 확인
- [ ] `.env.local`이 git 이력에 없음 확인 (`git log --all --full-history -- .env.local`)
- [ ] Supabase RLS 정책 활성화 확인 (select 정책만 존재하는지)
- [ ] 앱 코드에 posts insert/update/delete 관련 코드가 없는지 확인 (`grep -r "from('posts').*insert\|update\|delete" app/`)
- [ ] 프로덕션 환경 변수는 Vercel 대시보드에서만 설정
- [ ] API 라우트가 있다면 rate limiting 고려

---

**다음**: [`RECOMMENDATIONS.md`](./RECOMMENDATIONS.md)
