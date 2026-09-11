'use client';

import { useState, type ReactNode } from 'react';
import {
  Home, Search, FileText, User, Bell, Menu, X, ChevronDown, LogOut,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useNav, type PostulanteSection } from '@/components/navContext';
import { sinLeerDe } from '@/data/mockData';

/** Lo que ese portal tiene sin leer, contado desde los datos. */
const sinLeer = sinLeerDe('postulante');

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
    <div className="min-h-screen bg-canvas">
      <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-line bg-white/90 px-4 backdrop-blur sm:px-6">
        <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menú">
          <Menu className="h-5 w-5 text-ink-mute" />
        </button>
        <Logo size={30} withWordmark />
        <nav className="ml-6 hidden items-center gap-1 lg:flex">
          {items.map((item) => {
            const active = section === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate('postulante', item.id)}
                className={`flex items-center gap-2 rounded-md px-2.5 py-[7px] text-[13px] font-medium transition-colors ${
                  active ? 'bg-brand-50 font-semibold text-brand-800' : 'text-ink-mute hover:bg-band hover:text-ink'
                }`}
              >
                <item.icon className="h-4 w-4" strokeWidth={1.75} />
                {item.label}
              </button>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-3">
          <button
            onClick={() => onNavigate('postulante', 'p-notificaciones')}
            className="relative rounded-md p-2 text-ink-mute transition-colors hover:bg-band hover:text-ink"
            aria-label="Notificaciones"
          >
            <Bell className="h-5 w-5" />
            {/* El punto avisa que hay algo sin leer. Si no hay nada, no hay
                punto: un aviso permanente deja de ser un aviso. */}
            {sinLeer > 0 && (
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-alert" />
            )}
          </button>
          <div className="flex items-center gap-2 rounded-md py-1 pl-1 pr-2 transition-colors hover:bg-band">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-700 text-[11px] font-semibold text-white">RA</div>
            <div className="hidden text-left sm:block">
              <p className="text-[12.5px] font-medium leading-tight text-ink">Rodrigo Almirón</p>
              <p className="text-[11px] text-ink-faint">Postulante</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-ink-faint" />
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-chrome/30" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 border-r border-line bg-white p-3 shadow-pop">
            <div className="mb-4 flex items-center justify-between">
              <Logo size={32} withWordmark />
              <button onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
                <X className="h-5 w-5 text-ink-faint" />
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
                    <item.icon className="h-4 w-4" strokeWidth={1.75} />
                    {item.label}
                  </button>
                );
              })}
            </nav>
            <div className="mt-4 border-t border-line pt-3">
              <button onClick={() => onNavigate('login', 'inicio')} className="nav-item w-full">
                <LogOut className="h-4 w-4" strokeWidth={1.75} />
                Cerrar sesión
              </button>
            </div>
          </aside>
        </div>
      )}

      <main className="mx-auto max-w-[1100px] px-4 py-6 sm:px-6">{children}</main>

      {/* Mobile bottom nav */}
      <nav className="sticky bottom-0 z-20 flex items-center justify-around border-t border-line bg-white/95 px-2 py-1.5 backdrop-blur lg:hidden">
        {items.map((item) => {
          const active = section === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate('postulante', item.id)}
              className={`flex flex-col items-center gap-0.5 rounded-lg px-3 py-1.5 text-[10px] font-medium ${
                active ? 'text-brand-700' : 'text-ink-faint'
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
