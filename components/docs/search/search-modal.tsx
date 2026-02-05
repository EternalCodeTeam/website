"use client";

import FocusTrap from "focus-trap-react";
import type { Transition, Variants } from "framer-motion";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Clock, Hash, Search, Sparkles, TrendingUp, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { SearchResultSkeleton } from "@/components/ui/skeleton";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useRecentSearches } from "@/hooks/use-recent-searches";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useSearch } from "@/hooks/use-search";
import { useSpotlight } from "@/hooks/use-spotlight";
import { cn } from "@/lib/utils";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement>;
}

const POPULAR_PAGES = [
  { title: "Getting Started", path: "/docs/eternalcore", category: "EternalCore" },
  {
    title: "Commands & Permissions",
    path: "/docs/eternalcore/commands-and-permissions",
    category: "EternalCore",
  },
  { title: "Placeholders", path: "/docs/eternalcore/placeholders", category: "EternalCore" },
  { title: "Contributing", path: "/docs/contribute", category: "Contribute" },
];

const CATEGORY_BADGE_STYLES: Record<string, string> = {
  EternalCore:
    "bg-purple-100 text-purple-700 ring-purple-200 dark:bg-purple-500/20 dark:text-purple-200 dark:ring-purple-500/40",
  EternalCombat:
    "bg-red-100 text-red-700 ring-red-200 dark:bg-red-500/20 dark:text-red-200 dark:ring-red-500/40",
  Multification:
    "bg-blue-100 text-blue-700 ring-blue-200 dark:bg-blue-500/20 dark:text-blue-200 dark:ring-blue-500/40",
  Contribute:
    "bg-emerald-100 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/20 dark:text-emerald-200 dark:ring-emerald-500/40",
};

