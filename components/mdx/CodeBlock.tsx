"use client";

import { Check, Copy } from "lucide-react";
import { memo, type ReactNode, useRef, useState } from "react";

interface CodeBlockProps {
  children: ReactNode;
  language?: string;
  className?: string;
}

export const CodeBlock = memo(({ children, language: _language, className }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const preRef = useRef<HTMLPreElement>(null);

  const copyToClipboard = async () => {
    if (!preRef.current) return;
    try {
      const codeElement = preRef.current.querySelector("code");
      const textToCopy = codeElement ? codeElement.textContent : preRef.current.innerText;
      await navigator.clipboard.writeText(textToCopy || "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {
      // silently ignore
    }
  };

  return (
    <pre
      ref={preRef}
      className={`relative my-4 overflow-x-auto rounded-lg bg-gray-900 p-4 font-mono text-sm text-neutral-200 ${className ?? ""}`}
    >
      <button
        type="button"
        onClick={copyToClipboard}
        aria-label="Copy code to clipboard"
        className="absolute right-4 top-3 z-10 flex items-center gap-1 rounded-md border border-gray-700 bg-gray-800 px-3 py-1 text-xs font-medium text-gray-300 opacity-70 transition hover:bg-gray-900 hover:text-white hover:opacity-100"
      >
        {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
        <span>{copied ? "Copied!" : "Copy"}</span>
      </button>

      {typeof children === "string" ? <code className="whitespace-pre">{children}</code> : children}
    </pre>
  );
});

CodeBlock.displayName = "CodeBlock";
