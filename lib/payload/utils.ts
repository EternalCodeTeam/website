import type { Post, Media, Tag, Author } from "@/payload-types";
import type { CMSImage, CMSTag, CMSAuthor, CMSPost } from "./types";

const WORD_SPLIT_REGEX = /\s+/;

export function calculateReadingTime(content: unknown): number {
  const text = JSON.stringify(content);
  const words = text.split(WORD_SPLIT_REGEX).length;
  return Math.ceil(words / 200);
}

export function mapImage(image: Media | number | null | undefined): CMSImage | undefined {
  if (!image || typeof image === "number") {
    return;
  }
  return {
    url: image.url || "",
    alt: image.alt || "",
    width: image.width || 0,
    height: image.height || 0,
  };
}

export function mapTag(tag: Tag | number): CMSTag {
  if (typeof tag === "number") {
    return { documentId: String(tag), name: "", slug: "" };
  }
  return {
    documentId: String(tag.id),
    name: tag.name,
    slug: tag.slug,
  };
}

export function mapAuthor(author: Author | number | null | undefined): CMSAuthor | undefined {
  if (!author || typeof author === "number") {
    return;
  }
  return {
    documentId: String(author.id),
    name: author.name,
    slug: author.slug,
    bio: author.bio || "",
    email: author.email || "",
    avatar: mapImage(author.avatar as Media),
  };
}

export function mapPost(post: Post): CMSPost {
  return {
    documentId: String(post.id),
    title: post.title,
    slug: post.slug,
    excerpt: post.excerpt || "",
    content: post.content,
    publishedAt: post.publishedAt || new Date().toISOString(),
    updatedAt: post.updatedAt,
    readingTime: calculateReadingTime(post.content),
    featuredImage: mapImage(post.featuredImage as Media),
    author: mapAuthor(post.author as Author),
    tags: Array.isArray(post.tags) ? post.tags.map((t) => mapTag(t as Tag)) : [],
  };
}
