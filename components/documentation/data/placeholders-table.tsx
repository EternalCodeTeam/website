"use client";

import { Search } from "lucide-react";
import { useState } from "react";

import type { PlaceholderReference } from "@/lib/documentation/eternalcore-data";

export function PlaceholdersTable({
  placeholders,
}: {
  readonly placeholders: PlaceholderReference[];
}) {
  const [query, setQuery] = useState("");
  const normalizedQuery = query.trim().toLocaleLowerCase();
  const filtered = normalizedQuery
    ? placeholders.filter((placeholder) =>
        `${placeholder.name} ${placeholder.description} ${placeholder.category}`
          .toLocaleLowerCase()
          .includes(normalizedQuery)
      )
    : placeholders;

  return (
    <div className="docs-reference">
      <label className="docs-reference-search">
        <Search aria-hidden="true" size={17} />
        <input
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter placeholders…"
          type="search"
          value={query}
        />
        <span>{filtered.length} results</span>
      </label>
      <section aria-label="Placeholders" className="docs-table-wrap">
        <table>
          <thead>
            <tr>
              <th>Placeholder</th>
              <th>Description</th>
              <th>Category</th>
              <th>Returns</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((placeholder) => (
              <tr key={placeholder.name}>
                <td>
                  <code>{placeholder.name}</code>
                </td>
                <td>{placeholder.description}</td>
                <td>{placeholder.category}</td>
                <td>
                  {placeholder.returnType}
                  {placeholder.requiresPlayer ? " · player" : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      {filtered.length === 0 ? (
        <p className="docs-reference-empty">No placeholders match “{query}”.</p>
      ) : null}
    </div>
  );
}
