"use client";

import { motion } from "framer-motion";
import SectionTitle from "@/components/SectionTitle";
import JavaIcon from "@/components/icons/java";
import LinuxIcon from "@/components/icons/linux";
import TabNew from "@/components/icons/TabNew";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";

export default function Features() {
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

  const { ref: item1, inView: inView1 } = useInView({ triggerOnce: false });
  const { ref: item2, inView: inView2 } = useInView({ triggerOnce: false });
  const { ref: item3, inView: inView3 } = useInView({ triggerOnce: false });
  const { ref: sectionTitle, inView: inView4 } = useInView({
    triggerOnce: false,
  });

  return (
    <section id="features">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <motion.div
          ref={sectionTitle}
          variants={combineVariants}
          initial="hidden"
          animate={inView4 ? "show" : "hidden"}
        >
          <SectionTitle
            title="What do we do?"
            description="Below you will find information about what we do on a daily basis."
          />
        </motion.div>

        <div className="mt-8 space-y-8 text-center md:grid md:grid-cols-2 md:flex-col md:gap-12 md:space-y-0 lg:grid-cols-3">
          <motion.div
            ref={item1}
            variants={combineVariants}
            initial="hidden"
            animate={inView1 ? "show" : "hidden"}
            className="flex flex-col items-center"
          >
            <div className="center bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <JavaIcon className="h-12 w-12" />
            </div>

            <h3 className="mb-2 text-xl font-bold dark:text-white">Java</h3>

            <p className="text-gray-500 dark:text-gray-400">
              Java is definitely our favorite programming language. We have
              already created many projects in Java.
            </p>
          </motion.div>
          <motion.div
            ref={item2}
            variants={combineVariants}
            initial="hidden"
            animate={inView2 ? "show" : "hidden"}
            className="flex flex-col items-center"
          >
            <div className="center bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <LinuxIcon className="h-12 w-12" />
            </div>

            <h3 className="mb-2 text-xl font-bold dark:text-white">Linux</h3>

            <p className="text-gray-500 dark:text-gray-400">
              We like to work on operating systems based on the Linux kernel.
            </p>
          </motion.div>

          <motion.div
            ref={item3}
            variants={combineVariants}
            initial="hidden"
            animate={inView3 ? "show" : "hidden"}
            className="flex flex-col items-center"
          >
            <div className="center bg-primary-100 dark:bg-primary-900 mb-4 flex h-10 w-10 items-center justify-center rounded-full lg:h-12 lg:w-12">
              <TabNew className="h-12 w-12" />
            </div>

            <h3 className="mb-2 text-xl font-bold dark:text-white">
              Other technologies
            </h3>

            <p className="text-gray-500 dark:text-gray-400">
              We are open to learning about new technologies and are eager to
              learn them.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
