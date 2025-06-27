import { motion } from "framer-motion";

export const LoadingSpinner = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute right-3 top-2.5"
    role="status"
    aria-label="Loading search results"
  >
    <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
  </motion.div>
);
