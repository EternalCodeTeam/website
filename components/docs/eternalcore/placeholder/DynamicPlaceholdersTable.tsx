"use client";

import { DynamicNoPlaceholderMessage } from "@/components/docs/eternalcore/placeholder/DynamicNoPlaceholderMessage";
import { usePlaceholders } from "@/components/docs/eternalcore/placeholder/hooks/usePlaceholders";
import { PlaceholderCategoryButtons } from "@/components/docs/eternalcore/placeholder/PlaceholderCategoryButtons";
import { PlaceholderSearchBar } from "@/components/docs/eternalcore/placeholder/PlaceholderSearchBar";
import { PlaceholderTable } from "@/components/docs/eternalcore/placeholder/PlaceholderTable";

export default function DynamicPlaceholdersTable() {
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
  } = usePlaceholders();

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
