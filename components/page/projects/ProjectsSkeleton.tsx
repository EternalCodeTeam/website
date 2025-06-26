"use client";

import React from "react";

import SectionTitle from "@/components/SectionTitle";

export default function ProjectsSkeleton() {
  return (
    <section id="projects">
      <div className="mx-auto max-w-screen-xl px-4 py-16">
        <SectionTitle
          title="Our project"
          description="Below you will find a list of our projects."
        />
        
        {/* Project fake cards */}
        <div className="lg:alternate mt-8 space-y-8 lg:mt-12">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
                {/* Project image placeholder */}
                <div className="h-64 w-full rounded-lg bg-gray-200 dark:bg-gray-700 lg:w-1/2"></div>
                <div className="mt-4 w-full lg:mt-0 lg:w-1/2">
                  {/* Project title placeholder */}
                  <div className="mb-4 h-8 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                  {/* Project description placeholder */}
                  <div className="mb-6 h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-4 w-full rounded-md bg-gray-200 dark:bg-gray-700"></div>
                  {/* Button placeholder */}
                  <div className="mt-8 h-10 w-40 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
} 