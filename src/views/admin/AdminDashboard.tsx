'use client';

import {
  Users, Briefcase, UserCircle, FileText, Wallet, TrendingUp,
  ArrowUpRight, ArrowRight, Bell, CalendarDays, Plus, Search, Download,
} from 'lucide-react';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import PageHeader from '@/components/PageHeader';
import { useNav } from '@/components/navContext';
import {
  socios, ofertas, postulaciones, movimientosCaja, actividades, formatPesos,
} from '@/data/mockData';

export default function AdminDashboard() {
  const { onNavigate } = useNav();
  const activos = socios.filter((s) => s.estado === 'activo').length;
  const deudores = socios.filter((s) => s.pago === 'deudor').length;
  const ofertasActivas = ofertas.filter((o) => o.estado === 'activa').length;
  const postulantesRegistrados = 1840;
  const ingresosMes = movimientosCaja.filter((m) => m.tipo === 'ingreso').reduce((a, m) => a + m.monto, 0);
  const egresosMes = movimientosCaja.filter((m) => m.tipo === 'egreso').reduce((a, m) => a + m.monto, 0);

  const quickActions = [
    { label: 'Agregar socio', icon: Users, tone: 'brand', target: 'socios' as const },
    { label: 'Publicar oferta', icon: Briefcase, tone: 'gold', target: 'bolsa' as const },
    { label: 'Buscar candidatos', icon: Search, tone: 'jad', target: 'candidatos' as const },
    { label: 'Registrar movimiento', icon: Wallet, tone: 'sol', target: 'caja' as const },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Buen día, Martín"
        subtitle="Resumen institucional del período · Agosto 2026"
        actions={
          <>
            <button className="btn-outline"><Download className="h-4 w-4" /> Exportar</button>
            <button className="btn-primary"><Plus className="h-4 w-4" /> Acción rápida</button>
          </>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Socios activos" value={String(activos)} icon={Users} tone="brand" trend={{ value: '+4 este mes', up: true }} hint={`${deudores} con deuda`} />
        <StatCard label="Ofertas laborales activas" value={String(ofertasActivas)} icon={Briefcase} tone="gold" trend={{ value: '+2 esta semana', up: true }} />
        <StatCard label="Postulantes registrados" value={postulantesRegistrados.toLocaleString('es-UY')} icon={UserCircle} tone="jad" trend={{ value: '+86', up: true }} />
        <StatCard label="Facturación del período" value={formatPesos(ingresosMes)} icon={FileText} tone="sol" trend={{ value: '+12% vs. mes anterior', up: true }} />
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickActions.map((a) => (
          <button
            key={a.label}
            onClick={() => onNavigate('admin', a.target)}
            className="surface surface-hover group flex items-center gap-3 p-4 text-left"
          >
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${
              a.tone === 'brand' ? 'bg-brand-50 text-brand-600' :
              a.tone === 'gold' ? 'bg-gold-50 text-gold-600' :
              a.tone === 'jad' ? 'bg-jad-50 text-jad-600' : 'bg-sol-50 text-sol-600'
            }`}>
              <a.icon className="h-5 w-5" />
            </span>
            <span className="flex-1 text-sm font-semibold text-brand-900">{a.label}</span>
            <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" />
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Movimientos recientes */}
        <div className="surface lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h2 className="text-base font-bold text-brand-900">Movimientos recientes</h2>
              <p className="text-xs text-slate-500">Caja · últimos 8 movimientos</p>
            </div>
            <button onClick={() => onNavigate('admin', 'caja')} className="text-xs font-semibold text-brand-600 hover:text-brand-800">
              Ver caja completa
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {movimientosCaja.slice(0, 6).map((m) => (
              <div key={m.id} className="flex items-center gap-3 px-5 py-3.5">
                <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                  m.tipo === 'ingreso' ? 'bg-jad-50 text-jad-600' : 'bg-rust-50 text-rust-600'
                }`}>
                  {m.tipo === 'ingreso' ? <ArrowUpRight className="h-4 w-4" /> : <TrendingUp className="h-4 w-4 rotate-90" />}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-brand-900">{m.concepto}</p>
                  <p className="text-xs text-slate-400">{m.fecha} · {m.cuenta}</p>
                </div>
                <span className={`text-sm font-bold ${m.tipo === 'ingreso' ? 'text-jad-700' : 'text-rust-700'}`}>
                  {m.tipo === 'ingreso' ? '+' : '−'}{formatPesos(m.monto)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen financiero + alertas */}
        <div className="space-y-6">
          <div className="surface p-5">
            <h2 className="text-base font-bold text-brand-900">Resumen del período</h2>
            <div className="mt-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Ingresos</span>
                <span className="text-sm font-bold text-jad-700">{formatPesos(ingresosMes)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Egresos</span>
                <span className="text-sm font-bold text-rust-700">{formatPesos(egresosMes)}</span>
              </div>
              <div className="h-px bg-slate-100" />
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-brand-900">Saldo</span>
                <span className="text-lg font-bold text-brand-900">{formatPesos(ingresosMes - egresosMes)}</span>
              </div>
            </div>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div className="flex h-full">
                <div className="bg-jad-500" style={{ width: `${(ingresosMes / (ingresosMes + egresosMes)) * 100}%` }} />
                <div className="bg-rust-400" style={{ width: `${(egresosMes / (ingresosMes + egresosMes)) * 100}%` }} />
              </div>
            </div>
          </div>

          <div className="surface p-5">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-rust-500" />
              <h2 className="text-base font-bold text-brand-900">Atención</h2>
            </div>
            <div className="mt-3 space-y-2.5">
              <div className="flex items-start gap-2 rounded-xl bg-rust-50 p-3 ring-1 ring-rust-100">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-rust-500" />
                <p className="text-xs text-rust-800">{deudores} socios con cuota vencida. Requiere gestión de cobranza.</p>
              </div>
              <div className="flex items-start gap-2 rounded-xl bg-sol-50 p-3 ring-1 ring-sol-200">
                <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-sol-500" />
                <p className="text-xs text-sol-800">2 facturas FEU pendientes de emisión este mes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Próximas actividades + postulaciones recientes */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="surface">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-brand-600" />
              <h2 className="text-base font-bold text-brand-900">Próximas actividades</h2>
            </div>
            <Badge tone="brand" variant="soft">{actividades.length} programadas</Badge>
          </div>
          <div className="divide-y divide-slate-100">
            {actividades.map((a) => (
              <div key={a.id} className="flex items-center gap-4 px-5 py-3.5">
                <div className="flex h-12 w-12 flex-col items-center justify-center rounded-xl bg-brand-50 text-brand-700 ring-1 ring-brand-100">
                  <span className="text-[10px] font-semibold uppercase">{a.fecha.split('/')[1]}</span>
                  <span className="text-base font-bold leading-none">{a.fecha.split('/')[0]}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-brand-900">{a.titulo}</p>
                  <p className="text-xs text-slate-400">{a.tipo} · {a.fecha}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-semibold text-brand-700">{a.inscritos}/{a.cupos}</p>
                  <p className="text-[11px] text-slate-400">inscriptos</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="surface">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="text-base font-bold text-brand-900">Postulaciones recientes</h2>
            <button onClick={() => onNavigate('admin', 'bolsa')} className="text-xs font-semibold text-brand-600 hover:text-brand-800">
              Ver bolsa de trabajo
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {postulaciones.map((p) => (
              <div key={p.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <UserCircle className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-brand-900">{p.puesto}</p>
                  <p className="text-xs text-slate-400">{p.empresa} · {p.fecha}</p>
                </div>
                <Badge tone={p.estado === 'revision' ? 'sol' : p.estado === 'finalizada' ? 'jad' : p.estado === 'no-seleccionado' ? 'rust' : 'slate'}>
                  {p.estado === 'enviada' ? 'Enviada' : p.estado === 'revision' ? 'En revisión' : p.estado === 'finalizada' ? 'Finalizada' : 'No seleccionado'}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
