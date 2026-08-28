'use client';

import { useState } from 'react';
import {
  FileText, Send, Clock, CheckCircle2, XCircle, AlertCircle,
  Phone, Mail, Calendar, MapPin, Briefcase,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/Badge';
import { postulaciones, type PostulacionEstado } from '@/data/mockData';

const estadoConfig: Record<PostulacionEstado, { label: string; tone: 'slate' | 'sol' | 'jad' | 'rust'; icon: typeof Send }> = {
  enviada: { label: 'Postulación enviada', tone: 'slate', icon: Send },
  revision: { label: 'En revisión', tone: 'sol', icon: Clock },
  finalizada: { label: 'Proceso finalizado', tone: 'jad', icon: CheckCircle2 },
  'no-seleccionado': { label: 'No seleccionado', tone: 'rust', icon: XCircle },
};

export default function PostulantePostulaciones() {
  const [filter, setFilter] = useState<'todas' | PostulacionEstado>('todas');
  const filtered = filter === 'todas' ? postulaciones : postulaciones.filter((p) => p.estado === filter);

  return (
    <div className="space-y-6">
      <PageHeader title="Mis postulaciones" subtitle="Seguimiento del estado de tus postulaciones" />

      {/* Info banner */}
      <div className="surface flex flex-col gap-3 bg-gradient-to-br from-brand-50 to-white p-4 sm:flex-row sm:items-center">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-100 text-brand-700"><AlertCircle className="h-5 w-5" /></span>
        <p className="flex-1 text-sm text-slate-600">
          Cuando una empresa te selecciona, el CCISJ te contactará por teléfono. Si no continuás en el proceso, recibirás una notificación acá y por correo.
        </p>
      </div>

      {/* Filter tabs */}
      <div className="flex flex-wrap gap-2">
        {([['todas', 'Todas'], ['enviada', 'Enviadas'], ['revision', 'En revisión'], ['finalizada', 'Finalizadas'], ['no-seleccionado', 'No seleccionado']] as const).map(([k, l]) => (
          <button
            key={k}
            onClick={() => setFilter(k)}
            className={`chip ${filter === k ? 'bg-brand-700 text-white ring-brand-700' : 'bg-white text-slate-600 ring-slate-200 hover:bg-slate-50'}`}
          >
            {l}
            <span className={`rounded-full px-1.5 text-[10px] ${filter === k ? 'bg-white/20' : 'bg-slate-100 text-slate-500'}`}>
              {k === 'todas' ? postulaciones.length : postulaciones.filter((p) => p.estado === k).length}
            </span>
          </button>
        ))}
      </div>

      {/* Postulaciones */}
      <div className="space-y-3">
        {filtered.map((p) => {
          const cfg = estadoConfig[p.estado];
          return (
            <div key={p.id} className="surface surface-hover p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <span className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  cfg.tone === 'jad' ? 'bg-jad-50 text-jad-600' :
                  cfg.tone === 'sol' ? 'bg-sol-50 text-sol-600' :
                  cfg.tone === 'rust' ? 'bg-rust-50 text-rust-600' : 'bg-slate-100 text-slate-500'
                }`}>
                  <cfg.icon className="h-6 w-6" />
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-brand-900">{p.puesto}</p>
                  <p className="text-sm text-slate-500">{p.empresa}</p>
                  <div className="mt-1.5 flex flex-wrap gap-2 text-xs text-slate-400">
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />Postulaste el {p.fecha}</span>
                    <span className="inline-flex items-center gap-1"><Briefcase className="h-3 w-3" />{p.categoria}</span>
                  </div>
                </div>
                <div className="flex flex-col items-start gap-2 sm:items-end">
                  <Badge tone={cfg.tone}>{cfg.label}</Badge>
                  {p.estado === 'revision' && (
                    <p className="flex items-center gap-1 text-xs text-sol-700"><Clock className="h-3 w-3" /> El CCISJ está revisando tu postulación</p>
                  )}
                  {p.estado === 'finalizada' && (
                    <p className="flex items-center gap-1 text-xs text-jad-700"><Phone className="h-3 w-3" /> Te contactaremos por teléfono</p>
                  )}
                  {p.estado === 'no-seleccionado' && (
                    <p className="text-xs text-rust-600">Gracias por participar. Seguí buscando otras oportunidades.</p>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="surface px-5 py-12 text-center text-sm text-slate-500">
          No tenés postulaciones en este estado.
        </div>
      )}
    </div>
  );
}
