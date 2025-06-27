"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

import ProjectButton from "./ProjectButton";
import { ProjectItemProps } from "./types";

export default function ProjectItem({ repo, index }: ProjectItemProps) {
  // Track if component is in viewport for animation
  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  return (
    <motion.div
      ref={ref}
      key={repo.id}
      className={`flex flex-col items-center justify-between gap-12 text-center sm:flex-row sm:text-left ${
        index % 2 === 0 ? "sm:flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: inView ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Project content - alternates left/right based on index */}
      <div className="mx-auto w-full md:w-1/2 lg:w-1/2">
        <motion.h1
          className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {repo.attributes.name}
        </motion.h1>
        <motion.p
          className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {repo.attributes.description}
        </motion.p>
        <div className="flex justify-center sm:justify-start">
          <a href={repo.attributes.repository_url} target="_blank" rel="noreferrer">
            <ProjectButton title="Repository" />
          </a>
        </div>
      </div>

      {/* Project image with animation */}
      <div className="w-full overflow-hidden md:w-1/2 lg:w-1/2">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            alt={`${repo.attributes.name} project image`}
            src={repo.attributes.banner_url}
            className="mx-auto hidden rounded-xl object-cover sm:block"
            height={500}
            width={1000}
            priority={index < 2}
            quality={85}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
