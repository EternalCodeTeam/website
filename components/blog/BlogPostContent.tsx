"use client";

import { MDXRemote } from "next-mdx-remote/rsc";

import { components } from "@/lib/mdx";

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  if (!content) return null;
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-900 dark:prose-code:text-white prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800 prose-headings:text-left prose-p:text-left">
      {/* @ts-expect-error Server Component MDXRemote */}
      <MDXRemote source={content} components={components} />
    </div>
  );
} 