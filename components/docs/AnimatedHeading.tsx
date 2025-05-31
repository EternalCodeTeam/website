"use client";

import React, { useState, useCallback, memo } from "react";
import { Check, Link as LinkIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, fadeDownScale } from "./DocHeader";

interface AnimatedHeadingProps extends React.HTMLAttributes<HTMLElement> {
  id?: string;
  children: React.ReactNode;
}

interface HeadingFactoryProps {
  tag: keyof JSX.IntrinsicElements;
}

const COPY_TIMEOUT = 1200;

const createAnimatedHeading = ({ tag }: HeadingFactoryProps) => {
  const AnimatedHeading = memo(
    ({ children, id, className = "", ...props }: AnimatedHeadingProps) => {
      const [copied, setCopied] = useState(false);

      const handleCopy = useCallback(
        async (e: React.MouseEvent) => {
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
            console.error("Failed to copy link:", error);
          }
        },
        [id]
      );

      return React.createElement(
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
            <motion.div 
              className="ml-2 inline-flex items-center gap-1"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 20,
                delay: 0.1
              }}
            >
              <motion.button
                onClick={handleCopy}
                className="inline-flex select-none items-center text-base text-gray-400 opacity-0 transition-opacity hover:text-gray-600 group-hover:opacity-100 dark:hover:text-gray-300"
                aria-label="Copy link to heading"
                title="Copy link to heading"
                whileHover={{ scale: 1.13 }}
                whileTap={{ scale: 0.93 }}
                transition={{ type: "spring", stiffness: 400, damping: 10, delay: 0.08 }}
              >
                {copied ? (
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 10 }}
                  >
                    <Check className="h-4 w-4 text-green-500" />
                  </motion.div>
                ) : (
                  <LinkIcon className="h-4 w-4" />
                )}
              </motion.button>
              <AnimatePresence>
                {copied && (
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="text-xs text-green-500"
                    role="status"
                    aria-live="polite"
                  >
                    Link copied!
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.span>
      );
    }
  );

  AnimatedHeading.displayName = `AnimatedHeading(${tag})`;
  return AnimatedHeading;
};

export const H1 = createAnimatedHeading({ tag: "h1" });
export const H2 = createAnimatedHeading({ tag: "h2" });
export const H3 = createAnimatedHeading({ tag: "h3" });
export const H4 = createAnimatedHeading({ tag: "h4" });
export const H5 = createAnimatedHeading({ tag: "h5" });
export const H6 = createAnimatedHeading({ tag: "h6" });
