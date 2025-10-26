import type { MDXComponents } from "mdx/types";
import type { ComponentProps, HTMLAttributes } from "react";
import DynamicCommandsTable from "@/components/docs/eternalcore/DynamicCommandsTable";
import { CodeBlock } from "@/components/mdx/CodeBlock";
import { CodeTab, CodeTabs } from "@/components/mdx/CodeTabs";
import { Heading } from "@/components/mdx/Heading";
import { Inline } from "@/components/mdx/Inline";
import { AlertBox } from "@/components/ui/alert-box";

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export const components: MDXComponents = {
  h1: (props: HeadingProps) => (
    <Heading
      tag="h1"
      className="mb-6 mt-10 text-4xl font-bold tracking-tight lg:text-5xl"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <Heading tag="h2" className="mb-4 mt-10 text-3xl font-semibold tracking-tight" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <Heading tag="h3" className="mb-3 mt-8 text-2xl font-medium" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <Heading tag="h4" className="mb-2 mt-6 text-xl font-medium" {...props} />
  ),
  h5: (props: HeadingProps) => (
    <Heading tag="h5" className="mb-1 mt-4 text-lg font-medium" {...props} />
  ),
  h6: (props: HeadingProps) => (
    <Heading
      tag="h6"
      className="text-muted-foreground mb-1 mt-2 text-base font-medium"
      {...props}
    />
  ),

  // Custom components
  AlertBox: AlertBox,
  CodeTabs,
  CodeTab,
  DynamicCommandsTable,

  code: (props: ComponentProps<"code">) => {
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
    <blockquote
      className="border-l-4 border-gray-300 pl-4 italic text-gray-600 dark:border-gray-600 dark:text-gray-400"
      {...props}
    />
  ),
  table: (props) => (
    <div className="my-6 overflow-x-auto rounded-lg">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),
  thead: (props) => (
    <thead className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100" {...props} />
  ),
  tbody: (props) => <tbody className="divide-y divide-gray-200 dark:divide-gray-700" {...props} />,
  tr: (props) => (
    <tr className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-900" {...props} />
  ),
  th: (props) => (
    <th className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200" {...props} />
  ),
  td: (props) => <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300" {...props} />,
  hr: (props) => <hr className="my-8 border-gray-200 dark:border-gray-700" {...props} />,
  ul: (props) => <ul className="list-disc space-y-1 pl-6" {...props} />,
  ol: (props) => <ol className="list-decimal space-y-1 pl-8" {...props} />,
  li: (props) => <li className="py-0.5" {...props} />,
  img: (props) => (
    // biome-ignore lint/performance/noImgElement: it's for docs only.
    <img className="my-4 inline-block rounded-md shadow-sm" alt={props.alt || "Image"} {...props} />
  ),
};

export { mdxOptions } from "../../lib/mdx-config.mjs";
