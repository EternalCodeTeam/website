import { create, insertMultiple, search, AnyOrama } from "@orama/orama";

import { SearchResult } from "./types";

export class SearchEngine {
  private db: AnyOrama | null = null;
  private endpoint: string;

  constructor(endpoint: string = "/api/docs/search-index") {
    this.endpoint = endpoint;
  }

  async initialize(): Promise<void> {
    try {
      const response = await fetch(this.endpoint);
      if (!response.ok) {
        throw new Error(`Failed to fetch search index: ${response.status}`);
      }

      const searchData = (await response.json()) as SearchResult[];

      this.db = create({
        schema: {
          title: "string",
          path: "string",
          excerpt: "string",
        },
      });

      await insertMultiple(this.db, searchData);
    } catch (error) {
      console.error("Failed to initialize search:", error);
      this.db = null;
    }
  }

  async search(query: string, limit: number = 10): Promise<SearchResult[]> {
    if (!this.db || query.length < 2) {
      return [];
    }

    try {
      const searchResults = await search(this.db, {
        term: query,
        properties: ["title", "excerpt"],
        limit,
      });

      return searchResults.hits.map((hit) => ({
        title: hit.document.title as string,
        path: hit.document.path as string,
        excerpt: hit.document.excerpt as string,
      }));
    } catch (error) {
      console.error("Search failed:", error);
      return [];
    }
  }
}
