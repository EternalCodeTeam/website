"use client";

import { create, insert, type Orama, search } from "@orama/orama";
import { useEffect, useState } from "react";

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

export function usePlaceholders() {
  const [allPlaceholders, setAllPlaceholders] = useState<Placeholder[]>([]);
  const [viewablePlaceholders, setViewablePlaceholders] = useState<Placeholder[]>([]);
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
        const response = await fetch(
          "https://raw.githubusercontent.com/EternalCodeTeam/EternalCore/refs/heads/master/raw_eternalcore_placeholders.json"
        );
        if (!response.ok) {
          setError(`Failed to fetch data: ${response.statusText}`);
          return;
        }

        const data = (await response.json()) as Placeholder[];
        const sortedData = [...data].sort((a, b) => a.name.localeCompare(b.name, "pl"));

        setAllPlaceholders(sortedData);
        setViewablePlaceholders(sortedData);

        const uniqueCategories = [...new Set(sortedData.map((p) => p.category))].sort();
        setCategories(["All", ...uniqueCategories]);

        const oramaDb = await create({
          schema: placeholderSchema,
        });

        await Promise.all(sortedData.map((p) => insert(oramaDb, p)));
        setDb(oramaDb);
      } catch (exception) {
        setError(exception instanceof Error ? exception.message : "An unknown error occurred");
      } finally {
        setLoading(false);
      }
    };
    initializeData();
  }, []);

  const filterPlaceholders = async (query = searchQuery, category = activeCategory) => {
    let filteredList =
      category === "All" ? allPlaceholders : allPlaceholders.filter((p) => p.category === category);

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
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setSearchQuery(newQuery);
    filterPlaceholders(newQuery, activeCategory);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    filterPlaceholders(searchQuery, category);
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
