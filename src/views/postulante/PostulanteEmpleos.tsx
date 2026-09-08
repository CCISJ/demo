'use client';

import { useState } from 'react';
import { Search, MapPin, Briefcase, Calendar, Bookmark, X } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { ofertas, categoriasLaborales, type Oferta } from '@/data/mockData';
import { useNav } from '@/components/navContext';

export default function PostulanteEmpleos() {
  const { onNavigate } = useNav();
  const [categoria, setCategoria] = useState<string>('todas');
  const [ubicacion, setUbicacion] = useState<string>('todas');
  const [tipo, setTipo] = useState<string>('todos');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Oferta | null>(null);

  const ubicaciones = Array.from(new Set(ofertas.map((o) => o.ubicacion)));

  const filtered = ofertas.filter((o) => {
    if (o.estado !== 'activa') return false;
    if (categoria !== 'todas' && o.categoria !== categoria) return false;
    if (ubicacion !== 'todas' && o.ubicacion !== ubicacion) return false;
    if (tipo !== 'todos' && o.modalidad !== tipo) return false;
    if (query && !`${o.puesto} ${o.empresa} ${o.descripcion}`.toLowerCase().includes(query.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <PageHeader title="Buscar empleos" subtitle={`${filtered.length} ofertas disponibles`} />

      {/* Una sola fila de filtros: la fila de nueve píldoras de categoría hacía
          lo mismo que el select que tiene al lado. */}
      <div className="flex flex-col gap-2 lg:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            className="input pl-8"
            placeholder="¿Qué puesto estás buscando?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="input lg:w-auto" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="todas">Todas las categorías</option>
          {categoriasLaborales.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select className="input lg:w-auto" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}>
          <option value="todas">Toda ubicación</option>
          {ubicaciones.map((u) => (
            <option key={u} value={u}>
              {u}
            </option>
          ))}
        </select>
        <select className="input lg:w-auto" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="todos">Toda modalidad</option>
          <option value="Presencial">Presencial</option>
          <option value="Remoto">Remoto</option>
          <option value="Híbrido">Híbrido</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="surface px-4 py-12 text-center text-[13px] text-slate-500">
          No hay ofertas que coincidan con tu búsqueda. Probá ajustar los filtros.
        </div>
      ) : (
        /* Una lista, no una grilla de tarjetas: las ofertas se comparan de
           arriba abajo y entra el doble en la misma pantalla. */
        <ul className="surface divide-y divide-line">
          {filtered.map((o) => (
            <li key={o.id}>
              <button
                onClick={() => setSelected(o)}
                className="flex w-full items-start gap-4 px-4 py-3.5 text-left transition-colors hover:bg-slate-50"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <p className="text-[14px] font-semibold text-slate-900">{o.puesto}</p>
                    <span className="chip">{o.categoria}</span>
                  </div>
                  <p className="mt-0.5 text-[12.5px] text-slate-500">{o.empresa}</p>
                  <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-slate-600">{o.descripcion}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-slate-400">
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" strokeWidth={1.75} />
                      {o.ubicacion}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Briefcase className="h-3 w-3" strokeWidth={1.75} />
                      {o.modalidad}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" strokeWidth={1.75} />
                      {o.publicada}
                    </span>
                  </div>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2">
                  <span className="font-mono text-[12.5px] tabular-nums text-slate-900">{o.salario}</span>
                  <span className="text-slate-300 transition-colors hover:text-brand-700">
                    <Bookmark className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>
              </button>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <OfertaModal
          oferta={selected}
          onClose={() => setSelected(null)}
          onPostular={() => {
            setSelected(null);
            onNavigate('postulante', 'p-postulaciones');
          }}
        />
      )}
    </div>
  );
}

function OfertaModal({
  oferta,
  onClose,
  onPostular,
}: {
  oferta: Oferta;
  onClose: () => void;
  onPostular: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/25" onClick={onClose} />
      <div className="animate-fade-in relative z-10 flex w-full max-w-xl flex-col overflow-hidden rounded-lg border border-line bg-white shadow-pop">
        <div className="flex items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <h2 className="text-[16px] font-semibold text-slate-900">{oferta.puesto}</h2>
            <p className="mt-0.5 text-[13px] text-slate-500">{oferta.empresa}</p>
          </div>
          <button
            onClick={onClose}
            className="-mr-2 -mt-1 rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto">
          <dl className="grid grid-cols-2 gap-x-4 gap-y-2.5 border-b border-line px-5 py-3.5">
            <div>
              <dt className="text-[12px] text-slate-400">Ubicación</dt>
              <dd className="text-[13px] text-slate-800">{oferta.ubicacion}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-slate-400">Modalidad</dt>
              <dd className="text-[13px] text-slate-800">{oferta.modalidad}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-slate-400">Remuneración</dt>
              <dd className="font-mono text-[12.5px] text-slate-800">{oferta.salario}</dd>
            </div>
            <div>
              <dt className="text-[12px] text-slate-400">Cierra</dt>
              <dd className="font-mono text-[12.5px] text-slate-800">{oferta.cierra}</dd>
            </div>
          </dl>

          <div className="px-5 py-4">
            <p className="section-label">Descripción</p>
            <p className="mt-1.5 text-[13px] leading-relaxed text-slate-600">{oferta.descripcion}</p>

            <p className="section-label mt-4">Requisitos</p>
            <ul className="mt-1.5 space-y-1 text-[13px] text-slate-600">
              <li>· Experiencia previa en el rubro</li>
              <li>· Carnet de salud al día</li>
              <li>· Disponibilidad horaria</li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 border-t border-line px-5 py-3">
          <button onClick={onClose} className="btn-outline">
            Cerrar
          </button>
          <button onClick={onPostular} className="btn-primary">
            Postularme
          </button>
        </div>
      </div>
    </div>
  );
}
