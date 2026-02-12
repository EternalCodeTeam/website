"use client";

import { ExternalLink } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSpotlight } from "@/hooks/use-spotlight";

interface LinkPreviewProps {
  href: string;
  title: string;
  description?: string;
  icon?: ReactNode;
  className?: string;
}

export function LinkPreview({ href, title, description, icon, className }: LinkPreviewProps) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const spotlight = useSpotlight<HTMLDivElement>();

  const content = (
    <div
      className={cn(
        "spotlight-card group relative flex cursor-pointer items-start gap-4 rounded-lg border border-gray-200 bg-white p-4 transition-all hover:border-blue-500 hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-blue-400",
        className
      )}
      onPointerLeave={spotlight.onPointerLeave}
      onPointerMove={spotlight.onPointerMove}
    >
      {icon && (
        <div className="shrink-0 text-gray-400 group-hover:text-blue-500 dark:text-gray-500">
          {icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-semibold text-gray-900 text-sm group-hover:text-blue-600 dark:text-gray-100 dark:group-hover:text-blue-400">
            {title}
          </h4>
          {isExternal && (
            <ExternalLink aria-hidden="true" className="h-4 w-4 shrink-0 text-gray-400" />
          )}
        </div>
        {description && (
          <p className="mt-1 text-gray-600 text-sm dark:text-gray-400">{description}</p>
        )}
      </div>
    </div>
  );

  if (isExternal) {
    return (
      <a
        className="mb-4 block no-underline last:mb-0"
        href={href}
        rel="noopener noreferrer"
        target="_blank"
      >
        {content}
      </a>
    );
  }

  return (
    <Link className="mb-4 block no-underline last:mb-0" href={href}>
      {content}
    </Link>
  );
}
