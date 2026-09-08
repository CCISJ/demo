'use client';

import { useState } from 'react';
import {
  Upload, FileText, Plus, Pencil, Trash2, Award, Briefcase,
  GraduationCap, Star, Phone, Mail, MapPin, Calendar, User, Download,
  Check, X,
} from 'lucide-react';
import PageHeader from '@/components/PageHeader';
import Badge from '@/components/Badge';
import { categoriasLaborales, type Categoria } from '@/data/mockData';

type TabId = 'datos' | 'presentacion' | 'experiencia' | 'educacion' | 'cursos' | 'habilidades' | 'certificados' | 'referencias' | 'categorias';

const tabs: { id: TabId; label: string; icon: typeof User }[] = [
  { id: 'datos', label: 'Datos personales', icon: User },
  { id: 'presentacion', label: 'Presentación', icon: FileText },
  { id: 'experiencia', label: 'Experiencia', icon: Briefcase },
  { id: 'educacion', label: 'Educación', icon: GraduationCap },
  { id: 'cursos', label: 'Cursos', icon: Award },
  { id: 'habilidades', label: 'Habilidades', icon: Star },
  { id: 'certificados', label: 'Certificados', icon: Award },
  { id: 'referencias', label: 'Referencias', icon: Phone },
  { id: 'categorias', label: 'Categorías de interés', icon: Briefcase },
];

