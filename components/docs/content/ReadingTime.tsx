"use client";

import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ReadingTimeProps {
  content: string;
  wordsPerMinute?: number;
  className?: string;
}

export const ReadingTime = ({ content, wordsPerMinute = 200, className }: ReadingTimeProps) => {
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-gray-600 text-xs dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-400",
        className
      )}
    >
      <Clock aria-hidden="true" className="h-3.5 w-3.5" />
      <span>{readingTime} min read</span>
    </div>
  );
};
