import { motion } from "framer-motion";
import { GitBranch, Package } from "lucide-react";
import { useMemo } from "react";
import type { Project } from "@/app/api/builds/builds";
import { Dropdown } from "@/components/ui/dropdown";
import { FadeIn } from "@/components/ui/motion/motion-components";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { interactionSpring } from "@/lib/animations/variants";

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
  const prefersReducedMotion = useReducedMotion();

  const projectOptions = useMemo(
    () =>
      projects.map((p) => ({
        value: p.id,
        label: p.name,
        icon: <Package className="h-4 w-4 text-gray-500 dark:text-gray-400" />,
      })),
    [projects]
  );

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
        <div
          aria-label="Build type selection"
          className="flex h-[46px] rounded-xl border border-gray-200 bg-white/70 p-1 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/40"
          role="tablist"
        >
          <motion.button
            aria-selected={activeTab === "STABLE"}
            className="relative flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={() => onTabChange("STABLE")}
            role="tab"
            style={{ touchAction: "manipulation" }}
            type="button"
          >
            {activeTab === "STABLE" && !prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-white shadow-xs dark:bg-gray-800"
                layoutId="active-tab"
                transition={interactionSpring}
              />
            )}
            {activeTab === "STABLE" && prefersReducedMotion && (
              <div className="absolute inset-0 rounded-lg bg-white shadow-xs dark:bg-gray-800" />
            )}
            <span
              className={`relative z-10 flex items-center gap-2 ${
                activeTab === "STABLE"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <Package className="h-4 w-4" />
              Stable
            </span>
          </motion.button>

          <motion.button
            aria-selected={activeTab === "DEV"}
            className="relative flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            onClick={() => onTabChange("DEV")}
            role="tab"
            style={{ touchAction: "manipulation" }}
            type="button"
          >
            {activeTab === "DEV" && !prefersReducedMotion && (
              <motion.div
                className="absolute inset-0 rounded-lg bg-white shadow-xs dark:bg-gray-800"
                layoutId="active-tab"
                transition={interactionSpring}
              />
            )}
            {activeTab === "DEV" && prefersReducedMotion && (
              <div className="absolute inset-0 rounded-lg bg-white shadow-xs dark:bg-gray-800" />
            )}
            <span
              className={`relative z-10 flex items-center gap-2 ${
                activeTab === "DEV"
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
              }`}
            >
              <GitBranch className="h-4 w-4" />
              Dev Builds
            </span>
          </motion.button>
        </div>
      </div>
    </FadeIn>
  );
}
