'use client';

import { useState } from 'react';
import { Search, Download, Plus, X } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Status from '@/components/Status';
import { facturas, formatPesos, periodoActual, type FacturaEstado } from '@/data/mockData';

const estados: Record<FacturaEstado, { label: string; tone: 'neutral' | 'warn' | 'alert' }> = {
  pagada: { label: 'Cobrada', tone: 'neutral' },
  pendiente: { label: 'En plazo', tone: 'warn' },
  vencida: { label: 'Vencida', tone: 'alert' },
};

/**
 * Facturación electrónica.
 *
 * Caja responde "cuánta plata entró y salió"; esta pantalla responde "qué
 * comprobantes emitimos y cuáles siguen sin cobrarse". Son dos preguntas
 * distintas y hasta ahora compartían la misma pantalla.
 */
export default function AdminFacturacion() {
  const [query, setQuery] = useState('');
  const [estado, setEstado] = useState<'todos' | FacturaEstado>('todos');
  const [tipo, setTipo] = useState('todos');

  const filtered = facturas.filter((f) => {
    if (estado !== 'todos' && f.estado !== estado) return false;
    if (tipo !== 'todos' && f.tipo !== tipo) return false;
    if (query && !`${f.numero} ${f.cliente} ${f.rut} ${f.concepto}`.toLowerCase().includes(query.toLowerCase())) {
      return false;
    }
    return true;
  });

  const hayFiltros = query !== '' || estado !== 'todos' || tipo !== 'todos';
  const limpiar = () => {
    setQuery('');
    setEstado('todos');
    setTipo('todos');
  };

  const total = (e: FacturaEstado) =>
    facturas.filter((f) => f.estado === e).reduce((a, f) => a + f.monto, 0);

  const cobrado = total('pagada');
  const enPlazo = total('pendiente');
  const vencido = total('vencida');
  const sinAcuse = facturas.filter((f) => f.dgi === 'pendiente').length;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Facturación"
        subtitle={periodoActual.label}
        actions={
          <>
            <button className="btn-outline">
              <Download className="h-3.5 w-3.5" strokeWidth={1.75} /> Exportar
            </button>
            <button className="btn-primary">
              <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Emitir comprobante
            </button>
          </>
        }
      />

      <div className="metric-strip">
        <div className="metric">
          <p className="metric-label">Comprobantes emitidos</p>
          <p className="metric-value">{facturas.length}</p>
          <p className="metric-note">
            {sinAcuse > 0 ? `${sinAcuse} sin acuse de DGI` : 'Todos con acuse de DGI'}
          </p>
        </div>
        <div className="metric">
          <p className="metric-label">Cobrado</p>
          <p className="metric-value">{formatPesos(cobrado)}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Por cobrar en plazo</p>
          <p className="metric-value">{formatPesos(enPlazo)}</p>
        </div>
        {/* La cifra que pide trabajo cierra la tira y es la única en rojo. */}
        <div className="metric metric-close">
          <p className="metric-label">Vencido</p>
          <p className="metric-value text-alert">{formatPesos(vencido)}</p>
          <p className="metric-note">
            {facturas.filter((f) => f.estado === 'vencida').length} comprobantes en gestión de cobranza
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ink-faint" />
          <input
            className="input pl-8"
            placeholder="Buscar por número, cliente, RUT o concepto…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        <select className="input sm:w-auto" value={tipo} onChange={(e) => setTipo(e.target.value)}>
          <option value="todos">Todos los tipos</option>
          <option value="e-Factura">e-Factura</option>
          <option value="e-Ticket">e-Ticket</option>
          <option value="Nota de crédito">Nota de crédito</option>
        </select>

        <select
          className="input sm:w-auto"
          value={estado}
          onChange={(e) => setEstado(e.target.value as typeof estado)}
        >
          <option value="todos">Todos los estados</option>
          <option value="pagada">Cobrada</option>
          <option value="pendiente">En plazo</option>
          <option value="vencida">Vencida</option>
        </select>

        {hayFiltros && (
          <button onClick={limpiar} className="btn-ghost shrink-0">
            <X className="h-3.5 w-3.5" /> Limpiar
          </button>
        )}
      </div>

      <div className="surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px]">
            <thead>
              <tr className="table-head">
                <th className="table-th">Comprobante</th>
                <th className="table-th">Cliente</th>
                <th className="table-th">Concepto</th>
                <th className="table-th">Emitido</th>
                <th className="table-th">Vence</th>
                <th className="table-th">Estado</th>
                <th className="table-th text-right">Monto</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr key={f.id} className={`table-row ${f.estado === 'vencida' ? 'row-alert' : 'row-flag'}`}>
                  <td className="table-td">
                    <p className="font-mono text-[12.5px] text-ink">{f.numero}</p>
                    <p className="mt-0.5 flex items-center gap-1.5 text-[12px] text-ink-faint">
                      {f.tipo}
                      {/* El acuse solo se nombra cuando falta: si DGI ya lo
                          aceptó no hay nada que hacer con ese dato. */}
                      {f.dgi === 'pendiente' && (
                        <span className="chip chip-gold">Sin acuse DGI</span>
                      )}
                    </p>
                  </td>
                  <td className="table-td">
                    <p className="font-medium text-ink">{f.cliente}</p>
                    <p className="font-mono text-[12px] text-ink-faint">{f.rut}</p>
                  </td>
                  <td className="table-td text-ink-mute">{f.concepto}</td>
                  <td className="table-td whitespace-nowrap font-mono text-[12.5px] text-ink-mute">{f.fecha}</td>
                  <td className="table-td whitespace-nowrap font-mono text-[12.5px] text-ink-mute">
                    {f.vencimiento}
                  </td>
                  <td className="table-td">
                    <Status tone={estados[f.estado].tone}>{estados[f.estado].label}</Status>
                  </td>
                  <td className="table-num font-medium">{formatPesos(f.monto)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="px-4 py-12 text-center">
            <p className="text-[13px] text-ink-mute">Ningún comprobante coincide con esos filtros.</p>
            <button onClick={limpiar} className="btn-link mt-1.5">
              Limpiar filtros
            </button>
          </div>
        )}

        {filtered.length > 0 && (
          <div className="flex items-center justify-between border-t border-line px-4 py-2.5 text-[12px] text-ink-faint">
            <span>
              {filtered.length} de {facturas.length} comprobantes
            </span>
            <span className="font-mono">
              Suma visible {formatPesos(filtered.reduce((a, f) => a + f.monto, 0))}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
