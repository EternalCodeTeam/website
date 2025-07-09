/* eslint-disable @typescript-eslint/ban-ts-comment */
import type { MDXComponents } from "mdx/types";
import React from "react";

import DynamicCommandsTable from "@/components/docs/eternalcore/DynamicCommandsTable";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { CodeTabs, CodeTab } from "@/components/mdx/CodeTabs";
import { Heading } from "@/components/mdx/Heading";
import { Inline } from "@/components/mdx/Inline";
import { AlertBox } from "@/components/ui/alert-box";

type HeadingProps = React.HTMLAttributes<HTMLHeadingElement>;

export const components: MDXComponents = {
  h1: (props: HeadingProps) => (
    <Heading
      tag="h1"
      className="text-4xl font-bold tracking-tight lg:text-5xl mt-10 mb-6"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <Heading
      tag="h2"
      className="text-3xl font-semibold tracking-tight mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props: HeadingProps) => (
    <Heading
      tag="h3"
      className="text-2xl font-medium mt-8 mb-3"
      {...props}
    />
  ),
  h4: (props: HeadingProps) => (
    <Heading
      tag="h4"
      className="text-xl font-medium mt-6 mb-2"
      {...props}
    />
  ),
  h5: (props: HeadingProps) => (
    <Heading
      tag="h5"
      className="text-lg font-medium mt-4 mb-1"
      {...props}
    />
  ),
  h6: (props: HeadingProps) => (
    <Heading
      tag="h6"
      className="text-base font-medium mt-2 mb-1 text-muted-foreground"
      {...props}
    />
  ),

  // Custom components
  AlertBox: AlertBox,
  CodeTabs,
  CodeTab,
  DynamicCommandsTable,

  code: (props: React.ComponentProps<"code">) => {
    const { children, ...rest } = props;
    let content = typeof children === "string" ? children : String(children);
    content = content.replace(/^`+|`+$/g, "");

    if (!content.includes("\n")) {
      return <Inline {...rest}>{content}</Inline>;
    }

    return <code {...rest}>{children}</code>;
  },

  // @ts-expect-error idk
  pre: CodeBlock,

  blockquote: (props) => (
    <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:border-gray-600 dark:text-gray-400" {...props} />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-lg">
      <table
        className="w-full border-collapse text-sm text-left"
        {...props}
      />
    </div>
  ),
  thead: (props) => (
    <thead className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100" {...props} />
  ),
  tbody: (props) => <tbody className="divide-y divide-gray-200 dark:divide-gray-700" {...props} />,
  tr: (props) => <tr className="hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors" {...props} />,
  th: (props) => (
    <th
      className="px-4 py-2 font-semibold text-gray-700 dark:text-gray-200 text-sm"
      {...props}
    />
  ),
  td: (props) => (
    <td className="px-4 py-2 text-gray-600 dark:text-gray-300 text-sm" {...props} />
  ),
  hr: (props) => <hr className="border-gray-200 dark:border-gray-700 my-8" {...props} />,
  ul: (props) => <ul className="pl-6 list-disc space-y-1" {...props} />,
  ol: (props) => <ol className="pl-8 list-decimal space-y-1" {...props} />,
  li: (props) => <li className="py-0.5" {...props} />,
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="inline-block rounded-md shadow-sm my-4"
      alt={props.alt || "Image"}
      {...props}
    />
  ),
};

export { mdxOptions } from "../../lib/mdx-config.mjs";
