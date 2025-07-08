"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

interface NavigationLink {
  title: string;
  path: string;
}

interface DocsNavigationProps {
  prev: NavigationLink | null;
  next: NavigationLink | null;
}

export function DocsNavigation({ prev, next }: DocsNavigationProps) {
  return (
    <nav
      className="mx-auto mt-12 flex w-full max-w-5xl items-center justify-between gap-4"
      aria-label="Documentation navigation"
    >
      {prev ? (
        <Link
          href={prev.path}
          prefetch
          aria-label={`Previous: ${prev.title}`}
          className="group flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <ArrowLeft className="h-5 w-5 shrink-0 text-gray-500 transition group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200" />
          <span className="truncate text-sm font-medium">{prev.title}</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.path}
          prefetch
          aria-label={`Next: ${next.title}`}
          className="group flex items-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-700 shadow-sm transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          <span className="truncate text-sm font-medium">{next.title}</span>
          <ArrowRight className="h-5 w-5 shrink-0 text-gray-500 transition group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-200" />
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
