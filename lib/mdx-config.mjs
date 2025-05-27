import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism";

// Export the MDX options to be used by both @next/mdx and next-mdx-remote
export const mdxOptions = {
  remarkPlugins: [remarkGfm, remarkEmoji],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    rehypePrism,
  ],
};
