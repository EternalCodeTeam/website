import { z } from "zod";

export const BuildArtifactSchema = z.object({
  id: z.number(),
  node_id: z.string(),
  name: z.string(),
  size_in_bytes: z.number(),
  url: z.string(),
  archive_download_url: z.string(),
  expired: z.boolean(),
  created_at: z.string(),
  expires_at: z.string(),
  updated_at: z.string(),
});

export type BuildArtifact = z.infer<typeof BuildArtifactSchema>;

export const BuildRunSchema = z.object({
  id: z.number(),
  name: z.string().nullable(),
  status: z.string(),
  conclusion: z.string().nullable(),
  head_branch: z.string(),
  head_sha: z.string(),
  created_at: z.string(),
  html_url: z.string(),
  artifacts_url: z.string(),
  display_title: z.string().optional(),
});

export type BuildRun = z.infer<typeof BuildRunSchema> & {
  found_artifact?: BuildArtifact;
};

const GithubRunsResponseSchema = z.object({
  workflow_runs: z.array(BuildRunSchema),
});

const BuildArtifactsResponseSchema = z.object({
  total_count: z.number(),
  artifacts: z.array(BuildArtifactSchema),
});

export const ModrinthFileSchema = z.object({
  url: z.string(),
  filename: z.string(),
  primary: z.boolean(),
});

export const ModrinthVersionSchema = z.object({
  id: z.string(),
  name: z.string(),
  version_number: z.string(),
  date_published: z.string(),
  files: z.array(ModrinthFileSchema),
});

export type ModrinthVersion = z.infer<typeof ModrinthVersionSchema>;

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

export async function fetchDevBuilds(project: Project): Promise<BuildRun[]> {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  try {
    const res = await fetch(
      `https://api.github.com/repos/${project.githubRepo}/actions/runs?per_page=20&status=success&branch=master`,
      { headers }
    );
    if (!res.ok) {
      console.error(`Failed to fetch Github Actions for ${project.name}`, await res.text());
      return [];
    }

    const json = await res.json();
    const parsed = GithubRunsResponseSchema.safeParse(json);

    if (!parsed.success) {
      console.error(`Invalid Github Actions response for ${project.name}`, parsed.error);
      return [];
    }

    const runs = parsed.data.workflow_runs;

    // Fetch artifacts for each run to get the correct artifact name
    return await Promise.all(
      runs.map(async (run) => {
        try {
          const artRes = await fetch(run.artifacts_url, { headers });
          if (!artRes.ok) {
            return run;
          }

          const artJson = await artRes.json();
          const artParsed = BuildArtifactsResponseSchema.safeParse(artJson);

          if (artParsed.success && artParsed.data.artifacts.length > 0) {
            // We take the first artifact as the primary one
            return { ...run, found_artifact: artParsed.data.artifacts[0] };
          }
          return run;
        } catch (e) {
          console.error(`Error fetching artifacts for run ${run.id}`, e);
          return run;
        }
      })
    );
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

    const json = await res.json();
    // Validate response is an array of ModrinthVersion
    const parsed = z.array(ModrinthVersionSchema).safeParse(json);

    if (!parsed.success) {
      console.error(`Invalid Modrinth versions response for ${project.name}`, parsed.error);
      return [];
    }

    return parsed.data;
  } catch (error) {
    console.error(`Error fetching stable builds for ${project.name}`, error);
    return [];
  }
}
