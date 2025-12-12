import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import type { ComponentProps, HTMLAttributes } from "react";

import DynamicCommandsTable from "@/components/docs/eternalcore/commands/dynamic-commands-table";
import DynamicPlaceholdersTable from "@/components/docs/eternalcore/placeholder/dynamic-placeholders-table";
import { AlertBox } from "@/components/ui/alert-box";
import { Callout } from "@/components/ui/mdx/callout";
import { Card, CardGroup } from "@/components/ui/mdx/card";
import { CodeBlock } from "@/components/ui/mdx/code-block";
import { CodeTab, CodeTabs } from "@/components/ui/mdx/code-tabs";
import { Heading } from "@/components/ui/mdx/heading";
import { Inline } from "@/components/ui/mdx/inline";
import { Step, Steps } from "@/components/ui/mdx/steps";

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export const components: MDXComponents = {
  h1: (props: HeadingProps) => (
    <Heading
      className="mt-10 mb-6 font-bold text-4xl tracking-tight lg:text-5xl"
      tag="h1"
      {...props}
    />
  ),
  h2: (props: HeadingProps) => (
    <Heading className="mt-10 mb-4 font-semibold text-3xl tracking-tight" tag="h2" {...props} />
  ),
  h3: (props: HeadingProps) => (
    <Heading className="mt-8 mb-3 font-medium text-2xl" tag="h3" {...props} />
  ),
  h4: (props: HeadingProps) => (
    <Heading className="mt-6 mb-2 font-medium text-xl" tag="h4" {...props} />
  ),
  h5: (props: HeadingProps) => (
    <Heading className="mt-4 mb-1 font-medium text-lg" tag="h5" {...props} />
  ),
  h6: (props: HeadingProps) => (
    <Heading
      className="mt-2 mb-1 font-medium text-base text-muted-foreground"
      tag="h6"
      {...props}
    />
  ),

  AlertBox, // Keep for backward compatibility
  Callout,
  Card,
  CardGroup,
  Steps,
  Step,
  CodeTabs,
  CodeTab,
  DynamicCommandsTable,
  DynamicPlaceholdersTable,

  code: (props: ComponentProps<"code">) => {
    const { children, ...rest } = props;
    let content = typeof children === "string" ? children : String(children);
    content = content.replace(/^`+|`+$/g, "");

    if (!content.includes("\n")) {
      return <Inline {...rest}>{content}</Inline>;
    }

    return <code {...rest}>{children}</code>;
  },

  pre: CodeBlock,

  blockquote: (props) => (
    <blockquote
      className="border-gray-300 border-l-4 pl-4 text-gray-600 italic dark:border-gray-600 dark:text-gray-400"
      {...props}
    />
  ),

  table: (props) => (
    <div className="my-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900/50">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  ),

  thead: (props) => (
    <thead
      className="border-gray-200 border-b bg-gray-50/50 text-gray-900 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-100"
      {...props}
    />
  ),
  tbody: (props) => <tbody className="divide-y divide-gray-100 dark:divide-gray-800" {...props} />,
  tr: (props) => (
    <tr className="transition-colors hover:bg-gray-50/50 dark:hover:bg-gray-800/50" {...props} />
  ),
  th: (props) => (
    <th className="px-4 py-3 font-semibold text-gray-900 text-sm dark:text-gray-100" {...props} />
  ),
  td: (props) => <td className="px-4 py-3 text-gray-600 text-sm dark:text-gray-300" {...props} />,
  hr: (props) => <hr className="my-8 border-gray-200 dark:border-gray-800" {...props} />,
  ul: (props) => (
    <ul className="list-disc space-y-2 pl-6 text-gray-600 dark:text-gray-400" {...props} />
  ),
  ol: (props) => (
    <ol className="list-decimal space-y-2 pl-8 text-gray-600 dark:text-gray-400" {...props} />
  ),
  li: (props) => <li className="py-0.5" {...props} />,

  img: (props) => {
    const alt = props.alt || "Image";

    return (
      <span className="my-6 block w-full overflow-hidden rounded-md">
        <Image
          alt={alt}
          className="h-auto w-full rounded-md shadow-sm"
          height={500}
          sizes="100vw"
          src={props.src || ""}
          width={900}
        />
      </span>
    );
  },
};

// biome-ignore lint/performance/noBarrelFile: Re-exporting for convenience
export { mdxOptions } from "../../../lib/mdx-config.mjs";
