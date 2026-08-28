'use client';

import { useState, type ReactNode } from 'react';
import {
  Home, Search, FileText, User, Bell, Menu, X, ChevronDown, LogOut,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useNav, type PostulanteSection } from '@/components/navContext';

interface NavItem {
  id: PostulanteSection;
  label: string;
  icon: typeof Home;
}

const items: NavItem[] = [
  { id: 'p-inicio', label: 'Inicio', icon: Home },
  { id: 'p-empleos', label: 'Buscar empleos', icon: Search },
  { id: 'p-postulaciones', label: 'Mis postulaciones', icon: FileText },
  { id: 'p-cv', label: 'Mi perfil y CV', icon: User },
  { id: 'p-notificaciones', label: 'Notificaciones', icon: Bell },
];

interface PostulanteLayoutProps {
  children: ReactNode;
  section: PostulanteSection;
}

export default function PostulanteLayout({ children, section }: PostulanteLayoutProps) {
  const { onNavigate } = useNav();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/85 px-4 backdrop-blur-md sm:px-6">
        <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menú">
          <Menu className="h-5 w-5 text-slate-500" />
        </button>
        <Logo size={34} withWordmark />
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {items.map((item) => {
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate('postulante', item.id)}
                className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                  active ? 'bg-brand-50 text-brand-800' : 'text-slate-500 hover:bg-slate-100 hover:text-brand-800'
                }`}
              >
                <item.icon className="h-[18px] w-[18px]" />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => onNavigate('postulante', 'p-notificaciones')}
            className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rust-500 ring-2 ring-white" />
          </button>
          <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white py-1 pl-1 pr-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-xs font-bold text-white">RA</div>
            <div className="hidden text-left sm:block">
              <p className="text-xs font-semibold text-brand-900">Rodrigo Almirón</p>
              <p className="text-[11px] text-slate-400">Postulante</p>
            </div>
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-brand-950/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-white p-4 shadow-soft">
            <div className="mb-4 flex items-center justify-between">
              <Logo size={32} withWordmark />
              <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
                <X className="h-5 w-5 text-slate-400" />
              </button>
            </div>
            <nav className="flex flex-col gap-0.5">
              {items.map((item) => {
                const active = section === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      onNavigate('postulante', item.id);
                      setMobileOpen(false);
                    }}
                    className={`nav-item ${active ? 'nav-item-active' : ''}`}
                  >
                    <item.icon className="h-[18px] w-[18px]" />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <div className="mt-4 border-t border-slate-100 pt-3">
              <button onClick={() => onNavigate('login', 'inicio')} className="nav-item w-full">
                <LogOut className="h-[18px] w-[18px]" />
                Cerrar sesión
              </button>
            </div>
          </aside>
        </div>
      )}

      <main className="mx-auto max-w-5xl px-4 py-6 sm:px-6 sm:py-8">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="sticky bottom-0 z-20 flex items-center justify-around border-t border-slate-200 bg-white/95 px-2 py-1.5 backdrop-blur lg:hidden">
        {items.map((item) => {
          const active = section === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate('postulante', item.id)}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium ${
                active ? 'text-brand-700' : 'text-slate-400'
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label.split(' ')[0]}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
