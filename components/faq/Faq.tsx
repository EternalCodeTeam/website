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
    []
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
              To join our team, we encourage you to contact us through the
              Discord community server. It is a place where team members meet,
              exchange ideas, and discuss current projects. During this process,
              we not only require your commitment but also your interest and
              willingness to share your skills and ideas. Our team values the
              diversity of talents, and by joining us, you have the opportunity
              to actively participate in projects, develop your skills, and gain
              experience in a friendly environment. Do not hesitate to join us
              and be part of an inspiring team adventure!
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
              By joining our team, you will gain new experience that can be
              valuable in your professional future. We already have several
              individuals who, after participating in the team, achieved their
              dream positions in the IT industry using the acquired skills.
              Additionally, you will have the opportunity to establish new
              professional contacts, showcase your skills, and participate in
              various game competitions organized within the team. Do not
              hesitate to join us!
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
              In addition to the required commitment on your part, we expect you
              to have basic knowledge of programming. We do not provide
              comprehensive training from scratch, so it is advisable to already
              possess a certain level of programming skills. Our team focuses on
              developing existing competencies, allowing you to continue
              progressing in the programming field. Unfortunately, at the
              moment, we only accept individuals proficient in the Polish
              language.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
