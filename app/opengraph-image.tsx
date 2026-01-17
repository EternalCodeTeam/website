import { ImageResponse } from "@takumi-rs/image-response";
import { OgTemplate } from "@/components/og/og-template";

export const runtime = "nodejs";
export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
  return new ImageResponse(
    <OgTemplate subtitle="We are a team creating open source projects!" title="EternalCode.pl" />,
    {
      ...size,
      format: "webp",
      headers: {
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    }
  );
}
