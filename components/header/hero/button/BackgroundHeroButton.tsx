import Link from "next/link";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useCallback } from "react";
import PeopleGroupIcon from "@/components/icons/people-group";

export default function BackgroundHeroButton() {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  const controls = useAnimation();
  
  const handleAnimation = useCallback(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 20 });
    }
  }, [inView, controls]);
  
  useEffect(() => {
    handleAnimation();
  }, [handleAnimation]);

  return (
    <Link href="/team" passHref legacyBehavior>
      <motion.button
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={controls}
        transition={{ duration: 0.55, ease: "easeOut" }}
        aria-label="View our team"
        className="flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white transition-colors duration-200 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900"
      >
        <PeopleGroupIcon className="mb-[0.5px] mr-2" aria-hidden="true" />
        See our team!
      </motion.button>
    </Link>
  );
}
