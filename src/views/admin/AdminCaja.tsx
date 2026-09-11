'use client';

import { Plus, Download, Search } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Status from '@/components/Status';
import { useNav } from '@/components/navContext';
import {
  movimientosCaja,
  facturas,
  formatPesos,
  socios,
  cuotasPorAnio,
  gastosDelMes,
  totalMensualSocio,
  periodoActual,
} from '@/data/mockData';

const estadoFactura = {
  pagada: { label: 'Pagada', tone: 'neutral' as const },
  pendiente: { label: 'Pendiente', tone: 'warn' as const },
  vencida: { label: 'Vencida', tone: 'alert' as const },
};

const cuotaBase = cuotasPorAnio[cuotasPorAnio.length - 1].valor;
const gastosMes = gastosDelMes.reduce((a, g) => a + g.monto, 0);

/**
 * La tabla sale de los socios, no de una lista escrita a mano: son los doce,
 * con el importe que le toca a cada uno —cuota vigente + gastos del mes + su
 * reintegro—. Si alguien cambia un reintegro en Configuración o en la ficha,
 * esta cifra acompaña sola.
 */
const cuotasDelMes = socios.map((s) => ({
  socio: s.empresa,
  id: s.id,
  reintegro: s.reintegro ?? 0,
  ultimoPago: s.ultimoPago,
  estado: s.pago === 'al-dia' ? ('pagada' as const) : ('vencida' as const),
  monto: totalMensualSocio(s, cuotaBase, gastosMes),
}));

const cobrado = cuotasDelMes.filter((c) => c.estado === 'pagada').reduce((a, c) => a + c.monto, 0);

export default function AdminCaja() {
  const { onNavigate } = useNav();
  const ingresos = movimientosCaja.filter((m) => m.tipo === 'ingreso').reduce((a, m) => a + m.monto, 0);
  const egresos = movimientosCaja.filter((m) => m.tipo === 'egreso').reduce((a, m) => a + m.monto, 0);
  const saldo = ingresos - egresos;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Caja"
        subtitle={periodoActual.label}
        actions={
          <>
            <button className="btn-outline">
              <Download className="h-3.5 w-3.5" strokeWidth={1.75} /> Exportar
            </button>
            <button className="btn-primary">
              <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Registrar movimiento
            </button>
          </>
        }
      />

      <div className="metric-strip lg:grid-cols-3">
        <div className="metric">
          <p className="metric-label">Ingresos del período</p>
          <p className="metric-value">{formatPesos(ingresos)}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Egresos del período</p>
          <p className="metric-value">{formatPesos(egresos)}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Saldo</p>
          <p className={`metric-value ${saldo < 0 ? 'text-alert' : ''}`}>{formatPesos(saldo)}</p>
          <p className="metric-note">Caja + cuentas corrientes</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Movimientos */}
        <div className="surface overflow-hidden lg:col-span-2">
          <div className="card-head">
            <h2 className="card-title">Movimientos</h2>
            <div className="relative w-44">
              <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
              <input className="input pl-8" placeholder="Buscar…" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="table-head">
                  <th className="table-th">Fecha</th>
                  <th className="table-th">Concepto</th>
                  <th className="table-th">Cuenta</th>
                  <th className="table-th text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                {movimientosCaja.map((m) => (
                  <tr key={m.id} className="table-row">
                    <td className="table-td whitespace-nowrap font-mono text-[12.5px] text-ink-mute">{m.fecha}</td>
                    <td className="table-td font-medium text-ink">{m.concepto}</td>
                    <td className="table-td whitespace-nowrap text-ink-mute">{m.cuenta}</td>
                    <td className={`table-num ${m.tipo === 'ingreso' ? 'text-ink' : 'text-alert'}`}>
                      {m.tipo === 'ingreso' ? '+' : '−'}
                      {formatPesos(m.monto)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Facturación electrónica: un asomo, no el listado entero. El listado
            vive en su propia pantalla, que es donde se trabaja con él. */}
        <div className="surface flex flex-col">
          <div className="card-head">
            <h2 className="card-title">Últimos comprobantes</h2>
            <span className="chip chip-gold">FEU</span>
          </div>
          <ul className="flex-1 divide-y divide-line">
            {facturas.slice(0, 6).map((f) => {
              const estado = estadoFactura[f.estado];
              return (
                <li key={f.id} className="px-4 py-2.5">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="truncate text-[13px] font-medium text-ink">{f.cliente}</p>
                    <p className="shrink-0 font-mono text-[12.5px] tabular-nums text-ink">
                      {formatPesos(f.monto)}
                    </p>
                  </div>
                  <div className="mt-0.5 flex items-baseline justify-between gap-3">
                    <p className="truncate font-mono text-[11.5px] text-ink-faint">{f.numero}</p>
                    <Status tone={estado.tone} className="shrink-0 text-[12px]">
                      {estado.label}
                    </Status>
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="border-t border-line p-2.5">
            <button onClick={() => onNavigate('admin', 'facturacion')} className="btn-outline w-full">
              Ver facturación
            </button>
          </div>
        </div>
      </div>

      {/* Cuotas societarias */}
      <div className="surface overflow-hidden">
        <div className="card-head">
          <h2 className="card-title">Cuotas de {periodoActual.label.toLowerCase()}</h2>
          <span className="font-mono text-[12px] text-ink-faint">
            Base {formatPesos(cuotaBase + gastosMes)} + reintegro
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="table-head">
                <th className="table-th">Socio</th>
                <th className="table-th">Estado</th>
                <th className="table-th text-right">Último pago</th>
                <th className="table-th text-right">Reintegro</th>
                <th className="table-th text-right">Total del mes</th>
              </tr>
            </thead>
            <tbody>
              {cuotasDelMes.map((c) => (
                <tr
                  key={c.id}
                  className={`table-row ${c.estado === 'vencida' ? 'row-alert' : 'row-flag'}`}
                >
                  <td className="table-td font-medium text-ink">{c.socio}</td>
                  <td className="table-td">
                    <Status tone={estadoFactura[c.estado].tone}>
                      {c.estado === 'pagada' ? 'Cobrada' : 'Con deuda'}
                    </Status>
                  </td>
                  <td className="table-num text-ink-mute">{c.ultimoPago}</td>
                  {/* Sin reintegro se pone un guion, no un cero: el socio no
                      tiene el cargo, no es que le toque cero. */}
                  <td className="table-num text-ink-mute">
                    {c.reintegro ? formatPesos(c.reintegro) : '—'}
                  </td>
                  <td className="table-num font-semibold">{formatPesos(c.monto)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-baseline justify-between gap-3 border-t border-line bg-band px-5 py-3 text-[12.5px]">
          <span className="text-ink-mute">
            {cuotasDelMes.filter((c) => c.estado === 'pagada').length} de {cuotasDelMes.length} cobradas
          </span>
          <span className="font-mono font-semibold tabular-nums text-ink">{formatPesos(cobrado)}</span>
        </div>
      </div>
    </div>
  );
}
