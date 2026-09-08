'use client';

import { useState } from 'react';
import { Search, Plus, Download, X } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Status from '@/components/Status';
import {
  socios,
  cuotasPorAnio,
  gastosDelMes,
  formatPesos,
  type Socio,
} from '@/data/mockData';

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

  const hayFiltros = query !== '' || tipo !== 'todos' || estado !== 'todos' || pago !== 'todos';

  const limpiar = () => {
    setQuery('');
    setTipo('todos');
    setEstado('todos');
    setPago('todos');
  };

  const activos = socios.filter((s) => s.estado === 'activo').length;
  const deudores = socios.filter((s) => s.pago === 'deudor').length;
  const directivos = socios.filter((s) => s.tipo === 'directivo').length;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Socios"
        actions={
          <>
            <button className="btn-outline">
              <Download className="h-3.5 w-3.5" strokeWidth={1.75} /> Exportar
            </button>
            <button className="btn-primary">
              <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Agregar socio
            </button>
          </>
        }
      />

      <div className="metric-strip">
        <div className="metric">
          <p className="metric-label">Total</p>
          <p className="metric-value">{socios.length}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Activos</p>
          <p className="metric-value">{activos}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Con deuda</p>
          <p className="metric-value">{deudores}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Directivos</p>
          <p className="metric-value">{directivos}</p>
        </div>
      </div>

      {/*
        Filtros: los tres grupos de píldoras (diez botones en fila) pasaron a
        selects. Ocupan un tercio, se leen de un vistazo y escalan cuando
        mañana haya diez categorías en vez de dos.
      */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
          <input
            className="input pl-8"
            placeholder="Buscar por empresa, contacto o RUT…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <select className="input sm:w-auto" value={tipo} onChange={(e) => setTipo(e.target.value as typeof tipo)}>
          <option value="todos">Todos los tipos</option>
          <option value="comun">Común</option>
          <option value="directivo">Directivo</option>
        </select>

        <select className="input sm:w-auto" value={estado} onChange={(e) => setEstado(e.target.value as typeof estado)}>
          <option value="todos">Todos los estados</option>
          <option value="activo">Activo</option>
          <option value="inactivo">Inactivo</option>
        </select>

        <select className="input sm:w-auto" value={pago} onChange={(e) => setPago(e.target.value as typeof pago)}>
          <option value="todos">Todos los pagos</option>
          <option value="al-dia">Al día</option>
          <option value="deudor">Deudor</option>
        </select>

        {hayFiltros && (
          <button onClick={limpiar} className="btn-ghost shrink-0">
            <X className="h-3.5 w-3.5" /> Limpiar
          </button>
        )}
      </div>

      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px]">
            <thead>
              <tr className="table-head">
                <th className="table-th">Empresa</th>
                <th className="table-th">RUT</th>
                <th className="table-th">Tipo</th>
                <th className="table-th">Contacto</th>
                <th className="table-th">Estado</th>
                <th className="table-th">Cuota</th>
                <th className="table-th text-right">Último pago</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((s) => (
                <tr
                  key={s.id}
                  onClick={() => setSelected(s)}
                  className={`table-row cursor-pointer ${s.pago === 'deudor' ? 'row-alert' : 'row-flag'}`}
                >
                  <td className="table-td">
                    <p className="font-medium text-ink">{s.empresa}</p>
                    <p className="text-[12px] text-ink-faint">{s.categoria}</p>
                  </td>
                  <td className="table-td font-mono text-[12.5px] text-ink-mute">{s.rut}</td>
                  {/* Solo lo excepcional se marca: "Común" es el caso normal y
                      va como texto, "Directivo" lleva la marca institucional. */}
                  <td className="table-td">
                    {s.tipo === 'directivo' ? (
                      <span className="chip chip-gold">Directivo</span>
                    ) : (
                      <span className="text-ink-mute">Común</span>
                    )}
                  </td>
                  <td className="table-td">
                    <p className="text-ink-body">{s.contacto}</p>
                    <p className="text-[12px] text-ink-faint">{s.email}</p>
                  </td>
                  <td className="table-td">
                    <Status tone={s.estado === 'activo' ? 'neutral' : 'muted'}>
                      {s.estado === 'activo' ? 'Activo' : 'Inactivo'}
                    </Status>
                  </td>
                  <td className="table-td">
                    <Status tone={s.pago === 'al-dia' ? 'neutral' : 'alert'}>
                      {s.pago === 'al-dia' ? 'Al día' : 'Deudor'}
                    </Status>
                  </td>
                  <td className="table-num text-ink-mute">{s.ultimoPago}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center">
            <p className="text-[13px] text-ink-mute">Ningún socio coincide con esos filtros.</p>
            <button onClick={limpiar} className="btn-link mt-1.5">
              Limpiar filtros
            </button>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[12px] text-ink-faint">
            <span>
              {filtered.length} de {socios.length} socios
            </span>
            <div className="flex items-center gap-0.5">
              <button className="segment-item" disabled>
                Anterior
              </button>
              <button className="segment-item segment-item-active">1</button>
              <button className="segment-item" disabled>
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>

      {selected && <SocioDetailDrawer socio={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function SocioDetailDrawer({ socio, onClose }: { socio: Socio; onClose: () => void }) {
  const cuotaBase = cuotasPorAnio[cuotasPorAnio.length - 1].valor;
  const gastosMes = gastosDelMes.reduce((a, g) => a + g.monto, 0);
  const [reintegro, setReintegro] = useState(socio.reintegro ?? 0);

  const datos: [string, string, boolean?][] = [
    ['RUT', socio.rut, true],
    ['Categoría', socio.categoria],
    ['Tipo de socio', socio.tipo === 'directivo' ? 'Directivo' : 'Común'],
    ['Socio desde', socio.adhesion],
    ['Contacto', socio.contacto],
    ['Email', socio.email],
    ['Teléfono', socio.telefono, true],
    ['Último pago', socio.ultimoPago, true],
  ];

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-chrome/30" onClick={onClose} />
      <aside className="animate-slide-in absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-line bg-surface shadow-pop">
        <div className="flex shrink-0 items-start justify-between gap-3 border-b border-line px-5 py-4">
          <div className="min-w-0">
            <p className="truncate text-[15px] font-semibold text-ink">{socio.empresa}</p>
            <p className="mt-0.5 font-mono text-[12px] text-ink-faint">{socio.id}</p>
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
          <Status tone={socio.estado === 'activo' ? 'neutral' : 'muted'}>
            {socio.estado === 'activo' ? 'Activo' : 'Inactivo'}
          </Status>
          <Status tone={socio.pago === 'al-dia' ? 'neutral' : 'alert'}>
            {socio.pago === 'al-dia' ? 'Cuota al día' : 'Cuota vencida'}
          </Status>
        </div>

        <div className="flex-1 overflow-y-auto">
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

          {/*
            El reintegro se edita desde acá, que es donde el administrativo
            está mirando al socio. La cuota y los gastos son iguales para
            todos y se configuran una sola vez; esto es lo único propio de
            cada uno, así que es lo único editable en la ficha.
          */}
          <div className="card-head mt-2">
            <h3 className="card-title">Cuota del mes</h3>
          </div>
          <div className="px-5 py-3">
            <div className="flex items-baseline justify-between gap-4 py-1.5">
              <span className="text-[12.5px] text-ink-faint">Cuota vigente</span>
              <span className="font-mono text-[12.5px] text-ink-body">{formatPesos(cuotaBase)}</span>
            </div>
            <div className="flex items-baseline justify-between gap-4 py-1.5">
              <span className="text-[12.5px] text-ink-faint">Gastos del mes</span>
              <span className="font-mono text-[12.5px] text-ink-body">{formatPesos(gastosMes)}</span>
            </div>

            <div className="mt-2 border-t border-hair pt-3">
              <label className="label" htmlFor="reintegro">
                Reintegro del socio <span className="font-normal text-ink-faint">· opcional</span>
              </label>
              <div className="flex items-center gap-2">
                <span className="text-[13px] text-ink-faint">$</span>
                <input
                  id="reintegro"
                  type="number"
                  min={0}
                  step={50}
                  value={reintegro || ''}
                  placeholder="Sin reintegro"
                  onChange={(e) => setReintegro(Number(e.target.value))}
                  className="input font-mono text-[13px]"
                />
              </div>
              <p className="mt-1.5 text-[12px] text-ink-faint">
                Se suma a la cuota y se puede cambiar cuando haga falta.
              </p>
            </div>

            <div className="mt-3 flex items-baseline justify-between gap-4 border-t-2 border-chrome pt-3">
              <span className="text-[13px] font-semibold text-ink">Total del mes</span>
              <span className="font-mono text-[17px] font-semibold tabular-nums text-ink">
                {formatPesos(cuotaBase + gastosMes + reintegro)}
              </span>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 gap-2 border-t border-line px-5 py-3">
          <button className="btn-outline flex-1">Ver historial</button>
          <button className="btn-primary flex-1">Guardar cambios</button>
        </div>
      </aside>
    </div>
  );
}
