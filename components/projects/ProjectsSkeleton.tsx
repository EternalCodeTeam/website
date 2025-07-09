"use client";

import SectionTitle from "@/components/SectionTitle";

export default function ProjectsSkeleton() {
  return (
    <section id="projects" className="animate-pulse">
      <div className="mx-auto max-w-screen-xl px-4 py-20">
        <SectionTitle
          title="Loading Projects..."
          description="Please wait while we load our creations."
        />

        <div className="mt-12 space-y-16">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="flex flex-col gap-8 sm:flex-row sm:items-center">
              <div className="h-64 w-full rounded-xl bg-gray-200 dark:bg-gray-700 sm:w-1/2" />
              <div className="w-full space-y-4 sm:w-1/2">
                <div className="h-8 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-5/6 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="mt-6 h-10 w-40 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
