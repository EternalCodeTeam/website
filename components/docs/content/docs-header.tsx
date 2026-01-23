"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import {
  rotateIn,
  slideDown,
  slideInLeft,
  slideInRight,
  slideUp,
  type MotionCustom,
} from "@/lib/animations/variants";
import { DocIcon } from "./doc-icon";

interface DocHeaderProps {
  category?: string;
  title: string;
  description?: string;
  icon?: string;
  actions?: ReactNode;
}

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Component logic involves multiple conditional renders
export function DocsHeader({ category, title, description, icon, actions }: DocHeaderProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="mb-6"
      custom={{ reduced: prefersReducedMotion, distance: 10 } satisfies MotionCustom}
      initial="hidden"
      variants={slideDown}
      animate="visible"
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        {!!category && (
          <motion.div
            className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700 text-xs uppercase tracking-wider dark:bg-blue-500/10 dark:text-blue-400"
            custom={{ reduced: prefersReducedMotion, distance: 10, delay: 0.1 } satisfies MotionCustom}
            initial="hidden"
            variants={slideInLeft}
            animate="visible"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-blue-500" />
            </span>
            {category}
          </motion.div>
        )}
        {!!actions && (
          <motion.div
            className="flex items-center gap-2"
            custom={{ reduced: prefersReducedMotion, distance: 10, delay: 0.2 } satisfies MotionCustom}
            initial="hidden"
            variants={slideInRight}
            animate="visible"
          >
            {actions}
          </motion.div>
        )}
      </div>

      <div className="flex items-start gap-4">
        {!!icon && (
          <motion.div
            custom={{ reduced: prefersReducedMotion, delay: 0.15 } satisfies MotionCustom}
            initial="hidden"
            variants={rotateIn}
            animate="visible"
            whileHover="hover"
          >
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-3 shadow-sm dark:from-blue-500/10 dark:to-blue-600/10">
              <DocIcon className="text-blue-600 dark:text-blue-400" iconName={icon} size={32} />
            </div>
          </motion.div>
        )}
        <div className="flex-1">
          <motion.h1
            className="mb-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text font-extrabold text-4xl text-transparent tracking-tight dark:from-white dark:via-gray-100 dark:to-white"
            custom={{ reduced: prefersReducedMotion, distance: 10, delay: 0.2 } satisfies MotionCustom}
            initial="hidden"
            variants={slideUp}
            animate="visible"
          >
            {title}
          </motion.h1>

          {!!description && (
            <motion.p
              className="text-gray-600 text-lg leading-relaxed dark:text-gray-400"
              custom={{ reduced: prefersReducedMotion, distance: 10, delay: 0.25 } satisfies MotionCustom}
              initial="hidden"
              variants={slideUp}
              animate="visible"
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
