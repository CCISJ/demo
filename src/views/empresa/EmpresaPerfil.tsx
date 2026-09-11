'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Status from '@/components/Status';
import {
  socios,
  cuotasPorAnio,
  gastosDelMes,
  configCuotas,
  nombreMesVencimiento,
  periodoActual,
  totalMensualSocio,
  formatPesos,
} from '@/data/mockData';

/** La empresa que tiene la sesión abierta en el portal. */
const socio = socios[0];

/**
 * Los cuatro campos que la empresa mantiene por su cuenta. Todo lo demás
 * —razón social, RUT, rubro, tipo de socio— lo fija el Centro al dar de alta
 * la afiliación, así que acá se muestra y no se toca.
 */
const editables = [
  { key: 'telefono', label: 'Teléfono', value: socio.telefono, type: 'tel' },
  { key: 'email', label: 'Email de contacto', value: socio.email, type: 'email' },
  { key: 'domicilio', label: 'Domicilio', value: socio.domicilio, type: 'text' },
  { key: 'bps', label: 'Nº de empresa BPS', value: socio.bps, type: 'text', mono: true },
] as const;

type CampoEditable = (typeof editables)[number]['key'];

const institucionales: [string, string, boolean?][] = [
  ['Razón social', socio.empresa],
  ['RUT', socio.rut, true],
  ['Rubro', socio.categoria],
  ['Titular', socio.contacto],
  ['Tipo de socio', socio.tipo === 'directivo' ? 'Directivo' : 'Común'],
  ['Socio desde', socio.adhesion],
];

export default function EmpresaPerfil() {
  const [tab, setTab] = useState<'datos' | 'cuota' | 'seguridad'>('datos');

  const tabs = [
    ['datos', 'Datos de la empresa'],
    ['cuota', 'Mi cuota'],
    ['seguridad', 'Seguridad'],
  ] as const;

  return (
    <div className="space-y-4">
      <PageHeader title="Mi empresa" subtitle={socio.empresa} />

      <div className="segment">
        {tabs.map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`segment-item ${tab === k ? 'segment-item-active' : ''}`}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === 'datos' && <Datos />}
      {tab === 'cuota' && <Cuota />}
      {tab === 'seguridad' && <Seguridad />}
    </div>
  );
}

function Datos() {
  const inicial = Object.fromEntries(editables.map((c) => [c.key, c.value])) as Record<
    CampoEditable,
    string
  >;
  const [valores, setValores] = useState(inicial);

  // El botón de guardar solo se enciende cuando hay algo distinto que guardar:
  // un "Guardar cambios" siempre activo no dice nada sobre el estado del form.
  const sucio = editables.some((c) => valores[c.key] !== c.value);
  const set = (k: CampoEditable, v: string) => setValores((prev) => ({ ...prev, [k]: v }));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      <div className="surface lg:col-span-3">
        <div className="card-head">
          <h2 className="card-title">Datos de contacto</h2>
          <span className="text-[12px] text-ink-faint">Los actualizás vos</span>
        </div>

        <form className="grid grid-cols-1 gap-4 px-5 py-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          {editables.map((c) => (
            <div key={c.key} className={c.key === 'domicilio' ? 'sm:col-span-2' : ''}>
              <label className="label" htmlFor={c.key}>
                {c.label}
              </label>
              <input
                id={c.key}
                type={c.type}
                className={`input ${'mono' in c && c.mono ? 'font-mono' : ''}`}
                value={valores[c.key]}
                onChange={(e) => set(c.key, e.target.value)}
              />
              {c.key === 'bps' && (
                <p className="mt-1.5 text-[12px] text-ink-faint">
                  Número de empresa en el Banco de Previsión Social.
                </p>
              )}
            </div>
          ))}
        </form>

        <div className="flex items-center justify-between gap-3 border-t border-line bg-band px-5 py-3">
          <p className="text-[12px] text-ink-faint">
            {sucio ? 'Tenés cambios sin guardar.' : 'No hay cambios pendientes.'}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={!sucio}
              onClick={() => setValores(inicial)}
              className="btn-ghost disabled:invisible"
            >
              Descartar
            </button>
            <button type="button" disabled={!sucio} className="btn-primary disabled:opacity-40">
              Guardar cambios
            </button>
          </div>
        </div>
      </div>

      {/*
        Los datos institucionales no son un formulario deshabilitado: son una
        ficha. Mostrarlos como campos grises invita a pelearse con ellos; como
        lista de lectura, se entiende de una que ese no es el lugar.
      */}
      <div className="surface lg:col-span-2">
        <div className="card-head">
          <h2 className="card-title">Datos de la afiliación</h2>
          <Lock className="h-3.5 w-3.5 text-ink-faint" strokeWidth={1.75} />
        </div>

        <dl className="px-5 py-1">
          {institucionales.map(([label, value, mono]) => (
            <div key={label} className="flex items-baseline justify-between gap-4 border-b border-hair py-2.5">
              <dt className="shrink-0 text-[12.5px] text-ink-faint">{label}</dt>
              <dd className={`text-right text-[13px] text-ink-body ${mono ? 'font-mono text-[12.5px]' : ''}`}>
                {value}
              </dd>
            </div>
          ))}
        </dl>

        <div className="px-5 py-3">
          <p className="text-[12.5px] leading-relaxed text-ink-mute">
            Estos datos los registra el Centro al dar de alta la afiliación. Si alguno cambió,
            escribinos y lo corregimos.
          </p>
          <button className="btn-outline mt-2.5 w-full">Solicitar una corrección</button>
        </div>
      </div>
    </div>
  );
}

