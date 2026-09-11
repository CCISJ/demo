'use client';

import { Plus } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Status from '@/components/Status';
import { useNav } from '@/components/navContext';
import {
  ofertas,
  socios,
  configCuotas,
  nombreMesVencimiento,
  periodoActual,
  notificacionesDe,
} from '@/data/mockData';

/** La empresa que tiene la sesión abierta en el portal. */
const socio = socios[0];

const accesos = [
  { title: 'Mis datos', desc: 'Contacto y número de BPS', target: 'e-perfil' as const },
  { title: 'Mi cuota', desc: 'Qué se paga este mes', target: 'e-perfil' as const },
  { title: 'Ver candidatos', desc: 'Postulaciones recibidas', target: 'e-candidatos' as const },
];

export default function EmpresaDashboard() {
  const { onNavigate } = useNav();
  const misOfertas = ofertas.filter((o) => o.empresa === socio.empresa);
  const listado = misOfertas.length ? misOfertas : ofertas.slice(0, 3);
  const activas = misOfertas.filter((o) => o.estado === 'activa').length;
  const nuevosCandidatos = misOfertas.reduce((a, o) => a + o.candidatos, 0);
  // Las novedades son las mismas notificaciones del portal, no una lista
  // aparte que se escribe a mano y se desfasa de la campana del menú.
  const novedades = notificacionesDe('empresa').slice(0, 3);

  return (
    <div className="space-y-4">
      <PageHeader
        title="Hola, Marta"
        subtitle="Distribuidora San José SRL"
        actions={
          <button onClick={() => onNavigate('empresa', 'e-ofertas')} className="btn-primary">
            <Plus className="h-3.5 w-3.5" strokeWidth={2} /> Publicar oferta
          </button>
        }
      />

      {/*
        La condición de socio era un panel verde a sangre con dos píldoras
        encima. Es un dato de referencia, no un cartel: va en la misma tira que
        el resto de las cifras.
      */}
      <div className="metric-strip">
        <div className="metric">
          <p className="metric-label">Condición</p>
          <p className="mt-1 text-[15px] font-medium text-ink">
            {socio.tipo === 'directivo' ? 'Socio directivo' : 'Socio común'}
          </p>
          <p className="metric-note">Desde {socio.adhesion}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Cuota</p>
          <p className="mt-1 text-[15px] font-medium text-ink">
            {socio.pago === 'al-dia' ? 'Al día' : 'Vencida'}
          </p>
          <p className="metric-note">
            Plazo hasta fin de {nombreMesVencimiento(configCuotas.mesesPlazo, periodoActual.mes)}
          </p>
        </div>
        <div className="metric">
          <p className="metric-label">Ofertas activas</p>
          <p className="metric-value">{activas}</p>
        </div>
        <div className="metric">
          <p className="metric-label">Postulaciones recibidas</p>
          <p className="metric-value">{nuevosCandidatos}</p>
          <p className="metric-note">
            En {misOfertas.length} {misOfertas.length === 1 ? 'oferta publicada' : 'ofertas publicadas'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="surface lg:col-span-2">
          <div className="card-head">
            <h2 className="card-title">Mis ofertas</h2>
            <button onClick={() => onNavigate('empresa', 'e-ofertas')} className="btn-link">
              Ver todas
            </button>
          </div>
          <ul className="divide-y divide-line">
            {listado.map((o) => (
              <li key={o.id} className="flex items-center gap-3 px-4 py-2.5">
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[13px] font-medium text-ink">{o.puesto}</p>
                  <p className="text-[12px] text-ink-faint">
                    {o.categoria} · cierra {o.cierra}
                  </p>
                </div>
                <Status tone={o.estado === 'activa' ? 'neutral' : 'muted'}>
                  {o.estado === 'activa' ? 'Activa' : 'Cerrada'}
                </Status>
                <p className="w-10 shrink-0 text-right font-mono text-[12.5px] tabular-nums text-ink">
                  {o.candidatos}
                </p>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface">
          <div className="card-head">
            <h2 className="card-title">Novedades</h2>
            <button onClick={() => onNavigate('empresa', 'e-notificaciones')} className="btn-link">
              Ver todas
            </button>
          </div>
          <ul className="divide-y divide-line">
            {novedades.map((n) => (
              <li key={n.id} className="px-4 py-2.5">
                <div className="flex items-baseline justify-between gap-2">
                  <p className={`text-[13px] text-ink ${n.leida ? '' : 'font-medium'}`}>{n.titulo}</p>
                  <span className="shrink-0 whitespace-nowrap text-[12px] text-ink-faint">{n.fecha}</span>
                </div>
                <p className="mt-0.5 line-clamp-2 text-[12.5px] text-ink-mute">{n.cuerpo}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="surface flex flex-wrap divide-line sm:divide-x">
        {accesos.map((a) => (
          <button
            key={a.title}
            onClick={() => onNavigate('empresa', a.target)}
            className="flex-1 px-4 py-3 text-left transition-colors hover:bg-band"
          >
            <p className="text-[13px] font-medium text-ink">{a.title}</p>
            <p className="mt-0.5 text-[12px] text-ink-faint">{a.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
