export interface DocEditor {
  login: string;
  avatarUrl: string;
  profileUrl: string;
}

export interface DocEditorsResult {
  editors: DocEditor[];
  historyUrl: string;
  edits: DocEdit[];
}

export interface DocEdit {
  sha: string;
  url: string;
  message: string;
  authorLogin: string | null;
  authorAvatarUrl: string | null;
  authorProfileUrl: string | null;
  authoredAt: string | null;
}

interface GitHubCommit {
  sha: string;
  html_url: string;
  author: {
    login: string;
    avatar_url: string;
    html_url: string;
  } | null;
  commit: {
    message?: string;
    author?: {
      date?: string;
    } | null;
    committer?: {
      date?: string;
    } | null;
  };
}

const REPOSITORY = "EternalCodeTeam/website";
const CONTENT_PREFIX = "content/docs";
const EDITORS_LIMIT = 3;

export async function getDocEditors(filePath: string): Promise<DocEditorsResult | null> {
  const path = `${CONTENT_PREFIX}/${filePath}.mdx`;
  const token = process.env.GITHUB_TOKEN;
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPOSITORY}/commits?path=${encodeURIComponent(path)}&per_page=10`,
      {
        headers,
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      console.error(`Failed to fetch doc editors for ${path}: ${response.statusText}`);
      return null;
    }

    const commits = (await response.json()) as GitHubCommit[];

    if (!commits.length) {
      return null;
    }

    const editors: DocEditor[] = [];
    const seen = new Set<string>();

    for (const commit of commits) {
      if (!commit.author?.login || seen.has(commit.author.login)) {
        continue;
      }

      editors.push({
        login: commit.author.login,
        avatarUrl: commit.author.avatar_url,
        profileUrl: commit.author.html_url,
      });
      seen.add(commit.author.login);

      if (editors.length >= EDITORS_LIMIT) {
        break;
      }
    }

    const edits = commits.slice(0, 5).map((commit) => ({
      sha: commit.sha,
      url: commit.html_url,
      message: commit.commit.message?.trim() || "Update documentation",
      authorLogin: commit.author?.login ?? null,
      authorAvatarUrl: commit.author?.avatar_url ?? null,
      authorProfileUrl: commit.author?.html_url ?? null,
      authoredAt: commit.commit.author?.date ?? commit.commit.committer?.date ?? null,
    }));
    const historyUrl = `https://github.com/${REPOSITORY}/commits/master/${path}`;

    return {
      editors,
      historyUrl,
      edits,
    };
  } catch (error) {
    console.error(`Error fetching doc editors for ${path}:`, error);
    return null;
  }
}
