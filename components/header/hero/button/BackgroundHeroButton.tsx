import Link from "next/link";
import { motion } from "framer-motion";
import PeopleGroupIcon from "@/components/icons/people-group";

export default function BackgroundHeroButton() {
  return (
    <Link href="/team">
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        aria-label="Second button"
        className="flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none"
      >
        <PeopleGroupIcon className="mb-[0.5px] mr-2" />
        See our team!
      </motion.button>
    </Link>
  );
}
