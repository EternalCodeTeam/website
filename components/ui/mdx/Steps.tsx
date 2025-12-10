"use client";

import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface StepsProps {
  children: React.ReactNode;
  className?: string;
}

export function Steps({ children, className }: StepsProps) {
  return (
    <div
      className={cn(
        "mt-8 ml-4 border-gray-200 border-l pl-8 [counter-reset:step] dark:border-gray-800",
        className
      )}
    >
      {children}
    </div>
  );
}

interface StepProps {
  title?: string;
  icon?: string;
  children: React.ReactNode;
}

export function Step({ title, icon, children }: StepProps) {
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: Dynamic icon loading based on prop
  const IconComponent = icon ? (LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon) : null;

  return (
    <div className="relative mt-8 first:mt-0">
      <div
        className={cn(
          "-left-[49px] absolute top-0 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 ring-2 ring-white dark:bg-gray-800 dark:ring-gray-950",
          "border border-gray-200 dark:border-gray-700"
        )}
      >
        {IconComponent ? (
          <IconComponent className="h-4 w-4 text-gray-900 dark:text-gray-100" />
        ) : (
          <span className="font-bold text-gray-900 text-sm content-[counter(step)] [counter-increment:step] dark:text-gray-100">
            {/* content uses CSS counter */}
          </span>
        )}
      </div>

      <div className="flex flex-col">
        {title && (
          <h3 className="mb-3 font-semibold text-gray-900 text-lg tracking-tight dark:text-gray-100">
            {title}
          </h3>
        )}
        <div className="prose prose-sm prose-gray dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
          {children}
        </div>
      </div>
    </div>
  );
}
