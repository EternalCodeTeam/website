import { BookOpen, Tag, Users } from "lucide-react";
import type { Metadata } from "next";
import BlogPostCard from "@/components/blog/BlogPostCard";
import { FacadePattern } from "@/components/ui/facade-pattern";
import { SlideIn, StaggerContainer } from "@/components/ui/motion/MotionComponents";
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
        <SlideIn className="relative px-0 pt-56 pb-0 md:pt-60" direction="down">
          <div className="mx-auto max-w-(--breakpoint-xl) px-4">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className="min-w-0 flex-1">
                <h1 className="mb-2 text-left font-extrabold text-4xl text-gray-900 md:text-5xl dark:text-white">
                  Blog
                </h1>
                <div className="mt-2 mb-2 flex flex-wrap gap-6 text-sm">
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
              <div className="mt-6 min-w-0 flex-1 text-right md:mt-0 md:ml-8">
                <p className="max-w-xl text-left text-gray-500 text-lg md:text-right dark:text-gray-400">
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
              <div className="py-12 text-center">
                <BookOpen className="mx-auto mb-4 text-gray-400 dark:text-gray-600" size={64} />
                <h3 className="mb-2 font-semibold text-gray-900 text-xl dark:text-white">
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
    </div>
  );
}
