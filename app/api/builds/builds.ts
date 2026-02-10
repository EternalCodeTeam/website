import { z } from "zod";
import type { Project } from "@/lib/builds/projects";

export const ModrinthFileSchema = z.object({
  url: z.string(),
  filename: z.string(),
  primary: z.boolean(),
  size: z.number().optional(),
});

export const ModrinthVersionSchema = z.object({
  id: z.string(),
  name: z.string(),
  version_number: z.string(),
  version_type: z.enum(["release", "beta", "alpha"]),
  date_published: z.string(),
  files: z.array(ModrinthFileSchema),
  changelog: z.string().optional(),
});

export type ModrinthVersion = z.infer<typeof ModrinthVersionSchema>;

async function fetchModrinthVersions(
  project: Project,
  types: ("release" | "beta" | "alpha")[]
): Promise<ModrinthVersion[]> {
  if (!project.modrinthId) {
    return [];
  }

  try {
    const res = await fetch(`https://api.modrinth.com/v2/project/${project.modrinthId}/version`, {
      next: {
        revalidate: 300,
        tags: [`modrinth-builds-${project.modrinthId}`],
      },
    });
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

    // Filter by version type
    return parsed.data.filter((v) => types.includes(v.version_type));
  } catch (error) {
    console.error(`Error fetching builds for ${project.name}`, error);
    return [];
  }
}

export function fetchDevBuilds(project: Project): Promise<ModrinthVersion[]> {
  // Fetch 'beta' and 'alpha' versions for dev builds
  return fetchModrinthVersions(project, ["beta", "alpha"]);
}

export function fetchStableBuilds(project: Project): Promise<ModrinthVersion[]> {
  // Fetch 'release' versions for stable builds
  return fetchModrinthVersions(project, ["release"]);
}
