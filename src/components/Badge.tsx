'use client';

import type { ReactNode } from 'react';

type Tone = 'brand' | 'gold' | 'jad' | 'rust' | 'sol' | 'slate';

interface BadgeProps {
  children: ReactNode;
  tone?: Tone;
  variant?: 'soft' | 'solid' | 'outline';
  className?: string;
}

// Una etiqueta es una categoría, no una alarma: contorno tenue y texto, sin
// relleno saturado. Las píldoras rellenas se reservan para `variant="solid"`,
// que hoy casi no se usa — cuando cada fila de una tabla tiene tres píldoras de
// color, ninguna comunica nada.
const toneClass: Record<Tone, string> = {
  brand: 'chip-brand',
  gold: 'chip-gold',
  jad: 'chip-brand',
  rust: 'chip-alert',
  sol: 'border-sol-300 text-sol-800',
  slate: '',
};

const solidClass: Record<Tone, string> = {
  brand: 'bg-brand-700 text-white border-brand-700',
  gold: 'bg-gold-500 text-brand-950 border-gold-500',
  jad: 'bg-brand-700 text-white border-brand-700',
  rust: 'bg-rust-600 text-white border-rust-600',
  sol: 'bg-sol-500 text-brand-950 border-sol-500',
  slate: 'bg-slate-700 text-white border-slate-700',
};

export default function Badge({
  children,
  tone = 'slate',
  variant = 'soft',
  className = '',
}: BadgeProps) {
  const styles = variant === 'solid' ? solidClass[tone] : toneClass[tone];

  return <span className={`chip ${styles} ${className}`}>{children}</span>;
}
