"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { fetchDevBuilds, fetchStableBuilds, PROJECTS, type Project } from "@/app/api/builds/builds";
import { BuildControls } from "@/components/builds/build-controls";
import { BuildHeader } from "@/components/builds/build-header";
import type { Build } from "@/components/builds/build-row";
import { BuildTable } from "@/components/builds/build-table";
import { Button } from "@/components/ui/button";
import { FacadePattern } from "@/components/ui/facade-pattern";

function BuildExplorerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const projectIdParam = searchParams.get("project");
  const initialProject = PROJECTS.find((p) => p.id === projectIdParam) || PROJECTS[0];

  const [activeProject, setActiveProject] = useState<Project>(initialProject);
  const [activeTab, setActiveTab] = useState<"STABLE" | "DEV">("STABLE");
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDownloadedId, setLastDownloadedId] = useState<string | null>(null);

  useEffect(() => {
    const foundProject = PROJECTS.find((p) => p.id === projectIdParam);
    if (foundProject && foundProject.id !== activeProject.id) {
      setActiveProject(foundProject);
    }
  }, [projectIdParam, activeProject.id]);

  useEffect(() => {
    const stored = localStorage.getItem(`last_download_${activeProject.id}`);
    setLastDownloadedId(stored);
  }, [activeProject.id]);

  const handleProjectChange = useCallback(
    (projectId: string) => {
      const project = PROJECTS.find((p) => p.id === projectId);
      if (!project) {
        return;
      }

      setActiveProject(project);
      const params = new URLSearchParams(searchParams.toString());
      params.set("project", project.id);
      router.push(`/builds?${params.toString()}`);
    },
    [searchParams, router]
  );

  const retryFetch = useCallback(() => {
    setError(null);
    setLoading(true);
  }, []);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null);
      setBuilds([]);
      try {
        const data =
          activeTab === "STABLE"
            ? await fetchStableBuilds(activeProject)
            : await fetchDevBuilds(activeProject);

        setBuilds(
          data.map((version) => {
            const primaryFile = version.files.find((f) => f.primary) || version.files[0];
            return {
              id: version.id,
              name: version.name,
              type: activeTab,
              date: version.date_published,
              downloadUrl: primaryFile?.url || "",
              version: version.version_number,
              runUrl: activeProject.modrinthId
                ? `https://modrinth.com/project/${activeProject.modrinthId}/version/${version.id}`
                : undefined,
            };
          })
        );
      } catch (e) {
        console.error("Failed to load builds", e);
        setError("Failed to load builds. Please check your connection and try again.");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [activeTab, activeProject]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 text-gray-900 selection:bg-blue-500/30 dark:bg-gray-950 dark:text-white">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-blue-500/10 blur-2xl filter dark:bg-blue-500/5 dark:blur-3xl" />
        <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-2xl filter dark:bg-indigo-500/5 dark:blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-2xl filter dark:blur-3xl" />
        <FacadePattern className="absolute inset-0 h-full opacity-30 dark:opacity-10" />
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 pt-32 pb-20 md:pt-40 md:pb-32">
        <BuildHeader />

        <BuildControls
          activeProject={activeProject}
          activeTab={activeTab}
          onProjectChange={handleProjectChange}
          onTabChange={setActiveTab}
          projects={PROJECTS}
        />

        {error && (
          <div
            className="mb-6 rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-900/50 dark:bg-red-900/10"
            role="alert"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
              <div className="flex-1">
                <h3 className="mb-1 font-semibold text-red-900 dark:text-red-200">
                  Error Loading Builds
                </h3>
                <p className="mb-3 text-red-700 text-sm dark:text-red-300">{error}</p>
                <Button onClick={retryFetch} size="sm" variant="secondary">
                  Try Again
                </Button>
              </div>
            </div>
          </div>
        )}

        <BuildTable
          builds={builds}
          lastDownloadedId={lastDownloadedId}
          loading={loading}
          onDownload={(id) => {
            localStorage.setItem(`last_download_${activeProject.id}`, id);
            setLastDownloadedId(id);
          }}
          project={activeProject}
        />
      </div>
    </div>
  );
}

export default function BuildExplorerPage() {
  return (
    <Suspense
      fallback={
        <div className="grid min-h-screen place-items-center">
          <Loader2 className="h-8 w-8 animate-spin text-gray-500 motion-reduce:animate-none" />
        </div>
      }
    >
      <BuildExplorerContent />
    </Suspense>
  );
}
