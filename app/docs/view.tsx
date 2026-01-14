"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Cta from "@/components/shared/cta-section";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DOC_PROJECTS, DOCS_PAGE_CONFIG } from "@/lib/docs-projects";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0, filter: "blur(4px)" },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 24,
      mass: 1,
    },
  },
};

const MotionCard = motion.create(Card);

interface DocsCardProps {
  project: (typeof DOC_PROJECTS)[number];
}

function DocsCard({ project }: DocsCardProps) {
  const Icon = project.icon;

  return (
    <MotionCard
      className="group relative flex h-full flex-col p-6 hover:bg-gray-50 hover:shadow-md dark:hover:bg-gray-800/60"
      variants={itemVariants}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${project.gradientColor}`}
      />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 shadow-inner ring-1 ring-gray-200 transition-colors group-hover:bg-white dark:bg-gray-800 dark:ring-gray-700 dark:group-hover:bg-gray-700">
          <Icon
            className={`h-6 w-6 transition-transform duration-300 group-hover:scale-110 ${project.iconColor}`}
          />
        </div>

        <h3 className="mb-2 font-bold text-gray-900 text-xl dark:text-white">{project.title}</h3>

        <p className="mb-6 flex-grow text-gray-600 dark:text-gray-400">{project.description}</p>

        <Button className="w-full justify-center" href={project.path} variant="primary">
          Browse Docs <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </MotionCard>
  );
}

export function DocsView() {
  const { title, description } = DOCS_PAGE_CONFIG;

  return (
    <div className="relative z-10 min-h-screen overflow-hidden bg-gray-50 pt-28 md:pt-32 dark:bg-[#0a0a0a]">
      {/* Background decoration matching Contribute */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[20%] -left-[10%] h-[500px] w-[500px] rounded-full bg-purple-500/10 blur-[100px]" />
        <div className="absolute top-[50%] -right-[10%] h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[100px]" />
      </div>

      <section className="relative pt-32 pb-8 lg:pt-48 lg:pb-12">
        <div className="relative z-10 mx-auto max-w-[90rem] px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 flex flex-col items-center">
              <h1 className="mb-6 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-600 bg-clip-text font-bold text-4xl text-transparent tracking-tight sm:text-5xl dark:from-white dark:via-gray-100 dark:to-gray-400">
                {title}
              </h1>
              <p className="max-w-2xl whitespace-pre-line text-gray-600 text-lg dark:text-gray-400">
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>

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
