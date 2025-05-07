import React from "react";
import { motion } from "framer-motion";
import GitHubIcon from "@/components/icons/github";

export default function ProjectButton({ title }: Readonly<{ title: string }>) {
  return (
    <motion.button
      aria-label="Go to repository"
      className="flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <GitHubIcon className="mb-[0.5px] mr-2" />
      {title}
    </motion.button>
  );
}
