export const dynamic = "force-dynamic";

export function GET() {
  throw new Error("Sentry Test Error: Server-Side API Route");
}
