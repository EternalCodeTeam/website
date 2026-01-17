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
      subtitle="Your privacy is non-negotiable"
      title="Privacy Policy"
    />,
    {
      ...size,
      format: "webp",
      headers: {
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
      },
    }
  );
}
