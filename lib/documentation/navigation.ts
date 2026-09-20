import "server-only";

import type { DocProjectSlug } from "./projects";
import { getProject } from "./projects";
import { source } from "./source";

export interface DocumentationPageLink {
  readonly title: string;
  readonly description: string;
  readonly url: string;
  readonly slugs: string[];
  readonly icon?: string;
}

export type DocumentationNavigationItem =
  | ({ readonly type: "page" } & DocumentationPageLink)
  | {
      readonly type: "group";
      readonly title: string;
      readonly slug: string;
      readonly children: DocumentationPageLink[];
    };

interface OrderedPage extends DocumentationPageLink {
  readonly position: number;
  readonly groupSlug: string | null;
  readonly groupPosition: number;
}

export function getProjectPages(projectSlug: DocProjectSlug) {
  return getOrderedProjectPages(projectSlug).map(toPageLink);
}

export function getProjectNavigation(projectSlug: DocProjectSlug): DocumentationNavigationItem[] {
  const project = getProject(projectSlug);
  if (!project) {
    return [];
  }

  const navigation: DocumentationNavigationItem[] = [];
  const groups = new Map<string, DocumentationPageLink[]>();

  for (const page of getOrderedProjectPages(projectSlug)) {
    if (!page.groupSlug) {
      navigation.push({ type: "page", ...toPageLink(page) });
      continue;
    }

    const existing = groups.get(page.groupSlug) ?? [];
    existing.push(toPageLink(page));
    groups.set(page.groupSlug, existing);

    if (existing.length > 1) {
      continue;
    }

    const group = project.groups[page.groupSlug];
    navigation.push({
      type: "group",
      title: group?.title ?? titleFromSlug(page.groupSlug),
      slug: page.groupSlug,
      children: existing,
    });
  }

  return navigation;
}

export function getAdjacentPages(projectSlug: DocProjectSlug, slugs: readonly string[]) {
  const pages = getProjectPages(projectSlug);
  const currentIndex = pages.findIndex((page) => page.slugs.join("/") === slugs.join("/"));

  if (currentIndex < 0) {
    return { previous: null, next: null };
  }

  return {
    previous: pages[currentIndex - 1] ?? null,
    next: pages[currentIndex + 1] ?? null,
  };
}

function getOrderedProjectPages(projectSlug: DocProjectSlug): OrderedPage[] {
  const project = getProject(projectSlug);
  if (!project) {
    return [];
  }

  return source
    .getPages()
    .filter((page) => page.slugs[0] === projectSlug && page.data.draft !== true)
    .map((page) => {
      const groupSlug = page.slugs.length > 2 ? (page.slugs[1] ?? null) : null;
      const groupPosition = groupSlug
        ? (project.groups[groupSlug]?.position ?? 500)
        : page.data.sidebar_position;

      return {
        title: page.data.title,
        description: page.data.description,
        url: page.url,
        slugs: [...page.slugs],
        icon: page.data.icon,
        position: page.data.sidebar_position,
        groupSlug,
        groupPosition,
      };
    })
    .toSorted((left, right) => {
      const groupOrder = left.groupPosition - right.groupPosition;
      return groupOrder === 0 ? left.position - right.position : groupOrder;
    });
}

function toPageLink(page: OrderedPage): DocumentationPageLink {
  return {
    title: page.title,
    description: page.description,
    url: page.url,
    slugs: page.slugs,
    icon: page.icon,
  };
}

function titleFromSlug(slug: string) {
  return slug
    .split("-")
    .map((part) => `${part.charAt(0).toUpperCase()}${part.slice(1)}`)
    .join(" ");
}
