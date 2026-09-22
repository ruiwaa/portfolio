---
title: "행쇼마켓"
duration: "정리 예정"
role: "정리 예정"
technologies: ["Next.js", "React", "TypeScript", "Supabase", "TanStack Query"]
---

# 기술적 결정

- Supabase 관계형 데이터 조회로 주문·상품 정보를 연동하고, TypeScript로 중첩 데이터의 타입 안정성 확보
- Supabase update로 배송 상태를 조회·변경하고, 상태 변경 로직과 UI를 컴포넌트 단위로 분리해 관심사 분리
- TanStack Query로 서버 상태를 관리하고, 데이터 수정 후 Query invalidate로 최신 상태 유지
- Supabase 호출을 API 함수로, 조회·검증 로직을 Custom Hook으로 분리해 재사용성과 유지보수성 향상

# 트러블슈팅

- 이 자리에 트러블슈팅 내용을 입력하세요.

# 회고

- 이 자리에 잘한 점, 개선할 점을 입력하세요.
