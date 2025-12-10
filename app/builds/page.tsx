"use client";

import { format } from "date-fns";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Download, GitBranch, Loader2, Package } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { fetchDevBuilds, fetchStableBuilds, PROJECTS, type Project } from "@/app/api/builds/builds";
import { Button } from "@/components/ui/button";
import { Dropdown } from "@/components/ui/dropdown";
import { FacadePattern } from "@/components/ui/facade-pattern";
import { FadeIn } from "@/components/ui/motion/MotionComponents";

interface Build {
  id: string;
  name: string;
  type: "STABLE" | "DEV";
  date: string;
  downloadUrl: string;
  version?: string;
  commit?: string;
  runUrl?: string;
}

function BuildExplorerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const projectIdParam = searchParams.get("project");
  const initialProject = PROJECTS.find((p) => p.id === projectIdParam) || PROJECTS[0];

  const [activeProject, setActiveProject] = useState<Project>(initialProject);
  const [activeTab, setActiveTab] = useState<"STABLE" | "DEV">("STABLE");
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastDownloadedId, setLastDownloadedId] = useState<string | null>(null);

  useEffect(() => {
    const p = PROJECTS.find((p) => p.id === projectIdParam);
    if (p && p.id !== activeProject.id) {
      setActiveProject(p);
    }
  }, [projectIdParam, activeProject.id]);

  useEffect(() => {
    const stored = localStorage.getItem(`last_download_${activeProject.id}`);
    setLastDownloadedId(stored);
  }, [activeProject.id]);

  const handleProjectChange = (projectId: string) => {
    const project = PROJECTS.find((p) => p.id === projectId);
    if (!project) return;

    setActiveProject(project);
    const params = new URLSearchParams(searchParams.toString());
    params.set("project", project.id);
    router.push(`/builds?${params.toString()}`);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setBuilds([]); // Clear previous builds
      try {
        if (activeTab === "STABLE") {
          const data = await fetchStableBuilds(activeProject);
          setBuilds(
            data.map((version) => ({
              id: version.id,
              name: version.name,
              type: "STABLE",
              date: version.date_published,
              downloadUrl: version.files?.[0]?.url || "#",
              version: version.version_number,
            }))
          );
        } else {
          const runs = await fetchDevBuilds(activeProject);
          setBuilds(
            runs.map((run) => {
              const displayTitle = run.display_title;
              const artifactName = `${activeProject.name} Dev Build`; // Heuristic name, usually

              return {
                id: run.id.toString(),
                name: displayTitle || run.name || `Run #${run.id}`,
                type: "DEV",
                date: run.created_at,
                downloadUrl: `https://nightly.link/${activeProject.githubRepo}/actions/runs/${run.id}/${encodeURIComponent(artifactName)}.zip`,
                commit: run.head_sha.substring(0, 7),
                runUrl: run.html_url,
              };
            })
          );
        }
      } catch (e) {
        console.error("Failed to load builds", e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [activeTab, activeProject]);

  const projectOptions = PROJECTS.map((p) => ({
    value: p.id,
    label: p.name,
    icon: <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />,
  }));

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 text-gray-900 selection:bg-blue-500/30 dark:bg-gray-950 dark:text-white">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="-left-20 absolute top-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl filter dark:bg-blue-500/5" />
        <div className="-right-20 absolute top-40 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl filter dark:bg-indigo-500/5" />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-[500px] w-[500px] rounded-full bg-purple-500/5 blur-3xl filter" />
        <FacadePattern className="absolute inset-0 opacity-40 dark:opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-56 pb-20 md:pt-40 md:pb-32">
        <div className="mb-12 text-center">
          <FadeIn>
            <h1 className="mb-4 bg-linear-to-r from-gray-900 via-blue-800 to-indigo-900 bg-clip-text font-extrabold text-4xl text-transparent dark:from-white dark:via-blue-100 dark:to-indigo-200">
              Build Explorer
            </h1>
            <p className="mx-auto mb-8 max-w-lg text-gray-600 dark:text-gray-400">
              Access stable releases and development builds for all our projects.
            </p>
          </FadeIn>
        </div>

        {/* Controls Grid */}
        <FadeIn className="relative z-20 mx-auto mb-10 max-w-2xl" delay={0.2}>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Project Selector - Left */}
            <div className="relative z-20">
              <Dropdown
                buttonClassName="h-[46px]"
                className="h-full w-full"
                onChange={handleProjectChange}
                options={projectOptions}
                value={activeProject.id} // Ensure height matches tabs
              />
            </div>

            {/* Tabs - Right */}
            <div className="flex h-[46px] rounded-xl border border-gray-200 bg-white/70 p-1 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/40">
              <button
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg font-medium text-sm transition-all ${
                  activeTab === "STABLE"
                    ? "bg-white text-blue-600 shadow-xs dark:bg-gray-800 dark:text-blue-400"
                    : "text-gray-500 hover:bg-gray-100/50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white"
                }`}
                onClick={() => setActiveTab("STABLE")}
                type="button"
              >
                <Package className="h-4 w-4" />
                Stable
              </button>
              <button
                className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg font-medium text-sm transition-all ${
                  activeTab === "DEV"
                    ? "bg-white text-blue-600 shadow-xs dark:bg-gray-800 dark:text-blue-400"
                    : "text-gray-500 hover:bg-gray-100/50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800/50 dark:hover:text-white"
                }`}
                onClick={() => setActiveTab("DEV")}
                type="button"
              >
                <GitBranch className="h-4 w-4" />
                Dev Builds
              </button>
            </div>
          </div>
        </FadeIn>

        {/* Table */}
        <div className="min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center gap-4 py-20 text-gray-400">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p>Fetching builds for {activeProject.name}...</p>
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
                          <motion.tr
                            animate={{ opacity: 1, y: 0 }}
                            className="group transition-colors hover:bg-white dark:hover:bg-gray-800/50"
                            exit={{ opacity: 0, y: -3 }}
                            initial={{ opacity: 0, y: 3 }}
                            key={build.id}
                            transition={{ duration: 0.15, delay: i * 0.02 }}
                          >
                            <td className="px-4 py-3 font-medium text-gray-900 md:px-6 dark:text-white">
                              <div className="flex items-center gap-3">
                                <div
                                  className={`hidden shrink-0 rounded-lg p-2 sm:flex ${
                                    build.type === "STABLE"
                                      ? "bg-green-100 text-green-600 dark:bg-green-900/20 dark:text-green-400"
                                      : "bg-orange-100 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400"
                                  }`}
                                >
                                  {build.type === "STABLE" ? (
                                    <Package className="h-4 w-4" />
                                  ) : (
                                    <GitBranch className="h-4 w-4" />
                                  )}
                                </div>
                                <div className="flex min-w-0 flex-col">
                                  {build.runUrl ? (
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                                      <a
                                        className="block max-w-[150px] truncate hover:underline sm:max-w-xs md:max-w-md"
                                        href={build.runUrl}
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        title={build.name}
                                      >
                                        {build.name}
                                      </a>
                                      {lastDownloadedId === build.id && (
                                        <span className="inline-flex w-fit shrink-0 items-center rounded-md bg-blue-50 px-2 py-0.5 font-medium text-[10px] text-blue-700 ring-1 ring-blue-700/10 ring-inset sm:text-xs dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/30">
                                          Last Downloaded
                                        </span>
                                      )}
                                    </div>
                                  ) : (
                                    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                                      <span
                                        className="block max-w-[150px] truncate sm:max-w-xs md:max-w-md"
                                        title={build.name}
                                      >
                                        {build.name}
                                      </span>
                                      {lastDownloadedId === build.id && (
                                        <span className="inline-flex w-fit shrink-0 items-center rounded-md bg-blue-50 px-2 py-0.5 font-medium text-[10px] text-blue-700 ring-1 ring-blue-700/10 ring-inset sm:text-xs dark:bg-blue-900/30 dark:text-blue-400 dark:ring-blue-400/30">
                                          Last Downloaded
                                        </span>
                                      )}
                                    </div>
                                  )}

                                  {/* Mobile Meta (Date/Commit) */}
                                  <div className="mt-1 flex items-center gap-2 text-gray-500 text-xs md:hidden dark:text-gray-400">
                                    <span className="flex items-center gap-1">
                                      <Calendar className="h-3 w-3" />
                                      {build.date && !Number.isNaN(new Date(build.date).getTime())
                                        ? format(new Date(build.date), "MMM d")
                                        : "Unknown"}
                                    </span>
                                    {build.commit && (
                                      <>
                                        <span>•</span>
                                        <span className="font-mono">{build.commit}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="hidden whitespace-nowrap px-6 py-3 text-gray-600 md:table-cell dark:text-gray-400">
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-gray-400" />
                                {build.date && !Number.isNaN(new Date(build.date).getTime())
                                  ? format(new Date(build.date), "MMM d, yyyy HH:mm")
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
                                  className="h-8 px-3 text-xs sm:h-9 sm:px-4 sm:text-sm"
                                  href={build.downloadUrl}
                                  leftIcon={<Download className="h-3 w-3 sm:h-4 sm:w-4" />}
                                  onClick={() => {
                                    localStorage.setItem(
                                      `last_download_${activeProject.id}`,
                                      build.id
                                    );
                                    setLastDownloadedId(build.id);
                                  }}
                                  rel="noopener noreferrer"
                                  size="sm"
                                  target="_blank"
                                  variant="primary"
                                >
                                  <span className="hidden sm:inline">Download</span>
                                  <span className="sm:hidden">Get</span>
                                </Button>
                              </div>
                            </td>
                          </motion.tr>
                        ))
                      )}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function BuildExplorerPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      }
    >
      <BuildExplorerContent />
    </Suspense>
  );
}
