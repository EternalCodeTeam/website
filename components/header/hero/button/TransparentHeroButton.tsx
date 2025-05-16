import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowForward } from "@/components/icons/arrow-forward";

export default function TransparentHeroButton() {
  return (
    <Link href="/#about">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.55 }}
        aria-label="First button"
        className="mb-2 ml-0 flex items-center py-2.5 pr-3 text-left text-sm font-medium text-black dark:text-white"
      >
        <ArrowForward className="mb-[0.5px] mr-2" />
        About us
      </motion.button>
    </Link>
  );
}
