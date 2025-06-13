"use client";

import React, { useEffect, useState, useRef } from "react";

interface Command {
  name: string;
  permission: string;
  description: string;
  arguments: string;
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
      .then((data) => {
       
        if (!Array.isArray(data)) {
          console.error("Expected array of commands, got:", typeof data);
          setError("Invalid data format received from server");
          return;
        }
        
       
        const processedCommands = data.map((cmd: any) => {
         
          const permission = Array.isArray(cmd.permissions) && cmd.permissions.length > 0 
            ? cmd.permissions[0] 
            : "-";
            
          const description = Array.isArray(cmd.descriptions) && cmd.descriptions.length > 0 
            ? cmd.descriptions[0] 
            : "-";
            
          const args = Array.isArray(cmd.arguments) && cmd.arguments.length > 0 
            ? cmd.arguments.join(", ") 
            : "-";
            
          return {
            name: cmd.name || "Unknown",
            permission,
            description,
            arguments: args
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

  if (loading) return <div>Loading commands…</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!commands.length) return <div>No commands found.</div>;

  return (
    <div className="overflow-x-auto" ref={tableRef} style={{ display: 'block !important', opacity: '1 !important' }}>
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
              <td className="border px-4 py-2 font-semibold whitespace-normal break-words">{c.name}</td>
              <td className="border px-4 py-2 whitespace-normal break-words">{c.permission}</td>
              <td className="border px-4 py-2 whitespace-normal break-words">{c.description}</td>
              <td className="border px-4 py-2 whitespace-normal break-words">{c.arguments}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
