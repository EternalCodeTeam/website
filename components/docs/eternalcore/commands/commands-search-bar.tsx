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
        <Search className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" size={18} />
        <input
          className={cn(
            "w-full select-none rounded-lg border bg-white px-4 py-2.5 pr-10 pl-10 text-sm outline-hidden transition-[border-color,box-shadow] duration-200",
            isInputFocused
              ? "border-blue-500 shadow-blue-500/20 shadow-lg ring-2 ring-blue-500/50 dark:shadow-blue-500/10"
              : "border-gray-300 shadow-xs dark:border-gray-700",
            "placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
          )}
          onBlur={() => setIsInputFocused(false)}
          onChange={onSearchChange}
          onFocus={() => setIsInputFocused(true)}
          placeholder="Search for commands and permissions..."
          value={searchQuery}
        />
      </div>
      <div className="text-gray-600 text-sm dark:text-gray-400">
        Commands: <span className="font-semibold">{filteredCount}</span> / {totalCount}
      </div>
    </div>
  );
}
