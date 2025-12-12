export type BuildArtifact = {
  id: string;
  name: string;
  url: string; // The API url to the artifact
  size: number;
};

export type BuildRun = {
  id: number;
  name: string;
  status: string; // "completed", "in_progress", etc.
  conclusion: string | null; // "success", "failure", etc.
  head_branch: string;
  head_sha: string;
  created_at: string;
  html_url: string;
  artifacts_url: string;
  display_title?: string; // Sometimes present in GH API
};

type GithubRunsResponse = {
  workflow_runs: BuildRun[];
};

export type ModrinthVersion = {
  id: string;
  name: string;
  version_number: string;
  date_published: string;
  files: {
    url: string;
    filename: string;
    primary: boolean;
  }[];
};

export type Project = {
  id: string;
  name: string;
  githubRepo: string;
  modrinthId?: string;
};

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

export async function fetchDevBuilds(project: Project): Promise<BuildRun[]> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${project.githubRepo}/actions/runs?per_page=20&status=success&branch=master`
    );
    if (!res.ok) {
      console.error(`Failed to fetch Github Actions for ${project.name}`, await res.text());
      return [];
    }
    const data = (await res.json()) as GithubRunsResponse;
    return data.workflow_runs || [];
  } catch (error) {
    console.error(`Error fetching dev builds for ${project.name}`, error);
    return [];
  }
}

export async function fetchStableBuilds(project: Project): Promise<ModrinthVersion[]> {
  if (!project.modrinthId) {
    return [];
  }

  try {
    const res = await fetch(`https://api.modrinth.com/v2/project/${project.modrinthId}/version`);
    if (!res.ok) {
      if (res.status === 404) {
        return []; // Project might not exist yet
      }
      console.error(`Failed to fetch Modrinth versions for ${project.name}`, await res.text());
      return [];
    }
    return (await res.json()) as ModrinthVersion[];
  } catch (error) {
    console.error(`Error fetching stable builds for ${project.name}`, error);
    return [];
  }
}
