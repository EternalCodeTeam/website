import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);


    const title = searchParams.get("title") || "EternalCode.pl";
    const subtitle = searchParams.get("subtitle") || "Open Source Solutions";
    const image =
      searchParams.get("image") || "https://eternalcode.pl/logo.svg";


    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#ffffff",
            padding: "40px 80px",
            fontFamily: "Poppins, sans-serif",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "40px",
            }}
          >
            <img
              src={image}
              alt="EternalCode Logo"
              width="120"
              height="120"
              style={{ marginRight: "20px" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
              }}
            >
              <h1
                style={{
                  fontSize: "60px",
                  fontWeight: "bold",
                  color: "#0d1117",
                  margin: "0",
                  lineHeight: "1.2",
                }}
              >
                {title}
              </h1>
              <p
                style={{
                  fontSize: "30px",
                  color: "#3b82f6",
                  margin: "0",
                  marginTop: "10px",
                }}
              >
                {subtitle}
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "20px",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                color: "#6b7280",
                margin: "0",
              }}
            >
              eternalcode.pl
            </p>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error(e);
    return new Response("Failed to generate OG image", { status: 500 });
  }
}
