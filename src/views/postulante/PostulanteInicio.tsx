'use client';

import { Search, Briefcase, Users, FileText, Bell, ArrowRight, TrendingUp } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import StatCard from '@/components/StatCard';
import Badge from '@/components/Badge';
import { useNav } from '@/components/navContext';
import { ofertas, postulaciones } from '@/data/mockData';

export default function PostulanteInicio() {
  const { onNavigate } = useNav();
  const activas = ofertas.filter((o) => o.estado === 'activa').length;
  const misPostulaciones = postulaciones.length;

  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="surface relative overflow-hidden bg-gradient-to-br from-brand-800 to-brand-950 p-6 text-white sm:p-8">
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold-500/10 blur-2xl" />
        <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl" />
        <div className="relative z-10">
          <p className="text-sm text-brand-200">Bienvenido de nuevo</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">Hola, Rodrigo</h1>
          <p className="mt-2 max-w-md text-sm text-brand-200">
            Tu perfil está al 75% completado. Completalo para mejorar tus chances de ser seleccionado.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => onNavigate('postulante', 'p-empleos')} className="btn-gold">
              <Search className="h-4 w-4" /> Buscar empleos
            </button>
            <button onClick={() => onNavigate('postulante', 'p-cv')} className="btn-ghost text-white hover:bg-white/10">
              <FileText className="h-4 w-4" /> Completar perfil
            </button>
          </div>
          {/* Progress bar */}
          <div className="mt-5 max-w-xs">
            <div className="flex items-center justify-between text-xs text-brand-200">
              <span>Progreso del perfil</span>
              <span className="font-bold text-gold-400">75%</span>
            </div>
            <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-white/15">
              <div className="h-full rounded-full bg-gold-400" style={{ width: '75%' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Ofertas activas" value={String(activas)} icon={Briefcase} tone="brand" />
        <StatCard label="Mis postulaciones" value={String(misPostulaciones)} icon={FileText} tone="gold" />
        <StatCard label="En proceso" value={String(postulaciones.filter((p) => p.estado === 'revision').length)} icon={TrendingUp} tone="jad" />
      </div>

      {/* Postulaciones recientes */}
      <div className="surface">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <h2 className="text-base font-bold text-brand-900">Postulaciones recientes</h2>
          <button onClick={() => onNavigate('postulante', 'p-postulaciones')} className="text-xs font-semibold text-brand-600 hover:text-brand-800">Ver todas</button>
        </div>
        <div className="divide-y divide-slate-100">
          {postulaciones.slice(0, 3).map((p) => (
            <div key={p.id} className="flex items-center gap-3 px-5 py-3.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500"><Briefcase className="h-4 w-4" /></span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-brand-900">{p.puesto}</p>
                <p className="text-xs text-slate-400">{p.empresa} · {p.fecha}</p>
              </div>
              <Badge tone={p.estado === 'revision' ? 'sol' : p.estado === 'finalizada' ? 'jad' : p.estado === 'no-seleccionado' ? 'rust' : 'slate'}>
                {p.estado === 'enviada' ? 'Enviada' : p.estado === 'revision' ? 'En revisión' : p.estado === 'finalizada' ? 'Finalizada' : 'No seleccionado'}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      {/* Quick links */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <button onClick={() => onNavigate('postulante', 'p-empleos')} className="surface surface-hover group flex items-center gap-3 p-5 text-left">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600"><Search className="h-5 w-5" /></span>
          <div className="flex-1">
            <p className="font-semibold text-brand-900">Encontrar empleo</p>
            <p className="text-xs text-slate-500">Explorá ofertas activas ahora</p>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" />
        </button>
        <button onClick={() => onNavigate('postulante', 'p-cv')} className="surface surface-hover group flex items-center gap-3 p-5 text-left">
          <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold-50 text-gold-600"><FileText className="h-5 w-5" /></span>
          <div className="flex-1">
            <p className="font-semibold text-brand-900">Mi CV</p>
            <p className="text-xs text-slate-500">Completá tu perfil profesional</p>
          </div>
          <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-brand-500" />
        </button>
      </div>
    </div>
  );
}
