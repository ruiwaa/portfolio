---
title: "GENOVA 오디오 툴킷"
duration: "정리 예정"
role: "정리 예정"
technologies: ["Next.js", "React", "TypeScript", "Zustand", "TanStack Query"]
---

# 기술적 결정

- 서버에 저장된 데이터는 TanStack Query로, 아직 확정되지 않은 임시 작업 상태는 Zustand로 분리 관리해 불필요한 서버 요청 최소화
- 생성부터 다운로드까지 toast로 즉각 피드백을 제공하고, 되돌리기 어려운 동작에는 포커스 트랩이 적용된 확인 모달로 작업 유실 방지
- WAVE·Web Developer로 접근성을 검증해 의미 있는 태그로 마크업을 정리하고, 장식용 아이콘에는 aria-hidden 처리

# 트러블슈팅

- 이 자리에 트러블슈팅 내용을 입력하세요.

# 회고

- 이 자리에 잘한 점, 개선할 점을 입력하세요.
