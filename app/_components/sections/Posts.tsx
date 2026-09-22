import { ExternalLink } from "lucide-react";
import Badge from "@/app/_components/ui/Badge";
import { LAYOUT } from "@/lib/constants";

interface VelogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  url: string;
  readingTime: number;
  tags: string[];
}

// velog.io/@ruiwaa 에 발행한 글을 여기에 등록 - 새 글 작성 후 이 배열에 추가
const velogPosts: VelogPost[] = [
  {
    id: 1,
    title: "[포트폴리오] DAY 3~5  작업 목록에 따른 기능 구현",
    excerpt:
      "Claude Code로 포트폴리오 페이지별 컴포넌트를 구현하며, 애니메이션 코드 가독성을 개선한 컴포넌트 분리 규칙을 정리했습니다.",
    date: "2026-09-03",
    url: "https://velog.io/@ruiwaa/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4-DAY-3-%EC%9E%91%EC%97%85-%EB%AA%A9%EB%A1%9D%EC%97%90-%EB%94%B0%EB%A5%B8-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84",
    readingTime: 5,
    tags: ["포트폴리오", "Claude Code"],
  },
  {
    id: 2,
    title: "[포트폴리오] Day 2: claude.md 작성 및 디자인 시안 만들기",
    excerpt:
      "AI와 효율적으로 협업하기 위해 프로젝트 전체 개요부터 세부 기능별 문서까지 체계적으로 나눠 작성한 과정을 기록했습니다.",
    date: "2026-09-02",
    url: "https://velog.io/@ruiwaa/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4-Day-2-claude.md-%EC%9E%91%EC%84%B1-%EB%B0%8F-%EB%94%94%EC%9E%90%EC%9D%B8-%EC%8B%9C%EC%95%88-%EB%A7%8C%EB%93%A4%EA%B8%B0",
    readingTime: 5,
    tags: ["포트폴리오", "Claude Code"],
  },
  {
    id: 3,
    title: "[포트폴리오] Day 1 : 환경 구성 및 DB 설계",
    excerpt:
      "Next.js, TypeScript, Tailwind CSS로 프로젝트를 초기화하고 Supabase로 posts 테이블을 설계한 과정을 정리했습니다.",
    date: "2026-09-01",
    url: "https://velog.io/@ruiwaa/%ED%8F%AC%ED%8A%B8%ED%8F%B4%EB%A6%AC%EC%98%A4-Day-1-%ED%99%98%EA%B2%BD-%EA%B5%AC%EC%84%B1-%EB%B0%8F-DB-%EC%84%A4%EA%B3%84",
    readingTime: 5,
    tags: ["포트폴리오", "Next.js"],
  },
  {
    id: 4,
    title: "[포트폴리오] 기획 단계: 내부 구성 생각해보기",
    excerpt:
      "다른 프론트엔드 개발자들의 포트폴리오를 조사하고, 경험과 개발 과정을 기록할 수 있는 구성을 기획했습니다.",
    date: "2026-08-31",
    url: "https://velog.io/@ruiwaa/%ED%8F%AC%ED%86%A0%ED%8F%B4%EB%A6%AC%EC%98%A4-%EA%B8%B0%ED%9A%8D-%EB%8B%A8%EA%B3%84-%EB%82%B4%EB%B6%80-%EA%B5%AC%EC%84%B1-%EC%83%9D%EA%B0%81%ED%95%B4%EB%B3%B4%EA%B8%B0",
    readingTime: 4,
    tags: ["포트폴리오", "기획"],
  },
  {
    id: 5,
    title: "[트러블 슈팅] [중단어창고] lighthouse 검사 후 성능 개선 작업",
    excerpt:
      "Lighthouse로 주요 페이지 성능을 측정하고, 데스크탑·모바일 점수 차이를 분석해 이미지·폰트 로딩을 최적화했습니다.",
    date: "2026-08-21",
    url: "https://velog.io/@ruiwaa/%EC%A4%91%EB%8B%A8%EC%96%B4-%EC%B0%BD%EA%B3%A0-lighthouse-%EA%B2%80%EC%82%AC-%ED%9B%84-%EC%84%B1%EB%8A%A5-%EA%B0%9C%EC%84%A0-%EC%9E%91%EC%97%85",
    readingTime: 7,
    tags: ["트러블슈팅", "성능최적화"],
  },
  {
    id: 6,
    title: "[중단어 창고] 비밀번호 재설정 링크를 통한 접근 여부 검증",
    excerpt:
      "Supabase 비밀번호 재설정 공식 문서를 참조해 재설정 API 함수와 접근 검증 로직을 구현한 과정을 정리했습니다.",
    date: "2026-08-19",
    url: "https://velog.io/@ruiwaa/%EC%A4%91%EB%8B%A8%EC%96%B4-%EC%B0%BD%EA%B3%A0-%EB%B9%84%EB%B0%80%EB%B2%88%ED%98%B8-%EC%9E%AC%EC%84%A4%EC%A0%95-%EB%A7%81%ED%81%AC%EB%A5%BC-%ED%86%B5%ED%95%9C-%EC%A0%91%EA%B7%BC-%EC%97%AC%EB%B6%80-%EA%B2%80%EC%A6%9D",
    readingTime: 6,
    tags: ["Supabase", "인증"],
  },
  {
    id: 7,
    title: "[트러블 슈팅][중단어 창고] NextTheme로 다크 모드 구현 과정에서의 문제 해결",
    excerpt:
      "next-themes로 다크모드를 적용하는 과정에서 발생한 Hydration 오류의 원인과 해결 방법을 기록했습니다.",
    date: "2026-08-13",
    url: "https://velog.io/@ruiwaa/%EC%A4%91%EB%8B%A8%EC%96%B4%EC%B0%BD%EA%B3%A0-NextTheme%EB%A1%9C-%EB%8B%A4%ED%81%AC-%EB%AA%A8%EB%93%9C-%EA%B5%AC%ED%98%84-%EA%B3%BC%EC%A0%95%EC%97%90%EC%84%9C%EC%9D%98-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0",
    readingTime: 5,
    tags: ["트러블슈팅", "Next.js"],
  },
  {
    id: 8,
    title: "[중단어 창고] 검색 결과 관련도순 정렬 기능",
    excerpt:
      "검색 결과를 관련도·사용 빈도 순으로 정렬하기 위해 서버 단에서 데이터를 정렬하는 방식으로 기능을 구현했습니다.",
    date: "2026-08-12",
    url: "https://velog.io/@ruiwaa/%EC%A4%91%EB%8B%A8%EC%96%B4-%EC%B0%BD%EA%B3%A0-%EA%B2%80%EC%83%89-%EA%B2%B0%EA%B3%BC-%EA%B4%80%EB%A0%A8%EB%8F%84%EC%88%9C-%EC%A0%95%EB%A0%AC-%EA%B8%B0%EB%8A%A5",
    readingTime: 6,
    tags: ["Supabase", "검색"],
  },
  {
    id: 9,
    title: "[중단어 창고] 마이페이지 설정 이메일 변경 기능 구현 기록",
    excerpt:
      "마이페이지 이메일 변경 기능을 구현하며 겪은 문제들과, 기존 코드를 개선한 과정을 기록했습니다.",
    date: "2026-08-11",
    url: "https://velog.io/@ruiwaa/%EC%A4%91%EB%8B%A8%EC%96%B4-%EC%B0%BD%EA%B3%A0-%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80-%EC%84%A4%EC%A0%95-%EC%9D%B4%EB%A9%94%EC%9D%BC-%EB%B3%80%EA%B2%BD-%EA%B8%B0%EB%8A%A5-%EA%B5%AC%ED%98%84-%EA%B8%B0%EB%A1%9D",
    readingTime: 6,
    tags: ["트러블슈팅", "Supabase"],
  },
  {
    id: 10,
    title:
      "[중단어 창고] 마이페이지 나의 단어 페이지 데이터 연동 및 상태 관리 분리 과정 기록",
    excerpt:
      "저장한 단어의 조회·삭제·예문 작성 기능을 Supabase와 TanStack Query로 구현하며 API 함수와 상태 관리를 분리한 과정을 정리했습니다.",
    date: "2026-08-06",
    url: "https://velog.io/@ruiwaa/%EC%A4%91%EB%8B%A8%EC%96%B4-%EC%B0%BD%EA%B3%A0-%EB%A7%88%EC%9D%B4%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%82%98%EC%9D%98-%EB%8B%A8%EC%96%B4-%ED%8E%98%EC%9D%B4%EC%A7%80-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%97%B0%EB%8F%99-%EB%B0%8F-%EC%83%81%ED%83%9C-%EA%B4%80%EB%A6%AC-%EB%B6%84%EB%A6%AC-%EA%B3%BC%EC%A0%95-%EA%B8%B0%EB%A1%9D",
    readingTime: 7,
    tags: ["TanStack Query", "Supabase"],
  },
  {
    id: 11,
    title: "타임라인 위치 동기화",
    excerpt:
      "영상 타임라인 UI를 만들며 반복적으로 쓰인 비율 계산, 포인터 캡처 등 위치 동기화 패턴을 정리했습니다.",
    date: "2026-07-12",
    url: "https://velog.io/@ruiwaa/%ED%83%80%EC%9E%84%EB%9D%BC%EC%9D%B8-%EC%9C%84%EC%B9%98-%EB%8F%99%EA%B8%B0%ED%99%94",
    readingTime: 5,
    tags: ["UI", "패턴정리"],
  },
  {
    id: 12,
    title: "[개인프로젝트] 모달창을 만들어보자",
    excerpt:
      "Zustand로 검색 모달 상태를 관리하고, Web Speech API 음성 검색과 React Hook Form·Zod 폼 검증을 구현했습니다.",
    date: "2026-06-30",
    url: "https://velog.io/@ruiwaa/%EA%B0%9C%EC%9D%B8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-%EB%AA%A8%EB%8B%AC%EC%B0%BD%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4%EB%B3%B4%EC%9E%90",
    readingTime: 6,
    tags: ["Zustand", "개인프로젝트"],
  },
  {
    id: 13,
    title: "[트러블 슈팅] [중단어창고] 페이지네이션 이동 문제 해결 과정",
    excerpt:
      "전체 데이터 개수 조회로 페이지 수를 계산하고, URL 쿼리스트링 타입 변환 문제를 해결해 페이지네이션 버그를 고쳤습니다.",
    date: "2026-06-25",
    url: "https://velog.io/@ruiwaa/%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85-%ED%8E%98%EC%9D%B4%EC%A7%80%EB%84%A4%EC%9D%B4%EC%85%98-%EC%9D%B4%EB%8F%99-%EB%AC%B8%EC%A0%9C-%ED%95%B4%EA%B2%B0-%EA%B3%BC%EC%A0%95",
    readingTime: 5,
    tags: ["트러블슈팅", "페이지네이션"],
  },
  {
    id: 14,
    title:
      "[트러블 슈팅] [중단어창고] 동적 라우팅에 대한 Suspense 경고 발생 및 해결",
    excerpt:
      "usePathname을 사용하는 컴포넌트에서 발생한 Suspense 경고를, 컴포넌트를 Suspense 경계로 감싸 해결한 과정을 기록했습니다.",
    date: "2026-06-24",
    url: "https://velog.io/@ruiwaa/%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85-%EB%8F%99%EC%A0%81-%EB%9D%BC%EC%9A%B0%ED%8C%85%EC%97%90-%EB%8C%80%ED%95%9C-Suspense-%EA%B2%BD%EA%B3%A0-%EB%B0%9C%EC%83%9D-%EB%B0%8F-%ED%95%B4%EA%B2%B0",
    readingTime: 4,
    tags: ["트러블슈팅", "Next.js"],
  },
  {
    id: 15,
    title: "useEffect",
    excerpt:
      "useEffect 훅의 역할과 사용 상황, 의존성 배열과 cleanup 함수 작성 방법을 정리했습니다.",
    date: "2026-06-24",
    url: "https://velog.io/@ruiwaa/useEffect",
    readingTime: 4,
    tags: ["React", "학습노트"],
  },
  {
    id: 16,
    title: "useState 훅",
    excerpt:
      "useState로 상태를 관리하는 방법과 객체 불변성을 유지하며 중첩 객체를 업데이트하는 패턴을 정리했습니다.",
    date: "2026-06-24",
    url: "https://velog.io/@ruiwaa/useState-%ED%9B%85",
    readingTime: 4,
    tags: ["React", "학습노트"],
  },
  {
    id: 17,
    title: "[트러블 슈팅] [중단어 창고]오늘의 단어 컴포넌트 퍼블리싱",
    excerpt:
      "Supabase RLS 권한 오류를 해결하고, 접근성을 고려한 Swiper 커스텀 네비게이션을 구현한 과정을 기록했습니다.",
    date: "2026-06-22",
    url: "https://velog.io/@ruiwaa/%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85-%EC%98%A4%EB%8A%98%EC%9D%98-%EB%8B%A8%EC%96%B4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%ED%8D%BC%EB%B8%94%EB%A6%AC%EC%8B%B1",
    readingTime: 6,
    tags: ["트러블슈팅", "접근성"],
  },
  {
    id: 18,
    title: "함수 컴포넌트 vs 클래스 컴포넌트",
    excerpt:
      "클래스 컴포넌트와 함수 컴포넌트의 차이, Hooks 도입 이후 함수 컴포넌트가 주로 쓰이는 이유를 정리했습니다.",
    date: "2026-06-22",
    url: "https://velog.io/@ruiwaa/%ED%95%A8%EC%88%98-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-vs-%ED%81%B4%EB%9E%98%EC%8A%A4-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8",
    readingTime: 4,
    tags: ["React", "학습노트"],
  },
  {
    id: 19,
    title: "[트러블 슈팅] [중단어창고] 로그인, 회원가입 폼 개발 기록",
    excerpt:
      "React Hook Form과 Zod로 폼을 검증하고 Supabase Auth를 연동하며 겪은 문제들을 해결한 과정을 정리했습니다.",
    date: "2026-06-19",
    url: "https://velog.io/@ruiwaa/%EA%B0%9C%EB%B0%9C-%EB%8B%A8%EA%B3%84-%EB%A1%9C%EA%B7%B8%EC%9D%B8-%ED%9A%8C%EC%9B%90%EA%B0%80%EC%9E%85-%ED%8F%BC-%ED%8A%B8%EB%9F%AC%EB%B8%94-%EC%8A%88%ED%8C%85-%EA%B8%B0%EB%A1%9D",
    readingTime: 6,
    tags: ["트러블슈팅", "Supabase"],
  },
  {
    id: 20,
    title: "JSX",
    excerpt:
      "JSX가 무엇인지, 자바스크립트 안에서 HTML처럼 UI를 작성할 수 있게 해주는 문법의 기본 개념을 정리했습니다.",
    date: "2026-06-16",
    url: "https://velog.io/@ruiwaa/JSX",
    readingTime: 3,
    tags: ["React", "학습노트"],
  },
];

