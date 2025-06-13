"use client";

import React, { useEffect, useState, useRef } from "react";

interface Feature {
  name: string;
  permission?: string;
  description: string[];
}

export default function DynamicFeaturesTable() {
  const [features, setFeatures] = useState<Feature[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/EternalCodeTeam/EternalCore/refs/heads/master/raw_features_docs.json"
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch features");
        return res.json();
      })
      .then((data) => setFeatures(data as Feature[]))
      .catch((e) => setError((e as Error).message))
      .finally(() => setLoading(false));
  }, []);

 
  useEffect(() => {
    if (tableRef.current) {
     
      const timer = setTimeout(() => {
        if (tableRef.current) {
         
          tableRef.current.style.visibility = 'hidden';
          setTimeout(() => {
            if (tableRef.current) {
              tableRef.current.style.visibility = 'visible';
            }
          }, 50);
        }
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) return <div>Loading features…</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!features.length) return <div>No features found.</div>;

  return (
    <div className="overflow-x-auto" ref={tableRef} style={{ display: 'block !important', opacity: '1 !important' }}>
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
              <td className="border px-4 py-2 font-semibold">{f.name}</td>
              <td className="border px-4 py-2">{f.permission || "-"}</td>
              <td className="border px-4 py-2">
                {Array.isArray(f.description)
                  ? f.description.map((d, j) => <div key={j}>{d}</div>)
                  : f.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
