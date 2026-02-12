"use client";

import { create, insert, type Orama, search } from "@orama/orama";
import { type ChangeEvent, useEffect, useState } from "react";
import type { CommandData } from "@/components/docs/eternalcore/commands/types";

const commandSchema = {
  name: "string",
  permission: "string",
  description: "string",
  arguments: "string",
} as const;

type CommandDB = Orama<typeof commandSchema>;

export function useCommands(initialData: CommandData[]) {
  const [commands] = useState<CommandData[]>(initialData);
  const [filteredCommands, setFilteredCommands] = useState<CommandData[]>(initialData);
  const [searchQuery, setSearchQuery] = useState("");
  const [db, setDb] = useState<CommandDB | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initDb = async () => {
      try {
        setLoading(true);
        const orama = create({
          schema: commandSchema,
        });

        await insertCommands(orama, initialData);
        setDb(orama);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Failed to initialize search";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    initDb();
  }, [initialData]);

  const handleSearch = async (q: string): Promise<void> => {
    setSearchQuery(q);
    if (!(q.trim() && db)) {
      setFilteredCommands(commands);
      return;
    }

    try {
      const res = await search(db, {
        term: q,
        properties: ["name", "permission", "description", "arguments"],
        tolerance: 1,
      });
      setFilteredCommands(res.hits.map((h) => h.document as unknown as CommandData));
    } catch {
      setFilteredCommands(commands);
    }
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    handleSearch(event.target.value);
  };

  return {
    commands,
    filteredCommands,
    searchQuery,
    setSearchQuery,
    loading,
    error,
    handleSearchChange,
  };
}

async function insertCommands(orama: CommandDB, commands: CommandData[]) {
  for (const c of commands) {
    await insert(orama, c);
  }
}
