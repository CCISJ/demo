'use client';

import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  trend?: { value: string; up: boolean };
  tone?: 'brand' | 'gold' | 'jad' | 'rust' | 'sol' | 'slate';
  hint?: string;
}

const toneStyles: Record<string, { bg: string; text: string; ring: string }> = {
  brand: { bg: 'bg-brand-50', text: 'text-brand-600', ring: 'ring-brand-100' },
  gold: { bg: 'bg-gold-50', text: 'text-gold-600', ring: 'ring-gold-200' },
  jad: { bg: 'bg-jad-50', text: 'text-jad-600', ring: 'ring-jad-200' },
  rust: { bg: 'bg-rust-50', text: 'text-rust-600', ring: 'ring-rust-200' },
  sol: { bg: 'bg-sol-50', text: 'text-sol-600', ring: 'ring-sol-200' },
  slate: { bg: 'bg-slate-100', text: 'text-slate-500', ring: 'ring-slate-200' },
};

export default function StatCard({ label, value, icon: Icon, trend, tone = 'brand', hint }: StatCardProps) {
  const s = toneStyles[tone];
  return (
    <div className="surface surface-hover p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-1.5 text-2xl font-bold tracking-tight text-brand-900">{value}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${s.bg} ${s.text} ring-1 ${s.ring}`}>
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
      </div>
      {(trend || hint) && (
        <div className="mt-3 flex items-center gap-2 text-xs">
          {trend && (
            <span className={`inline-flex items-center gap-1 font-semibold ${trend.up ? 'text-jad-600' : 'text-rust-600'}`}>
              {trend.up ? '▲' : '▼'} {trend.value}
            </span>
          )}
          {hint && <span className="text-slate-400">{hint}</span>}
        </div>
      )}
    </div>
  );
}
