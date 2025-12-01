import type { Member, StrapiResponse } from "./types";

export async function fetchTeamMembers(): Promise<Member[]> {
  // Fetch team members from the API
  const response = await fetch("/api/team", {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch team members: ${response.status}`);
  }

  const data = (await response.json()) as StrapiResponse;

  // Now data.data is already an array of Member (no attributes nesting)
  if (data && Array.isArray(data.data)) {
    return data.data;
  } else {
    throw new Error("Invalid data structure in API response");
  }
}
