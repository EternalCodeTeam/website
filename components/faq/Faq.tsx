"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../SectionTitle";
import { useInView } from "react-intersection-observer";

const faqItems = [
  {
    question: "Q1: What does teamwork look like?",
    answer:
      "Teamwork is a complex process where all volunteers strive to effectively carry out their assigned tasks. As a team we provide help to each other because everyone is striving for some challenges. There is no better way to learn new things than when mentored by teammate. Approximately every two weeks, we organize meetings to discuss ongoing projects, their progress, and brainstorming sessions where we share ideas about a specific project.",
  },
  {
    question: "Q2: How can I join the team?",
    answer:
      "Join us by contacting via Discord, where our team interacts and discusses projects. We value not just commitment but also your interests, ideas, and diverse talents. As a member, you'll actively participate in projects, hone skills, and gain experience in a supportive setting. Be part of our exciting team journey, don't hesitate!",
  },
  {
    question: "Q3: What are the benefits of joining the team?",
    answer:
      "Join our team to learn more about GitHub workflow, understand and use good programming practices like reviewing pull requests. As a team we provide many answers to not so easy questions and everyone of us is a specialist in his own field, meaning problem solving is in our nature. You'll also be able to extend your professional network, demonstrate your skills, and partake in team game competitions. (Shhh! Don't tell anyone about open source licences) Don't hesitate, join us!",
  },
  {
    question: "Q4: What are the requirements for joining the team?",
    answer:
      "In addition to commitment, we require basic programming knowledge. Our training isn't comprehensive, so it's recommended to have some programming skills. Our team focuses on enhancing existing competencies to aid your professional growth. Currently, we only accept Polish-speaking individuals.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        ease: "easeInOut",
        duration: 0.5,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section id="faq" className="py-16">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          ref={sectionRef}
        >
          <SectionTitle
            title="Frequently Asked Questions"
            description="Here you will find answers to the most frequently asked questions."
          />
        </motion.div>

        <motion.div
          className="mt-12"
          variants={containerVariants}
          initial="hidden"
          animate={sectionInView ? "visible" : "hidden"}
        >
          {faqItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="mb-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between bg-[#f0f1f2] px-6 py-4 text-left text-lg font-medium text-gray-800 transition-colors duration-300 hover:bg-[#e6e7e8] dark:bg-[#1F2A37] dark:text-white dark:hover:bg-[#374151]"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-panel-${index}`}
              >
                <span>{item.question}</span>
                <svg
                  className={`h-6 w-6 transform transition-transform duration-300 ${activeIndex === index ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              <div
                className={`ease-[cubic-bezier(0.25, 1, 0.5, 1)] overflow-hidden transition-all duration-300 ${activeIndex === index ? "max-h-96" : "max-h-0"}`}
                id={`faq-panel-${index}`}
              >
                <div className="ease-[cubic-bezier(0.25, 1, 0.5, 1)] bg-[#f5f6f7] p-6 text-gray-700 transition-colors duration-300 dark:bg-[#1F2A37] dark:text-gray-400">
                  {item.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
