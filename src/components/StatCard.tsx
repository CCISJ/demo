'use client';

import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string;
  /** Se acepta por compatibilidad; una cifra no necesita ilustración. */
  icon?: LucideIcon;
  tone?: 'brand' | 'gold' | 'jad' | 'rust' | 'sol' | 'slate';
  /** Dato de contexto: "4 con deuda", "vence el 30/09". */
  hint?: string;
  trend?: { value: string; up: boolean };
}

/**
 * Una cifra y su rótulo. Nada más.
 *
 * La versión anterior ponía un ícono dentro de un cuadrado de color por cada
 * métrica: cuatro tarjetas seguidas eran cuatro acentos distintos peleando
 * arriba de la pantalla, antes de que el usuario leyera un solo número. El
 * ícono y el `tone` se siguen aceptando para no romper las pantallas que aún
 * los pasan, pero no se dibujan.
 */
export default function StatCard({ label, value, hint, trend }: StatCardProps) {
  const note = [trend?.value, hint].filter(Boolean).join(' · ');

  return (
    <div className="surface metric">
      <p className="metric-label">{label}</p>
      <p className="metric-value">{value}</p>
      {note && <p className="metric-note">{note}</p>}
    </div>
  );
}
