'use client';

import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

/**
 * Encabezado de pantalla: título y acciones en una sola línea.
 *
 * El subtítulo es opcional y debe agregar algo que el título no diga —"Período
 * agosto 2026", no "Administración de socios del CCISJ", que es la misma frase
 * dicha dos veces.
 */
export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5">
        <h1 className="text-[19px] font-semibold tracking-tight text-slate-900">{title}</h1>
        {subtitle && <p className="text-[13px] text-slate-400">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
