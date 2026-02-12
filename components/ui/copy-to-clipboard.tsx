"use client";

import { Check, Copy } from "lucide-react";
import type { MouseEvent } from "react";
import { type ReactNode, useCallback, useState } from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";

interface CopyToClipboardProps {
  text: string;
  className?: string;
  children?: ReactNode | ((props: { copied: boolean }) => ReactNode);
  showIcon?: boolean;
  "aria-label"?: string;
}

export function CopyToClipboard({
  text,
  className,
  children,
  showIcon = true,
  "aria-label": ariaLabel = "Copy to clipboard",
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        toast.custom((t) => (
          <output
            aria-live="polite"
            className={cn(
              "pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl p-4 shadow-xl backdrop-blur-md transition-[opacity,transform] duration-300",
              "border border-white/10 bg-white/70 dark:border-gray-800 dark:bg-gray-900/90",
              "bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/10 dark:to-gray-900/10",
              t.visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            )}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-500 dark:bg-green-400/15 dark:text-green-400">
              <Check size={18} />
            </div>

            <div className="flex flex-col">
              <p className="font-semibold text-gray-900 text-sm dark:text-gray-100">
                Copied to clipboard
              </p>
              <p className="text-gray-600 text-xs dark:text-gray-400">Ready to paste anywhere</p>
            </div>
          </output>
        ));

        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast.error("Failed to copy");
      }
    },
    [text]
  );

  return (
    <button
      aria-label={ariaLabel}
      className={cn(
        "group flex cursor-pointer items-center gap-1.5 transition-colors hover:text-blue-600 dark:hover:text-blue-400",
        className
      )}
      onClick={handleCopy}
      type="button"
    >
      {typeof children === "function" ? children({ copied }) : children || null}
      {showIcon ? (
        <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {copied ? (
            <Check className="text-green-500" size={14} />
          ) : (
            <Copy className="text-gray-400 group-hover:text-blue-500" size={14} />
          )}
        </span>
      ) : null}
    </button>
  );
}
