'use client';

import { useState } from 'react';
import { Search, X, Download } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Status from '@/components/Status';
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
    <div className="space-y-4">
      <PageHeader
        title="Búsqueda de candidatos"
        subtitle="Postulantes por categoría laboral"
        actions={
          <button className="btn-outline">
            <Download className="h-3.5 w-3.5" strokeWidth={1.75} /> Exportar listado
          </button>
        }
      />

      {/*
        Antes esto era una grilla de tarjetas: tres por fila, ocho datos cada
        una. Para la pregunta real de esta pantalla —"necesito un chofer, quién
        hay"— una tabla se compara de un vistazo y entran todos los candidatos
        sin scrollear.
      */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            className="input pl-8"
            placeholder="Buscar por nombre o ciudad…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <select
          className="input sm:w-auto"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value as Categoria | 'todas')}
        >
          <option value="todas">Todas las categorías</option>
          {categoriasLaborales.map((c) => {
            const count = candidatos.filter((ca) => ca.categorias.includes(c)).length;
            return (
              <option key={c} value={c}>
                {c} ({count})
              </option>
            );
          })}
        </select>
      </div>

      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="border-b border-line">
                <th className="table-th">Candidato</th>
                <th className="table-th">Categorías</th>
                <th className="table-th text-right">Experiencia</th>
                <th className="table-th">Disponibilidad</th>
                <th className="table-th">CV</th>
                <th className="table-th text-right">Certificados</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="table-row cursor-pointer" onClick={() => setSelected(c)}>
                  <td className="table-td">
                    <p className="font-medium text-slate-900">{c.nombre}</p>
                    <p className="text-[12px] text-slate-400">
                      {c.ciudad} · {c.edad} años
                    </p>
                  </td>
                  <td className="table-td">
                    <div className="flex flex-wrap gap-1">
                      {c.categorias.map((cat) => (
                        <span key={cat} className="chip">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="table-num">{c.experiencia} años</td>
                  <td className="table-td text-slate-600">{c.disponibilidad}</td>
                  <td className="table-td">
                    <Status tone={c.cv ? 'neutral' : 'muted'}>{c.cv ? 'Cargado' : 'Sin CV'}</Status>
                  </td>
                  <td className="table-num">{c.certificados}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 ? (
          <div className="px-4 py-12 text-center">
            <p className="text-[13px] text-slate-500">No hay candidatos para esta categoría.</p>
            <button onClick={() => setCategoria('todas')} className="btn-link mt-1.5">
              Ver todas las categorías
            </button>
          </div>
        ) : (
          <div className="border-t border-line px-4 py-2.5 text-[12px] text-slate-400">
            {filtered.length} de {candidatos.length} candidatos
          </div>
        )}
      </div>

      {selected && <CandidatoDrawer candidato={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function CandidatoDrawer({ candidato, onClose }: { candidato: Candidato; onClose: () => void }) {
  const datos: [string, string, boolean?][] = [
    ['Experiencia', `${candidato.experiencia} años`],
    ['Disponibilidad', candidato.disponibilidad],
    ['Ubicación', candidato.ciudad],
    ['Edad', `${candidato.edad} años`],
    ['Email', 'rodrigo.almiron@gmail.com'],
    ['Teléfono', '099 452 310', true],
    ['Certificados', String(candidato.certificados), true],
  ];

  const documentos = ['CV_Rodrigo_Almiron.pdf', 'Licencia_profesional_C4.pdf', 'Carnet_de_salud_2026.pdf'];

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-slate-900/25" onClick={onClose} />
      <aside className="animate-slide-in absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-line bg-white shadow-pop">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-slate-900">{candidato.nombre}</p>
            <p className="mt-0.5 font-mono text-[12px] text-slate-400">{candidato.id}</p>
          </div>
          <button
            onClick={onClose}
            className="-mr-2 -mt-1 rounded-md p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-line px-5 py-3">
            <div className="flex flex-wrap gap-1">
              {candidato.categorias.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
            <p className="mt-2.5 text-[13px] leading-relaxed text-slate-600">{candidato.resumen}</p>
          </div>

          <dl className="px-5 py-1">
            {datos.map(([label, value, mono]) => (
              <div
                key={label}
                className="flex items-baseline justify-between gap-4 border-b border-line py-2.5 last:border-0"
              >
                <dt className="shrink-0 text-[12.5px] text-slate-400">{label}</dt>
                <dd className={`text-right text-[13px] text-slate-800 ${mono ? 'font-mono text-[12.5px]' : ''}`}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="border-t border-line px-5 py-3">
            <p className="section-label mb-2">Documentos</p>
            <ul className="space-y-1">
              {documentos.map((name) => (
                <li key={name} className="flex items-center gap-2 py-1">
                  <span className="flex-1 truncate font-mono text-[12px] text-slate-600">{name}</span>
                  <button
                    className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
                    aria-label={`Descargar ${name}`}
                  >
                    <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex shrink-0 gap-2 border-t border-line px-5 py-3">
          <button className="btn-outline flex-1">
            <Download className="h-3.5 w-3.5" strokeWidth={1.75} /> Descargar CV
          </button>
          <button className="btn-primary flex-1">Contactar</button>
        </div>
      </aside>
    </div>
  );
}