function Cuota() {
  const cuotaBase = cuotasPorAnio[cuotasPorAnio.length - 1].valor;
  const gastosMes = gastosDelMes.reduce((a, g) => a + g.monto, 0);
  const total = totalMensualSocio(socio, cuotaBase, gastosMes);

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-5">
      <div className="surface lg:col-span-3">
        <div className="card-head">
          <h2 className="card-title">Cuota de {periodoActual.label.toLowerCase()}</h2>
          <Status tone={socio.pago === 'al-dia' ? 'neutral' : 'alert'}>
            {socio.pago === 'al-dia' ? 'Al día' : 'Vencida'}
          </Status>
        </div>

        {/* El desglose existe para que nadie tenga que llamar preguntando por
            qué este mes le vino distinto. */}
        <dl className="px-5 py-3">
          <div className="flex items-baseline justify-between gap-4 py-2">
            <dt className="text-[13px] text-ink-body">Cuota societaria {cuotasPorAnio.at(-1)?.anio}</dt>
            <dd className="font-mono text-[13px] tabular-nums text-ink">{formatPesos(cuotaBase)}</dd>
          </div>

          {gastosDelMes.map((g) => (
            <div key={g.id} className="flex items-baseline justify-between gap-4 py-2">
              <dt className="text-[13px] text-ink-mute">{g.concepto}</dt>
              <dd className="font-mono text-[13px] tabular-nums text-ink-mute">{formatPesos(g.monto)}</dd>
            </div>
          ))}

          {socio.reintegro ? (
            <div className="flex items-baseline justify-between gap-4 py-2">
              <dt className="text-[13px] text-ink-mute">Reintegro acordado</dt>
              <dd className="font-mono text-[13px] tabular-nums text-ink-mute">
                {formatPesos(socio.reintegro)}
              </dd>
            </div>
          ) : null}

          <div className="mt-1 flex items-baseline justify-between gap-4 border-t-2 border-chrome pt-3">
            <dt className="text-[13px] font-semibold text-ink">Total del mes</dt>
            <dd className="font-mono text-[19px] font-semibold tabular-nums text-ink">
              {formatPesos(total)}
            </dd>
          </div>
        </dl>

        <div className="border-t border-line bg-band px-5 py-3 text-[12px] text-ink-faint">
          Tenés plazo hasta fin de {nombreMesVencimiento(configCuotas.mesesPlazo, periodoActual.mes)} para abonarla.
        </div>
      </div>

      <div className="surface lg:col-span-2">
        <div className="card-head">
          <h2 className="card-title">Últimos pagos</h2>
        </div>
        <ul className="divide-y divide-hair px-5">
          {[
            [periodoActual.label, socio.ultimoPago, total],
            ['Julio 2026', '10/07/2026', total],
            ['Junio 2026', '09/06/2026', total],
          ].map(([mes, fecha, monto]) => (
            <li key={mes as string} className="flex items-baseline justify-between gap-3 py-2.5">
              <div>
                <p className="text-[13px] text-ink-body">{mes}</p>
                <p className="mt-0.5 font-mono text-[12px] text-ink-faint">{fecha}</p>
              </div>
              <span className="font-mono text-[12.5px] tabular-nums text-ink">
                {formatPesos(monto as number)}
              </span>
            </li>
          ))}
        </ul>
        <div className="border-t border-line p-2.5">
          <button className="btn-outline w-full">Descargar comprobantes</button>
        </div>
      </div>
    </div>
  );
}

function Seguridad() {
  return (
    <div className="surface max-w-md">
      <div className="card-head">
        <h2 className="card-title">Cambiar contraseña</h2>
      </div>
      <form className="space-y-4 px-5 py-4" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label className="label" htmlFor="actual">
            Contraseña actual
          </label>
          <input id="actual" type="password" className="input" placeholder="••••••••" />
        </div>
        <div>
          <label className="label" htmlFor="nueva">
            Nueva contraseña
          </label>
          <input id="nueva" type="password" className="input" placeholder="••••••••" />
          <p className="mt-1.5 text-[12px] text-ink-faint">Al menos 8 caracteres.</p>
        </div>
        <div>
          <label className="label" htmlFor="repetir">
            Repetir nueva contraseña
          </label>
          <input id="repetir" type="password" className="input" placeholder="••••••••" />
        </div>
        <button className="btn-primary w-full">Actualizar contraseña</button>
      </form>
    </div>
  );
}
