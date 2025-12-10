"use client";

import { MDXRemote } from "next-mdx-remote/rsc";

import { components } from "@/components/ui/mdx/mdx-components";

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  if (!content) return null;
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none prose-pre:bg-gray-100 prose-headings:text-left prose-p:text-left prose-a:text-blue-600 prose-code:text-gray-900 prose-headings:text-gray-900 prose-p:text-gray-700 prose-strong:text-gray-900 dark:prose-pre:bg-gray-800 dark:prose-a:text-blue-400 dark:prose-code:text-white dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-strong:text-white">
      <MDXRemote components={components} source={content} />
    </div>
  );
}
