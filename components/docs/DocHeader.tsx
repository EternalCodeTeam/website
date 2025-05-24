"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DocHeaderProps {
  category?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
}

export function DocHeader({
  category,
  title,
  description,
  actions,
}: DocHeaderProps) {
  return (
    <>
      <div className="mb-2 flex items-center justify-between gap-4">
        {category && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-muted-foreground text-sm uppercase tracking-wide"
            style={{ letterSpacing: "0.08em" }}
          >
            {category}
          </motion.div>
        )}
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
      <h1 className="mb-1 text-4xl font-extrabold tracking-tight">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {title}
        </motion.span>
      </h1>
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-muted-foreground mb-0 mt-0 text-lg"
        >
          {description}
        </motion.p>
      )}
    </>
  );
}
