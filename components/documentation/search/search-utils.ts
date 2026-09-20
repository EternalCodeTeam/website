import { getProject } from "@/lib/documentation/projects";

export interface SearchResultSegment {
  readonly highlighted: boolean;
  readonly text: string;
}

export function getSearchProjectName(url: string) {
  const projectSlug = url.split("/").filter(Boolean)[1];
  return projectSlug ? (getProject(projectSlug)?.name ?? "Documentation") : "Documentation";
}

export function parseSearchResultContent(content: string): SearchResultSegment[] {
  return content
    .split(/(<mark>.*?<\/mark>)/gi)
    .filter(Boolean)
    .map((segment) => {
      const highlighted = segment.toLowerCase().startsWith("<mark>");

      return {
        highlighted,
        text: highlighted ? segment.slice(6, -7) : segment,
      };
    });
}
