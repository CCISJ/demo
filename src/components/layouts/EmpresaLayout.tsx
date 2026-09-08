'use client';

import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard, Briefcase, Users, Bell, Building2, Menu, X, ChevronDown, LogOut,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useNav, type EmpresaSection } from '@/components/navContext';

interface NavItem {
  id: EmpresaSection;
  label: string;
  icon: typeof LayoutDashboard;
  count?: number;
}

const items: NavItem[] = [
  { id: 'e-inicio', label: 'Inicio', icon: LayoutDashboard },
  { id: 'e-ofertas', label: 'Mis ofertas', icon: Briefcase },
  { id: 'e-candidatos', label: 'Candidatos', icon: Users },
  { id: 'e-notificaciones', label: 'Notificaciones', icon: Bell, count: 3 },
  { id: 'e-perfil', label: 'Mi empresa', icon: Building2 },
];

const sectionTitles: Record<EmpresaSection, string> = {
  'e-inicio': 'Inicio',
  'e-ofertas': 'Mis ofertas',
  'e-candidatos': 'Candidatos',
  'e-notificaciones': 'Notificaciones',
  'e-perfil': 'Mi empresa',
};

interface EmpresaLayoutProps {
  children: ReactNode;
  section: EmpresaSection;
}

export default function EmpresaLayout({ children, section }: EmpresaLayoutProps) {
  const { onNavigate } = useNav();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 transform flex-col border-r border-line bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-line px-4">
          <Logo size={30} withWordmark />
          <button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
            <X className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Quién está usando el portal. Antes era una tarjeta verde con una
            píldora adentro; alcanza con el nombre y una línea de estado. */}
        <div className="shrink-0 border-b border-line px-4 py-3">
          <p className="truncate text-[13px] font-semibold text-slate-900">Distribuidora San José SRL</p>
          <p className="mt-0.5 text-[12px] text-slate-400">Socio directivo · Cuota al día</p>
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto px-2.5 py-3">
          {items.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate('empresa', item.id);
                setMobileOpen(false);
              }}
              className={`nav-item ${section === item.id ? 'nav-item-active' : ''}`}
            >
              <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span className="flex-1 text-left">{item.label}</span>
              {item.count ? <span className="nav-count">{item.count}</span> : null}
            </button>
          ))}
        </nav>

        <div className="shrink-0 border-t border-line p-2.5">
          <button onClick={() => onNavigate('login', 'inicio')} className="nav-item">
            <LogOut className="h-4 w-4" strokeWidth={1.75} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-slate-900/25 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menú">
            <Menu className="h-5 w-5 text-slate-500" />
          </button>

          <p className="text-[12.5px] font-medium text-slate-400">{sectionTitles[section]}</p>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => onNavigate('empresa', 'e-notificaciones')}
              className="relative rounded-md p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-900"
              aria-label="Notificaciones"
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-rust-500" />
            </button>

            <button className="flex items-center gap-2 rounded-md py-1 pl-1 pr-2 transition-colors hover:bg-slate-100">
              <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-700 text-[11px] font-semibold text-white">
                ME
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-[12.5px] font-medium leading-tight text-slate-900">Marta Echevarría</span>
                <span className="block text-[11px] leading-tight text-slate-400">Representante</span>
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
