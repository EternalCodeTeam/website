"use client";

import React, { useState, useCallback, memo } from "react";
import { Check, Link as LinkIcon } from "lucide-react";

interface AnimatedHeadingProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
}

interface HeadingFactoryProps {
  tag: keyof JSX.IntrinsicElements;
}

const COPY_TIMEOUT = 1200;

const createAnimatedHeading = ({ tag }: HeadingFactoryProps) => {
  const AnimatedHeading = memo(({ 
    children, 
    id, 
    className = "",
    ...props 
  }: AnimatedHeadingProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = useCallback(async (e: React.MouseEvent) => {
      e.preventDefault();
      
      if (!id) return;

      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      
      try {
        await navigator.clipboard.writeText(url);
        window.location.hash = id;
        setCopied(true);
        
        const timeoutId = setTimeout(() => {
          setCopied(false);
        }, COPY_TIMEOUT);

        return () => clearTimeout(timeoutId);
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }, [id]);

    return React.createElement(
      tag,
      {
        id,
        className: `group relative hover:cursor-pointer scroll-mt-24 ${className}`,
        style: { textDecoration: "none" },
        ...props,
      },
      <span className="inline-flex items-center">
        {children}
        {id && (
          <div className="ml-2 inline-flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="inline-flex select-none items-center text-base text-gray-400 opacity-0 transition-opacity hover:text-gray-600 dark:hover:text-gray-300 group-hover:opacity-100"
              aria-label="Copy link to heading"
              title="Copy link to heading"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-500" />
              ) : (
                <LinkIcon className="h-4 w-4" />
              )}
            </button>
            {copied && (
              <span 
                className="animate-fade-in text-xs text-green-500"
                role="status"
                aria-live="polite"
              >
                Link copied!
              </span>
            )}
          </div>
        )}
      </span>
    );
  });

  AnimatedHeading.displayName = `AnimatedHeading(${tag})`;
  return AnimatedHeading;
};

export const H1 = createAnimatedHeading({ tag: "h1" });
export const H2 = createAnimatedHeading({ tag: "h2" });
export const H3 = createAnimatedHeading({ tag: "h3" });
export const H4 = createAnimatedHeading({ tag: "h4" });
export const H5 = createAnimatedHeading({ tag: "h5" });
export const H6 = createAnimatedHeading({ tag: "h6" });