import { motion, type Variants } from "framer-motion";
import { Calendar, Download, GitBranch, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export interface Build {
  id: string;
  name: string;
  type: "STABLE" | "DEV";
  date: string;
  downloadUrl: string;
  version?: string;
  commit?: string;
  runUrl?: string;
}

interface BuildRowProps {
  build: Build;
  index: number;
  lastDownloadedId: string | null;
  onDownload: (id: string) => void;
}

function BuildStatusBadge({ type }: { type: "STABLE" | "DEV" }) {
  return (
    <div
      className={`hidden shrink-0 rounded-lg p-2 sm:flex ${
        type === "STABLE"
          ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
          : "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
      }`}
    >
      {type === "STABLE" ? <Package className="h-4 w-4" /> : <GitBranch className="h-4 w-4" />}
    </div>
  );
}

function BuildName({ build, isLastDownloaded }: { build: Build; isLastDownloaded: boolean }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
      {build.runUrl ? (
        <a
          aria-label={`View details for ${build.name}`}
          className="block max-w-[90%] truncate hover:underline sm:max-w-xs md:max-w-md"
          href={build.runUrl}
          rel="noopener noreferrer"
          target="_blank"
          title={build.name}
        >
          {build.name}
        </a>
      ) : (
        <span className="block max-w-[90%] truncate sm:max-w-xs md:max-w-md" title={build.name}>
          {build.name}
        </span>
      )}
      {isLastDownloaded ? (
        <span className="inline-flex w-fit shrink-0 items-center rounded-md bg-blue-50 px-2 py-0.5 font-medium text-[10px] text-blue-700 ring-1 ring-blue-700/10 ring-inset sm:text-xs dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/30">
          Last Downloaded
        </span>
      ) : null}
    </div>
  );
}

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
});

const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
});

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.2,
      ease: "easeOut",
    },
  }),
  exit: { opacity: 0, y: -5, transition: { duration: 0.1 } },
};

export function BuildRow({ build, index, lastDownloadedId, onDownload }: BuildRowProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.tr
      animate={prefersReducedMotion ? undefined : "visible"}
      className="group transition-colors hover:bg-white dark:hover:bg-gray-800/50"
      custom={index}
      exit={prefersReducedMotion ? undefined : "exit"}
      initial={prefersReducedMotion ? undefined : "hidden"}
      layoutId={build.id}
      variants={prefersReducedMotion ? undefined : rowVariants}
    >
      <th
        className="px-4 py-3 text-left font-medium text-gray-900 md:px-6 dark:text-white"
        scope="row"
      >
        <div className="flex items-center gap-3">
          <BuildStatusBadge type={build.type} />
          <div className="flex min-w-0 flex-col">
            <BuildName build={build} isLastDownloaded={lastDownloadedId === build.id} />
            {/* Mobile Meta (Date/Commit) */}
            <div className="mt-1 flex items-center gap-2 text-gray-500 text-xs md:hidden dark:text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                {!!build.date && !Number.isNaN(new Date(build.date).getTime())
                  ? dateFormatter.format(new Date(build.date))
                  : "Unknown"}
              </span>
              {!!build.commit && (
                <>
                  <span>•</span>
                  <span className="font-mono">{build.commit}</span>
                </>
              )}
            </div>
          </div>
        </div>
      </th>
      <td className="hidden whitespace-nowrap px-6 py-3 text-gray-600 md:table-cell dark:text-gray-400">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-gray-400" />
          {!!build.date && !Number.isNaN(new Date(build.date).getTime())
            ? fullDateFormatter.format(new Date(build.date))
            : "Unknown Date"}
        </div>
      </td>
      <td className="hidden px-6 py-3 lg:table-cell">
        {build.commit ? (
          <code className="rounded-md border border-gray-200 bg-gray-100 px-2 py-1 font-mono text-gray-600 text-xs dark:border-gray-700/50 dark:bg-gray-800 dark:text-gray-300">
            {build.commit}
          </code>
        ) : (
          <span className="text-gray-400">-</span>
        )}
      </td>
      <td className="px-4 py-3 text-right md:px-6">
        <div className="flex justify-end">
          <Button
            aria-label={`Download ${build.name}`}
            className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
            disabled={!build.downloadUrl || build.downloadUrl === "#"}
            href={build.downloadUrl && build.downloadUrl !== "#" ? build.downloadUrl : undefined}
            leftIcon={
              !build.downloadUrl || build.downloadUrl === "#" ? undefined : (
                <Download className="h-3 w-3 sm:h-4 sm:w-4" />
              )
            }
            onClick={() => {
              if (!!build.downloadUrl && build.downloadUrl !== "#") {
                onDownload(build.id);
              }
            }}
            rel="noopener noreferrer"
            size="sm"
            target="_blank"
            variant="primary"
          >
            {!build.downloadUrl || build.downloadUrl === "#" ? (
              <span className="hidden sm:inline">Not Available</span>
            ) : (
              <span>Download</span>
            )}
          </Button>
        </div>
      </td>
    </motion.tr>
  );
}
