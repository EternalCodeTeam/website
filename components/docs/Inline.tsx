import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InlineProps {
  children: ReactNode;
  className?: string;
}

export const Inline = ({ children, className }: InlineProps) => {
  return (
    <span
      className={cn(
        "inline-block rounded-md border border-neutral-200 dark:border-neutral-700",
        "bg-neutral-50 dark:bg-neutral-800",
        "px-1.5 py-0.5 text-sm",
        "text-neutral-700 dark:text-neutral-300",
        "font-mono",
        className
      )}
    >
      {children}
    </span>
  );
};
