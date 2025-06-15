import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET(request: Request) {
  try {
    const res = await fetch(`https://cms.eternalcode.pl/api/team-members?populate=*`, {
      headers: {
        Authorization: `Bearer ${process.env.ETERNALCODE_STRAPI_KEY}`,
      },
      next: { revalidate },
    });

    if (!res.ok) {
      const errorBody = await res.json();
      return NextResponse.json(errorBody, { status: res.status });
    }

    const body = await res.json();

    return NextResponse.json(body, {
      headers: {
        "Cache-Control": "public, max-age=60, stale-while-revalidate=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching team data:", error);
    return NextResponse.json({ error: "Failed to fetch team data" }, { status: 500 });
  }
}
