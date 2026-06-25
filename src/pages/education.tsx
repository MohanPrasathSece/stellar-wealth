import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SmoothScroll } from '@/components/landing/smooth-scroll';
import { MouseGlow } from '@/components/landing/mouse-glow';
import { Logo } from '@/components/landing/icons';

// Animated Candlestick Component
function AnimatedCandlesticks() {
  const [candles, setCandles] = useState(Array.from({ length: 20 }, () => Math.random() * 100));

  useEffect(() => {
    const interval = setInterval(() => {
      setCandles(prev => {
        const next = [...prev.slice(1), Math.random() * 100];
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-48 w-full flex items-end gap-2 p-4 border-b border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-teal-400/5 to-transparent pointer-events-none" />
      {candles.map((val, i) => {
        const isUp = val > 50;
        const h = Math.max(10, val);
        return (
          <motion.div 
            key={i}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: `${h}%`, opacity: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={`flex-1 rounded-t-sm w-full relative ${isUp ? 'bg-teal-400' : 'bg-red-400'}`}
          >
            <motion.div 
              animate={{ height: `${Math.random() * 40 + 20}%` }}
              className={`absolute top-0 left-1/2 -translate-x-1/2 w-0.5 -translate-y-full ${isUp ? 'bg-teal-400' : 'bg-red-400'}`}
            />
            <motion.div 
              animate={{ height: `${Math.random() * 40 + 20}%` }}
              className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0.5 translate-y-full ${isUp ? 'bg-teal-400' : 'bg-red-400'}`}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

export default function EducationPage() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate CRM submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#0B1437] text-white overflow-x-clip pt-8 pb-32">
        <MouseGlow />
        
        {/* Simple Nav for Logged In */}
        <nav className="fixed top-0 inset-x-0 z-50 p-4 border-b border-white/5 bg-[#0B1437]/80 backdrop-blur-md flex justify-between items-center px-8">
          <div className="flex items-center gap-2"><Logo /><span className="font-bold text-xl tracking-tight">Nimbus</span></div>
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium text-white/60 hidden sm:block">Welcome, Member</span>
            <button onClick={() => { localStorage.removeItem('sessionToken'); window.location.href = '/'; }} className="text-sm font-bold text-teal-400 hover:text-teal-300 transition">Sign Out</button>
          </div>
        </nav>

        <div className="max-w-6xl mx-auto px-4 mt-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Crypto Education Hub
            </h1>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">Master the digital asset ecosystem with premium insights and educational resources.</p>
          </motion.div>

          {/* Mac-style Browser Window */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="rounded-2xl glass-dark border border-white/10 overflow-hidden shadow-[0_0_50px_rgba(79,209,197,0.1)] mb-24"
          >
            {/* Header */}
            <div className="flex items-center gap-2 p-4 border-b border-white/10 bg-white/5">
              <div className="flex gap-2 mr-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex gap-2">
                {['Overview', 'Market Analysis', 'Risk Management'].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-1.5 rounded-md text-xs font-semibold transition ${activeTab === tab ? 'bg-white/10 text-white' : 'text-white/50 hover:text-white/80 hover:bg-white/5'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Content Area */}
            <div className="p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
                >
                  {activeTab === 'Overview' && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {['Introduction to Cryptocurrency', 'Understanding Blockchain', 'Digital Asset Investing', 'Crypto Trading Basics', 'AI & Market Analysis', 'Portfolio Diversification'].map((topic, i) => (
                        <motion.div 
                          key={topic} 
                          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                          className="glass border border-white/10 rounded-2xl p-6 hover:border-teal-400/50 hover:bg-white/10 transition-all cursor-pointer group hover:-translate-y-1 hover:shadow-lg"
                        >
                          <div className="h-32 rounded-xl bg-gradient-to-br from-white/5 to-white/10 mb-6 flex items-center justify-center border border-white/5 overflow-hidden relative">
                             <div className="absolute inset-0 bg-teal-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-teal-400" strokeWidth="1.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
                          </div>
                          <h3 className="text-lg font-bold mb-2">{topic}</h3>
                          <p className="text-white/60 text-sm">Deep dive into {topic.toLowerCase()} and understand the fundamentals.</p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {activeTab === 'Market Analysis' && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-2xl font-bold mb-2">Live Market Trends</h3>
                        <p className="text-white/60">Real-time simulation of market volatility and trend lines.</p>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                        <AnimatedCandlesticks />
                      </div>
                    </div>
                  )}
                  {activeTab === 'Risk Management' && (
                    <div className="flex items-center justify-center h-64 text-white/50 text-center">
                      <p>Advanced security modules and portfolio hedging strategies<br/>will be unlocked shortly.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Contact Form Section */}
          <motion.section 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="max-w-xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-4">Request VIP Consultation</h2>
            <p className="text-white/60 mb-8">Need personalized guidance? Our experts are here to help.</p>

            {success ? (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-8 glass border border-teal-400/30 rounded-2xl text-teal-400">
                <svg className="w-12 h-12 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                <h3 className="text-xl font-bold mb-2">Thank you!</h3>
                <p>Your enquiry has been received successfully.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4 text-left glass-dark border border-white/10 p-8 rounded-3xl">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-teal-400 transition" placeholder="John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Email</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-teal-400 transition" placeholder="john@example.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Phone Number</label>
                  <input required type="tel" className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-teal-400 transition" placeholder="+1 555 000 0000" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-1">Message (Optional)</label>
                  <textarea rows={3} className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-teal-400 transition" placeholder="How can we help?"></textarea>
                </div>
                <button disabled={loading} type="submit" className="w-full mt-4 bg-teal-400 text-slate-900 py-3.5 px-4 rounded-full font-bold shadow-[0_0_15px_rgba(79,209,197,0.3)] hover:shadow-[0_0_30px_rgba(79,209,197,0.5)] hover:bg-teal-300 transition-all duration-300 disabled:opacity-50">
                  {loading ? 'Submitting...' : 'Submit Enquiry'}
                </button>
              </form>
            )}
          </motion.section>

        </div>
      </div>
    </SmoothScroll>
  );
}
