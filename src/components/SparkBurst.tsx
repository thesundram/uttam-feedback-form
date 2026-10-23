"use client";
import { motion } from "framer-motion";

const COLORS = ["#ffc928", "#34d399", "#60a5fa", "#22d3ee", "#fb923c"];

export default function SparkBurst({ count = 16, radius = 78 }: { count?: number; radius?: number }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-20 grid place-items-center overflow-visible">
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const dist = radius * 0.55 + (i % 5) * (radius * 0.11);
        const color = COLORS[i % COLORS.length];
        return (
          <motion.span
            key={i}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.3 }}
            animate={{ opacity: [0, 1, 0], x: Math.cos(angle) * dist, y: Math.sin(angle) * dist, scale: [0.3, 1, 0.2] }}
            transition={{ duration: 0.85, ease: "easeOut", delay: (i % 4) * 0.035 }}
            className="absolute h-1.5 w-1.5 rounded-full"
            style={{ background: color, boxShadow: `0 0 12px ${color}` }}
          />
        );
      })}
      <motion.span
        initial={{ opacity: 0.9, scale: 0.2 }}
        animate={{ opacity: 0, scale: 2.1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="absolute h-16 w-16 rounded-full border border-emerald-300/70"
      />
    </div>
  );
}
