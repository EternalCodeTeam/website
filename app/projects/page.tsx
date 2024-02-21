import Project from "@/components/projects/Projects";

export const dynamic = "force-static";
export const fetchCache = "force-cache";
export const runtime = "edge";

export default function Projects() {
  return (
    <main>
      <Project />
    </main>
  );
}
