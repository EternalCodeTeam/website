"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ProjectButton from "./ProjectButton";

interface Project {
  id: string;
  attributes: {
    name: string;
    description: string;
    repository_url: string;
    banner_url: string;
  };
}

export default function ProjectItem({
  repo,
  index,
}: Readonly<{
  repo: Project;
  index: number;
}>) {
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
          <a
            href={repo.attributes.repository_url}
            target="_blank"
            rel="noreferrer"
          >
            <ProjectButton title="Repository" />
          </a>
        </div>
      </div>
      <div className="w-full overflow-hidden md:w-1/2 lg:w-1/2">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            alt={`${repo.attributes.name} project image`}
            src={repo.attributes.banner_url}
            className="mx-auto hidden rounded-[12px] object-cover sm:block"
            height={500}
            width={1000}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
