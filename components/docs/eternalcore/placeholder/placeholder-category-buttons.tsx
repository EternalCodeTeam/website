"use client";

import { Tag } from "lucide-react";

import { cn } from "@/lib/utils";

type PlaceholderCategoryButtonsProps = {
  categories: string[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
};

export function PlaceholderCategoryButtons({
  categories,
  activeCategory,
  onCategoryClick,
}: PlaceholderCategoryButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          className={cn(
            "flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-1.5 font-medium text-xs transition-all",
            category === activeCategory
              ? "bg-blue-500 text-white shadow-blue-500/30 shadow-md"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          )}
          key={category}
          onClick={() => onCategoryClick(category)}
          type="button"
        >
          <Tag size={12} />
          {category}
        </button>
      ))}
    </div>
  );
}