export default function PostulanteCV() {
  const [tab, setTab] = useState<TabId>('datos');
  const [categoriasSel, setCategoriasSel] = useState<Categoria[]>(['Chofer', 'Depósito y logística']);

  const toggleCat = (c: Categoria) => {
    setCategoriasSel((prev) => prev.includes(c) ? prev.filter((x) => x !== c) : [...prev, c]);
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mi perfil y CV"
        subtitle="Completá tu información profesional para mejorar tus oportunidades"
        actions={<button className="btn-outline"><Download className="h-4 w-4" /> Descargar CV</button>}
      />

      {/*
        Estado del perfil: una línea. Antes eran dos tarjetas — barra con
        degradado, cinco píldoras de colores y un recuadro punteado con ícono
        grande — para decir "te falta educación y cursos".
      */}
      <div className="surface flex flex-wrap items-center gap-x-6 gap-y-3 px-4 py-3">
        <div className="w-full max-w-sm">
          <div className="flex items-baseline justify-between gap-3">
            <p className="text-[13px] font-medium text-slate-900">Perfil completado</p>
            <p className="font-mono text-[13px] tabular-nums text-slate-900">75%</p>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-brand-600" style={{ width: '75%' }} />
          </div>
          <p className="mt-1.5 text-[12px] text-slate-400">Falta completar educación y cursos.</p>
        </div>

        <button className="btn-outline shrink-0">
          <Upload className="h-3.5 w-3.5" strokeWidth={1.75} /> Subir CV existente
        </button>
      </div>

      {/* Secciones del CV */}
      <div className="surface overflow-hidden">
        {/* Pestañas subrayadas: nueve botones con ícono y fondo propio pesaban
            más que el formulario que encabezan. */}
        <div className="flex gap-1 overflow-x-auto border-b border-line px-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`shrink-0 border-b-2 px-2.5 py-2.5 text-[13px] font-medium transition-colors ${
                tab === t.id
                  ? 'border-brand-700 text-slate-900'
                  : 'border-transparent text-slate-500 hover:text-slate-900'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-4">
          {tab === 'datos' && <DatosPersonales />}
          {tab === 'presentacion' && <Presentacion />}
          {tab === 'experiencia' && <Experiencia />}
          {tab === 'educacion' && <Educacion />}
          {tab === 'cursos' && <Cursos />}
          {tab === 'habilidades' && <Habilidades />}
          {tab === 'certificados' && <Certificados />}
          {tab === 'referencias' && <Referencias />}
          {tab === 'categorias' && (
            <div>
              <h3 className="card-title">¿En qué áreas te gustaría trabajar?</h3>
              <p className="mt-1 text-sm text-slate-500">Seleccioná las categorías laborales de tu interés. Te notificaremos cuando haya ofertas nuevas.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categoriasLaborales.map((c) => {
                  const active = categoriasSel.includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() => toggleCat(c)}
                      className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1.5 text-[13px] font-medium transition-colors ${
                        active
                          ? 'border-brand-700 bg-brand-50 text-brand-800'
                          : 'border-line bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {active && <Check className="h-3.5 w-3.5" strokeWidth={2} />}
                      {c}
                    </button>
                  );
                })}
              </div>
              <p className="mt-4 text-xs text-slate-400">{categoriasSel.length} categorías seleccionadas</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function SectionHeader({ title, action }: { title: string; action?: React.ReactNode }) {
  return (
    <div className="mb-4 flex items-center justify-between">
      <h3 className="card-title">{title}</h3>
      {action}
    </div>
  );
}

function DatosPersonales() {
  return (
    <div>
      <SectionHeader title="Datos personales" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div><label className="label">Nombre completo</label><input className="input" defaultValue="Rodrigo Almirón" /></div>
        <div><label className="label">Documento de identidad</label><input className="input" defaultValue="1.234.567-8" /></div>
        <div><label className="label">Fecha de nacimiento</label><input type="date" className="input" defaultValue="1992-03-15" /></div>
        <div><label className="label">Teléfono</label><div className="relative"><Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="input pl-9" defaultValue="099 452 310" /></div></div>
        <div><label className="label">Email</label><div className="relative"><Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="input pl-9" defaultValue="rodrigo.almiron@gmail.com" /></div></div>
        <div><label className="label">Ciudad</label><div className="relative"><MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" /><input className="input pl-9" defaultValue="San José de Mayo" /></div></div>
        <div><label className="label">Licencia de conducir</label><input className="input" defaultValue="C4 (profesional)" /></div>
        <div><label className="label">Movilidad propia</label><select className="input"><option>Sí</option><option>No</option></select></div>
      </div>
      <div className="mt-5 flex justify-end"><button className="btn-primary">Guardar cambios</button></div>
    </div>
  );
}

function Presentacion() {
  return (
    <div>
      <SectionHeader title="Presentación profesional" />
      <label className="label">Resumen profesional</label>
      <textarea rows={5} className="input resize-none" defaultValue="Chofer profesional con licencia C4 y más de 8 años de experiencia en recorridos de larga distancia. Experiencia en carga y descarga, control de documentación y mantenimiento básico de unidades. Responsable, puntual y con buena disposición." />
      <p className="mt-2 text-xs text-slate-400">Máximo 500 caracteres · 248 usados</p>
      <div className="mt-5 flex justify-end"><button className="btn-primary">Guardar</button></div>
    </div>
  );
}

function Experiencia() {
  const items = [
    { puesto: 'Chofer de larga distancia', empresa: 'Transportes del Sur', desde: '2020', hasta: 'Actual', desc: 'Recorridos nacionales, control de carga y documentación.' },
    { puesto: 'Cadete / Distribuidor', empresa: 'Distribuidora San José SRL', desde: '2016', hasta: '2020', desc: 'Distribución de mercadería en ruta y depósito.' },
  ];
  return (
    <div>
      <SectionHeader title="Experiencia laboral" action={<button className="btn-outline text-xs"><Plus className="h-3.5 w-3.5" /> Agregar</button>} />
      <div className="space-y-3">
        {items.map((e, i) => (
          <div key={i} className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div>
                  <p className="font-medium text-slate-900">{e.puesto}</p>
                  <p className="text-sm text-slate-500">{e.empresa}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{e.desde} — {e.hasta}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-700"><Pencil className="h-4 w-4" /></button>
                <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rust-600"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
            <p className="mt-2 text-sm text-slate-600">{e.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Educacion() {
  return (
    <div>
      <SectionHeader title="Educación" action={<button className="btn-outline text-xs"><Plus className="h-3.5 w-3.5" /> Agregar</button>} />
      <div className="space-y-3">
        <div className="rounded-xl border border-slate-200 p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-3">
              <div>
                <p className="font-medium text-slate-900">Bachillerato completo</p>
                <p className="text-sm text-slate-500">Liceo N°1 San José</p>
                <p className="text-xs text-slate-400">2007 — 2012</p>
              </div>
            </div>
            <div className="flex gap-1">
              <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-brand-700"><Pencil className="h-4 w-4" /></button>
              <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rust-600"><Trash2 className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Cursos() {
  return (
    <div>
      <SectionHeader title="Cursos realizados" action={<button className="btn-outline text-xs"><Plus className="h-3.5 w-3.5" /> Agregar</button>} />
      <div className="space-y-3">
        {[
          { nombre: 'Curso de conducción defensiva', ente: 'Cámara del Transporte', anio: '2023' },
          { nombre: 'Manipulación de cargas', ente: 'BPS — SUNCA', anio: '2021' },
        ].map((c, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
            <div className="flex-1">
              <p className="font-medium text-slate-900">{c.nombre}</p>
              <p className="text-xs text-slate-400">{c.ente} · {c.anio}</p>
            </div>
            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rust-600"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Habilidades() {
  const [skills, setSkills] = useState<string[]>(['Conducción profesional', 'Mantenimiento básico', 'Control de carga', 'Trabajo en equipo']);
  const [input, setInput] = useState('');
  return (
    <div>
      <SectionHeader title="Habilidades" />
      <div className="flex gap-2">
        <input className="input flex-1" placeholder="Ej. Atención al cliente" value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter' && input.trim()) { setSkills([...skills, input.trim()]); setInput(''); } }} />
        <button onClick={() => { if (input.trim()) { setSkills([...skills, input.trim()]); setInput(''); } }} className="btn-primary"><Plus className="h-4 w-4" /></button>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {skills.map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5 rounded-xl bg-brand-50 px-3 py-2 text-sm font-medium text-brand-700 ring-1 ring-brand-100">
            {s}
            <button onClick={() => setSkills(skills.filter((x) => x !== s))} className="text-brand-400 hover:text-rust-500"><X className="h-3.5 w-3.5" /></button>
          </span>
        ))}
      </div>
    </div>
  );
}

function Certificados() {
  return (
    <div>
      <SectionHeader title="Certificados" action={<button className="btn-outline text-xs"><Upload className="h-3.5 w-3.5" /> Subir certificado</button>} />
      <div className="space-y-2">
        {[
          { nombre: 'Licencia profesional C4.pdf', fecha: '2024' },
          { nombre: 'Carnet de salud 2026.pdf', fecha: '2026' },
          { nombre: 'Certificado antecedentes.pdf', fecha: '2026' },
        ].map((c, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3">
            <div className="flex-1">
              <p className="text-[13px] text-slate-800">{c.nombre}</p>
              <p className="text-xs text-slate-400">Subido en {c.fecha}</p>
            </div>
            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><Download className="h-4 w-4" /></button>
            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rust-600"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function Referencias() {
  return (
    <div>
      <SectionHeader title="Referencias" action={<button className="btn-outline text-xs"><Plus className="h-3.5 w-3.5" /> Agregar</button>} />
      <div className="space-y-3">
        {[
          { nombre: 'Carlos Méndez', cargo: 'Jefe de flota — Transportes del Sur', telefono: '099 654 220' },
          { nombre: 'Ana Pereira', cargo: 'Contadora — Estudio Pereira', telefono: '092 334 550' },
        ].map((r, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-slate-200 p-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500"><Phone className="h-5 w-5" /></span>
            <div className="flex-1">
              <p className="font-medium text-slate-900">{r.nombre}</p>
              <p className="text-xs text-slate-500">{r.cargo}</p>
              <p className="text-xs text-slate-400">{r.telefono}</p>
            </div>
            <button className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-rust-600"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}
