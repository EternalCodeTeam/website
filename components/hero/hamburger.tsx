import { motion } from "framer-motion";

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

  const top = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: 45, translateY: 6 },
  };
  const center = {
    closed: { opacity: 1 },
    opened: { opacity: 0 },
  };
  const bottom = {
    closed: { rotate: 0, translateY: 0 },
    opened: { rotate: -45, translateY: -6 },
  };

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
        variants={top}
      />
      <motion.path
        animate={variant}
        d="M4 12H20"
        initial="closed"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        variants={center}
      />
      <motion.path
        animate={variant}
        d="M4 18H20"
        initial="closed"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
        variants={bottom}
      />
    </svg>
  );
}
