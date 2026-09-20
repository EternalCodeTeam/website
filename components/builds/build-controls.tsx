"use client";

import type { BuildTab, Project } from "@/lib/builds/projects";
import { ProjectSelect } from "./project-select";

interface BuildControlsProps {
  projects: Project[];
  activeProject: Project;
  activeTab: BuildTab;
  onProjectChange: (projectId: string) => void;
  onTabChange: (tab: BuildTab) => void;
}

export function BuildControls({
  projects,
  activeProject,
  activeTab,
  onProjectChange,
  onTabChange,
}: BuildControlsProps) {
  return (
    <div className="builds-controls">
      <ProjectSelect
        activeProject={activeProject}
        onProjectChange={onProjectChange}
        projects={projects}
      />

      <div aria-label="Release channel" className="builds-channel-tabs" role="tablist">
        <button
          aria-controls="builds-results"
          aria-selected={activeTab === "STABLE"}
          className={activeTab === "STABLE" ? "is-active" : undefined}
          onClick={() => onTabChange("STABLE")}
          role="tab"
          type="button"
        >
          Stable
        </button>
        <button
          aria-controls="builds-results"
          aria-selected={activeTab === "DEV"}
          className={activeTab === "DEV" ? "is-active" : undefined}
          onClick={() => onTabChange("DEV")}
          role="tab"
          type="button"
        >
          Development
        </button>
      </div>
    </div>
  );
}
