"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import styles from "./Envelopes.module.css";

interface Envelope {
  label: string;
  content: string;
}

interface EnvelopesProps {
  items: Envelope[];
}

export function Envelopes({ items }: EnvelopesProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (navigator.vibrate) navigator.vibrate(12);
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      {items.map((item, index) => (
        <motion.div
          key={index}
          className={styles.envelope}
          onClick={() => handleClick(index)}
          whileHover={{ borderColor: "var(--accent)" }}
          whileTap={{ scale: 0.98 }}
        >
          <span className={styles.label}>{item.label}</span>
          <AnimatePresence>
            {openIndex === index && (
              <motion.div
                className={styles.content}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {item.content}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
