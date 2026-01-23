import { motion } from "framer-motion";
import {
  hamburgerBottom,
  hamburgerCenter,
  hamburgerTop,
} from "@/lib/animations/variants";

interface HamburgerProps {
  className?: string;
  isOpen?: boolean;
  ariaHidden?: boolean;
}

export default function Hamburger({
  className = "",
  isOpen = false,
  ariaHidden = true,
}: HamburgerProps) {
  const variant = isOpen ? "opened" : "closed";

  return (
    <svg
      aria-hidden={ariaHidden}
      aria-label={ariaHidden ? undefined : "Menu"}
      className={className}
      fill="none"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!ariaHidden && <title>Menu</title>}
      <motion.path
        animate={variant}
        d="M4 6H20"
        initial="closed"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        variants={hamburgerTop}
      />
      <motion.path
        animate={variant}
        d="M4 12H20"
        initial="closed"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        variants={hamburgerCenter}
      />
      <motion.path
        animate={variant}
        d="M4 18H20"
        initial="closed"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        variants={hamburgerBottom}
      />
    </svg>
  );
}
