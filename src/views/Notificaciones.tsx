'use client';

import { useState } from 'react';
import { CheckCheck } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import { notificaciones, type NotifCategoria } from '@/data/mockData';

const categorias: NotifCategoria[] = [
  'Capacitaciones',
  'Eventos',
  'Comunicados',
  'Bolsa de trabajo',
  'Beneficios para socios',
];

const destinatarioLabel: Record<string, string> = {
  directivos: 'Solo socios directivos',
  'no-directivos': 'Solo socios no directivos',
  todos: '',
};

interface NotificacionesProps {
  variant?: 'admin' | 'empresa' | 'postulante';
}

export default function Notificaciones({ variant = 'postulante' }: NotificacionesProps) {
  const [tab, setTab] = useState<'nuevas' | 'leidas'>('nuevas');
  const [prefs, setPrefs] = useState<Record<string, boolean>>({
    Capacitaciones: true,
    Eventos: true,
    Comunicados: true,
    'Bolsa de trabajo': true,
    'Beneficios para socios': true,
  });

  const filtered = notificaciones
    .filter((n) => (tab === 'nuevas' ? !n.leida : n.leida))
    .sort((a, b) => (a.prioridad === b.prioridad ? 0 : a.prioridad === 'emergente' ? -1 : 1));

  const nuevasCount = notificaciones.filter((n) => !n.leida).length;

  return (
    <div className="space-y-4">
      <PageHeader
        title="Notificaciones"
        actions={
          <button className="btn-outline">
            <CheckCheck className="h-3.5 w-3.5" strokeWidth={1.75} /> Marcar todas como leídas
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="surface overflow-hidden lg:col-span-2">
          <div className="card-head">
            <div className="segment">
              {([['nuevas', `Nuevas · ${nuevasCount}`], ['leidas', 'Leídas']] as const).map(([k, l]) => (
                <button
                  key={k}
                  onClick={() => setTab(k)}
                  className={`segment-item ${tab === k ? 'segment-item-active' : ''}`}
                >
                  {l}
                </button>
              ))}
            </div>
          </div>

          <ul className="divide-y divide-line">
            {filtered.map((n) => {
              const urgente = n.prioridad === 'emergente';
              return (
                /*
                  Una notificación urgente se distingue por una barra al costado,
                  no por pintar toda la fila: el fondo de color en cada ítem
                  hacía que la lista entera pareciera un semáforo.
                */
                <li
                  key={n.id}
                  className={`relative py-3 pl-4 pr-4 ${urgente ? 'before:absolute before:inset-y-0 before:left-0 before:w-[3px] before:bg-alert' : ''}`}
                >
                  <div className="flex items-baseline gap-2">
                    {!n.leida && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-600" />}
                    <p className={`flex-1 text-[13.5px] ${n.leida ? 'text-ink-body' : 'font-semibold text-ink'}`}>
                      {n.titulo}
                    </p>
                    <span className="shrink-0 whitespace-nowrap text-[12px] text-ink-faint">{n.fecha}</span>
                  </div>

                  <p className={`mt-1 text-[13px] leading-relaxed text-ink-mute ${!n.leida ? 'pl-3.5' : ''}`}>
                    {n.cuerpo}
                  </p>

                  <div className={`mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 ${!n.leida ? 'pl-3.5' : ''}`}>
                    {urgente && <span className="chip chip-alert">Emergente</span>}
                    <span className="text-[12px] text-ink-faint">{n.categoria}</span>
                    {destinatarioLabel[n.destinatario] && (
                      <>
                        <span className="text-[12px] text-ink-ghost">·</span>
                        <span className="text-[12px] text-ink-faint">{destinatarioLabel[n.destinatario]}</span>
                      </>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {filtered.length === 0 && (
            <p className="px-4 py-12 text-center text-[13px] text-ink-mute">
              No hay notificaciones en esta sección.
            </p>
          )}
        </div>

        <div className="space-y-4">
          <div className="surface">
            <div className="card-head">
              <h2 className="card-title">Categorías</h2>
            </div>

            {variant === 'empresa' && (
              <p className="border-b border-line px-4 py-2.5 text-[12.5px] text-ink-mute">
                Como socio directivo recibís comunicaciones adicionales del Centro.
              </p>
            )}

            <ul className="divide-y divide-line">
              {categorias.map((cat) => (
                <li key={cat}>
                  <label className="flex cursor-pointer items-center gap-3 px-4 py-2.5">
                    <span className="flex-1 text-[13px] text-ink-body">{cat}</span>
                    <button
                      role="switch"
                      aria-checked={prefs[cat]}
                      onClick={() => setPrefs({ ...prefs, [cat]: !prefs[cat] })}
                      className={`relative h-[18px] w-8 shrink-0 rounded-full transition-colors ${
                        prefs[cat] ? 'bg-brand-700' : 'bg-edge'
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 h-[14px] w-[14px] rounded-full bg-white transition-transform ${
                          prefs[cat] ? 'translate-x-[16px]' : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <div className="surface">
            <div className="card-head">
              <h2 className="card-title">Correo electrónico</h2>
            </div>
            <div className="space-y-2 px-4 py-3">
              <label className="flex items-center gap-2 text-[13px] text-ink-body">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-edge text-brand-600 focus:ring-brand-400"
                  defaultChecked
                />
                Recibir copia por email
              </label>
              <label className="flex items-center gap-2 text-[13px] text-ink-body">
                <input
                  type="checkbox"
                  className="h-3.5 w-3.5 rounded border-edge text-brand-600 focus:ring-brand-400"
                  defaultChecked
                />
                Resumen semanal de novedades
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
