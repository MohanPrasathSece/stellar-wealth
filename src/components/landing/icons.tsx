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
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="relative flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-7 h-7"
        >
          <polygon points="12 3 20 7.5 12 12 4 7.5" className="fill-teal-500/20 stroke-teal-400" />
          <polygon points="4 7.5 12 12 12 21 4 16.5" className="stroke-slate-400" />
          <polygon points="20 7.5 12 12 12 21 20 16.5" className="stroke-slate-300" />
        </svg>
      </div>
      <span className="text-xl font-semibold tracking-tight text-foreground">
        Maison Bloc<span className="text-teal-400 font-bold">.</span>
      </span>
    </div>
  );
}
