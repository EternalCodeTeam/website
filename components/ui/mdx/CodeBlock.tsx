"use client";

import { Check, Copy } from "lucide-react";
import { memo, type ReactNode, useRef } from "react";
import { CopyToClipboard } from "@/components/ui/CopyToClipboard";
import { cn } from "@/lib/utils";

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
  className?: string;
}

export const CodeBlock = memo(({ children, language: _language, className }: CodeBlockProps) => {
  const preRef = useRef<HTMLPreElement>(null);

  // Extract text content safely for the copy button
  const getTextToCopy = () => {
    if (!preRef.current) return "";
    const codeElement = preRef.current.querySelector("code");
    return codeElement ? codeElement.textContent || "" : preRef.current.innerText || "";
  };

  return (
    <div className="group relative my-6 overflow-hidden rounded-xl border border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/50">
      <div className="absolute top-3 right-3 z-10 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        <CopyToClipboard
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:bg-gray-50 hover:text-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100"
          showIcon={false}
          text={getTextToCopy()}
        >
          {({ copied }) =>
            copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />
          }
        </CopyToClipboard>
      </div>

      <pre
        className={cn(
          "overflow-x-auto p-4 font-mono text-gray-900 text-sm dark:text-gray-100",
          className
        )}
        ref={preRef}
      >
        {typeof children === "string" ? (
          <code className="whitespace-pre">{children}</code>
        ) : (
          children
        )}
      </pre>
    </div>
  );
});

CodeBlock.displayName = "CodeBlock";
