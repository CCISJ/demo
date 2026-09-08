'use client';

import { useState } from 'react';
import { Plus, Search, X } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Status from '@/components/Status';
import { ofertas, categoriasLaborales } from '@/data/mockData';

const estadoOferta = {
  activa: { label: 'Activa', tone: 'neutral' as const },
  cerrada: { label: 'Cerrada', tone: 'muted' as const },
  borrador: { label: 'Borrador', tone: 'warn' as const },
};

export default function EmpresaOfertas() {
  const [showForm, setShowForm] = useState(false);
  const [query, setQuery] = useState('');
  const [estado, setEstado] = useState('todos');

  const filtered = ofertas.filter((o) => {
    if (estado !== 'todos' && o.estado !== estado) return false;
    if (query && !`${o.puesto} ${o.categoria}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-4">
      <PageHeader
        title="Mis ofertas"
        actions={
          <button onClick={() => setShowForm(true)} className="btn-primary">
            <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Publicar oferta
          </button>
        }
      />

      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            className="input pl-8"
            placeholder="Buscar entre tus ofertas…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <select className="input sm:w-auto" value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="todos">Todos los estados</option>
          <option value="activa">Activas</option>
          <option value="cerrada">Cerradas</option>
          <option value="borrador">Borrador</option>
        </select>
      </div>

      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-line">
                <th className="table-th">Oferta</th>
                <th className="table-th">Categoría</th>
                <th className="table-th">Publicada</th>
                <th className="table-th">Cierra</th>
                <th className="table-th text-right">Candidatos</th>
                <th className="table-th">Estado</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="table-row cursor-pointer">
                  <td className="table-td">
                    <p className="font-medium text-slate-900">{o.puesto}</p>
                    <p className="mt-0.5 line-clamp-1 text-[12px] text-slate-400">{o.descripcion}</p>
                  </td>
                  <td className="table-td">
                    <span className="chip">{o.categoria}</span>
                  </td>
                  <td className="table-td whitespace-nowrap font-mono text-[12.5px] text-slate-500">{o.publicada}</td>
                  <td className="table-td whitespace-nowrap font-mono text-[12.5px] text-slate-500">{o.cierra}</td>
                  <td className="table-num">{o.candidatos}</td>
                  <td className="table-td">
                    <Status tone={estadoOferta[o.estado].tone}>{estadoOferta[o.estado].label}</Status>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="px-4 py-12 text-center text-[13px] text-slate-500">
            No hay ofertas que coincidan con la búsqueda.
          </p>
        )}
      </div>

      {showForm && <PublicarOfertaModal onClose={() => setShowForm(false)} />}
    </div>
  );
}

function PublicarOfertaModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/25" onClick={onClose} />
      <div className="animate-fade-in relative z-10 flex w-full max-w-2xl flex-col overflow-hidden rounded-lg border border-line bg-white shadow-pop">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h2 className="text-[15px] font-semibold text-slate-900">Publicar nueva oferta</h2>
          <button
            onClick={onClose}
            className="-mr-2 rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form
          className="max-h-[70vh] overflow-y-auto px-5 py-4"
          onSubmit={(e) => {
            e.preventDefault();
            onClose();
          }}
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="label">Puesto</label>
              <input className="input" placeholder="Ej. Chofer de camión de larga distancia" />
            </div>
            <div>
              <label className="label">Categoría</label>
              <select className="input">
                {categoriasLaborales.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Modalidad</label>
              <select className="input">
                <option>Presencial</option>
                <option>Remoto</option>
                <option>Híbrido</option>
              </select>
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
              <input type="number" className="input" defaultValue={1} />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Descripción del puesto</label>
              <textarea rows={4} className="input resize-none" placeholder="Detalle tareas, requisitos y condiciones…" />
            </div>
          </div>
        </form>

        <div className="flex items-center justify-between border-t border-line px-5 py-3">
          <button type="button" className="btn-ghost">
            Guardar borrador
          </button>
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="btn-outline">
              Cancelar
            </button>
            <button type="submit" className="btn-primary">
              Publicar oferta
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
