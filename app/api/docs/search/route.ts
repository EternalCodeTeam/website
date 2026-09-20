import { createFromSource } from "fumadocs-core/search/server";

import { source } from "@/lib/documentation/source";

export const { GET } = createFromSource(source, {
  language: "english",
  buildIndex(page) {
    return {
      title: page.data.title,
      description: page.data.description,
      url: page.url,
      id: page.url,
      structuredData: page.data.structuredData,
      tag: page.slugs[0],
    };
  },
});
