"use client";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

const SYMBOLS = ["₿", "Ξ", "◎", "✕", "◈", "◊", "△", "●", "⬡", "⟁", "◇", "⬟"];

// ──────── Floating crypto symbols ────────
export function FloatingSymbols({ count = 18, dark = false }: { count?: number; dark?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => {
        const sym = SYMBOLS[i % SYMBOLS.length];
        const left = (i * 83 + 7) % 98;
        const top = (i * 47 + 5) % 95;
        const size = 18 + ((i * 11) % 52);
        const delay = (i % 9) * 0.55;
        const dur = 7 + (i % 6) * 1.3;
        const rotAmt = 8 + (i % 4) * 5;
        return (
          <motion.span
            key={i}
            initial={{ y: 0, rotate: 0, opacity: 0, scale: 0.5 }}
            animate={{
              y: [0, -(18 + i % 12), 0],
              rotate: [0, rotAmt, -rotAmt * 0.5, 0],
              opacity: [0, dark ? 0.6 : 0.18, dark ? 0.4 : 0.12, 0],
              scale: [0.8, 1, 0.9, 0.8],
            }}
            transition={{ duration: dur, delay, repeat: Infinity, ease: "easeInOut" }}
            style={{
              left: `${left}%`,
              top: `${top}%`,
              fontSize: size,
              color: dark
                ? `hsla(${170 + i * 20},80%,70%,0.5)`
                : `hsla(${220 + i * 15},80%,70%,0.15)`,
              filter: `blur(${i % 3 === 0 ? 0 : 0.5}px)`,
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

// ──────── Animated blob ────────
export function Blob({ className = "", children, speed = 1 }: { className?: string; children?: ReactNode; speed?: number }) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.12, 0.95, 1.08, 1],
        borderRadius: ["50%", "45% 55% 55% 45%", "55% 45% 45% 55%", "50%"],
      }}
      transition={{ duration: 12 / speed, repeat: Infinity, ease: "easeInOut" }}
      className={`absolute rounded-full blur-3xl ${className}`}
    >
      {children}
    </motion.div>
  );
}

// ──────── Particle starfield background ────────
interface Particle { x: number; y: number; r: number; speed: number; opacity: number; hue: number; }

export function ParticleField({ count = 80 }: { count?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = document.body.scrollHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const particles: Particle[] = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.3,
      speed: Math.random() * 0.3 + 0.05,
      opacity: Math.random() * 0.6 + 0.1,
      hue: Math.random() > 0.5 ? 174 : 220,
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.y -= p.speed;
        if (p.y < -4) { p.y = canvas.height + 4; p.x = Math.random() * canvas.width; }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},80%,70%,${p.opacity})`;
        ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  );
}

// ──────── Animated grid lines ────────
export function GridLines() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
      style={{
        backgroundImage: `
          linear-gradient(rgba(79,209,197,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(79,209,197,1) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
        maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
      }}
    />
  );
}

// ──────── Animated noise/grain overlay ────────
export function NoiseOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-[0.025]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px 200px",
      }}
    />
  );
}

// ──────── Radial glow orbs that drift ────────
export function DriftingOrbs() {
  const orbs = [
    { color: "rgba(79,209,197,0.12)", size: 600, x: "10%", y: "15%", dur: 20 },
    { color: "rgba(59,130,246,0.10)", size: 500, x: "80%", y: "25%", dur: 25 },
    { color: "rgba(139,92,246,0.08)", size: 400, x: "50%", y: "60%", dur: 18 },
    { color: "rgba(79,209,197,0.07)", size: 350, x: "20%", y: "80%", dur: 22 },
  ];
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {orbs.map((o, i) => (
        <motion.div
          key={i}
          animate={{
            x: [0, 60, -40, 30, 0],
            y: [0, -50, 30, -20, 0],
            scale: [1, 1.15, 0.9, 1.05, 1],
          }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut", delay: i * 3 }}
          style={{
            position: "absolute",
            left: o.x,
            top: o.y,
            width: o.size,
            height: o.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${o.color} 0%, transparent 70%)`,
            transform: "translate(-50%,-50%)",
            filter: "blur(40px)",
          }}
        />
      ))}
    </div>
  );
}
