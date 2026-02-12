"use client";

import { usePlaceholders } from "@/components/docs/eternalcore/placeholder/hooks/use-placeholders";
import type { Placeholder } from "@/components/docs/eternalcore/placeholder/types";
import { DynamicNoPlaceholderMessage } from "./dynamic-no-placeholder-message";
import { PlaceholderCategoryButtons } from "./placeholder-category-buttons";
import { PlaceholderSearchBar } from "./placeholder-search-bar";
import { PlaceholderTable } from "./placeholder-table";

interface DynamicPlaceholdersTableProps {
  initialData: Placeholder[];
}

export default function DynamicPlaceholdersTable({ initialData }: DynamicPlaceholdersTableProps) {
  const {
    allPlaceholders,
    viewablePlaceholders,
    categories,
    activeCategory,
    searchQuery,
    error,
    loading,
    handleSearchChange,
    handleCategoryClick,
  } = usePlaceholders(initialData);

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-4">
        <PlaceholderSearchBar
          onSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          totalCount={allPlaceholders.length}
          viewableCount={viewablePlaceholders.length}
        />

        <PlaceholderCategoryButtons
          activeCategory={activeCategory}
          categories={categories}
          onCategoryClick={handleCategoryClick}
        />
      </div>

      <PlaceholderTable placeholders={viewablePlaceholders} />

      {!viewablePlaceholders.length && <DynamicNoPlaceholderMessage />}
    </div>
  );
}
