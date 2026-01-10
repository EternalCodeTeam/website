import { ImageResponse } from "next/og";
import type { NextRequest } from "next/server";
import { loadFonts, OgTemplate } from "@/components/og/og-template";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "EternalCode.pl";
    const subtitle = searchParams.get("subtitle") || "Open Source Solutions";
    const image = searchParams.get("image") || "https://eternalcode.pl/logo.svg";

    const fonts = await loadFonts();

    return new ImageResponse(<OgTemplate image={image} subtitle={subtitle} title={title} />, {
      width: 1200,
      height: 630,
      fonts,
      headers: {
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } catch (e) {
    console.error("OG Image Generation Error:", e);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
