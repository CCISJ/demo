'use client';

import { useState, type ReactNode } from 'react';
import {
  LayoutDashboard, Building2, Briefcase, Users, Bell, Wallet, FileText,
  FolderKanban, Settings, Search, Menu, X, ChevronDown, LogOut, UserCircle,
} from 'lucide-react';
import Logo from '@/components/Logo';
import Badge from '@/components/Badge';
import { useNav, type AdminSection } from '@/components/navContext';

interface NavItem {
  id: AdminSection;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
}

const items: NavItem[] = [
  { id: 'inicio', label: 'Inicio', icon: LayoutDashboard },
  { id: 'socios', label: 'Socios', icon: Users, badge: '3' },
  { id: 'empresas', label: 'Empresas', icon: Building2 },
  { id: 'bolsa', label: 'Bolsa de trabajo', icon: Briefcase, badge: '5' },
  { id: 'candidatos', label: 'Búsqueda de candidatos', icon: Search },
  { id: 'postulantes', label: 'Postulantes', icon: UserCircle },
  { id: 'notificaciones', label: 'Notificaciones', icon: Bell, badge: '3' },
  { id: 'caja', label: 'Caja', icon: Wallet },
  { id: 'facturacion', label: 'Facturación', icon: FileText },
  { id: 'gestoria', label: 'Gestoría', icon: FolderKanban },
  { id: 'configuracion', label: 'Configuración', icon: Settings },
];

interface AdminLayoutProps {
  children: ReactNode;
  section: AdminSection;
}

export default function AdminLayout({ children, section }: AdminLayoutProps) {
  const { onNavigate } = useNav();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 transform border-r border-slate-200 bg-white transition-transform duration-200 lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-5">
          <Logo size={36} withWordmark />
          <button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Cerrar menú">
            <X className="h-5 w-5 text-slate-400" />
          </button>
        </div>
        <nav className="flex flex-col gap-0.5 overflow-y-auto p-3" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
          <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Backoffice</p>
          {items.map((item) => {
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
                <item.icon className="h-[18px] w-[18px] shrink-0" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto rounded-full bg-rust-100 px-2 py-0.5 text-[11px] font-semibold text-rust-700">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
        <div className="absolute inset-x-0 bottom-0 border-t border-slate-100 p-3">
          <button
            onClick={() => onNavigate('login', 'inicio')}
            className="nav-item w-full"
          >
            <LogOut className="h-[18px] w-[18px]" />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {mobileOpen && (
        <div className="fixed inset-0 z-30 bg-brand-950/30 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      {/* Main */}
      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-slate-200 bg-white/85 px-4 backdrop-blur-md sm:px-6">
          <button className="lg:hidden" onClick={() => setMobileOpen(true)} aria-label="Abrir menú">
            <Menu className="h-5 w-5 text-slate-500" />
          </button>
          <div className="relative hidden flex-1 max-w-md sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input className="input pl-9" placeholder="Buscar socios, ofertas, postulantes…" />
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => onNavigate('admin', 'notificaciones')}
              className="relative rounded-xl p-2 text-slate-500 hover:bg-slate-100"
              aria-label="Notificaciones"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-rust-500 ring-2 ring-white" />
            </button>
            <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white py-1 pl-1 pr-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-700 text-xs font-bold text-white">MA</div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold text-brand-900">Martín Alonso</p>
                <p className="text-[11px] text-slate-400">Personal CCISJ</p>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </div>
          </div>
        </header>

        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
          <div className="mb-5 flex items-center gap-2">
            <Badge tone="brand" variant="solid">Backoffice CCISJ</Badge>
            <span className="text-xs text-slate-400">Martes 26 de agosto, 2026</span>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
}
