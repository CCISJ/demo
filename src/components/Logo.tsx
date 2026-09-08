'use client';

interface LogoProps {
  size?: number;
  withWordmark?: boolean;
  className?: string;
  variant?: 'light' | 'dark';
}

// Official mark for the Centro Comercial e Industrial de San José (CCISJ).
// On light surfaces we use the full-color horizontal lockup (icon + name);
// on dark surfaces (e.g. the Login hero panel) the green wordmark loses
// contrast, so we fall back to the circular badge plus a light-colored
// generated wordmark instead.
export default function Logo({ size = 40, withWordmark = false, className = '', variant = 'dark' }: LogoProps) {
  const wordColor = variant === 'light' ? 'text-white' : 'text-brand-900';
  const subColor = variant === 'light' ? 'text-brand-100' : 'text-ink-mute';

  if (withWordmark && variant === 'dark') {
    return (
      <div className={`flex items-center ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/logo-horizontal.png"
          alt="Centro Comercial e Industrial de San José"
          style={{ height: size, width: 'auto' }}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo/logo-icon.png"
        alt="CCISJ"
        width={size}
        height={size}
        style={{ height: size, width: size }}
        className="shrink-0 object-contain"
      />
      {withWordmark && (
        <div className="leading-tight">
          <p className={`text-base font-extrabold tracking-tight ${wordColor}`}>CCISJ</p>
          <p className={`text-[11px] font-medium ${subColor}`}>Centro Comercial e Industrial de San José</p>
        </div>
      )}
    </div>
  );
}
