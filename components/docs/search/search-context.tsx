"use client";

import { createContext, type ReactNode, useContext, useEffect, useState } from "react";
import { SearchEngine } from "./search-engine";

interface SearchContextValue {
  searchEngine: SearchEngine;
  isInitializing: boolean;
  error: Error | null;
}

const SearchContext = createContext<SearchContextValue | null>(null);

export function SearchProvider({ children }: { children: ReactNode }) {
  const [searchEngine] = useState(() => new SearchEngine());
  const [isInitializing, setIsInitializing] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    searchEngine
      .initialize()
      .then(() => {
        setIsInitializing(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err : new Error("Failed to initialize search"));
        setIsInitializing(false);
      });
  }, [searchEngine]);

  return (
    <SearchContext.Provider value={{ searchEngine, isInitializing, error }}>
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
