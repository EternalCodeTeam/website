import { BookOpen, Tag, Users } from "lucide-react";
import type { Metadata } from "next";
import BlogPostCard from "@/components/blog/blog-post-card";
import { FacadePattern } from "@/components/ui/facade-pattern";
import { SlideIn, StaggerContainer } from "@/components/ui/motion/motion-components";
import { getAuthors, getBlogPosts, getBlogTags } from "@/lib/strapi";

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
    <div className="relative min-h-screen overflow-hidden bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none">
        {/* Top Right - Orange/Amber for "Reading/Warmth" */}
        <div className="absolute top-0 right-[-10%] h-[600px] w-[600px] rounded-full bg-orange-500/10 mix-blend-multiply blur-3xl filter dark:bg-orange-500/5 dark:mix-blend-screen" />
        {/* Middle Left - Blue for "Tech" */}
        <div className="absolute top-[30%] left-[-10%] h-[600px] w-[600px] rounded-full bg-blue-500/10 mix-blend-multiply blur-3xl filter dark:bg-blue-500/5 dark:mix-blend-screen" />
        {/* Bottom Center - Purple */}
        <div className="-translate-x-1/2 absolute bottom-[-10%] left-1/2 h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-3xl filter dark:bg-purple-500/5" />

        <FacadePattern className="absolute inset-0 h-full opacity-30 dark:opacity-10" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <SlideIn className="relative px-4 pt-48 pb-12 md:pt-56 md:pb-16" direction="down">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h1 className="mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text font-extrabold text-5xl text-transparent tracking-tight md:text-6xl lg:text-7xl dark:from-white dark:via-gray-100 dark:to-white">
                Blog
              </h1>
              <p className="mx-auto mb-8 max-w-2xl text-base text-gray-600 leading-relaxed md:text-lg lg:text-xl dark:text-gray-400">
                Discover the latest insights, tutorials, and articles from our team of experts.
              </p>

              {/* Stats */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm md:gap-8 md:text-base">
                <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <BookOpen className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold">{posts.length}</span> articles
                </span>
                {authors.length > 0 && (
                  <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Users className="h-5 w-5 text-blue-500" />
                    <span className="font-semibold">{authors.length}</span> authors
                  </span>
                )}
                <span className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <Tag className="h-5 w-5 text-blue-500" />
                  <span className="font-semibold">{tags.length}</span> topics
                </span>
              </div>
            </div>
          </div>
        </SlideIn>

        {/* Blog Posts Grid */}
        <section className="px-4 py-16 md:py-20">
          <div className="mx-auto max-w-7xl">
            {posts.length > 0 ? (
              <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {posts.map((post, i) => (
                  <SlideIn
                    className="flex h-full flex-col"
                    delay={i * 0.05}
                    direction="up"
                    key={post.documentId}
                  >
                    <BlogPostCard post={post} />
                  </SlideIn>
                ))}
              </StaggerContainer>
            ) : (
              <div className="py-20 text-center">
                <BookOpen className="mx-auto mb-6 text-gray-400 dark:text-gray-600" size={64} />
                <h3 className="mb-3 font-semibold text-2xl text-gray-900 dark:text-white">
                  No articles yet
                </h3>
                <p className="text-gray-600 text-lg dark:text-gray-400">
                  We're working on some great content. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
