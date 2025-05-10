import { Alert } from "@/components/docs/Alert";
import { CodeTabs, CodeTab } from "@/components/docs/CodeTabs";
import { H1, H2, H3, H4, H5, H6 } from "@/components/docs/AnimatedHeading";
import remarkGfm from "remark-gfm";
import remarkEmoji from "remark-emoji";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism";
import DynamicFeaturesTable from "@/components/docs/DynamicFeaturesTable";
import DynamicCommandsTable from "@/components/docs/DynamicCommandsTable";

export const components = {
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  Alert,
  CodeTabs,
  CodeTab,
  DynamicFeaturesTable,
  DynamicCommandsTable,
};

export const mdxOptions = {
  remarkPlugins: [remarkGfm, remarkEmoji],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    rehypePrism,
  ],
};
