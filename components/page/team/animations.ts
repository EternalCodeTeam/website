export const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 60,
      damping: 16,
      mass: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// Animation for avatar hover effect
export const avatarHover = {
  scale: 1.08,
  transition: { type: "spring", stiffness: 300, damping: 18 },
};

// Animation for social icon hover effect
export const iconHover = {
  scale: 1.18,
  color: "#2563eb",
  transition: { type: "spring", stiffness: 400, damping: 15 },
};
