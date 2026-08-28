'use client';

import { useState } from 'react';
import { BriefcaseBusiness, Building2, ChevronRight, FileText, LayoutDashboard, Search, Users, Bell, CircleDollarSign, MapPin, Clock, CheckCircle2 } from 'lucide-react';
import Logo from '@/components/Logo';

type DemoView = 'inicio' | 'socios' | 'bolsa' | 'empresa' | 'postulante';

const views = [
  { id: 'inicio' as const, label: 'Inicio', icon: LayoutDashboard },
  { id: 'socios' as const, label: 'Socios', icon: Building2 },
  { id: 'bolsa' as const, label: 'Bolsa de trabajo', icon: BriefcaseBusiness },
  { id: 'empresa' as const, label: 'Vista empresa', icon: Building2 },
  { id: 'postulante' as const, label: 'Vista postulante', icon: Users },
];

function Header({ title, subtitle }: { title: string; subtitle: string }) {
  return <div className="mb-7"><h1 className="text-2xl font-extrabold tracking-tight text-brand-950">{title}</h1><p className="mt-1 text-sm text-slate-500">{subtitle}</p></div>;
}

function Metric({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <div className="surface p-5"><p className="text-sm font-medium text-slate-500">{label}</p><p className="mt-2 text-3xl font-extrabold text-brand-950">{value}</p><p className="mt-1 text-xs text-slate-400">{detail}</p></div>;
}

function Inicio() {
  return <><Header title="Resumen general" subtitle="Una vista simple de la actividad del Centro." />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4"><Metric label="Socios activos" value="186" detail="12 socios directivos"/><Metric label="Ofertas activas" value="14" detail="5 publicadas esta semana"/><Metric label="Postulantes" value="428" detail="31 nuevos este mes"/><Metric label="Socios con deuda" value="17" detail="Requieren seguimiento"/></div>
    <div className="mt-6 grid gap-5 lg:grid-cols-3">
      <div className="surface p-6 lg:col-span-2"><h2 className="font-bold text-brand-950">Actividad reciente</h2><div className="mt-5 space-y-4">
        {[['Nueva oferta laboral','Auxiliar administrativo · Estudio del Centro','Hace 2 h'],['Nuevo postulante','María Rodríguez completó su CV','Hace 4 h'],['Pago registrado','La Canasta actualizó su cuota mensual','Ayer']].map(([a,b,c])=><div key={a} className="flex items-center gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"><div className="rounded-xl bg-brand-50 p-2.5 text-brand-700"><CheckCircle2 size={18}/></div><div className="min-w-0 flex-1"><p className="text-sm font-semibold text-brand-950">{a}</p><p className="truncate text-sm text-slate-500">{b}</p></div><span className="text-xs text-slate-400">{c}</span></div>)}
      </div></div>
      <div className="surface p-6"><h2 className="font-bold text-brand-950">Accesos rápidos</h2><div className="mt-4 space-y-2">{['Agregar socio','Publicar oferta','Buscar candidatos','Enviar notificación'].map(x=><button key={x} className="flex w-full items-center justify-between rounded-xl border border-slate-100 px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-50">{x}<ChevronRight size={16}/></button>)}</div></div>
    </div></>;
}

function Socios() {
  const rows=[['La Canasta','Común','Al día'],['Estudio San José','Directivo','Al día'],['Ferretería Central','Común','Pendiente'],['Óptica Libertad','Común','Al día']];
  return <><Header title="Socios" subtitle="Consulta rápida de empresas asociadas y su situación."/><div className="surface overflow-hidden"><div className="flex flex-col gap-3 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between"><div className="relative max-w-sm flex-1"><Search className="absolute left-3 top-2.5 text-slate-400" size={18}/><input className="input pl-10" placeholder="Buscar empresa..."/></div><button className="btn-primary">+ Agregar socio</button></div><div className="overflow-x-auto"><table className="w-full"><thead className="bg-slate-50"><tr>{['Empresa','Tipo de socio','Situación','Acción'].map(x=><th className="table-th" key={x}>{x}</th>)}</tr></thead><tbody>{rows.map(r=><tr className="table-row" key={r[0]}><td className="table-td font-semibold text-brand-950">{r[0]}</td><td className="table-td">{r[1]}</td><td className="table-td"><span className={`chip ${r[2]==='Al día'?'bg-jad-50 text-jad-700 ring-jad-100':'bg-sol-50 text-sol-700 ring-sol-100'}`}>{r[2]}</span></td><td className="table-td"><button className="text-sm font-semibold text-brand-700">Ver detalle</button></td></tr>)}</tbody></table></div></div></>;
}

function Bolsa() {
  const jobs=[['Chofer de reparto','Distribuidora San José','Chofer','12 candidatos'],['Auxiliar administrativo','Estudio del Centro','Administración','8 candidatos'],['Vendedor/a','Comercio Libertad','Ventas','19 candidatos']];
  return <><Header title="Bolsa de trabajo" subtitle="Ofertas laborales y acceso rápido a candidatos por categoría."/><div className="mb-5 flex flex-wrap gap-2">{['Todas','Chofer','Administración','Ventas','Logística','Informática'].map((x,i)=><button key={x} className={i===0?'btn-primary':'btn-outline'}>{x}</button>)}</div><div className="grid gap-4">{jobs.map(j=><div className="surface flex flex-col gap-4 p-5 md:flex-row md:items-center" key={j[0]}><div className="rounded-xl bg-brand-50 p-3 text-brand-700"><BriefcaseBusiness size={22}/></div><div className="flex-1"><div className="flex flex-wrap items-center gap-2"><h3 className="font-bold text-brand-950">{j[0]}</h3><span className="chip bg-slate-50 text-slate-600 ring-slate-200">{j[2]}</span></div><p className="mt-1 text-sm text-slate-500">{j[1]}</p></div><p className="text-sm font-semibold text-brand-700">{j[3]}</p><button className="btn-outline">Ver oferta</button></div>)}</div><div className="surface mt-5 flex flex-col gap-4 p-6 md:flex-row md:items-center"><div className="rounded-xl bg-gold-50 p-3 text-gold-700"><FileText size={22}/></div><div className="flex-1"><h3 className="font-bold text-brand-950">¿Necesitás encontrar un perfil específico?</h3><p className="mt-1 text-sm text-slate-500">Buscá CV por categoría laboral, experiencia o disponibilidad.</p></div><button className="btn-primary">Buscar candidatos</button></div></>;
}

function Empresa() {
 return <><Header title="Portal de empresa" subtitle="Ejemplo de la experiencia de una empresa socia."/><div className="surface mb-5 flex flex-col gap-4 p-6 md:flex-row md:items-center"><div className="flex-1"><p className="text-sm text-slate-500">Bienvenido</p><h2 className="mt-1 text-xl font-bold text-brand-950">La Canasta</h2><p className="mt-1 text-sm text-slate-500">Socio al día · San José de Mayo</p></div><button className="btn-gold">+ Publicar oferta</button></div><div className="grid gap-4 md:grid-cols-3"><Metric label="Ofertas activas" value="2" detail="Actualmente publicadas"/><Metric label="Candidatos nuevos" value="7" detail="Desde tu última visita"/><Metric label="Notificaciones" value="3" detail="1 sin leer"/></div><div className="surface mt-5 p-6"><h2 className="font-bold text-brand-950">Mis ofertas recientes</h2><div className="mt-4 divide-y divide-slate-100">{[['Repositor/a','14 postulantes','Activa'],['Auxiliar de depósito','9 postulantes','Activa']].map(x=><div key={x[0]} className="flex items-center gap-4 py-4"><div className="flex-1"><p className="font-semibold text-brand-950">{x[0]}</p><p className="text-sm text-slate-500">{x[1]}</p></div><span className="chip bg-jad-50 text-jad-700 ring-jad-100">{x[2]}</span><button className="btn-ghost">Ver</button></div>)}</div></div></>;
}

function Postulante() {
 const jobs=[['Auxiliar administrativo','Estudio del Centro','San José de Mayo'],['Chofer de reparto','Distribuidora San José','Libertad'],['Vendedor/a','Comercio Libertad','San José de Mayo']];
 return <><Header title="Portal del postulante" subtitle="Una experiencia sencilla para buscar empleo y administrar el CV."/><div className="surface mb-6 flex flex-col gap-4 p-6 md:flex-row md:items-center"><div className="flex-1"><p className="text-sm text-slate-500">Tu perfil está</p><p className="mt-1 text-xl font-bold text-brand-950">80% completo</p><div className="mt-3 h-2 max-w-md overflow-hidden rounded-full bg-slate-100"><div className="h-full w-4/5 rounded-full bg-brand-600"/></div></div><button className="btn-outline"><FileText size={17}/> Completar mi CV</button></div><div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold text-brand-950">Ofertas para vos</h2><button className="text-sm font-semibold text-brand-700">Ver todas</button></div><div className="grid gap-4 lg:grid-cols-3">{jobs.map(j=><div className="surface surface-hover p-5" key={j[0]}><span className="chip bg-brand-50 text-brand-700 ring-brand-100">Nueva</span><h3 className="mt-4 font-bold text-brand-950">{j[0]}</h3><p className="mt-1 text-sm text-slate-500">{j[1]}</p><div className="mt-4 flex items-center gap-2 text-xs text-slate-400"><MapPin size={14}/>{j[2]}<Clock className="ml-2" size={14}/>Tiempo completo</div><button className="btn-primary mt-5 w-full">Ver oferta</button></div>)}</div></>;
}

export default function DemoPage(){const [view,setView]=useState<DemoView>('inicio'); return <div className="min-h-screen bg-slate-100"><header className="border-b border-slate-200 bg-white"><div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-4 lg:px-8"><Logo withWordmark/><div className="flex items-center gap-3"><span className="hidden text-sm text-slate-500 sm:inline">Prototipo para reunión</span><div className="rounded-full bg-brand-50 p-2 text-brand-700"><Bell size={18}/></div></div></div></header><div className="mx-auto grid max-w-[1500px] lg:grid-cols-[240px_1fr]"><aside className="border-b border-slate-200 bg-white p-4 lg:min-h-[calc(100vh-73px)] lg:border-b-0 lg:border-r"><p className="mb-3 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">Vistas principales</p><nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-1">{views.map(v=>{const Icon=v.icon;return <button key={v.id} onClick={()=>setView(v.id)} className={`nav-item min-w-max lg:w-full ${view===v.id?'nav-item-active':''}`}><Icon size={18}/>{v.label}</button>})}</nav><div className="mt-8 hidden rounded-2xl bg-brand-950 p-4 text-white lg:block"><p className="text-sm font-bold">Demo conceptual</p><p className="mt-1 text-xs leading-5 text-brand-200">Pantallas simplificadas para validar ideas con el cliente.</p></div></aside><main className="min-w-0 p-5 lg:p-8">{view==='inicio'&&<Inicio/>}{view==='socios'&&<Socios/>}{view==='bolsa'&&<Bolsa/>}{view==='empresa'&&<Empresa/>}{view==='postulante'&&<Postulante/>}</main></div></div>}
