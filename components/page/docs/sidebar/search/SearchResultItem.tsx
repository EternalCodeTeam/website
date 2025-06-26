import { motion } from "framer-motion";
import { memo } from "react";
import { SearchResultItemProps } from "./types";

export const SearchResultItem = memo(({ result, onSelect }: SearchResultItemProps) => (
  <motion.button
    onClick={() => onSelect(result.path)}
    className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:hover:bg-gray-700 dark:focus:bg-gray-700"
    role="option"
    aria-selected="false"
    whileHover={{ x: 3 }}
    transition={{ type: "spring", stiffness: 400, damping: 10 }}
  >
    <div className="font-medium text-gray-900 dark:text-white">{result.title}</div>
    <div className="text-sm text-gray-500 dark:text-gray-400">{result.excerpt}</div>
  </motion.button>
));

SearchResultItem.displayName = "SearchResultItem";
