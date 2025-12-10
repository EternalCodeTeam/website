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
        <Search className="-translate-y-1/2 absolute top-1/2 left-3 text-gray-400" size={18} />
        <input
          className={cn(
            "w-full select-none rounded-lg border bg-white px-4 py-2.5 pr-10 pl-10 text-sm outline-hidden transition-all duration-200",
            isInputFocused
              ? "border-blue-500 shadow-blue-500/20 shadow-lg ring-2 ring-blue-500/50 dark:shadow-blue-500/10"
              : "border-gray-300 shadow-xs dark:border-gray-700",
            "placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          )}
          onBlur={() => setIsInputFocused(false)}
          onChange={onSearchChange}
          onFocus={() => setIsInputFocused(true)}
          placeholder="Search placeholders..."
          value={searchQuery}
        />
      </div>
      <div className="text-gray-600 text-sm dark:text-gray-400">
        Placeholders: <span className="font-semibold">{viewableCount}</span> / {totalCount}
      </div>
    </div>
  );
}
