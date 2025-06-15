"use client";

import { Clock } from "lucide-react";
import { memo } from "react";

import { cn } from "@/lib/utils";

export interface ReadingTimeProps {
  content: string;
  wordsPerMinute?: number;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
}

const calculateReadingTime = (text: string, wordsPerMinute: number): number => {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const ReadingTime = memo(function ReadingTime({
  content,
  wordsPerMinute = 200,
  className,
  textClassName,
  iconClassName,
}: ReadingTimeProps) {
  const readingTime = calculateReadingTime(content, wordsPerMinute);

  return (
    <div
      className={cn("text-muted-foreground flex items-center gap-2 text-sm", className)}
      role="text"
      aria-label={`${readingTime} minute read`}
    >
      <Clock className={cn("h-4 w-4", iconClassName)} aria-hidden="true" />
      <span className={cn(textClassName)}>{readingTime} min read</span>
    </div>
  );
});

ReadingTime.displayName = "ReadingTime";
