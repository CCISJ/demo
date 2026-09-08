'use client';

import { useState } from 'react';
import {
  Wallet, CalendarClock, Receipt, Plus, Trash2, Info,
  Save, Check, AlertTriangle, Bell, GraduationCap, CalendarDays,
  Megaphone, Briefcase, Gift, Send, Clock,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/Badge';
import StatCard from '@/components/StatCard';
import {
  cuotasPorAnio, configCuotas, nombreMesVencimiento, formatPesos, socios,
  gastosDelMes as gastosDelMesInicial,
  notificaciones as notificacionesInicial,
  type CuotaAnual, type GastoDelMes,
  type Notificacion, type NotifCategoria, type NotifPrioridad, type NotifDestinatario,
} from '@/data/mockData';

type Tab = 'cuotas' | 'notificaciones';

const categorias: NotifCategoria[] = ['Capacitaciones', 'Eventos', 'Comunicados', 'Bolsa de trabajo', 'Beneficios para socios'];

const catIcon: Record<NotifCategoria, typeof Bell> = {
  Capacitaciones: GraduationCap,
  Eventos: CalendarDays,
  Comunicados: Megaphone,
  'Bolsa de trabajo': Briefcase,
  'Beneficios para socios': Gift,
};

const catTone: Record<NotifCategoria, 'brand' | 'gold' | 'jad' | 'sol' | 'rust' | 'slate'> = {
  Capacitaciones: 'brand',
  Eventos: 'gold',
  Comunicados: 'slate',
  'Bolsa de trabajo': 'jad',
  'Beneficios para socios': 'sol',
};

const destTone: Record<NotifDestinatario, 'brand' | 'gold' | 'slate'> = {
  todos: 'brand',
  directivos: 'gold',
  'no-directivos': 'slate',
};

const destLabel: Record<NotifDestinatario, string> = {
  todos: 'Todos los socios',
  directivos: 'Socios directivos',
  'no-directivos': 'Socios no directivos',
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
    <div className="space-y-6">
      <PageHeader
        title="Configuración"
        subtitle="Cuotas, costos y notificaciones del CCISJ — todo editable desde un mismo lugar."
      />

      {/* Tabs */}
      <div className="segment">
        {([
          ['cuotas', 'Cuotas y costos', Wallet],
          ['notificaciones', 'Notificaciones', Bell],
        ] as const).map(([id, label, Icon]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`segment-item ${
              tab === id ? 'segment-item-active' : ''
            }`}
          >
            
            {label}
          </button>
        ))}
      </div>

      {tab === 'cuotas' && (
        <div className="space-y-6 animate-fade-in">
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

          {/* Valor de cuota */}
          <div className="surface p-5">
            <div className="flex items-start gap-3">
              <div>
                <h2 className="card-title">Valor de la cuota societaria</h2>
                <p className="mt-0.5 text-sm text-ink-mute">
                  El valor se fija una única vez al año, en enero, y rige durante los 12 meses siguientes sin cambios.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-end">
              <div className="sm:w-64">
                <label className="label">Valor de cuota — vigente desde enero {anioVigente}</label>
                <div className="relative">
                  <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-ink-faint">$</span>
                  <input
                    type="number"
                    className="input pl-7"
                    value={valorCuota}
                    onChange={(e) => setValorCuota(Number(e.target.value))}
                  />
                </div>
              </div>
              <button onClick={guardarCuota} className="btn-primary">
                {savedCuota ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                {savedCuota ? 'Guardado' : 'Guardar valor'}
              </button>
              <p className="flex items-start gap-1.5 text-xs text-ink-faint sm:max-w-xs">
                <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                El nuevo valor regirá recién a partir de enero de {anioVigente + 1}; el año en curso no se modifica retroactivamente.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto rounded-xl border border-hair">
              <table className="w-full min-w-[320px]">
                <thead className="bg-band/60">
                  <tr>
                    <th className="table-th">Año</th>
                    <th className="table-th text-right">Valor de cuota</th>
                  </tr>
                </thead>
                <tbody>
                  {historial.map((c, i) => (
                    <tr key={c.anio} className="table-row">
                      <td className="table-td font-medium text-brand-900">
                        {c.anio}
                        {i === historial.length - 1 && <span className="chip chip-brand ml-2">Vigente</span>}
                      </td>
                      <td className="table-td text-right font-medium text-ink">{formatPesos(c.valor)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Plazo de pago */}
          <div className="surface p-5">
            <div className="flex items-start gap-3">
              <div>
                <h2 className="card-title">Plazo de pago de cuotas</h2>
                <p className="mt-0.5 text-sm text-ink-mute">
                  La cuota de un mes se abona durante ese mes y tiene plazo adicional hasta fin del período siguiente.
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="sm:w-56">
                <label className="label">Meses de plazo luego del mes de la cuota</label>
                <input
                  type="number"
                  min={0}
                  max={3}
                  className="input"
                  value={mesesPlazo}
                  onChange={(e) => setMesesPlazo(Math.max(0, Math.min(3, Number(e.target.value))))}
                />
              </div>
              <div className="rounded-md border border-line px-3 py-2 text-[12.5px] text-ink-mute">
                Ejemplo: la cuota de <span className="font-semibold text-brand-900">enero</span> vence a fin de{' '}
                <span className="font-semibold text-brand-900">{nombreMesVencimiento(mesesPlazo)}</span>.
              </div>
            </div>
          </div>

          {/* Gastos del mes */}
          <div className="surface p-5">
            <div className="flex items-start gap-3">
              <div>
                <h2 className="card-title">Gastos del mes</h2>
                <p className="mt-0.5 max-w-2xl text-sm text-ink-mute">
                  Cargos adicionales que se <span className="font-medium text-brand-800">suman a la cuota societaria</span> de
                  cada socio ese mes (no son gastos propios del Centro). Se pueden agregar, editar o quitar.
                </p>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto rounded-xl border border-hair">
              <table className="w-full min-w-[420px]">
                <thead className="bg-band/60">
                  <tr>
                    <th className="table-th">Concepto</th>
                    <th className="table-th text-right">Monto por socio</th>
                    <th className="table-th w-10" />
                  </tr>
                </thead>
                <tbody>
                  {gastos.map((g) => (
                    <tr key={g.id} className="table-row">
                      <td className="table-td font-medium text-brand-900">{g.concepto}</td>
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
                  <tr className="border-t border-hair bg-band/40">
                    <td className="table-td font-medium text-ink">Total gastos del mes</td>
                    <td className="table-td text-right font-medium text-ink">{formatPesos(totalGastos)}</td>
                    <td className="table-td" />
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="label">Nuevo concepto</label>
                <input className="input" placeholder="Ej: Seguro de sede" value={nuevoGasto.concepto} onChange={(e) => setNuevoGasto({ ...nuevoGasto, concepto: e.target.value })} />
              </div>
              <div className="sm:w-40">
                <label className="label">Monto por socio</label>
                <input type="number" className="input" placeholder="0" value={nuevoGasto.monto} onChange={(e) => setNuevoGasto({ ...nuevoGasto, monto: e.target.value })} />
              </div>
              <button onClick={agregarGasto} className="btn-outline"><Plus className="h-4 w-4" /> Agregar</button>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-line pt-3 text-[13px]">
              <span className="text-brand-800">Cuota ({formatPesos(valorCuota)}) + gastos del mes ({formatPesos(totalGastos)})</span>
              <span className="card-title">= {formatPesos(totalPorSocio)} por socio</span>
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
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 animate-fade-in">
          {/* Compose */}
          <div className="surface p-6 lg:col-span-1">
            <div className="flex items-center gap-2">
              <Send className="h-4 w-4 text-brand-600" />
              <h2 className="card-title">Nueva notificación</h2>
            </div>
            <p className="mt-1 text-xs text-ink-mute">Elegí prioridad y destinatario antes de publicar.</p>

            <div className="mt-4 space-y-4">
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

              <div>
                <label className="label">Prioridad</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setForm({ ...form, prioridad: 'comun' })}
                    className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold ring-1 transition-all ${
                      form.prioridad === 'comun' ? 'bg-brand-700 text-white ring-brand-700' : 'bg-white text-ink-mute ring-line hover:bg-band'
                    }`}
                  >
                    <Bell className="h-4 w-4" /> Común
                  </button>
                  <button
                    onClick={() => setForm({ ...form, prioridad: 'emergente' })}
                    className={`flex items-center justify-center gap-1.5 rounded-xl px-3 py-2.5 text-sm font-semibold ring-1 transition-all ${
                      form.prioridad === 'emergente' ? 'bg-alert text-white ring-alert' : 'bg-surface text-ink-mute ring-line hover:bg-band'
                    }`}
                  >
                    <AlertTriangle className="h-4 w-4" /> Emergente
                  </button>
                </div>
              </div>

              <div>
                <label className="label">Destinatario</label>
                <div className="grid grid-cols-1 gap-2">
                  {(['todos', 'directivos', 'no-directivos'] as const).map((d) => (
                    <button
                      key={d}
                      onClick={() => setForm({ ...form, destinatario: d })}
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium ring-1 transition-all ${
                        form.destinatario === d ? 'bg-brand-50 text-brand-800 ring-brand-200' : 'bg-white text-ink-mute ring-line hover:bg-band'
                      }`}
                    >
                      {destLabel[d]}
                      {form.destinatario === d && <Check className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={publicar} disabled={!form.titulo.trim() || !form.cuerpo.trim()} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-40">
                <Send className="h-4 w-4" /> Publicar notificación
              </button>
            </div>
          </div>

          {/* List */}
          <div className="surface lg:col-span-2">
            <div className="flex items-center justify-between border-b border-hair px-5 py-4">
              <h2 className="card-title">Notificaciones publicadas</h2>
              <span className="text-[12px] text-ink-faint">{notis.length} en total</span>
            </div>
            <div className="divide-y divide-hair">
              {notis.map((n) => {
                const Icon = catIcon[n.categoria];
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
