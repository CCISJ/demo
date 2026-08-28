'use client';

import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  tone?: 'brand' | 'gold' | 'jad' | 'rust' | 'sol' | 'slate';
  variant?: 'soft' | 'solid' | 'outline';
  className?: string;
}

const toneMap: Record<string, { soft: string; solid: string; outline: string }> = {
  brand: { soft: 'bg-brand-50 text-brand-700 ring-brand-100', solid: 'bg-brand-600 text-white ring-brand-600', outline: 'bg-white text-brand-700 ring-brand-200' },
  gold: { soft: 'bg-gold-50 text-gold-700 ring-gold-200', solid: 'bg-gold-500 text-brand-950 ring-gold-500', outline: 'bg-white text-gold-700 ring-gold-300' },
  jad: { soft: 'bg-jad-50 text-jad-700 ring-jad-200', solid: 'bg-jad-600 text-white ring-jad-600', outline: 'bg-white text-jad-700 ring-jad-300' },
  rust: { soft: 'bg-rust-50 text-rust-700 ring-rust-200', solid: 'bg-rust-600 text-white ring-rust-600', outline: 'bg-white text-rust-700 ring-rust-300' },
  sol: { soft: 'bg-sol-50 text-sol-700 ring-sol-200', solid: 'bg-sol-500 text-brand-950 ring-sol-500', outline: 'bg-white text-sol-700 ring-sol-300' },
  slate: { soft: 'bg-slate-100 text-slate-600 ring-slate-200', solid: 'bg-slate-700 text-white ring-slate-700', outline: 'bg-white text-slate-600 ring-slate-300' },
};

export default function Badge({ children, tone = 'slate', variant = 'soft', className = '' }: BadgeProps) {
  const styles = toneMap[tone][variant];
  return <span className={`chip ${styles} ${className}`}>{children}</span>;
}
