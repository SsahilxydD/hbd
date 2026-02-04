"use client";

import { motion } from "motion/react";
import styles from "./Progress.module.css";

interface ProgressProps {
  value: number;
}

export function Progress({ value }: ProgressProps) {
  return (
    <div className={styles.track}>
      <motion.div
        className={styles.fill}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
    </div>
  );
}
