"use client";
import { motion } from "framer-motion";

type Kind = "bars" | "network" | "radar" | "layers" | "wave" | "gauge";

function tint(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.slice(0, 2), 16);
  const g = parseInt(clean.slice(2, 4), 16);
  const b = parseInt(clean.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function CapabilityVisual({ kind, accent }: { kind: Kind; accent: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl border border-white/10 bg-[#05152c]">
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at 70% 30%, ${tint(accent, 0.22)}, transparent 60%)` }} />
      <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
      <div className="relative h-full w-full">{renderKind(kind, accent)}</div>
    </div>
  );
}

function renderKind(kind: Kind, accent: string) {
  switch (kind) {
    case "bars":
      return <Bars accent={accent} />;
    case "network":
      return <NetworkGraph accent={accent} />;
    case "wave":
      return <Waves accent={accent} />;
    case "radar":
      return <Radar accent={accent} />;
    case "layers":
      return <Layers accent={accent} />;
    case "gauge":
      return <Gauge accent={accent} />;
  }
}

function Bars({ accent }: { accent: string }) {
  const heights = [38, 62, 48, 78, 58, 90, 68, 82, 54, 94, 72, 86];
  return (
    <div className="absolute inset-0 flex items-end gap-[5%] px-[8%] pb-[14%] pt-[18%]">
      {heights.map((h, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-t-sm"
          style={{ background: `linear-gradient(to top, ${tint(accent, 0.15)}, ${accent})` }}
          initial={{ height: "12%" }}
          animate={{ height: [`${h * 0.55}%`, `${h}%`, `${h * 0.72}%`] }}
          transition={{ duration: 2.6 + (i % 4) * 0.4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut", delay: i * 0.12 }}
        />
      ))}
    </div>
  );
}

function NetworkGraph({ accent }: { accent: string }) {
  const nodes = [
    { x: 18, y: 26 }, { x: 50, y: 15 }, { x: 82, y: 30 },
    { x: 30, y: 62 }, { x: 62, y: 56 }, { x: 86, y: 74 },
    { x: 14, y: 80 }, { x: 48, y: 88 },
  ];
  const edges = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [3, 4], [3, 6], [4, 5], [4, 7], [6, 7], [5, 7]];
  return (
    <>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        {edges.map(([a, b], i) => (
          <motion.line
            key={i}
            x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
            stroke={accent} strokeWidth={0.5} vectorEffect="non-scaling-stroke"
            initial={{ opacity: 0.1 }}
            animate={{ opacity: [0.1, 0.7, 0.1] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: (i % 5) * 0.28, ease: "easeInOut" }}
          />
        ))}
      </svg>
      {nodes.map((n, i) => (
        <div key={i} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${n.x}%`, top: `${n.y}%` }}>
          <motion.span
            className="block rounded-full"
            style={{ width: 9, height: 9, background: accent, boxShadow: `0 0 14px ${accent}` }}
            animate={{ scale: [1, 1.5, 1], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.16, ease: "easeInOut" }}
          />
        </div>
      ))}
    </>
  );
}

function Waves({ accent }: { accent: string }) {
  return (
    <svg viewBox="0 0 200 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
      {[0, 1, 2].map((row) => (
        <motion.path
          key={row}
          d={`M0 ${28 + row * 22} C 25 ${8 + row * 22}, 50 ${48 + row * 22}, 75 ${28 + row * 22} S 125 ${8 + row * 22}, 150 ${28 + row * 22} S 175 ${48 + row * 22}, 200 ${28 + row * 22}`}
          fill="none"
          stroke={accent}
          strokeWidth={row === 1 ? 1.4 : 0.9}
          strokeOpacity={0.85 - row * 0.22}
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut", delay: row * 0.25 }}
        />
      ))}
      <motion.circle
        r={3} fill={accent}
        animate={{ cx: [0, 200], cy: [28, 50, 28] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
      />
    </svg>
  );
}

function Radar({ accent }: { accent: string }) {
  const blips = [
    { x: 34, y: 38, d: 0 }, { x: 66, y: 30, d: 0.8 }, { x: 58, y: 68, d: 1.5 }, { x: 26, y: 64, d: 2.1 },
  ];
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative aspect-square h-[78%]">
        {[100, 66, 33].map((s) => (
          <div key={s} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ width: `${s}%`, height: `${s}%`, borderColor: tint(accent, 0.4) }} />
        ))}
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: tint(accent, 0.3) }} />
        <div className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2" style={{ background: tint(accent, 0.3) }} />
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ background: `conic-gradient(from 0deg, ${tint(accent, 0.42)}, transparent 32%)` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "linear" }}
        />
        {blips.map((b, i) => (
          <motion.span
            key={i}
            className="absolute h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ left: `${b.x}%`, top: `${b.y}%`, background: accent, boxShadow: `0 0 10px ${accent}` }}
            animate={{ opacity: [0, 1, 0.3] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: b.d, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}

function Layers({ accent }: { accent: string }) {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative h-[62%] w-[62%]">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-lg border"
            style={{ borderColor: tint(accent, 0.6), background: `linear-gradient(135deg, ${tint(accent, 0.18)}, transparent)`, transform: `translate(${i * 10}px, ${-i * 12}px)` }}
            animate={{ y: [0, -8, 0], opacity: [0.55, 1, 0.55] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.35 }}
          />
        ))}
        <motion.div
          className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: accent, boxShadow: `0 0 16px ${accent}` }}
          animate={{ scale: [1, 1.8, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
}

function Gauge({ accent }: { accent: string }) {
  const radius = 38;
  const cx = 50;
  const cy = 58;
  const circumference = Math.PI * radius;
  const target = 0.72;
  const angle = -180 + target * 180;
  return (
    <div className="absolute inset-0 grid place-items-center">
      <svg viewBox="0 0 100 74" className="h-[74%] w-[74%]">
        <path d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`} fill="none" stroke="rgba(255,255,255,.12)" strokeWidth={6} strokeLinecap="round" />
        <motion.path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none" stroke={accent} strokeWidth={6} strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference * (1 - target) }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 6px ${accent})` }}
        />
        <motion.line
          x1={cx} y1={cy} x2={cx} y2={cy - radius + 6}
          stroke={accent} strokeWidth={2} strokeLinecap="round"
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          initial={{ rotate: -180 }}
          animate={{ rotate: angle }}
          transition={{ duration: 1.6, ease: "easeOut" }}
        />
        <circle cx={cx} cy={cy} r={3.5} fill={accent} />
      </svg>
    </div>
  );
}
