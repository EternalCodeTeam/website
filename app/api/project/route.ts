import { NextResponse } from "next/server";

export const revalidate = 60;

export async function GET(_request: Request) {
  try {
    const res = await fetch(`https://cms.eternalcode.pl/api/projects?populate=*`, {
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
        "Cache-Control": "public, max-age=60, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
