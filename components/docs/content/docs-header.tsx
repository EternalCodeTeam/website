"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { DocIcon } from "./doc-icon";

interface DocHeaderProps {
  category?: string;
  title: string;
  description?: string;
  icon?: string;
  actions?: ReactNode;
}

export function DocsHeader({ category, title, description, icon, actions }: DocHeaderProps) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
      initial={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
    >
      <div className="mb-3 flex items-center justify-between gap-4">
        {!!category && (
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 font-semibold text-blue-700 text-xs uppercase tracking-wider dark:bg-blue-500/10 dark:text-blue-400"
            initial={{ opacity: 0, x: -10 }}
            transition={{ delay: 0.1 }}
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
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: 10 }}
            transition={{ delay: 0.2 }}
          >
            {actions}
          </motion.div>
        )}
      </div>

      <div className="flex items-start gap-4">
        {!!icon && (
          <motion.div
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
            transition={{ delay: 0.15, type: "spring", stiffness: 300, damping: 20 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <div className="rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 p-3 shadow-sm dark:from-blue-500/10 dark:to-blue-600/10">
              <DocIcon className="text-blue-600 dark:text-blue-400" iconName={icon} size={32} />
            </div>
          </motion.div>
        )}
        <div className="flex-1">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="mb-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text font-extrabold text-4xl text-transparent tracking-tight dark:from-white dark:via-gray-100 dark:to-white"
            initial={{ opacity: 0, y: 10 }}
            transition={{ delay: 0.2 }}
          >
            {title}
          </motion.h1>

          {!!description && (
            <motion.p
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-600 text-lg leading-relaxed dark:text-gray-400"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.25 }}
            >
              {description}
            </motion.p>
          )}
        </div>
      </div>
    </motion.div>
  );
}
