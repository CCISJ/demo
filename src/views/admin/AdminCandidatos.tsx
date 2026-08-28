'use client';

import { useState } from 'react';
import {
  Search, FileText, Award, MapPin, Clock, ChevronRight, X,
  Download, Phone, Mail, Calendar, Briefcase,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/Badge';
import EmptyState from '@/components/EmptyState';
import { candidatos, categoriasLaborales, type Candidato, type Categoria } from '@/data/mockData';

export default function AdminCandidatos() {
  const [categoria, setCategoria] = useState<Categoria | 'todas'>('todas');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Candidato | null>(null);

  const filtered = candidatos.filter((c) => {
    if (categoria !== 'todas' && !c.categorias.includes(categoria)) return false;
    if (query && !`${c.nombre} ${c.ciudad}`.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Búsqueda de candidatos"
        subtitle="Encontrá rápidamente CV según el perfil laboral que necesitás"
        actions={<button className="btn-outline"><Download className="h-4 w-4" /> Exportar listado</button>}
      />

      {/* Highlighted use case */}
      <div className="surface flex flex-col gap-4 bg-gradient-to-br from-brand-50 to-white p-5 sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-white">
          <Search className="h-6 w-6" />
        </div>
        <div className="flex-1">
          <h2 className="text-base font-bold text-brand-900">¿Necesitás cubrir un puesto urgente?</h2>
          <p className="text-sm text-slate-600">Seleccioná una categoría laboral y visualizá al instante todos los postulantes interesados en ese tipo de trabajo.</p>
        </div>
      </div>

      {/* Category selector */}
      <div>
        <p className="mb-2 text-sm font-semibold text-brand-900">Filtrar por categoría laboral</p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategoria('todas')}
            className={`chip ${categoria === 'todas' ? 'bg-brand-700 text-white ring-brand-700' : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'}`}
          >
            Todas
          </button>
          {categoriasLaborales.map((c) => {
            const count = candidatos.filter((ca) => ca.categorias.includes(c)).length;
            return (
              <button
                key={c}
                onClick={() => setCategoria(c)}
                className={`chip ${categoria === c ? 'bg-brand-700 text-white ring-brand-700' : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'}`}
              >
                {c}
                <span className={`rounded-full px-1.5 text-[10px] ${categoria === c ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search + filters */}
      <div className="surface flex flex-col gap-3 p-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input className="input pl-9" placeholder="Buscar por nombre o ciudad…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      </div>

      {/* Results */}
      <p className="text-sm text-slate-500">{filtered.length} candidatos encontrados</p>

      {filtered.length === 0 ? (
        <EmptyState
          icon={<Search className="h-6 w-6" />}
          title="No hay candidatos para esta categoría"
          description="Probá con otra categoría laboral o ajustá los filtros de búsqueda."
        />
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filtered.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className="surface surface-hover group p-5 text-left"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-sm font-bold text-brand-700">
                  {c.nombre.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-brand-900">{c.nombre}</p>
                  <p className="flex items-center gap-1 text-xs text-slate-400"><MapPin className="h-3 w-3" />{c.ciudad} · {c.edad} años</p>
                </div>
                <ChevronRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" />
              </div>

              <p className="mt-3 line-clamp-2 text-xs text-slate-500">{c.resumen}</p>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {c.categorias.map((cat) => (
                  <Badge key={cat} tone="brand" variant="soft">{cat}</Badge>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-100 pt-3 text-center">
                <div>
                  <p className="flex items-center justify-center gap-1 text-xs font-bold text-brand-900"><Briefcase className="h-3 w-3" />{c.experiencia}a</p>
                  <p className="text-[10px] text-slate-400">Experiencia</p>
                </div>
                <div>
                  <p className="flex items-center justify-center gap-1 text-xs font-bold text-brand-900"><FileText className="h-3 w-3" />{c.cv ? 'Sí' : 'No'}</p>
                  <p className="text-[10px] text-slate-400">CV</p>
                </div>
                <div>
                  <p className="flex items-center justify-center gap-1 text-xs font-bold text-brand-900"><Award className="h-3 w-3" />{c.certificados}</p>
                  <p className="text-[10px] text-slate-400">Certificados</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {selected && <CandidatoDrawer candidato={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function CandidatoDrawer({ candidato, onClose }: { candidato: Candidato; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-brand-950/40" onClick={onClose} />
      <aside className="absolute inset-y-0 right-0 w-full max-w-md overflow-y-auto bg-white shadow-soft animate-slide-in">
        <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-700 text-sm font-bold text-white">
                {candidato.nombre.split(' ').map((n) => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="font-bold text-brand-900">{candidato.nombre}</p>
                <p className="text-xs text-slate-400">{candidato.id} · {candidato.edad} años · {candidato.ciudad}</p>
              </div>
            </div>
            <button onClick={onClose} className="rounded-lg p-2 text-slate-400 hover:bg-slate-100" aria-label="Cerrar"><X className="h-5 w-5" /></button>
          </div>
        </div>

        <div className="space-y-5 p-5">
          <div className="flex flex-wrap gap-1.5">
            {candidato.categorias.map((c) => <Badge key={c} tone="brand">{c}</Badge>)}
          </div>

          <p className="text-sm text-slate-600">{candidato.resumen}</p>

          <div className="grid grid-cols-2 gap-3">
            <InfoCard icon={Briefcase} label="Experiencia" value={`${candidato.experiencia} años`} />
            <InfoCard icon={Clock} label="Disponibilidad" value={candidato.disponibilidad} />
            <InfoCard icon={FileText} label="CV cargado" value={candidato.cv ? 'Disponible' : 'No cargado'} />
            <InfoCard icon={Award} label="Certificados" value={String(candidato.certificados)} />
          </div>

          <div className="surface p-4">
            <h3 className="mb-3 text-sm font-bold text-brand-900">Datos principales</h3>
            <div className="space-y-2 text-sm">
              <Row icon={Mail} label="Email" value="rodrigo.almiron@gmail.com" />
              <Row icon={Phone} label="Teléfono" value="099 452 310" />
              <Row icon={MapPin} label="Ubicación" value={candidato.ciudad} />
              <Row icon={Calendar} label="Disponibilidad" value={candidato.disponibilidad} />
            </div>
          </div>

          <div className="surface p-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-brand-900">Documentos</h3>
              <button className="text-xs font-semibold text-brand-600 hover:text-brand-800">Ver todo</button>
            </div>
            <div className="mt-3 space-y-2">
              <DocItem name="CV_Rodrigo_Almiron.pdf" />
              <DocItem name="Licencia_profesional_C4.pdf" />
              <DocItem name="Carnet_de_salud_2026.pdf" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button className="btn-outline"><Download className="h-4 w-4" /> Descargar CV</button>
            <button className="btn-primary">Contactar</button>
          </div>
        </div>
      </aside>
    </div>
  );
}

function InfoCard({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50/50 p-3">
      <div className="flex items-center gap-2 text-slate-400"><Icon className="h-3.5 w-3.5" /><span className="text-[11px] font-medium">{label}</span></div>
      <p className="mt-1 text-sm font-bold text-brand-900">{value}</p>
    </div>
  );
}

function Row({ icon: Icon, label, value }: { icon: typeof Mail; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="h-4 w-4 text-slate-400" />
      <span className="text-xs text-slate-400">{label}</span>
      <span className="ml-auto text-sm font-medium text-brand-900">{value}</span>
    </div>
  );
}

function DocItem({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-slate-100 p-2.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rust-50 text-rust-600"><FileText className="h-4 w-4" /></div>
      <span className="flex-1 text-sm text-brand-900">{name}</span>
      <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><Download className="h-3.5 w-3.5" /></button>
    </div>
  );
}
