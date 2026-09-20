import type { LucideIcon } from "lucide-react";
import { BookOpen, Code2, HeartHandshake, Swords } from "lucide-react";

export const DOC_PROJECTS = [
  {
    slug: "eternalcore",
    name: "EternalCore",
    shortDescription: "Essential server features, commands, configuration, and developer API.",
    entrySlug: ["introduction"],
    accent: "violet",
    icon: Code2,
    github: "https://github.com/EternalCodeTeam/EternalCore",
    groups: { features: { title: "Features", position: 5 } },
    quickLinks: [
      { label: "Introduction", slug: ["introduction"] },
      { label: "Installation", slug: ["installation"] },
      { label: "Commands", slug: ["commands-and-permissions"] },
    ],
  },
  {
    slug: "eternalcombat",
    name: "EternalCombat",
    shortDescription: "Combat logging, protected regions, configuration, and integration API.",
    entrySlug: ["introduction"],
    accent: "rose",
    icon: Swords,
    github: "https://github.com/EternalCodeTeam/EternalCombat",
    groups: {},
    quickLinks: [
      { label: "Introduction", slug: ["introduction"] },
      { label: "Installation", slug: ["installation"] },
      { label: "Configuration", slug: ["configuration"] },
    ],
  },
  {
    slug: "multification",
    name: "Multification",
    shortDescription:
      "Cross-platform Adventure notifications for Paper, Bukkit, and shared modules.",
    entrySlug: [],
    accent: "sky",
    icon: BookOpen,
    github: "https://github.com/EternalCodeTeam/Multification",
    groups: {},
    quickLinks: [
      { label: "Introduction", slug: [] },
      { label: "Installation", slug: ["installation"] },
      { label: "Basic usage", slug: ["basic-usage"] },
    ],
  },
  {
    slug: "contribute",
    name: "Contribute",
    shortDescription: "Help improve EternalCode projects and their documentation.",
    entrySlug: ["guide"],
    accent: "emerald",
    icon: HeartHandshake,
    github: "https://github.com/EternalCodeTeam",
    groups: {},
    quickLinks: [
      { label: "Contribution guide", slug: ["guide"] },
      { label: "Documentation editors", slug: ["documentation-editors"] },
    ],
  },
] as const satisfies readonly DocProject[];

export type DocProjectSlug = (typeof DOC_PROJECTS)[number]["slug"];

export interface DocProject {
  readonly slug: string;
  readonly name: string;
  readonly shortDescription: string;
  readonly entrySlug: readonly string[];
  readonly accent: "violet" | "rose" | "sky" | "emerald";
  readonly icon: LucideIcon;
  readonly github: string;
  readonly groups: Readonly<Record<string, { readonly title: string; readonly position: number }>>;
  readonly quickLinks: readonly {
    readonly label: string;
    readonly slug: readonly string[];
  }[];
}

const PROJECT_SLUGS = new Set(DOC_PROJECTS.map((project) => project.slug));

export function isProjectSlug(value: string): value is DocProjectSlug {
  return PROJECT_SLUGS.has(value as DocProjectSlug);
}

export function getProject(slug: string): DocProject | undefined {
  return DOC_PROJECTS.find((project) => project.slug === slug);
}

export function getProjectEntryUrl(slug: DocProjectSlug) {
  const project = getProject(slug);
  if (!project) {
    return "/docs";
  }

  return createProjectUrl(slug, project.entrySlug);
}

export function createProjectUrl(project: DocProjectSlug, slug: readonly string[]) {
  return `/docs/${[project, ...slug].join("/")}`;
}
