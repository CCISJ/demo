"use client";

import { Download, Plus, Search, Wallet, Users } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Status from "@/components/Status";
import { useNav } from "@/components/navContext";
import {
  socios,
  ofertas,
  movimientosCaja,
  actividades,
  facturas,
  candidatos,
  periodoActual,
  formatPesos,
} from "@/data/mockData";

const mesesCortos = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

/** "02/09/2026" → "sep" */
const mesCorto = (fecha: string) =>
  mesesCortos[Number(fecha.split("/")[1]) - 1] ?? "";

export default function AdminDashboard() {
  const { onNavigate } = useNav();

  const activos = socios.filter((s) => s.estado === "activo").length;
  const deudores = socios.filter((s) => s.pago === "deudor").length;
  const ofertasActivas = ofertas.filter((o) => o.estado === "activa").length;
  // Lo que pide gestión es lo vencido, no lo que todavía está en plazo.
  const facturasVencidas = facturas.filter((f) => f.estado === "vencida");
  const montoVencido = facturasVencidas.reduce((a, f) => a + f.monto, 0);
  const sinCv = candidatos.filter((c) => !c.cv).length;
  const ingresosMes = movimientosCaja
    .filter((m) => m.tipo === "ingreso")
    .reduce((a, m) => a + m.monto, 0);
  const egresosMes = movimientosCaja
    .filter((m) => m.tipo === "egreso")
    .reduce((a, m) => a + m.monto, 0);
  const saldo = ingresosMes - egresosMes;

  const accesos = [
    { label: "Agregar socio", icon: Users, target: "socios" as const },
    { label: "Publicar oferta", icon: Plus, target: "bolsa" as const },
    { label: "Buscar candidatos", icon: Search, target: "candidatos" as const },
    { label: "Registrar movimiento", icon: Wallet, target: "caja" as const },
  ];

  return (
    <div className="space-y-5">
      <PageHeader
        title="Buen día, Martín"
        subtitle={`Período ${periodoActual.label.toLowerCase()}`}
        actions={
          <button className="btn-outline">
            <Download className="h-3.5 w-3.5" strokeWidth={1.75} /> Exportar
          </button>
        }
      />

      {/* Las cuatro cifras del período, en una sola caja. */}
      <div className="metric-strip">
        <div className="metric">
          <p className="metric-label">Socios activos</p>
          <p className="metric-value">{activos}</p>
          <p className="metric-note">de {socios.length} registrados</p>
        </div>
        <div className="metric">
          <p className="metric-label">Ofertas abiertas</p>
          <p className="metric-value">{ofertasActivas}</p>
          <p className="metric-note">
            {ofertas.length - ofertasActivas} cerradas o en borrador
          </p>
        </div>
        <div className="metric">
          <p className="metric-label">Postulantes registrados</p>
          <p className="metric-value">{candidatos.length}</p>
          <p className="metric-note">{sinCv} todavía sin CV</p>
        </div>
        <div className="metric">
          <p className="metric-label">Ingresos del período</p>
          <p className="metric-value">{formatPesos(ingresosMes)}</p>
          <p className="metric-note">Saldo {formatPesos(saldo)}</p>
        </div>
      </div>

      {/* Accesos directos: una sola barra, un solo peso visual. */}
      <div className="surface flex flex-wrap divide-line sm:divide-x">
        {accesos.map((a) => (
          <button
            key={a.label}
            onClick={() => onNavigate("admin", a.target)}
            className="group flex flex-1 items-center gap-2 px-4 py-3 text-[13px] font-medium text-ink-body transition-colors hover:bg-band hover:text-ink"
          >
            <a.icon
              className="h-4 w-4 text-ink-faint transition-colors group-hover:text-brand-700"
              strokeWidth={1.75}
            />
            <span className="whitespace-nowrap">{a.label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
        {/* Movimientos */}
        <div className="surface lg:col-span-2">
          <div className="card-head">
            <h2 className="card-title">Movimientos recientes</h2>
            <button
              onClick={() => onNavigate("admin", "caja")}
              className="btn-link"
            >
              Ver caja
            </button>
          </div>
          <table className="w-full">
            <tbody>
              {movimientosCaja.slice(0, 6).map((m) => (
                <tr
                  key={m.id}
                  className="border-t border-line first:border-t-0"
                >
                  <td className="table-td">
                    <p className="truncate font-medium text-ink">
                      {m.concepto}
                    </p>
                    <p className="mt-0.5 text-[12px] text-ink-faint">
                      {m.fecha} · {m.cuenta}
                    </p>
                  </td>
                  {/* El signo y el color solo distinguen entrada de salida: es
                      la única lectura que el ojo necesita en esta columna. */}
                  <td
                    className={`table-num ${m.tipo === "ingreso" ? "text-ink" : "text-alert"}`}
                  >
                    {m.tipo === "ingreso" ? "+" : "−"}
                    {formatPesos(m.monto)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="space-y-5">
          {/* Resumen */}
          <div className="surface">
            <div className="card-head">
              <h2 className="card-title">Resumen del período</h2>
            </div>
            <div className="px-4 py-3">
              <dl className="space-y-2">
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[13px] text-ink-mute">Ingresos</dt>
                  <dd className="font-mono text-[13px] tabular-nums text-ink">
                    {formatPesos(ingresosMes)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3">
                  <dt className="text-[13px] text-ink-mute">Egresos</dt>
                  <dd className="font-mono text-[13px] tabular-nums text-ink">
                    {formatPesos(egresosMes)}
                  </dd>
                </div>
                <div className="flex items-baseline justify-between gap-3 border-t border-line pt-2">
                  <dt className="text-[13px] font-medium text-ink">
                    Saldo
                  </dt>
                  <dd
                    className={`font-mono text-[15px] font-medium tabular-nums ${
                      saldo < 0 ? "text-alert" : "text-ink"
                    }`}
                  >
                    {formatPesos(saldo)}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Pendientes: una lista, no dos cajas de color. */}
          <div className="surface">
            <div className="card-head">
              <h2 className="card-title">Requiere atención</h2>
            </div>
            <ul className="divide-y divide-line">
              <li className="flex items-start justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-[13px] text-ink-body">Cuotas vencidas</p>
                  <p className="mt-0.5 text-[12px] text-ink-faint">
                    Requiere gestión de cobranza
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("admin", "socios")}
                  className="shrink-0"
                >
                  <Status tone="alert">{deudores} socios</Status>
                </button>
              </li>
              <li className="flex items-start justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-[13px] text-ink-body">
                    Comprobantes vencidos
                  </p>
                  <p className="mt-0.5 text-[12px] text-ink-faint">
                    {formatPesos(montoVencido)} sin cobrar
                  </p>
                </div>
                <button
                  onClick={() => onNavigate("admin", "facturacion")}
                  className="shrink-0"
                >
                  <Status tone="warn">{facturasVencidas.length} facturas</Status>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Actividades */}
      <div className="surface">
        <div className="card-head">
          <h2 className="card-title">Próximas actividades</h2>
          <span className="text-[12px] text-ink-faint">
            {actividades.length} programadas
          </span>
        </div>
        <ul className="divide-y divide-line">
          {actividades.map((a) => (
            <li key={a.id} className="flex items-center gap-3 px-4 py-2.5">
              <div className="w-11 shrink-0 border-r border-line pr-3 text-center">
                <p className="font-mono text-[15px] font-medium leading-none tabular-nums text-ink">
                  {a.fecha.split("/")[0]}
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-wide text-ink-faint">
                  {mesCorto(a.fecha)}
                </p>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium text-ink">
                  {a.titulo}
                </p>
                <p className="text-[12px] text-ink-faint">{a.tipo}</p>
              </div>
              <p className="shrink-0 font-mono text-[12.5px] tabular-nums text-ink-mute">
                {a.inscritos}/{a.cupos}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
