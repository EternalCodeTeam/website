import { useState, useEffect, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { SearchResult } from "./types";
import { SearchEngine } from "./searchEngine";
import { useDebounce } from "@/hooks/useDebounce";

export const useSearch = (
  minQueryLength: number = 2,
  debounceTime: number = 300,
  customSearchEngine?: any,
  searchEndpoint?: string,
  resultLimit: number = 10
) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchEngine] = useState(() => customSearchEngine || new SearchEngine(searchEndpoint));
  const router = useRouter();
  const pathname = usePathname();
  const debouncedQuery = useDebounce(query, debounceTime);

  // Initialize search engine
  useEffect(() => {
    searchEngine.initialize();
  }, [searchEngine]);

  // Reset search when pathname changes
  useEffect(() => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  }, [pathname]);

  // Perform search when query changes
  useEffect(() => {
    const performSearch = async () => {
      if (query.length < minQueryLength) {
        setResults([]);
        return;
      }

      setIsLoading(true);

      try {
        const searchResults = await searchEngine.search(query, resultLimit);
        setResults(searchResults);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [debouncedQuery, minQueryLength, query, searchEngine, resultLimit]);

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

  return {
    query,
    setQuery,
    results,
    isLoading,
    isOpen,
    setIsOpen,
    handleSelect,
    handleKeyDown,
  };
};