export default function Posts() {
  return (
    <section aria-label="포스트 목록">
      <h2 className="section-header text-light-text-secondary dark:text-dark-text-secondary">
        POSTS
      </h2>

      {velogPosts.length === 0 ? (
        <p className="body mt-6 text-light-text-secondary dark:text-dark-text-secondary text-center">
          아직 등록된 포스트가 없습니다.
        </p>
      ) : (
        <ul
          className={`mt-6 grid grid-cols-1 md:grid-cols-2 ${LAYOUT.componentGap}`}
        >
          {velogPosts.map((post) => (
            <li key={post.id}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-light-accent dark:focus-visible:outline-dark-accent"
              >
                <article className="flex h-full flex-col rounded-lg bg-light-surface-dim p-6 dark:bg-dark-surface-dim">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="body font-bold text-light-text dark:text-dark-text">
                      {post.title}
                    </h3>
                    <ExternalLink
                      aria-hidden="true"
                      className="mt-1 h-4 w-4 shrink-0 text-light-text-secondary dark:text-dark-text-secondary"
                    />
                  </div>
                  <p className="body mt-2 flex-1 text-light-text-secondary dark:text-dark-text-secondary">
                    {post.excerpt}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <li key={tag}>
                        <Badge label={tag} />
                      </li>
                    ))}
                  </ul>
                  <div className="badge mt-4 flex items-center gap-2 text-light-text-secondary dark:text-dark-text-secondary">
                    <time dateTime={post.date}>
                      {new Date(post.date).toLocaleDateString("ko-KR")}
                    </time>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}분 읽기</span>
                  </div>
                </article>
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
