"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import styles from "./Button.module.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "yes" | "no";
  disabled?: boolean;
  delay?: number;
  className?: string;
}

export function Button({
  children,
  onClick,
  variant = "default",
  disabled = false,
  delay = 0,
  className = "",
}: ButtonProps) {
  // Button is ready immediately if no delay, otherwise wait for animation to complete
  const [isReady, setIsReady] = useState(delay === 0 && !disabled);

  useEffect(() => {
    if (disabled) {
      setIsReady(false);
      return;
    }

    if (delay === 0) {
      // Small timeout to ensure DOM is ready
      const id = requestAnimationFrame(() => setIsReady(true));
      return () => cancelAnimationFrame(id);
    }

    setIsReady(false);
    // Wait for delay + animation duration (0.5s) before becoming interactive
    const totalDelay = (delay + 0.5) * 1000;
    const timeout = setTimeout(() => {
      setIsReady(true);
    }, totalDelay);

    return () => clearTimeout(timeout);
  }, [delay, disabled]);

  const handleClick = useCallback(() => {
    if (!isReady || disabled) return;
    if (navigator.vibrate) navigator.vibrate(12);
    onClick?.();
  }, [isReady, disabled, onClick]);

  return (
    <motion.button
      className={`${styles.button} ${styles[variant]} ${className}`}
      onClick={handleClick}
      disabled={!isReady}
      initial={{ opacity: 0, y: 10 }}
      animate={{
        opacity: disabled ? 0.35 : 1,
        y: 0,
      }}
      transition={{ duration: 0.5, delay }}
      whileHover={isReady ? { scale: 1.02 } : {}}
      whileTap={isReady ? { scale: 0.98 } : {}}
      style={{ pointerEvents: isReady ? "auto" : "none" }}
      aria-disabled={!isReady}
    >
      {children}
    </motion.button>
  );
}
