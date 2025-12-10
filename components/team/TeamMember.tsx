"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

import type { TeamMemberProps } from "./types";

export default function TeamMember({ member }: TeamMemberProps) {
  // Extract username from GitHub URL if possible, otherwise use "GitHub"
  const githubUsername = member.github?.split("/").pop() ?? "GitHub";

  // Extract username/name from LinkedIn URL or use "LinkedIn"
  const linkedinUsername = member.linkedin?.split("/").filter(Boolean).pop() ?? "LinkedIn";

  return (
    <motion.div className="group relative flex h-full items-center gap-4 overflow-hidden rounded-2xl border border-gray-200/60 bg-white/50 p-4 shadow-sm backdrop-blur-sm transition-all duration-300 hover:border-blue-500/30 hover:bg-white hover:shadow-xl dark:border-gray-800/60 dark:bg-gray-900/40 dark:hover:border-blue-400/30 dark:hover:bg-gray-900/80 dark:hover:shadow-blue-900/20">
      {/* Background Gradient Effect on Hover */}
      <div className="-z-10 absolute inset-0 bg-gradient-to-br from-blue-50/0 via-transparent to-purple-50/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-50/50 group-hover:to-purple-50/50 group-hover:opacity-100 dark:group-hover:from-blue-900/10 dark:group-hover:to-purple-900/10" />

      {/* Avatar */}
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
        <motion.div
          className="relative h-full w-full"
          whileHover={{ scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 20 } }}
        >
          <Image
            alt={`${member.name} Avatar`}
            className="object-cover transition-transform duration-500"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            src={member.avatar_url}
          />
        </motion.div>
      </div>

      {/* Info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center">
        <h3 className="truncate pl-1 font-bold text-gray-900 text-lg dark:text-gray-100">
          {member.name}
        </h3>

        {/* Socials / Handles */}
        <div className="mt-1.5 flex flex-col gap-1">
          {member.github && (
            <motion.a
              className="flex w-max items-center gap-2 rounded-md px-1 py-0.5 text-gray-500 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
              href={member.github}
              rel="noopener noreferrer"
              target="_blank"
              whileHover={{
                scale: 1.05,
                x: 2,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
            >
              <FaGithub className="h-4 w-4" />
              <span className="max-w-[140px] truncate">{githubUsername}</span>
            </motion.a>
          )}

          {member.linkedin && (
            <motion.a
              className="flex w-max items-center gap-2 rounded-md px-1 py-0.5 text-gray-500 text-sm transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
              href={member.linkedin}
              rel="noopener noreferrer"
              target="_blank"
              whileHover={{
                scale: 1.05,
                x: 2,
                transition: { type: "spring", stiffness: 400, damping: 10 },
              }}
            >
              <FaLinkedin className="h-4 w-4" />
              <span className="max-w-[140px] truncate">{linkedinUsername}</span>
            </motion.a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
