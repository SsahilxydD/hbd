"use client";

import { motion, AnimatePresence } from "motion/react";
import styles from "./Scene.module.css";

interface SceneProps {
  children: React.ReactNode;
  isActive: boolean;
}

export function Scene({ children, isActive }: SceneProps) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          className={styles.scene}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.content}>{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
