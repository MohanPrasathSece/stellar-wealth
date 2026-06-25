"use client";
import { motion, type Variants, useScroll, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

// Main scroll-triggered reveal
const variants: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  className,
  as: As = "div",
  direction = "up",
  distance = 48,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: keyof typeof motion;
  direction?: "up" | "down" | "left" | "right" | "scale";
  distance?: number;
}) {
  const Comp = motion[As] as typeof motion.div;

  const dirMap: Record<string, object> = {
    up:    { opacity: 0, y: distance, filter: "blur(4px)" },
    down:  { opacity: 0, y: -distance, filter: "blur(4px)" },
    left:  { opacity: 0, x: distance, filter: "blur(4px)" },
    right: { opacity: 0, x: -distance, filter: "blur(4px)" },
    scale: { opacity: 0, scale: 0.88, filter: "blur(6px)" },
  };

  return (
    <Comp
      initial={dirMap[direction]}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </Comp>
  );
}

// Stagger container — children animate in one after another
export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
}) {
  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Child item for StaggerContainer
export function StaggerItem({
  children,
  className,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "scale";
}) {
  const dirMap: Record<string, Variants> = {
    up: {
      hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
      show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    },
    left: {
      hidden: { opacity: 0, x: 40, filter: "blur(4px)" },
      show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    },
    right: {
      hidden: { opacity: 0, x: -40, filter: "blur(4px)" },
      show: { opacity: 1, x: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.85 },
      show: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
    },
  };

  return (
    <motion.div variants={dirMap[direction]} className={className}>
      {children}
    </motion.div>
  );
}

// Parallax scroll — element moves at a different speed than scroll
export function ParallaxSection({
  children,
  className,
  speed = 0.3,
}: {
  children: ReactNode;
  className?: string;
  speed?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-100 * speed, 100 * speed]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div style={{ y }}>{children}</motion.div>
    </div>
  );
}

// Text that animates character by character
export function CharReveal({
  text,
  className,
  delay = 0,
  stagger = 0.03,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  return (
    <motion.span
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={className}
      aria-label={text}
    >
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          variants={{
            hidden: { opacity: 0, y: 20, rotateX: -90 },
            show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
          }}
          style={{ display: char === " " ? "inline" : "inline-block", transformOrigin: "bottom" }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
