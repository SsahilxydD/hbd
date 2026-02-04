"use client";

import { useEffect, useState } from "react";
import styles from "./Waveform.module.css";

interface WaveformProps {
  active: boolean;
}

export function Waveform({ active }: WaveformProps) {
  const [heights, setHeights] = useState<number[]>(Array(8).fill(8));

  useEffect(() => {
    if (!active) {
      setHeights(Array(8).fill(8));
      return;
    }

    const interval = setInterval(() => {
      setHeights(Array(8).fill(0).map(() => 6 + Math.random() * 28));
    }, 150);

    return () => clearInterval(interval);
  }, [active]);

  return (
    <div className={styles.waveform}>
      {heights.map((h, i) => (
        <span key={i} className={styles.bar} style={{ height: `${h}px` }} />
      ))}
    </div>
  );
}
