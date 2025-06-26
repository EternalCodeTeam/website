import { motion } from "framer-motion";

interface AnimatedChevronProps {
  isExpanded: boolean;
}

export default function AnimatedChevron({ isExpanded }: AnimatedChevronProps) {
  return (
    <motion.div
      animate={{
        rotate: isExpanded ? 180 : 0,
        scale: isExpanded ? 1.1 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        duration: 0.3,
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
  );
} 