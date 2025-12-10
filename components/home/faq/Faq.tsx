"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SlideIn } from "@/components/ui/motion/MotionComponents";

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
  return (
    <section
      id="faq"
      className="py-12 lg:py-24 relative overflow-visible z-20 lg:min-h-[600px]"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Column: Title & Description */}
          <div className="lg:col-span-5 lg:top-32">
            <SlideIn direction="right" delay={0.1}>
              <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-5xl mb-6">
                Frequently asked <br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                  questions
                </span>
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Find out the answers to the most frequently asked questions. If you can't find what
                you're looking for, feel free to contact us.
              </p>
            </SlideIn>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 h-fit flex flex-col justify-start">
            <SlideIn direction="up" delay={0.2} className="w-full flex flex-col justify-start">
              <Accordion className="flex flex-col gap-4 w-full justify-start">
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
