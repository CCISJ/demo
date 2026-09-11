'use client';

import { useState } from 'react';
import { Plus, Trash2, Info, Save, Check, AlertTriangle, Bell, Send } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import {
  cuotasPorAnio, configCuotas, nombreMesVencimiento, formatPesos, socios,
  categoriasPorPortal,
  gastosDelMes as gastosDelMesInicial,
  notificaciones as notificacionesInicial,
  type CuotaAnual, type GastoDelMes,
  type Notificacion, type NotifCategoria, type NotifPrioridad, type NotifDestinatario,
} from '@/data/mockData';

type Tab = 'cuotas' | 'notificaciones';

/** El admin emite para todas las categorías; cada portal después ve las suyas. */
const categorias: NotifCategoria[] = categoriasPorPortal.admin;

const destLabel: Record<NotifDestinatario, string> = {
  todos: 'Todos los socios',
  directivos: 'Socios directivos',
  'no-directivos': 'Socios no directivos',
  postulantes: 'Postulantes',
};

export default function AdminConfiguracion() {
  const [tab, setTab] = useState<Tab>('cuotas');

  // ------------------------------------------------------------------
  // Cuotas
  // ------------------------------------------------------------------
  const [historial, setHistorial] = useState<CuotaAnual[]>(cuotasPorAnio);
  const anioVigente = historial[historial.length - 1].anio;
  const [valorCuota, setValorCuota] = useState(historial[historial.length - 1].valor);
  const [mesesPlazo, setMesesPlazo] = useState(configCuotas.mesesPlazo);
  const [savedCuota, setSavedCuota] = useState(false);

  const guardarCuota = () => {
    setHistorial((h) => h.map((c, i) => (i === h.length - 1 ? { ...c, valor: valorCuota } : c)));
    setSavedCuota(true);
    setTimeout(() => setSavedCuota(false), 2200);
  };

  // Gastos del mes — se suman a la cuota de cada socio (no son costos del Centro)
  const [gastos, setGastos] = useState<GastoDelMes[]>(gastosDelMesInicial);
  const [nuevoGasto, setNuevoGasto] = useState({ concepto: '', monto: '' });
  const totalGastos = gastos.reduce((a, g) => a + g.monto, 0);
  const totalPorSocio = valorCuota + totalGastos;

  const agregarGasto = () => {
    if (!nuevoGasto.concepto.trim() || !Number(nuevoGasto.monto)) return;
    setGastos((g) => [...g, { id: `G-${Date.now()}`, concepto: nuevoGasto.concepto.trim(), monto: Number(nuevoGasto.monto) }]);
    setNuevoGasto({ concepto: '', monto: '' });
  };
  const quitarGasto = (id: string) => setGastos((g) => g.filter((x) => x.id !== id));

  // Reintegros: uno por socio, opcional. Se editan acá y en la ficha del socio.
  const [reintegros, setReintegros] = useState<Record<string, number>>(() =>
    Object.fromEntries(socios.map((s) => [s.id, s.reintegro ?? 0])),
  );
  const totalReintegros = Object.values(reintegros).reduce((a, r) => a + r, 0);
  const conReintegro = Object.values(reintegros).filter((r) => r > 0).length;

  // ------------------------------------------------------------------
  // Notificaciones
  // ------------------------------------------------------------------
  const [notis, setNotis] = useState<Notificacion[]>(notificacionesInicial);
  const [form, setForm] = useState<{ titulo: string; cuerpo: string; categoria: NotifCategoria; prioridad: NotifPrioridad; destinatario: NotifDestinatario }>({
    titulo: '', cuerpo: '', categoria: 'Comunicados', prioridad: 'comun', destinatario: 'todos',
  });

  const publicar = () => {
    if (!form.titulo.trim() || !form.cuerpo.trim()) return;
    setNotis((n) => [{ id: `N-${Date.now()}`, ...form, fecha: 'Recién publicada', leida: false }, ...n]);
    setForm({ titulo: '', cuerpo: '', categoria: 'Comunicados', prioridad: 'comun', destinatario: 'todos' });
  };
  const quitarNoti = (id: string) => setNotis((n) => n.filter((x) => x.id !== id));

  return (
    <div className="space-y-4">
      {/* El rótulo es contexto, no una frase: el título de la pantalla manda. */}
      <PageHeader title="Configuración" subtitle="Sistema" />

      <div className="segment">
        {([
          ['cuotas', 'Cuotas y costos'],
          ['notificaciones', 'Notificaciones'],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`segment-item ${tab === id ? 'segment-item-active' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>

      {tab === 'cuotas' && (
        <div className="animate-fade-in space-y-4">
          {/*
            La última celda ya no puede ser "el total por socio": con el
            reintegro, ese número es distinto para cada uno. Muestra la base
            común y aclara qué le falta sumar.
          */}
          <div className="metric-strip">
            <div className="metric">
              <p className="metric-label">Cuota vigente {anioVigente}</p>
              <p className="metric-value">{formatPesos(valorCuota)}</p>
              <p className="metric-note">Fija desde enero {anioVigente}</p>
            </div>
            <div className="metric">
              <p className="metric-label">Plazo de pago</p>
              <p className="metric-value">
                {mesesPlazo} {mesesPlazo === 1 ? 'mes' : 'meses'}
              </p>
              <p className="metric-note">Enero vence fin de {nombreMesVencimiento(mesesPlazo)}</p>
            </div>
            <div className="metric">
              <p className="metric-label">Gastos del mes</p>
              <p className="metric-value">{formatPesos(totalGastos)}</p>
              <p className="metric-note">Iguales para todos los socios</p>
            </div>
            <div className="metric metric-close">
              <p className="metric-label">Base común</p>
              <p className="metric-value">{formatPesos(totalPorSocio)}</p>
              <p className="metric-note">Más el reintegro de cada socio</p>
            </div>
          </div>

          {/* Las dos reglas de la cuota se deciden juntas, así que se ven juntas. */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="surface lg:col-span-2">
              <div className="card-head">
                <h2 className="card-title">Valor de la cuota societaria</h2>
                <span className="text-[12px] text-ink-faint">Se fija una vez al año</span>
              </div>

              <div className="px-5 py-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                  <div className="sm:w-56">
                    <label className="label" htmlFor="valor-cuota">
                      Vigente desde enero {anioVigente}
                    </label>
                    <div className="relative">
                      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[13px] text-ink-faint">
                        $
                      </span>
                      <input
                        id="valor-cuota"
                        type="number"
                        className="input pl-7 font-mono"
                        value={valorCuota}
                        onChange={(e) => setValorCuota(Number(e.target.value))}
                      />
                    </div>
                  </div>
                  <button onClick={guardarCuota} className="btn-primary">
                    {savedCuota ? <Check className="h-3.5 w-3.5" /> : <Save className="h-3.5 w-3.5" />}
                    {savedCuota ? 'Guardado' : 'Guardar valor'}
                  </button>
                </div>

                <p className="mt-3 flex items-start gap-1.5 text-[12px] leading-relaxed text-ink-faint">
                  <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
                  El nuevo valor rige recién desde enero de {anioVigente + 1}. El año en curso no se
                  modifica hacia atrás.
                </p>
              </div>

              <table className="w-full border-t border-line">
                <thead>
                  <tr className="table-head">
                    <th className="table-th">Año</th>
                    <th className="table-th text-right">Valor de cuota</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((c, i) => (
                    <tr key={c.anio} className="table-row">
                      <td className="table-td font-medium text-ink">
                        {c.anio}
                        {i === historial.length - 1 && <span className="chip chip-gold ml-2">Vigente</span>}
                      </td>
                      <td className="table-num">{formatPesos(c.valor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="surface">
              <div className="card-head">
                <h2 className="card-title">Plazo de pago</h2>
              </div>
              <div className="px-5 py-4">
                <label className="label" htmlFor="meses-plazo">
                  Meses de plazo tras el mes de la cuota
                </label>
                <input
                  id="meses-plazo"
                  type="number"
                  min={0}
                  max={3}
                  className="input font-mono"
                  value={mesesPlazo}
                  onChange={(e) => setMesesPlazo(Math.max(0, Math.min(3, Number(e.target.value))))}
                />
                <p className="mt-3 border-t border-hair pt-3 text-[12.5px] leading-relaxed text-ink-mute">
                  La cuota de <span className="font-medium text-ink">enero</span> vence a fin de{' '}
                  <span className="font-medium text-ink">{nombreMesVencimiento(mesesPlazo)}</span>.
                </p>
              </div>
            </div>
          </div>

          {/* Gastos del mes */}
          <div className="surface">
            <div className="card-head">
              <h2 className="card-title">Gastos del mes</h2>
              <span className="font-mono text-[12px] text-ink-faint">{formatPesos(totalGastos)} por socio</span>
            </div>

            <p className="max-w-3xl px-5 py-3 text-[13px] leading-relaxed text-ink-mute">
              Cargos que se <strong className="font-semibold text-ink">suman a la cuota</strong> de cada
              socio ese mes. No son gastos propios del Centro: son iguales para todos y se cobran junto
              con la cuota.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[420px]">
                <thead>
                  <tr className="table-head">
                    <th className="table-th">Concepto</th>
                    <th className="table-th text-right">Monto por socio</th>
                    <th className="table-th w-10" />
                  </tr>
                </thead>
                <tbody>
                  {gastos.map((g) => (
                    <tr key={g.id} className="table-row">
                      <td className="table-td font-medium text-ink">{g.concepto}</td>
                      <td className="table-td text-right">
                        <input
                          type="number"
                          className="input py-1.5 text-right"
                          value={g.monto}
                          onChange={(e) => setGastos((gs) => gs.map((x) => (x.id === g.id ? { ...x, monto: Number(e.target.value) } : x)))}
                        />
                      </td>
                      <td className="table-td text-right">
                        <button onClick={() => quitarGasto(g.id)} className="p-1.5 text-ink-faint hover:bg-alert-tint hover:text-alert" aria-label="Quitar gasto">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {gastos.length === 0 && (
                    <tr><td colSpan={3} className="table-td text-center text-ink-faint">Sin gastos adicionales este mes.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col gap-2 border-t border-line px-5 py-4 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="label" htmlFor="gasto-concepto">Nuevo concepto</label>
                <input
                  id="gasto-concepto"
                  className="input"
                  placeholder="Ej: Seguro de sede"
                  value={nuevoGasto.concepto}
                  onChange={(e) => setNuevoGasto({ ...nuevoGasto, concepto: e.target.value })}
                />
              </div>
              <div className="sm:w-40">
                <label className="label" htmlFor="gasto-monto">Monto por socio</label>
                <input
                  id="gasto-monto"
                  type="number"
                  className="input font-mono"
                  placeholder="0"
                  value={nuevoGasto.monto}
                  onChange={(e) => setNuevoGasto({ ...nuevoGasto, monto: e.target.value })}
                />
              </div>
              <button onClick={agregarGasto} className="btn-outline">
                <Plus className="h-3.5 w-3.5" /> Agregar
              </button>
            </div>

            <div className="flex items-baseline justify-between gap-3 border-t border-line bg-band px-5 py-3 text-[12.5px]">
              <span className="text-ink-mute">
                Cuota {formatPesos(valorCuota)} + gastos {formatPesos(totalGastos)}
              </span>
              <span className="font-mono font-semibold tabular-nums text-ink">
                {formatPesos(totalPorSocio)} de base por socio
              </span>
            </div>
          </div>

          {/* Reintegros: uno por socio, opcional y editable siempre */}
          <div className="surface">
            <div className="card-head">
              <h2 className="card-title">Reintegros por socio</h2>
              <span className="text-[12px] text-ink-faint">
                {conReintegro} de {socios.length} socios
              </span>
            </div>

            <p className="max-w-3xl px-5 py-3 text-[13px] leading-relaxed text-ink-mute">
              El reintegro es un cargo propio de cada socio que se <strong className="font-semibold text-ink">suma</strong> a
              la cuota del mes. Es opcional —no todos lo tienen— y se puede editar en cualquier momento,
              a diferencia de la cuota, que se fija una vez al año.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[620px]">
                <thead className="table-head">
                  <tr>
                    <th className="table-th">Socio</th>
                    <th className="table-th">Cuota + gastos</th>
                    <th className="table-th">Reintegro</th>
                    <th className="table-th text-right">Total del mes</th>
                  </tr>
                </thead>
                <tbody>
                  {socios.map((s) => {
                    const reintegro = reintegros[s.id] ?? 0;
                    return (
                      <tr key={s.id} className="table-row row-flag">
                        <td className="table-td">
                          <p className="font-medium text-ink">{s.empresa}</p>
                          <p className="font-mono text-[11.5px] text-ink-faint">{s.id}</p>
                        </td>
                        <td className="table-td font-mono text-[12.5px] text-ink-mute">
                          {formatPesos(valorCuota + totalGastos)}
                        </td>
                        <td className="table-td">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[12.5px] text-ink-faint">$</span>
                            <input
                              type="number"
                              min={0}
                              step={50}
                              value={reintegro || ''}
                              placeholder="Sin reintegro"
                              onChange={(e) =>
                                setReintegros({ ...reintegros, [s.id]: Number(e.target.value) })
                              }
                              className="input w-36 py-1 font-mono text-[12.5px]"
                            />
                          </div>
                        </td>
                        <td className="table-num font-semibold">
                          {formatPesos(valorCuota + totalGastos + reintegro)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="flex items-center justify-between border-t border-line bg-band px-5 py-3">
              <span className="text-[12.5px] text-ink-mute">Suma de reintegros del mes</span>
              <span className="font-mono text-[14px] font-semibold tabular-nums text-ink">
                {formatPesos(totalReintegros)}
              </span>
            </div>
          </div>
        </div>
      )}

      {tab === 'notificaciones' && (
        <div className="animate-fade-in grid grid-cols-1 gap-4 lg:grid-cols-3">
          {/* Compose */}
          <div className="surface lg:col-span-1">
            <div className="card-head">
              <h2 className="card-title">Nueva notificación</h2>
            </div>

            <div className="space-y-4 px-5 py-4">
              <div>
                <label className="label">Título</label>
                <input className="input" placeholder="Ej: Corte de suministro eléctrico" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
              </div>
              <div>
                <label className="label">Mensaje</label>
                <textarea className="input min-h-[88px] resize-none" placeholder="Detalle de la notificación…" value={form.cuerpo} onChange={(e) => setForm({ ...form, cuerpo: e.target.value })} />
              </div>
              <div>
                <label className="label">Categoría</label>
                <select className="input" value={form.categoria} onChange={(e) => setForm({ ...form, categoria: e.target.value as NotifCategoria })}>
                  {categorias.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Dos opciones excluyentes: el mismo control segmentado que el
                  resto del sistema, no píldoras redondeadas de otro juego. */}
              <div>
                <label className="label">Prioridad</label>
                <div className="segment w-full">
                  <button
                    onClick={() => setForm({ ...form, prioridad: 'comun' })}
                    className={`segment-item flex flex-1 items-center justify-center gap-1.5 ${
                      form.prioridad === 'comun' ? 'segment-item-active' : ''
                    }`}
                  >
                    <Bell className="h-3.5 w-3.5" strokeWidth={1.75} /> Común
                  </button>
                  <button
                    onClick={() => setForm({ ...form, prioridad: 'emergente' })}
                    className={`segment-item flex flex-1 items-center justify-center gap-1.5 ${
                      form.prioridad === 'emergente' ? 'bg-alert font-semibold text-white hover:text-white' : ''
                    }`}
                  >
                    <AlertTriangle className="h-3.5 w-3.5" strokeWidth={1.75} /> Emergente
                  </button>
                </div>
              </div>

              <div>
                <label className="label">Destinatario</label>
                <div className="border border-edge">
                  {(['todos', 'directivos', 'no-directivos'] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setForm({ ...form, destinatario: d })}
                      className={`flex w-full items-center justify-between border-b border-hair px-3 py-2 text-left text-[12.5px] transition-colors last:border-b-0 ${
                        form.destinatario === d
                          ? 'border-l-2 border-l-gold-500 bg-band pl-2 font-medium text-ink'
                          : 'text-ink-mute hover:bg-band'
                      }`}
                    >
                      {destLabel[d]}
                      {form.destinatario === d && <Check className="h-3.5 w-3.5 text-brand-700" />}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={publicar}
                disabled={!form.titulo.trim() || !form.cuerpo.trim()}
                className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Send className="h-3.5 w-3.5" /> Publicar notificación
              </button>
            </div>
          </div>

          {/* List */}
          <div className="surface lg:col-span-2">
            <div className="card-head">
              <h2 className="card-title">Notificaciones publicadas</h2>
              <span className="text-[12px] text-ink-faint">{notis.length} en total</span>
            </div>
            <div className="divide-y divide-hair">
              {notis.map((n) => {
                const urgente = n.prioridad === 'emergente';
                return (
                  <div
                    key={n.id}
                    className={`relative flex items-start gap-3 px-4 py-3 ${
                      urgente ? 'before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-alert' : ''
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[13px] font-medium text-ink">{n.titulo}</p>
                      <p className="mt-0.5 text-[13px] leading-relaxed text-ink-mute">{n.cuerpo}</p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[12px] text-ink-faint">
                        {urgente && <span className="chip chip-alert">Emergente</span>}
                        <span>{n.categoria}</span>
                        <span className="text-ink-ghost">·</span>
                        <span>{destLabel[n.destinatario]}</span>
                        <span className="text-ink-ghost">·</span>
                        <span>{n.fecha}</span>
                      </div>
                    </div>
                    <button onClick={() => quitarNoti(n.id)} className="p-1.5 text-ink-faint hover:bg-alert-tint hover:text-alert" aria-label="Eliminar notificación">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                );
              })}
              {notis.length === 0 && (
                <div className="px-5 py-10 text-center text-sm text-ink-mute">No hay notificaciones publicadas.</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
