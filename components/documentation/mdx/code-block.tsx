"use client";

import { Check, Copy } from "lucide-react";
import { type ComponentPropsWithoutRef, useEffect, useRef, useState } from "react";

const COPY_RESET_DELAY_MS = 2000;

function copyUsingSelection(code: string) {
  const textarea = document.createElement("textarea");
  textarea.value = code;
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  textarea.style.pointerEvents = "none";
  document.body.append(textarea);
  textarea.select();

  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

async function writeToClipboard(code: string) {
  if (!navigator.clipboard) {
    return copyUsingSelection(code);
  }

  try {
    await navigator.clipboard.writeText(code);
    return true;
  } catch {
    return copyUsingSelection(code);
  }
}

export function CodeBlock({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  const codeElementRef = useRef<HTMLPreElement>(null);
  const resetTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  async function copyCode() {
    const code = codeElementRef.current?.textContent;

    if (!code) {
      return;
    }

    const copiedSuccessfully = await writeToClipboard(code);
    setCopied(copiedSuccessfully);

    if (!copiedSuccessfully) {
      return;
    }

    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = setTimeout(() => setCopied(false), COPY_RESET_DELAY_MS);
  }

  return (
    <div className="docs-code-block" data-docs-code-block="true">
      <pre {...props} ref={codeElementRef}>
        {children}
      </pre>
      <button
        aria-label={copied ? "Code copied" : "Copy code"}
        className="docs-code-copy"
        data-copied={copied}
        onClick={copyCode}
        type="button"
      >
        {copied ? <Check aria-hidden="true" /> : <Copy aria-hidden="true" />}
        <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
      </button>
    </div>
  );
}
