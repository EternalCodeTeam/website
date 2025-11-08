"use client";

import { type AnyOrama, create, insert, search } from "@orama/orama";
import { AnimatePresence, motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

interface CommandData {
  name: string;
  permission: string;
  description: string;
  arguments: string;
}

interface EternalCoreData {
  commands?: Array<{
    name: string;
    permissions?: string[];
    descriptions?: string[];
    arguments?: string[];
  }>;
  permissions?: Array<{
    name: string;
    permissions?: string[];
    descriptions?: string[];
  }>;
}

export default function DynamicCommandsTable() {
  const [commands, setCommands] = useState<CommandData[]>([]);
  const [filtered, setFiltered] = useState<CommandData[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [db, setDb] = useState<AnyOrama | null>(null);
  const [focused, setFocused] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async (): Promise<void> => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/EternalCodeTeam/EternalCore/refs/heads/master/raw_eternalcore_documentation.json"
        );

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = (await res.json()) as unknown as EternalCoreData;

        const commands =
          data.commands?.map((c) => ({
            name: `/${c.name.trim()}`,
            permission: c.permissions?.[0] ?? "-",
            description: c.descriptions?.[0] ?? "-",
            arguments: c.arguments?.join(", ") ?? "-",
          })) ?? [];

        const perms =
          data.permissions?.map((p) => ({
            name: p.name || "Unknown",
            permission: p.permissions?.[0] ?? "-",
            description: p.descriptions?.[0] ?? "-",
            arguments: "-",
          })) ?? [];

        const all = [...commands, ...perms].sort((a, b) =>
          a.name.replace(/^\//, "").localeCompare(b.name.replace(/^\//, ""), "pl", {
            sensitivity: "base",
          })
        );

        setCommands(all);
        setFiltered(all);

        const orama = create({
          schema: {
            name: "string",
            permission: "string",
            description: "string",
            arguments: "string",
          },
        });

        for (const c of all) await insert(orama, c);
        setDb(orama);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      }
    };

    void load();
  }, []);

  const handleSearch = async (q: string): Promise<void> => {
    setSearchQuery(q);
    if (!q.trim() || !db) {
      setFiltered(commands);
      return;
    }

    try {
      const res = await search(db, {
        term: q,
        properties: ["name", "permission", "description", "arguments"],
        tolerance: 1,
      });
      setFiltered(res.hits.map((h) => h.document as unknown as CommandData));
    } catch {
      setFiltered(commands);
    }
  };

  if (error) {
    return <div className="p-6 text-center text-red-500">Error: {error}</div>;
  }

  if (!commands.length) {
    return <div className="p-6 text-center text-gray-500 dark:text-gray-400">Loading…</div>;
  }

  const CommandCount = (
    <motion.div
      initial={{ opacity: 0, y: -5 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-sm text-gray-600 dark:text-gray-400"
    >
      Commands:{" "}
      <span className="font-semibold text-gray-800 dark:text-gray-200">{filtered.length}</span> /{" "}
      {commands.length}
    </motion.div>
  );

  return (
    <div className="w-full">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input
            value={searchQuery}
            onChange={(e) => void handleSearch(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="Search for commands and permissions..."
            className={cn(
              "w-full select-none rounded-lg border bg-white px-4 py-2.5 pl-10 pr-10 text-sm outline-hidden transition-all duration-200",
              focused
                ? "border-blue-500 shadow-lg shadow-blue-500/20 ring-2 ring-blue-500/50 dark:shadow-blue-500/10"
                : "border-gray-300 shadow-xs dark:border-gray-700",
              "placeholder:text-gray-400 dark:bg-gray-800 dark:text-white dark:placeholder:text-gray-500"
            )}
          />
        </div>
        {CommandCount}
      </div>

      <div className="my-6 overflow-x-auto rounded-lg">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
            <tr>
              {["Source", "Permission", "Description", "Argument's"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            <AnimatePresence>
              {filtered.map((c) => (
                <motion.tr
                  key={c.name}
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="transition-colors hover:bg-gray-50 dark:hover:bg-gray-900"
                >
                  {[c.name, c.permission, c.description, c.arguments].map((v, j) => (
                    <td
                      key={`${c.name}-${j}`}
                      className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      {v}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
