---
title: "중단어 창고"
duration: "정리 예정"
role: "정리 예정"
technologies:
  [
    "Next.js",
    "React",
    "TypeScript",
    "Supabase",
    "TanStack Query",
    "React-Hook-Form",
    "Zod",
  ]
---

# 기술적 결정

- @supabase/ssr로 서버·클라이언트 인증 상태를 관리하고, Proxy에서 세션을 확인해 인증이 필요한 경로 접근을 제어하며 PASSWORD_RECOVERY 상태로 비밀번호 재설정 흐름 구분
- HSK 단어 검색을 Supabase RPC로 처리해 서버에서 관련성 기준으로 정렬 후 필요한 데이터만 전달, 데이터가 늘어도 확장 가능한 검색 구조 구현
- Lighthouse로 LCP·Long Task 등 성능 지표를 측정해 병목을 분석하고, 이미지 최적화·fetchPriority/preload 적용하여 성능 개선

# 트러블슈팅

- 이 자리에 트러블슈팅 내용을 입력하세요.

# 회고

- 이 자리에 잘한 점, 개선할 점을 입력하세요.
