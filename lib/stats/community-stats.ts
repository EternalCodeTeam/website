import { cache } from "react";
import { z } from "zod";

/** EternalCodeTeam organization on Modrinth, used to discover every published project. */
const MODRINTH_ORGANIZATION_ID = "Aa4Tewgc";

/** Used only when the organization endpoint is unavailable, so downloads never drop to zero. */
const MODRINTH_PROJECT_SLUGS = [
  "eternalcore",
  "eternalcombat",
  "chatformatter",
  "eternaleconomy",
  "lobbyheads",
  "parcellockers",
];

/** bStats plugin ids owned by EternalCodeTeam (https://bstats.org/plugin/bukkit/<name>/<id>). */
const BSTATS_PLUGIN_IDS = [13_964, 17_803, 28_941, 19_819, 15_199, 20_048, 19_792];

const REVALIDATE_SECONDS = 3600;
const USER_AGENT = "EternalCodeTeam/website (+https://eternalcode.pl)";

const ModrinthProjectSchema = z.object({
  downloads: z.number(),
});

const BStatsChartSchema = z.array(z.tuple([z.number(), z.number()]));

type BStatsChart = "servers" | "players";

export interface CommunityStats {
  /** Total downloads across every Modrinth project, or null when Modrinth is unreachable. */
  downloads: number | null;
  /** Servers currently reporting to bStats, or null when bStats is unreachable. */
  servers: number | null;
  /** Players online on those servers, or null when bStats is unreachable. */
  players: number | null;
}

async function fetchJson<T>(url: string, schema: z.ZodType<T>): Promise<T | null> {
  try {
    const response = await fetch(url, {
      headers: { "User-Agent": USER_AGENT },
      next: {
        revalidate: REVALIDATE_SECONDS,
        tags: ["community-stats"],
      },
    });

    if (!response.ok) {
      console.error(`[stats] ${url} responded with ${response.status}`);
      return null;
    }

    const parsed = schema.safeParse(await response.json());

    if (!parsed.success) {
      console.error(`[stats] Unexpected response from ${url}`, parsed.error);
      return null;
    }

    return parsed.data;
  } catch (error) {
    console.error(`[stats] Failed to fetch ${url}`, error);
    return null;
  }
}

async function fetchModrinthDownloads(): Promise<number | null> {
  const schema = z.array(ModrinthProjectSchema);

  const projects =
    (await fetchJson(
      `https://api.modrinth.com/v3/organization/${MODRINTH_ORGANIZATION_ID}/projects`,
      schema
    )) ??
    (await fetchJson(
      `https://api.modrinth.com/v2/projects?ids=${encodeURIComponent(JSON.stringify(MODRINTH_PROJECT_SLUGS))}`,
      schema
    ));

  if (!projects || projects.length === 0) {
    return null;
  }

  return projects.reduce((total, project) => total + project.downloads, 0);
}

async function fetchBStatsTotal(chart: BStatsChart): Promise<number | null> {
  const charts = await Promise.all(
    BSTATS_PLUGIN_IDS.map((pluginId) =>
      fetchJson(
        `https://bstats.org/api/v1/plugins/${pluginId}/charts/${chart}/data?maxElements=1`,
        BStatsChartSchema
      )
    )
  );

  const latestValues = charts.flatMap((points) => {
    const latest = points?.at(-1);
    return latest ? [latest[1]] : [];
  });

  if (latestValues.length === 0) {
    return null;
  }

  return latestValues.reduce((total, value) => total + value, 0);
}

/**
 * Live usage numbers for the homepage, pulled from Modrinth (downloads) and bStats (servers,
 * players). Every metric degrades to null independently so a single outage never breaks the page.
 */
export const getCommunityStats = cache(async (): Promise<CommunityStats> => {
  const [downloads, servers, players] = await Promise.all([
    fetchModrinthDownloads(),
    fetchBStatsTotal("servers"),
    fetchBStatsTotal("players"),
  ]);

  return { downloads, servers, players };
});
