'use client';

import { FolderKanban, Search, Bell, Clock, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/Badge';
import EmptyState from '@/components/EmptyState';

export default function AdminGestoria() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestoría"
        subtitle="Módulo de gestión de trámites y servicios al socio"
        actions={<button className="btn-outline"><Search className="h-4 w-4" /> Buscar trámite</button>}
      />

      {/* Placeholder notice */}
      <div className="surface flex flex-col gap-4 bg-gradient-to-br from-sol-50/60 to-white p-6 sm:flex-row sm:items-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-sol-100 text-sol-600 ring-1 ring-sol-200">
          <Clock className="h-7 w-7" />
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-brand-900">Módulo en etapa de relevamiento</h2>
          <p className="mt-1 max-w-2xl text-sm text-slate-600">
            La gestoría del CCISJ se encuentra en proceso de relevamiento interno.
            Este módulo se habilitará una vez definidos los tipos de trámites, circuitos
            de aprobación y responsables. Por ahora se presenta como espacio disponible
            dentro del sistema, a la espera de su definición funcional.
          </p>
        </div>
        <Badge tone="sol" variant="soft">Próximamente</Badge>
      </div>

      {/* Placeholder cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[
          { titulo: 'Trámites societarios', desc: 'Alta, baja y modificación de socios.', icon: FolderKanban },
          { titulo: 'Certificados', desc: 'Emisión de certificados de socios y de origen.', icon: FolderKanban },
          { titulo: 'Presentaciones', desc: 'Gestión de presentaciones ante organismos.', icon: FolderKanban },
        ].map((m) => (
          <div key={m.titulo} className="surface surface-hover flex items-start gap-3 p-5 opacity-70">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
              <m.icon className="h-5 w-5" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-brand-900">{m.titulo}</p>
              <p className="mt-0.5 text-xs text-slate-500">{m.desc}</p>
            </div>
            <ChevronRight className="h-4 w-4 text-slate-300" />
          </div>
        ))}
      </div>

      <EmptyState
        icon={<Bell className="h-6 w-6" />}
        title="Aún no hay trámites cargados"
        description="Cuando la gestoría esté definida, acá vas a ver los trámites en curso y su estado de avance."
      />
    </div>
  );
}
