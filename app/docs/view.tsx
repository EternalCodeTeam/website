"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { containerVariants } from "@/components/docs/view/animations";
import { DocsBackground } from "@/components/docs/view/docs-background";
import { DocsCard } from "@/components/docs/view/docs-card";
import { DocsHeader } from "@/components/docs/view/docs-header";
import Cta from "@/components/shared/cta-section";
import { DOC_PROJECTS } from "@/lib/docs-projects";

export function DocsView() {
  const router = useRouter();

  useEffect(() => {
    const prefetchDocs = () => {
      for (const project of DOC_PROJECTS) {
        router.prefetch(project.entryPath ?? project.path);
      }
    };

    if (typeof window === "undefined") {
      return;
    }

    const runtime = globalThis as Window & typeof globalThis;
    const idleCallback = runtime.requestIdleCallback;
    if (idleCallback) {
      const idleId = idleCallback(prefetchDocs);
      return () => {
        runtime.cancelIdleCallback?.(idleId);
      };
    }

    const timeoutId = setTimeout(prefetchDocs, 500);
    return () => clearTimeout(timeoutId);
  }, [router]);

  return (
    <div className="relative z-10 min-h-screen overflow-hidden bg-gray-50 pt-28 md:pt-32 dark:bg-[#0a0a0a]">
      <DocsBackground />

      <DocsHeader />

      <div className="relative z-10 mx-auto max-w-[90rem] px-4 pb-6 sm:px-6 lg:px-8">
        <motion.div
          animate="visible"
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          variants={containerVariants}
        >
          {DOC_PROJECTS.map((project) => (
            <DocsCard key={project.path} project={project} />
          ))}
        </motion.div>

        <div className="relative mt-20">
          <div className="absolute top-full left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-3xl filter will-change-transform md:h-[600px] md:w-[600px] dark:bg-blue-500/5" />
          <Cta />
        </div>
      </div>
    </div>
  );
}
