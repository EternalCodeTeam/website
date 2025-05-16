"use client";

import React, { useEffect, useState } from "react";

interface Command {
  name: string;
  permission?: string;
  description: string;
  arguments?: string;
}

export default function DynamicCommandsTable() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/EternalCodeTeam/EternalCore/refs/heads/master/raw_commands_docs.json"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch commands");
        return res.json();
      })
      .then((data) => setCommands(data as Command[]))
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading commands…</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!commands.length) return <div>No commands found.</div>;

  return (
    <div className="overflow-x-auto">
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
          {commands.map((c, i) => (
            <tr key={i}>
              <td className="border px-4 py-2 font-semibold">{c.name}</td>
              <td className="border px-4 py-2">{c.permission || "-"}</td>
              <td className="border px-4 py-2">{c.description}</td>
              <td className="border px-4 py-2">{c.arguments || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
