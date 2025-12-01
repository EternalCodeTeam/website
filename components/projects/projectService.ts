import type { ApiResponse, Project } from "./types";

export async function fetchProjects(): Promise<Project[]> {
  // Fetch projects from the API
  const response = await fetch("/api/project", {
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.status}`);
  }

  const data = (await response.json()) as ApiResponse;

  // Now data.data is already an array of Project (no attributes nesting)
  if (data && Array.isArray(data.data)) {
    return data.data;
  } else {
    throw new Error("Invalid data structure in API response");
  }
}
