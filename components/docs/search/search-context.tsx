"use client";

import { createContext, type ReactNode, useCallback, useContext, useState } from "react";
import { SearchEngine } from "./search-engine";

interface SearchContextValue {
  searchEngine: SearchEngine;
  isInitializing: boolean;
  error: Error | null;
  initialize: () => Promise<void>;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchEngine] = useState(() => new SearchEngine());
  const [isInitializing, setIsInitializing] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const initialize = useCallback(async () => {
    if (searchEngine.isInitialized || isInitializing) {
      return;
    }

    setIsInitializing(true);
    try {
      await searchEngine.initialize();
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to initialize search"));
    } finally {
      setIsInitializing(false);
    }
  }, [searchEngine, isInitializing]);

  return (
    <SearchContext.Provider value={{ searchEngine, isInitializing, error, initialize }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearchEngine() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchEngine must be used within SearchProvider");
  }
  return context;
}
