"use client";

import type { ReactNode } from "react";
import { SlideIn, StaggerContainer } from "@/components/ui/motion/MotionComponents";
import JavaIcon from "@/components/icons/java";
import LinuxIcon from "@/components/icons/linux";
import TabNew from "@/components/icons/tab-new";
import SectionTitle from "@/components/SectionTitle";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

export default function Features() {
  const features: Feature[] = [
    {
      icon: <JavaIcon className="h-12 w-12" aria-hidden="true" />,
      title: "Java Development",
      description:
        "Java is definitely our favorite programming language. We have already created many projects in Java..",
    },
    {
      icon: <LinuxIcon className="h-12 w-12" aria-hidden="true" />,
      title: "Linux",
      description: "We like to work on operating systems based on the Linux kernel.",
    },
    {
      icon: <TabNew className="h-12 w-12" aria-hidden="true" />,
      title: "Other technologies",
      description: "We are open to learning about new technologies and are eager to learn them.",
    },
  ];

  return (
    <section id="features" className="py-16" aria-labelledby="Features section">
      <div className="mx-auto max-w-(--breakpoint-xl) px-4 py-8">
        <SlideIn direction="down" delay={0.1}>
          <SectionTitle
            title="What do we do?"
            description="Below you will find information about what we do on a daily basis."
          />
        </SlideIn>

        <StaggerContainer className="mt-8 space-y-8 text-center md:grid md:grid-cols-2 md:flex-col md:gap-12 md:space-y-0 lg:grid-cols-3">
          {features.map((feature, index) => (
            <SlideIn
              key={feature.title.replace(/\s+/g, "-").toLowerCase()}
              className="flex flex-col items-center"
              direction={index % 2 === 0 ? "left" : "right"}
            >
              <div className="bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
                {feature.icon}
              </div>

              <h3 className="mb-2 text-xl font-bold dark:text-white">{feature.title}</h3>

              <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
            </SlideIn>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
