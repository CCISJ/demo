'use client';

import { useState } from 'react';
import { Search, X, Download, Mail } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Status from '@/components/Status';
import { candidatos } from '@/data/mockData';

const recibidos = [
  { c: candidatos[0], oferta: 'Operario de depósito', fecha: '14/08/2026', estado: 'Nuevo' },
  { c: candidatos[7], oferta: 'Operario de depósito', fecha: '13/08/2026', estado: 'Revisado' },
  { c: candidatos[1], oferta: 'Chofer de camión', fecha: '12/08/2026', estado: 'Favorito' },
  { c: candidatos[5], oferta: 'Administrativo contable', fecha: '10/08/2026', estado: 'Nuevo' },
];

export default function EmpresaCandidatos() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<(typeof candidatos)[number] | null>(null);

  const filtered = recibidos.filter((r) => !query || r.c.nombre.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-4">
      <PageHeader title="Candidatos" subtitle="Postulaciones recibidas en tus ofertas" />

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
          <input
            className="input pl-8"
            placeholder="Buscar candidato…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="input sm:w-auto">
          <option>Todas las ofertas</option>
          <option>Operario de depósito</option>
          <option>Chofer de camión</option>
        </select>
      </div>

      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead>
              <tr className="table-head">
                <th className="table-th">Candidato</th>
                <th className="table-th">Oferta</th>
                <th className="table-th">Fecha</th>
                <th className="table-th">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row) => (
                <tr key={row.c.id} className="table-row cursor-pointer" onClick={() => setSelected(row.c)}>
                  <td className="table-td">
                    <p className="font-medium text-ink">{row.c.nombre}</p>
                    <p className="text-[12px] text-ink-faint">
                      {row.c.ciudad} · {row.c.experiencia} años de experiencia
                    </p>
                  </td>
                  <td className="table-td text-ink-mute">{row.oferta}</td>
                  <td className="table-td whitespace-nowrap font-mono text-[12.5px] text-ink-mute">{row.fecha}</td>
                  <td className="table-td">
                    {row.estado === 'Favorito' ? (
                      <span className="chip chip-gold">Favorito</span>
                    ) : (
                      <Status tone={row.estado === 'Nuevo' ? 'ok' : 'neutral'}>{row.estado}</Status>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-chrome/30" onClick={() => setSelected(null)} />
          <aside className="animate-slide-in absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-line bg-surface shadow-pop">
            <div className="flex shrink-0 items-start justify-between gap-3 border-b border-line px-5 py-4">
              <div className="min-w-0">
                <p className="truncate text-[15px] font-semibold text-ink">{selected.nombre}</p>
                <p className="mt-0.5 text-[12.5px] text-ink-faint">
                  {selected.ciudad} · {selected.edad} años
                </p>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="-mr-2 -mt-1 rounded-md p-2 text-ink-faint transition-colors hover:bg-band hover:text-ink-body"
                aria-label="Cerrar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <div className="border-b border-line px-5 py-3">
                <div className="flex flex-wrap gap-1">
                  {selected.categorias.map((c) => (
                    <span key={c} className="chip">
                      {c}
                    </span>
                  ))}
                </div>
                <p className="mt-2.5 text-[13px] leading-relaxed text-ink-mute">{selected.resumen}</p>
              </div>

              <dl className="px-5 py-1">
                {(
                  [
                    ['Experiencia', `${selected.experiencia} años`],
                    ['Disponibilidad', selected.disponibilidad],
                    ['Certificados', String(selected.certificados)],
                    ['CV', selected.cv ? 'Cargado' : 'Sin cargar'],
                  ] as const
                ).map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-0"
                  >
                    <dt className="text-[12.5px] text-ink-faint">{label}</dt>
                    <dd className="text-[13px] text-ink-body">{value}</dd>
                  </div>
                ))}
              </dl>

              <div className="border-t border-line px-5 py-3">
                <p className="section-label mb-2">Documentos</p>
                <div className="flex items-center gap-2 py-1">
                  <span className="flex-1 font-mono text-[12px] text-ink-mute">CV.pdf</span>
                  <button
                    className="rounded-md p-1.5 text-ink-faint transition-colors hover:bg-band hover:text-ink-body"
                    aria-label="Descargar CV"
                  >
                    <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex shrink-0 gap-2 border-t border-line px-5 py-3">
              <button className="btn-outline flex-1">
                <Download className="h-3.5 w-3.5" strokeWidth={1.75} /> Descargar CV
              </button>
              <button className="btn-primary flex-1">
                <Mail className="h-3.5 w-3.5" strokeWidth={1.75} /> Contactar
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
