import { cache } from "react";

export interface ContributeIssue {
  id: number;
  title: string;
  url: string;
  repo: string;
  comments: number;
}

const REPOSITORIES = [
  "EternalCodeTeam/EternalCore",
  "EternalCodeTeam/EternalCombat",
  "EternalCodeTeam/multification",
  "EternalCodeTeam/website",
] as const;

const MAX_ISSUES = 6;

interface GitHubIssueResponse {
  id: number;
  title: string;
  html_url: string;
  comments: number;
  repository_url: string;
  pull_request?: unknown;
}

export const getGoodFirstIssues = cache(async (): Promise<ContributeIssue[]> => {
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  try {
    const query = encodeURIComponent(
      `org:EternalCodeTeam is:issue is:open label:"good first issue" sort:updated-desc`
    );
    const response = await fetch(
      `https://api.github.com/search/issues?q=${query}&per_page=${MAX_ISSUES}`,
      {
        headers,
        next: { revalidate: 1800 },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch good first issues: ${response.statusText}`);
      return [];
    }

    const data = (await response.json()) as { items?: GitHubIssueResponse[] };

    return (data.items ?? [])
      .filter((issue) => !issue.pull_request)
      .slice(0, MAX_ISSUES)
      .map((issue) => ({
        id: issue.id,
        title: issue.title,
        url: issue.html_url,
        repo: issue.repository_url.split("/repos/")[1] ?? REPOSITORIES[0],
        comments: issue.comments,
      }));
  } catch (error) {
    console.error("Error fetching good first issues:", error);
    return [];
  }
});
