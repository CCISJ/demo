'use client';

import { Plus, Download, Search } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Status from '@/components/Status';
import {
  movimientosCaja,
  facturas,
  formatPesos,
  socios,
  cuotasPorAnio,
  gastosDelMes,
  totalMensualSocio,
} from '@/data/mockData';

const estadoFactura = {
  pagada: { label: 'Pagada', tone: 'neutral' as const },
  pendiente: { label: 'Pendiente', tone: 'warn' as const },
  vencida: { label: 'Vencida', tone: 'alert' as const },
};

const cuotaBase = cuotasPorAnio[cuotasPorAnio.length - 1].valor;
const gastosMes = gastosDelMes.reduce((a, g) => a + g.monto, 0);

const buscarSocio = (empresa: string) => socios.find((s) => s.empresa === empresa);

/**
 * Los importes salen del modelo, no escritos a mano: cuota vigente + gastos
 * del mes + el reintegro propio de ese socio. Así, si alguien cambia el
 * reintegro en Configuración o en la ficha, la cifra de Caja acompaña.
 */
const pagosSocios = [
  { socio: 'Distribuidora San José SRL', cuota: 'Agosto 2026', venc: '30/09/2026', estado: 'pagada' as const },
  { socio: 'Frigorífico Río Negro SA', cuota: 'Agosto 2026', venc: '30/09/2026', estado: 'pagada' as const },
  { socio: 'Farmacity San José', cuota: 'Junio 2026', venc: '31/07/2026', estado: 'vencida' as const },
  { socio: 'Transportes del Sur', cuota: 'Mayo 2026', venc: '30/06/2026', estado: 'vencida' as const },
  { socio: 'Tecnología MóvilUY', cuota: 'Agosto 2026', venc: '30/09/2026', estado: 'pendiente' as const },
].map((p) => {
  const s = buscarSocio(p.socio);
  const reintegro = s?.reintegro ?? 0;
  return {
    ...p,
    reintegro,
    monto: totalMensualSocio({ reintegro }, cuotaBase, gastosMes),
  };
});

export default function AdminCaja() {
  const ingresos = movimientosCaja.filter((m) => m.tipo === 'ingreso').reduce((a, m) => a + m.monto, 0);
  const egresos = movimientosCaja.filter((m) => m.tipo === 'egreso').reduce((a, m) => a + m.monto, 0);
  const saldo = ingresos - egresos;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Caja"
        subtitle="Agosto 2026"
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

        {/* Facturación electrónica */}
        <div className="surface flex flex-col">
          <div className="card-head">
            <h2 className="card-title">Facturas</h2>
            <span className="chip chip-gold">FEU</span>
          </div>
          <ul className="flex-1 divide-y divide-line">
            {facturas.map((f) => {
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
            <button className="btn-outline w-full">Ver todas las facturas</button>
          </div>
        </div>
      </div>

      {/* Cuotas societarias */}
      <div className="surface overflow-hidden">
        <div className="card-head">
          <h2 className="card-title">Cuotas societarias</h2>
          <span className="font-mono text-[12px] text-ink-faint">
            Base {formatPesos(cuotaBase + gastosMes)} + reintegro
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px]">
            <thead>
              <tr className="table-head">
                <th className="table-th">Socio</th>
                <th className="table-th">Cuota</th>
                <th className="table-th">Vencimiento</th>
                <th className="table-th">Estado</th>
                <th className="table-th text-right">Reintegro</th>
                <th className="table-th text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              {pagosSocios.map((p) => (
                <tr
                  key={p.socio}
                  className={`table-row ${p.estado === 'vencida' ? 'row-alert' : 'row-flag'}`}
                >
                  <td className="table-td font-medium text-ink">{p.socio}</td>
                  <td className="table-td text-ink-mute">{p.cuota}</td>
                  <td className="table-td whitespace-nowrap font-mono text-[12.5px] text-ink-mute">{p.venc}</td>
                  <td className="table-td">
                    <Status tone={estadoFactura[p.estado].tone}>{estadoFactura[p.estado].label}</Status>
                  </td>
                  {/* Sin reintegro se pone un guion, no un cero: el socio no
                      tiene el cargo, no es que le toque cero. */}
                  <td className="table-num text-ink-mute">
                    {p.reintegro ? formatPesos(p.reintegro) : '—'}
                  </td>
                  <td className="table-num font-semibold">{formatPesos(p.monto)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
