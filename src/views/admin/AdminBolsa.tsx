'use client';

import { useState } from 'react';
import { Plus, Search, MapPin } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Status from '@/components/Status';
import { useNav } from '@/components/navContext';
import { ofertas, categoriasLaborales } from '@/data/mockData';

const estadoOferta = {
  activa: { label: 'Activa', tone: 'neutral' as const },
  cerrada: { label: 'Cerrada', tone: 'muted' as const },
  borrador: { label: 'Borrador', tone: 'warn' as const },
};

export default function AdminBolsa() {
  const { onNavigate } = useNav();
  const [tab, setTab] = useState<'activas' | 'cerradas' | 'todas'>('activas');
  const [categoria, setCategoria] = useState<string>('todas');
  const [query, setQuery] = useState('');

  const filtered = ofertas.filter((o) => {
    if (tab === 'activas' && o.estado !== 'activa') return false;
    if (tab === 'cerradas' && o.estado !== 'cerrada') return false;
    if (categoria !== 'todas' && o.categoria !== categoria) return false;
    if (query && !`${o.puesto} ${o.empresa}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const activas = ofertas.filter((o) => o.estado === 'activa').length;
  const cerradas = ofertas.filter((o) => o.estado === 'cerrada').length;
  const candidatos = ofertas.reduce((a, o) => a + o.candidatos, 0);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Bolsa de trabajo"
        actions={
          <>
            <button onClick={() => onNavigate('admin', 'candidatos')} className="btn-outline">
              <Search className="h-3.5 w-3.5" strokeWidth={1.75} /> Buscar candidatos
            </button>
            <button className="btn-primary">
              <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Nueva oferta
            </button>
          </>
        }
      />

      <div className="metric-strip lg:grid-cols-3">
        <div className="metric">
          <p className="metric-label">Ofertas activas</p>
          <p className="metric-value">{activas}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Ofertas cerradas</p>
          <p className="metric-value">{cerradas}</p>
        </div>
        {/* Cuenta postulaciones, no personas: un mismo postulante se anota en
            varias ofertas y llamarlo "candidatos" lo hacía parecer el padrón. */}
        <div className="metric">
          <p className="metric-label">Postulaciones recibidas</p>
          <p className="metric-value">{candidatos}</p>
          <p className="metric-note">Sumadas todas las ofertas</p>
        </div>
      </div>

      {/*
        Antes la categoría se elegía dos veces: un select y, debajo, una fila de
        nueve píldoras con la misma función. Queda el select.
      */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="segment shrink-0">
          {([['activas', 'Activas'], ['cerradas', 'Cerradas'], ['todas', 'Todas']] as const).map(([k, l]) => (
            <button
              key={k}
              onClick={() => setTab(k)}
              className={`segment-item ${tab === k ? 'segment-item-active' : ''}`}
            >
              {l}
            </button>
          ))}
        </div>

        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
          <input
            className="input pl-8"
            placeholder="Buscar oferta o empresa…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <select className="input sm:w-auto" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
          <option value="todas">Todas las categorías</option>
          {categoriasLaborales.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[780px]">
            <thead>
              <tr className="table-head">
                <th className="table-th">Oferta</th>
                <th className="table-th">Empresa</th>
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
                    <p className="font-medium text-ink">{o.puesto}</p>
                    <p className="flex items-center gap-1 text-[12px] text-ink-faint">
                      <MapPin className="h-3 w-3" strokeWidth={1.75} />
                      {o.ubicacion} · {o.modalidad}
                    </p>
                  </td>
                  <td className="table-td text-ink-mute">{o.empresa}</td>
                  <td className="table-td">
                    <span className="chip">{o.categoria}</span>
                  </td>
                  <td className="table-td whitespace-nowrap font-mono text-[12.5px] text-ink-mute">{o.publicada}</td>
                  <td className="table-td whitespace-nowrap font-mono text-[12.5px] text-ink-mute">{o.cierra}</td>
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
          <p className="px-4 py-12 text-center text-[13px] text-ink-mute">
            No hay ofertas con los filtros seleccionados.
          </p>
        )}
      </div>
    </div>
  );
}
