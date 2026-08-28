'use client';

import { useState } from 'react';
import {
  Plus, Search, Filter, Briefcase, Users, Calendar, MapPin,
  ChevronRight, MoreHorizontal, Download,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/Badge';
import { useNav } from '@/components/navContext';
import { ofertas, categoriasLaborales, type OfertaEstado } from '@/data/mockData';

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

  const stats = {
    activas: ofertas.filter((o) => o.estado === 'activa').length,
    cerradas: ofertas.filter((o) => o.estado === 'cerrada').length,
    candidatos: ofertas.reduce((a, o) => a + o.candidatos, 0),
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Bolsa de trabajo"
        subtitle="Gestión de ofertas laborales y postulaciones"
        actions={
          <>
            <button onClick={() => onNavigate('admin', 'candidatos')} className="btn-outline">
              <Search className="h-4 w-4" /> Buscar candidatos
            </button>
            <button className="btn-primary"><Plus className="h-4 w-4" /> Nueva oferta</button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="surface flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-jad-50 text-jad-600"><Briefcase className="h-5 w-5" /></span>
          <div><p className="text-xl font-bold text-brand-900">{stats.activas}</p><p className="text-xs text-slate-500">Ofertas activas</p></div>
        </div>
        <div className="surface flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-500"><Briefcase className="h-5 w-5" /></span>
          <div><p className="text-xl font-bold text-brand-900">{stats.cerradas}</p><p className="text-xs text-slate-500">Ofertas cerradas</p></div>
        </div>
        <div className="surface flex items-center gap-3 p-4">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-50 text-gold-600"><Users className="h-5 w-5" /></span>
          <div><p className="text-xl font-bold text-brand-900">{stats.candidatos}</p><p className="text-xs text-slate-500">Candidatos totales</p></div>
        </div>
      </div>

      {/* Tabs + filters */}
      <div className="surface p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex rounded-lg bg-slate-100 p-0.5">
            {([['activas', 'Activas'], ['cerradas', 'Cerradas'], ['todas', 'Todas']] as const).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${
                  tab === k ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-brand-700'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="flex flex-1 flex-wrap items-center gap-2 lg:justify-end">
            <div className="relative min-w-[200px] flex-1 lg:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input className="input pl-9" placeholder="Buscar oferta o empresa…" value={query} onChange={(e) => setQuery(e.target.value)} />
            </div>
            <select className="input w-auto" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
              <option value="todas">Todas las categorías</option>
              {categoriasLaborales.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Category chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCategoria('todas')}
          className={`chip ${categoria === 'todas' ? 'bg-brand-600 text-white ring-brand-600' : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'}`}
        >
          Todas
        </button>
        {categoriasLaborales.map((c) => (
          <button
            key={c}
            onClick={() => setCategoria(c)}
            className={`chip ${categoria === c ? 'bg-brand-600 text-white ring-brand-600' : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead className="bg-slate-50/60">
              <tr>
                <th className="table-th">Oferta</th>
                <th className="table-th">Empresa</th>
                <th className="table-th">Categoría</th>
                <th className="table-th">Publicada</th>
                <th className="table-th">Cierra</th>
                <th className="table-th">Candidatos</th>
                <th className="table-th">Estado</th>
                <th className="table-th text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((o) => (
                <tr key={o.id} className="table-row">
                  <td className="table-td">
                    <p className="font-semibold text-brand-900">{o.puesto}</p>
                    <p className="flex items-center gap-1 text-xs text-slate-400"><MapPin className="h-3 w-3" />{o.ubicacion} · {o.modalidad}</p>
                  </td>
                  <td className="table-td text-slate-600">{o.empresa}</td>
                  <td className="table-td"><Badge tone="brand" variant="outline">{o.categoria}</Badge></td>
                  <td className="table-td text-slate-500">{o.publicada}</td>
                  <td className="table-td text-slate-500">{o.cierra}</td>
                  <td className="table-td">
                    <span className="inline-flex items-center gap-1 font-semibold text-brand-900">
                      <Users className="h-3.5 w-3.5 text-slate-400" />
                      {o.candidatos}
                    </span>
                  </td>
                  <td className="table-td">
                    <Badge tone={o.estado === 'activa' ? 'jad' : o.estado === 'cerrada' ? 'slate' : 'sol'}>
                      {o.estado === 'activa' ? 'Activa' : o.estado === 'cerrada' ? 'Cerrada' : 'Borrador'}
                    </Badge>
                  </td>
                  <td className="table-td">
                    <div className="flex items-center justify-end gap-1">
                      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-700"><ChevronRight className="h-4 w-4" /></button>
                      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-700"><MoreHorizontal className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-slate-500">No hay ofertas con los filtros seleccionados.</div>
        )}
      </div>
    </div>
  );
}
