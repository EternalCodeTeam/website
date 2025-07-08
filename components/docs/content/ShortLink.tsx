"use client";

import { Copy, Check } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ShortLinkProps {
  path: string;
  sectionId?: string;
  className?: string;
}

export const ShortLink: React.FC<ShortLinkProps> = ({ path, sectionId, className }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const fullPath = sectionId ? `${path}#${sectionId}` : path;
    const shortLink = `${window.location.origin}${fullPath}`;

    try {
      await navigator.clipboard.writeText(shortLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        onClick={handleCopy}
        variant="secondary"
        size="xs"
        leftIcon={copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
        aria-label={copied ? "Link copied" : "Copy link"}
        className="text-xs"
      >
        {copied ? "Copied!" : "Copy link"}
      </Button>
    </div>
  );
};
