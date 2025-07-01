import { BookOpen, Users, Tag } from "lucide-react";
import { Metadata } from "next";

import { AnimatedSection, AnimatedContainer, AnimatedElement } from "@/components/animations";
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
    <div className="min-h-screen bg-lightGray-100 dark:bg-gray-900">
      <AnimatedSection animationType="fadeDown" className="relative overflow-hidden bg-lightGray-100 dark:bg-gray-900 px-0 pt-40 md:pt-48 pb-0">
        <div className="mx-auto max-w-screen-xl px-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-2 text-left">
                Blog
              </h1>
              <div className="flex flex-wrap gap-6 text-sm mb-2 mt-2">
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
            <div className="flex-1 min-w-0 mt-6 md:mt-0 md:ml-8 text-right">
              <p className="text-lg text-gray-500 dark:text-gray-400 max-w-xl md:text-right text-left">
                Discover the latest insights, tutorials, and articles from our team of experts.
              </p>
            </div>
          </div>
        </div>
      </AnimatedSection>

      <section className="px-0 py-16">
        <div className="mx-auto max-w-screen-xl px-4">
          {posts.length > 0 ? (
            <AnimatedContainer as="div" staggerDelay={0.12} className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <AnimatedElement key={post.documentId} animationType="fadeUp" delay={i * 0.05} className="h-full flex flex-col">
                  <BlogPostCard post={post} />
                </AnimatedElement>
              ))}
            </AnimatedContainer>
          ) : (
            <div className="text-center py-12">
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