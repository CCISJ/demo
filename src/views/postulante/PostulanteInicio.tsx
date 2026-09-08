'use client';

import { Search, FileText } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Status from '@/components/Status';
import { useNav } from '@/components/navContext';
import { ofertas, postulaciones } from '@/data/mockData';

const estadoPostulacion = {
  enviada: { label: 'Enviada', tone: 'neutral' as const },
  revision: { label: 'En revisión', tone: 'warn' as const },
  finalizada: { label: 'Finalizada', tone: 'ok' as const },
  'no-seleccionado': { label: 'No seleccionado', tone: 'muted' as const },
};

export default function PostulanteInicio() {
  const { onNavigate } = useNav();
  const activas = ofertas.filter((o) => o.estado === 'activa').length;
  const enProceso = postulaciones.filter((p) => p.estado === 'revision').length;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Hola, Rodrigo"
        actions={
          <>
            <button onClick={() => onNavigate('postulante', 'p-cv')} className="btn-outline">
              <FileText className="h-3.5 w-3.5" strokeWidth={1.75} /> Completar perfil
            </button>
            <button onClick={() => onNavigate('postulante', 'p-empleos')} className="btn-primary">
              <Search className="h-3.5 w-3.5" strokeWidth={1.75} /> Buscar empleos
            </button>
          </>
        }
      />

      {/*
        El estado del perfil era un hero verde a sangre con halos difuminados y
        una barra dorada. Es un dato — cuánto falta y qué hacer — y se lee mejor
        como una línea con su acción al lado.
      */}
      <div className="surface flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-3">
        <div className="w-full max-w-sm">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[13px] font-medium text-ink">Perfil completado</p>
            <p className="font-mono text-[13px] tabular-nums text-ink">75%</p>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-band">
            <div className="h-full rounded-full bg-brand-600" style={{ width: '75%' }} />
          </div>
        </div>
        <p className="text-[12.5px] text-ink-mute">
          Completá tu CV para aparecer en más búsquedas.
        </p>
      </div>

      <div className="metric-strip lg:grid-cols-3">
        <div className="metric">
          <p className="metric-label">Ofertas activas</p>
          <p className="metric-value">{activas}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Mis postulaciones</p>
          <p className="metric-value">{postulaciones.length}</p>
        </div>
        <div className="metric">
          <p className="metric-label">En proceso</p>
          <p className="metric-value">{enProceso}</p>
        </div>
      </div>

      <div className="surface">
        <div className="card-head">
          <h2 className="card-title">Postulaciones recientes</h2>
          <button onClick={() => onNavigate('postulante', 'p-postulaciones')} className="btn-link">
            Ver todas
          </button>
        </div>
        <ul className="divide-y divide-line">
          {postulaciones.slice(0, 3).map((p) => (
            <li key={p.id} className="flex items-center gap-3 px-4 py-2.5">
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-ink">{p.puesto}</p>
                <p className="truncate text-[12px] text-ink-faint">
                  {p.empresa} · {p.fecha}
                </p>
              </div>
              <Status tone={estadoPostulacion[p.estado].tone}>{estadoPostulacion[p.estado].label}</Status>
            </li>
          ))}
        </ul>
      </div>

      <div className="surface flex flex-wrap divide-line sm:divide-x">
        <button
          onClick={() => onNavigate('postulante', 'p-empleos')}
          className="flex-1 px-4 py-3 text-left transition-colors hover:bg-band"
        >
          <p className="text-[13px] font-medium text-ink">Encontrar empleo</p>
          <p className="mt-0.5 text-[12px] text-ink-faint">Explorá las ofertas activas</p>
        </button>
        <button
          onClick={() => onNavigate('postulante', 'p-cv')}
          className="flex-1 px-4 py-3 text-left transition-colors hover:bg-band"
        >
          <p className="text-[13px] font-medium text-ink">Mi CV</p>
          <p className="mt-0.5 text-[12px] text-ink-faint">Completá tu perfil profesional</p>
        </button>
      </div>
    </div>
  );
}
