import type { MDXComponents } from "mdx/types";
import type { ComponentProps, HTMLAttributes } from "react";

import DynamicCommandsTable from "@/components/docs/eternalcore/commands/dynamic-commands-table";
import DynamicPlaceholdersTable from "@/components/docs/eternalcore/placeholder/dynamic-placeholders-table";
import { AlertBox } from "@/components/ui/alert-box";
import { Badge } from "@/components/ui/mdx/badge";
import { BeforeAfter, BeforeAfterItem } from "@/components/ui/mdx/before-after";
import { Callout } from "@/components/ui/mdx/callout";
import { Card, CardGroup } from "@/components/ui/mdx/card";
import { CodeBlock } from "@/components/ui/mdx/code-block";
import { CodeTab, CodeTabs } from "@/components/ui/mdx/code-tabs";
import { Command } from "@/components/ui/mdx/command";
import { Divider } from "@/components/ui/mdx/divider";
import { FileTree, FileTreeItem } from "@/components/ui/mdx/file-tree";
import { Heading } from "@/components/ui/mdx/heading";
import { Inline } from "@/components/ui/mdx/inline";
import { LinkPreview } from "@/components/ui/mdx/link-preview";
import { MdxLink } from "@/components/ui/mdx/mdx-link";
import { MdxImage } from "@/components/ui/mdx/mdx-image";
import { Step, Steps } from "@/components/ui/mdx/steps";
import { cn } from "@/lib/utils";

type HeadingProps = HTMLAttributes<HTMLHeadingElement>;

export const components: MDXComponents = {
  h1: (props: HeadingProps) => (
    <Heading
      className="mt-12 mb-8 font-bold text-4xl tracking-tight lg:text-5xl"
      tag="h1"
      {...props}
    />
  ),

  h2: (props: HeadingProps) => (
    <Heading
      className="mt-12 mb-6 pb-2 font-semibold text-3xl tracking-tight"
      tag="h2"
      {...props}
    />
  ),

  h3: (props: HeadingProps) => (
    <Heading className="mt-10 mb-4 font-semibold text-2xl" tag="h3" {...props} />
  ),

  h4: (props: HeadingProps) => (
    <Heading className="mt-8 mb-3 font-medium text-xl" tag="h4" {...props} />
  ),

  h5: (props: HeadingProps) => (
    <Heading className="mt-6 mb-2 font-medium text-lg text-muted-foreground" tag="h5" {...props} />
  ),

  h6: (props: HeadingProps) => (
    <Heading
      className="mt-4 mb-2 font-medium text-muted-foreground text-sm uppercase tracking-wide"
      tag="h6"
      {...props}
    />
  ),

  AlertBox,
  Callout,
  Card,
  CardGroup,
  Steps,
  Step,
  CodeTabs,
  CodeTab,
  BeforeAfter,
  BeforeAfterItem,
  Badge,
  Command,
  Divider,
  FileTree,
  FileTreeItem,
  LinkPreview,
  DynamicCommandsTable,
  DynamicPlaceholdersTable,

  code: ({ children, ...props }: ComponentProps<"code">) => {
    if (typeof children !== "string") {
      return <code {...props}>{children}</code>;
    }

    const content = children.replace(/^`+|`+$/g, "");

    return <Inline {...props}>{content}</Inline>;
  },

  pre: CodeBlock,

  p: (props) => (
    <p
      className="my-4 text-base text-gray-700 leading-relaxed first:mt-0 last:mb-0 dark:text-gray-300"
      {...props}
    />
  ),

  br: () => (
    <span
      aria-hidden="true"
      className="my-5 block h-px w-full bg-linear-to-r from-transparent via-gray-200/70 to-transparent dark:via-gray-700/60"
    />
  ),

  blockquote: (props) => (
    <blockquote
      className="my-6 rounded-xl border-gray-200 border-l-4 bg-gray-50 px-5 py-4 text-gray-700 italic shadow-sm dark:border-gray-700 dark:bg-gray-900/50 dark:text-gray-300"
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
    <th
      className="px-4 py-3 text-left font-semibold text-muted-foreground text-xs uppercase tracking-wide"
      {...props}
    />
  ),

  td: (props) => <td className="px-4 py-3 text-sm" {...props} />,

  hr: (props) => <hr className="my-12 border-border" {...props} />,

  ul: (props) => (
    <ul
      className="my-4 list-disc space-y-2 pl-6 text-gray-700 marker:text-gray-400 dark:text-gray-300 dark:marker:text-gray-500"
      {...props}
    />
  ),

  ol: (props) => (
    <ol
      className="my-4 list-decimal space-y-2 pl-8 text-gray-700 marker:text-gray-400 dark:text-gray-300 dark:marker:text-gray-500"
      {...props}
    />
  ),

  li: (props) => <li className="text-gray-700 leading-relaxed dark:text-gray-300" {...props} />,

  img: (props) => <MdxImage {...props} />,

  a: (props) => <MdxLink {...props} />,
};

// biome-ignore lint/performance/noBarrelFile: Re-exporting for convenience
export { mdxOptions } from "../../../lib/mdx-config.mjs";
