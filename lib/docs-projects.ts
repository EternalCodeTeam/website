import type { LucideIcon } from "lucide-react";
import { BookOpen, Code, FileText, Users } from "lucide-react";
import { createElement, type ReactNode } from "react";

export interface DocProject {
  path: string;
  title: string;
  icon: LucideIcon;
  iconColor: string;
  gradientColor: string;
  description: string;
}

export const DOC_PROJECTS: DocProject[] = [
  {
    path: "/docs/eternalcore",
    title: "EternalCore",
    icon: Code,
    iconColor: "text-purple-500 dark:text-purple-400",
    gradientColor: "from-purple-500/20 to-indigo-500/20",
    description: "Core library providing essential features and utilities for Minecraft servers",
  },
  {
    path: "/docs/eternalcombat",
    title: "EternalCombat",
    icon: FileText,
    iconColor: "text-red-500 dark:text-red-400",
    gradientColor: "from-red-500/20 to-orange-500/20",
    description: "Advanced combat system with customizable mechanics and features",
  },
  {
    path: "/docs/multification",
    title: "Multification",
    icon: BookOpen,
    iconColor: "text-blue-500 dark:text-blue-400",
    gradientColor: "from-blue-500/20 to-cyan-500/20",
    description:
      "Cross-platform notification and messaging library for multiple Minecraft platforms",
  },
  {
    path: "/docs/contribute",
    title: "Contribute",
    icon: Users,
    iconColor: "text-green-500 dark:text-green-400",
    gradientColor: "from-green-500/20 to-emerald-500/20",
    description: "Learn how to contribute to our projects and documentation",
  },
];

export function getDocProjectByPath(path: string): DocProject | undefined {
  return DOC_PROJECTS.find((project) => path.startsWith(project.path));
}

export function getDocProjectIcon(path: string): ReactNode {
  const project = getDocProjectByPath(path);
  if (project) {
    return createElement(project.icon, {
      className: `h-4 w-4 ${project.iconColor}`,
    });
  }
  return createElement(BookOpen, {
    className: "h-4 w-4 text-gray-500 dark:text-gray-400",
  });
}

