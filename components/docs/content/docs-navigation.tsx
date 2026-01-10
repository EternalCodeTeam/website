"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
      aria-label="Documentation navigation"
      className="mt-16 flex w-full flex-col gap-4 sm:flex-row sm:items-stretch sm:justify-between"
    >
      {prev ? (
        <Link
          aria-label={`Previous: ${prev.title}`}
          className={cn(
            "group relative flex h-full w-full flex-1 flex-col gap-2 overflow-hidden rounded-xl border border-gray-200 bg-white p-5 transition-all hover:border-blue-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-blue-700 dark:hover:bg-gray-900",
            "sm:max-w-[50%]"
          )}
          href={prev.path}
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-500/0 dark:to-blue-600/0" />

          <motion.div
            className="relative flex items-center gap-2 font-medium text-gray-500 text-sm transition-colors group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400"
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            whileHover={{ x: -4 }}
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </motion.div>
          <span className="relative line-clamp-2 font-bold text-base text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
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
            "group relative flex h-full w-full flex-1 flex-col items-end gap-2 overflow-hidden rounded-xl border border-gray-200 bg-white p-5 text-right transition-all hover:border-blue-300 hover:shadow-lg dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-blue-700 dark:hover:bg-gray-900",
            "sm:max-w-[50%]"
          )}
          href={next.path}
        >
          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-bl from-blue-50/0 to-blue-100/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-500/0 dark:to-blue-600/0" />

          <motion.div
            className="relative flex items-center gap-2 font-medium text-gray-500 text-sm transition-colors group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-400"
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            whileHover={{ x: 4 }}
          >
            <span>Next</span>
            <ArrowRight className="h-4 w-4" />
          </motion.div>
          <span className="relative line-clamp-2 font-bold text-base text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {next.title}
          </span>
        </Link>
      ) : (
        <div className="hidden sm:block sm:flex-1" />
      )}
    </nav>
  );
}
