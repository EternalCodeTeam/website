"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type NavigationLink = {
  title: string;
  path: string;
};

type DocsNavigationProps = {
  prev: NavigationLink | null;
  next: NavigationLink | null;
};

export function DocsNavigation({ prev, next }: DocsNavigationProps) {
  return (
    <nav
      aria-label="Documentation navigation"
      className="mt-12 flex w-full flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
    >
      {prev ? (
        <Link
          aria-label={`Previous: ${prev.title}`}
          className={cn(
            "group flex h-full w-full flex-1 flex-col gap-1 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-900",
            "sm:max-w-[50%]"
          )}
          href={prev.path}
        >
          <div className="flex items-center gap-2 text-gray-500 text-sm transition-colors group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </div>
          <span className="line-clamp-2 font-semibold text-base text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {prev.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block sm:flex-1" />
      )}

      {next ? (
        <Link
          aria-label={`Next: ${next.title}`}
          className={cn(
            "group flex h-full w-full flex-1 flex-col items-end gap-1 rounded-xl border border-gray-200 bg-white p-4 text-right transition-all hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-900",
            "sm:max-w-[50%]"
          )}
          href={next.path}
        >
          <div className="flex items-center gap-2 text-gray-500 text-sm transition-colors group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300">
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </div>
          <span className="line-clamp-2 font-semibold text-base text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block sm:flex-1" />
      )}
    </nav>
  );
}
