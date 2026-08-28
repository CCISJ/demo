'use client';

import { useState } from 'react';
import { Search, MapPin, Briefcase, Calendar, ArrowRight, Heart, Building2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/Badge';
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
    if (query && !`${o.puesto} ${o.empresa} ${o.descripcion}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader title="Buscar empleos" subtitle="Explorá las ofertas laborales disponibles en el CCISJ" />

      {/* Search hero */}
      <div className="surface p-5">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            className="input pl-12 py-3 text-base"
            placeholder="¿Qué puesto estás buscando?"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <label className="label">Categoría</label>
            <select className="input" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="todas">Todas</option>
              {categoriasLaborales.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Ubicación</label>
            <select className="input" value={ubicacion} onChange={(e) => setUbicacion(e.target.value)}>
              <option value="todas">Todas</option>
              {ubicaciones.map((u) => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Tipo de empleo</label>
            <select className="input" value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="todos">Todos</option>
              <option value="Presencial">Presencial</option>
              <option value="Remoto">Remoto</option>
              <option value="Híbrido">Híbrido</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategoria('todas')}
          className={`chip ${categoria === 'todas' ? 'bg-brand-700 text-white ring-brand-700' : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'}`}
        >
          Todas
        </button>
        {categoriasLaborales.map((c) => (
          <button
            key={c}
            onClick={() => setCategoria(c)}
            className={`chip ${categoria === c ? 'bg-brand-700 text-white ring-brand-700' : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'}`}
          >
            {c}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-500">{filtered.length} ofertas disponibles</p>

      {/* Job cards */}
      {filtered.length === 0 ? (
        <div className="surface px-5 py-12 text-center text-sm text-slate-500">
          No hay ofertas que coincidan con tu búsqueda. Probá ajustar los filtros.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {filtered.map((o) => (
            <div key={o.id} className="surface surface-hover group flex flex-col p-5">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    <Building2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-brand-900">{o.puesto}</p>
                    <p className="text-xs text-slate-400">{o.empresa}</p>
                  </div>
                </div>
                <button className="rounded-lg p-1.5 text-slate-300 hover:bg-slate-100 hover:text-rust-500" aria-label="Guardar">
                  <Heart className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{o.ubicacion}</span>
                <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3" />{o.modalidad}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{o.publicada}</span>
              </div>

              <p className="mt-3 line-clamp-2 flex-1 text-sm text-slate-600">{o.descripcion}</p>

              <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <Badge tone="brand" variant="soft">{o.categoria}</Badge>
                  <span className="text-xs font-semibold text-brand-900">{o.salario}</span>
                </div>
                <button
                  onClick={() => setSelected(o)}
                  className="btn-primary px-3 py-1.5 text-xs"
                >
                  Ver oferta <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <OfertaModal oferta={selected} onClose={() => setSelected(null)} onPostular={() => { setSelected(null); onNavigate('postulante', 'p-postulaciones'); }} />
      )}
    </div>
  );
}

function OfertaModal({ oferta, onClose, onPostular }: { oferta: Oferta; onClose: () => void; onPostular: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-950/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-soft animate-fade-in">
        <div className="flex items-start justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-start gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Building2 className="h-6 w-6" /></span>
            <div>
              <h2 className="text-lg font-bold text-brand-900">{oferta.puesto}</h2>
              <p className="text-sm text-slate-500">{oferta.empresa}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Cerrar">×</button>
        </div>
        <div className="max-h-[60vh] overflow-y-auto p-5">
          <div className="flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{oferta.ubicacion}</span>
            <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3" />{oferta.modalidad}</span>
            <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />Publicada {oferta.publicada}</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="brand">{oferta.categoria}</Badge>
            <Badge tone="jad" variant="soft">{oferta.salario}</Badge>
            <Badge tone="slate">Cierra {oferta.cierra}</Badge>
          </div>
          <h3 className="mt-5 text-sm font-bold text-brand-900">Descripción</h3>
          <p className="mt-1 text-sm text-slate-600">{oferta.descripcion}</p>
          <h3 className="mt-5 text-sm font-bold text-brand-900">Requisitos</h3>
          <ul className="mt-1 list-inside list-disc space-y-1 text-sm text-slate-600">
            <li>Experiencia previa en el rubro</li>
            <li>Carnet de salud al día</li>
            <li>Disponibilidad horaria</li>
          </ul>
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-4">
          <button onClick={onClose} className="btn-outline">Cerrar</button>
          <button onClick={onPostular} className="btn-primary">Postularme</button>
        </div>
      </div>
    </div>
  );
}
