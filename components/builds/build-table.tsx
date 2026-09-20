"use client";

import { m, useReducedMotion } from "framer-motion";
import { Loader2, Package } from "lucide-react";
import { easeOut } from "@/lib/animations/variants";
import type { BuildTab, Project } from "@/lib/builds/projects";
import { type Build, BuildRow } from "./build-row";

interface BuildTableProps {
  loading: boolean;
  builds: Build[];
  project: Project;
  channel: BuildTab;
  lastDownloadedId: string | null;
  onDownload: (id: string) => void;
}

export function BuildTable({
  loading,
  builds,
  project,
  channel,
  lastDownloadedId,
  onDownload,
}: BuildTableProps) {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? false : { opacity: 0, y: 28 };
  const listKey = `${project.id}-${channel}`;

  return (
    <m.section
      aria-live="polite"
      className="builds-list"
      id="builds-results"
      initial={initial}
      transition={{ ...easeOut, duration: 0.6, delay: 0.3 }}
      viewport={{ once: true }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <header className="builds-list-heading">
        <div>
          <p>{channel === "STABLE" ? "Stable releases" : "Development builds"}</p>
          <h2>{project.name}</h2>
        </div>
        {!loading && <span>{builds.length} available</span>}
      </header>
      {loading ? (
        <output className="builds-loading">
          <Loader2 aria-hidden="true" />
          <p>Fetching builds for {project.name}…</p>
        </output>
      ) : (
        <div className="builds-list-scroll">
          <table>
            <thead>
              <tr>
                <th scope="col">Build</th>
                <th scope="col">Published</th>
                <th scope="col">Commit</th>
                <th scope="col">
                  <span className="sr-only">Download</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {builds.length === 0 ? (
                <tr>
                  <td colSpan={4}>
                    <div className="builds-empty">
                      <Package aria-hidden="true" />
                      <div>
                        <strong>No builds found</strong>
                        <p>No {project.name} builds in this channel yet.</p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                builds.map((build, index) => (
                  <BuildRow
                    build={build}
                    index={index}
                    key={`${listKey}-${build.id}`}
                    lastDownloadedId={lastDownloadedId}
                    onDownload={onDownload}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </m.section>
  );
}
