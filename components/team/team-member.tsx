"use client";

import { m } from "framer-motion";
import { Github, Linkedin } from "lucide-react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { interactionSpring, slideUp } from "@/lib/animations/variants";
import type { TeamMemberProps } from "./types";

export default function TeamMember({ member, index }: TeamMemberProps) {
  const githubUsername = member.github?.split("/").pop() ?? "GitHub";
  const linkedinUsername = member.linkedin?.split("/").filter(Boolean).pop() ?? "LinkedIn";

  const iconHover = {
    scale: 1.1,
    x: 2,
    transition: interactionSpring,
  };

  return (
    <m.div className="h-full" variants={slideUp}>
      <Card className="group relative flex h-full items-center gap-4 bg-white/50 p-4 ring-gray-200/60 backdrop-blur-sm transition-[background-color,box-shadow] duration-300 hover:bg-white hover:shadow-xl hover:ring-blue-500/30 dark:bg-gray-900/40 dark:ring-gray-800/60 dark:hover:bg-gray-900/80 dark:hover:shadow-blue-900/20 dark:hover:ring-blue-400/30">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-blue-50/0 via-transparent to-purple-50/0 opacity-0 transition-opacity duration-500 group-hover:from-blue-50/50 group-hover:to-purple-50/50 group-hover:opacity-100 dark:group-hover:from-blue-900/10 dark:group-hover:to-purple-900/10" />

        {/* Avatar */}
        <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-100 ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
          <m.div
            className="relative h-full w-full transform-gpu will-change-transform"
            transition={interactionSpring}
            whileHover={{ scale: 1.05 }}
          >
            <Image
              alt={`Profile picture of ${member.name}`}
              className="transform-gpu object-cover transition-transform duration-500 will-change-transform"
              fill
              loading={index > 5 ? "lazy" : undefined}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              src={member.avatar_url}
            />
          </m.div>
        </div>

        {/* Info */}
        <div className="flex min-w-0 flex-1 flex-col justify-center">
          <h3 className="truncate pl-1 font-bold text-gray-900 text-lg dark:text-gray-100">
            {member.name}
          </h3>

          {/* Socials / Handles */}
          <div className="mt-1.5 flex flex-col gap-1">
            {!!member.github && (
              <m.a
                aria-label={`View ${member.name}'s GitHub profile (@${githubUsername})`}
                className="flex w-max items-center gap-2 rounded-md px-1 py-0.5 text-gray-500 text-sm transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"
                href={member.github}
                rel="noopener noreferrer"
                target="_blank"
                whileHover={iconHover}
              >
                <Github aria-hidden="true" className="h-4 w-4" />
                <span className="max-w-35 truncate">{githubUsername}</span>
              </m.a>
            )}

            {!!member.linkedin && (
              <m.a
                aria-label={`View ${member.name}'s LinkedIn profile`}
                className="flex w-max items-center gap-2 rounded-md px-1 py-0.5 text-gray-500 text-sm transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-400 dark:hover:bg-blue-900/20 dark:hover:text-blue-400"
                href={member.linkedin}
                rel="noopener noreferrer"
                target="_blank"
                whileHover={iconHover}
              >
                <Linkedin aria-hidden="true" className="h-4 w-4" />
                <span className="max-w-35 truncate">{linkedinUsername}</span>
              </m.a>
            )}
          </div>
        </div>
      </Card>
    </m.div>
  );
}
