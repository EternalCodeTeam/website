"use client";

import { CommandsSearchBar } from "@/components/docs/eternalcore/commands/CommandsSearchBar";
import { CommandsTable } from "@/components/docs/eternalcore/commands/CommandsTable";
import { useCommands } from "@/components/docs/eternalcore/commands/hooks/useCommands";

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
