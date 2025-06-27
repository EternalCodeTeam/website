import { motion } from "framer-motion";

export const NoResultsMessage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400"
  >
    No results found. Try different keywords or check your spelling.
  </motion.div>
);
