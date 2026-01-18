"use client";

import { ArrowUpRight, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MdxLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: ReactNode;
}

const baseClassName =
  "group relative inline-flex items-center gap-1 font-medium text-blue-600 transition-colors hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40";

export function MdxLink({ href = "", children, className, ...rest }: MdxLinkProps) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const isSpecial = href.startsWith("mailto:") || href.startsWith("tel:");

  // External links require new tab behavior
  const linkProps = (isExternal || isSpecial) ? {
    target: isExternal ? "_blank" : undefined,
    rel: isExternal ? "noopener noreferrer" : undefined,
  } : {};

  const content = (
    <>
      <span className="relative inline-block">
        {children}
        <span className="absolute inset-x-0 -bottom-px block h-px w-0 origin-left bg-current opacity-40 transition-all duration-300 ease-out group-hover:w-full group-hover:opacity-80" />
      </span>
      <span className="inline-flex shrink-0 self-center transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
        {isExternal || isSpecial ? (
          <>
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
            {isExternal && <span className="sr-only">(opens in a new tab)</span>}
          </>
        ) : (
          <LinkIcon className="h-3.5 w-3.5" strokeWidth={2.5} />
        )}
      </span>
    </>
  );

  if (isExternal || isSpecial) {
    return (
      <a
        className={cn(baseClassName, className)}
        href={href}
        {...linkProps}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link
      className={cn(baseClassName, className)}
      href={href}
      {...rest}
    >
      {content}
    </Link>
  );
}
