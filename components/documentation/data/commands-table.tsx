"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import type { CommandReference } from "@/lib/documentation/eternalcore-data";

export function CommandsTable({ commands }: { readonly commands: CommandReference[] }) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filtered = normalizedQuery
    ? commands.filter((command) =>
        `${command.name} ${command.permission} ${command.description} ${command.arguments}`
          .toLocaleLowerCase()
          .includes(normalizedQuery)
      )
    : commands;

  return (
    <div className="docs-reference">
      <label className="docs-reference-search">
        <Search aria-hidden="true" size={17} />
        <input
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter commands or permissions…"
          type="search"
          value={query}
        />
        <span>{filtered.length} results</span>
      </label>
      <section aria-label="Commands and permissions" className="docs-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Command / permission</th>
              <th>Description</th>
              <th>Permission</th>
              <th>Arguments</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((command) => (
              <tr key={`${command.name}-${command.permission}`}>
                <td>
                  <code>{command.name}</code>
                </td>
                <td>{command.description}</td>
                <td>
                  <code>{command.permission}</code>
                </td>
                <td>
                  <code>{command.arguments}</code>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {filtered.length === 0 ? (
        <p className="docs-reference-empty">No commands match “{query}”.</p>
      ) : null}
    </div>
  );
}
