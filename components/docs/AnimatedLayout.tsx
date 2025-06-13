"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

interface AnimatedLayoutProps {
  children: React.ReactNode;
}

const AnimatedLayout: React.FC<AnimatedLayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [hasAnimated, setHasAnimated] = useState(false);
  
 
  useEffect(() => {
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  }, [hasAnimated]);

  return (
    <motion.div 
      className="mx-auto min-h-[calc(100vh-7rem)] max-w-screen-xl px-4 py-12 pt-32"
      initial={hasAnimated ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={hasAnimated ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          mass: 0.8,
          delay: 0.1
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

export default AnimatedLayout; 