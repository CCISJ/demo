'use client';

import { useState } from 'react';
import { Building2, Lock, Mail, Phone, MapPin, Save, User } from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/Badge';

export default function EmpresaPerfil() {
  const [tab, setTab] = useState<'datos' | 'seguridad'>('datos');

  return (
    <div className="space-y-6">
      <PageHeader title="Mi empresa" subtitle="Gestioná los datos de tu cuenta y tu contraseña" />

      <div className="flex rounded-lg bg-slate-100 p-0.5 w-fit">
        {([['datos', 'Datos de la empresa'], ['seguridad', 'Seguridad']] as const).map(([k, l]) => (
          <button
            key={k}
            onClick={() => setTab(k)}
            className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-colors ${tab === k ? 'bg-white text-brand-700 shadow-sm' : 'text-slate-500 hover:text-brand-700'}`}
          >
            {l}
          </button>
        ))}
      </div>

      {tab === 'datos' ? (
        <div className="surface p-5">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-5">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-700 text-lg font-bold text-white">DS</div>
            <div>
              <p className="text-lg font-bold text-brand-900">Distribuidora San José SRL</p>
              <div className="mt-1 flex gap-2">
                <Badge tone="gold">Socio directivo</Badge>
                <Badge tone="jad">Al día</Badge>
              </div>
            </div>
          </div>

          <form className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
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
              <div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="input pl-9" defaultValue="marta@distribuidorasj.com.uy" /></div>
            </div>
            <div>
              <label className="label">Teléfono</label>
              <div className="relative"><Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="input pl-9" defaultValue="099 452 310" /></div>
            </div>
            <div>
              <label className="label">Rubro / Categoría</label>
              <input className="input" defaultValue="Comercio mayorista" />
            </div>
            <div>
              <label className="label">Domicilio</label>
              <div className="relative"><MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="input pl-9" defaultValue="Av. Artigas 1234, San José" /></div>
            </div>
            <div className="sm:col-span-2">
              <label className="label">Representante legal</label>
              <div className="relative"><User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="input pl-9" defaultValue="Marta Echevarría" /></div>
            </div>
            <div className="sm:col-span-2 flex justify-end">
              <button className="btn-primary"><Save className="h-4 w-4" /> Guardar cambios</button>
            </div>
          </form>
        </div>
      ) : (
        <div className="surface max-w-md p-5">
          <div className="flex items-center gap-2">
            <Lock className="h-4 w-4 text-brand-600" />
            <h2 className="text-base font-bold text-brand-900">Cambiar contraseña</h2>
          </div>
          <form className="mt-4 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="label">Contraseña actual</label>
              <input type="password" className="input" placeholder="••••••••" />
            </div>
            <div>
              <label className="label">Nueva contraseña</label>
              <input type="password" className="input" placeholder="•••••••••" />
            </div>
            <div>
              <label className="label">Confirmar nueva contraseña</label>
              <input type="password" className="input" placeholder="•••••••••" />
            </div>
            <button className="btn-primary w-full"><Save className="h-4 w-4" /> Actualizar contraseña</button>
          </form>
        </div>
      )}
    </div>
  );
}
