"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface DividerProps {
  label?: ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export function Divider({ label, className, orientation = "horizontal" }: DividerProps) {
  if (orientation === "vertical") {
    return (
      <hr
        aria-orientation="vertical"
        aria-valuenow={0}
        className={cn("w-px border-0 bg-gray-200 dark:bg-gray-800", className)}
      />
    );
  }

  if (label) {
    return (
      <div className={cn("relative my-8 flex items-center", className)}>
        <div className="flex-1 border-gray-200 border-t dark:border-gray-800" />
        <span className="px-4 text-gray-500 text-sm dark:text-gray-400">{label}</span>
        <div className="flex-1 border-gray-200 border-t dark:border-gray-800" />
      </div>
    );
  }

  return <hr className={cn("my-8 border-gray-200 dark:border-gray-800", className)} />;
}
