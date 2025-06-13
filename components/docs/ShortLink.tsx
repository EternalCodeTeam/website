"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
  const timeoutRef = useRef<NodeJS.Timeout>();

  const generateShortLink = useCallback(() => {
    const baseUrl = window.location.origin;
    const fullPath = sectionId ? `${path}#${sectionId}` : path;
    return `${baseUrl}${fullPath}`;
  }, [path, sectionId]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const shortLink = generateShortLink();

    try {
      await navigator.clipboard.writeText(shortLink);
      setCopied(true);
      timeoutRef.current = setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <Button
        onClick={handleCopy}
        disabled={isLoading}
        variant="secondary"
        size="xs"
        isLoading={isLoading}
        leftIcon={copied ? <Check className="h-3 w-3" aria-hidden="true" /> : <Copy className="h-3 w-3" aria-hidden="true" />}
        aria-label={copied ? "Link copied" : "Copy link"}
        className="text-xs"
      >
        {copied ? "Copied!" : "Copy link"}
      </Button>
    </div>
  );
};
