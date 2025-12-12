"use client";

import type { LucideIcon } from "lucide-react";
// biome-ignore lint/performance/noNamespaceImport: Dynamic icon loading
import * as LucideIcons from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CardProps = {
  title: string;
  description?: string;
  icon?: string;
  href?: string;
  className?: string;
};

export function Card({ title, description, icon, href, className }: CardProps) {
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: Dynamic icon loading based on prop
  const IconComponent = icon ? (LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon) : null;

  const content = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-gray-800 dark:bg-gray-900",
        href
          ? "hover:-translate-y-1 cursor-pointer hover:border-blue-500/50 hover:shadow-md dark:hover:border-blue-400/50"
          : "",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        {!!IconComponent && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20 dark:group-hover:bg-blue-500/20 dark:group-hover:text-blue-300">
            <IconComponent className="h-6 w-6" />
          </div>
        )}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900 text-lg tracking-tight transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {title}
          </h3>
          {!!description && (
            <p className="text-gray-500 text-sm dark:text-gray-400">{description}</p>
          )}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link className="block no-underline" href={href}>
        {content}
      </Link>
    );
  }

  return content;
}

export function CardGroup({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("my-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3", className)}>{children}</div>
  );
}
