"use client";

import { useState } from "react";
import { BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import BlogPostCard from "@/components/blog/blog-post-card";
import { SlideIn, StaggerContainer } from "@/components/ui/motion/motion-components";
import type { CMSPost } from "@/lib/blog";

type BlogListingProps = {
  posts: CMSPost[];
};

const ITEMS_PER_PAGE = 9;

export default function BlogListing({ posts }: BlogListingProps) {
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination Logic
  const totalPages = Math.ceil(posts.length / ITEMS_PER_PAGE);
  const paginatedPosts = posts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      // Optional: Scroll to top of list
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (posts.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
          <BookOpen className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="mb-2 font-semibold text-gray-900 text-xl dark:text-white">
          No articles yet
        </h3>
        <p className="text-gray-500 dark:text-gray-400">We are working on it! Check back later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Posts Grid */}
      <div className="min-h-[400px]">
        <StaggerContainer className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {paginatedPosts.map((post, i) => (
            <SlideIn key={post.documentId} direction="up" delay={i * 0.05} className="h-full">
              <BlogPostCard post={post} />
            </SlideIn>
          ))}
        </StaggerContainer>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Previous Page"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  type="button"
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`flex h-10 w-10 items-center justify-center rounded-full font-medium text-sm transition-all ${
                    currentPage === page
                      ? "bg-blue-600 text-white shadow-blue-500/30 shadow-lg"
                      : "text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-800"
              aria-label="Next Page"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
