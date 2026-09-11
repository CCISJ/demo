'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export type Experience = 'login' | 'admin' | 'empresa' | 'postulante';

export type AdminSection =
  | 'inicio' | 'socios' | 'bolsa' | 'candidatos' | 'postulantes'
  | 'notificaciones' | 'caja' | 'facturacion' | 'gestoria' | 'configuracion';
export type EmpresaSection = 'e-inicio' | 'e-ofertas' | 'e-candidatos' | 'e-notificaciones' | 'e-perfil';
export type PostulanteSection = 'p-inicio' | 'p-empleos' | 'p-postulaciones' | 'p-cv' | 'p-notificaciones';
export type Section = AdminSection | EmpresaSection | PostulanteSection;

interface NavContextValue {
  experience: Experience;
  section: Section;
  onNavigate: (exp: Experience, section: Section) => void;
}

const routes: Record<string, string> = {
  'login:inicio': '/',
  'admin:inicio': '/admin',
  'admin:socios': '/admin/socios',
  'admin:bolsa': '/admin/bolsa',
  'admin:candidatos': '/admin/candidatos',
  'admin:postulantes': '/admin/postulantes',
  'admin:notificaciones': '/admin/notificaciones',
  'admin:caja': '/admin/caja',
  'admin:facturacion': '/admin/facturacion',
  'admin:gestoria': '/admin/gestoria',
  'admin:configuracion': '/admin/configuracion',
  'empresa:e-inicio': '/empresa',
  'empresa:e-ofertas': '/empresa/ofertas',
  'empresa:e-candidatos': '/empresa/candidatos',
  'empresa:e-notificaciones': '/empresa/notificaciones',
  'empresa:e-perfil': '/empresa/perfil',
  'postulante:p-inicio': '/postulante',
  'postulante:p-empleos': '/postulante/empleos',
  'postulante:p-postulaciones': '/postulante/postulaciones',
  'postulante:p-cv': '/postulante/cv',
  'postulante:p-notificaciones': '/postulante/notificaciones',
};

function stateFromPath(pathname: string): Pick<NavContextValue, 'experience' | 'section'> {
  const match = Object.entries(routes).find(([, path]) => path === pathname);
  if (match) {
    const [experience, section] = match[0].split(':') as [Experience, Section];
    return { experience, section };
  }
  if (pathname.startsWith('/admin')) return { experience: 'admin', section: 'inicio' };
  if (pathname.startsWith('/empresa')) return { experience: 'empresa', section: 'e-inicio' };
  if (pathname.startsWith('/postulante')) return { experience: 'postulante', section: 'p-inicio' };
  return { experience: 'login', section: 'inicio' };
}

export const NavContext = createContext<NavContextValue>({
  experience: 'login', section: 'inicio', onNavigate: () => {},
});

export function NavProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { experience, section } = stateFromPath(pathname);
  const onNavigate = (exp: Experience, sec: Section) => router.push(routes[`${exp}:${sec}`] ?? '/');
  return <NavContext.Provider value={{ experience, section, onNavigate }}>{children}</NavContext.Provider>;
}

export const useNav = () => useContext(NavContext);
