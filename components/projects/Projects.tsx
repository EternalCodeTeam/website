"use client";

import React, { useEffect, useState } from "react";
import SectionTitle from "@/components/SectionTitle";
import ProjectItem from "@/components/projects/ProjectItem";

export const dynamic = "force-static";

interface Project {
  id: string;
  attributes: {
    name: string;
    description: string;
    repository_url: string;
    banner_url: string;
  };
}

interface ApiResponse {
  data: Project[];
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/project");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = (await response.json()) as ApiResponse;
        setProjects(data.data);
      } catch (error) {
        setError("Error fetching projects");
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section id="projects">
      <div className="mx-auto max-w-screen-xl px-4 py-16">
        <SectionTitle
          title="Our project"
          description="Below you will find a list of our projects."
        />

        <div className="lg:alternate mt-8 space-y-8 lg:mt-12">
          {projects.map((repo, index) => (
            <ProjectItem key={repo.id} repo={repo} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
