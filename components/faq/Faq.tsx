"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionTitle from "../SectionTitle";
import { AnimatedSection, AnimatedElement, AnimatedContainer } from "@/components/animations";

interface FaqItem {
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    question: "What does teamwork look like?",
    answer:
      "Teamwork is a complex process where all volunteers strive to effectively carry out their assigned tasks. As a team we provide help to each other because everyone is striving for some challenges. There is no better way to learn new things than when mentored by teammate. Approximately every two weeks, we organize meetings to discuss ongoing projects, their progress, and brainstorming sessions where we share ideas about a specific project.",
  },
  {
    question: "How can I join the team?",
    answer:
      "Join us by contacting via Discord, where our team interacts and discusses projects. We value not just commitment but also your interests, ideas, and diverse talents. As a member, you'll actively participate in projects, hone skills, and gain experience in a supportive setting. Be part of our exciting team journey, don't hesitate!",
  },
  {
    question: "What are the benefits of joining the team?",
    answer:
      "Join our team to learn more about GitHub workflow, understand and use good programming practices like reviewing pull requests. As a team we provide many answers to not so easy questions and everyone of us is a specialist in his own field, meaning problem solving is in our nature. You'll also be able to extend your professional network, demonstrate your skills, and partake in team game competitions. (Shhh! Don't tell anyone about open source licences) Don't hesitate, join us!",
  },
  {
    question: "What are the requirements for joining the team?",
    answer:
      "In addition to commitment, we require basic programming knowledge. Our training isn't comprehensive, so it's recommended to have some programming skills. Our team focuses on enhancing existing competencies to aid your professional growth. Currently, we only accept Polish-speaking individuals.",
  },
];

export default function Faq() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  return (
    <AnimatedSection
      id="faq"
      className="py-16"
      animationType="fade"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <AnimatedElement
          as="div"
          animationType="fadeDown"
          delay={0.1}
        >
          <SectionTitle
            title="Frequently Asked Questions"
            description="Here you will find answers to the most frequently asked questions."
          />
        </AnimatedElement>

        <AnimatedContainer
          className="mt-12"
          staggerDelay={0.15}
          delay={0.2}
        >
          {faqItems.map((item, index) => (
            <AnimatedElement
              key={index}
              as="div"
              className="mb-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
              animationType="fadeUp"
              interactive={true}
            >
              <motion.button
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between bg-[#f0f1f2] px-6 py-4 text-left text-lg font-medium text-gray-800 transition-colors duration-300 hover:bg-[#e6e7e8] dark:bg-[#1F2A37] dark:text-white dark:hover:bg-[#374151]"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-panel-${index}`}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span>{item.question}</span>
                <motion.div
                  animate={{ 
                    rotate: activeIndex === index ? 180 : 0,
                    scale: activeIndex === index ? 1.1 : 1
                  }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 20,
                    duration: 0.3
                  }}
                >
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </motion.div>
              </motion.button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: "auto", 
                      opacity: 1,
                      transition: {
                        height: { 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 30,
                          duration: 0.4
                        },
                        opacity: { 
                          duration: 0.3,
                          delay: 0.1
                        }
                      }
                    }}
                    exit={{ 
                      height: 0, 
                      opacity: 0,
                      transition: {
                        height: { 
                          type: "spring", 
                          stiffness: 300, 
                          damping: 30,
                          duration: 0.3
                        },
                        opacity: { 
                          duration: 0.2
                        }
                      }
                    }}
                    className="overflow-hidden"
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <motion.div 
                      className="ease-[cubic-bezier(0.25, 1, 0.5, 1)] bg-[#f5f6f7] p-6 text-gray-700 transition-colors duration-300 dark:bg-[#1F2A37] dark:text-gray-400"
                      initial={{ y: -10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 25,
                        delay: 0.1
                      }}
                    >
                      {item.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </AnimatedElement>
          ))}
        </AnimatedContainer>
      </div>
    </AnimatedSection>
  );
}
