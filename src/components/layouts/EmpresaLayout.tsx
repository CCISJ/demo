'use client';

import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard, Briefcase, Users, Bell, Building2, Menu, X,
  ChevronDown, LogOut, Plus,
} from 'lucide-react';
import Logo from '@/components/Logo';
import Badge from '@/components/Badge';
import { useNav, type EmpresaSection } from '@/components/navContext';

interface NavItem {
  id: EmpresaSection;
  label: string;
  icon: typeof LayoutDashboard;
}

const items: NavItem[] = [
  { id: 'e-inicio', label: 'Inicio', icon: LayoutDashboard },
  { id: 'e-ofertas', label: 'Mis ofertas', icon: Briefcase },
  { id: 'e-candidatos', label: 'Candidatos', icon: Users },
  { id: 'e-notificaciones', label: 'Notificaciones', icon: Bell },
  { id: 'e-perfil', label: 'Mi empresa', icon: Building2 },
];

interface EmpresaLayoutProps {
  children: ReactNode;
  section: EmpresaSection;
}

export default function EmpresaLayout({ children, section }: EmpresaLayoutProps) {
  const { onNavigate } = useNav();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-60 transform border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Logo size={34} withWordmark />
          <button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        <div className="px-4 py-3">
          <div className="rounded-xl bg-brand-50 p-3 ring-1 ring-brand-100">
            <p className="text-[11px] font-medium text-brand-600">Sesión de empresa</p>
            <p className="truncate text-sm font-bold text-brand-900">Distribuidora San José SRL</p>
            <p className="mt-1"><Badge tone="jad" variant="soft">Socio · Al día</Badge></p>
          </div>
        </div>
        <nav className="flex flex-col gap-0.5 px-3">
          {items.map((item) => {
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate('empresa', item.id);
                  setMobileOpen(false);
                }}
                className={`nav-item ${active ? 'nav-item-active' : ''}`}
              >
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
              </button>
            );
          })}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-slate-100 p-3">
          <button onClick={() => onNavigate('login', 'inicio')} className="nav-item w-full">
            <LogOut className="h-[18px] w-[18px]" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-brand-950/30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div className="lg:pl-60">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/85 px-4 backdrop-blur-md sm:px-6">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menú">
            <Menu className="h-5 w-5 text-slate-500" />
          </button>
          <Badge tone="gold" variant="soft">Portal de empresa</Badge>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => onNavigate('empresa', 'e-ofertas')}
              className="btn-gold hidden sm:inline-flex"
            >
              <Plus className="h-4 w-4" />
              Publicar oferta
            </button>
            <button
              onClick={() => onNavigate('empresa', 'e-notificaciones')}
              className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Notificaciones"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rust-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white py-1 pl-1 pr-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-xs font-bold text-white">DS</div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold text-brand-900">Marta Echevarría</p>
                <p className="text-[11px] text-slate-400">Representante</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>
      </div>
    </div>
  );
}
