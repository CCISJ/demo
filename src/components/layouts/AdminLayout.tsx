'use client';

import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard, Building2, Briefcase, Users, Bell, Wallet, FileText,
  FolderKanban, Settings, Search, Menu, X, ChevronDown, LogOut, UserCircle,
} from 'lucide-react';
import Logo from '@/components/Logo';
import { useNav, type AdminSection } from '@/components/navContext';

interface NavItem {
  id: AdminSection;
  label: string;
  icon: typeof LayoutDashboard;
  /** Solo para lo que el usuario tiene pendiente de leer o resolver. */
  count?: number;
}

interface NavGroup {
  title?: string;
  items: NavItem[];
}

/**
 * Once secciones en una lista plana se leen como un muro. Agrupadas por área
 * de trabajo, el ojo salta al bloque correcto y recién ahí lee.
 */
const groups: NavGroup[] = [
  {
    items: [
      { id: 'inicio', label: 'Inicio', icon: LayoutDashboard },
      { id: 'notificaciones', label: 'Notificaciones', icon: Bell, count: 3 },
    ],
  },
  {
    title: 'Institución',
    items: [
      { id: 'socios', label: 'Socios', icon: Users },
      { id: 'empresas', label: 'Empresas', icon: Building2 },
    ],
  },
  {
    title: 'Empleo',
    items: [
      { id: 'bolsa', label: 'Bolsa de trabajo', icon: Briefcase },
      { id: 'candidatos', label: 'Búsqueda de candidatos', icon: Search },
      { id: 'postulantes', label: 'Postulantes', icon: UserCircle },
    ],
  },
  {
    title: 'Administración',
    items: [
      { id: 'caja', label: 'Caja', icon: Wallet },
      { id: 'facturacion', label: 'Facturación', icon: FileText },
      { id: 'gestoria', label: 'Gestoría', icon: FolderKanban },
    ],
  },
  {
    title: 'Sistema',
    items: [{ id: 'configuracion', label: 'Configuración', icon: Settings }],
  },
];

const sectionTitles: Record<AdminSection, string> = {
  inicio: 'Inicio',
  socios: 'Socios',
  empresas: 'Empresas',
  bolsa: 'Bolsa de trabajo',
  candidatos: 'Búsqueda de candidatos',
  postulantes: 'Postulantes',
  notificaciones: 'Notificaciones',
  caja: 'Caja',
  facturacion: 'Facturación',
  gestoria: 'Gestoría',
  configuracion: 'Configuración',
};

interface AdminLayoutProps {
  children: ReactNode;
  section: AdminSection;
}

export default function AdminLayout({ children, section }: AdminLayoutProps) {
  const { onNavigate } = useNav();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-canvas">
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-60 transform flex-col bg-chrome text-chrome-text transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-white/10 px-4">
          <Logo size={30} withWordmark variant="light" />
          <button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
            <X className="h-4 w-4 text-chrome-dim" />
          </button>
        </div>

        <nav className="flex-1 space-y-5 overflow-y-auto px-2.5 py-4">
          {groups.map((group, i) => (
            <div key={group.title ?? i}>
              {group.title && <p className="nav-group">{group.title}</p>}
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const active = section === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onNavigate('admin', item.id);
                        setMobileOpen(false);
                      }}
                      className={`nav-item ${active ? 'nav-item-active' : ''}`}
                    >
                      <item.icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
                      <span className="flex-1 text-left">{item.label}</span>
                      {item.count ? <span className="nav-count">{item.count}</span> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="shrink-0 border-t border-white/10 p-2.5">
          <button onClick={() => onNavigate('login', 'inicio')} className="nav-item">
            <LogOut className="h-4 w-4" strokeWidth={1.75} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-chrome/30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <div className="lg:pl-60">
        {/*
          La barra superior orienta y nada más: dónde estoy, qué tengo sin leer,
          quién soy. El buscador global vivía acá sin hacer nada en ninguna
          pantalla; la búsqueda ahora está dentro de cada listado, que es donde
          se usa.
        */}
        <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-surface/95 px-4 backdrop-blur sm:px-6">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menú">
            <Menu className="h-5 w-5 text-ink-mute" />
          </button>

          {/* Contexto, no título: el H1 de la pantalla es el que manda. */}
          <p className="text-[12.5px] font-medium text-ink-faint">{sectionTitles[section]}</p>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={() => onNavigate('admin', 'notificaciones')}
              className="relative p-2 text-ink-mute transition-colors hover:bg-band hover:text-ink"
              aria-label="Notificaciones"
            >
              <Bell className="h-[18px] w-[18px]" strokeWidth={1.75} />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-alert" />
            </button>

            <button className="flex items-center gap-2 py-1 pl-1 pr-2 transition-colors hover:bg-band">
              <span className="flex h-7 w-7 items-center justify-center bg-chrome text-[11px] font-semibold text-white">
                MA
              </span>
              <span className="hidden text-left sm:block">
                <span className="block text-[12.5px] font-medium leading-tight text-ink">Martín Alonso</span>
                <span className="block text-[11px] leading-tight text-ink-faint">Personal CCISJ</span>
              </span>
              <ChevronDown className="h-3.5 w-3.5 text-ink-faint" />
            </button>
          </div>
        </header>

        <main className="mx-auto max-w-[1180px] px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
