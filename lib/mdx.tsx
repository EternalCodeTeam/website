import React from "react";
import { Inline } from "@/components/docs/Inline";
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
import { CodeBlock } from "@/components/docs/CodeBlock";

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
  Inline,
  code: (props: React.ComponentProps<'code'>) => {
    let { children, ...rest } = props;
    let content = typeof children === "string" ? children : String(children);
    content = content.replace(/^`+|`+$/g, "");
    if (!content.includes("\n")) {
      return <Inline children={content} {...rest} />;
    }
    return React.createElement('code', { ...rest }, children);
  },
  pre: CodeBlock,
};

export const mdxOptions = {
  remarkPlugins: [remarkGfm, remarkEmoji],
  rehypePlugins: [
    rehypeSlug,
    [rehypeAutolinkHeadings, { behavior: "wrap" }],
    rehypePrism,
  ],
};
