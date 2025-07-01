"use client";

import React, { useEffect, useState } from "react";

import ProjectItem from "@/components/page/projects/ProjectItem";
import SectionTitle from "@/components/SectionTitle";

import ProjectsError from "./ProjectsError";
import { fetchProjects } from "./projectService";
import ProjectsSkeleton from "./ProjectsSkeleton";
import { Project } from "./types";

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
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  if (loading) {
    return <ProjectsSkeleton />;
  }

  if (error) {
    return <ProjectsError error={error} />;
  }

  return (
    <section id="projects">
      <div className="mx-auto max-w-screen-xl px-4 py-16">
        <SectionTitle
          title="Our project"
          description="Below you will find a list of our projects."
        />

        {/* Projects list with alternating layout */}
        <div className="lg:alternate mt-8 space-y-8 lg:mt-12">
          {projects.map((repo, index) => (
            <ProjectItem key={repo.documentId} repo={repo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
