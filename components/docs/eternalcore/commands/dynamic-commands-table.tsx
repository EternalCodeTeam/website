"use client";

import { useCommands } from "@/components/docs/eternalcore/commands/hooks/use-commands";
import { CommandsSearchBar } from "./commands-search-bar";
import { CommandsTable } from "./commands-table";

export default function DynamicCommandsTable() {
  const { commands, filteredCommands, searchQuery, loading, error, handleSearchChange } =
    useCommands();

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  if (loading) {
    return <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading…</div>;
  }

  return (
    <div className="w-full">
      <div className="mb-6">
        <CommandsSearchBar
          filteredCount={filteredCommands.length}
          onSearchChange={handleSearchChange}
          searchQuery={searchQuery}
          totalCount={commands.length}
        />
      </div>

      <CommandsTable commands={filteredCommands} />
    </div>
  );
}
