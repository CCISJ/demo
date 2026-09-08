'use client';

import type { ReactNode } from 'react';

export type StatusTone = 'neutral' | 'ok' | 'alert' | 'warn' | 'muted';

interface StatusProps {
  children: ReactNode;
  tone?: StatusTone;
  className?: string;
}

/**
 * Estado de una fila: un punto y una palabra.
 *
 * La regla de uso importa más que el componente. El estado normal —"Activo",
 * "Al día", "Enviada"— va en `neutral`: es lo que se espera, no necesita
 * color. `alert` queda para lo que pide trabajo (deudor, vencida, inactivo) y
 * `warn` para lo que vence pronto. Si en una pantalla la mayoría de las filas
 * está en rojo, el problema es el criterio, no el componente.
 */
const toneClass: Record<StatusTone, string> = {
  neutral: '',
  ok: 'status-ok',
  alert: 'status-alert',
  warn: 'status-warn',
  muted: 'status-muted',
};

export default function Status({ children, tone = 'neutral', className = '' }: StatusProps) {
  return <span className={`status ${toneClass[tone]} ${className}`}>{children}</span>;
}
