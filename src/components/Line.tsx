"use client";

import { motion } from "motion/react";
import styles from "./Line.module.css";

interface LineProps {
  children: React.ReactNode;
  delay?: number;
  variant?: "default" | "headline";
  className?: string;
}

export function Line({ children, delay = 0, variant = "default", className = "" }: LineProps) {
  return (
    <motion.p
      className={`${styles.line} ${styles[variant]} ${className}`}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.p>
  );
}
