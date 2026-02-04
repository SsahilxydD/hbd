"use client";

import { motion } from "motion/react";
import styles from "./SoundToggle.module.css";

interface SoundToggleProps {
  isOn: boolean;
  onToggle: () => void;
  visible: boolean;
}

export function SoundToggle({ isOn, onToggle, visible }: SoundToggleProps) {
  return (
    <motion.button
      className={styles.toggle}
      onClick={onToggle}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4 }}
    >
      Sound: {isOn ? "On" : "Off"}
    </motion.button>
  );
}
