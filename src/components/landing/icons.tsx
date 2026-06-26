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
      <div className="relative h-10 w-10 flex items-center justify-center rounded-xl bg-gradient-to-br from-teal-400 via-sky-500 to-indigo-600 shadow-lg shadow-teal-500/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 text-white drop-shadow-md"
        >
          <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <span className="text-xl font-bold tracking-tight text-foreground">
        Stellar Wealth<span className="text-teal-500">.</span>
      </span>
    </div>
  );
}
