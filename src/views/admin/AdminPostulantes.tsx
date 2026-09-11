'use client';

import { useState } from 'react';
import { Search, Download, X, FileText } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Status from '@/components/Status';
import {
  candidatos,
  categoriasLaborales,
  postulaciones,
  type Candidato,
} from '@/data/mockData';

/**
 * Padrón de postulantes.
 *
 * No se superpone con "Búsqueda de candidatos": aquella pantalla se abre
 * cuando hay un puesto que cubrir y se filtra por lo que el puesto necesita.
 * Esta es el registro: quién está dado de alta, si tiene el CV cargado y si
 * sigue usando el portal. Es la vista del administrativo, no la del que busca.
 */
export default function AdminPostulantes() {
  const [query, setQuery] = useState('');
  const [categoria, setCategoria] = useState('todas');
  const [cv, setCv] = useState<'todos' | 'con' | 'sin'>('todos');
  const [estado, setEstado] = useState<'todos' | 'activo' | 'inactivo'>('todos');
  const [selected, setSelected] = useState<Candidato | null>(null);

  const filtered = candidatos.filter((c) => {
    if (categoria !== 'todas' && !c.categorias.includes(categoria as never)) return false;
    if (cv === 'con' && !c.cv) return false;
    if (cv === 'sin' && c.cv) return false;
    if (estado !== 'todos' && c.estado !== estado) return false;
    if (query && !`${c.nombre} ${c.documento} ${c.email} ${c.ciudad}`.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    return true;
  });

  const hayFiltros = query !== '' || categoria !== 'todas' || cv !== 'todos' || estado !== 'todos';
  const limpiar = () => {
    setQuery('');
    setCategoria('todas');
    setCv('todos');
    setEstado('todos');
  };

  const conCv = candidatos.filter((c) => c.cv).length;
  const sinCv = candidatos.length - conCv;
  const enviadas = candidatos.reduce((a, c) => a + c.postulacionesEnviadas, 0);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Postulantes"
        subtitle="Padrón del Centro"
        actions={
          <button className="btn-outline">
            <Download className="h-3.5 w-3.5" strokeWidth={1.75} /> Exportar padrón
          </button>
        }
      />

      <div className="metric-strip">
        <div className="metric">
          <p className="metric-label">Registrados</p>
          <p className="metric-value">{candidatos.length}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Con CV cargado</p>
          <p className="metric-value">{conCv}</p>
          <p className="metric-note">{sinCv} sin completar</p>
        </div>
        <div className="metric">
          <p className="metric-label">Postulaciones enviadas</p>
          <p className="metric-value">{enviadas}</p>
          <p className="metric-note">Acumulado histórico</p>
        </div>
        <div className="metric">
          <p className="metric-label">En proceso</p>
          <p className="metric-value">{postulaciones.filter((p) => p.estado === 'revision').length}</p>
          <p className="metric-note">Postulaciones en revisión</p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
          <input
            className="input pl-8"
            placeholder="Buscar por nombre, documento, email o localidad…"
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

        <select className="input sm:w-auto" value={cv} onChange={(e) => setCv(e.target.value as typeof cv)}>
          <option value="todos">CV: todos</option>
          <option value="con">Con CV</option>
          <option value="sin">Sin CV</option>
        </select>

        <select className="input sm:w-auto" value={estado} onChange={(e) => setEstado(e.target.value as typeof estado)}>
          <option value="todos">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        {hayFiltros && (
          <button onClick={limpiar} className="btn-ghost shrink-0">
            <X className="h-3.5 w-3.5" /> Limpiar
          </button>
        )}
      </div>

      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px]">
            <thead>
              <tr className="table-head">
                <th className="table-th">Postulante</th>
                <th className="table-th">Documento</th>
                <th className="table-th">Categorías</th>
                <th className="table-th">CV</th>
                <th className="table-th">Estado</th>
                <th className="table-th text-right">Postulaciones</th>
                <th className="table-th text-right">Último acceso</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelected(c)}
                  className={`table-row cursor-pointer ${c.cv ? 'row-flag' : 'row-alert'}`}
                >
                  <td className="table-td">
                    <p className="font-medium text-ink">{c.nombre}</p>
                    <p className="text-[12px] text-ink-faint">
                      {c.ciudad} · {c.edad} años
                    </p>
                  </td>
                  <td className="table-td font-mono text-[12.5px] text-ink-mute">{c.documento}</td>
                  {/* Dos categorías alcanzan para reconocer el perfil; el resto
                      se cuenta, que es más corto de leer que enumerarlo. */}
                  <td className="table-td">
                    <div className="flex flex-wrap items-center gap-1">
                      {c.categorias.slice(0, 2).map((cat) => (
                        <span key={cat} className="chip">
                          {cat}
                        </span>
                      ))}
                      {c.categorias.length > 2 && (
                        <span className="text-[12px] text-ink-faint">+{c.categorias.length - 2}</span>
                      )}
                    </div>
                  </td>
                  <td className="table-td">
                    <Status tone={c.cv ? 'neutral' : 'alert'}>{c.cv ? 'Cargado' : 'Sin CV'}</Status>
                  </td>
                  <td className="table-td">
                    <Status tone={c.estado === 'activo' ? 'neutral' : 'muted'}>
                      {c.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </Status>
                  </td>
                  <td className="table-num">{c.postulacionesEnviadas}</td>
                  <td className="table-num text-ink-mute">{c.ultimoAcceso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center">
            <p className="text-[13px] text-ink-mute">Ningún postulante coincide con esos filtros.</p>
            <button onClick={limpiar} className="btn-link mt-1.5">
              Limpiar filtros
            </button>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="border-t border-line px-4 py-2.5 text-[12px] text-ink-faint">
            {filtered.length} de {candidatos.length} postulantes
          </div>
        )}
      </div>

      {selected && <PostulanteDrawer postulante={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function PostulanteDrawer({ postulante, onClose }: { postulante: Candidato; onClose: () => void }) {
  const suyas = postulaciones.filter((p) => p.categoria && postulante.categorias.includes(p.categoria as never));

  const datos: [string, string, boolean?][] = [
    ['Documento', postulante.documento, true],
    ['Edad', `${postulante.edad} años`],
    ['Localidad', postulante.ciudad],
    ['Email', postulante.email],
    ['Teléfono', postulante.telefono, true],
    ['Experiencia', `${postulante.experiencia} años`],
    ['Disponibilidad', postulante.disponibilidad],
    ['Alta en el padrón', postulante.registro, true],
    ['Último acceso', postulante.ultimoAcceso, true],
  ];

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-chrome/30" onClick={onClose} />
      <aside className="animate-slide-in absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-line bg-surface shadow-pop">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-ink">{postulante.nombre}</p>
            <p className="mt-0.5 font-mono text-[12px] text-ink-faint">{postulante.id}</p>
          </div>
          <button
            onClick={onClose}
            className="-mr-2 -mt-1 rounded-md p-2 text-ink-faint transition-colors hover:bg-band hover:text-ink"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-4 border-b border-line px-5 py-3">
          <Status tone={postulante.estado === 'activo' ? 'neutral' : 'muted'}>
            {postulante.estado === 'activo' ? 'Activo' : 'Inactivo'}
          </Status>
          <Status tone={postulante.cv ? 'neutral' : 'alert'}>
            {postulante.cv ? 'CV cargado' : 'Sin CV'}
          </Status>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="border-b border-hair px-5 py-3">
            <p className="text-[13px] leading-relaxed text-ink-body">{postulante.resumen}</p>
            <div className="mt-2.5 flex flex-wrap gap-1">
              {postulante.categorias.map((c) => (
                <span key={c} className="chip">
                  {c}
                </span>
              ))}
            </div>
          </div>

          <dl className="px-5 py-1">
            {datos.map(([label, value, mono]) => (
              <div key={label} className="flex items-baseline justify-between gap-4 border-b border-hair py-2.5">
                <dt className="shrink-0 text-[12.5px] text-ink-faint">{label}</dt>
                <dd className={`text-right text-[13px] text-ink-body ${mono ? 'font-mono text-[12.5px]' : ''}`}>
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="card-head mt-2">
            <h3 className="card-title">Documentación</h3>
          </div>
          <div className="px-5 py-3">
            <div className="flex items-center justify-between gap-3 py-1.5">
              <span className="flex items-center gap-2 text-[13px] text-ink-body">
                <FileText className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />
                Currículum
              </span>
              {postulante.cv ? (
                <button className="btn-link">Ver CV</button>
              ) : (
                <span className="text-[12.5px] text-ink-faint">No cargado</span>
              )}
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-hair py-1.5 pt-2.5">
              <span className="text-[13px] text-ink-body">Certificados</span>
              <span className="font-mono text-[12.5px] text-ink-body">{postulante.certificados}</span>
            </div>
            <div className="flex items-center justify-between gap-3 border-t border-hair py-1.5 pt-2.5">
              <span className="text-[13px] text-ink-body">Postulaciones enviadas</span>
              <span className="font-mono text-[12.5px] text-ink-body">{postulante.postulacionesEnviadas}</span>
            </div>
          </div>

          {suyas.length > 0 && (
            <>
              <div className="card-head">
                <h3 className="card-title">Postulaciones recientes</h3>
              </div>
              <ul className="divide-y divide-hair px-5">
                {suyas.slice(0, 3).map((p) => (
                  <li key={p.id} className="py-2.5">
                    <p className="text-[13px] font-medium text-ink">{p.puesto}</p>
                    <p className="mt-0.5 text-[12px] text-ink-faint">
                      {p.empresa} · {p.fecha}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="flex shrink-0 gap-2 border-t border-line px-5 py-3">
          <button className="btn-outline flex-1">Descargar CV</button>
          <button className="btn-primary flex-1">Contactar</button>
        </div>
      </aside>
    </div>
  );
}
