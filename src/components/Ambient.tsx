"use client";

import { useEffect, useRef } from "react";
import styles from "./Ambient.module.css";

export function Ambient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    for (let i = 0; i < 40; i++) {
      const dot = document.createElement("span");
      dot.className = styles.dot;
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.animationDelay = `${Math.random() * 14}s`;
      container.appendChild(dot);
    }

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return <div ref={ref} className={styles.ambient} aria-hidden="true" />;
}
