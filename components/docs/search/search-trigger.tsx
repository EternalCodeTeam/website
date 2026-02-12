"use client";

import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/utils";

interface SearchTriggerProps {
  onClick: () => void;
  className?: string;
}

export function SearchTrigger({ onClick, className }: SearchTriggerProps) {
  const [isMac, setIsMac] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  return (
    <motion.button
      aria-label="Search documentation (⌘K)"
      className={cn(
        "group touch-action-manipulation relative flex w-full items-center gap-3 overflow-hidden rounded-lg border border-gray-200 bg-white/50 px-4 py-2.5 text-left shadow-xs backdrop-blur-sm transition-[border-color,box-shadow,background-color,transform] hover:border-blue-300 hover:bg-white hover:shadow-md dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-blue-700 dark:hover:bg-gray-900",
        className
      )}
      onClick={onClick}
      type="button"
      whileHover={{ scale: prefersReducedMotion ? 1 : 1.01 }}
      whileTap={{ scale: prefersReducedMotion ? 1 : 0.99 }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/50 to-blue-50/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:from-blue-500/0 dark:via-blue-500/5 dark:to-blue-500/0" />

      {/* Search Icon */}
      <motion.div
        animate={{ scale: 1 }}
        className="relative z-10"
        whileHover={{ scale: prefersReducedMotion ? 1 : 1.1, rotate: prefersReducedMotion ? 0 : 5 }}
      >
        <Search className="h-4 w-4 text-gray-400 transition-colors group-hover:text-blue-500" />
      </motion.div>

      {/* Placeholder Text */}
      <span className="relative z-10 flex-1 cursor-pointer text-gray-500 text-sm dark:text-gray-400">
        Search…
      </span>

      {/* Keyboard Shortcut Hint */}
      <div className="relative z-10 flex items-center gap-1">
        <kbd
          className="hidden rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-gray-500 text-xs transition-colors group-hover:border-blue-300 group-hover:bg-blue-50 group-hover:text-blue-600 sm:inline-block dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:border-blue-700 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400"
          suppressHydrationWarning
        >
          {isMac ? "⌘" : "Ctrl"}
        </kbd>
        <kbd
          className="hidden rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-gray-500 text-xs transition-colors group-hover:border-blue-300 group-hover:bg-blue-50 group-hover:text-blue-600 sm:inline-block dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:group-hover:border-blue-700 dark:group-hover:bg-blue-900/30 dark:group-hover:text-blue-400"
          suppressHydrationWarning
        >
          K
        </kbd>
      </div>

      {/* Shine effect */}
      <motion.div
        animate={{
          x: ["-100%", "100%"],
        }}
        className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
        transition={{
          duration: prefersReducedMotion ? 0 : 1.5,
          repeat: Number.POSITIVE_INFINITY,
          repeatDelay: 3,
        }}
      />
    </motion.button>
  );
}
