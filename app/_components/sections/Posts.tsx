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

// velog.io/@예지 에 발행한 글을 여기에 등록 - 새 글 작성 후 이 배열에 추가
const velogPosts: VelogPost[] = [];

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
