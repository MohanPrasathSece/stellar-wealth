import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ParticleField, GridLines, DriftingOrbs, NoiseOverlay } from "@/components/landing/floating";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/landing/reveal";

export default function Dashboard() {
  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden font-body">
      {/* Background Effects */}
      <ParticleField count={80} />
      <GridLines />
      <DriftingOrbs />
      <NoiseOverlay />

      {/* Top Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 glass-dark border-b border-white/5 flex items-center justify-between">
        <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 shadow-[0_0_15px_rgba(79,209,197,0.3)]" />
          <span className="font-display font-bold text-xl tracking-tight">Maison Bloc<span className="text-teal-400">.</span></span>
        </a>
        <div className="flex items-center gap-4">
          <a href="/" className="text-sm font-semibold text-white/70 hover:text-white transition-colors flex items-center gap-2">
            <span>Se déconnecter</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
          </a>
          <div className="h-8 w-8 rounded-full border border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-colors">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="Avatar" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pt-28 pb-20 px-6 max-w-7xl mx-auto space-y-8">
        
        {/* Section 1: Live Trading & Candles */}
        <section>
          <Reveal>
            <h2 className="text-2xl font-bold mb-4 font-display flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Trading en Direct & Activité
            </h2>
          </Reveal>
          <div className="glass-card rounded-3xl p-6 h-[340px] flex flex-col relative overflow-hidden">
            {/* Chart Grid */}
            <div className="absolute inset-0 pointer-events-none grid grid-cols-6 grid-rows-4 opacity-[0.03]">
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="border-r border-b border-white" />
              ))}
            </div>
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <p className="text-sm text-white/50">BTC/USD</p>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-200 to-teal-500">$94,281.00</h3>
                  <span className="text-emerald-400 text-sm font-semibold">+2.4%</span>
                </div>
              </div>
              <div className="flex gap-2">
                {['1H','4H','1J','1S'].map(t => <button key={t} className="px-3 py-1 rounded-full text-xs font-semibold glass hover:bg-white/10 transition">{t}</button>)}
              </div>
            </div>

            {/* Candlestick Animation Container */}
            <div className="flex-1 w-full flex items-end justify-between px-2 gap-1 relative z-10">
              <CandleChart />
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Section 2: AI Portfolio Activity */}
          <section>
            <Reveal delay={0.1}>
              <h2 className="text-2xl font-bold mb-4 font-display">Flux d'Analyses IA</h2>
            </Reveal>
            <StaggerContainer className="space-y-4">
              <AIFeedItem 
                title="Rééquilibrage Exécuté" 
                desc="Vente de 2.4% de BTC pour acheter du SOL suite à une cassure de volume." 
                time="Il y a 2 min" 
                color="from-teal-400 to-orange-500" 
              />
              <AIFeedItem 
                title="Alerte de Risque" 
                desc="Forte volatilité détectée sur les options ETH. Couverture active." 
                time="Il y a 15 min" 
                color="from-indigo-400 to-indigo-600" 
              />
              <AIFeedItem 
                title="Rendement Optimisé" 
                desc="Actifs stakés transférés vers un validateur à meilleur APY (8.4%)." 
                time="Il y a 1 h" 
                color="from-emerald-400 to-emerald-600" 
              />
            </StaggerContainer>
          </section>

          {/* Section 3: Asset Allocation */}
          <section>
            <Reveal delay={0.2}>
              <h2 className="text-2xl font-bold mb-4 font-display">Allocation Actuelle</h2>
            </Reveal>
            <StaggerContainer className="grid grid-cols-2 gap-4">
              <AssetCard name="Bitcoin" symbol="BTC" amount="$45,210.00" percent="48%" color="bg-teal-500" />
              <AssetCard name="Ethereum" symbol="ETH" amount="$28,400.00" percent="30%" color="bg-indigo-500" />
              <AssetCard name="Solana" symbol="SOL" amount="$14,180.00" percent="15%" color="bg-emerald-500" />
              <AssetCard name="USDC Cash" symbol="USDC" amount="$6,500.00" percent="7%" color="bg-blue-500" />
            </StaggerContainer>
          </section>
        </div>

        {/* Section 4: Performance History */}
        <section>
          <Reveal>
            <h2 className="text-2xl font-bold mb-4 font-display">Historique des Performances</h2>
          </Reveal>
          <div className="glass-card rounded-3xl p-6 h-[250px] relative flex flex-col justify-between overflow-hidden">
            <div className="absolute inset-0 pointer-events-none grid grid-cols-12 opacity-[0.02]">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="border-r border-white" />
              ))}
            </div>
            <div className="relative z-10 flex justify-between items-end h-full px-2 gap-2">
              {Array.from({ length: 12 }).map((_, i) => {
                const height = 30 + Math.random() * 70;
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${height}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className="w-full max-w-[40px] bg-gradient-to-t from-indigo-500/20 to-teal-400/80 rounded-t-sm"
                  />
                );
              })}
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Section 5: Trading Bot Status */}
          <section>
            <Reveal delay={0.1}>
              <h2 className="text-2xl font-bold mb-4 font-display">Statut du Bot de Trading</h2>
            </Reveal>
            <div className="glass-card rounded-3xl p-6 relative overflow-hidden h-full flex flex-col items-center justify-center">
               <div className="relative h-24 w-24 rounded-full bg-gradient-to-br from-teal-400/20 to-indigo-500/20 flex items-center justify-center mb-4">
                 <div className="h-16 w-16 rounded-full bg-gradient-to-br from-teal-400 to-indigo-500 animate-pulse-ring flex items-center justify-center text-2xl">🤖</div>
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Actif & En Surveillance</h3>
               <p className="text-sm text-white/60 text-center max-w-xs">L'IA Maison Bloc analyse actuellement 42 flux de données pour des opportunités de marché.</p>
               <div className="mt-8 flex gap-4 text-sm w-full border-t border-white/10 pt-6">
                 <div className="flex-1 text-center">
                   <p className="text-white/50 mb-1">Disponibilité</p>
                   <p className="font-bold text-emerald-400 text-lg">99.9%</p>
                 </div>
                 <div className="flex-1 text-center border-l border-white/10">
                   <p className="text-white/50 mb-1">Transactions du Jour</p>
                   <p className="font-bold text-teal-400 text-lg">24</p>
                 </div>
               </div>
            </div>
          </section>

          {/* Section 6: Bot Strategies */}
          <section>
            <Reveal delay={0.2}>
              <h2 className="text-2xl font-bold mb-4 font-display">Stratégies Actives</h2>
            </Reveal>
            <StaggerContainer className="space-y-4">
              <StrategyItem name="Momentum Scalping" active={true} risk="Medium" color="teal" />
              <StrategyItem name="Mean Reversion" active={true} risk="Low" color="indigo" />
              <StrategyItem name="Delta Neutral Yield" active={false} risk="Low" color="slate" />
            </StaggerContainer>
          </section>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Section 7: Recent Transactions */}
          <section>
            <Reveal delay={0.1}>
              <h2 className="text-2xl font-bold mb-4 font-display">Transactions Récentes</h2>
            </Reveal>
            <StaggerContainer className="space-y-4">
              <TransactionItem type="Dépôt" amount="+$5,000.00" date="12 Oct, 2026" status="Terminé" />
              <TransactionItem type="Retrait" amount="-$1,200.00" date="08 Oct, 2026" status="Terminé" />
              <TransactionItem type="Dépôt" amount="+$2,500.00" date="01 Oct, 2026" status="Terminé" />
            </StaggerContainer>
          </section>

          {/* Section 8: Contact Support */}
          <section>
            <Reveal delay={0.2}>
              <h2 className="text-2xl font-bold mb-4 font-display">Contacter le Support</h2>
            </Reveal>
            <DashboardContactForm />
          </section>
        </div>
      </main>
    </div>
  );
}

