import { BookOpen, Users, Tag } from "lucide-react";
import type { Metadata } from "next";

import { SlideIn, StaggerContainer } from "@/components/ui/motion/MotionComponents";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { getBlogPosts, getBlogTags, getAuthors } from "@/lib/strapi";

export const dynamic = "force-dynamic";
export const revalidate = 5; // Revalidate every 5 seconds

export const metadata: Metadata = {
  title: "Blog | EternalCode.pl",
  description: "Discover the latest insights, tutorials, and articles from our team of experts.",
  keywords: ["blog", "articles", "tutorials", "insights", "technology", "programming"],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eternalcode.pl/blog",
    siteName: "EternalCode.pl",
    title: "Blog | EternalCode.pl",
    description: "Discover the latest insights, tutorials, and articles from our team of experts.",
    images: [
      {
        url: "https://eternalcode.pl/api/og?title=Blog&subtitle=Latest insights and tutorials",
        width: 1200,
        height: 630,
        alt: "EternalCode Blog",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@eternalcode",
    creator: "@eternalcode",
    title: "Blog | EternalCode.pl",
    description: "Discover the latest insights, tutorials, and articles from our team of experts.",
    images: ["https://eternalcode.pl/api/og?title=Blog&subtitle=Latest insights and tutorials"],
  },
  alternates: {
    canonical: "https://eternalcode.pl/blog",
  },
};

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const tags = await getBlogTags();
  const authors = await getAuthors();

  return (
    <div className="min-h-screen bg-light-gray-100 dark:bg-gray-900">
      <SlideIn
        direction="down"
        className="relative overflow-hidden bg-light-gray-100 px-0 pb-0 pt-56 dark:bg-gray-900 md:pt-60"
      >
        <div className="mx-auto max-w-(--breakpoint-xl) px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="min-w-0 flex-1">
              <h1 className="mb-2 text-left text-4xl font-extrabold text-gray-900 dark:text-white md:text-5xl">
                Blog
              </h1>
              <div className="mb-2 mt-2 flex flex-wrap gap-6 text-sm">
                <span className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
                  <BookOpen className="h-4 w-4 text-blue-500" /> {posts.length} articles
                </span>
                {authors.length > 0 && (
                  <span className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
                    <Users className="h-4 w-4 text-blue-500" /> {authors.length} authors
                  </span>
                )}
                <span className="flex items-center gap-1 text-gray-700 dark:text-gray-200">
                  <Tag className="h-4 w-4 text-blue-500" /> {tags.length} topics
                </span>
              </div>
            </div>
            <div className="mt-6 min-w-0 flex-1 text-right md:ml-8 md:mt-0">
              <p className="max-w-xl text-left text-lg text-gray-500 dark:text-gray-400 md:text-right">
                Discover the latest insights, tutorials, and articles from our team of experts.
              </p>
            </div>
          </div>
        </div>
      </SlideIn>

      <section className="px-0 py-16">
        <div className="mx-auto max-w-(--breakpoint-xl) px-4">
          {posts.length > 0 ? (
            <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <SlideIn
                  key={post.documentId}
                  direction="up"
                  delay={i * 0.05}
                  className="flex h-full flex-col"
                >
                  <BlogPostCard post={post} />
                </SlideIn>
              ))}
            </StaggerContainer>
          ) : (
            <div className="py-12 text-center">
              <BookOpen size={64} className="mx-auto mb-4 text-gray-400 dark:text-gray-600" />
              <h3 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
                No articles yet
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                We're working on some great content. Check back soon!
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
