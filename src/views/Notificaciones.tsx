'use client';

import { useState } from 'react';
import {
  Bell, Check, Mail, GraduationCap, CalendarDays, Megaphone,
  Briefcase, Gift, Settings, CheckCheck, AlertTriangle,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/Badge';
import { notificaciones, type NotifCategoria } from '@/data/mockData';

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

interface NotificacionesProps {
  variant?: 'admin' | 'empresa' | 'postulante';
}

export default function Notificaciones({ variant = 'postulante' }: NotificacionesProps) {
  const [tab, setTab] = useState<'nuevas' | 'leidas'>('nuevas');
  const [showPrefs, setShowPrefs] = useState(false);
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    Capacitaciones: true,
    Eventos: true,
    Comunicados: true,
    'Bolsa de trabajo': true,
    'Beneficios para socios': true,
  });

  const filtered = notificaciones
    .filter((n) => tab === 'nuevas' ? !n.leida : n.leida)
    .sort((a, b) => (a.prioridad === b.prioridad ? 0 : a.prioridad === 'emergente' ? -1 : 1));
  const nuevasCount = notificaciones.filter((n) => !n.leida).length;
  const destinatarioLabel: Record<string, string> = {
    directivos: 'Solo socios directivos',
    'no-directivos': 'Solo socios no directivos',
    todos: '',
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Centro de notificaciones"
        subtitle="Mantenete informado sobre las novedades del CCISJ"
        actions={
          <>
            <button className="btn-outline"><CheckCheck className="h-4 w-4" /> Marcar todas como leídas</button>
            <button onClick={() => setShowPrefs(!showPrefs)} className="btn-primary"><Settings className="h-4 w-4" /> Preferencias</button>
          </>
        }
      />

      {/* Email notice */}
      <div className="surface flex items-center gap-3 bg-gradient-to-br from-brand-50 to-white p-4">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700"><Mail className="h-5 w-5" /></span>
        <p className="flex-1 text-sm text-slate-600">
          Las notificaciones también se envían por correo electrónico. Configurá qué categorías querés recibir.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Notification list */}
        <div className="surface lg:col-span-2">
          <div className="flex items-center gap-2 border-b border-slate-100 p-2">
            {([['nuevas', `Nuevas (${nuevasCount})`], ['leidas', 'Leídas']] as const).map(([k, l]) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition-colors ${
                  tab === k ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {l}
              </button>
            ))}
          </div>
          <div className="divide-y divide-slate-100">
            {filtered.map((n) => {
              const Icon = catIcon[n.categoria];
              const tone = catTone[n.categoria];
              const urgente = n.prioridad === 'emergente';
              return (
                <div key={n.id} className={`flex items-start gap-3 px-5 py-4 ${urgente ? 'bg-rust-50/40' : !n.leida ? 'bg-brand-50/30' : ''}`}>
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    urgente ? 'bg-rust-100 text-rust-600' :
                    tone === 'brand' ? 'bg-brand-50 text-brand-600' :
                    tone === 'gold' ? 'bg-gold-50 text-gold-600' :
                    tone === 'jad' ? 'bg-jad-50 text-jad-600' :
                    tone === 'sol' ? 'bg-sol-50 text-sol-600' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {urgente ? <AlertTriangle className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold text-brand-900">{n.titulo}</p>
                      {!n.leida && <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-brand-500" />}
                    </div>
                    <p className="mt-0.5 text-sm text-slate-600">{n.cuerpo}</p>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2">
                      {urgente && <Badge tone="rust" variant="solid">Emergente</Badge>}
                      <Badge tone={tone} variant="soft">{n.categoria}</Badge>
                      {destinatarioLabel[n.destinatario] && (
                        <span className="text-xs font-medium text-slate-400">{destinatarioLabel[n.destinatario]}</span>
                      )}
                      <span className="text-xs text-slate-400">{n.fecha}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {filtered.length === 0 && (
            <div className="px-5 py-10 text-center text-sm text-slate-500">No hay notificaciones en esta sección.</div>
          )}
        </div>

        {/* Preferences panel */}
        <div className="space-y-6">
          <div className="surface p-5">
            <div className="flex items-center gap-2">
              <Settings className="h-4 w-4 text-brand-600" />
              <h2 className="text-base font-bold text-brand-900">Preferencias</h2>
            </div>
            <p className="mt-1 text-xs text-slate-500">Elegí qué categorías de notificaciones querés recibir.</p>
            {variant === 'empresa' && (
              <div className="mt-3 rounded-xl bg-gold-50 p-3 ring-1 ring-gold-200">
                <p className="text-xs text-gold-800">Como socio directivo, recibís comunicaciones adicionales del Centro.</p>
              </div>
            )}
            <div className="mt-4 space-y-3">
              {(Object.keys(prefs) as NotifCategoria[]).map((cat) => {
                const Icon = catIcon[cat];
                return (
                  <label key={cat} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
                    <Icon className="h-4 w-4 text-slate-400" />
                    <span className="flex-1 text-sm font-medium text-brand-900">{cat}</span>
                    <button
                      onClick={() => setPrefs({ ...prefs, [cat]: !prefs[cat] })}
                      className={`relative h-6 w-11 rounded-full transition-colors ${prefs[cat] ? 'bg-brand-600' : 'bg-slate-200'}`}
                    >
                      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${prefs[cat] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                    </button>
                  </label>
                );
              })}
            </div>
          </div>

          <div className="surface p-5">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-brand-600" />
              <h2 className="text-base font-bold text-brand-900">Correo electrónico</h2>
            </div>
            <label className="mt-3 flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400" defaultChecked />
              Recibir copia por email
            </label>
            <label className="mt-2 flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400" defaultChecked />
              Resumen semanal de novedades
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
