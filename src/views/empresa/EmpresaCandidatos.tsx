'use client';

import { useState } from 'react';
import { Search, Eye, Star, Mail, Phone, X, FileText, Download, ChevronRight } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/Badge';
import { candidatos } from '@/data/mockData';

export default function EmpresaCandidatos() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<typeof candidatos[number] | null>(null);
  const filtered = candidatos.filter((c) => !query || c.nombre.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="space-y-6">
      <PageHeader title="Candidatos" subtitle="Postulaciones recibidas en tus ofertas" />

      <div className="surface flex items-center gap-3 p-4">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Buscar candidato…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <select className="input w-auto"><option>Todas las ofertas</option><option>Operario de depósito</option><option>Chofer</option></select>
      </div>

      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px]">
            <thead className="bg-slate-50/60">
              <tr>
                <th className="table-th">Candidato</th>
                <th className="table-th">Oferta</th>
                <th className="table-th">Fecha</th>
                <th className="table-th">Estado</th>
                <th className="table-th text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {[
                { c: candidatos[0], oferta: 'Operario de depósito', fecha: '14/08/2026', estado: 'Nuevo' },
                { c: candidatos[7], oferta: 'Operario de depósito', fecha: '13/08/2026', estado: 'Revisado' },
                { c: candidatos[1], oferta: 'Chofer de camión', fecha: '12/08/2026', estado: 'Favorito' },
                { c: candidatos[5], oferta: 'Administrativo contable', fecha: '10/08/2026', estado: 'Nuevo' },
              ].map((row, i) => (
                <tr key={i} className="table-row">
                  <td className="table-td">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-700">
                        {row.c.nombre.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-brand-900">{row.c.nombre}</p>
                        <p className="text-xs text-slate-400">{row.c.ciudad} · {row.c.experiencia}a exp.</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-td text-slate-600">{row.oferta}</td>
                  <td className="table-td text-slate-500">{row.fecha}</td>
                  <td className="table-td">
                    <Badge tone={row.estado === 'Favorito' ? 'gold' : row.estado === 'Nuevo' ? 'brand' : 'slate'}>
                      {row.estado === 'Favorito' && <Star className="h-3 w-3" />}
                      {row.estado}
                    </Badge>
                  </td>
                  <td className="table-td">
                    <div className="flex items-center justify-end gap-1">
                      <button onClick={() => setSelected(row.c)} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-700"><Eye className="h-4 w-4" /></button>
                      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-700"><ChevronRight className="h-4 w-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-brand-950/40" onClick={() => setSelected(null)} />
          <aside className="absolute inset-y-0 right-0 w-full max-w-md overflow-y-auto bg-white shadow-soft animate-slide-in">
            <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-sm font-bold text-white">
                  {selected.nombre.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <p className="font-bold text-brand-900">{selected.nombre}</p>
                  <p className="text-xs text-slate-400">{selected.ciudad} · {selected.edad} años</p>
                </div>
              </div>
              <button onClick={() => setSelected(null)} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Cerrar"><X className="h-5 w-5" /></button>
            </div>
            <div className="space-y-5 p-5">
              <div className="flex flex-wrap gap-1.5">
                {selected.categorias.map((c) => <Badge key={c} tone="brand">{c}</Badge>)}
              </div>
              <p className="text-sm text-slate-600">{selected.resumen}</p>
              <div className="grid grid-cols-2 gap-2">
                <button className="btn-outline"><Download className="h-4 w-4" /> Descargar CV</button>
                <button className="btn-primary"><Mail className="h-4 w-4" /> Contactar</button>
              </div>
              <div className="surface p-4">
                <h3 className="mb-2 text-sm font-bold text-brand-900">Documentos</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-2.5">
                    <FileText className="h-4 w-4 text-rust-500" />
                    <span className="flex-1 text-sm text-brand-900">CV.pdf</span>
                    <Download className="h-3.5 w-3.5 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
