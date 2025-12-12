import { cache } from "react";
import { getPayloadClient } from "../payload/client";
import { mapAuthor, mapPost } from "../payload/utils";
import type { CMSAuthor, CMSPost } from "../payload/types";
import type { Author } from "@/payload-types-generated";

// Re-export types
export type { CMSAuthor } from "../payload/types";

export const getAuthors = cache(async (): Promise<CMSAuthor[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "authors", depth: 2 });
  return docs.map((a: Author) => mapAuthor(a)).filter((a): a is CMSAuthor => !!a);
});

export const getAuthorBySlug = cache(async (slug: string): Promise<CMSAuthor | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "authors",
    where: { slug: { equals: slug } },
    depth: 2,
  });
  if (docs.length === 0) {
    return null;
  }
  return mapAuthor(docs[0]) || null;
});

export const getBlogPostsByAuthor = cache(async (slug: string): Promise<CMSPost[]> => {
  const payload = await getPayloadClient();
  const { docs: authors } = await payload.find({
    collection: "authors",
    where: { slug: { equals: slug } },
  });
  if (authors.length === 0) {
    return [];
  }

  const { docs } = await payload.find({
    collection: "posts",
    where: { author: { equals: authors[0].id } },
    depth: 2,
  });
  return docs.map(mapPost);
});
