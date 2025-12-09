"use client";

import Image from "next/image";

import { SlideIn, StaggerContainer } from "@/components/ui/motion/MotionComponents";
import ProjectButton from "./ProjectButton";
import type { ProjectItemProps } from "./types";

export default function ProjectItem({ repo, index }: ProjectItemProps) {
  const isReversed = index % 2 === 0;

  return (
    <StaggerContainer
      className={`flex flex-col-reverse items-center justify-between gap-12 sm:flex-row ${
        isReversed ? "sm:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full sm:w-1/2">
        <SlideIn direction="down" delay={0.1}>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {repo.name}
          </h2>
        </SlideIn>

        <SlideIn direction="down" delay={0.2}>
          <p className="mb-6 text-gray-600 dark:text-gray-400">{repo.description}</p>
        </SlideIn>

        <SlideIn direction="up" delay={0.3}>
          <a href={repo.repository_url} target="_blank" rel="noreferrer">
            <ProjectButton title="Repository" />
          </a>
        </SlideIn>
      </div>

      <div className="w-full sm:w-1/2">
        <SlideIn
          direction={isReversed ? "left" : "right"}
          delay={0.1}
          className="overflow-hidden rounded-xl shadow-lg"
        >
          {/* Wrapping image in a group div for hover effects */}
          <div className="group relative">
            <Image
              src={repo.banner_url}
              alt={repo.name}
              width={1000}
              height={500}
              className="h-auto w-full transform object-cover transition-transform duration-500 group-hover:scale-105"
              quality={85}
            />
          </div>
        </SlideIn>
      </div>
    </StaggerContainer>
  );
}
