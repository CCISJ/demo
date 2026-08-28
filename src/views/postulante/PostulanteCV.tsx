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

      {/* Progress + CV upload */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="surface lg:col-span-2 p-5">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-brand-900">Progreso del perfil</h2>
            <span className="text-2xl font-bold text-brand-700">75%</span>
          </div>
          <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full rounded-full bg-gradient-to-r from-brand-500 to-brand-700" style={{ width: '75%' }} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge tone="jad" variant="soft"><Check className="h-3 w-3" /> Datos personales</Badge>
            <Badge tone="jad" variant="soft"><Check className="h-3 w-3" /> Presentación</Badge>
            <Badge tone="jad" variant="soft"><Check className="h-3 w-3" /> Experiencia</Badge>
            <Badge tone="sol" variant="soft">Educación incompleta</Badge>
            <Badge tone="slate" variant="soft">Cursos pendientes</Badge>
          </div>
        </div>

        <div className="surface flex flex-col items-center justify-center gap-3 border-2 border-dashed border-slate-200 bg-slate-50/50 p-5 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-brand-600 ring-1 ring-slate-200"><Upload className="h-6 w-6" /></span>
          <div>
            <p className="text-sm font-semibold text-brand-900">Subir CV existente</p>
            <p className="text-xs text-slate-500">PDF o Word · máx. 5MB</p>
          </div>
          <button className="btn-outline text-xs"><Upload className="h-3.5 w-3.5" /> Seleccionar archivo</button>
        </div>
      </div>

      {/* Tabs */}
      <div className="surface overflow-hidden">
        <div className="flex gap-1 overflow-x-auto border-b border-slate-100 p-2">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                tab === t.id ? 'bg-brand-50 text-brand-700' : 'text-slate-500 hover:bg-slate-100 hover:text-brand-700'
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>

        <div className="p-5">
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
              <h3 className="text-base font-bold text-brand-900">¿En qué áreas te gustaría trabajar?</h3>
              <p className="mt-1 text-sm text-slate-500">Seleccioná las categorías laborales de tu interés. Te notificaremos cuando haya ofertas nuevas.</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {categoriasLaborales.map((c) => {
                  const active = categoriasSel.includes(c);
                  return (
                    <button
                      key={c}
                      onClick={() => toggleCat(c)}
                      className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                        active ? 'bg-brand-700 text-white shadow-sm ring-1 ring-brand-700' : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      {active ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
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
      <h3 className="text-base font-bold text-brand-900">{title}</h3>
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
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600"><Briefcase className="h-5 w-5" /></span>
                <div>
                  <p className="font-semibold text-brand-900">{e.puesto}</p>
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
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold-50 text-gold-600"><GraduationCap className="h-5 w-5" /></span>
              <div>
                <p className="font-semibold text-brand-900">Bachillerato completo</p>
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
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-jad-50 text-jad-600"><Award className="h-5 w-5" /></span>
            <div className="flex-1">
              <p className="font-semibold text-brand-900">{c.nombre}</p>
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
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rust-50 text-rust-600"><FileText className="h-4 w-4" /></span>
            <div className="flex-1">
              <p className="text-sm font-medium text-brand-900">{c.nombre}</p>
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
              <p className="font-semibold text-brand-900">{r.nombre}</p>
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
