"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

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
        <Link href={prev.path} prefetch aria-label={`Previous: ${prev.title}`}>
          <Button
            variant="secondary"
            size="md"
            leftIcon={<ArrowLeft className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
            className="group text-gray-700 dark:text-gray-300"
          >
            <span className="truncate">{prev.title}</span>
          </Button>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link href={next.path} prefetch aria-label={`Next: ${next.title}`}>
          <Button
            variant="secondary"
            size="md"
            rightIcon={<ArrowRight className="h-5 w-5 text-gray-500 dark:text-gray-400" />}
            className="group text-gray-700 dark:text-gray-300"
          >
            <span className="truncate">{next.title}</span>
          </Button>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}
