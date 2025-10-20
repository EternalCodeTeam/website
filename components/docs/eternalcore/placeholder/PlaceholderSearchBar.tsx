"use client";

import { Search } from "lucide-react";
import { type ChangeEvent, useState } from "react";

import { cn } from "@/lib/utils";

interface PlaceholderSearchBarProps {
  searchQuery: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  viewableCount: number;
  totalCount: number;
}

export function PlaceholderSearchBar({
  searchQuery,
  onSearchChange,
  viewableCount,
  totalCount,
}: PlaceholderSearchBarProps) {
  const [isInputFocused, setIsInputFocused] = useState(false);

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          value={searchQuery}
          onChange={onSearchChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          placeholder="Search placeholders..."
          className={cn(
            "w-full rounded-lg border bg-white px-4 py-2.5 pl-10 text-sm transition-all duration-200 placeholder:text-gray-400 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500",
            isInputFocused
              ? "border-blue-500 shadow-lg ring-2 ring-blue-500/50"
              : "border-gray-300 shadow-sm"
          )}
        />
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Placeholders: <span className="font-semibold">{viewableCount}</span> / {totalCount}
      </div>
    </div>
  );
}
