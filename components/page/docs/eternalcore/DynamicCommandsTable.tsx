"use client";

import React, { useEffect, useState } from "react";

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
          setError("Invalid data formatting received from server");
          return;
        }

        const processedCommands = data.map((cmd: unknown) => {
          const rawCmd = cmd as RawCommand;
          return {
            name: rawCmd.name || "Unknown",
            permission:
              Array.isArray(rawCmd.permissions) && rawCmd.permissions.length > 0
                ? rawCmd.permissions[0]
                : "-",
            description:
              Array.isArray(rawCmd.descriptions) && rawCmd.descriptions.length > 0
                ? rawCmd.descriptions[0]
                : "-",
            arguments:
              Array.isArray(rawCmd.arguments) && rawCmd.arguments.length > 0
                ? rawCmd.arguments.join(", ")
                : "-",
          };
        });

        setCommands(processedCommands);
      })
      .catch((e) => {
        setError((e as Error).message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading commands…</div>;
  if (error) return <div>Error: {error}</div>;
  if (!commands.length) return <div>No commands found.</div>;

  return (
    <div>
      <table>
        <thead>
        <tr>
          <th>Name</th>
          <th>Permission</th>
          <th>Description</th>
          <th>Arguments</th>
        </tr>
        </thead>
        <tbody>
        {commands.map((c) => (
          <tr key={c.name}>
            <td>{c.name}</td>
            <td>{c.permission}</td>
            <td>{c.description}</td>
            <td>{c.arguments}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}
