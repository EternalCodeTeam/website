"use client";

import React, { useState, useEffect, useCallback, useRef, memo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "../../hooks/useDebounce";
import { useClickOutside } from "../../hooks/useClickOutside";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "./DocHeader";
import { create, insertMultiple, search, Document } from '@orama/orama';

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
  <motion.button
    onClick={() => onSelect(result.path)}
    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:hover:bg-gray-700 dark:focus:bg-gray-700"
    role="option"
    aria-selected="false"
    whileHover={{ x: 3 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="font-medium text-gray-900 dark:text-white">
      {result.title}
    </div>
    <div className="text-sm text-gray-500 dark:text-gray-400">
      {result.excerpt}
    </div>
  </motion.button>
));

SearchResultItem.displayName = "SearchResultItem";

const LoadingSpinner: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute right-3 top-2.5"
    role="status"
    aria-label="Loading search results"
  >
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
  </motion.div>
);

const NoResultsMessage: React.FC = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400"
  >
    No results found. Try different keywords or check your spelling.
  </motion.div>
);

const DocSearch = memo(function DocSearch({
  className = "",
  placeholder = "Search documentation...",
  minQueryLength = 2,
  debounceTime = 300,
}: DocSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const searchRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, debounceTime);
  const isFirstRender = useRef(true);
  const [oramaDb, setOramaDb] = useState<any>(null);
  const [searchIndex, setSearchIndex] = useState<SearchResult[]>([]);

  useClickOutside(searchRef, () => setIsOpen(false));

  useEffect(() => {
    const initOrama = async () => {
      try {
        const response = await fetch('/api/docs/search-index');
        if (!response.ok) {
          throw new Error(`Failed to fetch search index: ${response.status}`);
        }
        
        const searchData = await response.json() as SearchResult[];
        setSearchIndex(searchData);
        
        const db = await create({
          schema: {
            title: 'string',
            path: 'string',
            excerpt: 'string'
          }
        });
        
        if (searchData.length > 0) {
          await insertMultiple(db, searchData);
        }
        
        setOramaDb(db);
      } catch (error) {
        console.error("Failed to initialize search:", error);
      }
    };
    
    initOrama();
  }, []);

  useEffect(() => {
    if (!isFirstRender.current) {
      setQuery("");
      setResults([]);
      setIsOpen(false);
    } else {
      isFirstRender.current = false;
    }
  }, [pathname]);

  useEffect(() => {
    const performSearch = async () => {
      if (query.length < minQueryLength || !oramaDb) {
        setResults([]);
        setHasSearched(false);
        return;
      }

      setIsLoading(true);
      
      try {
        const searchResults = await search(oramaDb, {
          term: query,
          properties: ['title', 'excerpt'],
          limit: 10
        });
        
        const mappedResults = searchResults.hits.map(hit => ({
          title: hit.document.title as string,
          path: hit.document.path as string,
          excerpt: hit.document.excerpt as string
        }));
        
        setResults(mappedResults);
        setHasSearched(true);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
        setHasSearched(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    performSearch();
  }, [debouncedQuery, oramaDb, minQueryLength, query]);

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
    <motion.div
      ref={searchRef}
      className={cn("relative mb-6", className)}
      role="combobox"
      aria-expanded={isOpen}
      aria-haspopup="listbox"
      aria-controls="search-results"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 20,
        mass: 0.8
      }}
    >
      <div className="relative">
        <motion.input
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
          whileFocus={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Search
            className="absolute left-3 top-2.5 h-4 w-4 text-gray-400"
            aria-hidden="true"
          />
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && query.length >= minQueryLength && (
          <motion.div
            id="search-results"
            className="absolute z-50 mt-1 w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800"
            role="listbox"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            {isLoading ? (
              <LoadingSpinner />
            ) : results.length > 0 ? (
              <div className="max-h-80 overflow-y-auto py-1">
                {results.map((result) => (
                  <SearchResultItem
                    key={result.path}
                    result={result}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            ) : hasSearched ? (
              <NoResultsMessage />
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

DocSearch.displayName = "DocSearch";

export default DocSearch;
