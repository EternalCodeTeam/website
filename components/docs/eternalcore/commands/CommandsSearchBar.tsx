"use client";

import { Search } from "lucide-react";
import { type ChangeEvent, useState } from "react";

import { cn } from "@/lib/utils";

interface CommandsSearchBarProps {
  searchQuery: string;
  onSearchChange: (event: ChangeEvent<HTMLInputElement>) => void;
  filteredCount: number;
  totalCount: number;
}

export function CommandsSearchBar({
  searchQuery,
  onSearchChange,
  filteredCount,
  totalCount,
}: CommandsSearchBarProps) {
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
          placeholder="Search for commands and permissions..."
          className={cn(
            "w-full select-none rounded-lg border bg-white px-4 py-2.5 pl-10 pr-10 text-sm outline-hidden transition-all duration-200",
            isInputFocused
              ? "border-blue-500 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/50 dark:shadow-blue-500/10"
              : "border-gray-300 shadow-xs dark:border-gray-700",
            "placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          )}
        />
      </div>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Commands: <span className="font-semibold">{filteredCount}</span> / {totalCount}
      </div>
    </div>
  );
}