/* --- Components --- */

function CandleChart() {
  const [candles, setCandles] = useState<number[]>([]);

  useEffect(() => {
    // Generate initial random candles
    const initial = Array.from({ length: 40 }, () => Math.random() * 100);
    setCandles(initial);

    // Live update simulation
    const interval = setInterval(() => {
      setCandles(prev => {
        const next = [...prev.slice(1), Math.random() * 100];
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {candles.map((val, i) => {
          const isUp = i === 0 ? true : val >= candles[i-1];
          const color = isUp ? "bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" : "bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)]";
          const height = Math.max(10, val);
          
          return (
            <motion.div 
              key={`${i}-${val}`}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.5 }}
              className="w-full flex justify-center items-center relative group"
              style={{ height: "100%" }}
            >
              {/* Wick */}
              <div className="absolute w-[1px] bg-white/20 h-full" />
              {/* Body */}
              <motion.div 
                className={`w-full max-w-[8px] rounded-sm relative z-10 ${color}`}
                style={{ height: `${height}%`, bottom: `${Math.random() * 20}%` }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </>
  );
}

function AIFeedItem({ title, desc, time, color }: { title: string, desc: string, time: string, color: string }) {
  return (
    <StaggerItem direction="up" className="glass-card rounded-2xl p-4 flex gap-4 items-start group hover:-translate-y-1 transition-transform">
      <div className={`mt-1 h-3 w-3 rounded-full bg-gradient-to-br ${color} animate-pulse-ring`} />
      <div className="flex-1">
        <div className="flex justify-between items-center mb-1">
          <h4 className="font-semibold text-white group-hover:text-teal-400 transition-colors">{title}</h4>
          <span className="text-[10px] text-white/40 uppercase tracking-wider">{time}</span>
        </div>
        <p className="text-sm text-white/60">{desc}</p>
      </div>
    </StaggerItem>
  );
}

function AssetCard({ name, symbol, amount, percent, color }: { name: string, symbol: string, amount: string, percent: string, color: string }) {
  return (
    <StaggerItem direction="scale" className="glass-card rounded-2xl p-5 relative overflow-hidden group cursor-pointer hover:border-teal-400/30 transition-colors">
      <div className={`absolute top-0 right-0 w-24 h-24 ${color} opacity-10 blur-3xl group-hover:opacity-20 transition-opacity`} />
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-white/50 mb-1">{name}</p>
          <p className="font-bold text-lg">{symbol}</p>
        </div>
        <div className={`h-8 w-8 rounded-full ${color} flex items-center justify-center font-bold text-xs bg-opacity-20 backdrop-blur-md border border-white/10`}>
          {symbol[0]}
        </div>
      </div>
      <div>
        <p className="font-display font-semibold text-xl mb-2">{amount}</p>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: percent }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className={`h-full ${color}`} 
          />
        </div>
        <p className="text-right text-[10px] mt-1 text-white/40">{percent} du portefeuille</p>
      </div>
    </StaggerItem>
  );
}

function TransactionItem({ type, amount, date, status }: { type: string, amount: string, date: string, status: string }) {
  const isDeposit = type === "Deposit";
  return (
    <StaggerItem direction="up" className="glass-card rounded-2xl p-4 flex items-center justify-between group hover:-translate-y-1 transition-transform">
      <div className="flex items-center gap-4">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center bg-opacity-20 ${isDeposit ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
          {isDeposit ? '↓' : '↑'}
        </div>
        <div>
          <h4 className="font-semibold text-white">{type}</h4>
          <p className="text-xs text-white/50">{date}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`font-bold ${isDeposit ? 'text-emerald-400' : 'text-white'}`}>{amount}</p>
        <p className="text-xs text-white/50">{status}</p>
      </div>
    </StaggerItem>
  );
}

function StrategyItem({ name, active, risk, color }: { name: string, active: boolean, risk: string, color: string }) {
  const bgColors: Record<string, string> = {
    teal: 'bg-teal-500/20 text-teal-400',
    indigo: 'bg-indigo-500/20 text-indigo-400',
    slate: 'bg-slate-500/20 text-slate-400'
  };
  
  return (
    <StaggerItem direction="up" className="glass-card rounded-2xl p-4 flex items-center justify-between group hover:-translate-y-1 transition-transform">
      <div className="flex items-center gap-4">
        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${bgColors[color] || 'bg-white/10'}`}>
          {active ? <span className="h-3 w-3 rounded-full bg-current animate-pulse" /> : <span className="h-3 w-3 rounded-full bg-current opacity-50" />}
        </div>
        <div>
          <h4 className="font-semibold text-white">{name}</h4>
          <p className="text-xs text-white/50">Risque : {risk}</p>
        </div>
      </div>
      <div className="text-right">
        <p className={`text-sm font-bold ${active ? 'text-teal-400' : 'text-white/40'}`}>{active ? 'Actif' : 'En Pause'}</p>
      </div>
    </StaggerItem>
  );
}

function DashboardContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/crm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ first_name: name, email, phone, description: message })
      });
      const data = await res.json();
      if (!res.ok && !data.success) throw new Error(data.error || 'Failed to submit enquiry');
      
      setSuccess(true);
      setName(''); setEmail(''); setPhone(''); setMessage('');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="glass-card rounded-3xl p-6 relative overflow-hidden h-full flex flex-col items-center justify-center text-center">
        <div className="h-16 w-16 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-2xl mb-4 animate-pulse-ring">✓</div>
        <h3 className="text-xl font-bold mb-2 text-white">Message Envoyé</h3>
        <p className="text-white/60">Notre équipe de support vous contactera sous peu.</p>
        <button onClick={() => setSuccess(false)} className="mt-6 px-6 py-2 rounded-full glass text-sm hover:bg-white/10 transition">Envoyer un autre</button>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-3xl p-6 relative overflow-hidden group hover:border-white/20 transition-colors">
      <form className="space-y-4" onSubmit={handleSubmit}>
        {error && <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">{error}</div>}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white/70 mb-1">Nom</label>
            <input required value={name} onChange={e=>setName(e.target.value)} type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-teal-400/50 transition-colors" placeholder="Jean Dupont" />
          </div>
          <div>
            <label className="block text-sm text-white/70 mb-1">Téléphone</label>
            <input required value={phone} onChange={e=>setPhone(e.target.value)} type="tel" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-teal-400/50 transition-colors" placeholder="+1..." />
          </div>
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1">Email</label>
          <input required value={email} onChange={e=>setEmail(e.target.value)} type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-teal-400/50 transition-colors" placeholder="jean@exemple.com" />
        </div>
        <div>
          <label className="block text-sm text-white/70 mb-1">Message</label>
          <textarea required value={message} onChange={e=>setMessage(e.target.value)} rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-teal-400/50 transition-colors resize-none" placeholder="Décrivez votre problème..."></textarea>
        </div>
        <button disabled={loading} type="submit" className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-400 to-indigo-500 text-white font-bold tracking-wide hover:opacity-90 transition-opacity disabled:opacity-50">
          {loading ? 'Envoi en cours...' : 'Envoyer le Message'}
        </button>
      </form>
    </div>
  );
}
