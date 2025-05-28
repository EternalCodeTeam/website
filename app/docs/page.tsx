import { redirect } from "next/navigation";


export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export default function DocsPage() {
  redirect("/docs/eternalcore/introduction");
}
