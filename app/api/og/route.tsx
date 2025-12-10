import { ImageResponse } from "@vercel/og";
import type { NextRequest } from "next/server";

export const runtime = "edge";

const interRegular = fetch(
  new URL("https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-400-normal.woff")
).then((res) => {
  if (!res.ok) {
    throw new Error("Failed to fetch regular font");
  }
  return res.arrayBuffer();
});

const interBold = fetch(
  new URL("https://cdn.jsdelivr.net/npm/@fontsource/inter@5.0.8/files/inter-latin-700-normal.woff")
).then((res) => {
  if (!res.ok) {
    throw new Error("Failed to fetch bold font");
  }
  return res.arrayBuffer();
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get("title") || "EternalCode.pl";
    const subtitle = searchParams.get("subtitle") || "Open Source Solutions";
    const image = searchParams.get("image") || "https://eternalcode.pl/logo.svg";

    const [regularFontData, boldFontData] = await Promise.all([interRegular, interBold]);

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#020617", // slate-950/gray-950 close match
          backgroundImage:
            "radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15), transparent 40%), radial-gradient(circle at 75% 75%, rgba(37, 99, 235, 0.15), transparent 40%)",
          fontFamily: '"Inter"',
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            zIndex: 10,
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
              padding: "20px",
              background: "rgba(30, 41, 59, 0.5)", // slate-800 with opacity
              borderRadius: "24px",
              border: "1px solid rgba(51, 65, 85, 0.5)", // slate-700
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            }}
          >
            {/* biome-ignore lint/performance/noImgElement: ImageResponse requires img tag */}
            <img alt="Logo" height={80} src={image} style={{ borderRadius: "12px" }} width={80} />
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "72px",
              fontWeight: 700,
              textAlign: "center",
              margin: "0 0 20px 0",
              padding: "0 40px",
              lineHeight: 1.1,
              background: "linear-gradient(to right, #ffffff, #93c5fd, #3b82f6)", // white to blue-300 to blue-500
              backgroundClip: "text",
              color: "transparent",
              textShadow: "0 2px 10px rgba(59, 130, 246, 0.2)",
            }}
          >
            {title}
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "32px",
              color: "#94a3b8", // slate-400
              margin: "0",
              textAlign: "center",
              maxWidth: "900px",
              padding: "0 40px",
              lineHeight: 1.4,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Decorative elements */}
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <div
            style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#3b82f6" }}
          />
          <p style={{ fontSize: "20px", color: "#64748b", margin: 0, fontWeight: 500 }}>
            eternalcode.pl
          </p>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
        fonts: [
          {
            name: "Inter",
            data: regularFontData,
            style: "normal",
            weight: 400,
          },
          {
            name: "Inter",
            data: boldFontData,
            style: "normal",
            weight: 700,
          },
        ],
      }
    );
  } catch (e) {
    console.error(e);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
