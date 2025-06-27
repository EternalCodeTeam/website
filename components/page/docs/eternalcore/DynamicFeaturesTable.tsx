"use client";

import React, { useEffect, useState } from "react";

import TableWrapper from "../table/TableWrapper";

interface RawFeature {
  name?: string;
  permissions?: string[];
  descriptions?: string[];
}

interface Feature {
  name: string;
  permission: string;
  description: string[];
}

export default function DynamicFeaturesTable() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/EternalCodeTeam/EternalCore/refs/heads/master/raw_features_docs.json"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch features");
        return res.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          console.error("Expected array of features, got:", typeof data);
          setError("Invalid data formatting received from server");
          return;
        }

        const processedFeatures = data.map((feature: RawFeature) => {
          const permission =
            Array.isArray(feature.permissions) && feature.permissions.length > 0
              ? feature.permissions[0]
              : "-";

          const descriptions =
            Array.isArray(feature.descriptions) && feature.descriptions.length > 0
              ? feature.descriptions
              : ["-"];

          return {
            name: feature.name || "Unknown",
            permission,
            description: descriptions,
          };
        });

        setFeatures(processedFeatures);
      })
      .catch((e) => {
        console.error("Error fetching features:", e);
        setError((e as Error).message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading features…</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!features.length) return <div>No features found.</div>;

  return (
    <TableWrapper id="dynamic-features-table" className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Permission</th>
            <th className="border px-4 py-2">Description</th>
          </tr>
        </thead>
        <tbody>
          {features.map((f, i) => (
            <tr key={i}>
              <td className="whitespace-normal break-words border px-4 py-2 font-semibold">
                {f.name}
              </td>
              <td className="whitespace-normal break-words border px-4 py-2">{f.permission}</td>
              <td className="border px-4 py-2">
                {f.description.map((d: string, j: number) => (
                  <div key={j} className="mb-1 whitespace-normal break-words">
                    {d}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </TableWrapper>
  );
}
