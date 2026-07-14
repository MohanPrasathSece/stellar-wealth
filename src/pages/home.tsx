import { AuthModals } from "@/components/auth-modals";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SmoothScroll } from "@/components/landing/smooth-scroll";
import { MouseGlow } from "@/components/landing/mouse-glow";
import { FloatingSymbols, Blob, ParticleField, GridLines, NoiseOverlay, DriftingOrbs } from "@/components/landing/floating";
import { Reveal, StaggerContainer, StaggerItem, ParallaxSection, CharReveal } from "@/components/landing/reveal";
import { CountUp, DashboardMockup } from "@/components/landing/dashboard-mockup";
import { CoinBTC, CoinETH, CoinSOL, CoinXRP, Logo } from "@/components/landing/icons";
import { CountrySelect, COUNTRY_PHONE_PATTERNS } from "@/components/country-select";
import { trackMetaEvent } from "@/lib/metaPixel";

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const openAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthOpen(true);
  };

  return (
    <SmoothScroll>
      <AuthModals isOpen={authOpen} onClose={() => setAuthOpen(false)} initialMode={authMode} />
      <div className="relative min-h-screen text-foreground overflow-x-clip">
        <MouseGlow />
        <Nav onOpenAuth={openAuth} />
        <Hero onOpenAuth={openAuth} />
        <DashboardSection />
        <AlternatingFeatures />
        <HowItWorks />
        <ContactFormSection />
        <Footer />
      </div>
    </SmoothScroll>
  );
}

