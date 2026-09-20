import { pageSchema } from "fumadocs-core/source/schema";
import { defineConfig, defineDocs } from "fumadocs-mdx/config";
import { z } from "zod";

export const docs = defineDocs({
  dir: "content/docs",
  docs: {
    schema: pageSchema.extend({
      description: z.string().default(""),
      sidebar_position: z.number().int().nonnegative().default(999),
      draft: z.boolean().default(false),
    }),
  },
});

export default defineConfig({
  mdxOptions: {
    rehypeCodeOptions: {
      langs: ["groovy"],
      langAlias: {
        gradle: "groovy",
      },
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
    },
  },
});
