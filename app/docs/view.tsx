"use client";

import { DocsBackground } from "@/components/docs/view/docs-background";
import { DocsCard } from "@/components/docs/view/docs-card";
import { DocsHeader } from "@/components/docs/view/docs-header";
import Cta from "@/components/shared/cta-section";
import { MotionSection } from "@/components/ui/motion/motion-components";
import { DOC_PROJECTS } from "@/lib/docs-projects";

export function DocsView() {
  return (
    <div className="relative z-10 min-h-screen overflow-hidden bg-gray-50 pt-28 md:pt-32 dark:bg-[#0a0a0a]">
      <DocsBackground />

      <DocsHeader />

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 pb-6 sm:px-6 lg:px-8">
        <MotionSection className="grid gap-8 md:grid-cols-2 lg:grid-cols-3" stagger={0.08}>
          {DOC_PROJECTS.map((project) => (
            <DocsCard key={project.path} project={project} />
          ))}
        </MotionSection>

        <div className="relative mt-20">
          <div className="absolute top-full left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl filter will-change-transform md:h-[600px] md:w-[600px] dark:bg-blue-500/5" />
          <Cta />
        </div>
      </div>
    </div>
  );
}
