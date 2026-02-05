"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useSpotlight } from "@/hooks/use-spotlight";

interface Project {
  name: string;
  image: string;
  url: string;
  description: string;
}

const projects: Project[] = [
  {
    name: "EternalCore",
    image: "/eternalcore/readme-banner.png",
    url: "/projects/eternalcore",
    description: "Core library",
  },
  {
    name: "EternalCombat",
    image: "/eternalcore/readme-banner.png",
    url: "/projects/eternalcombat",
    description: "Combat system",
  },
  {
    name: "EternalCheck",
    image: "/eternalcore/readme-banner.png",
    url: "/projects/eternalcheck",
    description: "Anti-bot tool",
  },
  {
    name: "ChatFormatter",
    image: "/eternalcore/readme-banner.png",
    url: "/projects/chatformatter",
    description: "Chat manager",
  },
  {
    name: "LiteCommands",
    image: "/eternalcore/readme-banner.png",
    url: "/projects/litecommands",
    description: "Command framework",
  },
  {
    name: "LiteSkinsAPI",
    image: "/eternalcore/readme-banner.png",
    url: "/projects/liteskinsapi",
    description: "Skin API",
  },
];

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const containerSpotlight = useSpotlight<HTMLDivElement>();

  // Auto-scroll logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) {
      return;
    }

    let animationFrameId: number;
    let scrollPos = scrollContainer.scrollLeft;
    const speed = 0.6; // Slightly slower for better viewing of images

    const scroll = () => {
      if (!isHovered && scrollContainer) {
        scrollPos += speed;

        if (scrollPos >= scrollContainer.scrollWidth / 3) {
          scrollPos = 0;
        }

        scrollContainer.scrollLeft = scrollPos;
      } else if (isHovered && scrollContainer) {
        scrollPos = scrollContainer.scrollLeft;
      }
      animationFrameId = requestAnimationFrame(scroll);
    };

    animationFrameId = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  const displayProjects = [...projects, ...projects, ...projects];

  return (
    <section className="relative w-full py-24" id="projects">
      {/* Main Container - Keeps everything aligned with navbar */}
      <div className="mx-auto max-w-[90rem] px-4 md:px-8">
        {/* Header content */}
        <div className="mb-12 w-full">
          <motion.div
            className="mb-4 flex items-center gap-2"
            initial={{ opacity: 0, x: -20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, x: 0 }}
          >
            <span className="h-px w-8 bg-blue-600/50 dark:bg-blue-400/50" />
            <span className="font-bold text-blue-600 text-sm uppercase tracking-widest dark:text-blue-400">
              Our Ecosystem
            </span>
          </motion.div>

          <h3 className="max-w-4xl font-extrabold text-4xl text-gray-900 tracking-tight sm:text-5xl lg:text-7xl dark:text-white">
            Crafting{" "}
            <span className="relative inline-block whitespace-nowrap">
              <span className="bg-gradient-to-br from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-400">
                The Future
              </span>
            </span>{" "}
            <br className="hidden md:block" />
            <span className="text-gray-400 dark:text-gray-500">of Open Source.</span>
          </h3>
        </div>

        {/* Scrollable Container - NOW INSIDE THE MAIN CONTAINER */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: Pause on hover feature */}
        {/* biome-ignore lint/a11y/noNoninteractiveElementInteractions: Pause on hover feature */}
        <div
          className="spotlight-card group relative -mx-4 w-[calc(100%+2rem)] overflow-hidden rounded-3xl border border-gray-200/50 bg-gray-50/50 p-6 md:mx-0 md:w-full dark:border-white/5 dark:bg-white/5"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onPointerLeave={containerSpotlight.onPointerLeave}
          onPointerMove={containerSpotlight.onPointerMove}
        >
          <div
            className="no-scrollbar flex w-full overflow-x-auto overflow-y-hidden"
            ref={scrollRef}
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none",
            }}
          >
            <div className="flex gap-6">
              {displayProjects.map((project, index) => (
                <ProjectCard key={`${project.name}-${index}`} project={project} />
              ))}
            </div>
          </div>

          {/* Subtle fade masks inside the container */}
          <div className="pointer-events-none absolute top-0 left-0 z-10 h-full w-8 bg-gradient-to-r from-gray-50/50 to-transparent dark:from-black/20" />
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-8 bg-gradient-to-l from-gray-50/50 to-transparent dark:from-black/20" />
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const spotlight = useSpotlight<HTMLAnchorElement>();

  return (
    <Link
      className="spotlight-card group relative block aspect-[16/9] w-[300px] shrink-0 transform-gpu overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 shadow-lg transition-all duration-500 will-change-transform hover:shadow-2xl md:w-[420px] dark:border-gray-800 dark:bg-gray-900"
      href={project.url}
      onPointerLeave={spotlight.onPointerLeave}
      onPointerMove={spotlight.onPointerMove}
    >
      <Image
        alt={project.name}
        className="transform-gpu object-cover transition-transform duration-700 will-change-transform group-hover:scale-105"
        fill
        sizes="(max-width: 768px) 300px, 420px"
        src={project.image}
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

      {/* Minimal Floating Badge */}
      <div className="absolute bottom-4 left-4">
        <div className="flex transform-gpu items-center gap-2 rounded-full border border-white/10 bg-black/40 px-4 py-1.5 shadow-lg backdrop-blur-md transition-transform duration-300 will-change-transform group-hover:scale-105 group-hover:bg-black/60">
          <span className="font-bold text-sm text-white dark:text-gray-100">{project.name}</span>
        </div>
      </div>
    </Link>
  );
}
