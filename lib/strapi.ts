// Types for Strapi CMS integration
export interface StrapiImage {
  documentId: string;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
}

export interface StrapiAuthor {
  documentId: string;
  name: string;
  slug: string;
  email?: string;
  avatar?: StrapiImage;
  bio?: string;
  blog_posts?: StrapiBlogPost[];
}

export interface StrapiTag {
  documentId: string;
  name: string;
  slug: string;
}

export interface StrapiBlogPost {
  documentId: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  updatedAt: string;
  readingTime?: number;
  featuredImage?: StrapiImage;
  author?: StrapiAuthor;
  tags?: StrapiTag[];
}

interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

const STRAPI_URL = process.env.ETERNALCODE_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.ETERNALCODE_STRAPI_KEY;

if (!STRAPI_URL) {
  throw new Error("STRAPI_URL environment variable is required");
}

if (!STRAPI_API_TOKEN) {
  throw new Error("STRAPI_API_TOKEN environment variable is required");
}

async function fetchFromStrapi<T>(endpoint: string): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { 
      revalidate: 5
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getBlogPosts(): Promise<StrapiBlogPost[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<any>>(
      "/blog-posts?populate[0]=author&populate[1]=author.avatar&populate[2]=featuredImage&populate[3]=tags&sort=publishedAt:desc"
    );
    return response.data.map((item: any) => {
      return {
        documentId: item.documentId,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        content: item.content,
        publishedAt: item.publishedAt,
        updatedAt: item.updatedAt,
        readingTime: item.readingTime || Math.ceil((item.content || '').split(' ').length / 200),
        featuredImage: item.featuredImage ? {
          documentId: item.featuredImage.documentId,
          url: item.featuredImage.url,
          alternativeText: item.featuredImage.alternativeText,
          caption: item.featuredImage.caption,
          width: item.featuredImage.width,
          height: item.featuredImage.height,
        } : undefined,
        author: item.author ? {
          documentId: item.author.documentId,
          name: item.author.name,
          slug: item.author.slug,
          email: item.author.email,
          bio: item.author.bio,
          avatar: item.author.avatar ? {
            documentId: item.author.avatar.documentId,
            url: item.author.avatar.url,
            alternativeText: item.author.avatar.alternativeText,
            caption: item.author.avatar.caption,
            width: item.author.avatar.width,
            height: item.author.avatar.height,
          } : undefined,
        } : undefined,
        tags: item.tags ? item.tags.map((tag: any) => ({
          documentId: tag.documentId,
          name: tag.name,
          slug: tag.slug,
        })) : [],
      };
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

export async function getBlogPost(slug: string): Promise<StrapiBlogPost | null> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<any>>(
      `/blog-posts?filters[slug][$eq]=${slug}&populate[0]=author&populate[1]=author.avatar&populate[2]=featuredImage&populate[3]=tags`
    );
    if (!response.data || response.data.length === 0) {
      return null;
    }
    const item = response.data[0];
    return {
      documentId: item.documentId,
      title: item.title,
      slug: item.slug,
      excerpt: item.excerpt,
      content: item.content,
      publishedAt: item.publishedAt,
      updatedAt: item.updatedAt,
      readingTime: item.readingTime || Math.ceil((item.content || '').split(' ').length / 200),
      featuredImage: item.featuredImage ? {
        documentId: item.featuredImage.documentId,
        url: item.featuredImage.url,
        alternativeText: item.featuredImage.alternativeText,
        caption: item.featuredImage.caption,
        width: item.featuredImage.width,
        height: item.featuredImage.height,
      } : undefined,
      author: item.author ? {
        documentId: item.author.documentId,
        name: item.author.name,
        slug: item.author.slug,
        email: item.author.email,
        bio: item.author.bio,
        avatar: item.author.avatar ? {
          documentId: item.author.avatar.documentId,
          url: item.author.avatar.url,
          alternativeText: item.author.avatar.alternativeText,
          caption: item.author.avatar.caption,
          width: item.author.avatar.width,
          height: item.author.avatar.height,
        } : undefined,
      } : undefined,
      tags: item.tags ? item.tags.map((tag: any) => ({
        documentId: tag.documentId,
        name: tag.name,
        slug: tag.slug,
      })) : [],
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function getBlogPostsByTag(tagSlug: string): Promise<StrapiBlogPost[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<any>>(
      `/blog-posts?filters[tags][slug][$eq]=${tagSlug}&populate[0]=author&populate[1]=author.avatar&populate[2]=featuredImage&populate[3]=tags&sort=publishedAt:desc`
    );
    return response.data.map((item: any) => {
      return {
        documentId: item.documentId,
        title: item.title,
        slug: item.slug,
        excerpt: item.excerpt,
        content: item.content,
        publishedAt: item.publishedAt,
        updatedAt: item.updatedAt,
        readingTime: item.readingTime || Math.ceil((item.content || '').split(' ').length / 200),
        featuredImage: item.featuredImage ? {
          documentId: item.featuredImage.documentId,
          url: item.featuredImage.url,
          alternativeText: item.featuredImage.alternativeText,
          caption: item.featuredImage.caption,
          width: item.featuredImage.width,
          height: item.featuredImage.height,
        } : undefined,
        author: item.author ? {
          documentId: item.author.documentId,
          name: item.author.name,
          slug: item.author.slug,
          email: item.author.email,
          bio: item.author.bio,
          avatar: item.author.avatar ? {
            documentId: item.author.avatar.documentId,
            url: item.author.avatar.url,
            alternativeText: item.author.avatar.alternativeText,
            caption: item.author.avatar.caption,
            width: item.author.avatar.width,
            height: item.author.avatar.height,
          } : undefined,
        } : undefined,
        tags: item.tags ? item.tags.map((tag: any) => ({
          documentId: tag.documentId,
          name: tag.name,
          slug: tag.slug,
        })) : [],
      };
    });
  } catch (error) {
    console.error("Error fetching blog posts by tag:", error);
    return [];
  }
}

export async function getBlogTags(): Promise<StrapiTag[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<any>>("/tags?populate=*");
    return response.data.map((tag: any) => ({
      documentId: tag.documentId,
      name: tag.name,
      slug: tag.slug,
    }));
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

export async function getAuthorBySlug(slug: string): Promise<StrapiAuthor | null> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<any>>(
      `/authors?filters[slug][$eq]=${slug}&populate[0]=avatar&populate[1]=blog_posts&populate[2]=blog_posts.featuredImage&populate[3]=blog_posts.tags&populate[4]=blog_posts.author&populate[5]=blog_posts.author.avatar`
    );
    if (!response.data || response.data.length === 0) return null;
    const item = response.data[0];
    return {
      documentId: item.documentId,
      name: item.name,
      slug: item.slug,
      email: item.email,
      bio: item.bio,
      avatar: item.avatar ? {
        documentId: item.avatar.documentId,
        url: item.avatar.url,
        alternativeText: item.avatar.alternativeText,
        caption: item.avatar.caption,
        width: item.avatar.width,
        height: item.avatar.height,
      } : undefined,
      blog_posts: item.blog_posts ? item.blog_posts.map((post: any) => ({
        documentId: post.documentId,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        readingTime: post.readingTime || Math.ceil((post.content || '').split(' ').length / 200),
        featuredImage: post.featuredImage ? {
          documentId: post.featuredImage.documentId,
          url: post.featuredImage.url,
          alternativeText: post.featuredImage.alternativeText,
          caption: post.featuredImage.caption,
          width: post.featuredImage.width,
          height: post.featuredImage.height,
        } : undefined,
        author: post.author ? {
          documentId: post.author.documentId,
          name: post.author.name,
          slug: post.author.slug,
          email: post.author.email,
          bio: post.author.bio,
          avatar: post.author.avatar ? {
            documentId: post.author.avatar.documentId,
            url: post.author.avatar.url,
            alternativeText: post.author.avatar.alternativeText,
            caption: post.author.avatar.caption,
            width: post.author.avatar.width,
            height: post.author.avatar.height,
          } : undefined,
        } : undefined,
        tags: post.tags ? post.tags.map((tag: any) => ({
          documentId: tag.documentId,
          name: tag.name,
          slug: tag.slug,
        })) : [],
      })) : [],
    };
  } catch (error) {
    console.error("Error fetching author:", error);
    return null;
  }
}

export async function getBlogPostsByAuthor(slug: string): Promise<StrapiBlogPost[]> {
  const author = await getAuthorBySlug(slug);
  return author?.blog_posts || [];
}

export async function getAuthors(): Promise<StrapiAuthor[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<any>>(
      "/authors?populate=*"
    );
    return response.data.map((item: any) => ({
      documentId: item.documentId,
      name: item.name,
      slug: item.slug,
      email: item.email,
      bio: item.bio,
      avatar: item.avatar ? {
        documentId: item.avatar.documentId,
        url: item.avatar.url,
        alternativeText: item.avatar.alternativeText,
        caption: item.avatar.caption,
        width: item.avatar.width,
        height: item.avatar.height,
      } : undefined,
    }));
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
} 