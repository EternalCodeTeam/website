"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useId, useRef } from "react";

import { useClickOutside } from "@/hooks/useClickOutside";
import { cn } from "@/lib/utils";

import { LoadingSpinner } from "./LoadingSpinner";
import { NoResultsMessage } from "./NoResultsMessage";
import { SearchResultItem } from "./SearchResultItem";
import { SearchResult } from "./types";
import { useSearch } from "./useSearch";

export interface UniversalSearchProps {
  className?: string;
  placeholder?: string;
  minQueryLength?: number;
  debounceTime?: number;
  onResultSelect?: (result: SearchResult) => void;
  customSearchEngine?: any;
  searchEndpoint?: string;
  resultLimit?: number;
}

const SearchBox = ({
  className = "",
  placeholder = "Search...",
  minQueryLength = 2,
  debounceTime = 300,
  onResultSelect,
  customSearchEngine,
  searchEndpoint,
  resultLimit = 10,
}: UniversalSearchProps) => {
  const searchRef = useRef<HTMLDivElement>(null);
  const inputId = useId();
  const listboxId = useId();

  const { query, setQuery, results, isLoading, isOpen, setIsOpen, handleSelect, handleKeyDown } =
    useSearch(minQueryLength, debounceTime, customSearchEngine, searchEndpoint, resultLimit);

  useClickOutside(searchRef, () => setIsOpen(false));

  const handleResultSelect = (path: string) => {
    const selectedResult = results.find((result) => result.path === path);
    if (selectedResult && onResultSelect) {
      onResultSelect(selectedResult);
    } else {
      handleSelect(path);
    }
  };

  return (
    <div ref={searchRef} className={cn("relative w-full", className)}>
      <div className="relative">
        <input
          id={inputId}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm focus:border-blue-500 focus:outline-none dark:border-gray-700 dark:bg-gray-800 dark:text-white"
          aria-label="Search"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={listboxId}
          aria-autocomplete="list"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
        {isLoading && <LoadingSpinner />}
      </div>
      <AnimatePresence>
        {isOpen && query.length >= minQueryLength && (
          <motion.div
            id={listboxId}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute z-50 mt-2 w-full rounded-lg border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
            role="listbox"
          >
            {results.length > 0 ? (
              results.map((result, index) => (
                <SearchResultItem key={index} result={result} onSelect={handleResultSelect} />
              ))
            ) : (
              <NoResultsMessage />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBox;
