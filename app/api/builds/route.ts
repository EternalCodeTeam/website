import { NextResponse } from "next/server";
import { z } from "zod";
import { fetchDevBuilds, fetchStableBuilds } from "@/app/api/builds/builds";
import { type BuildTab, PROJECTS } from "@/lib/builds/projects";

const BuildQuerySchema = z.object({
  project: z.string().trim().min(1),
  type: z.enum(["STABLE", "DEV"]).default("STABLE"),
});

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const query = BuildQuerySchema.safeParse(Object.fromEntries(url.searchParams.entries()));

    if (!query.success) {
      return NextResponse.json({ error: "Invalid query parameters" }, { status: 400 });
    }

    const project = PROJECTS.find((item) => item.id === query.data.project);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const versions =
      query.data.type === "STABLE"
        ? await fetchStableBuilds(project)
        : await fetchDevBuilds(project);

    const builds = mapToBuildResponse(versions, query.data.type, project.modrinthId);

    return NextResponse.json(builds, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("[api/builds] Unexpected error", error);
    return NextResponse.json({ error: "Failed to fetch builds" }, { status: 500 });
  }
}

function mapToBuildResponse(
  versions: Awaited<ReturnType<typeof fetchStableBuilds>>,
  type: BuildTab,
  modrinthId?: string
) {
  return versions
    .toSorted((a, b) => Date.parse(b.date_published) - Date.parse(a.date_published))
    .map((version) => {
      const primaryFile = version.files.find((file) => file.primary) ?? version.files[0];

      return {
        id: version.id,
        name: version.name,
        type,
        date: version.date_published,
        downloadUrl: primaryFile?.url ?? "",
        version: version.version_number,
        runUrl: modrinthId
          ? `https://modrinth.com/project/${modrinthId}/version/${version.id}`
          : undefined,
      };
    });
}
