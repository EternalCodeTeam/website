"use client";

import { Clock } from "lucide-react";

import { cn } from "@/lib/utils";

export interface ReadingTimeProps {
  content: string;
  wordsPerMinute?: number;
  className?: string;
}

export const ReadingTime = ({
  content,
  wordsPerMinute = 200,
  className,
}: ReadingTimeProps) => {
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);

  return (
    <div
      className={cn("text-muted-foreground flex items-center gap-2 text-sm", className)}
      aria-label={`${readingTime} minute read`}
    >
      <Clock className="h-4 w-4" aria-hidden="true" />
      <span>{readingTime} min read</span>
    </div>
  );
};
