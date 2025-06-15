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

const isValidSearchResult = (data: unknown): data is SearchResult => {
  if (!data || typeof data !== 'object') return false;
  
  const result = data as Record<string, unknown>;
  return (
    typeof result.title === 'string' &&
    typeof result.path === 'string' &&
    typeof result.excerpt === 'string' &&
    result.title.length > 0 &&
    result.path.length > 0
  );
};

const validateSearchResults = (data: unknown): SearchResult[] => {
  if (!Array.isArray(data)) {
    console.error('Search index data is not an array');
    return [];
  }

  const validResults: SearchResult[] = [];
  const invalidResults: unknown[] = [];

  data.forEach((item, index) => {
    if (isValidSearchResult(item)) {
      validResults.push(item);
    } else {
      invalidResults.push(item);
      console.warn(`Invalid search result at index ${index}:`, item);
    }
  });

  if (invalidResults.length > 0) {
    console.warn(`Found ${invalidResults.length} invalid search results out of ${data.length} total results`);
  }

  return validResults;
};

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
  const [isMobile, setIsMobile] = useState(false);

  useClickOutside(searchRef, () => setIsOpen(false));

 
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

   
    checkIfMobile();

   
    window.addEventListener('resize', checkIfMobile);

   
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const initOrama = async () => {
      try {
        const response = await fetch('/api/docs/search-index');
        if (!response.ok) {
          throw new Error(`Failed to fetch search index: ${response.status}`);
        }
        
        const rawData = await response.json();
        const searchData = validateSearchResults(rawData);
        
        if (searchData.length === 0) {
          console.warn('No valid search results found in the index');
          return;
        }
        
        setSearchIndex(searchData);
        
        const db = await create({
          schema: {
            title: 'string',
            path: 'string',
            excerpt: 'string'
          }
        });
        
        await insertMultiple(db, searchData);
        setOramaDb(db);
      } catch (error) {
        console.error("Failed to initialize search:", error);
       
        setSearchIndex([]);
        setOramaDb(null);
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
    <div
      ref={searchRef}
      className={cn(
        "relative w-full",
        isMobile ? "mb-4" : "",
        className
      )}
    >
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-gray-400" aria-hidden="true" />
        </div>
        <input
          type="text"
          className={cn(
            "block w-full rounded-lg border border-gray-300 bg-white py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400",
            isOpen && "rounded-b-none"
          )}
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query.length >= minQueryLength) {
              setIsOpen(true);
            }
          }}
          aria-expanded={isOpen}
          aria-controls="search-results"
          aria-autocomplete="list"
          role="combobox"
          aria-label="Search documentation"
        />
        <AnimatePresence>
          {isLoading && <LoadingSpinner />}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="search-results"
            className={cn(
              "absolute z-50 mt-0.5 w-full overflow-hidden rounded-b-lg border border-t-0 border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800",
              isMobile ? "max-h-[70vh]" : "max-h-[60vh]"
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="max-h-[inherit] overflow-y-auto">
              {results.length > 0 ? (
                <div className="py-1" role="listbox">
                  {results.map((result, index) => (
                    <SearchResultItem
                      key={`${result.path}-${index}`}
                      result={result}
                      onSelect={(path) => {
                        router.push(path);
                        setIsOpen(false);
                      }}
                    />
                  ))}
                </div>
              ) : hasSearched ? (
                <NoResultsMessage />
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

DocSearch.displayName = "DocSearch";

export default DocSearch;
