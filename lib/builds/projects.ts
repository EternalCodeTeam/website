export interface Project {
  id: string;
  name: string;
  githubRepo: string;
  modrinthId?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "eternalcore",
    name: "EternalCore",
    githubRepo: "EternalCodeTeam/EternalCore",
    modrinthId: "eternalcore",
  },
  {
    id: "eternalcombat",
    name: "EternalCombat",
    githubRepo: "EternalCodeTeam/EternalCombat",
    modrinthId: "eternalcombat",
  },
];

export type BuildTab = "STABLE" | "DEV";
