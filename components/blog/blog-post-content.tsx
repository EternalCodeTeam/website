import LexicalRenderer from "@/components/blog/lexical-renderer";

type BlogPostContentProps = {
  // biome-ignore lint/suspicious/noExplicitAny: Lexical content is dynamic JSON
  content: any;
};

export default function BlogPostContent({ content }: BlogPostContentProps) {
  if (!content) {
    return null;
  }
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      <LexicalRenderer content={content} />
    </div>
  );
}
