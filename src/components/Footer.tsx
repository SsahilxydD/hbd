"use client";

import { motion } from "motion/react";
import styles from "./Footer.module.css";

interface FooterProps {
  visible: boolean;
  text: string;
}

export function Footer({ visible, text }: FooterProps) {
  return (
    <motion.div
      className={styles.footer}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      {text}
    </motion.div>
  );
}
