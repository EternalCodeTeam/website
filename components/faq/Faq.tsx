"use client";

import { motion } from "framer-motion";
import SectionTitle from "../SectionTitle";
import { useInView } from "react-intersection-observer";
import { useMemo } from "react";

export default function Faq() {
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
    [],
  );

  const { ref: q1, inView: inViewFAQ1 } = useInView({ triggerOnce: false });
  const { ref: q2, inView: inViewFAQ2 } = useInView({ triggerOnce: false });
  const { ref: q3, inView: inViewFAQ3 } = useInView({ triggerOnce: false });
  const { ref: s4, inView: inViewFAQ4 } = useInView({ triggerOnce: false });
  const { ref: sectionTitle, inView: inViewTitle } = useInView({
    triggerOnce: false,
  });

  return (
    <section id="faq" className="py-16">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <motion.div
          ref={sectionTitle}
          variants={combineVariants}
          initial="hidden"
          animate={inViewTitle ? "show" : "hidden"}
        >
          <SectionTitle
            title="Frequently Asked Questions"
            description="Here you will find answers to the most frequently asked questions."
          />
        </motion.div>

        <div className="mt-8 grid gap-16 pt-12 text-center lg:grid-cols-2 lg:gap-x-12 lg:gap-y-24 lg:text-left">
          <motion.div
            className="mt-10"
            ref={q1}
            variants={combineVariants}
            initial="hidden"
            animate={inViewFAQ1 ? "show" : "hidden"}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Q1: What does teamwork look like?
            </h3>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Teamwork is a complex process where all volunteers strive to
              effectively carry out their assigned tasks. Approximately every
              two weeks, we organize meetings to discuss ongoing projects, their
              progress, and brainstorming sessions where we share ideas about a
              specific project.
            </p>
          </motion.div>

          <motion.div
            className="mt-10"
            ref={q2}
            variants={combineVariants}
            initial="hidden"
            animate={inViewFAQ2 ? "show" : "hidden"}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Q2: How can I join the team?
            </h3>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Join us by contacting via Discord, where our team interacts and discusses projects. We value not just
              commitment but also your interests, ideas, and diverse talents. As a member, you'll actively participate
              in projects, hone skills, and gain experience in a supportive setting. Be part of our exciting team
              journey, don't hesitate!
            </p>
          </motion.div>

          <motion.div
            className="mt-10"
            ref={q3}
            variants={combineVariants}
            initial="hidden"
            animate={inViewFAQ3 ? "show" : "hidden"}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Q3: What are the benefits of joining the team?
            </h3>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              Joining us provides valuable experience and has led previous members to their dream IT roles. You'll also
              be able to extend your professional network, demonstrate your skills, and partake in team game
              competitions. Don't hesitate, join us!
            </p>
          </motion.div>

          <motion.div
            className="mt-10"
            ref={s4}
            variants={combineVariants}
            initial="hidden"
            animate={inViewFAQ4 ? "show" : "hidden"}
          >
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Q4: What are the requirements for joining the team?
            </h3>
            <p className="mt-3 text-gray-500 dark:text-gray-400">
              In addition to commitment, we require basic programming knowledge. Our training isn't comprehensive, so
              it's recommended to have some programming skills. Our team focuses on enhancing existing competencies to
              aid your professional growth. Currently, we only accept Polish-speaking individuals.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
