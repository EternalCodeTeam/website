"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import TerminalIcon from "../icons/terminal-fill";
import AboutImage from "@/public/hero image.png";

import { useInView } from "react-intersection-observer";
import { useMemo } from "react";

const Container = ({ children }: { children: React.ReactNode }) => (
  <div className="mx-auto max-w-screen-xl px-4 py-8">{children}</div>
);

export default function About() {
  const combineVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      show: {
        opacity: 1,
        transition: {
          duration: 0.3,
        },
      },
    }),
    []
  );

  const { ref: section, inView: inView1 } = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });
  const { ref: div, inView: inView2 } = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });
  const { ref: img, inView: inView3 } = useInView({
    triggerOnce: false,
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  });

  return (
    <motion.section
      id="about"
      className="py-16"
      ref={section}
      variants={combineVariants}
      initial="hidden"
      animate={inView1 ? "show" : "hidden"}
      aria-labelledby="about-heading"
    >
      <Container>
        <div className="mx-auto items-center gap-x-12 sm:px-4 md:px-0 lg:flex">
          <motion.div
            className="mx-auto flex-1 sm:hidden lg:block"
            ref={img}
            variants={combineVariants}
            initial="hidden"
            animate={inView3 ? "show" : "hidden"}
          >
            <Image
              src={AboutImage}
              className="mx-auto rounded-[12px] shadow-lg"
              height={500}
              width={1000}
              priority={true}
              decoding="async"
              alt="Software development team collaborating"
            />
          </motion.div>
          <motion.div
            ref={div}
            variants={combineVariants}
            initial="hidden"
            animate={inView2 ? "show" : "hidden"}
            className="mx-auto mt-6 max-w-xl space-y-3 px-4 sm:px-0 md:mt-0 lg:max-w-2xl"
          >
            <motion.p className="mx-auto mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white md:text-center lg:mb-0 lg:mr-8 lg:text-left">
              <span className="flex items-center justify-center md:justify-center lg:justify-start">
                About us
                <TerminalIcon className="ml-2" />
              </span>
            </motion.p>
            <motion.p className="mx-auto text-center text-gray-500 dark:text-gray-400 lg:text-left">
              We are a team of programmers specializing in open-source projects.
              This allows us to gain new experiences and share knowledge with
              each other. We are open to any technology!
            </motion.p>

            <motion.p className="mx-auto text-center text-gray-500 dark:text-gray-400 lg:text-left">
              Special thanks to JetBrains, Sentry.io and Jira Software for
              providing open-source licenses to our team members. We would also
              like to express our gratitude to GitHub for providing high-quality
              software for managing Git repositories.
            </motion.p>
          </motion.div>
        </div>
      </Container>
    </motion.section>
  );
}
