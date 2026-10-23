"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type Props = { children: ReactNode; onClick?: () => void; disabled?: boolean; type?: "button" | "submit" };
export default function SteelButton({ children, onClick, disabled = false, type = "button" }: Props) {
  return (
    <motion.button type={type} whileHover={!disabled ? { y: -2 } : undefined} whileTap={!disabled ? { scale: .98 } : undefined} onClick={onClick} disabled={disabled} className="steel-button">
      {children}
    </motion.button>
  );
}
