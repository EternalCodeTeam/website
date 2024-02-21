import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const res = await fetch(
    `https://cms.eternalcode.pl/api/team-members?populate=*`,
    {
      headers: {
        Authorization: `Bearer ${process.env.ETERNALCODE_STRAPI_KEY}`,
      },
    }
  );

  const body = await res.json();

  if (!res.ok) {
    return NextResponse.json(body, { status: 404 });
  }

  return NextResponse.json(body);
}
