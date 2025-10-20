"use client";

import { AnimatePresence, motion } from "framer-motion";

import { type Placeholder } from "@/components/docs/eternalcore/placeholder/types";
import { cn } from "@/lib/utils";

interface PlaceholderTableProps {
  placeholders: Placeholder[];
}

export function PlaceholderTable({ placeholders }: PlaceholderTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg">
      <table className="w-ful text-left text-sm">
        <thead className="bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100">
          <tr>
            {["Placeholder", "Description", "Example", "Type", "Category", "Player Context"].map(
              (header) => (
                <th key={header} className="px-4 py-3 font-semibold">
                  {header}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          <AnimatePresence>
            {placeholders.map((p, i) => (
              <motion.tr
                key={p.name}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.2, delay: i * 0.01 }}
                className="hover:bg-gray-50 dark:hover:bg-gray-900/50"
              >
                <td className="px-4 py-2 font-mono text-blue-600 dark:text-blue-400">{p.name}</td>
                <td className="px-4 py-2 text-gray-600 dark:text-gray-300">{p.description}</td>
                <td className="px-4 py-2 font-mono text-green-600 dark:text-green-400">
                  {p.example}
                </td>
                <td className="px-4 py-2">
                  <span className="rounded bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700 dark:bg-purple-900/30 dark:text-purple-300">
                    {p.returnType}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className="rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                    {p.category}
                  </span>
                </td>
                <td className="px-4 py-2 text-center">
                  <span
                    className={cn(
                      "rounded px-2 py-0.5 text-xs font-medium",
                      p.requiresPlayer
                        ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300"
                        : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
                    )}
                  >
                    {p.requiresPlayer ? "Required" : "Optional"}
                  </span>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
        </tbody>
      </table>
    </div>
  );
}
