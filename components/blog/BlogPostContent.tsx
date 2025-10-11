"use client";

import { MDXRemote } from "next-mdx-remote/rsc";

import { components } from "@/components/mdx/mdx-components";

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  if (!content) return null;
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-left prose-headings:text-gray-900 prose-p:text-left prose-p:text-gray-700 prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-gray-900 prose-pre:bg-gray-100 dark:prose-headings:text-white dark:prose-p:text-gray-300 dark:prose-a:text-blue-400 dark:prose-strong:text-white dark:prose-code:text-white dark:prose-pre:bg-gray-800">
      <MDXRemote source={content} components={components} />
    </div>
  );
}
