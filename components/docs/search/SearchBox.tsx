"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search, Sparkles, X } from "lucide-react";
import { useRouter } from "next/navigation";
import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useDebounce } from "@/hooks/useDebounce";
import { cn } from "@/lib/utils";

import { SearchEngine } from "./searchEngine";
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

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const debouncedQuery = useDebounce(query, debounceTime);

  // Initialize search engine
  useEffect(() => {
    searchEngine.initialize();
  }, [searchEngine]);

  // Reset on route change
  useEffect(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    setIsFocused(false);
  }, []);

  // Perform search
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
    <div ref={searchRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
              setSelectedIndex(0);
            }}
            onFocus={() => {
              setIsOpen(true);
              setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={cn(
              "w-full select-none rounded-lg border bg-white px-4 py-2.5 pl-10 pr-10 text-sm outline-hidden transition-all duration-200",
              isFocused || isOpen
                ? "border-blue-500 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/50 dark:shadow-blue-500/10"
                : "border-gray-300 shadow-xs dark:border-gray-700",
              "placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            )}
            aria-label="Search documentation"
          />

          <motion.div
            className="pointer-events-none absolute left-3 top-2.5"
            animate={{
              rotate: isLoading ? 360 : 0,
              scale: isFocused || isOpen ? 1.1 : 1,
            }}
            transition={{
              rotate: { duration: 1, repeat: isLoading ? Infinity : 0, ease: "linear" },
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
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                onMouseDown={(e) => {
                  e.preventDefault();
                  clearSearch();
                }}
                className="absolute right-3 top-2.5 rounded-full p-0.5 hover:bg-gray-100 dark:hover:bg-gray-700"
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
          {isLoading && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              exit={{ scaleX: 0 }}
              className="absolute bottom-0 left-0 h-0.5 w-full origin-left rounded-full bg-linear-to-r from-blue-500 to-purple-500"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Results dropdown */}
      <AnimatePresence>
        {isOpen && query.length >= minQueryLength && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800"
          >
            {results.length > 0 ? (
              <div className="scrollbar-hide max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <motion.button
                    key={result.path}
                    onMouseDown={(e) => {
                      e.preventDefault(); // Prevent blur before click
                    }}
                    onClick={() => handleSelect(result.path)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={cn(
                      "w-full select-none px-4 py-3 text-left transition-all",
                      selectedIndex === index
                        ? "bg-blue-50 dark:bg-blue-900/20"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        animate={{
                          rotate: selectedIndex === index ? [0, -10, 10, 0] : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "mt-0.5 shrink-0",
                          selectedIndex === index
                            ? "text-blue-600 dark:text-blue-400"
                            : "text-gray-400"
                        )}
                      >
                        <Sparkles className="h-4 w-4" />
                      </motion.div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate font-semibold text-gray-900 dark:text-white">
                          {result.title}
                        </div>
                        <div className="mt-0.5 line-clamp-2 text-xs text-gray-500 dark:text-gray-400">
                          {result.excerpt}
                        </div>
                      </div>
                      <AnimatePresence>
                        {selectedIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="shrink-0 rounded-sm bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
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
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="px-4 py-8 text-center"
              >
                <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                  <Search className="h-6 w-6 text-gray-400" />
                </div>
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  No results found
                </p>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Try different keywords
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
