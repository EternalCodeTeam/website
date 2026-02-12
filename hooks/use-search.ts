import { useEffect, useState } from "react";
import { useSearchEngine } from "@/components/docs/search/search-context";
import type { SearchResult } from "@/components/docs/search/types";

interface UseSearchOptions {
  minQueryLength?: number;
  debounceTime?: number;
  maxResults?: number;
}

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[];
  isLoading: boolean;
  isInitializing: boolean;
  error: Error | null;
}

/**
 * Shared search logic hook for search components
 * Handles search engine initialization, debouncing, and result management
 */
export function useSearch({
  minQueryLength = 2,
  maxResults = 10,
}: UseSearchOptions = {}): UseSearchReturn {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchEngine, isInitializing, error, initialize } = useSearchEngine();

  // Perform search with debouncing
  useEffect(() => {
    if (query.length < minQueryLength) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    if (!searchEngine.isInitialized) {
      setIsLoading(true);
      if (!isInitializing) {
        initialize().catch(() => undefined);
      }
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(async () => {
      try {
        const searchResults = await searchEngine.search(query, maxResults);
        setResults(searchResults);
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.error("Search failed:", error);
        }
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query, minQueryLength, maxResults, searchEngine, initialize, isInitializing]);

  return {
    query,
    setQuery,
    results,
    isLoading,
    isInitializing,
    error,
  };
}
