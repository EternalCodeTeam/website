"use client";

import React, { useState, useCallback } from "react";
import { Link, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShortLinkProps {
  path: string;
  sectionId?: string;
  className?: string;
}

export const ShortLink: React.FC<ShortLinkProps> = ({
  path,
  sectionId,
  className,
}) => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateShortLink = useCallback(() => {
    const baseUrl = window.location.origin;
    const fullPath = sectionId ? `${path}#${sectionId}` : path;
    return `${baseUrl}${fullPath}`;
  }, [path, sectionId]);

  const handleCopy = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const shortLink = generateShortLink();

    try {
      await navigator.clipboard.writeText(shortLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Link className="h-4 w-4 text-gray-400" aria-hidden="true" />
      <button
        onClick={handleCopy}
        disabled={isLoading}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={cn(
          "flex items-center space-x-1 rounded-md px-2 py-1 text-xs font-medium transition-colors",
          "bg-gray-100 text-gray-600 hover:bg-gray-200",
          "dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
          "dark:focus:ring-gray-400"
        )}
      >
        {isLoading ? (
          <div className="h-3 w-3 animate-spin rounded-full border-2 border-gray-600 border-t-transparent" />
        ) : copied ? (
          <>
            <Check className="h-3 w-3" aria-hidden="true" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="h-3 w-3" aria-hidden="true" />
            <span>Copy link</span>
          </>
        )}
      </button>
    </div>
  );
};
