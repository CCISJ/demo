'use client';

import { useState } from 'react';
import { Plus, Search, Users, MapPin, Calendar, MoreHorizontal, Eye, X, Briefcase, FileText } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/Badge';
import { ofertas, categoriasLaborales } from '@/data/mockData';

export default function EmpresaOfertas() {
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const filtered = ofertas.filter((o) => !query || `${o.puesto} ${o.categoria}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mis ofertas"
        subtitle="Publicá y administrá las ofertas laborales de tu empresa"
        actions={<button onClick={() => setShowForm(true)} className="btn-gold"><Plus className="h-4 w-4" /> Publicar oferta</button>}
      />

      <div className="surface flex items-center gap-3 p-4">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Buscar entre tus ofertas…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <select className="input w-auto">
          <option>Todos los estados</option>
          <option>Activas</option>
          <option>Cerradas</option>
          <option>Borrador</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {filtered.map((o) => (
          <div key={o.id} className="surface surface-hover p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Briefcase className="h-5 w-5" /></span>
                <div>
                  <p className="font-semibold text-brand-900">{o.puesto}</p>
                  <p className="text-xs text-slate-400">{o.id} · publicada {o.publicada}</p>
                </div>
              </div>
              <Badge tone={o.estado === 'activa' ? 'jad' : o.estado === 'cerrada' ? 'slate' : 'sol'}>
                {o.estado === 'activa' ? 'Activa' : o.estado === 'cerrada' ? 'Cerrada' : 'Borrador'}
              </Badge>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-500">
              <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" />{o.ubicacion}</span>
              <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />Cierra {o.cierra}</span>
              <Badge tone="brand" variant="outline">{o.categoria}</Badge>
            </div>

            <p className="mt-3 line-clamp-2 text-sm text-slate-600">{o.descripcion}</p>

            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
              <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-900">
                <Users className="h-4 w-4 text-slate-400" />{o.candidatos} candidatos
              </span>
              <div className="flex gap-1">
                <button className="btn-ghost px-2.5 py-1.5 text-xs"><Eye className="h-3.5 w-3.5" /> Ver</button>
                <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showForm && <PublicarOfertaModal onClose={() => setShowForm(false)} />}
    </div>
  );
}

function PublicarOfertaModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-brand-950/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-soft animate-fade-in">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-brand-600" />
            <h2 className="text-base font-bold text-brand-900">Publicar nueva oferta</h2>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Cerrar"><X className="h-5 w-5" /></button>
        </div>

        <form className="max-h-[70vh] overflow-y-auto p-5" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label">Puesto</label>
              <input className="input" placeholder="Ej. Chofer de camión de larga distancia" />
            </div>
            <div>
              <label className="label">Categoría</label>
              <select className="input">{categoriasLaborales.map((c) => <option key={c}>{c}</option>)}</select>
            </div>
            <div>
              <label className="label">Modalidad</label>
              <select className="input"><option>Presencial</option><option>Remoto</option><option>Híbrido</option></select>
            </div>
            <div>
              <label className="label">Ubicación</label>
              <input className="input" placeholder="Ej. San José de Mayo" />
            </div>
            <div>
              <label className="label">Salario (opcional)</label>
              <input className="input" placeholder="Ej. $ 45.000" />
            </div>
            <div>
              <label className="label">Fecha de cierre</label>
              <input type="date" className="input" />
            </div>
            <div>
              <label className="label">Vacantes</label>
              <input type="number" className="input" placeholder="1" defaultValue={1} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Descripción del puesto</label>
              <textarea rows={4} className="input resize-none" placeholder="Detalle tareas, requisitos y condiciones…" />
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
            <button type="button" className="btn-ghost"><FileText className="h-4 w-4" /> Guardar borrador</button>
            <div className="flex gap-2">
              <button type="button" onClick={onClose} className="btn-outline">Cancelar</button>
              <button type="submit" className="btn-primary">Publicar oferta</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
