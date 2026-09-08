'use client';

import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  /** Contexto por encima del título: período, área, empresa. */
  subtitle?: string;
  actions?: ReactNode;
}

/**
 * Encabezado de pantalla.
 *
 * El rótulo va arriba en versalita verde y el título debajo, cerrados por una
 * regla de 2 px en el verde del chrome. Esa regla es lo que ancla la pantalla:
 * antes el título flotaba sobre el lienzo sin nada que lo separara del
 * contenido, y la página no empezaba en ningún lado.
 */
export default function PageHeader({ title, subtitle, actions }: PageHeaderProps) {
  return (
    <div className="page-head">
      <div>
        {subtitle && <p className="page-eyebrow">{subtitle}</p>}
        <h1 className="page-title">{title}</h1>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
