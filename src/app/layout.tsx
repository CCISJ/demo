import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { IBM_Plex_Sans, IBM_Plex_Mono } from 'next/font/google';
import './globals.css';
import { NavProvider } from '@/components/navContext';

// IBM Plex: una grotesca con carácter institucional, legible en tamaños chicos
// y con una mono hermana para RUTs, importes y códigos — que en un sistema de
// gestión son la mitad de la pantalla.
const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'CCISJ · Sistema de Gestión',
  description: 'Maqueta del sistema de gestión del Centro Comercial e Industrial de San José',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${plexSans.variable} ${plexMono.variable} ${plexSans.className}`}>
        <NavProvider>{children}</NavProvider>
      </body>
    </html>
  );
}
