'use client';

import { Search } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

const modulos = [
  { titulo: 'Trámites societarios', desc: 'Alta, baja y modificación de socios.' },
  { titulo: 'Certificados', desc: 'Emisión de certificados de socios y de origen.' },
  { titulo: 'Presentaciones', desc: 'Gestión de presentaciones ante organismos.' },
];

export default function AdminGestoria() {
  return (
    <div className="space-y-4">
      <PageHeader
        title="Gestoría"
        subtitle="Trámites y servicios al socio"
        actions={
          <button className="btn-outline" disabled>
            <Search className="h-3.5 w-3.5" strokeWidth={1.75} /> Buscar trámite
          </button>
        }
      />

      {/*
        Un módulo sin definir se avisa una vez y con calma. La versión anterior
        lo anunciaba con un panel ámbar, un ícono grande, una píldora
        "Próximamente" y además un estado vacío al pie: cuatro veces el mismo
        mensaje.
      */}
      <div className="surface">
        <div className="card-head">
          <h2 className="card-title">Módulo en relevamiento</h2>
          <span className="chip">Sin habilitar</span>
        </div>
        <p className="max-w-2xl px-4 py-3 text-[13px] leading-relaxed text-slate-600">
          La gestoría del CCISJ está en proceso de relevamiento interno. El módulo se habilita
          una vez definidos los tipos de trámite, los circuitos de aprobación y los responsables
          de cada uno.
        </p>
      </div>

      <div>
        <p className="section-label mb-2">Alcance previsto</p>
        <div className="surface divide-y divide-line">
          {modulos.map((m) => (
            <div key={m.titulo} className="px-4 py-3">
              <p className="text-[13px] font-medium text-slate-900">{m.titulo}</p>
              <p className="mt-0.5 text-[12.5px] text-slate-500">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
