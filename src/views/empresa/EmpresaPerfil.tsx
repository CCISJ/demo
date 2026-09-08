'use client';

import { useState } from 'react';
import PageHeader from '@/components/PageHeader';

export default function EmpresaPerfil() {
  const [tab, setTab] = useState<'datos' | 'seguridad'>('datos');

  return (
    <div className="space-y-4">
      <PageHeader title="Mi empresa" subtitle="Datos de la cuenta" />

      <div className="segment">
        {([['datos', 'Datos de la empresa'], ['seguridad', 'Seguridad']] as const).map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`segment-item ${tab === k ? 'segment-item-active' : ''}`}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === 'datos' ? (
        <div className="surface">
          <div className="card-head">
            <div>
              <h2 className="card-title">Distribuidora San José SRL</h2>
              <p className="mt-0.5 text-[12px] text-slate-400">Socio directivo · Cuota al día</p>
            </div>
            <button className="btn-primary">Guardar cambios</button>
          </div>

          <form className="grid grid-cols-1 gap-4 px-4 py-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="label">Razón social</label>
              <input className="input" defaultValue="Distribuidora San José SRL" />
            </div>
            <div>
              <label className="label">RUT</label>
              <input className="input font-mono" defaultValue="210458930012" readOnly />
            </div>
            <div>
              <label className="label">Email institucional</label>
              <input className="input" defaultValue="marta@distribuidorasj.com.uy" />
            </div>
            <div>
              <label className="label">Teléfono</label>
              <input className="input" defaultValue="099 452 310" />
            </div>
            <div>
              <label className="label">Rubro / Categoría</label>
              <input className="input" defaultValue="Comercio mayorista" />
            </div>
            <div>
              <label className="label">Domicilio</label>
              <input className="input" defaultValue="Av. Artigas 1234, San José" />
            </div>
            <div className="sm:col-span-2">
              <label className="label">Representante legal</label>
              <input className="input" defaultValue="Marta Echevarría" />
            </div>
          </form>
        </div>
      ) : (
        <div className="surface max-w-md">
          <div className="card-head">
            <h2 className="card-title">Cambiar contraseña</h2>
          </div>
          <form className="space-y-4 px-4 py-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="label">Contraseña actual</label>
              <input type="password" className="input" placeholder="••••••••" />
            </div>
            <div>
              <label className="label">Nueva contraseña</label>
              <input type="password" className="input" placeholder="••••••••" />
            </div>
            <div>
              <label className="label">Confirmar nueva contraseña</label>
              <input type="password" className="input" placeholder="••••••••" />
            </div>
            <button className="btn-primary w-full">Actualizar contraseña</button>
          </form>
        </div>
      )}
    </div>
  );
}
