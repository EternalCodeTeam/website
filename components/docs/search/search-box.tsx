"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useDebounce } from "@/hooks/use-debounce";
import { cn } from "@/lib/utils";

import { SearchEngine } from "./search-engine";
import type { SearchResult } from "./types";

interface SearchBoxProps {
  className?: string;
  placeholder?: string;
  minQueryLength?: number;
  debounceTime?: number;
  searchEndpoint?: string;
}

const SearchBox = ({
  className = "",
  placeholder = "Search documentation...",
  minQueryLength = 2,
  debounceTime = 300,
  searchEndpoint = "/api/docs/search-index",
}: SearchBoxProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchEngine] = useState(() => new SearchEngine(searchEndpoint));
  const [isMac, setIsMac] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const debouncedQuery = useDebounce(query, debounceTime);

  useEffect(() => {
    setIsMac(navigator.platform.toUpperCase().indexOf("MAC") >= 0);
  }, []);

  useEffect(() => {
    searchEngine.initialize();
  }, [searchEngine]);

  useEffect(() => {
    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
        setIsOpen(true);
        setIsFocused(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setIsFocused(false);
  }, []);

  useEffect(() => {
    const performSearch = async () => {
      if (debouncedQuery.length < minQueryLength) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const searchResults = await searchEngine.search(debouncedQuery, 8);
        setResults(searchResults);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (debouncedQuery.length >= minQueryLength) {
      performSearch();
    }
  }, [debouncedQuery, minQueryLength, searchEngine]);

  useClickOutside(searchRef, () => {
    setIsOpen(false);
    setIsFocused(false);
  });

  const handleSelect = useCallback(
    (path: string) => {
      router.push(path);
      setQuery("");
      setResults([]);
      setIsOpen(false);
      setIsFocused(false);
      inputRef.current?.blur();
    },
    [router]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setIsFocused(false);
        inputRef.current?.blur();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
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
    setResults([]);
    inputRef.current?.focus();
  };

  return (
    <div className={cn("relative w-full", className)} ref={searchRef}>
      <div className="relative">
        <div className="relative">
          <input
            aria-label="Search documentation"
            className={cn(
              "w-full select-none rounded-lg border bg-gray-50/50 px-4 py-2.5 pr-10 pl-10 text-sm outline-hidden transition-all duration-200",
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
            type="text"
            value={query}
          />

          <motion.div
            animate={{
              rotate: isLoading ? 360 : 0,
              scale: isFocused || isOpen ? 1.1 : 1,
            }}
            className="pointer-events-none absolute top-2.5 left-3"
            transition={{
              rotate: {
                duration: 1,
                repeat: isLoading ? Number.POSITIVE_INFINITY : 0,
                ease: "linear",
              },
              scale: { duration: 0.2 },
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
                <kbd className="hidden rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-gray-500 text-xs sm:inline-block dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  {isMac ? "⌘" : "Ctrl"}
                </kbd>
                <kbd className="hidden rounded border border-gray-300 bg-gray-100 px-1.5 py-0.5 font-mono text-gray-500 text-xs sm:inline-block dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
                  K
                </kbd>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {!!query && (
              <motion.button
                animate={{ opacity: 1, scale: 1 }}
                className="absolute top-2.5 right-3 rounded-full p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700"
                exit={{ opacity: 0, scale: 0.8 }}
                initial={{ opacity: 0, scale: 0.8 }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  clearSearch();
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
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
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            {results.length > 0 ? (
              <div className="scrollbar-hide max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <motion.button
                    animate={{ opacity: 1, x: 0 }}
                    className={cn(
                      "w-full select-none px-4 py-3 text-left transition-all",
                      selectedIndex === index
                        ? "bg-blue-50 dark:bg-blue-500/10"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    )}
                    initial={{ opacity: 0, x: -20 }}
                    key={result.path}
                    onClick={() => handleSelect(result.path)}
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent blur before click
                    }}
                    onMouseEnter={() => setSelectedIndex(index)}
                    transition={{
                      delay: index * 0.04,
                      type: "spring",
                      stiffness: 300,
                      damping: 25,
                    }}
                    whileHover={{ x: 4 }}
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        animate={{
                          rotate: selectedIndex === index ? [0, -10, 10, 0] : 0,
                        }}
                        className={cn(
                          "mt-0.5 shrink-0",
                          selectedIndex === index
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-400"
                        )}
                        transition={{ duration: 0.3 }}
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
                      <AnimatePresence>
                        {selectedIndex === index && (
                          <motion.div
                            animate={{ opacity: 1, scale: 1 }}
                            className="shrink-0 rounded-sm bg-blue-100 px-2 py-0.5 font-medium text-blue-700 text-xs dark:bg-blue-900/30 dark:text-blue-300"
                            exit={{ opacity: 0, scale: 0 }}
                            initial={{ opacity: 0, scale: 0 }}
                          >
                            Enter
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.button>
                ))}
              </div>
            ) : (
              <motion.div
                animate={{ opacity: 1, scale: 1 }}
                className="px-4 py-8 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <motion.div
                  animate={{ rotate: [0, -10, 10, 0] }}
                  className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700"
                  transition={{ duration: 0.5, delay: 0.1 }}
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
