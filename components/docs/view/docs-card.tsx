"use client";

import { m } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import type { DocProject } from "@/lib/docs-projects";
import { blurIn, type MotionCustom } from "@/lib/animations/variants";

interface DocsCardProps {
  project: DocProject;
}

export function DocsCard({ project }: DocsCardProps) {
  const Icon = project.icon;
  const prefersReducedMotion = useReducedMotion();

  return (
    <m.div
      className="h-full"
      custom={{ reduced: prefersReducedMotion, distance: 20, blur: 4 } satisfies MotionCustom}
      variants={blurIn}
    >
      <Card className="group relative flex h-full flex-col p-6 transition-colors duration-300 hover:bg-gray-50 hover:shadow-md dark:hover:bg-gray-800/60">
        <div
          className={`pointer-events-none absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${project.gradientColor}`}
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 shadow-inner ring-1 ring-gray-200 transition-colors group-hover:bg-white dark:bg-gray-800 dark:ring-gray-700 dark:group-hover:bg-gray-700">
            <Icon
              className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${project.iconColor}`}
            />
          </div>

          <h3 className="mb-2 font-bold text-gray-900 text-xl dark:text-white">{project.title}</h3>

          <p className="mb-6 grow text-gray-600 dark:text-gray-400">{project.description}</p>

          <Button className="w-full justify-center" href={project.path} variant="primary">
            Browse Docs <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </Card>
    </m.div>
  );
}
