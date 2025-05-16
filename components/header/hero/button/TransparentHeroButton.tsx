import Link from "next/link";
import { motion } from "framer-motion";
import ArrowForwardHeroIcon from "@/components/icons/arrow-forward-hero";

export default function TransparentHeroButton() {
  return (
    <Link href="/#about">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55 }}
        aria-label="First button"
        className="group mb-2 ml-0 flex items-center gap-2 py-2.5 pr-3 text-left text-sm font-medium text-black transition-colors hover:text-neutral-600 dark:text-white dark:hover:text-neutral-300"
      >
        <ArrowForwardHeroIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        About us
      </motion.button>
    </Link>
  );
}
