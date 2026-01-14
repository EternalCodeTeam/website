import { ImageResponse } from "next/og";
import { getDoc } from "@/lib/docs/loader";

export const runtime = "nodejs";

interface Props {
  params: Promise<{
    slug: string[];
  }>;
}

export async function GET(_request: Request, { params }: Props) {
  try {
    const resolvedParams = await params;
    const doc = await getDoc(resolvedParams.slug);

    if (!doc) {
      return new Response("Not Found", { status: 404 });
    }

    const { title, description } = doc.frontmatter;

    return new ImageResponse(
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#030712", // gray-950
          position: "relative",
        }}
      >
        {/* Background Gradient */}
        <div
          style={{
            position: "absolute",
            top: "-50%",
            left: "-50%",
            height: "200%",
            width: "200%",
            backgroundImage:
              "radial-gradient(circle at center, rgba(79, 70, 229, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(6, 182, 212, 0.2) 0%, transparent 50%)",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "20px",
            zIndex: 10,
            padding: "40px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 60,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.1,
              marginBottom: 10,
              letterSpacing: "-0.02em",
            }}
          >
            {title}
          </div>

          {description && (
            <div
              style={{
                display: "flex",
                fontSize: 30,
                color: "#94a3b8", // gray-400
                maxWidth: "800px",
                lineHeight: 1.5,
              }}
            >
              {description}
            </div>
          )}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div style={{ fontSize: 24, color: "#6366f1", fontWeight: 600 }}>EternalCode</div>
          <div style={{ fontSize: 24, color: "#475569" }}>/</div>
          <div style={{ fontSize: 24, color: "#94a3b8" }}>Documentation</div>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      }
    );
    // biome-ignore lint/suspicious/noExplicitAny: Error handling fallback
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response("Failed to generate the image", {
      status: 500,
    });
  }
}
