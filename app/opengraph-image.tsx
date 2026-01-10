import { ImageResponse } from "next/og";
import { loadFonts, OgTemplate } from "@/components/og/og-template";

export const runtime = "edge";
export const alt = "EternalCode.pl - Open Source Solutions";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadFonts();

  return new ImageResponse(
    <OgTemplate subtitle="We are a team creating open source projects!" title="EternalCode.pl" />,
    {
      ...size,
      fonts,
      headers: {
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    }
  );
}
