'use client';

import {
  Plus, Briefcase, Users, Bell, FileText, TrendingUp,
  ArrowRight, CheckCircle2, Clock, Building2, Lock,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import { useNav } from '@/components/navContext';
import { ofertas, postulaciones } from '@/data/mockData';

export default function EmpresaDashboard() {
  const { onNavigate } = useNav();
  const misOfertas = ofertas.filter((o) => o.empresa === 'Distribuidora San José SRL');
  const activas = misOfertas.filter((o) => o.estado === 'activa').length;
  const nuevosCandidatos = misOfertas.reduce((a, o) => a + o.candidatos, 0);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Hola, Marta"
        subtitle="Distribuidora San José SRL · Socio directivo"
        actions={<button onClick={() => onNavigate('empresa', 'e-ofertas')} className="btn-gold"><Plus className="h-4 w-4" /> Publicar oferta</button>}
      />

      {/* Socio status banner */}
      <div className="surface flex flex-col gap-4 bg-gradient-to-br from-brand-700 to-brand-900 p-5 text-white sm:flex-row sm:items-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 ring-1 ring-white/15">
          <Building2 className="h-6 w-6 text-gold-400" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold">Tu condición de socio</p>
          <p className="text-xs text-brand-200">Socio directivo · Cuota al día · Próximo vencimiento: 31/08/2026</p>
        </div>
        <div className="flex gap-2">
          <Badge tone="jad" variant="solid">Al día</Badge>
          <Badge tone="gold" variant="solid">Directivo</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Ofertas activas" value={String(activas)} icon={Briefcase} tone="brand" />
        <StatCard label="Candidatos nuevos" value={String(nuevosCandidatos)} icon={Users} tone="gold" trend={{ value: '+5 esta semana', up: true }} />
        <StatCard label="Ofertas cerradas" value="2" icon={CheckCircle2} tone="slate" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Mis ofertas */}
        <div className="surface lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h2 className="text-base font-bold text-brand-900">Mis ofertas</h2>
            <button onClick={() => onNavigate('empresa', 'e-ofertas')} className="text-xs font-semibold text-brand-600 hover:text-brand-800">Ver todas</button>
          </div>
          <div className="divide-y divide-slate-100">
            {(misOfertas.length ? misOfertas : ofertas.slice(0, 3)).map((o) => (
              <div key={o.id} className="flex items-center gap-3 px-5 py-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Briefcase className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-brand-900">{o.puesto}</p>
                  <p className="text-xs text-slate-400">{o.categoria} · cierra {o.cierra}</p>
                </div>
                <div className="text-right">
                  <p className="flex items-center gap-1 text-sm font-bold text-brand-900"><Users className="h-3.5 w-3.5 text-slate-400" />{o.candidatos}</p>
                  <Badge tone={o.estado === 'activa' ? 'jad' : 'slate'}>{o.estado === 'activa' ? 'Activa' : 'Cerrada'}</Badge>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notificaciones */}
        <div className="surface">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-brand-600" />
              <h2 className="text-base font-bold text-brand-900">Novedades</h2>
            </div>
            <button onClick={() => onNavigate('empresa', 'e-notificaciones')} className="text-xs font-semibold text-brand-600 hover:text-brand-800">Ver todas</button>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { t: 'Nueva postulación', d: 'Rodrigo Almirón en Operario de depósito', time: '12 min' },
              { t: 'Capacitación disponible', d: 'Gestión de equipos comerciales — 02/09', time: '1 h' },
              { t: 'Cuota al día', d: 'Pago de agosto registrado correctamente', time: '3 h' },
            ].map((n, i) => (
              <div key={i} className="px-5 py-3.5">
                <div className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-brand-900">{n.t}</p>
                    <p className="text-xs text-slate-500">{n.d}</p>
                    <p className="mt-0.5 text-[11px] text-slate-400">Hace {n.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <QuickLink icon={FileText} title="Mis datos" desc="Actualizá la información de tu empresa" onClick={() => onNavigate('empresa', 'e-perfil')} />
        <QuickLink icon={Lock} title="Cambiar contraseña" desc="Mantené tu cuenta segura" onClick={() => onNavigate('empresa', 'e-perfil')} />
        <QuickLink icon={TrendingUp} title="Ver candidatos" desc="Revisá las postulaciones recibidas" onClick={() => onNavigate('empresa', 'e-candidatos')} />
      </div>
    </div>
  );
}

function QuickLink({ icon: Icon, title, desc, onClick }: { icon: typeof FileText; title: string; desc: string; onClick: () => void }) {
  return (
    <button onClick={onClick} className="surface surface-hover group flex items-center gap-3 p-4 text-left">
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Icon className="h-5 w-5" /></span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-brand-900">{title}</p>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
      <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" />
    </button>
  );
}
