"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { SlideIn, StaggerContainer } from "@/components/ui/motion/MotionComponents";
import { slideUp } from "@/lib/animations/variants";
import JavaIcon from "@/components/icons/java";
import GitBranchIcon from "@/components/icons/git-branch";
import TabNew from "@/components/icons/tab-new";
import SectionTitle from "@/components/SectionTitle";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

export default function Features() {
  const features: Feature[] = [
    {
      icon: <JavaIcon className="h-8 w-8" aria-hidden="true" />,
      title: "Java Ecosystem",
      description:
        "We harness the full power of the Java ecosystem to build scalable, high-performance server-side applications and plugins that you can rely on.",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: <GitBranchIcon className="h-8 w-8" aria-hidden="true" />,
      title: "Open Source",
      description:
        "We believe in the power of open source. Transparency, collaboration, and community are the core values that drive every line of code we write.",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: <TabNew className="h-8 w-8" aria-hidden="true" />,
      title: "Modern Web Stack",
      description:
        "We don't just write code; we create experiences. Utilizing Next.js and modern web standards to deliver fast, accessible, and beautiful interfaces.",
      color: "from-blue-500/20 to-cyan-500/20",
    },
  ];

  return (
    <section id="features" className="py-12 lg:py-24 relative" aria-labelledby="features-heading">
      {/* Background blobs for this section */}
      <div className="absolute right-0 top-1/2 -y-1/2 w-64 h-64 md:w-96 md:h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 relative z-10">
        <SlideIn direction="up">
          <SectionTitle
            id="features-heading"
            title="Our Tech Stack"
            description="We leverage industry-standard technologies to build high-quality software."
          />
        </SlideIn>

        <StaggerContainer className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={slideUp}
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-md dark:bg-gray-900/40 dark:ring-gray-800 dark:hover:bg-gray-800/60"
            >
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${feature.color} pointer-events-none`}
              />

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 dark:bg-gray-800 group-hover:bg-white dark:group-hover:bg-gray-700 transition-colors shadow-inner ring-1 ring-gray-200 dark:ring-gray-700">
                <div className="text-gray-900 dark:text-white transition-transform group-hover:scale-110 duration-300">
                  {feature.icon}
                </div>
              </div>

              <h3 className="text-xl font-bold leading-7 text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>

              <p className="mt-4 flex-auto text-base leading-7 text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
