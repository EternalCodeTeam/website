import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getDoc } from "@/lib/docs/loader";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ message: "Dev only" }, { status: 403 });
  }

  try {
    const json = await req.json();
    const bodySchema = z.object({ slug: z.array(z.string()) });
    const result = bodySchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const { slug } = result.data;
    const doc = await getDoc(slug);

    if (!doc) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ lastModified: doc.lastModified });
  } catch (error) {
    console.error("[doc-check] Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
