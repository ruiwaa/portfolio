import { getTroubleshootingHref } from "@/lib/constants";

export interface ProjectLinks {
  // 배포 사이트를 연결하지 못한 프로젝트는 "site" 대신 "video"로 두고
  // demo에 시연 영상 링크를 넣는다 - 이 경우 아이콘/라벨이 영상용으로 바뀜
  demoType?: "site" | "video";
  demo?: string;
  // 시연 영상이 기능별로 여러 개인 경우 demo 대신 사용 (예: 효과음 생성/자막 생성 각각의 데모)
  demos?: { label: string; href: string }[];
  // 비공개 레포 등으로 GitHub 링크를 공개할 수 없는 프로젝트는 생략
  github?: string;
  post: string;
}

interface ProjectMedia {
  type: "image" | "video";
  src: string;
}

// 세부 내용 한 줄 - 그 내용을 다룬 트러블 슈팅 글이 있으면 post로 연결해 "자세히 보기" 링크를 붙임.
// href가 http로 시작하면 Velog 글(새 탭), 아니면 사이트 안 글(/posts/...)
export type ProjectDetail =
  string | { text: string; post: { title: string; href: string } };

export interface ProjectEntry {
  title: string;
  description: string;
  tags: string[];
  // 제목 위 배지 - 진행 기간, 프로젝트 형태·팀 구성 (" · "로 나뉘던 항목을 배지 하나씩)
  period: string;
  team: string[];
  // 팀 프로젝트에서 내가 맡은 범위 (사용 기술 바로 아래에 표시)
  role: string;
  media: ProjectMedia;
  detail: ProjectDetail[];
  links: ProjectLinks;
}

