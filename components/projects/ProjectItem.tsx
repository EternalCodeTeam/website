"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useInView } from "react-intersection-observer";

import ProjectButton from "./ProjectButton";
import { ProjectItemProps } from "./types";

export default function ProjectItem({ repo, index }: ProjectItemProps) {
  const { ref, inView } = useInView({ triggerOnce: true });

  const isReversed = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col-reverse items-center justify-between gap-12 sm:flex-row ${
        isReversed ? "sm:flex-row-reverse" : ""
      }`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="w-full sm:w-1/2">
        <motion.h2
          className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
          transition={{ delay: 0.1, duration: 0.4 }}
        >
          {repo.name}
        </motion.h2>

        <motion.p
          className="mb-6 text-gray-600 dark:text-gray-400"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : -20 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          {repo.description}
        </motion.p>

        <a href={repo.repository_url} target="_blank" rel="noreferrer">
          <ProjectButton title="Repository" />
        </a>
      </div>

      <div className="w-full sm:w-1/2 overflow-hidden rounded-xl shadow-lg">
        <motion.div
          className="group relative"
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: inView ? 1 : 0.98, opacity: inView ? 1 : 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          <Image
            src={repo.banner_url}
            alt={repo.name}
            width={1000}
            height={500}
            className="h-auto w-full transform object-cover transition-transform duration-500 group-hover:scale-105"
            quality={85}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
