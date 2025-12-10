"use client";

import { create, insert, type Orama, search } from "@orama/orama";
import { type ChangeEvent, useEffect, useState } from "react";

import type { CommandData, EternalCoreData } from "@/components/docs/eternalcore/commands/types";

const commandSchema = {
  name: "string",
  permission: "string",
  description: "string",
  arguments: "string",
} as const;

type CommandDB = Orama<typeof commandSchema>;

export function useCommands() {
  const [commands, setCommands] = useState<CommandData[]>([]);
  const [filteredCommands, setFilteredCommands] = useState<CommandData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [db, setDb] = useState<CommandDB | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async (): Promise<void> => {
      try {
        setLoading(true);
        const res = await fetch(
          "https://raw.githubusercontent.com/EternalCodeTeam/EternalCore/refs/heads/master/raw_eternalcore_documentation.json"
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = (await res.json()) as unknown as EternalCoreData;

        const commandsList =
          data.commands?.map((c) => ({
            name: `/${c.name.trim()}`,
            permission: c.permissions?.[0] ?? "-",
            description: c.descriptions?.[0] ?? "-",
            arguments: c.arguments?.join(", ") ?? "-",
          })) ?? [];

        const permsList =
          data.permissions?.map((p) => ({
            name: p.name || "Unknown",
            permission: p.permissions?.[0] ?? "-",
            description: p.descriptions?.[0] ?? "-",
            arguments: "-",
          })) ?? [];

        const all = [...commandsList, ...permsList].sort((a, b) =>
          a.name.replace(/^\//, "").localeCompare(b.name.replace(/^\//, ""), "pl", {
            sensitivity: "base",
          })
        );

        setCommands(all);
        setFilteredCommands(all);

        const orama = create({
          schema: commandSchema,
        });

        for (const c of all) await insert(orama, c);
        setDb(orama);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

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
    void handleSearch(event.target.value);
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
