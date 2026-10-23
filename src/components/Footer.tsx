import { Cpu, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer relative z-10 mt-auto border-t border-white/10 bg-slate-950/70 backdrop-blur-md py-4">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-2 px-4 text-center">
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-semibold text-slate-300">
          <Cpu size={15} className="text-uttam-yellow" />
          <span className="tracking-wider text-white">ENGINEERING STEEL INTELLIGENCE</span>
          <span className="hidden text-slate-600 sm:inline">•</span>
          <span className="flex items-center gap-1 text-uttam-yellow">
            <MapPin size={13} /> Steel Construction Expo Asia 2026 · Stall 608
          </span>
        </div>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} Developed by{" "}
          <a
            href="https://uttamgalvainnovativesolutions.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-slate-200 hover:text-uttam-yellow transition-colors underline-offset-4 hover:underline"
          >
            Uttam Galva Innovative Solutions Pvt Ltd
          </a>
          . All rights reserved.
        </p>
      </div>
    </footer>
  );
}
