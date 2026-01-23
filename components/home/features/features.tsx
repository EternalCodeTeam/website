"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";
import GitBranchIcon from "@/components/icons/git-branch";
import JavaIcon from "@/components/icons/java";
import TabNew from "@/components/icons/tab-new";
import SectionTitle from "@/components/section-title";
import { Card } from "@/components/ui/card";
import { MotionSection, SlideIn } from "@/components/ui/motion/motion-components";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { slideUp, type MotionCustom } from "@/lib/animations/variants";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  color: string;
}

export default function Features() {
  const prefersReducedMotion = useReducedMotion();

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
      <div className="relative z-10 mx-auto max-w-360 px-4">
        <SlideIn direction="up">
          <SectionTitle
            description="We leverage industry-standard technologies to build high-quality software."
            id="features-heading"
            title="Our Tech Stack"
          />
        </SlideIn>

        <MotionSection className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <m.div
              className="h-full"
              custom={{ reduced: prefersReducedMotion } satisfies MotionCustom}
              key={feature.title}
              variants={slideUp}
            >
              <Card className="group flex h-full flex-col p-8 transition-colors duration-300 hover:bg-gray-50 hover:shadow-md dark:hover:bg-gray-800/60">
                <div
                  className={`absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${feature.color} pointer-events-none`}
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
              </Card>
            </m.div>
          ))}
        </MotionSection>
      </div>
    </section>
  );
}
