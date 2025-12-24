import type { Metadata } from "next";

import BlogListing from "@/components/blog/blog-listing";
import { SlideIn } from "@/components/ui/motion/motion-components";

import { getBlogPosts } from "@/lib/blog";

export const dynamic = "force-dynamic";
export const revalidate = 60; // Increased revalidation time slightly

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

  return (
    <div className="relative min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">
      {/* Background Decor */}
      <div className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden">
        {/* Top Right - Indigo/Purple */}
        <div className="absolute top-0 right-[-10%] h-[600px] w-[600px] rounded-full bg-indigo-500/10 mix-blend-multiply blur-3xl filter dark:bg-indigo-500/5 dark:mix-blend-screen" />
        {/* Middle Left - Rose/Pink */}
        <div className="absolute top-[20%] left-[-10%] h-[600px] w-[600px] rounded-full bg-rose-500/10 mix-blend-multiply blur-3xl filter dark:bg-rose-500/5 dark:mix-blend-screen" />
        {/* Bottom Center - Blue */}
        <div className="-translate-x-1/2 absolute bottom-[-10%] left-1/2 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl filter dark:bg-blue-500/5" />

        <div className="absolute inset-0 h-full opacity-30 dark:opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>
      </div>

      <div className="relative z-10 px-4 pt-48 pb-12 md:pt-56 md:pb-16">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <SlideIn className="mb-20 text-center" direction="down">
            <h1 className="mb-6 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text py-2 font-extrabold text-5xl text-transparent tracking-tight md:text-6xl lg:text-7xl dark:from-white dark:via-gray-100 dark:to-white">
              Insights & Thoughts
            </h1>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg dark:text-gray-400">
              Exploring the frontiers of technology, coding, and digital innovation.
            </p>
          </SlideIn>

          {/* Content Listing */}
          <BlogListing posts={posts} />
        </div>
      </div>
    </div>
  );
}
