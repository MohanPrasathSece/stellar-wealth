import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const COUNTRY_PHONE_PATTERNS: Record<string, { code: string, pattern: RegExp, example: string }> = {
  "CH": { code: "41", pattern: /^[1-9]\d{8}$/, example: "79 123 45 67" },
  "FR": { code: "33", pattern: /^[1-9]\d{8}$/, example: "6 12 34 56 78" },
  "BE": { code: "32", pattern: /^[4][0-9]{8}$/, example: "470 12 34 56" },
  "CA": { code: "1", pattern: /^[2-9]\d{9}$/, example: "416 123 4567" },
  "US": { code: "1", pattern: /^[2-9]\d{9}$/, example: "212 123 4567" },
  "GB": { code: "44", pattern: /^7\d{9}$/, example: "7700 900000" },
  "DE": { code: "49", pattern: /^1[5-7]\d{8,9}$/, example: "151 12345678" },
  "ES": { code: "34", pattern: /^[67]\d{8}$/, example: "612 345 678" },
  "IT": { code: "39", pattern: /^3\d{8,9}$/, example: "312 345 6789" },
  "NL": { code: "31", pattern: /^6\d{8}$/, example: "6 12345678" },
  "SE": { code: "46", pattern: /^7[0236]\d{7}$/, example: "70 123 45 67" },
  "AU": { code: "61", pattern: /^4\d{8}$/, example: "412 345 678" },
  "IN": { code: "91", pattern: /^[6-9]\d{9}$/, example: "91234 56789" },
  "AE": { code: "971", pattern: /^5[024568]\d{7}$/, example: "50 123 4567" },
  "SG": { code: "65", pattern: /^[89]\d{7}$/, example: "8123 4567" },
  "ZA": { code: "27", pattern: /^6[0-5]\d{7}$/, example: "60 123 4567" },
  "BR": { code: "55", pattern: /^[1-9]{2}9\d{8}$/, example: "11 91234 5678" },
  "MX": { code: "52", pattern: /^1\d{10}$/, example: "1 55 1234 5678" },
  "JP": { code: "81", pattern: /^[789]0\d{8}$/, example: "90 1234 5678" },
  "CY": { code: "357", pattern: /^9[0-9]{7}$/, example: "99 123456" }
};

export function CountrySelect({ value, onChange }: { value: string, onChange: (val: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative min-w-[105px] sm:w-[110px]" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-white/5 border border-white/10 rounded-lg p-3 text-white focus:outline-none focus:border-teal-400 transition"
      >
        <span>{value} +{COUNTRY_PHONE_PATTERNS[value]?.code}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`transition-transform ${open ? 'rotate-180' : ''}`}>
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-[calc(100%+8px)] left-0 w-[240px] max-h-60 overflow-y-auto bg-[#0F1A42] border border-white/10 rounded-lg z-[100] shadow-2xl p-1 custom-scrollbar"
          >
            {Object.entries(COUNTRY_PHONE_PATTERNS).map(([code, info]) => (
              <button
                key={code}
                type="button"
                onClick={() => { onChange(code); setOpen(false); }}
                className={`w-full text-left px-4 py-2 text-sm rounded-md transition ${value === code ? 'bg-teal-500/20 text-teal-400' : 'text-white/80 hover:bg-white/10'}`}
              >
                {code} <span className="opacity-60 ml-2">+{info.code}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