// 카드 순서를 바꾸면 lib/constants.ts의 TROUBLESHOOTING_PROJECT_ORDER도 같은 순서로 맞출 것
export const PROJECTS: ProjectEntry[] = [
  {
    title: "GENOVA 오디오 툴킷",
    description:
      "영상을 업로드 시 AI가 영상과 음성을 분석해 알맞은 효과음을 자동으로 채워 넣고, 음성을 텍스트로 변환해 자막까지 만들어주는 영상 편집 웹 서비스입니다.",
    tags: ["Next.js", "React", "TypeScript", "Zustand", "TanStack Query"],
    period: "2026.07",
    team: ["기업 연계", "PM 2, BE 2, UX/UI 1, FE 1"],
    role: "프론트엔드 전체 - 효과음 생성·자막 생성 페이지",
    media: {
      type: "image",
      src: "/projects/genova-main.png",
    },
    detail: [
      "서버에 저장된 데이터는 TanStack Query로, 아직 확정되지 않은 임시 작업 상태는 Zustand로 분리 관리해 사용자가 효과음을 여러 번 바꿔 들어봐도 서버 요청 없이 전환되도록 구현",
      "생성부터 다운로드까지 toast로 즉각 피드백을 제공하고, 되돌리기 어려운 동작에는 포커스 트랩이 적용된 확인 모달로 작업 유실 방지",
      "WAVE·Web Developer 확장으로 접근성을 검증해 의미 있는 태그로 마크업을 정리하고, 장식용 아이콘에는 aria-hidden 처리",
    ],
    links: {
      demos: [
        { label: "효과음 생성 시연", href: "https://youtu.be/Yb1hK9OoZ7g" },
        { label: "자막 생성 시연", href: "https://youtu.be/vo-SuEB4yI0" },
      ],
      // 트러블슈팅 글의 project 값이 카드 제목과 다른 "인턴십 프로젝트"로 등록되어 있음
      post: getTroubleshootingHref("인턴십 프로젝트"),
    },
  },
  {
    title: "중단어 창고",
    description:
      "중국어 단어를 검색·저장하고, 저장한 단어로 직접 예문을 작성·수정하며 학습할 수 있는 서비스입니다. 모든 사용자를 고려해 단어 검색과 예문 작성을 음성 인식으로도 할 수 있습니다.",
    tags: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "TanStack Query",
      "React-Hook-Form",
      "Zod",
    ],
    period: "2026.06 ~ 2026.08",
    team: ["개인 프로젝트"],
    role: "전체 개발",
    media: {
      type: "image",
      src: "/projects/jungdanuh-changgo-home.png",
    },
    detail: [
      {
        text: "Lighthouse로 LCP 병목을 분석해 이미지 fetchPriority/preload·중국어 폰트 적용 범위 축소를 적용, 데스크탑 기준 LCP를 회원가입 5초·메인 0.5초 단축하고 검색 페이지 성능 점수 6점 향상",
        post: {
          title: "lighthouse 검사 후 성능 개선 작업",
          href: "https://velog.io/@ruiwaa/%EC%A4%91%EB%8B%A8%EC%96%B4-%EC%B0%BD%EA%B3%A0-lighthouse-%EA%B2%80%EC%82%AC-%ED%9B%84-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0-%EC%9E%91%EC%97%85",
        },
      },
      {
        text: "@supabase/ssr로 서버·클라이언트 인증 상태를 관리하고, Proxy에서 세션을 확인해 인증이 필요한 경로 접근을 제어하며 PASSWORD_RECOVERY 상태로 비밀번호 재설정 흐름 구분",
        post: {
          title: "비밀번호 재설정 링크를 통한 접근 여부 검증",
          href: "https://velog.io/@ruiwaa/%EC%A4%91%EB%8B%A8%EC%96%B4-%EC%B0%BD%EA%B3%A0-%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EC%9E%AC%EC%84%A4%EC%A0%95-%EB%A7%81%ED%81%AC%EB%A5%BC-%ED%86%B5%ED%95%9C-%EC%A0%91%EA%B7%BC-%EC%97%AC%EB%B6%80-%EA%B2%80%EC%A6%9D",
        },
      },
      "HSK 단어 검색을 Supabase RPC로 처리해 서버에서 관련성 기준으로 정렬 후 필요한 데이터만 전달, 데이터가 늘어도 확장 가능한 검색 구조 구현",
    ],
    links: {
      demo: "http://hanzi-bank.vercel.app",
      github: "https://github.com/ruiwaa/hanzi-bank",
      post: getTroubleshootingHref("중단어 창고"),
    },
  },
  {
    title: "행쇼마켓",
    description:
      "Next.js와 React를 기반으로, 소상공인의 감성 문구 제품을 한 곳에 모아 소비자가 다양한 상점의 상품을 구매 할 수 있도록 구현한 문구류 오픈마켓 사이트입니다.",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "TanStack Query"],
    period: "2026.04 ~ 2026.05",
    team: ["FE 5인 팀"],
    role: "마이페이지 - 소비자 주문 내역·찜한 상품, 판매자 상품 등록·상품 관리·상점 주문 관리",
    media: {
      type: "image",
      src: "/projects/hangsho-market-home.png",
    },
    detail: [
      {
        text: "Navi가 클라이언트에서 늦게 렌더링되며 Footer를 밀어내던 문제를 서버 컴포넌트 전환으로 해결해 CLS를 0.608에서 0으로 개선",
        post: {
          title: "성능 최적화",
          href: "/posts/final-project-performance",
        },
      },
      "배송 상태 변경 후 관련 쿼리를 invalidate해 새로고침 없이 주문 목록에 변경 사항이 바로 반영되도록 구현",
      "Supabase 관계형 조회로 주문·상품 정보를 연동하고, 중첩된 응답 데이터에 타입을 정의해 타입 안정성 확보",
      {
        text: "Supabase 호출은 API 함수로, 조회·검증 로직은 Custom Hook으로, 상태 변경 로직은 UI와 분리해 재사용성 향상",
        post: {
          title: "찜하기 버튼 재사용을 위한 리펙토링",
          href: "/posts/final-project",
        },
      },
      {
        text: "사용하지 않는 three.js 패키지(약 600KB)를 의존성에서 제거",
        post: {
          title: "성능 최적화",
          href: "/posts/final-project-performance",
        },
      },
    ],
    links: {
      demo: "https://final-project-team2.vercel.app/",
      github: "https://github.com/ruiwaa/final-project-team2",
      post: getTroubleshootingHref("행쇼마켓"),
    },
  },
  {
    title: "예매의 정석",
    description:
      "HTML, CSS, JavaScript를 사용하여 영화 선택부터 결제까지 실제 예매 사이트에 필요한 기능을 구현한 사이트입니다.",
    tags: ["HTML", "CSS", "JavaScript"],
    period: "2026.02 ~ 2026.03",
    team: ["FE 4인 팀"],
    role: "영화표 결제 페이지",
    media: {
      type: "image",
      src: "/projects/booking-payment-preview.png",
    },
    detail: [
      "포인트·카드 할인 폼과 유효성 검증 로직을 구현해 할인 금액을 총 합계에 정확히 반영",
      "필수 정보 없이 결제 페이지 URL로 바로 접근 시 이전 단계로 리디렉션하는 가드 로직 구현",
      {
        text: "URLSearchParams로 탭 상태를 URL에 저장해 새로고침·뒤로가기에도 활성 탭이 유지되도록 개선",
        post: {
          title: "코드 리펙토링 기록",
          href: "/posts/yeamaeui-jeongseok-refactoring",
        },
      },
    ],
    links: {
      demoType: "video",
      demo: "https://www.youtube.com/shorts/lYYqKjHCCrM?feature=share",
      github: "https://github.com/ruiwaa/vanilla-project-team1",
      post: getTroubleshootingHref("예매의 정석"),
    },
  },
];
