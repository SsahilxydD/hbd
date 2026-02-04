"use client";

import { useState } from "react";
import { motion } from "motion/react";
import styles from "./Fragments.module.css";

interface Memory {
  image: string;
  note: string;
}

interface FragmentsProps {
  items: Memory[];
  onReveal: (count: number) => void;
}

export function Fragments({ items, onReveal }: FragmentsProps) {
  const [focused, setFocused] = useState<number | null>(null);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const handleClick = (index: number) => {
    if (navigator.vibrate) navigator.vibrate(12);
    setFocused(index);
    if (!revealed.has(index)) {
      const newRevealed = new Set(revealed);
      newRevealed.add(index);
      setRevealed(newRevealed);
      onReveal(newRevealed.size);
    }
  };

  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={`${styles.fragment} ${focused === index ? styles.focused : ""}`}
          onClick={() => handleClick(index)}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.98 }}
        >
          <img 
            src={item.image} 
            alt="" 
            className={styles.image}
          />
          <motion.div
            className={styles.note}
            initial={{ opacity: 0 }}
            animate={{ opacity: focused === index ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {item.note}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
}
