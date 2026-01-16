import { useCallback, useEffect, useState } from "react";

const RECENT_SEARCHES_KEY = "docs-recent-searches";
const MAX_RECENT_SEARCHES = 5;
const EXPIRATION_DAYS = 30;

interface StoredSearch {
  query: string;
  timestamp: number;
}

interface UseRecentSearchesReturn {
  recentSearches: string[];
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

/**
 * Hook to manage recent searches in localStorage with caching and expiration
 */
export function useRecentSearches(): UseRecentSearchesReturn {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load recent searches from localStorage once
  useEffect(() => {
    if (isInitialized) {
      return;
    }

    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as unknown[];
        if (Array.isArray(parsed)) {
          // Filter out expired searches
          const expirationTime = Date.now() - EXPIRATION_DAYS * 24 * 60 * 60 * 1000;
          const validSearches = parsed
            .filter((item): item is StoredSearch | string => {
              // Support both old format (string) and new format (object)
              if (typeof item === "string") {
                return true;
              }
              if (typeof item === "object" && item !== null && "timestamp" in item) {
                return (item as StoredSearch).timestamp > expirationTime;
              }
              return false;
            })
            .map((item) => (typeof item === "string" ? item : item.query));

          setRecentSearches(validSearches);
        }
      }
    } catch {
      // Ignore localStorage errors
    } finally {
      setIsInitialized(true);
    }
  }, [isInitialized]);

  const addRecentSearch = useCallback(
    (query: string) => {
      if (!query.trim()) {
        return;
      }

      const updated = [query, ...recentSearches.filter((s) => s !== query)].slice(
        0,
        MAX_RECENT_SEARCHES
      );

      setRecentSearches(updated);
      try {
        const storedSearches: StoredSearch[] = updated.map((q) => ({
          query: q,
          timestamp: Date.now(),
        }));
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(storedSearches));
      } catch {
        // Ignore localStorage errors
      }
    },
    [recentSearches]
  );

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  };
}
