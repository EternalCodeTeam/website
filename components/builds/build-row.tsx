"use client";

import { m } from "framer-motion";
import { Calendar, Download, GitBranch, Package } from "lucide-react";
import { easeOut } from "@/lib/animations/variants";

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
    <span className={`build-kind build-kind-${type.toLowerCase()}`}>
      {type === "STABLE" ? <Package aria-hidden="true" /> : <GitBranch aria-hidden="true" />}
    </span>
  );
}

function BuildName({ build, isLastDownloaded }: { build: Build; isLastDownloaded: boolean }) {
  return (
    <div className="build-name">
      {build.runUrl ? (
        <a
          aria-label={`View details for ${build.name}`}
          href={build.runUrl}
          rel="noopener noreferrer"
          target="_blank"
          title={build.name}
        >
          {build.name}
        </a>
      ) : (
        <span title={build.name}>{build.name}</span>
      )}
      {isLastDownloaded ? <span className="build-last-downloaded">Recent</span> : null}
    </div>
  );
}

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
const fullDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
});

function getBuildDate(date: string, compact = false) {
  if (!date || Number.isNaN(new Date(date).getTime())) {
    return compact ? "Unknown" : "Unknown date";
  }
  return (compact ? dateFormatter : fullDateFormatter).format(new Date(date));
}

export function BuildRow({ build, index, lastDownloadedId, onDownload }: BuildRowProps) {
  const available = !!build.downloadUrl && build.downloadUrl !== "#";

  return (
    <m.tr
      animate={{
        opacity: 1,
        y: 0,
        transition: { ...easeOut, duration: 0.4, delay: Math.min(index, 10) * 0.045 },
      }}
      className="build-row"
      initial={{ opacity: 0, y: 14 }}
    >
      <th scope="row">
        <div className="build-primary">
          <BuildStatusBadge type={build.type} />
          <div className="build-version">
            <BuildName build={build} isLastDownloaded={lastDownloadedId === build.id} />
            {build.version && build.version !== build.name ? <span>{build.version}</span> : null}
            <div className="build-mobile-meta">
              <span>
                <Calendar aria-hidden="true" /> {getBuildDate(build.date, true)}
              </span>
              {build.commit ? (
                <>
                  <span>·</span>
                  <code>{build.commit}</code>
                </>
              ) : null}
            </div>
          </div>
        </div>
      </th>
      <td className="build-date">
        <Calendar aria-hidden="true" /> {getBuildDate(build.date)}
      </td>
      <td className="build-commit">
        {build.commit ? <code>{build.commit}</code> : <span>—</span>}
      </td>
      <td className="build-action">
        {available ? (
          <m.a
            aria-label={`Download ${build.name}`}
            className="build-download"
            href={build.downloadUrl}
            onClick={() => onDownload(build.id)}
            rel="noopener noreferrer"
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download aria-hidden="true" />
            <span>Download</span>
          </m.a>
        ) : (
          <span className="build-unavailable">Unavailable</span>
        )}
      </td>
    </m.tr>
  );
}
