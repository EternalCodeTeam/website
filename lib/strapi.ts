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
      revalidate: 60
    },
  });

  if (!response.ok) {
    throw new Error(`Strapi API error: ${response.status} ${response.statusText}`);
  }

  return response.json() as Promise<T>;
}

export async function getBlogPosts(): Promise<StrapiBlogPost[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<{
      id: number;
      attributes: {
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        publishedAt: string;
        updatedAt: string;
        readingTime?: number;
        featuredImage?: {
          data?: {
            id: number;
            attributes: StrapiImage;
          };
        };
        author?: {
          data?: {
            id: number;
            attributes: {
              name: string;
              slug: string;
              email?: string;
              bio?: string;
              avatar?: {
                data?: {
                  id: number;
                  attributes: StrapiImage;
                };
              };
            };
          };
        };
        tags?: {
          data?: Array<{
            id: number;
            attributes: StrapiTag;
          }>;
        };
      };
    }>>(
      "/blog-posts?" +
      "populate[featuredImage][populate]=*&" +
      "populate[author][fields][0]=name&" +
      "populate[author][fields][1]=slug&" +
      "populate[author][fields][2]=email&" +
      "populate[author][fields][3]=bio&" +
      "populate[author][populate][avatar][fields][0]=url&" +
      "populate[tags][populate]=*&sort=publishedAt:desc"
    );

    return response.data.map((item) => {
      const post = item.attributes;
      return {
        id: item.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        readingTime: post.readingTime || Math.ceil((post.content || '').split(' ').length / 200),
        featuredImage: post.featuredImage?.data ? {
          id: post.featuredImage.data.id,
          url: post.featuredImage.data.attributes.url,
          alternativeText: post.featuredImage.data.attributes.alternativeText,
          caption: post.featuredImage.data.attributes.caption,
          width: post.featuredImage.data.attributes.width,
          height: post.featuredImage.data.attributes.height,
        } : undefined,
        author: post.author?.data ? {
          id: post.author.data.id,
          name: post.author.data.attributes.name,
          slug: post.author.data.attributes.slug,
          email: post.author.data.attributes.email,
          bio: post.author.data.attributes.bio,
          avatar: post.author.data.attributes.avatar?.data ? {
            id: post.author.data.attributes.avatar.data.id,
            url: post.author.data.attributes.avatar.data.attributes.url,
            alternativeText: post.author.data.attributes.avatar.data.attributes.alternativeText,
            caption: post.author.data.attributes.avatar.data.attributes.caption,
            width: post.author.data.attributes.avatar.data.attributes.width,
            height: post.author.data.attributes.avatar.data.attributes.height,
          } : undefined,
        } : undefined,
        tags: post.tags?.data ? post.tags.data.map((tag) => ({
          id: tag.id,
          name: tag.attributes.name,
          slug: tag.attributes.slug,
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
    const response = await fetchFromStrapi<StrapiResponse<{
      id: number;
      attributes: {
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        publishedAt: string;
        updatedAt: string;
        readingTime?: number;
        featuredImage?: {
          data?: {
            id: number;
            attributes: StrapiImage;
          };
        };
        author?: {
          data?: {
            id: number;
            attributes: {
              name: string;
              slug: string;
              email?: string;
              bio?: string;
              avatar?: {
                data?: {
                  id: number;
                  attributes: StrapiImage;
                };
              };
            };
          };
        };
        tags?: {
          data?: Array<{
            id: number;
            attributes: StrapiTag;
          }>;
        };
      };
    }>>(
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
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      readingTime: post.readingTime || Math.ceil((post.content || '').split(' ').length / 200),
      featuredImage: post.featuredImage?.data ? {
        id: post.featuredImage.data.id,
        url: post.featuredImage.data.attributes.url,
        alternativeText: post.featuredImage.data.attributes.alternativeText,
        caption: post.featuredImage.data.attributes.caption,
        width: post.featuredImage.data.attributes.width,
        height: post.featuredImage.data.attributes.height,
      } : undefined,
      author: post.author?.data ? {
        id: post.author.data.id,
        name: post.author.data.attributes.name,
        slug: post.author.data.attributes.slug,
        email: post.author.data.attributes.email,
        bio: post.author.data.attributes.bio,
        avatar: post.author.data.attributes.avatar?.data ? {
          id: post.author.data.attributes.avatar.data.id,
          url: post.author.data.attributes.avatar.data.attributes.url,
          alternativeText: post.author.data.attributes.avatar.data.attributes.alternativeText,
          caption: post.author.data.attributes.avatar.data.attributes.caption,
          width: post.author.data.attributes.avatar.data.attributes.width,
          height: post.author.data.attributes.avatar.data.attributes.height,
        } : undefined,
      } : undefined,
      tags: post.tags?.data ? post.tags.data.map((tag) => ({
        id: tag.id,
        name: tag.attributes.name,
        slug: tag.attributes.slug,
      })) : [],
    };
    
    return processedPost;
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return null;
  }
}

export async function getBlogPostsByTag(tagSlug: string): Promise<StrapiBlogPost[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<{
      id: number;
      attributes: {
        title: string;
        slug: string;
        excerpt: string;
        content: string;
        publishedAt: string;
        updatedAt: string;
        readingTime?: number;
        featuredImage?: {
          data?: {
            id: number;
            attributes: StrapiImage;
          };
        };
        author?: {
          data?: {
            id: number;
            attributes: {
              name: string;
              slug: string;
              email?: string;
              bio?: string;
              avatar?: {
                data?: {
                  id: number;
                  attributes: StrapiImage;
                };
              };
            };
          };
        };
        tags?: {
          data?: Array<{
            id: number;
            attributes: StrapiTag;
          }>;
        };
      };
    }>>(
      `/blog-posts?filters[tags][slug][$eq]=${tagSlug}&populate[featuredImage][populate]=*&populate[author][populate]=*&populate[tags][populate]=*&sort=publishedAt:desc`
    );

    return response.data.map((item) => {
      const post = item.attributes;
      return {
        id: item.id,
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        publishedAt: post.publishedAt,
        updatedAt: post.updatedAt,
        readingTime: post.readingTime || Math.ceil((post.content || '').split(' ').length / 200),
        featuredImage: post.featuredImage?.data ? {
          id: post.featuredImage.data.id,
          url: post.featuredImage.data.attributes.url,
          alternativeText: post.featuredImage.data.attributes.alternativeText,
          caption: post.featuredImage.data.attributes.caption,
          width: post.featuredImage.data.attributes.width,
          height: post.featuredImage.data.attributes.height,
        } : undefined,
        author: post.author?.data ? {
          id: post.author.data.id,
          name: post.author.data.attributes.name,
          slug: post.author.data.attributes.slug,
          email: post.author.data.attributes.email,
          bio: post.author.data.attributes.bio,
          avatar: post.author.data.attributes.avatar?.data ? {
            id: post.author.data.attributes.avatar.data.id,
            url: post.author.data.attributes.avatar.data.attributes.url,
            alternativeText: post.author.data.attributes.avatar.data.attributes.alternativeText,
            caption: post.author.data.attributes.avatar.data.attributes.caption,
            width: post.author.data.attributes.avatar.data.attributes.width,
            height: post.author.data.attributes.avatar.data.attributes.height,
          } : undefined,
        } : undefined,
        tags: post.tags?.data ? post.tags.data.map((tag) => ({
          id: tag.id,
          name: tag.attributes.name,
          slug: tag.attributes.slug,
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
    const response = await fetchFromStrapi<StrapiResponse<StrapiTag>>("/tags");
    return response.data;
  } catch (error) {
    console.error("Error fetching tags:", error);
    return [];
  }
}

export async function getAuthorBySlug(slug: string): Promise<StrapiAuthor | null> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<{
      id: number;
      attributes: {
        name: string;
        slug: string;
        email?: string;
        bio?: string;
        avatar?: {
          data?: {
            id: number;
            attributes: StrapiImage;
          };
        };
        blog_posts?: {
          data?: Array<{
            id: number;
            attributes: {
              title: string;
              slug: string;
              excerpt: string;
              content: string;
              publishedAt: string;
              updatedAt: string;
              readingTime?: number;
              featuredImage?: {
                data?: {
                  id: number;
                  attributes: StrapiImage;
                };
              };
              tags?: {
                data?: Array<{
                  id: number;
                  attributes: StrapiTag;
                }>;
              };
            };
          }>;
        };
      };
    }>>(
      `/authors?filters[slug][$eq]=${slug}&populate=avatar,blog_posts,blog_posts.featuredImage,blog_posts.tags`
    );
    if (!response.data || response.data.length === 0) return null;
    const item = response.data[0];
    const author = item.attributes;
    return {
      id: item.id,
      name: author.name,
      slug: author.slug,
      email: author.email,
      bio: author.bio,
      avatar: author.avatar?.data
        ? {
            id: author.avatar.data.id,
            url: author.avatar.data.attributes.url,
            alternativeText: author.avatar.data.attributes.alternativeText,
            caption: author.avatar.data.attributes.caption,
            width: author.avatar.data.attributes.width,
            height: author.avatar.data.attributes.height,
          }
        : undefined,
      blog_posts: author.blog_posts?.data
        ? author.blog_posts.data.map((post) => ({
            id: post.id,
            title: post.attributes.title,
            slug: post.attributes.slug,
            excerpt: post.attributes.excerpt,
            content: post.attributes.content,
            publishedAt: post.attributes.publishedAt,
            updatedAt: post.attributes.updatedAt,
            readingTime: post.attributes.readingTime || Math.ceil((post.attributes.content || '').split(' ').length / 200),
            featuredImage: post.attributes.featuredImage?.data
              ? {
                  id: post.attributes.featuredImage.data.id,
                  url: post.attributes.featuredImage.data.attributes.url,
                  alternativeText: post.attributes.featuredImage.data.attributes.alternativeText,
                  caption: post.attributes.featuredImage.data.attributes.caption,
                  width: post.attributes.featuredImage.data.attributes.width,
                  height: post.attributes.featuredImage.data.attributes.height,
                }
              : undefined,
            tags: post.attributes.tags?.data
              ? post.attributes.tags.data.map((tag) => ({
                  id: tag.id,
                  name: tag.attributes.name,
                  slug: tag.attributes.slug,
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

export async function getBlogPostsByAuthor(slug: string): Promise<StrapiBlogPost[]> {
  const author = await getAuthorBySlug(slug);
  return author?.blog_posts || [];
}

export async function getAuthors(): Promise<StrapiAuthor[]> {
  try {
    const response = await fetchFromStrapi<StrapiResponse<{
      id: number;
      attributes: {
        name: string;
        slug: string;
        email?: string;
        bio?: string;
        avatar?: {
          data?: {
            id: number;
            attributes: StrapiImage;
          };
        };
      };
    }>>(
      "/authors?populate=avatar"
    );
    return response.data.map((item) => {
      const author = item.attributes;
      return {
        id: item.id,
        name: author.name,
        slug: author.slug,
        email: author.email,
        bio: author.bio,
        avatar: author.avatar?.data
          ? {
              id: author.avatar.data.id,
              url: author.avatar.data.attributes.url,
              alternativeText: author.avatar.data.attributes.alternativeText,
              caption: author.avatar.data.attributes.caption,
              width: author.avatar.data.attributes.width,
              height: author.avatar.data.attributes.height,
            }
          : undefined,
      };
    });
  } catch (error) {
    console.error("Error fetching authors:", error);
    return [];
  }
} 