'use client';

import { useState } from 'react';
import {
  Search, Plus, Filter, Download, MoreHorizontal, ChevronRight, X,
  Users, Mail, Phone, Calendar, FileText,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/Badge';
import { socios, type Socio } from '@/data/mockData';

export default function AdminSocios() {
  const [tipo, setTipo] = useState<'todos' | 'comun' | 'directivo'>('todos');
  const [estado, setEstado] = useState<'todos' | 'activo' | 'inactivo'>('todos');
  const [pago, setPago] = useState<'todos' | 'al-dia' | 'deudor'>('todos');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Socio | null>(null);

  const filtered = socios.filter((s) => {
    if (tipo !== 'todos' && s.tipo !== tipo) return false;
    if (estado !== 'todos' && s.estado !== estado) return false;
    if (pago !== 'todos' && s.pago !== pago) return false;
    if (query && !`${s.empresa} ${s.contacto} ${s.rut}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  const counts = {
    total: socios.length,
    activos: socios.filter((s) => s.estado === 'activo').length,
    deudores: socios.filter((s) => s.pago === 'deudor').length,
    directivos: socios.filter((s) => s.tipo === 'directivo').length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestión de socios"
        subtitle="Administración de empresas socias del CCISJ"
        actions={
          <>
            <button className="btn-outline"><Download className="h-4 w-4" /> Exportar</button>
            <button className="btn-primary"><Plus className="h-4 w-4" /> Agregar socio</button>
          </>
        }
      />

      {/* Summary chips */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Total socios', value: counts.total, tone: 'brand' as const },
          { label: 'Activos', value: counts.activos, tone: 'jad' as const },
          { label: 'Con deuda', value: counts.deudores, tone: 'rust' as const },
          { label: 'Directivos', value: counts.directivos, tone: 'gold' as const },
        ].map((c) => (
          <div key={c.label} className="surface flex items-center gap-3 p-4">
            <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${
              c.tone === 'brand' ? 'bg-brand-50 text-brand-600' :
              c.tone === 'jad' ? 'bg-jad-50 text-jad-600' :
              c.tone === 'rust' ? 'bg-rust-50 text-rust-600' : 'bg-gold-50 text-gold-600'
            }`}>
              <Users className="h-4 w-4" />
            </span>
            <div>
              <p className="text-lg font-bold text-brand-900">{c.value}</p>
              <p className="text-xs text-slate-500">{c.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="surface p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              className="input pl-9"
              placeholder="Buscar por empresa, contacto o RUT…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <FilterPill label="Tipo" value={tipo} onChange={(v) => setTipo(v as typeof tipo)} options={[['todos', 'Todos'], ['comun', 'Común'], ['directivo', 'Directivo']]} />
            <FilterPill label="Estado" value={estado} onChange={(v) => setEstado(v as typeof estado)} options={[['todos', 'Todos'], ['activo', 'Activo'], ['inactivo', 'Inactivo']]} />
            <FilterPill label="Pago" value={pago} onChange={(v) => setPago(v as typeof pago)} options={[['todos', 'Todos'], ['al-dia', 'Al día'], ['deudor', 'Deudor']]} />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead className="bg-slate-50/60">
              <tr>
                <th className="table-th">Empresa</th>
                <th className="table-th">RUT</th>
                <th className="table-th">Tipo</th>
                <th className="table-th">Contacto</th>
                <th className="table-th">Estado</th>
                <th className="table-th">Pago</th>
                <th className="table-th">Último pago</th>
                <th className="table-th text-right">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr key={s.id} className="table-row">
                  <td className="table-td">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-50 text-xs font-bold text-brand-700">
                        {s.empresa.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-semibold text-brand-900">{s.empresa}</p>
                        <p className="text-xs text-slate-400">{s.categoria}</p>
                      </div>
                    </div>
                  </td>
                  <td className="table-td font-mono text-xs text-slate-500">{s.rut}</td>
                  <td className="table-td">
                    <Badge tone={s.tipo === 'directivo' ? 'gold' : 'slate'}>
                      {s.tipo === 'directivo' ? 'Directivo' : 'Común'}
                    </Badge>
                  </td>
                  <td className="table-td">
                    <p className="font-medium text-brand-900">{s.contacto}</p>
                    <p className="text-xs text-slate-400">{s.email}</p>
                  </td>
                  <td className="table-td">
                    <Badge tone={s.estado === 'activo' ? 'jad' : 'rust'}>
                      {s.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </Badge>
                  </td>
                  <td className="table-td">
                    <Badge tone={s.pago === 'al-dia' ? 'jad' : 'rust'}>
                      {s.pago === 'al-dia' ? 'Al día' : 'Deudor'}
                    </Badge>
                  </td>
                  <td className="table-td text-slate-500">{s.ultimoPago}</td>
                  <td className="table-td">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        onClick={() => setSelected(s)}
                        className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-700"
                        aria-label="Ver detalle"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </button>
                      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-700" aria-label="Más">
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-5 py-10 text-center text-sm text-slate-500">
            No se encontraron socios con los filtros seleccionados.
          </div>
        )}
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
          <span>Mostrando {filtered.length} de {socios.length} socios</span>
          <div className="flex items-center gap-1">
            <button className="btn-ghost px-2 py-1 text-xs">Anterior</button>
            <button className="rounded-lg bg-brand-50 px-2.5 py-1 text-xs font-semibold text-brand-700">1</button>
            <button className="btn-ghost px-2 py-1 text-xs">Siguiente</button>
          </div>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <SocioDetailDrawer socio={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}

function FilterPill({ label, value, onChange, options }: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="hidden text-xs font-medium text-slate-400 sm:inline">{label}:</span>
      <div className="flex rounded-lg border border-slate-200 bg-white p-0.5">
        {options.map(([val, lbl]) => (
          <button
            key={val}
            onClick={() => onChange(val)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              value === val ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:text-brand-700'
            }`}
          >
            {lbl}
          </button>
        ))}
      </div>
    </div>
  );
}

function SocioDetailDrawer({ socio, onClose }: { socio: Socio; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-brand-950/40" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 w-full max-w-md overflow-y-auto bg-white shadow-soft animate-slide-in">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-700 text-sm font-bold text-white">
              {socio.empresa.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-brand-900">{socio.empresa}</p>
              <p className="text-xs text-slate-400">{socio.id} · Socio desde {socio.adhesion}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Cerrar">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5">
          <div className="flex flex-wrap gap-2">
            <Badge tone={socio.tipo === 'directivo' ? 'gold' : 'slate'}>
              {socio.tipo === 'directivo' ? 'Socio directivo' : 'Socio común'}
            </Badge>
            <Badge tone={socio.estado === 'activo' ? 'jad' : 'rust'}>
              {socio.estado === 'activo' ? 'Activo' : 'Inactivo'}
            </Badge>
            <Badge tone={socio.pago === 'al-dia' ? 'jad' : 'rust'}>
              {socio.pago === 'al-dia' ? 'Al día' : 'Deudor'}
            </Badge>
          </div>

          <div className="mt-5 space-y-3">
            <DetailRow icon={FileText} label="RUT" value={socio.rut} mono />
            <DetailRow icon={Users} label="Categoría" value={socio.categoria} />
            <DetailRow icon={Mail} label="Email" value={socio.email} />
            <DetailRow icon={Phone} label="Teléfono" value={socio.telefono} />
            <DetailRow icon={Calendar} label="Último pago" value={socio.ultimoPago} />
          </div>

          <div className="mt-6">
            <h3 className="mb-2 text-sm font-bold text-brand-900">Contacto principal</h3>
            <div className="surface p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-brand-700">
                  {socio.contacto.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <p className="text-sm font-semibold text-brand-900">{socio.contacto}</p>
                  <p className="text-xs text-slate-400">Representante legal</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-2">
            <button className="btn-outline">Ver historial</button>
            <button className="btn-primary">Editar socio</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function DetailRow({ icon: Icon, label, value, mono }: { icon: typeof Mail; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center gap-3 border-b border-slate-50 py-2.5">
      <Icon className="h-4 w-4 text-slate-400" />
      <span className="text-xs font-medium text-slate-400">{label}</span>
      <span className={`ml-auto text-sm font-medium text-brand-900 ${mono ? 'font-mono' : ''}`}>{value}</span>
    </div>
  );
}
