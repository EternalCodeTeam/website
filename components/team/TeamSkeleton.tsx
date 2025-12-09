"use client";

import { SlideIn, StaggerContainer } from "@/components/ui/motion/MotionComponents";
import SectionTitle from "@/components/SectionTitle";

export default function TeamSkeleton() {
  const skeletons = Array.from({ length: 8 }, (_, i) => `skeleton-${i}`);

  return (
    <section id="team">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-16">
        <SlideIn direction="down" delay={0.1}>
          <SectionTitle
            title="Our Team"
            description="EternalCodeTeam is a dedicated group of creative programmers who work on unique open source projects."
          />
        </SlideIn>

        <StaggerContainer className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {skeletons.map((id) => (
            <SlideIn key={id} direction="up" style={{ minHeight: 320 }}>
              <div className="mx-auto mb-4 h-36 w-36 rounded-full bg-gray-200 dark:bg-gray-700"></div>
              <div className="mx-auto mb-2 h-6 w-3/4 rounded-md bg-gray-200 dark:bg-gray-700"></div>
              <div className="mx-auto mb-4 h-4 w-1/2 rounded-md bg-gray-200 dark:bg-gray-700"></div>
              <div className="mt-4 flex justify-center space-x-4">
                <div className="h-6 w-6 rounded-md bg-gray-200 dark:bg-gray-700"></div>
                <div className="h-6 w-6 rounded-md bg-gray-200 dark:bg-gray-700"></div>
              </div>
            </SlideIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
