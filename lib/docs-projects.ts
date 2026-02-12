import type { LucideIcon } from "lucide-react";
import { BookOpen, Code, FileText, Users } from "lucide-react";

export interface DocProject {
  path: string;
  entryPath?: string;
  title: string;
  icon: LucideIcon;
  iconColor: string;
  gradientColor: string;
  description: string;
}

export const DOC_PROJECTS: DocProject[] = [
  {
    path: "/docs/eternalcore",
    entryPath: "/docs/eternalcore/introduction",
    title: "EternalCore",
    icon: Code,
    iconColor: "text-purple-500 dark:text-purple-400",
    gradientColor: "from-purple-500/20 to-indigo-500/20",
    description:
      "EternalCore is a modern, actively maintained alternative to EssentialsX. It provides the most important server features in one plugin, with better configuration, performance, and support for the latest Minecraft versions.",
  },
  {
    path: "/docs/eternalcombat",
    entryPath: "/docs/eternalcombat/introduction",
    title: "EternalCombat",
    icon: FileText,
    iconColor: "text-red-500 dark:text-red-400",
    gradientColor: "from-red-500/20 to-orange-500/20",
    description: "Something more than just combat logging for Minecraft!",
  },
  {
    path: "/docs/multification",
    entryPath: "/docs/multification/index",
    title: "Multification",
    icon: BookOpen,
    iconColor: "text-blue-500 dark:text-blue-400",
    gradientColor: "from-blue-500/20 to-cyan-500/20",
    description:
      "Cross-platform notification and messaging library for multiple Minecraft platforms",
  },
  {
    path: "/docs/contribute",
    entryPath: "/docs/contribute/guide",
    title: "Contribute",
    icon: Users,
    iconColor: "text-green-500 dark:text-green-400",
    gradientColor: "from-green-500/20 to-emerald-500/20",
    description: "Learn how to contribute to our projects and documentation",
  },
];

export const DOCS_PAGE_CONFIG = {
  title: "Documentation",
  description:
    "Comprehensive guides and references for all EternalCode projects.\nSelect a project below to get started.",
  logo: {
    src: "/logo.svg",
    alt: "EternalCode Logo",
    width: 64,
    height: 64,
  },
  links: [
    {
      title: "Join our Discord",
      href: "https://discord.gg/eternalcode",
    },
    {
      title: "GitHub",
      href: "https://github.com/eternalcodeteam",
    },
  ],
};

export function getDocProjectByPath(path: string): DocProject | undefined {
  return DOC_PROJECTS.slice()
    .sort((a, b) => b.path.length - a.path.length)
    .find((project) => path.startsWith(project.path));
}

export function getDocProjectIcon(path: string): LucideIcon {
  return getDocProjectByPath(path)?.icon ?? BookOpen;
}
