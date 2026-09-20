"use client";

import { Check, Copy, Github } from "lucide-react";
import { useState } from "react";

export function ArticleActions({ editUrl }: { readonly editUrl: string }) {
  const [copied, setCopied] = useState(false);

  async function copyPageUrl() {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="docs-article-actions">
      <button onClick={copyPageUrl} type="button">
        {copied ? <Check aria-hidden="true" size={15} /> : <Copy aria-hidden="true" size={15} />}
        {copied ? "Copied" : "Copy page"}
      </button>
      <a href={editUrl} rel="noreferrer" target="_blank">
        <Github aria-hidden="true" size={15} /> Edit on GitHub
      </a>
    </div>
  );
}
