import type { LucideIcon } from "lucide-react";
import { Boxes, BrainCircuit, Factory, MonitorCog, Network, Wrench } from "lucide-react";

export type VisualKind = "bars" | "network" | "radar" | "layers" | "wave" | "gauge";

export type CapabilityMetric = {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
};

export type CapabilityBullet = {
  title: string;
  text: string;
};

export type Capability = {
  id: string;
  index: string;
  category: string;
  title: string;
  tagline: string;
  description: string;
  accent: string;
  icon: LucideIcon;
  visual: VisualKind;
  signal: string;
  detail: string;
  bullets: CapabilityBullet[];
  metrics: CapabilityMetric[];
};

export const capabilities: Capability[] = [
  {
    id: "mes",
    index: "01",
    category: "SMART MANUFACTURING",
    title: "Manufacturing Execution System",
    tagline: "The digital backbone of the shop floor",
    description:
      "An MES connects production activity with live operational data, giving teams one accurate view of what is happening across every line and shift.",
    accent: "#38bdf8",
    icon: MonitorCog,
    visual: "bars",
    signal: "MES · STREAM · ONLINE",
    detail:
      "On the floor, an MES turns scattered shift logs into one source of truth, so a delay on the mill is visible the moment it starts rather than at the end of the shift.",
    bullets: [
      { title: "Live work orders", text: "Track every job from release to dispatch." },
      { title: "End-to-end traceability", text: "Follow material and quality data across the process." },
      { title: "Shop-floor visibility", text: "See status, yield and delays as they happen." },
    ],
    metrics: [
      { label: "Process visibility", value: 100, suffix: "%" },
      { label: "Manual entry cut", value: 70, suffix: "%" },
      { label: "Faster reporting", value: 4, suffix: "x" },
    ],
  },
  {
    id: "iiot",
    index: "02",
    category: "CONNECTED FACTORY",
    title: "Industrial IoT & Sensors",
    tagline: "Every asset, connected and listening",
    description:
      "IIoT links machines, sensors and systems so operational data flows continuously, turning isolated equipment into one measurable ecosystem.",
    accent: "#22d3ee",
    icon: Network,
    visual: "network",
    signal: "IIoT · MESH · STREAMING",
    detail:
      "Sensors on motors, furnaces and cranes publish readings continuously, so a temperature drift or vibration spike reaches the control room within seconds.",
    bullets: [
      { title: "Connected assets", text: "Live telemetry from critical equipment." },
      { title: "Streaming signals", text: "Data captured and moved in real time." },
      { title: "Edge ready", text: "Processing close to the machine." },
    ],
    metrics: [
      { label: "Signals / minute", value: 1200 },
      { label: "Connected assets", value: 350, suffix: "+" },
      { label: "Data latency", value: 50, prefix: "<", suffix: "ms" },
    ],
  },
  {
    id: "ai",
    index: "03",
    category: "AI & ANALYTICS",
    title: "AI & Advanced Analytics",
    tagline: "From hindsight to foresight",
    description:
      "Analytics and machine learning turn production data into patterns and predictions, helping teams anticipate issues and decide faster with evidence.",
    accent: "#ffc928",
    icon: BrainCircuit,
    visual: "wave",
    signal: "ML · INFERENCE · ADVISORY",
    detail:
      "Models trained on historical heats and process data surface the combinations that tend to lead to defects, well before the coil is finished.",
    bullets: [
      { title: "Pattern detection", text: "Find the signal inside the noise." },
      { title: "Predictive insight", text: "Anticipate what happens next." },
      { title: "Decision support", text: "Evidence-led, at the point of action." },
    ],
    metrics: [
      { label: "Pattern accuracy", value: 95, suffix: "%" },
      { label: "Decision speed", value: 3, suffix: "x" },
      { label: "Forecast horizon", value: 72, suffix: "h" },
    ],
  },
  {
    id: "industry40",
    index: "04",
    category: "INDUSTRY 4.0",
    title: "Industry 4.0 Operations",
    tagline: "Efficiency by design, not by chance",
    description:
      "Industry 4.0 blends automation, connectivity and intelligence so plants run leaner, safer and more responsive to real demand.",
    accent: "#34d399",
    icon: Factory,
    visual: "radar",
    signal: "4.0 · AUTONOMY · OPS",
    detail:
      "Connected lines flex with demand: scheduling, energy use and maintenance are coordinated from live data instead of fixed assumptions.",
    bullets: [
      { title: "Lean operations", text: "Less waste, more control." },
      { title: "Safer processes", text: "Monitoring that protects people and assets." },
      { title: "Responsive planning", text: "Adapt to demand as it moves." },
    ],
    metrics: [
      { label: "Downtime reduction", value: 30, suffix: "%" },
      { label: "Energy efficiency", value: 18, suffix: "%" },
      { label: "Throughput gain", value: 22, suffix: "%" },
    ],
  },
  {
    id: "digital-twin",
    index: "05",
    category: "VIRTUAL MIRROR",
    title: "Digital Twin",
    tagline: "A living model of the real plant",
    description:
      "A digital twin mirrors a physical asset or process with operational data, letting teams monitor, simulate and test changes without touching the running line.",
    accent: "#a78bfa",
    icon: Boxes,
    visual: "layers",
    signal: "TWIN · SIMULATE · MIRROR",
    detail:
      "Before changing a setpoint on the real line, the team rehearses it on the twin and sees the projected effect on yield and energy.",
    bullets: [
      { title: "Live mirror", text: "A model that reflects reality as it changes." },
      { title: "Safe simulation", text: "Test scenarios without risk to production." },
      { title: "Continuous learning", text: "Improve the model as the plant evolves." },
    ],
    metrics: [
      { label: "Model fidelity", value: 98, suffix: "%" },
      { label: "Scenario tests", value: 40, suffix: "+" },
      { label: "Zero-risk trials", value: 100, suffix: "%" },
    ],
  },
  {
    id: "predictive",
    index: "06",
    category: "UPTIME ASSURANCE",
    title: "Predictive Maintenance",
    tagline: "Fix it before it fails",
    description:
      "Sensor data and analytics reveal early warning signs, so maintenance happens on your schedule, not on the machine's.",
    accent: "#fb923c",
    icon: Wrench,
    visual: "gauge",
    signal: "HEALTH · WEAR · PREDICT",
    detail:
      "Bearing wear and thermal trends are tracked against known failure signatures, so a replacement is planned for the next window rather than discovered during a breakdown.",
    bullets: [
      { title: "Early warnings", text: "Spot developing issues before they escalate." },
      { title: "Planned repairs", text: "Schedule work around production, not breakdowns." },
      { title: "Longer asset life", text: "Care that extends equipment value." },
    ],
    metrics: [
      { label: "Early detection", value: 90, suffix: "%" },
      { label: "Reactive repairs", value: 60, prefix: "-", suffix: "%" },
      { label: "Asset life", value: 15, suffix: "%" },
    ],
  },
];
