# RECOMMENDATIONS.md - 추가 권장 사항

**필수는 아니지만 프로젝트 성숙 후 고려할 것들**

---

## 🧪 테스트

- 지금 단계에서는 필수 아님 (개인 포트폴리오)
- 추후 고려 시: Vitest + React Testing Library (컴포넌트), Playwright (E2E)
- 우선순위: Posts 필터링 로직, ThemeToggle 상태 관리

## 📊 모니터링

- Vercel Analytics (배포 시 기본 제공, 무료)
- Vercel Speed Insights로 실사용자 성능 지표 확인
- 에러 트래킹이 필요해지면 Sentry 고려 (무료 티어)

## 🔍 SEO

- `app/layout.tsx`에 metadata 설정 (title, description, og:image)
- 포스트 상세 페이지는 `generateMetadata`로 동적 메타 태그
- `sitemap.xml`, `robots.txt` 추가 고려

## 🚀 장기 계획 (배포 이후)

```
1순위: 댓글 기능 (Supabase 활용)
2순위: 방문자 통계 대시보드
3순위: RSS 피드
4순위: 다국어 지원 (한/영)
5순위: 검색 기능 (Posts 전문 검색)
```

## 🧹 유지보수

- 의존성 업데이트는 분기별 1회 정도로 (`bun outdated` 확인)
- 사용하지 않는 컴포넌트/파일 정기적으로 정리
- Lighthouse 점수 분기별 재측정

---

**문서 시작으로 돌아가기**: [`../claude.md`](../claude.md)
