import { ImageResponse } from "@takumi-rs/image-response";
import type { NextRequest } from "next/server";
import { OgTemplate } from "@/components/og/og-template";

export const runtime = "nodejs";

export function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "EternalCode.pl";
    const subtitle = searchParams.get("subtitle") || "Open Source Solutions";
    const image = searchParams.get("image") || "https://eternalcode.pl/logo.svg";

    return new ImageResponse(<OgTemplate image={image} subtitle={subtitle} title={title} />, {
      width: 1200,
      height: 630,
      format: "webp",
      headers: {
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } catch (e) {
    console.error("OG Image Generation Error:", e);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
