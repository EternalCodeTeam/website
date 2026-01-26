"use client";

import { create, insert, type Orama, search } from "@orama/orama";
import type React from "react";
import { useCallback, useEffect, useState } from "react";
import type { Placeholder } from "@/components/docs/eternalcore/placeholder/types";

const placeholderSchema = {
  name: "string",
  description: "string",
  example: "string",
  returnType: "string",
  category: "string",
  requiresPlayer: "boolean",
} as const;

type PlaceholderDB = Orama<typeof placeholderSchema>;

export function usePlaceholders(initialData: Placeholder[]) {
  const [allPlaceholders] = useState<Placeholder[]>(initialData);
  const [viewablePlaceholders, setViewablePlaceholders] = useState<Placeholder[]>(initialData);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [db, setDb] = useState<PlaceholderDB | undefined>();
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeData = async () => {
      try {
        setLoading(true);

        const uniqueCategories = Array.from(new Set(initialData.map((p) => p.category))).sort();
        setCategories(["All", ...uniqueCategories]);

        const oramaDb = create({ schema: placeholderSchema });
        await Promise.all(initialData.map((p) => insert(oramaDb, p)));

        setDb(oramaDb);
      } catch (exception) {
        setError(exception instanceof Error ? exception.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [initialData]);

  const filterPlaceholders = useCallback(
    async (query = searchQuery, category = activeCategory) => {
      try {
        let filteredList =
          category === "All"
            ? allPlaceholders
            : allPlaceholders.filter((p) => p.category === category);

        if (query.trim() && db) {
          const searchResult = await search(db, {
            term: query,
            properties: ["name", "description", "example", "category"],
            tolerance: 1,
          });

          const resultIds = new Set(searchResult.hits.map((hit) => hit.document.name));
          filteredList = filteredList.filter((p) => resultIds.has(p.name));
        }

        setViewablePlaceholders(filteredList);
      } catch (exception) {
        setError(
          exception instanceof Error ? exception.message : "An unknown search error occurred"
        );
      }
    },
    [allPlaceholders, db, searchQuery, activeCategory]
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      filterPlaceholders(searchQuery, activeCategory);
    }, 300);

    return () => clearTimeout(timeout);
  }, [searchQuery, activeCategory, filterPlaceholders]);

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
  };

  return {
    allPlaceholders,
    viewablePlaceholders,
    categories,
    activeCategory,
    searchQuery,
    error,
    loading,
    handleSearchChange,
    handleCategoryClick,
  };
}
