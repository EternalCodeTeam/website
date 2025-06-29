// Types for Strapi CMS integration
export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
  caption?: string;
  width: number;
  height: number;
}

export interface StrapiAuthor {
  id: number;
  name: string;
  slug: string;
  email?: string;
  avatar?: StrapiImage;
  bio?: string;
  blog_posts?: StrapiBlogPost[];
}

export interface StrapiTag {
  id: number;
  name: string;
  slug: string;
}

export interface StrapiBlogPost {
  id: number;
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
  meta: any;
}

// Strapi API configuration
const STRAPI_URL = process.env.ETERNALCODE_STRAPI_URL || "http://localhost:1337";
const STRAPI_API_TOKEN = process.env.ETERNALCODE_STRAPI_KEY;

if (!STRAPI_URL) {
  throw new Error("STRAPI_URL environment variable is required");
}

if (!STRAPI_API_TOKEN) {
  throw new Error("STRAPI_API_TOKEN environment variable is required");
}

// Helper function to make API requests
async function fetchFromStrapi<T>(endpoint: string): Promise<T> {
  const url = `${STRAPI_URL}/api${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${STRAPI_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

// Fetch all blog posts
export async function getBlogPosts(): Promise<StrapiBlogPost[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<any>>(
      "/blog-posts?" +
      "populate[featuredImage][populate]=*&" +
      "populate[author][fields][0]=name&" +
      "populate[author][fields][1]=slug&" +
      "populate[author][fields][2]=email&" +
      "populate[author][fields][3]=bio&" +
      "populate[author][populate][avatar][fields][0]=url&" +
      "populate[tags][populate]=*&sort=publishedAt:desc"
    );

    return response.data.map((item: any) => {
      const post = item.attributes;
      return {
        id: item.id,
        ...post,
        featuredImage: post.featuredImage?.data ? {
          id: post.featuredImage.data.id,
          ...post.featuredImage.data.attributes,
        } : undefined,
        author: post.author?.data ? {
          id: post.author.data.id,
          ...post.author.data.attributes,
          avatar: post.author.data.attributes.avatar?.data ? {
            id: post.author.data.attributes.avatar.data.id,
            ...post.author.data.attributes.avatar.data.attributes,
          } : undefined,
        } : undefined,
        tags: post.tags?.data ? post.tags.data.map((tag: any) => ({
          id: tag.id,
          ...tag.attributes,
        })) : [],
        readingTime: post.readingTime || Math.ceil((post.content || '').split(' ').length / 200),
      };
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Fetch a single blog post by slug
export async function getBlogPost(slug: string): Promise<StrapiBlogPost | null> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<any>>(
      `/blog-posts?filters[slug][$eq]=${slug}` +
      "&populate[featuredImage][populate]=*" +
      "&populate[author][fields][0]=name" +
      "&populate[author][fields][1]=slug" +
      "&populate[author][fields][2]=email" +
      "&populate[author][fields][3]=bio" +
      "&populate[author][populate][avatar][fields][0]=url" +
      "&populate[tags][populate]=*"
    );

    if (!response.data || response.data.length === 0) {
      return null;
    }

    const item = response.data[0];
    const post = item.attributes;
    
    const processedPost = {
      id: item.id,
      ...post,
      featuredImage: post.featuredImage?.data ? {
        id: post.featuredImage.data.id,
        ...post.featuredImage.data.attributes,
      } : undefined,
      author: post.author?.data ? {
        id: post.author.data.id,
        ...post.author.data.attributes,
        avatar: post.author.data.attributes.avatar?.data ? {
          id: post.author.data.attributes.avatar.data.id,
          ...post.author.data.attributes.avatar.data.attributes,
        } : undefined,
      } : undefined,
      tags: post.tags?.data ? post.tags.data.map((tag: any) => ({
        id: tag.id,
        ...tag.attributes,
      })) : [],
      readingTime: post.readingTime || Math.ceil((post.content || '').split(' ').length / 200),
    };
    
    return processedPost;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

// Fetch blog posts by tag
export async function getBlogPostsByTag(tagSlug: string): Promise<StrapiBlogPost[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<any>>(
      `/blog-posts?filters[tags][slug][$eq]=${tagSlug}&populate[featuredImage][populate]=*&populate[author][populate]=*&populate[tags][populate]=*&sort=publishedAt:desc`
    );

    return response.data.map((item: any) => {
      const post = item.attributes;
      return {
        id: item.id,
        ...post,
        featuredImage: post.featuredImage?.data ? {
          id: post.featuredImage.data.id,
          ...post.featuredImage.data.attributes,
        } : undefined,
        author: post.author?.data ? {
          id: post.author.data.id,
          ...post.author.data.attributes,
          avatar: post.author.data.attributes.avatar?.data ? {
            id: post.author.data.attributes.avatar.data.id,
            ...post.author.data.attributes.avatar.data.attributes,
          } : undefined,
        } : undefined,
        tags: post.tags?.data ? post.tags.data.map((tag: any) => ({
          id: tag.id,
          ...tag.attributes,
        })) : [],
        readingTime: post.readingTime || Math.ceil((post.content || '').split(' ').length / 200),
      };
    });
  } catch (error) {
    console.error("Error fetching blog posts by tag:", error);
    return [];
  }
}

// Fetch all tags
export async function getBlogTags(): Promise<StrapiTag[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<StrapiTag>>("/tags");
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

// Fetch author by slug
export async function getAuthorBySlug(slug: string): Promise<StrapiAuthor | null> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<any>>(
      `/authors?filters[slug][$eq]=${slug}&populate=avatar,blog_posts,blog_posts.featuredImage,blog_posts.tags`
    );
    if (!response.data || response.data.length === 0) return null;
    const item = response.data[0];
    const author = item.attributes;
    return {
      id: item.id,
      ...author,
      avatar: author.avatar?.data
        ? { id: author.avatar.data.id, ...author.avatar.data.attributes }
        : undefined,
      blog_posts: author.blog_posts?.data
        ? author.blog_posts.data.map((post: any) => ({
            id: post.id,
            ...post.attributes,
            featuredImage: post.attributes.featuredImage?.data
              ? {
                  id: post.attributes.featuredImage.data.id,
                  ...post.attributes.featuredImage.data.attributes,
                }
              : undefined,
            tags: post.attributes.tags?.data
              ? post.attributes.tags.data.map((tag: any) => ({
                  id: tag.id,
                  ...tag.attributes,
                }))
              : [],
          }))
        : [],
    };
  } catch (error) {
    console.error("Error fetching author:", error);
    return null;
  }
}

// Fetch blog posts by author (using relation from author)
export async function getBlogPostsByAuthor(slug: string): Promise<StrapiBlogPost[]> {
  const author = await getAuthorBySlug(slug);
  return author?.blog_posts || [];
}

// Fetch all authors (not used, but keep for possible future use)
export async function getAuthors(): Promise<StrapiAuthor[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<any>>(
      "/authors?populate=avatar"
    );
    return response.data.map((item: any) => {
      const author = item.attributes;
      return {
        id: item.id,
        ...author,
        avatar: author.avatar?.data
          ? { id: author.avatar.data.id, ...author.avatar.data.attributes }
          : undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
} 