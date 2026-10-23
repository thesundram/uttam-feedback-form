import Link from "next/link";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default function Header() {
  return (
    <header className="site-header sticky top-0 z-40">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" aria-label="Uttam Galva home" className="flex min-w-0 items-center gap-3">
          <div aria-hidden="true" className="relative grid h-11 w-11 shrink-0 place-items-center rounded-md border border-yellow-300/35 bg-linear-to-br from-blue-500/25 to-slate-950 p-1 text-sm font-black tracking-[-.12em] text-uttam-yellow shadow-[inset_0_0_18px_rgba(255,201,40,.08)] sm:h-12 sm:w-12">
            <Image src="/UttamLogo.png" fill className="object-contain p-1.5" alt="Uttam Galva Logo" priority />
          </div>
          <div className="min-w-0 leading-tight">
            <p className="text-sm font-black tracking-[.12em] text-white sm:text-lg">UTTAM GALVA</p>
            <p className="mt-1 text-[9px] font-bold tracking-[.13em] text-slate-300 sm:text-[10px]">INNOVATIVE SOLUTIONS PVT LTD</p>
          </div>
        </Link>
        <div className="hidden items-end text-right sm:flex sm:flex-col">
          <span className="eyebrow text-[9px] text-slate-300">Steel Construction Expo Asia 2026</span>
          <span className="mt-1 flex items-center gap-1.5 text-xs font-extrabold text-uttam-yellow"><MapPin size={13} /> STALL 608 · MUMBAI</span>
        </div>
        <div className="rounded-md border border-yellow-400/35 bg-yellow-400/10 px-2.5 py-2 text-[10px] font-black tracking-wider text-uttam-yellow sm:hidden">STALL 608</div>
      </div>
    </header>
  );
}
