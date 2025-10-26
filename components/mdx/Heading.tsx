"use client";

import { Check, Link as LinkIcon } from "lucide-react";
import {
  createElement,
  type ElementType,
  type HTMLAttributes,
  type MouseEvent,
  useState,
} from "react";

import { cn } from "@/lib/utils";

interface HeadingProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  tag: ElementType;
}

export const Heading = ({ children, id, tag, className, ...props }: HeadingProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    (async () => {
      if (!id) return;
      try {
        await navigator.clipboard.writeText(
          `${window.location.origin}${window.location.pathname}#${id}`
        );
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      } catch (error) {
        console.error("Failed to copy link:", error);
      }
    })();
  };

  return createElement(
    tag,
    {
      id,
      className: cn("group relative scroll-mt-24 hover:cursor-pointer", className),
      ...props,
    },
    <span className="inline-flex items-center">
      {children}
      {id && (
        <button
          type="button"
          onClick={handleCopy}
          className="ml-2 inline-flex items-center gap-1 text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:opacity-100 dark:hover:text-gray-300"
        >
          {copied ? <Check className="h-4 w-4 text-green-500" /> : <LinkIcon className="h-4 w-4" />}
          {copied && <span className="text-xs text-green-500">Link copied!</span>}
        </button>
      )}
    </span>
  );
};
