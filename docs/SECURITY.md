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
- 공개 조회 정책: `is_published = true`인 행만 anon 사용자에게 노출
- 쓰기/수정/삭제는 서비스 역할 키로만 가능하도록 제한

```sql
-- 예시 정책
create policy "공개된 글만 조회 가능"
on posts for select
using (is_published = true);
```

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
- [ ] Supabase RLS 정책 활성화 확인
- [ ] 프로덕션 환경 변수는 Vercel 대시보드에서만 설정
- [ ] API 라우트가 있다면 rate limiting 고려

---

**다음**: [`RECOMMENDATIONS.md`](./RECOMMENDATIONS.md)
