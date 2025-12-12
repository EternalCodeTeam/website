import { cache } from "react";
import { getPayloadClient } from "../payload/client";
import { mapPost, mapTag } from "../payload/utils";
import type { CMSPost, CMSTag } from "../payload/types";

// Re-export types for compatibility
export type { CMSImage, CMSTag, CMSAuthor, CMSPost } from "../payload/types";

export const getBlogPosts = cache(async (): Promise<CMSPost[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    sort: "-publishedAt",
    depth: 2,
  });
  return docs.map(mapPost);
});

export const getBlogPost = cache(async (slug: string): Promise<CMSPost | null> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({
    collection: "posts",
    where: { slug: { equals: slug } },
    depth: 2,
  });
  if (docs.length === 0) {
    return null;
  }
  return mapPost(docs[0]);
});

export const getBlogTags = cache(async (): Promise<CMSTag[]> => {
  const payload = await getPayloadClient();
  const { docs } = await payload.find({ collection: "tags" });
  return docs.map(mapTag);
});

export const getBlogPostsByTag = cache(async (tagSlug: string): Promise<CMSPost[]> => {
  const payload = await getPayloadClient();
  const { docs: tags } = await payload.find({
    collection: "tags",
    where: { slug: { equals: tagSlug } },
  });
  if (tags.length === 0) {
    return [];
  }

  const { docs } = await payload.find({
    collection: "posts",
    where: { tags: { equals: tags[0].id } },
    depth: 2,
  });
  return docs.map(mapPost);
});
