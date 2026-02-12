"use client";

import { AnimatePresence } from "framer-motion";
import { Loader2, Package } from "lucide-react";
import type { Project } from "@/app/api/builds/builds";
import { useSpotlight } from "@/hooks/use-spotlight";
import { type Build, BuildRow } from "./build-row";

interface BuildTableProps {
  loading: boolean;
  builds: Build[];
  project: Project;
  lastDownloadedId: string | null;
  onDownload: (id: string) => void;
}

export function BuildTable({
  loading,
  builds,
  project,
  lastDownloadedId,
  onDownload,
}: BuildTableProps) {
  const spotlight = useSpotlight<HTMLDivElement>();

  return (
    <div className="min-h-[400px]">
      {loading ? (
        <output
          aria-live="polite"
          className="flex flex-col items-center justify-center gap-4 py-32 text-gray-400"
        >
          <Loader2 className="h-8 w-8 animate-spin text-blue-500 motion-reduce:animate-none" />
          <p className="animate-pulse font-medium text-sm">Fetching builds for {project.name}…</p>
        </output>
      ) : (
        <div
          className="spotlight-card relative overflow-hidden rounded-xl border border-gray-200 bg-white/60 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/40"
          onPointerLeave={spotlight.onPointerLeave}
          onPointerMove={spotlight.onPointerMove}
        >
          <div className="overflow-x-auto">
            <table className="w-full border-collapse whitespace-nowrap text-left text-sm md:whitespace-normal">
              <thead className="border-gray-200 border-b bg-gray-50/50 text-gray-900 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-100">
                <tr>
                  <th className="w-full px-4 py-4 font-semibold md:w-auto md:px-6" scope="col">
                    Name
                  </th>
                  <th
                    className="hidden px-6 py-4 font-semibold text-gray-500 md:table-cell dark:text-gray-400"
                    scope="col"
                  >
                    Date
                  </th>
                  <th
                    className="hidden px-6 py-4 font-semibold text-gray-500 lg:table-cell dark:text-gray-400"
                    scope="col"
                  >
                    Ref
                  </th>
                  <th className="px-4 py-4 text-right font-semibold md:px-6" scope="col">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <AnimatePresence mode="wait">
                  {builds.length === 0 ? (
                    <tr>
                      <td className="px-6 py-20 text-center text-gray-500" colSpan={4}>
                        <div className="flex flex-col items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800/50">
                            <Package className="h-6 w-6 text-gray-400 opacity-50" />
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium text-gray-900 text-lg dark:text-gray-200">
                              No builds found
                            </p>
                            <p className="text-gray-500 text-sm dark:text-gray-400">
                              No {project.name} builds available in this category.
                            </p>
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    builds.map((build, i) => (
                      <BuildRow
                        build={build}
                        index={i}
                        key={build.id}
                        lastDownloadedId={lastDownloadedId}
                        onDownload={onDownload}
                      />
                    ))
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
