"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

import { AnimatedSection, AnimatedElement, AnimatedContainer } from "@/components/animations";
import AnimatedChevron from "./AnimatedChevron";
import { buttonAnimations, panelAnimations, contentAnimations } from "./animations";

import SectionTitle from "../../../SectionTitle";

// FAQ item structure with question and answer
interface FaqItem {
  question: string;
  answer: string;
}

// FAQ data array with questions and answers
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
  // Tracks which FAQ item is currently expanded
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Toggle function to expand/collapse FAQ items
  const toggleFaq = useCallback((index: number) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  }, []);

  return (
    <AnimatedSection id="faq" className="py-16" animationType="fade" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-screen-xl px-4 py-8">
        <AnimatedElement as="div" animationType="fadeDown" delay={0.1}>
          <SectionTitle
            title="Frequently Asked Questions"
            description="Here you will find answers to the most frequently asked questions."
          />
        </AnimatedElement>

        {/* FAQ items with staggered animations */}
        <AnimatedContainer className="mt-12" staggerDelay={0.15} delay={0.2}>
          {faqItems.map((item, index) => (
            <AnimatedElement
              key={index}
              as="div"
              className="mb-6 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700"
              animationType="fadeUp"
              interactive={true}
            >
              {/* FAQ question button with hover and tap animations */}
              <motion.button
                onClick={() => toggleFaq(index)}
                className="flex w-full items-center justify-between bg-lightGray-200 px-6 py-4 text-left text-lg font-medium text-gray-800 transition-colors duration-300 hover:bg-lightGray-300 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
                aria-expanded={activeIndex === index}
                aria-controls={`faq-panel-${index}`}
                {...buttonAnimations}
              >
                <span>{item.question}</span>
                {/* Animated chevron icon that rotates when expanded */}
                <AnimatedChevron isExpanded={activeIndex === index} />
              </motion.button>
              {/* Animated answer panel with height and opacity transitions */}
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    {...panelAnimations}
                    className="overflow-hidden"
                    id={`faq-panel-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                  >
                    <motion.div
                      className="ease-[cubic-bezier(0.25, 1, 0.5, 1)] bg-lightGray-100 p-6 text-gray-700 transition-colors duration-300 dark:bg-gray-800 dark:text-gray-400"
                      {...contentAnimations}
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
