"use client";
import { useEffect, useState } from "react";

type Props = {
  value: number;
  decimals?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
};

export default function AnimatedNumber({ value, decimals = 0, duration = 1.1, prefix = "", suffix = "" }: Props) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(value * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <span className="metric-value">
      {prefix}
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
