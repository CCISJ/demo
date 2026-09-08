'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';
import Status from '@/components/Status';
import { postulaciones, type PostulacionEstado } from '@/data/mockData';

const estadoConfig: Record<
  PostulacionEstado,
  { label: string; tone: 'neutral' | 'warn' | 'ok' | 'muted'; nota?: string }
> = {
  enviada: { label: 'Enviada', tone: 'neutral' },
  revision: { label: 'En revisión', tone: 'warn', nota: 'El CCISJ está revisando tu postulación' },
  finalizada: { label: 'Finalizada', tone: 'ok', nota: 'Te contactaremos por teléfono' },
  'no-seleccionado': { label: 'No seleccionado', tone: 'muted', nota: 'Gracias por participar' },
};

const filtros = [
  ['todas', 'Todas'],
  ['enviada', 'Enviadas'],
  ['revision', 'En revisión'],
  ['finalizada', 'Finalizadas'],
  ['no-seleccionado', 'No seleccionado'],
] as const;

export default function PostulantePostulaciones() {
  const [filter, setFilter] = useState<'todas' | PostulacionEstado>('todas');
  const filtered = filter === 'todas' ? postulaciones : postulaciones.filter((p) => p.estado === filter);

  return (
    <div className="space-y-4">
      <PageHeader title="Mis postulaciones" subtitle="Estado de cada proceso" />

      <p className="text-[12.5px] text-slate-500">
        Cuando una empresa te selecciona, el CCISJ te contacta por teléfono. Si no continuás en el
        proceso, te avisamos acá y por correo.
      </p>

      <div className="segment">
        {filtros.map(([k, l]) => {
          const count = k === 'todas' ? postulaciones.length : postulaciones.filter((p) => p.estado === k).length;
          return (
            <button
              key={k}
              onClick={() => setFilter(k)}
              className={`segment-item ${filter === k ? 'segment-item-active' : ''}`}
            >
              {l} <span className="tabular-nums text-slate-400">{count}</span>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className="surface px-4 py-12 text-center text-[13px] text-slate-500">
          No tenés postulaciones en este estado.
        </div>
      ) : (
        <ul className="surface divide-y divide-line">
          {filtered.map((p) => {
            const cfg = estadoConfig[p.estado];
            return (
              <li key={p.id} className="flex flex-col gap-2 px-4 py-3.5 sm:flex-row sm:items-center sm:gap-4">
                <div className="min-w-0 flex-1">
                  <p className="text-[14px] font-semibold text-slate-900">{p.puesto}</p>
                  <p className="mt-0.5 text-[12.5px] text-slate-500">{p.empresa}</p>
                  <p className="mt-1 text-[12px] text-slate-400">
                    {p.categoria} · postulaste el {p.fecha}
                  </p>
                </div>
                <div className="shrink-0 sm:text-right">
                  <Status tone={cfg.tone}>{cfg.label}</Status>
                  {cfg.nota && <p className="mt-0.5 text-[12px] text-slate-400">{cfg.nota}</p>}
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
