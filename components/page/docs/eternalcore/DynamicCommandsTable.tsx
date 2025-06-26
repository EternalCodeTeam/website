"use client";

import React, { useEffect, useState, useRef } from "react";

interface Command {
  name: string;
  permission: string;
  description: string;
  arguments: string;
}

interface RawCommand {
  name?: string;
  permissions?: string[];
  descriptions?: string[];
  arguments?: string[];
}

export default function DynamicCommandsTable() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/EternalCodeTeam/EternalCore/refs/heads/master/raw_commands_docs.json"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch commands");
        return res.json();
      })
      .then((data: unknown) => {
        if (!Array.isArray(data)) {
          console.error("Expected array of commands, got:", typeof data);
          setError("Invalid data formatting received from server");
          return;
        }

        const processedCommands = data.map((cmd: unknown) => {
          const rawCmd = cmd as RawCommand;
          const permission =
            Array.isArray(rawCmd.permissions) && rawCmd.permissions.length > 0
              ? rawCmd.permissions[0]
              : "-";

          const description =
            Array.isArray(rawCmd.descriptions) && rawCmd.descriptions.length > 0
              ? rawCmd.descriptions[0]
              : "-";

          const args =
            Array.isArray(rawCmd.arguments) && rawCmd.arguments.length > 0
              ? rawCmd.arguments.join(", ")
              : "-";

          return {
            name: rawCmd.name || "Unknown",
            permission,
            description,
            arguments: args,
          };
        });

        setCommands(processedCommands);
      })
      .catch((e) => {
        console.error("Error fetching commands:", e);
        setError((e as Error).message);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (tableRef.current) {
      const timer = setTimeout(() => {
        if (tableRef.current) {
          tableRef.current.style.visibility = "hidden";
          setTimeout(() => {
            if (tableRef.current) {
              tableRef.current.style.visibility = "visible";
            }
          }, 50);
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) return <div>Loading commands…</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!commands.length) return <div>No commands found.</div>;

  return (
    <div
      className="overflow-x-auto"
      ref={tableRef}
      style={{ display: "block !important", opacity: "1 !important" }}
    >
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Permission</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Arguments</th>
          </tr>
        </thead>
        <tbody>
          {commands.map((c, _i) => (
            <tr key={c.name}>
              <td className="whitespace-normal break-words border px-4 py-2 font-semibold">
                {c.name}
              </td>
              <td className="whitespace-normal break-words border px-4 py-2">{c.permission}</td>
              <td className="whitespace-normal break-words border px-4 py-2">{c.description}</td>
              <td className="whitespace-normal break-words border px-4 py-2">{c.arguments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
