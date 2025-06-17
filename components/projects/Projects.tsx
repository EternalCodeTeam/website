"use client";

import React, { useEffect, useState } from "react";

import ProjectItem from "@/components/projects/ProjectItem";
import SectionTitle from "@/components/SectionTitle";

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
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/project", {
          headers: {
            Accept: "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch projects: ${response.status}`);
        }

        const data = (await response.json()) as ApiResponse;

        if (data && Array.isArray(data.data)) {
          setProjects(data.data);
        } else {
          throw new Error("Invalid data structure in API response");
        }
      } catch (error) {
        const err = error as Error;
        setError(err.message);
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <section id="projects">
        <div className="mx-auto max-w-screen-xl px-4 py-16">
          <SectionTitle
            title="Our project"
            description="Below you will find a list of our projects."
          />
          <div className="lg:alternate mt-8 space-y-8 lg:mt-12">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
                  <div className="h-64 w-full rounded-lg bg-gray-200 dark:bg-gray-700 lg:w-1/2"></div>
                  <div className="mt-4 w-full lg:mt-0 lg:w-1/2">
                    <div className="mb-4 h-8 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mb-6 h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                    <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                    <div className="mt-8 h-10 w-40 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects">
        <div className="mx-auto max-w-screen-xl px-4 py-16">
          <div className="flex h-64 items-center justify-center">
            <div className="text-xl text-red-500">Error: {error}</div>
          </div>
        </div>
      </section>
    );
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
