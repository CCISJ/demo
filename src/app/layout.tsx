import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { NavProvider } from '@/components/navContext';

const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CCISJ · Sistema de Gestión',
  description: 'Maqueta del sistema de gestión del Centro Comercial e Industrial de San José',
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="es">
      <body className={jakarta.className}>
        <NavProvider>{children}</NavProvider>
      </body>
    </html>
  );
}
