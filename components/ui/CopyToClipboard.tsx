"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

import { cn } from "@/lib/utils";

interface CopyToClipboardProps {
  text: string;
  className?: string;
  children?: React.ReactNode;
  showIcon?: boolean;
}

export function CopyToClipboard({
  text,
  className,
  children,
  showIcon = true,
}: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.custom((t) => (
        <div
          className={cn(
            "pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-2xl p-4 shadow-xl transition-all duration-300 backdrop-blur-md",
            "border border-white/10 bg-white/70 dark:bg-gray-900/90 dark:border-gray-800",
            "bg-gradient-to-br from-white/80 to-white/60 dark:from-gray-800/10 dark:to-gray-900/10",
            t.visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500/20 text-green-500 dark:text-green-400 dark:bg-green-400/15">
            <Check size={18} />
          </div>

          <div className="flex flex-col">
            <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Copied to clipboard
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">Ready to paste anywhere</p>
          </div>
        </div>
      ));

      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy} // handler signature change might be needed if strictly typed, but let's see. handleCopy expects MouseEvent. Button click is MouseEvent|KeyboardEvent in React? No, onClick is MouseEvent in React types usually, but generic SyntheticEvent. Actually, `onClick` on button passes `React.MouseEvent<HTMLButtonElement>`. `handleCopy` signature is `(e: React.MouseEvent)`. This is compatible.
      className={cn(
        "group flex cursor-pointer items-center gap-1.5 transition-colors hover:text-blue-600 dark:hover:text-blue-400",
        className
      )}
    >
      {children}
      {showIcon && (
        <span className="opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          {copied ? (
            <Check size={14} className="text-green-500" />
          ) : (
            <Copy size={14} className="text-gray-400 group-hover:text-blue-500" />
          )}
        </span>
      )}
    </button>
  );
}
