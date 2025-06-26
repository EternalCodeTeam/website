// Animation for the FAQ question button hover and tap effects
export const buttonAnimations = {
  whileHover: { scale: 1.01 },
  whileTap: { scale: 0.99 },
  transition: { type: "spring", stiffness: 400, damping: 17 }
};

// Animation for the FAQ answer panel
export const panelAnimations = {
  initial: { height: 0, opacity: 0 },
  animate: {
    height: "auto",
    opacity: 1,
    transition: {
      height: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      },
      opacity: {
        duration: 0.3,
        delay: 0.1,
      },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      height: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.3,
      },
      opacity: {
        duration: 0.2,
      },
    },
  }
};

// Animation for the FAQ answer content
export const contentAnimations = {
  initial: { y: -10, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 25,
      delay: 0.1,
    }
  }
};
