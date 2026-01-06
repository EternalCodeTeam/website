import type { Project } from "@/app/api/builds/builds";
import { AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import { type Build, BuildRow } from "./build-row";

type BuildTableProps = {
  loading: boolean;
  builds: Build[];
  project: Project;
  lastDownloadedId: string | null;
  onDownload: (id: string) => void;
};

export function BuildTable({
  loading,
  builds,
  project,
  lastDownloadedId,
  onDownload,
}: BuildTableProps) {
  return (
    <div className="min-h-[400px]">
      {loading ? (
        <div className="flex flex-col items-center justify-center gap-4 py-20 text-gray-400">
          <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
          <p>Fetching builds for {project.name}...</p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white/60 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/40">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse whitespace-nowrap text-left text-sm md:whitespace-normal">
              <thead className="border-gray-200 border-b bg-gray-50/50 text-gray-900 dark:border-gray-800 dark:bg-gray-900/50 dark:text-gray-100">
                <tr>
                  <th className="w-full px-4 py-4 font-semibold md:w-auto md:px-6">Name</th>
                  <th className="hidden px-6 py-4 font-semibold text-gray-500 md:table-cell dark:text-gray-400">
                    Date
                  </th>
                  <th className="hidden px-6 py-4 font-semibold text-gray-500 lg:table-cell dark:text-gray-400">
                    Ref
                  </th>
                  <th className="px-4 py-4 text-right font-semibold md:px-6">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                <AnimatePresence>
                  {builds.length === 0 ? (
                    <tr>
                      <td className="px-6 py-12 text-center text-gray-500" colSpan={4}>
                        No builds found for this project.
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
