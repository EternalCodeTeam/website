"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

interface SearchResult {
  title: string;
  path: string;
  excerpt: string;
}

export default function DocSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const searchDocs = async () => {
      if (query.length < 2) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/docs/search?q=${encodeURIComponent(query)}`
        );
        const data = (await response.json()) as SearchResult[];
        setResults(data);
      } catch (error) {
        console.error("Search failed:", error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const debounceTimer = setTimeout(searchDocs, 300);
    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div className="relative mb-6">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search documentation..."
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-sm shadow-sm transition-shadow focus:border-gray-400 focus:shadow-lg focus:outline-none focus:ring-0 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:focus:border-gray-500"
        />
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
      </div>

      {results.length > 0 && (
        <div className="absolute z-10 mt-2 w-full rounded-lg border border-gray-200 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
          {results.map((result) => (
            <button
              key={result.path}
              onClick={() => {
                router.push(result.path);
                setQuery("");
                setResults([]);
              }}
              className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none dark:hover:bg-gray-700"
            >
              <div className="font-medium text-gray-900 dark:text-white">
                {result.title}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {result.excerpt}
              </div>
            </button>
          ))}
        </div>
      )}

      {isLoading && (
        <div className="absolute right-3 top-2.5">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500"></div>
        </div>
      )}
    </div>
  );
}
