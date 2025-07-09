import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AnimatedSection } from "@/components/animations";
import BlogPostContent from "@/components/blog/BlogPostContent";
import { generateOgImageUrl } from "@/lib/og-utils";
import { getBlogPost, StrapiTag } from "@/lib/strapi";

export const dynamic = "force-dynamic";
export const revalidate = 5;

export async function generateStaticParams() {
  try {
    return [];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

function getImageUrl(url: string) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const base = process.env.NEXT_PUBLIC_ETERNALCODE_STRAPI_URL || '';
  return `${base}${url}`;
}

function getTagsArray(tags: StrapiTag[] | { data: StrapiTag[] } | undefined): StrapiTag[] {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags;
  if ('data' in tags && Array.isArray(tags.data)) return tags.data;
  return [];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
      return {
        title: "Post Not Found | EternalCode.pl",
      };
    }

    const ogImageUrl = post.featuredImage?.url
      ? getImageUrl(post.featuredImage.url)
      : generateOgImageUrl({
          title: post.title,
          subtitle: post.excerpt,
        });

    const tagsArr = getTagsArray(post.tags);

    return {
      title: `${post.title} | EternalCode.pl`,
      description: post.excerpt,
      keywords: tagsArr.map((tag: StrapiTag) => tag.name) || [],
      authors: [{ name: post.author?.name || "EternalCode Team" }],
      openGraph: {
        type: "article",
        locale: "en_US",
        url: `https://eternalcode.pl/blog/${post.slug}`,
        siteName: "EternalCode.pl",
        title: post.title,
        description: post.excerpt,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
        publishedTime: post.publishedAt,
        modifiedTime: post.updatedAt,
        authors: [post.author?.name || "EternalCode Team"],
        tags: tagsArr.map((tag: StrapiTag) => tag.name) || [],
      },
      twitter: {
        card: "summary_large_image",
        site: "@eternalcode",
        creator: "@eternalcode",
        title: post.title,
        description: post.excerpt,
        images: [ogImageUrl],
      },
      alternates: {
        canonical: `https://eternalcode.pl/blog/${post.slug}`,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Post Not Found | EternalCode.pl",
    };
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    if (!post) {
      notFound();
    }

    const tagsArr = getTagsArray(post.tags);

    return (
      <div className="min-h-screen bg-lightGray-100 dark:bg-gray-900">
        {/* Hero Section */}
        <AnimatedSection animationType="fadeDown" className="pt-40 md:pt-48 pb-0">
          <div className="mx-auto max-w-screen-xl px-4">
            <h1 className="mb-4 text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white text-left">
              {post.title}
            </h1>
            <p className="mb-4 text-lg text-gray-600 dark:text-gray-300 text-left">
              {post.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
              {post.author && post.author.slug && (
                <Link href={`/author/${post.author.slug}`} className="flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  {post.author.avatar && (
                    <Image
                      src={getImageUrl(post.author.avatar.url)}
                      alt={post.author.name}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span>By {post.author.name}</span>
                </Link>
              )}
              <span>•</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              {post.readingTime && (
                <>
                  <span>•</span>
                  <span>{post.readingTime} min read</span>
                </>
              )}
            </div>
            {tagsArr.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {tagsArr.map((tag: StrapiTag) => (
                  <span
                    key={tag.documentId}
                    className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Blog Content */}
        <AnimatedSection animationType="fadeUp" className="py-16">
          <div className="mx-auto max-w-screen-xl px-4">
            <BlogPostContent content={post.content} />
          </div>
        </AnimatedSection>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    notFound();
  }
}
