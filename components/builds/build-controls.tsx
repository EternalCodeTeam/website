import { GitBranch, Package } from "lucide-react";
import type { Project } from "@/app/api/builds/builds";
import { Dropdown } from "@/components/ui/dropdown";
import { FadeIn } from "@/components/ui/motion/motion-components";

interface BuildControlsProps {
  projects: Project[];
  activeProject: Project;
  activeTab: "STABLE" | "DEV";
  onProjectChange: (projectId: string) => void;
  onTabChange: (tab: "STABLE" | "DEV") => void;
}

export function BuildControls({
  projects,
  activeProject,
  activeTab,
  onProjectChange,
  onTabChange,
}: BuildControlsProps) {
  const projectOptions = projects.map((p) => ({
    value: p.id,
    label: p.name,
    icon: <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />,
  }));

  return (
    <FadeIn className="relative z-20 mx-auto mb-10 max-w-2xl" delay={0.2}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Project Selector - Left */}
        <div className="relative z-20">
          <Dropdown
            buttonClassName="h-[46px]"
            className="h-full w-full"
            onChange={onProjectChange}
            options={projectOptions}
            value={activeProject.id}
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
            onClick={() => onTabChange("STABLE")}
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
            onClick={() => onTabChange("DEV")}
            type="button"
          >
            <GitBranch className="h-4 w-4" />
            Dev Builds
          </button>
        </div>
      </div>
    </FadeIn>
  );
}
