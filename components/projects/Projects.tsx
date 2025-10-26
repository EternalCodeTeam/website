"use client";

import { useEffect, useState } from "react";

import ProjectItem from "@/components/projects/ProjectItem";
import SectionTitle from "@/components/SectionTitle";

import ProjectsError from "./ProjectsError";
import { fetchProjects } from "./projectService";
import ProjectsSkeleton from "./ProjectsSkeleton";
import type { Project } from "./types";

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setLoading(true);
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        const err = error as Error;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) return <ProjectsSkeleton />;
  if (error) return <ProjectsError error={error} />;

  return (
    <section id="projects" className="relative isolate overflow-hidden">
      <div className="relative z-10 mx-auto max-w-screen-xl px-4 py-20">
        <SectionTitle
          title="Our Projects"
          description="Crafted with passion, loved by the community — explore our work below."
        />

        <div className="mt-12 space-y-16">
          {projects.map((repo, index) => (
            <ProjectItem key={repo.documentId} repo={repo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
