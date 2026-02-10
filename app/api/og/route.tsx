import { ImageResponse } from "@takumi-rs/image-response";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { OgTemplate } from "@/components/og/og-template";

export const runtime = "nodejs";

const DEFAULT_TITLE = "EternalCode.pl";
const DEFAULT_SUBTITLE = "Open Source Solutions";
const DEFAULT_IMAGE = "https://eternalcode.pl/logo.svg";
const SITE_ORIGIN = "https://eternalcode.pl";

const ALLOWED_IMAGE_HOSTS = new Set([
  "eternalcode.pl",
  "www.eternalcode.pl",
  "github.com",
  "avatars.githubusercontent.com",
  "private-user-images.githubusercontent.com",
  "i.imgur.com",
  "imgur.com",
  "cms.eternalcode.pl",
]);

const OG_QUERY_SCHEMA = z.object({
  title: z.string().trim().min(1).max(120).optional(),
  subtitle: z.string().trim().max(200).optional(),
  image: z.string().trim().max(2048).optional(),
});

function sanitizeText(value: string): string {
  let sanitized = "";

  for (const character of value) {
    const code = character.charCodeAt(0);
    const isControlCode = code <= 31 || code === 127 || (code >= 128 && code <= 159);
    if (!isControlCode) {
      sanitized += character;
    }
  }

  return sanitized.trim();
}

function normalizeImageUrl(rawValue: string): string | null {
  const value = rawValue.trim();
  if (!value) {
    return null;
  }

  let url: URL;

  if (value.startsWith("/")) {
    url = new URL(value, SITE_ORIGIN);
  } else {
    try {
      url = new URL(value);
    } catch {
      return null;
    }
  }

  if (url.protocol !== "https:") {
    return null;
  }

  if (!ALLOWED_IMAGE_HOSTS.has(url.hostname)) {
    return null;
  }

  return url.toString();
}

export function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const parsedQuery = OG_QUERY_SCHEMA.safeParse(Object.fromEntries(searchParams.entries()));

    if (!parsedQuery.success) {
      return Response.json({ error: "Invalid query parameters" }, { status: 400 });
    }

    const title = sanitizeText(parsedQuery.data.title ?? DEFAULT_TITLE) || DEFAULT_TITLE;
    const subtitle =
      sanitizeText(parsedQuery.data.subtitle ?? DEFAULT_SUBTITLE) || DEFAULT_SUBTITLE;

    let image = DEFAULT_IMAGE;
    if (parsedQuery.data.image) {
      const normalizedImage = normalizeImageUrl(parsedQuery.data.image);
      if (!normalizedImage) {
        return Response.json({ error: "Invalid image URL" }, { status: 400 });
      }
      image = normalizedImage;
    }

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
