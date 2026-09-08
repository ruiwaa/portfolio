interface PostContentProps {
  html: string;
}

// content는 Tiptap 에디터로 작성된 HTML (docs/DOMAIN.md) - 관리자 본인만 작성하는 신뢰된 콘텐츠라 그대로 렌더링
export default function PostContent({ html }: PostContentProps) {
  return <div className="post-content" dangerouslySetInnerHTML={{ __html: html }} />;
}
