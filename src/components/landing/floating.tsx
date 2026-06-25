"use client";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

const SYMBOLS = ["₿", "Ξ", "◎", "✕", "◈", "◊", "△", "●"];

export function FloatingSymbols({ count = 14, dark = false }: { count?: number; dark?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const sym = SYMBOLS[i % SYMBOLS.length];
        const left = (i * 83) % 100;
        const top = (i * 47) % 100;
        const size = 24 + ((i * 13) % 56);
        const delay = (i % 7) * 0.6;
        const duration = 8 + (i % 5);
        return (
          <motion.span
            key={i}
            initial={{ y: 0, rotate: 0, opacity: 0 }}
            animate={{ y: [0, -22, 0], rotate: [0, 12, 0], opacity: [0.25, 0.55, 0.25] }}
            transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              fontSize: size,
              color: dark ? "rgba(190,239,255,0.35)" : "rgba(30,58,138,0.18)",
            }}
            className="absolute font-bold select-none"
          >
            {sym}
          </motion.span>
        );
      })}
    </div>
  );
}

export function Blob({ className = "", children }: { className?: string; children?: ReactNode }) {
  return <div className={`absolute rounded-full blur-3xl ${className}`}>{children}</div>;
}
