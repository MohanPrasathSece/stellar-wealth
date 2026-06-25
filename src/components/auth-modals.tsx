import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AuthModals({ 
  isOpen, 
  onClose, 
  initialMode = 'login' 
}: { 
  isOpen: boolean, 
  onClose: () => void, 
  initialMode?: 'login' | 'signup' 
}) {
  const [mode, setMode] = useState(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signup') {
        // 1. Submit to CRM
        const crmRes = await fetch('/api/crm', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ first_name: name, email, phone, description: 'Signup Request' })
        });
        
        const crmData = await crmRes.json();
        
        if (!crmRes.ok && !crmData.success) {
          throw new Error(crmData.error || 'Failed to submit to CRM');
        }

        // 2. Submit to Blob Auth (Signup)
        const authRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'signup', email, name, phone })
        });
        
        const authData = await authRes.json();
        if (!authRes.ok) throw new Error(authData.error || 'Signup failed');
        
        localStorage.setItem('sessionToken', authData.sessionId);
        window.location.href = '/education';

      } else {
        // Submit to Blob Auth (Login)
        const authRes = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'login', email })
        });
        
        const authData = await authRes.json();
        if (!authRes.ok) throw new Error(authData.error || 'Login failed');
        
        localStorage.setItem('sessionToken', authData.sessionId);
        window.location.href = '/education';
      }
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#0B1437] border border-white/10 rounded-2xl shadow-2xl p-8 mx-4 z-10"
          >
            <h2 className="text-2xl font-bold text-white mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-white/60 mb-6 text-sm">
              {mode === 'login' ? 'Sign in to access your educational resources.' : 'Start your crypto education journey today.'}
            </p>

            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {mode === 'signup' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      required 
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-teal-400 transition"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      required 
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-teal-400 transition"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                </>
              )}
              
              <div>
                <label className="block text-sm font-medium text-white/80 mb-1">Email Address</label>
                <input 
                  type="email" 
                  required 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-teal-400 transition"
                  placeholder="john@example.com"
                />
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-teal-400 text-slate-900 py-3.5 px-4 rounded-full font-bold shadow-[0_0_15px_rgba(79,209,197,0.3)] hover:shadow-[0_0_30px_rgba(79,209,197,0.5)] hover:bg-teal-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                {loading ? 'Processing...' : mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-6 text-center text-sm text-white/60">
              {mode === 'login' ? (
                <>Don't have an account? <button onClick={() => setMode('signup')} className="text-teal-400 hover:underline">Sign up</button></>
              ) : (
                <>Already have an account? <button onClick={() => setMode('login')} className="text-teal-400 hover:underline">Sign in</button></>
              )}
            </div>
            
            <button onClick={onClose} className="absolute top-4 right-4 text-white/40 hover:text-white transition">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
