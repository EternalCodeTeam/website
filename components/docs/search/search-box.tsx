"use client";

import { AnimatePresence, motion, type Transition, type Variants } from "framer-motion";
import { Search, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useSearch } from "@/hooks/use-search";
import { cn } from "@/lib/utils";

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
  minQueryLength?: number;
}

const SearchBox = ({
  className = "",
  placeholder = "Search...",
  minQueryLength = 2,
  // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Search box logic is inherently complex
}: SearchBoxProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMac, setIsMac] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const resultsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { staggerChildren: 0.04, delayChildren: 0.02 },
    },
    exit: { opacity: 0, transition: { duration: prefersReducedMotion ? 0 : 0.12 } },
  };

  const resultItemTransition: Transition = prefersReducedMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 360, damping: 28, mass: 0.7 };

  const resultItemVariants: Variants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: resultItemTransition,
    },
    exit: {
      opacity: 0,
      y: -6,
      scale: 0.98,
      transition: { duration: prefersReducedMotion ? 0 : 0.12 },
    },
  };

  // Use shared search hook
  const { query, setQuery, results, isLoading } = useSearch({
    minQueryLength,
    maxResults: 8,
  });

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  // Global keyboard shortcut
  const handleGlobalKeyDown = useCallback((e: globalThis.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      inputRef.current?.focus();
      setIsOpen(true);
      setIsFocused(true);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => document.removeEventListener("keydown", handleGlobalKeyDown);
  }, [handleGlobalKeyDown]);

  useClickOutside(searchRef, () => {
    setIsOpen(false);
    setIsFocused(false);
  });

  const handleSelect = useCallback(
    (path: string) => {
      router.push(path);
      setQuery("");
      setIsOpen(false);
      setIsFocused(false);
      inputRef.current?.blur();
    },
    [router, setQuery]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsFocused(false);
        inputRef.current?.blur();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          results.length > 0 ? Math.min(prev + 1, results.length - 1) : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        handleSelect(results[selectedIndex].path);
      }
    },
    [results, selectedIndex, handleSelect]
  );

  const clearSearch = () => {
    setQuery("");
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative w-full", className)} ref={searchRef}>
      <div className="relative">
        <div className="relative">
          <input
            aria-label="Search documentation"
            autoComplete="off"
            className={cn(
              "w-full cursor-pointer select-none rounded-lg border bg-gray-50/50 px-4 py-2.5 pr-10 pl-10 text-sm outline-hidden transition-all duration-200",
              isFocused || isOpen
                ? "border-blue-500 bg-white shadow-blue-500/10 shadow-lg ring-2 ring-blue-500/10 dark:bg-gray-800 dark:shadow-blue-500/20"
                : "border-gray-200 shadow-xs hover:border-gray-300 hover:bg-white dark:border-gray-800 dark:bg-gray-900/50 dark:hover:border-gray-700 dark:hover:bg-gray-900",
              "placeholder:text-gray-500 dark:text-white dark:placeholder:text-gray-500"
            )}
            onBlur={() => setIsFocused(false)}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(0);
            }}
            onFocus={() => {
              setIsOpen(true);
              setIsFocused(true);
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            ref={inputRef}
            spellCheck={false}
            type="text"
            value={query}
          />

          <motion.div
            animate={{
              rotate: isLoading ? 360 : 0,
              scale: isFocused || isOpen ? 1.1 : 1,
            }}
            className="pointer-events-none absolute top-2.5 left-3"
            style={{ transformOrigin: "center" }}
            transition={{
              rotate: {
                duration: 1,
                repeat: isLoading ? Number.POSITIVE_INFINITY : 0,
                ease: "linear",
              },
              scale: { duration: prefersReducedMotion ? 0 : 0.2 },
            }}
          >
            <Search
              className={cn(
                "h-5 w-5 transition-colors duration-200",
                isFocused || isOpen ? "text-blue-500" : "text-gray-400"
              )}
            />
          </motion.div>

          <AnimatePresence>
            {!(isFocused || query) && (
              <motion.div
                animate={{ opacity: 1 }}
                className="pointer-events-none absolute top-2.5 right-3 flex items-center gap-1"
                exit={{ opacity: 0 }}
                initial={{ opacity: 0 }}
              >
                <kbd
                  className="hidden rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-gray-500 text-xs sm:inline-block dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  suppressHydrationWarning
                >
                  {isMac ? "⌘" : "Ctrl"}
                </kbd>
                <kbd
                  className="hidden rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-gray-500 text-xs sm:inline-block dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                  suppressHydrationWarning
                >
                  K
                </kbd>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!!query && (
              <motion.button
                animate={{ opacity: 1, scale: 1 }}
                aria-label="Clear search"
                className="touch-action-manipulation absolute top-2.5 right-3 rounded-full p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700"
                exit={{ opacity: 0, scale: 0.8 }}
                initial={{ opacity: 0, scale: 0.8 }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  clearSearch();
                }}
                type="button"
                whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
              >
                <X className="h-4 w-4 text-gray-400" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Loading indicator */}
        <AnimatePresence>
          {!!isLoading && (
            <motion.div
              animate={{ scaleX: 1 }}
              className="absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-full bg-linear-to-r from-blue-500 to-purple-500"
              exit={{ scaleX: 0 }}
              initial={{ scaleX: 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {!!isOpen && query.length >= minQueryLength && (
          <motion.div
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white/90 shadow-2xl backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/90"
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              type: prefersReducedMotion ? "tween" : "spring",
              stiffness: 400,
              damping: 25,
            }}
          >
            {results.length > 0 ? (
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  animate="visible"
                  className="scrollbar-hide max-h-96 overflow-y-auto"
                  exit="exit"
                  initial="hidden"
                  key={`results-${query}`}
                  layout
                  variants={resultsContainerVariants}
                >
                  {/* biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Search result rendering is complex */}
                  {results.map((result, index) => (
                    <motion.button
                      className={cn(
                        "touch-action-manipulation w-full select-none px-4 py-3 text-left transition-all",
                        selectedIndex === index
                          ? "bg-blue-50 dark:bg-blue-500/10"
                          : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                      )}
                      key={result.path}
                      layout="position"
                      onClick={() => handleSelect(result.path)}
                      onMouseDown={(e) => {
                        e.preventDefault(); // Prevent blur before click
                      }}
                      onMouseEnter={() => setSelectedIndex(index)}
                      type="button"
                      variants={resultItemVariants}
                      whileHover={{
                        x: prefersReducedMotion ? 0 : 2,
                        scale: prefersReducedMotion ? 1 : 1.01,
                      }}
                    >
                      <div className="flex items-start gap-3">
                        <motion.div
                          animate={{
                            rotate: selectedIndex === index ? [0, -8, 8, 0] : 0,
                          }}
                          className={cn(
                            "mt-0.5 shrink-0",
                            selectedIndex === index
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-gray-400"
                          )}
                          transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
                        >
                          <Sparkles className="h-4 w-4" />
                        </motion.div>
                        <div className="min-w-0 flex-1">
                          <div className="truncate font-semibold text-gray-900 dark:text-white">
                            {result.title}
                          </div>
                          <div className="mt-0.5 line-clamp-2 text-gray-500 text-xs dark:text-gray-400">
                            {result.excerpt}
                          </div>
                        </div>
                        <AnimatePresence initial={false}>
                          {selectedIndex === index && (
                            <motion.div
                              animate={{ opacity: 1, scale: 1 }}
                              className="shrink-0 rounded-sm bg-blue-100 px-2 py-0.5 font-medium text-blue-700 text-xs dark:bg-blue-900/30 dark:text-blue-300"
                              exit={{ opacity: 0, scale: 0.9 }}
                              initial={{ opacity: 0, scale: 0.9 }}
                              transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                            >
                              Enter
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </motion.button>
                  ))}
                </motion.div>
              </AnimatePresence>
            ) : (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 py-8 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                transition={{
                  type: prefersReducedMotion ? "tween" : "spring",
                  stiffness: 300,
                  damping: 25,
                }}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
                  transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
                >
                  <Search className="h-6 w-6 text-gray-400" />
                </motion.div>
                <p className="font-semibold text-gray-900 text-sm dark:text-gray-100">
                  No results found
                </p>
                <p className="mt-1 text-gray-500 text-xs dark:text-gray-400">
                  Try different keywords or check your spelling
                </p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBox;
