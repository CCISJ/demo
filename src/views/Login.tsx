'use client';

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Logo from '@/components/Logo';
import { useNav } from '@/components/navContext';

const cuentas = {
  admin: 'martin@ccisj.org.uy',
  empresa: 'marta@distribuidorasj.com.uy',
  postulante: 'rodrigo.almiron@gmail.com',
} as const;

export default function Login() {
  const { onNavigate } = useNav();
  const [showPass, setShowPass] = useState(false);
  const [role, setRole] = useState<'admin' | 'empresa' | 'postulante'>('admin');

  const enter = () => {
    if (role === 'admin') onNavigate('admin', 'inicio');
    else if (role === 'empresa') onNavigate('empresa', 'e-inicio');
    else onNavigate('postulante', 'p-inicio');
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-[1fr_460px]">
      {/*
        Panel institucional. Antes tenía dos degradados radiales, dos manchas
        difuminadas y tres cifras doradas inventadas. Un verde plano, el
        logotipo y una frase sostienen mejor la seriedad de una cámara
        empresarial que un fondo con efectos.
      */}
      <div className="hidden flex-col justify-between bg-brand-800 p-12 text-white lg:flex">
        <Logo size={40} withWordmark variant="light" />

        <div className="max-w-lg">
          <h2 className="text-[32px] font-semibold leading-[1.15] tracking-tight">
            Una sola plataforma para el Centro, sus socios y los postulantes.
          </h2>
          <p className="mt-5 max-w-md text-[14px] leading-relaxed text-brand-100/80">
            Gestión de socios, bolsa de trabajo, caja, facturación y gestoría, integrados en el sistema
            institucional del CCISJ.
          </p>
        </div>

        <p className="text-[12px] text-brand-100/50">
          © 2026 Centro Comercial e Industrial de San José · Uruguay
        </p>
      </div>

      <div className="flex items-center justify-center bg-white px-6 py-12">
        <div className="animate-fade-in w-full max-w-[340px]">
          <div className="mb-8 lg:hidden">
            <Logo size={36} withWordmark />
          </div>

          <h1 className="text-[20px] font-semibold tracking-tight text-slate-900">Iniciar sesión</h1>
          <p className="mt-1 text-[13px] text-slate-500">Accedé con tu cuenta institucional.</p>

          <div className="mt-6">
            <p className="section-label mb-1.5">Tipo de cuenta</p>
            <div className="segment w-full">
              {(
                [
                  ['admin', 'CCISJ'],
                  ['empresa', 'Empresa'],
                  ['postulante', 'Postulante'],
                ] as const
              ).map(([id, label]) => (
                <button
                  key={id}
                  onClick={() => setRole(id)}
                  className={`segment-item flex-1 ${role === id ? 'segment-item-active' : ''}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <form
            className="mt-5 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              enter();
            }}
          >
            <div>
              <label className="label" htmlFor="email">
                Correo electrónico
              </label>
              <input id="email" className="input" placeholder="nombre@ccisj.org.uy" value={cuentas[role]} readOnly />
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <label className="label" htmlFor="pass">
                  Contraseña
                </label>
                <button type="button" className="btn-link mb-1 text-[12px]">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              <div className="relative">
                <input
                  id="pass"
                  type={showPass ? 'text' : 'password'}
                  className="input pr-9"
                  placeholder="••••••••"
                  defaultValue="demo1234"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded p-1.5 text-slate-400 transition-colors hover:text-slate-700"
                  aria-label={showPass ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-[13px] text-slate-600">
              <input
                type="checkbox"
                className="h-3.5 w-3.5 rounded border-slate-300 text-brand-600 focus:ring-brand-400"
                defaultChecked
              />
              Recordarme en este dispositivo
            </label>

            <button type="submit" className="btn-primary w-full py-2">
              Iniciar sesión
            </button>
          </form>

          <div className="mt-8 border-t border-line pt-5">
            <p className="text-[13px] text-slate-600">¿Sos postulante y no tenés cuenta?</p>
            <button onClick={() => onNavigate('postulante', 'p-inicio')} className="btn-outline mt-2 w-full">
              Crear cuenta de postulante
            </button>
            <p className="mt-3 text-[12px] leading-relaxed text-slate-400">
              Las empresas no se registran libremente: sus usuarios los crea el CCISJ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
