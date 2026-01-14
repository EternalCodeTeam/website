import { type NextRequest, NextResponse } from "next/server";
import { getDoc } from "@/lib/docs/loader";

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ message: "Dev only" }, { status: 403 });
  }

  try {
    const { slug } = (await req.json()) as { slug: string[] };
    const doc = await getDoc(slug);

    if (!doc) {
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ lastModified: doc.lastModified });
  } catch (_error) {
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
