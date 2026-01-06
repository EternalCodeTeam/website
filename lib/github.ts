export interface GitHubContributor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  contributions: number;
}

export async function getContributors(repositories: string[]): Promise<GitHubContributor[]> {
  const allContributors = new Map<number, GitHubContributor>();

  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  for (const repo of repositories) {
    if (!repo?.includes("/")) {
      continue;
    }

    try {
      const response = await fetch(
        `https://api.github.com/repos/${repo}/contributors?per_page=100`,
        {
          headers,
          next: {
            revalidate: 3600, // Cache for 1 hour
          },
        }
      );

      if (!response.ok) {
        console.error(`Failed to fetch contributors for ${repo}: ${response.statusText}`);
        continue;
      }

      const contributors = (await response.json()) as GitHubContributor[];

      for (const contributor of contributors) {
        const existing = allContributors.get(contributor.id);
        if (existing) {
          existing.contributions += contributor.contributions;
        } else {
          allContributors.set(contributor.id, { ...contributor });
        }
      }
    } catch (error) {
      console.error(`Error fetching contributors for ${repo}:`, error);
    }
  }

  const excludedBots = [
    "renovate[bot]",
    "dependabot[bot]",
    "imgbot[bot]",
    "mend-bolt-for-github[bot]",
  ];

  return Array.from(allContributors.values())
    .filter((contributor) => !excludedBots.includes(contributor.login))
    .sort((a, b) => b.contributions - a.contributions);
}
