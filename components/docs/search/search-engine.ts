import { type AnyOrama, create, insertMultiple, search } from "@orama/orama";

import type { SearchResult } from "./types";

export class SearchEngine {
  private db: AnyOrama | null = null;
  private readonly endpoint: string;
  private initialized = false;

  constructor(endpoint = "/api/docs/search-index") {
    this.endpoint = endpoint;
  }

  get isInitialized(): boolean {
    return this.initialized;
  }

  async initialize(): Promise<void> {
    if (this.initialized) {
      return;
    }

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
      this.initialized = true;
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Failed to initialize search:", error);
      }
      this.db = null;
      throw error;
    }
  }

  async search(query: string, limit = 8): Promise<SearchResult[]> {
    if (!this.db || query.length < 2) {
      return [];
    }

    try {
      const searchResults = await search(this.db, {
        term: query,
        properties: ["title", "excerpt"],
        limit,
        boost: {
          title: 2,
        },
      });

      return searchResults.hits.map((hit) => ({
        title: hit.document.title as string,
        path: hit.document.path as string,
        excerpt: hit.document.excerpt as string,
      }));
    } catch (error) {
      if (process.env.NODE_ENV === "development") {
        console.error("Search failed:", error);
      }
      return [];
    }
  }
}
