"use client";

import { motion } from "framer-motion";
import Image from "next/image";

import GitHubIcon from "@/components/icons/github";
import LinkedinIcon from "@/components/icons/linkedin";

import { avatarHover, cardVariants, iconHover } from "./animations";
import type { TeamMemberProps } from "./types";

export default function TeamMember({ member }: TeamMemberProps) {
  return (
    <motion.div
      className="text-center text-gray-500 dark:text-gray-400"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      style={{
        background: "transparent",
        boxShadow: "none",
        border: "none",
        padding: 0,
        cursor: "pointer",
      }}
    >
      {/* Avatar with hover animation */}
      <motion.div
        className="mx-auto mb-4 h-36 w-36 overflow-hidden rounded-full shadow-md"
        whileHover={avatarHover}
        transition={{ type: "spring", stiffness: 300, damping: 18 } as const}
      >
        <Image
          className="object-cover"
          src={member.avatar_url}
          alt={`${member.name} Avatar`}
          title={member.name}
          width={144}
          height={144}
        />
      </motion.div>

      {/* Member name */}
      <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {member.name}
      </h3>

      {/* Member roles */}
      {(member.team_roles?.data ?? []).map((role, roleIndex) => (
        <p key={`${member.documentId ?? member.name}-role-${roleIndex}`}>{role.name}</p>
      ))}

      {/* Social links with hover animations */}
      <ul className="mt-4 flex justify-center space-x-4">
        {member.github && (
          <motion.li whileHover={iconHover} whileTap={{ scale: 0.95 }}>
            <a
              href={member.github}
              className="transition duration-500 hover:text-blue-600 dark:hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </a>
          </motion.li>
        )}
        {member.linkedin && (
          <motion.li whileHover={iconHover} whileTap={{ scale: 0.95 }}>
            <a
              href={member.linkedin}
              className="transition duration-500 hover:text-blue-600 dark:hover:text-blue-400"
              target="_blank"
              rel="noopener noreferrer"
            >
              <LinkedinIcon />
            </a>
          </motion.li>
        )}
      </ul>
    </motion.div>
  );
}
