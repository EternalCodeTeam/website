"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "../../hooks/useDebounce";
import { useClickOutside } from "../../hooks/useClickOutside";

interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
}

interface DocSearchProps {
  className?: string;
  placeholder?: string;
  minQueryLength?: number;
  debounceTime?: number;
}

const SearchResultItem: React.FC<{
  result: SearchResult;
  onSelect: (path: string) => void;
}> = React.memo(({ result, onSelect }) => (
  <button
    onClick={() => onSelect(result.path)}
    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:hover:bg-gray-700 dark:focus:bg-gray-700"
    role="option"
    aria-selected="false"
  >
    <div className="font-medium text-gray-900 dark:text-white">
      {result.title}
    </div>
    <div className="text-sm text-gray-500 dark:text-gray-400">
      {result.excerpt}
    </div>
  </button>
));

SearchResultItem.displayName = "SearchResultItem";

const LoadingSpinner: React.FC = () => (
  <div
    className="absolute right-3 top-2.5"
    role="status"
    aria-label="Loading search results"
  >
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
  </div>
);

const DocSearch: React.FC<DocSearchProps> = ({
  className = "",
  placeholder = "Search documentation...",
  minQueryLength = 2,
  debounceTime = 300,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, debounceTime);

  useClickOutside(searchRef, () => setIsOpen(false));

  const searchDocs = useCallback(
    async (searchQuery: string) => {
      if (searchQuery.length < minQueryLength) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/docs/search?q=${encodeURIComponent(searchQuery)}`
        );

        if (!response.ok) {
          throw new Error(`Search failed with status: ${response.status}`);
        }

        const data = (await response.json()) as SearchResult[];
        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    [minQueryLength]
  );

  useEffect(() => {
    searchDocs(debouncedQuery);
  }, [debouncedQuery, searchDocs]);

  const handleSelect = useCallback(
    (path: string) => {
      router.push(path);
      setQuery("");
      setResults([]);
      setIsOpen(false);
    },
    [router]
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsOpen(false);
    }
  }, []);

  return (
    <div
      ref={searchRef}
      className={cn("relative mb-6", className)}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="search-results"
    >
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm",
            "shadow-sm transition-shadow focus:border-gray-400 focus:shadow-lg",
            "focus:outline-none focus:ring-0",
            "dark:border-gray-700 dark:bg-gray-800 dark:text-white",
            "dark:focus:border-gray-500"
          )}
          aria-label="Search documentation"
          aria-autocomplete="list"
          aria-controls="search-results"
        />
        <Search
          className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
          aria-hidden="true"
        />
      </div>

      {isOpen && results.length > 0 && (
        <div
          id="search-results"
          className="absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
          role="listbox"
        >
          {results.map((result) => (
            <SearchResultItem
              key={result.path}
              result={result}
              onSelect={handleSelect}
            />
          ))}
        </div>
      )}

      {isLoading && <LoadingSpinner />}
    </div>
  );
};

DocSearch.displayName = "DocSearch";

export default React.memo(DocSearch);
