"use client";

import { useEffect, useRef } from "react";
import styles from "./Confetti.module.css";

interface ConfettiProps {
  active: boolean;
}

export function Confetti({ active }: ConfettiProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container || !active) return;

    container.innerHTML = "";
    const colors = ["#d4af37", "#f5d99a", "#e8e6e3"];

    for (let i = 0; i < 30; i++) {
      const piece = document.createElement("span");
      piece.className = styles.piece;
      piece.style.background = colors[i % colors.length];
      piece.style.left = `${Math.random() * 100}%`;
      piece.style.top = `${Math.random() * 30}%`;
      piece.style.animationDelay = `${Math.random() * 0.3}s`;
      container.appendChild(piece);
    }

    const timeout = setTimeout(() => {
      container.innerHTML = "";
    }, 2500);

    return () => clearTimeout(timeout);
  }, [active]);

  if (!active) return null;

  return <div ref={ref} className={styles.confetti} aria-hidden="true" />;
}
