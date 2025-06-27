import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism";
import rehypeSlug from "rehype-slug";
import remarkEmoji from "remark-emoji";
import remarkGfm from "remark-gfm";

export const mdxOptions = {
  remarkPlugins: [remarkGfm, remarkEmoji],
  rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: "wrap" }], rehypePrism],
};
