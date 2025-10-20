"use client";

import { Tag } from "lucide-react";

import { cn } from "@/lib/utils";

interface PlaceholderCategoryButtonsProps {
  categories: string[];
  activeCategory: string;
  onCategoryClick: (category: string) => void;
}

export function PlaceholderCategoryButtons({
  categories,
  activeCategory,
  onCategoryClick,
}: PlaceholderCategoryButtonsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryClick(category)}
          className={cn(
            "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all",
            category === activeCategory
              ? "bg-blue-500 text-white shadow-md shadow-blue-500/30"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
          )}
        >
          <Tag size={12} />
          {category}
        </button>
      ))}
    </div>
  );
}
