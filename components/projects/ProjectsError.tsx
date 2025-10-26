"use client";

interface ProjectsErrorProps {
  error: string;
}

export default function ProjectsError({ error }: ProjectsErrorProps) {
  return (
    <section id="projects">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16">
        <div className="flex h-64 items-center justify-center">
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
      </div>
    </section>
  );
}
