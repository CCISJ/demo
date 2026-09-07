'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ShieldCheck, Building2, User } from 'lucide-react';
import Logo from '@/components/Logo';
import { useNav } from '@/components/navContext';

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
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left brand panel */}
      <div className="relative hidden flex-col justify-between overflow-hidden bg-brand-900 p-10 text-white lg:flex">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #0ac259 0, transparent 40%), radial-gradient(circle at 80% 70%, #037032 0, transparent 45%)' }} />
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold-500/10 blur-2xl" />
        <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />

        <div className="relative z-10">
          <Logo size={44} withWordmark variant="light" />
        </div>

        <div className="relative z-10 max-w-md">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-brand-100 ring-1 ring-white/15">
            <ShieldCheck className="h-3.5 w-3.5 text-gold-400" />
            Sistema institucional de gestión
          </p>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">
            Una sola plataforma para el Centro, sus socios y los postulantes.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-brand-200">
            Gestión de socios, bolsa de trabajo, caja, facturación y gestoría — integrados bajo una misma identidad visual, pensada para el día a día de la institución.
          </p>

          <div className="mt-8 grid grid-cols-3 gap-3">
            {[
              { k: '120+', v: 'Socios activos' },
              { k: '5', v: 'Ofertas abiertas' },
              { k: '1.840', v: 'Postulantes' },
            ].map((s) => (
              <div key={s.v} className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                <p className="text-xl font-bold text-gold-400">{s.k}</p>
                <p className="text-[11px] text-brand-200">{s.v}</p>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-xs text-brand-300">
          © 2026 Centro Comercial e Industrial de San José · Uruguay
        </p>
      </div>

      {/* Right form panel */}
      <div className="flex items-center justify-center bg-slate-50 px-5 py-10 sm:px-10">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="mb-6 lg:hidden">
            <Logo size={40} withWordmark />
          </div>

          <h1 className="text-2xl font-bold tracking-tight text-brand-900">Iniciar sesión</h1>
          <p className="mt-1 text-sm text-slate-500">Accedé al sistema del CCISJ con tu cuenta institucional.</p>

          {/* Role selector */}
          <div className="mt-6 grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1">
            {([
              { id: 'admin', label: 'CCISJ', icon: ShieldCheck },
              { id: 'empresa', label: 'Empresa', icon: Building2 },
              { id: 'postulante', label: 'Postulante', icon: User },
            ] as const).map((r) => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`flex items-center justify-center gap-1.5 rounded-lg px-2 py-2 text-xs font-semibold transition-all ${
                  role === r.id ? 'bg-white text-brand-800 shadow-sm' : 'text-slate-500 hover:text-brand-800'
                }`}
              >
                <r.icon className="h-3.5 w-3.5" />
                {r.label}
              </button>
            ))}
          </div>

          <form className="mt-5 space-y-4" onSubmit={(e) => { e.preventDefault(); enter(); }}>
            <div>
              <label className="label" htmlFor="email">Correo electrónico o usuario</label>
              <div className="relative">
                <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="email"
                  className="input pl-9"
                  placeholder="nombre@ccisj.org.uy"
                  defaultValue={role === 'admin' ? 'martin@ccisj.org.uy' : role === 'empresa' ? 'marta@distribuidorasj.com.uy' : 'rodrigo.almiron@gmail.com'}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="label" htmlFor="pass">Contraseña</label>
                <button type="button" className="text-xs font-medium text-brand-600 hover:text-brand-800">¿Olvidaste tu contraseña?</button>
              </div>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  id="pass"
                  type={showPass ? 'text' : 'password'}
                  className="input pl-9 pr-10"
                  placeholder="••••••••"
                  defaultValue="demo1234"
                />
                <button
                  type="button"
                  onClick={() => setShowPass((s) => !s)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"
                  aria-label={showPass ? 'Ocultar' : 'Mostrar'}
                >
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-slate-600">
              <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-400" defaultChecked />
              Recordarme en este dispositivo
            </label>

            <button type="submit" className="btn-primary w-full">
              Iniciar sesión
              <ArrowRight className="h-4 w-4" />
            </button>
          </form>

          <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 text-sm">
            <p className="font-semibold text-brand-900">¿Sos postulante y no tenés cuenta?</p>
            <p className="mt-0.5 text-slate-500">Creá tu cuenta para acceder a la bolsa de trabajo del CCISJ.</p>
            <button onClick={() => onNavigate('postulante', 'p-inicio')} className="btn-outline mt-3 w-full">
              Crear cuenta de postulante
            </button>
          </div>

          <p className="mt-4 text-center text-xs text-slate-400">
            Las empresas no se registran libremente. Sus usuarios son creados por el CCISJ.
          </p>
        </div>
      </div>
    </div>
  );
}
