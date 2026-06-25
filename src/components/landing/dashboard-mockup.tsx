"use client";
import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function CountUp({ end, duration = 2, prefix = "", suffix = "", decimals = 0 }: {
  end: number; duration?: number; prefix?: string; suffix?: string; decimals?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [val, setVal] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    let raf = 0;
    const tick = (t: number) => {
      if (start == null) start = t;
      const p = Math.min(1, (t - start) / (duration * 1000));
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(end * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, end, duration]);

  const formatted = val.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return <span ref={ref}>{prefix}{formatted}{suffix}</span>;
}

export function DashboardMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-[880px]"
    >
      <div className="glass rounded-[28px] p-3 shadow-float">
        <div className="rounded-[20px] bg-white/95 p-5 md:p-7">
          {/* Top bar */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-amber-400" />
              <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="hidden md:flex gap-1 text-[11px] font-medium text-slate-500">
              {["Portefeuille", "Performance", "Actifs", "Analyses"].map((t, i) => (
                <span key={t} className={`px-3 py-1.5 rounded-full ${i === 0 ? "bg-indigo-600 text-white" : "bg-slate-100"}`}>{t}</span>
              ))}
            </div>
            <div className="h-7 w-7 rounded-full bg-gradient-to-br from-teal-300 to-indigo-500" />
          </div>

          <div className="grid grid-cols-12 gap-4">
            {/* Big portfolio card */}
            <div className="col-span-12 md:col-span-7 rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-teal-500 p-5 text-white relative overflow-hidden">
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/15 blur-2xl" />
              <p className="text-xs/relaxed opacity-80">Valeur Totale du Portefeuille</p>
              <p className="text-3xl md:text-4xl font-bold tracking-tight mt-1">$248,930.42</p>
              <div className="flex items-center gap-2 mt-1.5 text-sm">
                <span className="px-2 py-0.5 rounded-full bg-emerald-300/30 text-emerald-50 text-xs font-semibold">+18.42%</span>
                <span className="opacity-80 text-xs">les 30 derniers jours</span>
              </div>
              {/* Sparkline */}
              <svg viewBox="0 0 320 80" className="mt-4 w-full">
                <defs>
                  <linearGradient id="spark" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#fff" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#fff" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <motion.path
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  d="M0,55 C30,50 50,40 70,42 C100,46 120,28 150,30 C180,32 200,16 230,20 C260,24 285,10 320,8"
                  stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"
                />
                <path d="M0,55 C30,50 50,40 70,42 C100,46 120,28 150,30 C180,32 200,16 230,20 C260,24 285,10 320,8 L320,80 L0,80 Z" fill="url(#spark)" opacity="0.5" />
              </svg>
            </div>

            {/* Allocation donut */}
            <div className="col-span-12 md:col-span-5 rounded-2xl bg-slate-50 p-5">
              <p className="text-xs text-slate-500">Allocation</p>
              <div className="flex items-center gap-4 mt-2">
                <svg viewBox="0 0 80 80" className="h-24 w-24 -rotate-90">
                  <circle cx="40" cy="40" r="32" stroke="#E2E8F0" strokeWidth="12" fill="none" />
                  <motion.circle initial={{ strokeDasharray: "0 999" }} whileInView={{ strokeDasharray: "90 999" }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.3 }} cx="40" cy="40" r="32" stroke="#F7A623" strokeWidth="12" fill="none" />
                  <motion.circle initial={{ strokeDasharray: "0 999", strokeDashoffset: 0 }} whileInView={{ strokeDasharray: "60 999" }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.6 }} cx="40" cy="40" r="32" stroke="#627EEA" strokeWidth="12" fill="none" strokeDashoffset="-90" />
                  <motion.circle initial={{ strokeDasharray: "0 999" }} whileInView={{ strokeDasharray: "30 999" }} viewport={{ once: true }} transition={{ duration: 1.4, delay: 0.9 }} cx="40" cy="40" r="32" stroke="#14B8A6" strokeWidth="12" fill="none" strokeDashoffset="-150" />
                </svg>
                <div className="space-y-1.5 text-xs">
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-amber-500" /> BTC 45%</div>
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-indigo-500" /> ETH 30%</div>
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-teal-500" /> SOL 15%</div>
                  <div className="flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-slate-300" /> Autre 10%</div>
                </div>
              </div>
            </div>

            {/* Risk meter */}
            <div className="col-span-6 md:col-span-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Niveau de Risque</p>
              <p className="mt-1 text-lg font-semibold text-slate-800">Équilibré</p>
              <div className="mt-3 h-2 w-full rounded-full bg-slate-200 overflow-hidden">
                <motion.div initial={{ width: 0 }} whileInView={{ width: "62%" }} viewport={{ once: true }} transition={{ duration: 1.2 }} className="h-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500" />
              </div>
            </div>
            {/* Score */}
            <div className="col-span-6 md:col-span-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">Score d'Investissement</p>
              <p className="mt-1 text-2xl font-bold text-slate-800">87<span className="text-sm text-slate-400">/100</span></p>
              <p className="text-[11px] text-emerald-600 font-semibold mt-0.5">Excellent</p>
            </div>
            {/* Prices */}
            <div className="col-span-12 md:col-span-4 rounded-2xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500 mb-2">Prix en Direct</p>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between"><span>BTC</span><span className="font-semibold text-emerald-600">$68,420</span></div>
                <div className="flex justify-between"><span>ETH</span><span className="font-semibold text-emerald-600">$3,842</span></div>
                <div className="flex justify-between"><span>SOL</span><span className="font-semibold text-rose-500">$184.20</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
