"use client";

import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { fetchDevBuilds, fetchStableBuilds, PROJECTS, type Project } from "@/app/api/builds/builds";
import { BuildControls } from "@/components/builds/build-controls";
import { BuildHeader } from "@/components/builds/build-header";
import type { Build } from "@/components/builds/build-row";
import { BuildTable } from "@/components/builds/build-table";
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

  const handleProjectChange = (projectId: string) => {
    const project = PROJECTS.find((p) => p.id === projectId);
    if (!project) {
      return;
    }

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
              downloadUrl: version.files?.[0]?.url || "",
              version: version.version_number,
            }))
          );
        } else {
          const runs = await fetchDevBuilds(activeProject);
          setBuilds(
            runs.map((run) => {
              const displayTitle = run.display_title;
              const artifactName = run.found_artifact?.name || `${activeProject.name} Dev Build`;

              return {
                id: run.id.toString(),
                name: displayTitle || run.name || `Run #${run.id}`,
                type: "DEV",
                date: run.created_at,
                downloadUrl: `https://nightly.link/${
                  activeProject.githubRepo
                }/actions/runs/${run.id}/${encodeURIComponent(artifactName)}.zip`,
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-50 text-gray-900 selection:bg-blue-500/30 dark:bg-gray-950 dark:text-white">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl filter dark:bg-blue-500/5" />
        <div className="absolute top-40 -right-20 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl filter dark:bg-indigo-500/5" />
        <div className="absolute top-1/2 left-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/5 blur-3xl filter" />
        <FacadePattern className="absolute inset-0 opacity-40 dark:opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 pt-56 pb-20 md:pt-40 md:pb-32">
        <BuildHeader />

        <BuildControls
          activeProject={activeProject}
          activeTab={activeTab}
          onProjectChange={handleProjectChange}
          onTabChange={setActiveTab}
          projects={PROJECTS}
        />

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
          <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
        </div>
      }
    >
      <BuildExplorerContent />
    </Suspense>
  );
}
