'use client';

interface LogoProps {
  size?: number;
  withWordmark?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

// Institutional mark for CCISJ — a stylized "C" formed by two arcs suggesting
// commerce (ascending bars) within a shield-like rounded square.
export default function Logo({ size = 40, withWordmark = false, className = '', variant = 'dark' }: LogoProps) {
  const wordColor = variant === 'light' ? 'text-white' : 'text-brand-900';
  const subColor = variant === 'light' ? 'text-brand-200' : 'text-slate-500';
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
        <rect width="48" height="48" rx="12" fill="#1d3559" />
        <rect width="48" height="48" rx="12" fill="url(#ccisj-g)" fillOpacity="0.18" />
        <path d="M33 16.5C30.6 13.9 27.5 12.5 24 12.5C18.7 12.5 14.3 16 12.8 20.8" stroke="#d6a63f" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M15 31.5C17.4 34.1 20.5 35.5 24 35.5C29.3 35.5 33.7 32 35.2 27.2" stroke="#d6a63f" strokeWidth="2.4" strokeLinecap="round" />
        <rect x="16.5" y="21.5" width="3.4" height="6" rx="1" fill="#ffffff" />
        <rect x="22.3" y="18.5" width="3.4" height="9" rx="1" fill="#ffffff" />
        <rect x="28.1" y="23.5" width="3.4" height="4" rx="1" fill="#ffffff" />
        <defs>
          <linearGradient id="ccisj-g" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
            <stop stopColor="#3464a6" />
            <stop offset="1" stopColor="#111e31" />
          </linearGradient>
        </defs>
      </svg>
      {withWordmark && (
        <div className="leading-tight">
          <p className={`text-base font-extrabold tracking-tight ${wordColor}`}>CCISJ</p>
          <p className={`text-[11px] font-medium ${subColor}`}>Centro Comercial e Industrial de San José</p>
        </div>
      )}
    </div>
  );
}
