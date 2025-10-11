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

interface RawPermission {
  name?: string;
  permissions?: string[];
  descriptions?: string[];
}

export default function DynamicCommandsTable() {
  const [commands, setCommands] = useState<Command[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/EternalCodeTeam/EternalCore/refs/heads/master/raw_eternalcore_documentation.json"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch commands");
        return res.json();
      })
      .then((data: any) => {
        if (
          !data ||
          typeof data !== "object" ||
          (!Array.isArray(data.commands) && !Array.isArray(data.permissions))
        ) {
          setError("Invalid data formatting received from server");
          return;
        }

        const commandsData = (data.commands || []).map(
          (cmd: RawCommand): Command => ({
            name: `/${cmd.name?.trim() || "unknown"}`,
            permission: cmd.permissions?.[0] || "-",
            description: cmd.descriptions?.[0] || "-",
            arguments: cmd.arguments?.join(", ") || "-",
          })
        );

        const permissionsData = (data.permissions || []).map(
          (perm: RawPermission): Command => ({
            name: perm.name?.trim() || "Unknown",
            permission: perm.permissions?.[0] || "-",
            description: perm.descriptions?.[0] || "-",
            arguments: "-",
          })
        );

        const combined = [...commandsData, ...permissionsData].sort((a, b) =>
          a.name
            .replace(/^\//, "")
            .localeCompare(b.name.replace(/^\//, ""), "pl", { sensitivity: "base" })
        );

        setCommands(combined);
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
    <table>
      <thead>
        <tr>
          <th>Source</th>
          <th>Permission</th>
          <th>Description</th>
          <th>Arguments</th>
        </tr>
      </thead>
      <tbody>
        {commands.map((c) => (
          <tr key={`${c.name}-${c.permission}`}>
            <td>{c.name}</td>
            <td>{c.permission}</td>
            <td>{c.description}</td>
            <td>{c.arguments}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