/* ---------------- NAV ---------------- */
function Nav({ onOpenAuth }: { onOpenAuth: (mode: 'login' | 'signup') => void }) {
  const [open, setOpen] = useState(false);
  const links = ["Plateforme", "Investir", "Contact"];
  return (
    <header className="fixed top-4 left-0 right-0 z-50 px-4">
      <div className="mx-auto max-w-6xl glass-dark border border-white/10 rounded-full px-4 py-2.5 flex items-center justify-between shadow-soft">
        <Logo />
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-white/80">
          {links.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="px-3 py-2 rounded-full hover:glass-dark border border-white/10 rounded-3xl p-8/60 transition">{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button onClick={() => onOpenAuth('login')} className="hidden sm:inline-flex text-sm font-medium text-white/80 px-3 py-2 rounded-full hover:glass-dark border border-white/10 rounded-3xl p-8/60">Se Connecter</button>
          <button onClick={() => onOpenAuth('signup')} className="text-sm font-bold px-5 py-2.5 rounded-full bg-teal-400 text-slate-900 shadow-[0_0_15px_rgba(79,209,197,0.4)] hover:shadow-[0_0_25px_rgba(79,209,197,0.6)] hover:bg-teal-300 hover:scale-105 active:scale-95 transition-all duration-300">
            Commencer à Investir
          </button>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Menu">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="md:hidden mx-auto max-w-6xl mt-2 glass rounded-3xl p-4">
            {links.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="block py-2 text-sm font-medium">{l}</a>)}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero({ onOpenAuth }: { onOpenAuth: (mode: 'login' | 'signup') => void }) {
  return (
    <section className="relative pt-40 pb-32 px-4 overflow-hidden">
      <FloatingSymbols count={16} />
      <Blob className="left-[-10%] top-20 h-[360px] w-[360px] bg-teal-300/40" />
      <Blob className="right-[-8%] top-40 h-[420px] w-[420px] bg-indigo-300/40" />

      {/* Floating coins */}
      <motion.div className="absolute left-[6%] top-[28%] hidden md:block" animate={{ y: [0, -18, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
        <CoinBTC className="h-20 w-20 drop-shadow-2xl" />
      </motion.div>
      <motion.div className="absolute right-[8%] top-[34%] hidden md:block" animate={{ y: [0, -22, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}>
        <CoinETH className="h-24 w-24 drop-shadow-2xl" />
      </motion.div>
      <motion.div className="absolute left-[12%] bottom-[12%] hidden md:block" animate={{ y: [0, -16, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
        <CoinSOL className="h-16 w-16 drop-shadow-2xl" />
      </motion.div>
      <motion.div className="absolute right-[10%] bottom-[18%] hidden md:block" animate={{ y: [0, -14, 0] }} transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}>
        <CoinXRP className="h-14 w-14 drop-shadow-2xl" />
      </motion.div>

      <div className="relative mx-auto max-w-5xl text-center">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-semibold text-white/80 shadow-soft">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          Nouveau : Le Rééquilibrage de Portefeuille IA est en ligne
        </motion.div>

        <h1 className="mt-6 text-[44px] leading-[1.02] sm:text-6xl md:text-7xl lg:text-[88px] font-bold tracking-tight text-white">
          <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }} className="block">
            Investissez Plus Intelligemment.
          </motion.span>
          <motion.span initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="block text-gradient">
            Développez Votre Patrimoine Plus Vite.
          </motion.span>
        </h1>

        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-7 mx-auto max-w-2xl text-base md:text-lg text-white/80/90 leading-relaxed">
          Aider les investisseurs à créer une richesse crypto à long terme grâce à des analyses d'IA intelligentes, l'automatisation de portefeuille et des stratégies d'investissement sécurisées — le tout depuis une plateforme magnifiquement simple.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button onClick={() => onOpenAuth('signup')} className="group relative overflow-hidden px-8 py-4 rounded-full bg-teal-400 text-slate-900 text-sm font-bold shadow-[0_0_20px_rgba(79,209,197,0.4)] hover:shadow-[0_0_40px_rgba(79,209,197,0.6)] hover:bg-teal-300 hover:scale-105 active:scale-95 transition-all duration-300">
            <span className="relative z-10 flex items-center gap-2">Commencer à Investir <span className="transition-transform group-hover:translate-x-1">→</span></span>
          </button>
          <button className="px-8 py-4 rounded-full glass-dark border border-white/20 text-sm font-bold text-white hover:bg-white/10 hover:border-white/40 hover:scale-105 active:scale-95 transition-all duration-300">
            Explorer la Plateforme
          </button>
        </motion.div>

        <div className="mt-20">
          <DashboardMockup />
        </div>
      </div>
    </section>
  );
}

/* ---------------- TRUST MARQUEE ---------------- */
function TrustMarquee() {
  const logos = ["Coinflow", "Bynex", "Krakehn", "Bybix", "Ledgar", "Chainlynx", "Polymesh", "Etherix", "Bitstack", "Solara"];
  const row = [...logos, ...logos];
  return (
    <section className="relative py-16 px-4">
      <Reveal className="text-center mb-8">
        <p className="text-xs font-semibold tracking-widest uppercase text-white/80/70">Fait confiance par les principaux échanges et réseaux</p>
      </Reveal>
      <div className="relative overflow-hidden mask-fade">
        <div className="flex gap-12 w-max animate-marquee">
          {row.map((l, i) => (
            <div key={i} className="flex items-center gap-2 text-white/80/80 text-xl md:text-2xl font-display font-semibold whitespace-nowrap">
              <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500" />
              {l}
            </div>
          ))}
        </div>
      </div>
      <style>{`.mask-fade{mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);-webkit-mask-image:linear-gradient(90deg,transparent,#000 12%,#000 88%,transparent);}`}</style>
    </section>
  );
}

/* ---------------- SECTION 2: CONFIDENCE ---------------- */
function ConfidenceSection() {
  const cards = [
    { t: "Portefeuille IA", d: "Allocation personnalisée adaptée à vos objectifs.", c: "from-indigo-500 to-blue-500" },
    { t: "Analyse des Risques", d: "Scénarios de stress-test à travers les cycles du marché.", c: "from-teal-500 to-emerald-500" },
    { t: "Allocation Intelligente", d: "Diversification sur L1, L2 et rendements stables.", c: "from-teal-400 to-rose-500" },
    { t: "Prédiction du Marché", d: "Prévisions basées sur des signaux utiles.", c: "from-fuchsia-500 to-indigo-600" },
    { t: "Rééquilibrage Auto", d: "Restez sur la cible sans lever le petit doigt.", c: "from-sky-500 to-cyan-400" },
    { t: "Revenu Passif", d: "Obtenez un rendement sur les actifs inactifs, en toute sécurité.", c: "from-emerald-500 to-teal-600" },
  ];
  return (
    <section id="platform" className="relative py-32 px-4">
      <FloatingSymbols count={8} />
      <ParallaxSection speed={0.15} className="mx-auto max-w-6xl grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <p className="text-xs font-semibold tracking-widest uppercase text-teal-700">La Plateforme</p>
          <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Investissez en toute <span className="text-gradient">confiance</span>, à chaque cycle.
          </h2>
          <p className="mt-5 text-white/80 max-w-md leading-relaxed">
            Maison Bloc transforme la complexité du marché en décisions claires et automatisées. Des portefeuilles créés par l'IA au rééquilibrage tenant compte des risques — tout ce dont vous avez besoin pour développer une richesse à long terme.
          </p>
          <button className="mt-7 px-6 py-3 rounded-full bg-slate-900 text-white text-sm font-semibold hover:-translate-y-0.5 transition shadow-soft">
            Voir comment ça marche
          </button>
        </Reveal>

        <div className="relative h-[520px]">
          {cards.map((c, i) => {
            const offsets = [
              { x: 0, y: 0, r: -6 },
              { x: 60, y: 60, r: 4 },
              { x: -30, y: 130, r: -3 },
              { x: 80, y: 200, r: 6 },
              { x: -10, y: 280, r: -5 },
              { x: 60, y: 360, r: 3 },
            ][i];
            return (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 30, rotate: offsets.r }}
                whileInView={{ opacity: 1, y: 0, rotate: offsets.r }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: i * 0.08, duration: 0.7 }}
                whileHover={{ y: -8, rotate: 0, scale: 1.03, zIndex: 30 }}
                style={{ left: offsets.x, top: offsets.y }}
                className="absolute w-[280px] md:w-[320px] rounded-3xl glass-dark border border-white/10 rounded-3xl p-8 p-5 shadow-float cursor-pointer"
              >
                <div className={`h-10 w-10 rounded-xl bg-gradient-to-br ${c.c} mb-3`} />
                <h3 className="text-lg font-semibold text-white">{c.t}</h3>
                <p className="text-sm text-white/75 mt-1">{c.d}</p>
                <div className="mt-4 flex items-center justify-between text-xs">
                  <span className="px-2 py-0.5 rounded-full bg-white/10 text-white/75 font-medium">Automatisé</span>
                  <span className="text-indigo-600 font-semibold">Apprendre →</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </ParallaxSection>
    </section>
  );
}

/* ---------------- STATS ---------------- */
function StatsSection() {
  const stats = [
    { v: 182, p: "+", s: "%", l: "Croissance Annuelle", c: "from-emerald-400 to-teal-500", r: -3 },
    { v: 96, s: "%", l: "Fidélisation Client", c: "from-indigo-500 to-blue-500", r: 4 },
    { v: 420, p: "$", s: "M", l: "Actifs Sous Gestion", c: "from-teal-400 to-rose-500", r: -2 },
    { v: 98, s: "%", l: "Note de Sécurité", c: "from-fuchsia-500 to-indigo-600", r: 3 },
  ];
  return (
    <section className="relative py-24 px-4">
      <Reveal className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Des chiffres qui se <span className="text-gradient">multiplient</span>.</h2>
        <p className="mt-4 text-white/80">Une performance constante et discrète — mesurée en années, pas en semaines.</p>
      </Reveal>
      <div className="mx-auto max-w-6xl grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((s, i) => (
          <motion.div
            key={s.l}
            initial={{ opacity: 0, y: 30, rotate: s.r }}
            whileInView={{ opacity: 1, y: 0, rotate: s.r }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            whileHover={{ y: -8, rotate: 0 }}
            className="rounded-3xl glass-dark border border-white/10 rounded-3xl p-8 p-7 shadow-float"
          >
            <div className={`inline-flex h-10 w-10 rounded-xl bg-gradient-to-br ${s.c} mb-4`} />
            <p className="text-5xl font-bold tracking-tight text-white">
              <CountUp end={s.v} prefix={s.p} suffix={s.s} />
            </p>
            <p className="mt-2 text-sm text-white/75 font-medium">{s.l}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- DASHBOARD SECTION ---------------- */
function DashboardSection() {
  const [tab, setTab] = useState("Portefeuille");
  const tabs = ["Portefeuille", "Performance", "Actifs", "Transactions", "Analyses"];
  return (
    <section id="invest" className="relative py-32 px-4">
      <Reveal className="text-center max-w-2xl mx-auto mb-14">
        <p className="text-xs font-semibold tracking-widest uppercase text-teal-200">Le Terminal</p>
        <h2 className="mt-3 text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">
          Un tableau de bord qui pense <span className="text-gradient">avec vous</span>.
        </h2>
        <p className="mt-4 text-white/70">Tout ce dont vous avez besoin pour surveiller, analyser et optimiser — magnifiquement sur un seul écran.</p>
      </Reveal>

      <Reveal className="mx-auto max-w-6xl">
        <div className="glass-dark rounded-[28px] p-3 shadow-float">
          <div className="rounded-[20px] bg-slate-950/80 p-6 text-white">
            <div className="flex flex-wrap gap-2 mb-6">
              {tabs.map((t) => (
                <button key={t} onClick={() => setTab(t)} className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${tab === t ? "glass-dark border border-white/10 rounded-3xl p-8 text-white" : "glass-dark border border-white/10 rounded-3xl p-8/10 text-white/80 hover:glass-dark border border-white/10 rounded-3xl p-8/20"}`}>{t}</button>
              ))}
            </div>
            <div className="grid grid-cols-12 gap-4">
              <div className="col-span-12 lg:col-span-8 rounded-2xl glass-dark border border-white/10 rounded-3xl p-8/5 border border-white/10 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-white/60">Performance du Portefeuille</p>
                    <p className="text-3xl font-bold mt-1">+42.6%</p>
                  </div>
                  <div className="flex gap-1 text-[11px]">
                    {["1J","1S","1M","1A","TOUT"].map((p,i)=>(
                      <span key={p} className={`px-2 py-1 rounded-md ${i===3?"bg-teal-400 text-white font-semibold":"glass-dark border border-white/10 rounded-3xl p-8/10"}`}>{p}</span>
                    ))}
                  </div>
                </div>
                <svg viewBox="0 0 600 220" className="w-full">
                  <defs>
                    <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#4FD1C5" stopOpacity="0.5"/>
                      <stop offset="100%" stopColor="#4FD1C5" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  {[40,80,120,160,200].map(y=><line key={y} x1="0" x2="600" y1={y} y2={y} stroke="white" strokeOpacity="0.05"/>)}
                  <motion.path key={tab} initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.6, ease: "easeInOut" }}
                    d="M0,180 C50,170 90,140 130,150 C170,160 200,100 250,110 C300,120 330,70 380,80 C430,90 470,40 520,50 C560,58 580,30 600,20"
                    stroke="#4FD1C5" strokeWidth="3" fill="none" strokeLinecap="round" />
                  <path d="M0,180 C50,170 90,140 130,150 C170,160 200,100 250,110 C300,120 330,70 380,80 C430,90 470,40 520,50 C560,58 580,30 600,20 L600,220 L0,220 Z" fill="url(#area)" />
                </svg>
              </div>
              <div className="col-span-12 lg:col-span-4 space-y-4">
                <div className="rounded-2xl glass-dark border border-white/10 rounded-3xl p-8/5 border border-white/10 p-5">
                  <p className="text-xs text-white/60 mb-3">Meilleurs Actifs</p>
                  {[
                    { n: "Bitcoin", s: "BTC", v: "+12.4%", w: "78%" },
                    { n: "Ethereum", s: "ETH", v: "+8.1%", w: "62%" },
                    { n: "Solana", s: "SOL", v: "+22.7%", w: "84%" },
                    { n: "Polygon", s: "MATIC", v: "-3.2%", w: "32%", neg: true },
                  ].map((a, i) => (
                    <div key={a.s} className="mb-3 last:mb-0">
                      <div className="flex justify-between text-xs mb-1">
                        <span>{a.n} <span className="text-white/50">{a.s}</span></span>
                        <span className={a.neg ? "text-rose-400" : "text-emerald-400"}>{a.v}</span>
                      </div>
                      <div className="h-1.5 rounded-full glass-dark border border-white/10 rounded-3xl p-8/10 overflow-hidden">
                        <motion.div initial={{ width: 0 }} whileInView={{ width: a.w }} viewport={{once:true}} transition={{ delay: 0.2 + i*0.1, duration: 1 }} className={`h-full ${a.neg?"bg-rose-400":"bg-gradient-to-r from-teal-400 to-indigo-400"}`} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl bg-gradient-to-br from-teal-500/30 to-indigo-600/30 border border-white/10 p-5">
                  <p className="text-xs text-white/70">Bénéfice du Jour</p>
                  <p className="text-2xl font-bold mt-1">+$3,842.18</p>
                  <p className="text-xs text-emerald-300 mt-0.5">+1.84% depuis hier</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- ALTERNATING FEATURES ---------------- */
function AlternatingFeatures() {
  const features = [
    { t: "Assistant d'Investissement IA", d: "Discutez avec un analyste qui connaît votre portefeuille par cœur — et agit en conséquence.", tag: "Intelligence" },
    { t: "Fonds Indiciels Crypto", d: "Paniers diversifiés en un clic sur les meilleurs L1, L2 et thèmes.", tag: "Paniers" },
    { t: "Rapports Fiscaux", d: "Générez des rapports conformes en quelques secondes, pas en un week-end.", tag: "Conformité" },
    { t: "Copy Trading", d: "Copiez automatiquement les mouvements des meilleurs investisseurs vérifiés.", tag: "Social" },
    { t: "Staking Passif", d: "Obtenez un rendement sécurisé avec des validateurs audités et surveillés.", tag: "Rendement" },
    { t: "Terminal de Recherche", d: "Recherche de niveau institutionnel, données on-chain et alertes en direct.", tag: "Analyses" },
  ];
  return (
    <section className="relative py-24 px-4">
      <Reveal className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight">Tout ce dont les investisseurs ont réellement besoin.</h2>
        <p className="mt-4 text-white/70">Une plateforme complète construite autour de la gestion des portefeuilles modernes.</p>
      </Reveal>
      <ParallaxSection speed={0.1} className="mx-auto max-w-6xl space-y-10">
        {features.map((f, i) => {
          const reverse = i % 2 === 1;
          return (
            <Reveal key={f.t} delay={i * 0.05}>
              <div className={`grid md:grid-cols-2 gap-8 items-center ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}>
                <div className="rounded-[28px] glass-dark p-3 shadow-float">
                  <div className="aspect-[5/3] rounded-2xl bg-gradient-to-br from-white/10 to-white/5 border border-white/10 relative overflow-hidden">
                    <FeatureArt index={i} />
                  </div>
                </div>
                <div className="px-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-teal-200 text-xs font-semibold border border-primary/20">{f.tag}</span>
                  <h3 className="mt-4 text-3xl md:text-4xl font-bold text-white tracking-tight">{f.t}</h3>
                  <p className="mt-3 text-white/75 leading-relaxed max-w-md">{f.d}</p>
                  <button className="mt-5 text-sm font-bold text-teal-300 inline-flex items-center gap-2 group hover:text-teal-200 hover:scale-105 transition-all">
                    En savoir plus
                    <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
                  </button>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ParallaxSection>
    </section>
  );
}

function FeatureArt({ index }: { index: number }) {
  const arts = [
    // AI Assistant - chat bubbles
    <div key="0" className="absolute inset-0 p-6 space-y-2">
      <div className="ml-auto w-2/3 rounded-2xl rounded-tr-sm bg-white/10 border border-white/10 p-3 text-xs text-white/90">Dois-je rééquilibrer le BTC ?</div>
      <div className="mr-auto w-3/4 rounded-2xl rounded-tl-sm bg-gradient-to-br from-indigo-600 to-teal-500 p-3 text-xs text-white">Réduire le BTC de 4% et ajouter du SOL diminuerait le risque de 11% — voulez-vous que j'exécute ?</div>
      <div className="ml-auto w-1/2 rounded-2xl rounded-tr-sm bg-white/10 border border-white/10 p-3 text-xs text-white/90">Oui, fais-le.</div>
    </div>,
    // Index funds
    <div key="1" className="absolute inset-0 p-6 grid grid-cols-3 gap-3 content-center">
      {["DeFi","L2","AI","Gaming","Stable","blue Chip"].map((b,i)=>(
        <div key={b} className="rounded-xl glass-dark border border-white/10 rounded-3xl p-8 shadow-soft p-3 text-center">
          <div className={`mx-auto h-6 w-6 rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.1)] bg-gradient-to-br ${["from-indigo-400 to-blue-500","from-teal-400 to-emerald-500","from-teal-400 to-rose-500","from-fuchsia-500 to-indigo-600","from-sky-400 to-cyan-500","from-emerald-400 to-teal-600"][i]}`} />
          <p className="mt-1 text-[10px] font-semibold text-white/80">{b}</p>
          <p className="text-[9px] text-emerald-600">+{8+i*3}%</p>
        </div>
      ))}
    </div>,
    // Tax
    <div key="2" className="absolute inset-0 p-6">
      <div className="rounded-xl glass-dark border border-white/10 rounded-3xl p-8 shadow-soft p-4">
        <div className="flex justify-between text-xs"><span className="font-semibold">Rapport Fiscal 2025</span><span className="text-emerald-600 font-semibold">Prêt</span></div>
        <div className="mt-3 h-1.5 bg-white/10 rounded-full"><div className="h-full w-full rounded-full bg-gradient-to-r from-teal-400 to-indigo-500"/></div>
        <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[10px]">
          {["Réalisé","Non-Réalisé","Net"].map((k,i)=><div key={k} className="rounded-lg bg-white/10 border border-white/10 p-2"><p className="text-white/60">{k}</p><p className="font-bold text-white">${(12+i*8).toFixed(1)}k</p></div>)}
        </div>
      </div>
    </div>,
    // Copy trading - avatars
    <div key="3" className="absolute inset-0 p-6 flex flex-col gap-2 justify-center">
      {[
        {n:"Maya R.", r:"+186%"},{n:"Kenji A.", r:"+142%"},{n:"Lena V.", r:"+118%"}
      ].map((u,i)=>(
        <div key={u.n} className="flex items-center gap-3 rounded-xl glass-dark border border-white/10 rounded-3xl p-8 p-3 shadow-soft">
          <div className={`h-9 w-9 rounded-full bg-gradient-to-br ${["from-teal-400 to-rose-500","from-teal-400 to-indigo-500","from-fuchsia-500 to-indigo-600"][i]}`} />
          <div className="flex-1">
            <p className="text-xs font-semibold text-white">{u.n}</p>
            <p className="text-[10px] text-white/60">Top {i+1}% investisseur</p>
          </div>
          <span className="text-xs font-bold text-emerald-600">{u.r}</span>
          <button className="text-[10px] font-semibold px-2 py-1 rounded-full bg-indigo-600 text-white">Copier</button>
        </div>
      ))}
    </div>,
    // Staking
    <div key="4" className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-44 w-44">
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-teal-400/60 animate-spin-slow" />
        <div className="absolute inset-6 rounded-full bg-gradient-to-br from-teal-500 to-indigo-600 flex flex-col items-center justify-center text-white shadow-float">
          <p className="text-[10px] uppercase tracking-wider opacity-80">APY</p>
          <p className="text-3xl font-bold">8.42%</p>
        </div>
      </div>
    </div>,
    // Research
    <div key="5" className="absolute inset-0 p-6 grid grid-rows-3 gap-2">
      {["La dominance du BTC augmente","Flux de staking ETH +24%","La TVL de SOL atteint un nouvel ATH"].map((s,i)=>(
        <div key={s} className="rounded-xl glass-dark border border-white/10 rounded-3xl p-8 shadow-soft p-3 flex items-center gap-3">
          <div className={`h-2 w-2 rounded-full ${["bg-teal-500","bg-indigo-500","bg-teal-500"][i]}`} />
          <p className="text-xs text-white/80 flex-1">{s}</p>
          <span className="text-[10px] text-slate-400">2m</span>
        </div>
      ))}
    </div>,
  ];
  return <>{arts[index]}</>;
}

/* ---------------- SUCCESS STORIES ---------------- */
function SuccessStories() {
  const stories = [
    { n: "Olivia M.", r: "Founder, Helix Labs", b: 12000, a: 84200, roi: "+602%" },
    { n: "Daniel K.", r: "Software Engineer", b: 8500, a: 31800, roi: "+274%" },
    { n: "Aisha P.", r: "Designer", b: 5200, a: 19400, roi: "+273%" },
  ];
  return (
    <section className="relative py-24 px-4">
      <Reveal className="text-center max-w-2xl mx-auto mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">De vrais investisseurs. Une vraie croissance.</h2>
        <p className="mt-4 text-white/70">Histoires de membres construisant une richesse à long terme avec Maison Bloc.</p>
      </Reveal>
      <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-5">
        {stories.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.1}>
            <motion.div whileHover={{ y: -8 }} className="rounded-3xl glass-dark border border-white/10 rounded-3xl p-8 p-6 shadow-float">
              <div className="flex items-center gap-3">
                <div className={`h-12 w-12 rounded-full bg-gradient-to-br ${["from-teal-400 to-rose-500","from-teal-400 to-indigo-500","from-fuchsia-500 to-indigo-600"][i]}`} />
                <div>
                  <p className="font-semibold text-white">{s.n}</p>
                  <p className="text-xs text-white/60">{s.r}</p>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-3 text-center">
                <div className="rounded-xl bg-slate-50 p-3">
                  <p className="text-[10px] text-white/60 uppercase">Avant</p>
                  <p className="text-lg font-bold text-white/80">${s.b.toLocaleString()}</p>
                </div>
                <div className="rounded-xl bg-gradient-to-br from-teal-500 to-indigo-600 text-white p-3">
                  <p className="text-[10px] opacity-80 uppercase">Après</p>
                  <p className="text-lg font-bold">${s.a.toLocaleString()}</p>
                </div>
              </div>
              <svg viewBox="0 0 200 60" className="mt-4 w-full">
                <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6 }}
                  d={`M0,50 C40,48 60,${40-i*5} 90,${32-i*4} C120,${24-i*3} 150,${20-i*2} 200,${8-i*2}`}
                  stroke="#3B82F6" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              </svg>
              <p className="mt-2 text-right text-emerald-600 font-bold">{s.roi} ROI</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    { n: "01", t: "Créer un Compte", d: "Inscrivez-vous en 60 secondes avec un KYC de niveau bancaire." },
    { n: "02", t: "Déposer des Fonds", d: "Financez par carte, virement ou crypto." },
    { n: "03", t: "Regardez-le Grandir", d: "Laissez l'IA rééquilibrer pendant que vous vivez votre vie." },
  ];
  return (
    <section className="relative py-24 px-4">
      <Reveal className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Comment ça marche</h2>
        <p className="mt-4 text-white/70">Trois étapes simples pour commencer à capitaliser.</p>
      </Reveal>
      <ParallaxSection speed={0.2} className="relative mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.15} className="w-full">
              <div className="relative rounded-[24px] glass-dark p-8 text-white w-full border border-white/5">
                <div className="flex items-center gap-4">
                  <div className="relative h-14 w-14 rounded-full bg-gradient-to-br from-[#4FD1C5] to-[#3B82F6] flex items-center justify-center font-bold text-lg animate-pulse-ring">{s.n}</div>
                  {i === 0 && (
                    <svg className="w-32 h-8 pointer-events-none opacity-40 ml-2" viewBox="0 0 100 20">
                      <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 2 }}
                        d="M0,10 C20,-5 40,25 60,10 C80,-5 100,25 120,10" stroke="white" strokeWidth="1" fill="none" />
                    </svg>
                  )}
                </div>
                <h3 className="mt-6 text-xl font-bold">{s.t}</h3>
                <p className="mt-2 text-[15px] text-white/60 leading-relaxed">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </ParallaxSection>
    </section>
  );
}

/* ---------------- SECURITY ---------------- */
function SecuritySection() {
  const items = ["Stockage à Froid", "A2F", "Chiffrement de Bout en Bout", "Assurance d'Actifs", "Portefeuilles Multi-sig", "Conformité Mondiale"];
  return (
    <section className="relative py-24 px-4">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative rounded-[36px] overflow-hidden glass-dark p-10 md:p-16 shadow-float">
          <Blob className="left-[-10%] top-[-20%] h-[400px] w-[400px] bg-teal-500/20" />
          <Blob className="right-[-10%] bottom-[-20%] h-[400px] w-[400px] bg-indigo-500/20" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-teal-300">Sécurité</p>
              <h2 className="mt-3 text-4xl md:text-5xl font-bold text-white tracking-tight">Qualité bancaire par défaut.</h2>
              <p className="mt-4 text-white/70 max-w-md">Vos actifs sont protégés par les mêmes normes que les plus grands dépositaires au monde — avec des extras.</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {items.map((it) => (
                  <div key={it} className="flex items-center gap-2 text-sm text-white/85">
                    <span className="h-5 w-5 rounded-full bg-emerald-400/20 text-emerald-300 flex items-center justify-center text-xs">✔</span>
                    {it}
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex items-center justify-center h-[360px]">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }} className="absolute h-[300px] w-[300px] rounded-full border border-white/10" />
              <motion.div animate={{ rotate: -360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} className="absolute h-[240px] w-[240px] rounded-full border border-white/10" />
              <motion.svg
                initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
                viewBox="0 0 120 140" className="relative h-56 drop-shadow-2xl">
                <defs>
                  <linearGradient id="sh" x1="0" x2="1" y1="0" y2="1">
                    <stop offset="0%" stopColor="#4FD1C5"/>
                    <stop offset="100%" stopColor="#3B82F6"/>
                  </linearGradient>
                </defs>
                <path d="M60,5 L110,25 V70 C110,100 90,125 60,135 C30,125 10,100 10,70 V25 Z" fill="url(#sh)" />
                <path d="M40,72 L55,87 L82,55" stroke="white" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </motion.svg>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- INSIGHTS ---------------- */
function InsightsSection() {
  const posts = [
    { c: "Marché", t: "Pourquoi le capital patient gagne ce cycle", a: "Eli Tran", d: "12 Juin", r: "6 min", g: "from-teal-400 to-rose-500" },
    { c: "Recherche", t: "Les signaux on-chain auxquels vous devriez vraiment faire confiance", a: "Mira Costa", d: "04 Juin", r: "9 min", g: "from-indigo-500 to-blue-500" },
    { c: "Stratégie", t: "Construire un portefeuille crypto barbell en 2026", a: "Jonas Reed", d: "28 Mai", r: "11 min", g: "from-teal-400 to-emerald-500" },
  ];
  return (
    <section id="resources" className="relative py-24 px-4">
      <Reveal className="mx-auto max-w-6xl flex items-end justify-between mb-10 gap-4">
        <div>
          <p className="text-xs font-semibold tracking-widest uppercase text-teal-200">Analyses</p>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold text-white tracking-tight">Depuis le bureau de recherche.</h2>
        </div>
        <button className="hidden md:inline-flex text-sm font-semibold text-white/90 hover:text-white">Tout voir →</button>
      </Reveal>
      <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-5">
        {posts.map((p, i) => (
          <Reveal key={p.t} delay={i * 0.1}>
            <motion.article whileHover={{ y: -6 }} className="rounded-3xl glass-dark border border-white/10 rounded-3xl p-8 overflow-hidden shadow-float group cursor-pointer">
              <div className={`aspect-[5/3] bg-gradient-to-br ${p.g} relative overflow-hidden`}>
                <motion.div whileHover={{ scale: 1.08 }} transition={{ duration: 0.6 }} className="absolute inset-0">
                  <FloatingSymbols count={5} />
                </motion.div>
                <span className="absolute top-4 left-4 px-3 py-1 rounded-full glass-dark border border-white/10 rounded-3xl p-8/90 text-xs font-semibold text-white">{p.c}</span>
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold text-white group-hover:text-indigo-600 transition">{p.t}</h3>
                <div className="mt-4 flex items-center justify-between text-xs text-white/60">
                  <span>{p.a} · {p.d}</span>
                  <span>{p.r} de lecture</span>
                </div>
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
function PricingSection() {
  const [yearly, setYearly] = useState(true);
  const plans = [
    { n: "Débutant", p: 0, py: 0, d: "Commencez à investir sans friction.", f: ["Portefeuille IA (basique)", "5 paniers crypto", "Application mobile + web", "Support communautaire"], cta: "Commencer gratuitement" },
    { n: "Croissance", p: 19, py: 15, d: "Pour les investisseurs sérieux à long terme.", f: ["Tout dans Débutant", "Rééquilibrage auto", "Rapports fiscaux", "Support prioritaire", "Copy trading"], cta: "Commencer Croissance", highlight: true },
    { n: "Institutionnel", p: 99, py: 79, d: "Multi-comptes, qualité garde institutionnelle.", f: ["Tout dans Croissance", "Portefeuilles multi-sig", "Accès API", "Gestionnaire dédié", "Rapports personnalisés"], cta: "Contacter les ventes" },
  ];
  return (
    <section id="pricing" className="relative py-24 px-4">
      <Reveal className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Tarification simple et honnête.</h2>
        <p className="mt-4 text-white/70">Pas de frais cachés. Annulez à tout moment.</p>
      </Reveal>
      <Reveal className="flex justify-center mb-10">
        <div className="glass-dark rounded-full p-1 flex items-center text-sm">
          <button onClick={()=>setYearly(false)} className={`px-5 py-2 rounded-full transition ${!yearly?"glass-dark border border-white/10 rounded-3xl p-8 text-white font-semibold":"text-white/80"}`}>Mensuel</button>
          <button onClick={()=>setYearly(true)} className={`px-5 py-2 rounded-full transition ${yearly?"glass-dark border border-white/10 rounded-3xl p-8 text-white font-semibold":"text-white/80"}`}>Annuel <span className="ml-1 text-emerald-500 text-xs">-20%</span></button>
        </div>
      </Reveal>
      <div className="mx-auto max-w-6xl grid md:grid-cols-3 gap-5">
        {plans.map((p, i) => (
          <Reveal key={p.n} delay={i * 0.1}>
            <motion.div whileHover={{ y: -6 }} className={`rounded-[28px] p-8 shadow-float relative ${p.highlight ? "bg-gradient-to-br from-indigo-600 to-teal-500 text-white" : "glass-dark border border-white/10 rounded-3xl p-8 text-white"}`}>
              {p.highlight && <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-slate-900 text-white text-[10px] font-bold tracking-wider uppercase">Le plus populaire</span>}
              <p className={`text-sm font-semibold ${p.highlight?"text-white/90":"text-indigo-600"}`}>{p.n}</p>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-5xl font-bold">${yearly ? p.py : p.p}</span>
                <span className={`text-sm ${p.highlight?"text-white/80":"text-white/60"}`}>/mois</span>
              </div>
              <p className={`mt-2 text-sm ${p.highlight?"text-white/80":"text-white/75"}`}>{p.d}</p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {p.f.map(ff => (
                  <li key={ff} className="flex items-start gap-2">
                    <span className={`mt-0.5 h-4 w-4 rounded-full flex items-center justify-center text-[10px] ${p.highlight?"glass-dark border border-white/10 rounded-3xl p-8/20 text-white":"bg-teal-100 text-teal-700"}`}>✔</span>
                    <span className={p.highlight?"text-white/90":"text-white/80"}>{ff}</span>
                  </li>
                ))}
              </ul>
              <button className={`mt-7 w-full py-3 rounded-full font-semibold text-sm ${p.highlight?"glass-dark border border-white/10 rounded-3xl p-8 text-indigo-700":"bg-slate-900 text-white"}`}>{p.cta}</button>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
function FAQSection() {
  const faqs = [
    { q: "Ma crypto est-elle vraiment en sécurité avec Maison Bloc ?", a: "Oui. Les actifs sont conservés dans un stockage à froid ségrégué avec signature multi-sig, audités mensuellement et assurés par un souscripteur de premier plan." },
    { q: "Comment fonctionne réellement le rééquilibrage de l'IA ?", a: "Nos modèles évaluent la volatilité, la corrélation et les signaux macro quotidiennement, puis proposent des ajustements que vous pouvez approuver manuellement ou automatiser entièrement." },
    { q: "Quels sont les frais ?", a: "Le plan Débutant est gratuit. Les plans Croissance et Institutionnel incluent tous les frais de trading, de rééquilibrage et de rapport — pas de spreads cachés." },
    { q: "Puis-je retirer à tout moment ?", a: "Toujours. Les retraits sont traités en quelques minutes vers votre banque ou votre portefeuille." },
    { q: "Quels actifs prenez-vous en charge ?", a: "Plus de 220 crypto-actifs vérifiés sur L1, L2 et des paniers thématiques organisés." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="relative py-24 px-4">
      <Reveal className="text-center max-w-2xl mx-auto mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">Vos questions, nos réponses.</h2>
      </Reveal>
      <div className="mx-auto max-w-3xl space-y-3">
        {faqs.map((f, i) => (
          <Reveal key={f.q} delay={i * 0.05}>
            <div className="glass-dark rounded-2xl overflow-hidden">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between gap-4 p-5 text-left text-white">
                <span className="font-semibold">{f.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-2xl leading-none text-teal-300">+</motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeOut" }} className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm text-white/75">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- FINAL CTA ---------------- */
function FinalCTA() {
  return (
    <section className="relative py-32 px-4">
      <FloatingSymbols count={12} dark />
      <div className="relative mx-auto max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.02]">
            Prêt à <span className="text-gradient">créer de la richesse ?</span>
          </h2>
          <p className="mt-5 text-lg text-white/75 max-w-md">Rejoignez plus de 240 000 investisseurs qui capitalisent avec Maison Bloc. Votre premier portefeuille prend 60 secondes.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button className="px-8 py-4 rounded-full glass-dark border border-white/10 rounded-3xl p-8 text-white font-semibold shadow-float hover:-translate-y-1 transition">
              Commencer à Investir Maintenant →
            </button>
            <button className="px-8 py-4 rounded-full glass-dark text-white font-semibold hover:-translate-y-1 transition">Réserver une démo</button>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="relative">
            <motion.div className="absolute -top-10 -left-6 z-10" animate={{ y: [0, -16, 0] }} transition={{ duration: 5, repeat: Infinity }}>
              <CoinBTC className="h-20 w-20 drop-shadow-2xl" />
            </motion.div>
            <motion.div className="absolute -bottom-10 -right-6 z-10" animate={{ y: [0, -14, 0] }} transition={{ duration: 6, repeat: Infinity, delay: 0.5 }}>
              <CoinETH className="h-20 w-20 drop-shadow-2xl" />
            </motion.div>
            <div className="glass-dark rounded-[28px] p-3 shadow-float">
              <div className="rounded-[20px] bg-slate-950/70 p-6 text-white">
                <p className="text-xs text-white/60">Aujourd'hui</p>
                <p className="text-3xl font-bold mt-1">$ 248,930.42</p>
                <p className="text-xs text-emerald-300 mt-0.5">+ $4,128.18 (1.68%)</p>
                <svg viewBox="0 0 320 100" className="mt-4 w-full">
                  <motion.path initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.8 }}
                    d="M0,80 C40,70 80,60 120,55 C160,50 200,30 240,28 C280,26 300,12 320,8"
                    stroke="#4FD1C5" strokeWidth="3" fill="none" strokeLinecap="round" />
                </svg>
                <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                  {[{l:"BTC",v:"45%"},{l:"ETH",v:"30%"},{l:"SOL",v:"15%"}].map(x=>(
                    <div key={x.l} className="rounded-xl glass-dark border border-white/10 rounded-3xl p-8/5 p-2"><p className="text-white/60 text-[10px]">{x.l}</p><p className="font-bold">{x.v}</p></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}


/* ---------------- CONTACT FORM ---------------- */

function ContactFormSection() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [countryCode, setCountryCode] = useState('CH');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const cleanNum = phone.replace(/[\s-]/g, "");
    if (!cleanNum) {
      setError("Veuillez entrer un numéro de téléphone");
      setLoading(false);
      return;
    }
    
    const countryInfo = COUNTRY_PHONE_PATTERNS[countryCode];
    if (countryInfo && !countryInfo.pattern.test(cleanNum)) {
      setError(`Veuillez entrer un numéro valide pour ce pays (ex: ${countryInfo.example})`);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name, email, phone: cleanNum, countryCode, description: "Maison Bloc" })
      });
      const data = await res.json();
      if (!res.ok && !data.success) throw new Error(data.error || 'Failed to submit enquiry');
      
      setSuccess(true);
      trackMetaEvent("Lead", {
        content_name: "Contact Form Home",
        email: email,
        phone: cleanNum,
      });
      trackMetaEvent("Contact");
      setName(''); setEmail(''); setPhone(''); setMessage('');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="relative py-24 px-4 bg-[#0B1437]">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-white">Contactez-nous</h2>
        <p className="mt-4 text-white/70">Des questions ? Nous serions ravis d'avoir de vos nouvelles.</p>
        
        {success ? (
          <div className="mt-8 p-6 bg-teal-500/10 border border-teal-500/50 rounded-2xl text-teal-400">
            <h3 className="text-xl font-bold mb-2">Merci !</h3>
            <p>Votre demande a été reçue avec succès.</p>
          </div>
        ) : (
          <form className="mt-8 space-y-4 text-left" onSubmit={handleSubmit}>
            {error && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>}
            
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Nom</label>
              <input required value={name} onChange={e=>setName(e.target.value)} type="text" className="block w-full rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:border-teal-400 sm:text-sm p-3 transition" placeholder="Jean Dupont" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Email</label>
              <input required value={email} onChange={e=>setEmail(e.target.value)} type="email" className="block w-full rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:border-teal-400 sm:text-sm p-3 transition" placeholder="jean@exemple.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Numéro de Téléphone</label>
              <div className="flex flex-col sm:flex-row gap-2 w-full relative z-10">
                <CountrySelect value={countryCode} onChange={setCountryCode} />
                <input required value={phone} onChange={e=>setPhone(e.target.value)} type="tel" className="block flex-1 rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:border-teal-400 sm:text-sm p-3 transition" placeholder={COUNTRY_PHONE_PATTERNS[countryCode]?.example || "+1 (555) 000-0000"} />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-white/80 mb-1">Message (Optionnel)</label>
              <textarea value={message} onChange={e=>setMessage(e.target.value)} rows={4} className="block w-full rounded-lg border border-white/20 bg-white/10 text-white focus:outline-none focus:border-teal-400 sm:text-sm p-3 transition" placeholder="Comment pouvons-nous vous aider ?"></textarea>
            </div>
            <button disabled={loading} type="submit" className="w-full bg-teal-400 text-slate-900 py-3.5 px-4 rounded-full font-bold shadow-[0_0_15px_rgba(79,209,197,0.3)] hover:shadow-[0_0_30px_rgba(79,209,197,0.5)] hover:bg-teal-300 hover:scale-[1.02] active:scale-95 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Envoi en cours...' : 'Envoyer le Message'}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
/* ---------------- FOOTER ---------------- */
function Footer() {
  const cols = [
    { h: "Plateforme", l: ["Tableau de Bord", "Assistant IA", "Rééquilibrage Auto", "Rapports Fiscaux"] },
    { h: "Investir", l: ["Fonds Indiciels Crypto", "Copy Trading", "Staking", "DeFi"] },
    { h: "Ressources", l: ["Recherche", "Blog", "Centre d'Aide", "Docs API"] },
    { h: "Entreprise", l: ["À propos", "Carrières", "Presse", "Contact"] },
  ];
  return (
    <footer id="company" className="relative pt-24 pb-10 px-4 bg-[#0A0F2C] text-white/80">
      <div className="mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4">
            <Logo className="[&_span]:text-white" />
            <p className="mt-5 text-sm text-white/60 max-w-xs">La façon la plus calme de développer une richesse crypto à long terme.</p>
            <form className="mt-6 flex max-w-sm">
              <input type="email" placeholder="vous@exemple.com" className="flex-1 px-4 py-3 rounded-l-full glass-dark border border-white/10 rounded-3xl p-8/5 border border-white/10 text-sm placeholder:text-white/40 focus:outline-none focus:border-teal-400" />
              <button className="px-5 py-3 rounded-r-full bg-gradient-to-br from-teal-400 to-indigo-500 text-white text-sm font-semibold">S'abonner</button>
            </form>
            <div className="mt-6 flex gap-2">
              {["Ã°Ââ€¢Â","in","gh","yt"].map(s=>(
                <a key={s} className="h-9 w-9 rounded-full glass-dark border border-white/10 rounded-3xl p-8/5 border border-white/10 flex items-center justify-center text-sm hover:glass-dark border border-white/10 rounded-3xl p-8/10 transition">{s}</a>
              ))}
            </div>
          </div>
          {cols.map(c=>(
            <div key={c.h} className="lg:col-span-2">
              <p className="text-sm font-semibold text-white mb-4">{c.h}</p>
              <ul className="space-y-2.5 text-sm text-white/60">
                {c.l.map(li=><li key={li}><a className="hover:text-white transition" href={`#${li.toLowerCase().replace(/\s+/g, '-')}`}>{li}</a></li>)}
              </ul>
            </div>
          ))}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">Légal</h4>
            <div className="flex flex-col gap-2">
              <a href="/privacy" className="text-sm hover:text-white transition">Politique de Confidentialité</a>
              <a href="/terms" className="text-sm hover:text-white transition">Termes et Conditions</a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Maison Bloc. Tous droits réservés.</p>
          <div className="flex flex-wrap gap-5">
            <a href="/privacy" className="hover:text-white">Confidentialité</a>
            <a href="/terms" className="hover:text-white">Termes</a>
            <a href="#" className="hover:text-white">Cookies</a>
            <a href="#" className="hover:text-white">Avis de Risque</a>
          </div>
        </div>
      </div>
    </footer>
  );
}


