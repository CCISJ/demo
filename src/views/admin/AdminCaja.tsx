'use client';

import {
  Wallet, TrendingUp, TrendingDown, Plus, Download, ArrowUpRight,
  FileText, Search,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/Badge';
import StatCard from '@/components/StatCard';
import { movimientosCaja, facturas, formatPesos } from '@/data/mockData';

export default function AdminCaja() {
  const ingresos = movimientosCaja.filter((m) => m.tipo === 'ingreso').reduce((a, m) => a + m.monto, 0);
  const egresos = movimientosCaja.filter((m) => m.tipo === 'egreso').reduce((a, m) => a + m.monto, 0);
  const saldo = ingresos - egresos;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Caja"
        subtitle="Movimientos, saldos y facturación del período · Agosto 2026"
        actions={
          <>
            <button className="btn-outline"><Download className="h-4 w-4" /> Exportar</button>
            <button className="btn-primary"><Plus className="h-4 w-4" /> Registrar movimiento</button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Ingresos del período" value={formatPesos(ingresos)} icon={TrendingUp} tone="jad" trend={{ value: '+12%', up: true }} />
        <StatCard label="Egresos del período" value={formatPesos(egresos)} icon={TrendingDown} tone="rust" trend={{ value: '+4%', up: false }} />
        <StatCard label="Saldo" value={formatPesos(saldo)} icon={Wallet} tone="brand" hint="Caja + cuentas corrientes" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Movimientos */}
        <div className="surface lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="text-base font-bold text-brand-900">Movimientos recientes</h2>
            <div className="relative w-40">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input className="input pl-9 py-2 text-xs" placeholder="Buscar…" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[560px]">
              <thead className="bg-slate-50/60">
                <tr>
                  <th className="table-th">Fecha</th>
                  <th className="table-th">Concepto</th>
                  <th className="table-th">Cuenta</th>
                  <th className="table-th text-right">Monto</th>
                </tr>
              </thead>
              <tbody>
                {movimientosCaja.map((m) => (
                  <tr key={m.id} className="table-row">
                    <td className="table-td text-slate-500">{m.fecha}</td>
                    <td className="table-td">
                      <div className="flex items-center gap-2">
                        <span className={`flex h-7 w-7 items-center justify-center rounded-lg ${m.tipo === 'ingreso' ? 'bg-jad-50 text-jad-600' : 'bg-rust-50 text-rust-600'}`}>
                          {m.tipo === 'ingreso' ? <ArrowUpRight className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
                        </span>
                        <span className="font-medium text-brand-900">{m.concepto}</span>
                      </div>
                    </td>
                    <td className="table-td text-slate-500">{m.cuenta}</td>
                    <td className={`table-td text-right font-bold ${m.tipo === 'ingreso' ? 'text-jad-700' : 'text-rust-700'}`}>
                      {m.tipo === 'ingreso' ? '+' : '−'}{formatPesos(m.monto)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Facturas FEU */}
        <div className="surface">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-brand-600" />
              <h2 className="text-base font-bold text-brand-900">Facturas</h2>
            </div>
            <Badge tone="gold" variant="soft">FEU</Badge>
          </div>
          <p className="px-5 pt-3 text-xs text-slate-500">Facturación electrónica emitida a socios.</p>
          <div className="divide-y divide-slate-100">
            {facturas.map((f) => (
              <div key={f.id} className="flex items-center gap-3 px-5 py-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500"><FileText className="h-4 w-4" /></div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-brand-900">{f.cliente}</p>
                  <p className="text-xs text-slate-400">{f.numero} · {f.fecha}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-brand-900">{formatPesos(f.monto)}</p>
                  <Badge tone={f.estado === 'pagada' ? 'jad' : f.estado === 'pendiente' ? 'sol' : 'rust'}>
                    {f.estado === 'pagada' ? 'Pagada' : f.estado === 'pendiente' ? 'Pendiente' : 'Vencida'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
          <div className="border-t border-slate-100 p-3">
            <button className="btn-outline w-full">Ver todas las facturas</button>
          </div>
        </div>
      </div>

      {/* Pagos de socios */}
      <div className="surface">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-bold text-brand-900">Pagos de socios</h2>
          <Badge tone="brand" variant="soft">Período en curso</Badge>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead className="bg-slate-50/60">
              <tr>
                <th className="table-th">Socio</th>
                <th className="table-th">Cuota</th>
                <th className="table-th">Vencimiento</th>
                <th className="table-th">Estado</th>
                <th className="table-th text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              {[
                { socio: 'Distribuidora San José SRL', cuota: 'Agosto 2026', venc: '31/08/2026', estado: 'pagada', monto: 12500 },
                { socio: 'Frigorífico Río Negro SA', cuota: 'Agosto 2026', venc: '31/08/2026', estado: 'pagada', monto: 12500 },
                { socio: 'Farmacity San José', cuota: 'Julio 2026', venc: '31/07/2026', estado: 'vencida', monto: 8900 },
                { socio: 'Transportes del Sur', cuota: 'Junio 2026', venc: '30/06/2026', estado: 'vencida', monto: 8900 },
                { socio: 'Tecnología MóvilUY', cuota: 'Agosto 2026', venc: '31/08/2026', estado: 'pendiente', monto: 7400 },
              ].map((p, i) => (
                <tr key={i} className="table-row">
                  <td className="table-td font-medium text-brand-900">{p.socio}</td>
                  <td className="table-td text-slate-500">{p.cuota}</td>
                  <td className="table-td text-slate-500">{p.venc}</td>
                  <td className="table-td">
                    <Badge tone={p.estado === 'pagada' ? 'jad' : p.estado === 'pendiente' ? 'sol' : 'rust'}>
                      {p.estado === 'pagada' ? 'Pagada' : p.estado === 'pendiente' ? 'Pendiente' : 'Vencida'}
                    </Badge>
                  </td>
                  <td className="table-td text-right font-bold text-brand-900">{formatPesos(p.monto)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
