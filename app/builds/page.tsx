"use client";

import { AlertCircle, Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import { BuildControls } from "@/components/builds/build-controls";
import { BuildHeader } from "@/components/builds/build-header";
import type { Build } from "@/components/builds/build-row";
import { BuildTable } from "@/components/builds/build-table";
import { type BuildTab, PROJECTS, type Project } from "@/lib/builds/projects";

function BuildExplorerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const projectIdParam = searchParams.get("project");
  const initialProject = PROJECTS.find((p) => p.id === projectIdParam) || PROJECTS[0];
  const channelParam = searchParams.get("channel");
  const initialTab: BuildTab = channelParam?.toUpperCase() === "DEV" ? "DEV" : "STABLE";

  const [activeProject, setActiveProject] = useState<Project>(initialProject);
  const [activeTab, setActiveTab] = useState<BuildTab>(initialTab);
  const [builds, setBuilds] = useState<Build[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastDownloadedId, setLastDownloadedId] = useState<string | null>(null);
  const [refreshNonce, setRefreshNonce] = useState(0);

  useEffect(() => {
    const foundProject = PROJECTS.find((p) => p.id === projectIdParam);
    if (foundProject && foundProject.id !== activeProject.id) {
      setActiveProject(foundProject);
    }
  }, [projectIdParam, activeProject.id]);

  useEffect(() => {
    const tabFromUrl: BuildTab = channelParam?.toUpperCase() === "DEV" ? "DEV" : "STABLE";
    if (tabFromUrl !== activeTab) {
      setActiveTab(tabFromUrl);
    }
  }, [channelParam, activeTab]);

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
    setRefreshNonce((value) => value + 1);
  }, []);

  const handleTabChange = useCallback(
    (tab: BuildTab) => {
      setActiveTab(tab);
      const params = new URLSearchParams(searchParams.toString());
      params.set("channel", tab.toLowerCase());
      router.push(`/builds?${params.toString()}`);
    },
    [searchParams, router]
  );

  useEffect(() => {
    const abortController = new AbortController();

    async function fetchData() {
      setLoading(true);
      setError(null);
      setBuilds([]);
      try {
        const params = new URLSearchParams({
          project: activeProject.id,
          type: activeTab,
          retry: String(refreshNonce),
        });

        const response = await fetch(`/api/builds?${params.toString()}`, {
          signal: abortController.signal,
        });

        if (!response.ok) {
          throw new Error(`Build endpoint returned ${response.status}`);
        }

        const data = (await response.json()) as Build[];
        setBuilds(data);
      } catch (e) {
        if (e instanceof DOMException && e.name === "AbortError") {
          return;
        }
        console.error("Failed to load builds", e);
        setError("Failed to load builds. Please check your connection and try again.");
      } finally {
        if (!abortController.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchData();
    return () => abortController.abort();
  }, [activeTab, activeProject, refreshNonce]);

  return (
    <div className="builds-page">
      <div className="builds-shell">
        <BuildHeader />
        <BuildControls
          activeProject={activeProject}
          activeTab={activeTab}
          onProjectChange={handleProjectChange}
          onTabChange={handleTabChange}
          projects={PROJECTS}
        />

        {error && (
          <div className="builds-error" role="alert">
            <AlertCircle aria-hidden="true" />
            <div>
              <h2>Could not load builds</h2>
              <p>{error}</p>
            </div>
            <button onClick={retryFetch} type="button">
              Try again
            </button>
          </div>
        )}

        <BuildTable
          builds={builds}
          channel={activeTab}
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
        <div className="builds-fallback">
          <Loader2 aria-label="Loading builds" />
        </div>
      }
    >
      <BuildExplorerContent />
    </Suspense>
  );
}
