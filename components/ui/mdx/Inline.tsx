import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface InlineProps extends HTMLAttributes<HTMLElement> {
  children?: ReactNode;
}

export const Inline = ({ children, className, ...rest }: InlineProps) => (
  <span
    className={cn(
      "inline-block rounded-md border border-gray-200 px-1.5 py-0.5 font-mono text-sm transition-colors",
      "bg-gray-100 text-gray-900",
      "dark:border-gray-700/50 dark:bg-gray-800/50 dark:text-gray-200",
      className
    )}
    {...rest}
  >
    {children}
  </span>
);
