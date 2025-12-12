"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SlideIn } from "@/components/ui/motion/motion-components";

type FaqItem = {
  question: string;
  answer: string;
};

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
  return (
    <section
      aria-labelledby="faq-heading"
      className="relative z-20 overflow-visible py-12 lg:min-h-[600px] lg:py-24"
      id="faq"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-24">
          {/* Left Column: Title & Description */}
          <div className="lg:top-32 lg:col-span-5">
            <SlideIn delay={0.1} direction="right">
              <h2 className="mb-6 font-extrabold text-4xl text-gray-900 tracking-tight sm:text-5xl dark:text-white">
                Frequently asked <br className="hidden lg:block" />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                  questions
                </span>
              </h2>
              <p className="mb-8 text-gray-600 text-lg leading-relaxed dark:text-gray-300">
                Find out the answers to the most frequently asked questions. If you can't find what
                you're looking for, feel free to contact us.
              </p>
            </SlideIn>
          </div>

          {/* Right Column: Accordion */}
          <div className="flex h-fit flex-col justify-start lg:col-span-7">
            <SlideIn className="flex w-full flex-col justify-start" delay={0.2} direction="up">
              <Accordion className="flex w-full flex-col justify-start gap-4">
                {faqItems.map((item, index) => (
                  <AccordionItem key={item.question} value={`item-${index}`}>
                    <AccordionTrigger className="text-lg">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-base leading-relaxed">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </SlideIn>
          </div>
        </div>
      </div>
    </section>
  );
}
