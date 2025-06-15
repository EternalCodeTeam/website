"use client";

import { AnimatedSection, AnimatedElement, AnimatedContainer } from "@/components/animations";
import JavaIcon from "@/components/icons/java";
import LinuxIcon from "@/components/icons/linux";
import TabNew from "@/components/icons/tab-new";
import SectionTitle from "@/components/SectionTitle";

interface Feature {
  icon: React.ReactNode;
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
    <AnimatedSection
      id="features"
      className="py-16"
      animationType="fade"
      aria-labelledby="features-heading"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <AnimatedElement as="div" animationType="fadeDown" delay={0.1}>
          <SectionTitle
            title="What do we do?"
            description="Below you will find information about what we do on a daily basis."
          />
        </AnimatedElement>

        <AnimatedContainer
          className="mt-8 space-y-8 text-center md:grid md:grid-cols-2 md:flex-col md:gap-12 md:space-y-0 lg:grid-cols-3"
          staggerDelay={0.15}
          delay={0.2}
        >
          {features.map((feature, index) => (
            <AnimatedElement
              key={index}
              as="div"
              className="flex flex-col items-center"
              animationType={index % 2 === 0 ? "fadeLeft" : "fadeRight"}
              interactive={true}
            >
              <div className="center bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
                {feature.icon}
              </div>

              <h3 className="mb-2 text-xl font-bold dark:text-white">{feature.title}</h3>

              <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
            </AnimatedElement>
          ))}
        </AnimatedContainer>
      </div>
    </AnimatedSection>
  );
}
