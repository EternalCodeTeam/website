import { ArrowUpRight, Link as LinkIcon } from "lucide-react";
import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MdxLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href?: string;
  children?: ReactNode;
}

const baseClassName =
  "group relative inline-flex items-center gap-1.5 font-medium text-blue-700 transition-colors hover:text-blue-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 dark:text-blue-300 dark:hover:text-blue-200";

const underlineClassName =
  "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-blue-500/60 after:transition-transform after:duration-300 group-hover:after:scale-x-100";

const iconClassName =
  "h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:translate-x-0.5";

export function MdxLink({ href = "", children, className, ...rest }: MdxLinkProps) {
  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const isSpecial = href.startsWith("mailto:") || href.startsWith("tel:");

  const content = (
    <span className="relative inline-flex items-center gap-1.5">
      <span className="relative">{children}</span>
      {isExternal || isSpecial ? (
        <ArrowUpRight
          aria-hidden="true"
          className={cn(iconClassName, "group-hover:-translate-y-0.5")}
        />
      ) : (
        <LinkIcon aria-hidden="true" className={iconClassName} />
      )}
    </span>
  );

  if (isExternal || isSpecial) {
    return (
      <a
        className={cn(baseClassName, underlineClassName, className)}
        href={href}
        rel={isExternal ? "noopener noreferrer" : undefined}
        target={isExternal ? "_blank" : undefined}
        {...rest}
      >
        {content}
      </a>
    );
  }

  return (
    <Link className={cn(baseClassName, underlineClassName, className)} href={href} {...rest}>
      {content}
    </Link>
  );
}
