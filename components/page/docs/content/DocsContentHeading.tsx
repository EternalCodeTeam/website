"use client";

import { motion } from "framer-motion";
import { Check, Link as LinkIcon } from "lucide-react";
import React, { createElement, HTMLAttributes, useState } from "react";

import { fadeDownScale } from "./DocsHeader";

interface AnimatedHeadingProps extends HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
}

interface HeadingFactoryProps {
  tag: React.ElementType;
}

const createAnimatedHeading = ({ tag }: HeadingFactoryProps) => {
  const AnimatedHeading = ({ children, id, className = "", ...props }: AnimatedHeadingProps) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e: React.MouseEvent) => {
      e.preventDefault();
      if (!id) return;

      const url = `${window.location.origin}${window.location.pathname}#${id}`;

      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      } catch (error) {
        console.error("Failed to copy link:", error);
      }
    };

    return createElement(
      tag,
      {
        id,
        className: `group relative hover:cursor-pointer scroll-mt-24 ${className}`,
        style: { textDecoration: "none" },
        ...props,
      },
      <motion.span
        className="inline-flex items-center"
        variants={fadeDownScale}
        initial="hidden"
        animate="visible"
      >
        {children}
        {id && (
          <div className="ml-2 inline-flex items-center gap-1">
            <button
              onClick={handleCopy}
              className="inline-flex select-none items-center text-base text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:opacity-100 dark:hover:text-gray-300"
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
              <span className="text-xs text-green-500" role="status" aria-live="polite">
                Link copied!
              </span>
            )}
          </div>
        )}
      </motion.span>
    );
  };

  AnimatedHeading.displayName = `AnimatedHeading(${String(tag)})`;
  return AnimatedHeading;
};

export const H1 = createAnimatedHeading({ tag: "h1" });
H1.displayName = "H1";

export const H2 = createAnimatedHeading({ tag: "h2" });
H2.displayName = "H2";

export const H3 = createAnimatedHeading({ tag: "h3" });
H3.displayName = "H3";

export const H4 = createAnimatedHeading({ tag: "h4" });
H4.displayName = "H4";

export const H5 = createAnimatedHeading({ tag: "h5" });
H5.displayName = "H5";

export const H6 = createAnimatedHeading({ tag: "h6" });
H6.displayName = "H6";
