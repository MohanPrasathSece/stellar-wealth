import type { SVGProps } from "react";

export function CoinBTC(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" {...props}>
      <defs>
        <radialGradient id="btc-g" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#FFE39A" />
          <stop offset="55%" stopColor="#F7A623" />
          <stop offset="100%" stopColor="#A8580B" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="36" fill="url(#btc-g)" />
      <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(255,255,255,0.4)" />
      <text x="40" y="52" textAnchor="middle" fontSize="40" fontWeight="800" fill="#fff" fontFamily="Inter">₿</text>
    </svg>
  );
}
export function CoinETH(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" {...props}>
      <defs>
        <radialGradient id="eth-g" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#C7D6FF" />
          <stop offset="55%" stopColor="#627EEA" />
          <stop offset="100%" stopColor="#1F2A6B" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="36" fill="url(#eth-g)" />
      <path d="M40 14 L56 42 L40 50 L24 42 Z" fill="rgba(255,255,255,0.95)" />
      <path d="M40 54 L56 46 L40 66 L24 46 Z" fill="rgba(255,255,255,0.75)" />
    </svg>
  );
}
export function CoinSOL(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" {...props}>
      <defs>
        <radialGradient id="sol-g" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#E2C6FF" />
          <stop offset="55%" stopColor="#9945FF" />
          <stop offset="100%" stopColor="#19FB9B" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="36" fill="url(#sol-g)" />
      <g fill="#fff">
        <path d="M24 30 L52 30 L56 26 L28 26 Z" />
        <path d="M24 42 L52 42 L56 38 L28 38 Z" />
        <path d="M24 54 L52 54 L56 50 L28 50 Z" />
      </g>
    </svg>
  );
}
export function CoinXRP(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" {...props}>
      <defs>
        <radialGradient id="xrp-g" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#9BD7FF" />
          <stop offset="55%" stopColor="#0A84FF" />
          <stop offset="100%" stopColor="#04305C" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="36" fill="url(#xrp-g)" />
      <text x="40" y="52" textAnchor="middle" fontSize="32" fontWeight="800" fill="#fff" fontFamily="Inter">✕</text>
    </svg>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 via-indigo-500 to-purple-600 shadow-[0_0_15px_rgba(79,209,197,0.4)]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-white drop-shadow-md"
        >
          <path d="M12 2L5 11l7 11 7-11-7-9z" fill="currentColor" fillOpacity="0.3" />
          <path d="M12 2v20" />
          <path d="M5 11l7-4 7 4-7 4-7-4z" />
        </svg>
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground">
        Stellar Wealth<span className="text-teal-500">.</span>
      </span>
    </div>
  );
}
