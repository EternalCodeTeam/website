"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import GitBranchIcon from "@/components/icons/git-branch";
import JavaIcon from "@/components/icons/java";
import TabNew from "@/components/icons/tab-new";
import SectionTitle from "@/components/SectionTitle";
import { SlideIn, StaggerContainer } from "@/components/ui/motion/MotionComponents";
import { slideUp } from "@/lib/animations/variants";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

export default function Features() {
  const features: Feature[] = [
    {
      icon: <JavaIcon aria-hidden="true" className="h-8 w-8" />,
      title: "Java Ecosystem",
      description:
        "We harness the full power of the Java ecosystem to build scalable, high-performance server-side applications and plugins that you can rely on.",
      color: "from-orange-500/20 to-red-500/20",
    },
    {
      icon: <GitBranchIcon aria-hidden="true" className="h-8 w-8" />,
      title: "Open Source",
      description:
        "We believe in the power of open source. Transparency, collaboration, and community are the core values that drive every line of code we write.",
      color: "from-green-500/20 to-emerald-500/20",
    },
    {
      icon: <TabNew aria-hidden="true" className="h-8 w-8" />,
      title: "Modern Web Stack",
      description:
        "We don't just write code; we create experiences. Utilizing Next.js and modern web standards to deliver fast, accessible, and beautiful interfaces.",
      color: "from-blue-500/20 to-cyan-500/20",
    },
  ];

  return (
    <section aria-labelledby="features-heading" className="relative py-12 lg:py-24" id="features">
      {/* Background blobs for this section */}
      <div className="-y-1/2 pointer-events-none absolute top-1/2 right-0 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl md:h-96 md:w-96" />

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <SlideIn direction="up">
          <SectionTitle
            description="We leverage industry-standard technologies to build high-quality software."
            id="features-heading"
            title="Our Tech Stack"
          />
        </SlideIn>

        <StaggerContainer className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <motion.div
              className="group relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200 transition-all hover:bg-gray-50 hover:shadow-md dark:bg-gray-900/40 dark:ring-gray-800 dark:hover:bg-gray-800/60"
              key={feature.title}
              variants={slideUp}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${feature.color} pointer-events-none`}
              />

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-50 shadow-inner ring-1 ring-gray-200 transition-colors group-hover:bg-white dark:bg-gray-800 dark:ring-gray-700 dark:group-hover:bg-gray-700">
                <div className="text-gray-900 transition-transform duration-300 group-hover:scale-110 dark:text-white">
                  {feature.icon}
                </div>
              </div>

              <h3 className="font-bold text-gray-900 text-xl leading-7 dark:text-gray-100">
                {feature.title}
              </h3>

              <p className="mt-4 flex-auto text-base text-gray-600 leading-7 dark:text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