const DOCS_PREFIX_REGEX = /^\/docs\//;

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: Modal logic handles many interactions
export function SearchModal({ isOpen, onClose, triggerRef }: SearchModalProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [_isMac, setIsMac] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const spotlight = useSpotlight<HTMLDivElement>();
  const router = useRouter();
  const prefersReducedMotion = useReducedMotion();

  const resultsContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: prefersReducedMotion
        ? { duration: 0 }
        : { staggerChildren: 0.04, delayChildren: 0.02 },
    },
    exit: { opacity: 0, transition: { duration: prefersReducedMotion ? 0 : 0.12 } },
  } satisfies Variants;

  const springResultTransition: Transition = {
    type: "spring",
    stiffness: 360,
    damping: 28,
    mass: 0.7,
  };

  const resultItemVariants = {
    hidden: { opacity: 0, y: 8, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReducedMotion ? { duration: 0 } : springResultTransition,
    },
    exit: {
      opacity: 0,
      y: -6,
      scale: 0.98,
      transition: { duration: prefersReducedMotion ? 0 : 0.12 },
    },
  } satisfies Variants;

  // Use shared hooks
  const { query, setQuery, results, isLoading, isInitializing } = useSearch({ maxResults: 10 });
  const { recentSearches, addRecentSearch, clearRecentSearches } = useRecentSearches();

  // Mount check and platform detection
  useEffect(() => {
    setIsMounted(true);
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen, setQuery]);

  const handleClose = useCallback(() => {
    if (isOpen) {
      onClose();
      // Return focus to trigger element
      setTimeout(() => {
        triggerRef?.current?.focus();
      }, 100);
    }
  }, [isOpen, onClose, triggerRef]);

  useClickOutside(modalRef, handleClose);

  const handleSelect = useCallback(
    (path: string) => {
      if (query) {
        addRecentSearch(query);
      }
      router.push(path);
      onClose();
    },
    [router, onClose, query, addRecentSearch]
  );

  const handleRecentSearchClick = useCallback(
    (search: string) => {
      setQuery(search);
      inputRef.current?.focus();
    },
    [setQuery]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        handleClose();
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
    [results, selectedIndex, handleSelect, handleClose]
  );

  // Reset selected index when results change
  useEffect(() => {
    setSelectedIndex(0);
    if (results.length === 0) {
      return;
    }
  }, [results.length]);

  // Scroll selected item into view
  useEffect(() => {
    const element = document.querySelector(`[data-search-result-index="${selectedIndex}"]`);
    element?.scrollIntoView({
      block: "nearest",
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, [selectedIndex, prefersReducedMotion]);

  const highlightText = (text: string, highlight: string) => {
    if (!highlight.trim()) {
      return text;
    }

    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, i) =>
      part.toLowerCase() === highlight.toLowerCase() ? (
        <mark
          className="bg-blue-100 text-blue-900 dark:bg-blue-900/30 dark:text-blue-300"
          key={`highlight-${i}-${part}`}
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  const formatResultPath = (path: string) => {
    const trimmed = path.replace(DOCS_PREFIX_REGEX, "");
    const segments = trimmed.split("/").filter(Boolean);
    if (segments.length <= 1) {
      return "Overview";
    }

    return segments
      .slice(1)
      .map((segment) =>
        segment
          .split("-")
          .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
          .join(" ")
      )
      .join(" / ");
  };

  if (!isMounted) {
    return null;
  }

  const showResults = query.length >= 2 && results.length > 0;
  const showEmpty = query.length >= 2 && results.length === 0 && !isLoading;
  const showRecent = query.length === 0 && recentSearches.length > 0;
  const showPopular = query.length === 0;
  let searchIconScale: number | number[] = 1;
  if (isLoading) {
    searchIconScale = [1, 1.05, 1];
  } else if (query) {
    searchIconScale = 1.05;
  }

  return createPortal(
    <AnimatePresence mode="wait">
      {isOpen && (
        <FocusTrap>
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto overscroll-contain bg-black/70 p-0 pt-0 backdrop-blur-md md:p-4 md:pt-[10vh] md:backdrop-blur-sm"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
          >
            <motion.div
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative h-full w-full md:h-auto md:max-w-2xl"
              exit={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.95,
                y: prefersReducedMotion ? 0 : -20,
              }}
              initial={{
                opacity: 0,
                scale: prefersReducedMotion ? 1 : 0.95,
                y: prefersReducedMotion ? 0 : -20,
              }}
              ref={modalRef}
              transition={{
                type: prefersReducedMotion ? "tween" : "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              {/* Modal Container with Enhanced Glassmorphism */}
              <div
                className="spotlight-card relative flex h-full flex-col overflow-hidden rounded-none border-0 bg-white/98 shadow-2xl backdrop-blur-2xl md:h-auto md:rounded-2xl md:border md:border-gray-200/60 dark:bg-gray-900/98 dark:md:border-gray-700/60"
                onPointerLeave={spotlight.onPointerLeave}
                onPointerMove={spotlight.onPointerMove}
              >
                {/* Search Input Section with Enhanced Gradient */}
                <div className="relative border-gray-200 border-b bg-gradient-to-r from-gray-50/80 to-white/80 dark:border-gray-700 dark:from-gray-800/80 dark:to-gray-900/80">
                  <div className="flex items-center gap-3 px-5 py-4">
                    {/* Search Icon with Animation */}
                    <motion.div
                      animate={{
                        opacity: isLoading ? [0.5, 1, 0.5] : 1,
                        scale: searchIconScale,
                      }}
                      style={{ transformOrigin: "center" }}
                      transition={{
                        opacity: {
                          duration: prefersReducedMotion ? 0 : 1.1,
                          repeat: isLoading ? Number.POSITIVE_INFINITY : 0,
                          ease: "easeInOut",
                        },
                        scale: { duration: prefersReducedMotion ? 0 : 0.25 },
                      }}
                    >
                      <Search className="h-5 w-5 shrink-0 text-blue-500" />
                    </motion.div>

                    {/* Input */}
                    <input
                      aria-label="Search documentation"
                      autoComplete="off"
                      className="flex-1 bg-transparent font-medium text-gray-900 text-lg outline-hidden placeholder:text-gray-400 dark:text-white dark:placeholder:text-gray-500"
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Search…"
                      ref={inputRef}
                      spellCheck={false}
                      type="text"
                      value={query}
                    />

                    {/* Keyboard Hint */}
                    <div className="flex items-center gap-1.5">
                      {query && (
                        <motion.button
                          animate={{ opacity: 1, scale: 1 }}
                          aria-label="Clear search"
                          className="touch-action-manipulation rounded-lg p-1.5 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                          exit={{ opacity: 0, scale: 0.8 }}
                          initial={{ opacity: 0, scale: 0.8 }}
                          onClick={() => setQuery("")}
                          type="button"
                          whileHover={{ scale: prefersReducedMotion ? 1 : 1.1 }}
                          whileTap={{ scale: prefersReducedMotion ? 1 : 0.9 }}
                        >
                          <X className="h-4 w-4 text-gray-400" />
                        </motion.button>
                      )}
                      <kbd
                        className="hidden rounded-md border border-gray-300 bg-gray-100 px-2 py-1 font-mono text-gray-600 text-xs sm:inline-block dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        suppressHydrationWarning
                      >
                        ESC
                      </kbd>
                    </div>
                  </div>

                  {/* Loading Bar */}
                  <AnimatePresence>
                    {isLoading && (
                      <motion.div
                        animate={{ scaleX: 1 }}
                        className="absolute bottom-0 left-0 h-0.5 w-full origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                        exit={{ scaleX: 0 }}
                        initial={{ scaleX: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Results Section */}
                <div className="scrollbar-hide flex-1 overflow-y-auto md:max-h-[60vh]">
                  {/* ARIA Live Region */}
                  <output aria-live="polite" className="sr-only">
                    {query && results.length > 0 && `${results.length} results found for ${query}`}
                    {query && results.length === 0 && !isLoading && "No results found"}
                  </output>

                  {/* Initialization Loading State */}
                  {isInitializing && <SearchResultSkeleton />}

                  {/* Search Loading State */}
                  {!isInitializing && isLoading && query.length >= 2 && <SearchResultSkeleton />}

                  {/* Search Results */}
                  {showResults && !isLoading && !isInitializing && (
                    <AnimatePresence initial={false} mode="popLayout">
                      <motion.div
                        animate="visible"
                        className="p-2"
                        exit="exit"
                        initial="hidden"
                        key={`results-${query}`}
                        layout
                        variants={resultsContainerVariants}
                      >
                        <div className="mb-2 flex items-center gap-2 px-3 py-1">
                          <Sparkles className="h-3.5 w-3.5 text-gray-400" />
                          <span className="font-medium text-gray-500 text-xs uppercase tracking-wider dark:text-gray-400">
                            Results
                          </span>
                        </div>
                        {results.map((result, index) => (
                          <motion.button
                            className={cn(
                              "group touch-action-manipulation relative w-full cursor-pointer rounded-lg px-3 py-3 text-left transition-all",
                              selectedIndex === index
                                ? "bg-gradient-to-r from-blue-50 to-blue-50/50 shadow-sm dark:from-blue-500/10 dark:to-blue-500/5"
                                : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                            )}
                            data-search-result-index={index}
                            key={result.path}
                            layout="position"
                            onClick={() => handleSelect(result.path)}
                            onMouseEnter={() => setSelectedIndex(index)}
                            type="button"
                            variants={resultItemVariants}
                            whileHover={{
                              x: prefersReducedMotion ? 0 : 2,
                              scale: prefersReducedMotion ? 1 : 1.01,
                            }}
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  "mt-0.5 shrink-0 transition-colors",
                                  selectedIndex === index
                                    ? "text-blue-600 dark:text-blue-400"
                                    : "text-gray-400"
                                )}
                              >
                                <Hash className="h-4 w-4" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                                  <div className="font-semibold text-gray-900 text-sm dark:text-white">
                                    {highlightText(result.title, query)}
                                  </div>
                                  <span
                                    className={cn(
                                      "inline-flex items-center rounded-full px-2 py-0.5 font-semibold text-[10px] uppercase tracking-wide ring-1 ring-inset",
                                      CATEGORY_BADGE_STYLES[result.category] ??
                                        "bg-gray-100 text-gray-600 ring-gray-200 dark:bg-gray-700/60 dark:text-gray-200 dark:ring-gray-600"
                                    )}
                                  >
                                    {result.category}
                                  </span>
                                </div>
                                <div className="mb-1 text-gray-500 text-xs dark:text-gray-400">
                                  {formatResultPath(result.path)}
                                </div>
                                <div className="line-clamp-2 text-gray-600 text-xs dark:text-gray-400">
                                  {highlightText(result.excerpt, query)}
                                </div>
                              </div>
                              <AnimatePresence initial={false}>
                                {selectedIndex === index && (
                                  <motion.div
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="shrink-0"
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: prefersReducedMotion ? 0 : 0.15 }}
                                  >
                                    <ArrowRight className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </motion.button>
                        ))}
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* Empty State */}
                  {showEmpty && (
                    <motion.div
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-4 py-12 text-center"
                      initial={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, -10, 10, 0] }}
                        className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
                        transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: 0.1 }}
                      >
                        <Search className="h-7 w-7 text-gray-400" />
                      </motion.div>
                      <p className="mb-1 font-semibold text-gray-900 dark:text-gray-100">
                        No results found
                      </p>
                      <p className="text-gray-500 text-sm dark:text-gray-400">
                        Try different keywords or check your spelling
                      </p>
                    </motion.div>
                  )}

                  {/* Recent Searches */}
                  {showRecent && (
                    <div className="border-gray-200 border-b p-2 dark:border-gray-700">
                      <div className="mb-2 flex items-center justify-between px-3 py-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-3.5 w-3.5 text-gray-400" />
                          <span className="font-medium text-gray-500 text-xs uppercase tracking-wider dark:text-gray-400">
                            Recent
                          </span>
                        </div>
                        <button
                          className="touch-action-manipulation cursor-pointer text-gray-400 text-xs transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                          onClick={clearRecentSearches}
                          type="button"
                        >
                          Clear
                        </button>
                      </div>
                      {recentSearches.map((search, index) => (
                        <motion.button
                          animate={{ opacity: 1, x: 0 }}
                          className="touch-action-manipulation w-full cursor-pointer rounded-lg px-3 py-2 text-left text-gray-700 text-sm transition-colors hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800/50"
                          initial={{ opacity: 0, x: -20 }}
                          key={search}
                          onClick={() => handleRecentSearchClick(search)}
                          transition={{
                            delay: prefersReducedMotion ? 0 : index * 0.05,
                          }}
                          type="button"
                        >
                          {search}
                        </motion.button>
                      ))}
                    </div>
                  )}

                  {/* Popular Pages */}
                  {showPopular && (
                    <div className="p-2">
                      <div className="mb-2 flex items-center gap-2 px-3 py-1">
                        <TrendingUp className="h-3.5 w-3.5 text-gray-400" />
                        <span className="font-medium text-gray-500 text-xs uppercase tracking-wider dark:text-gray-400">
                          Popular
                        </span>
                      </div>
                      {POPULAR_PAGES.map((page, index) => (
                        <motion.button
                          animate={{ opacity: 1, x: 0 }}
                          className="group touch-action-manipulation w-full cursor-pointer rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
                          initial={{ opacity: 0, x: -20 }}
                          key={page.path}
                          onClick={() => handleSelect(page.path)}
                          transition={{
                            delay: prefersReducedMotion ? 0 : index * 0.05,
                          }}
                          type="button"
                          whileHover={{ x: prefersReducedMotion ? 0 : 4 }}
                        >
                          <div className="mb-1 font-medium text-gray-900 text-sm dark:text-white">
                            {page.title}
                          </div>
                          <div className="text-gray-500 text-xs dark:text-gray-400">
                            {page.category}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-gray-200 border-t bg-gray-50/50 px-4 py-3 dark:border-gray-700 dark:bg-gray-800/50">
                  <div className="flex items-center gap-4 text-gray-500 text-xs dark:text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <kbd className="rounded border border-gray-300 bg-white px-1.5 py-0.5 font-mono dark:border-gray-700 dark:bg-gray-900">
                        ↑↓
                      </kbd>
                      <span>Navigate</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <kbd className="rounded border border-gray-300 bg-white px-1.5 py-0.5 font-mono dark:border-gray-700 dark:bg-gray-900">
                        ↵
                      </kbd>
                      <span>Select</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </FocusTrap>
      )}
    </AnimatePresence>,
    document.body
  );
}
