"use client";

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  description?: string;
  icon?: string;
  href?: string;
  className?: string;
}

export function Card({ title, description, icon, href, className }: CardProps) {
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: Dynamic icon loading based on prop
  const IconComponent = icon ? (LucideIcons[icon as keyof typeof LucideIcons] as LucideIcon) : null;

  const content = (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 dark:border-gray-800 dark:bg-gray-900",
        href &&
          "cursor-pointer hover:border-blue-500/50 hover:shadow-md hover:-translate-y-1 dark:hover:border-blue-400/50",
        className
      )}
    >
      <div className="flex flex-col gap-4">
        {IconComponent && (
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100 transition-colors group-hover:bg-blue-100 group-hover:text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 dark:ring-blue-500/20 dark:group-hover:bg-blue-500/20 dark:group-hover:text-blue-300">
            <IconComponent className="h-6 w-6" />
          </div>
        )}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold tracking-tight text-gray-900 transition-colors group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {title}
          </h3>
          {description && <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {content}
      </Link>
    );
  }

  return content;
}

export function CardGroup({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4 sm:grid-cols-2 lg:grid-cols-3 my-8", className)}>{children}</div>
  );
}
