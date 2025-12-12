export type CMSImage = {
  url: string;
  alt?: string;
  width?: number;
  height?: number;
};

export type CMSTag = {
  documentId: string;
  name: string;
  slug: string;
};

export type CMSAuthor = {
  documentId: string;
  name: string;
  slug: string;
  bio?: string;
  avatar?: CMSImage;
  email?: string;
};

export type CMSPost = {
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: unknown;
  publishedAt: string;
  updatedAt: string;
  readingTime: number;
  featuredImage?: CMSImage;
  author?: CMSAuthor;
  tags?: CMSTag[];
};
