import { ImageResponse } from "@takumi-rs/image-response";
import { OgTemplate } from "@/components/og/og-template";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
  return new ImageResponse(
    <OgTemplate
      siteName="EternalCode.pl"
      subtitle="Download the latest builds of our plugins"
      title="Builds"
    />,
    {
      ...size,
      format: "webp",
      headers: {
        "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
      },
    }
  );
}
