import { redirect } from "next/navigation";

export const dynamic = "force-static";
export const revalidate = 5;

export default function DocsPage() {
  redirect("/docs/eternalcore/introduction");
}
