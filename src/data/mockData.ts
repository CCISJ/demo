// Fictitious Spanish mock data for the CCISJ system mockups.
// All names, RUTs, companies and figures are invented for visual purposes only.

export type SocioEstado = 'activo' | 'inactivo';
export type SocioPago = 'al-dia' | 'deudor';
export type SocioTipo = 'comun' | 'directivo';

export interface Socio {
  id: string;
  empresa: string;
  rut: string;
  tipo: SocioTipo;
  contacto: string;
  email: string;
  telefono: string;
  estado: SocioEstado;
  pago: SocioPago;
  ultimoPago: string;
  categoria: string;
  adhesion: string;
}

export const socios: Socio[] = [
  { id: 'S-1042', empresa: 'Distribuidora San José SRL', rut: '210458930012', tipo: 'directivo', contacto: 'Marta Echevarría', email: 'marta@distribuidorasj.com.uy', telefono: '099 452 310', estado: 'activo', pago: 'al-dia', ultimoPago: '12/08/2026', categoria: 'Comercio mayorista', adhesion: '03/2018' },
  { id: 'S-1043', empresa: 'Frigorífico Río Negro SA', rut: '215678120015', tipo: 'directivo', contacto: 'Juan Carlos Pereyra', email: 'jcpereyra@frigorificorn.com.uy', telefono: '098 221 540', estado: 'activo', pago: 'al-dia', ultimoPago: '02/08/2026', categoria: 'Industria frigorífica', adhesion: '11/2015' },
  { id: 'S-1044', empresa: 'Farmacity San José', rut: '219843210021', tipo: 'comun', contacto: 'Lucía Fernández', email: 'lucia@farmacitysj.com.uy', telefono: '091 778 120', estado: 'activo', pago: 'deudor', ultimoPago: '15/06/2026', categoria: 'Farmacia', adhesion: '07/2021' },
  { id: 'S-1045', empresa: 'Transportes del Sur', rut: '213245780018', tipo: 'comun', contacto: 'Diego Martínez', email: 'diego@transportessur.com.uy', telefono: '099 654 220', estado: 'inactivo', pago: 'deudor', ultimoPago: '20/03/2026', categoria: 'Logística y transporte', adhesion: '02/2019' },
  { id: 'S-1046', empresa: 'Tecnología MóvilUY', rut: '218765430011', tipo: 'comun', contacto: 'Carolina Sosa', email: 'carolina@moviluy.com.uy', telefono: '098 112 330', estado: 'activo', pago: 'al-dia', ultimoPago: '10/08/2026', categoria: 'Tecnología', adhesion: '09/2022' },
  { id: 'S-1047', empresa: 'Panadería La Esquina', rut: '211234560014', tipo: 'comun', contacto: 'Raúl Giménez', email: 'raul@panaderialaesquina.com.uy', telefono: '099 887 410', estado: 'activo', pago: 'al-dia', ultimoPago: '08/08/2026', categoria: 'Alimentación', adhesion: '04/2017' },
  { id: 'S-1048', empresa: 'Estudio Contable Pereira & Asoc.', rut: '214567890019', tipo: 'directivo', contacto: 'Ana Pereira', email: 'ana@estudiopereira.com.uy', telefono: '092 334 550', estado: 'activo', pago: 'al-dia', ultimoPago: '14/08/2026', categoria: 'Servicios profesionales', adhesion: '01/2014' },
  { id: 'S-1049', empresa: 'Ferretería El Tornillo', rut: '217654320013', tipo: 'comun', contacto: 'Pedro Vázquez', email: 'pedro@eltornillo.com.uy', telefono: '099 221 880', estado: 'activo', pago: 'deudor', ultimoPago: '28/05/2026', categoria: 'Ferretería', adhesion: '06/2020' },
  { id: 'S-1050', empresa: 'Hotel Ciudad Vieja', rut: '216789540012', tipo: 'comun', contacto: 'Sandra Ríos', email: 'sandra@hotelcv.com.uy', telefono: '098 556 770', estado: 'activo', pago: 'al-dia', ultimoPago: '11/08/2026', categoria: 'Hotelería y turismo', adhesion: '03/2016' },
  { id: 'S-1051', empresa: 'Agroinsumos del Sur', rut: '213987650017', tipo: 'comun', contacto: 'Fernando Larrosa', email: 'fernando@agroinsumos.com.uy', telefono: '099 344 120', estado: 'inactivo', pago: 'deudor', ultimoPago: '10/02/2026', categoria: 'Agroinsumos', adhesion: '08/2018' },
  { id: 'S-1052', empresa: 'Librería y Papelera Centro', rut: '212345670016', tipo: 'comun', contacto: 'Beatriz Acosta', email: 'bea@libreriacentro.com.uy', telefono: '091 220 990', estado: 'activo', pago: 'al-dia', ultimoPago: '09/08/2026', categoria: 'Librería', adhesion: '05/2019' },
  { id: 'S-1053', empresa: 'Constructora San José', rut: '215432100018', tipo: 'directivo', contacto: 'Marcelo Domínguez', email: 'marcelo@constructorasj.com.uy', telefono: '098 776 100', estado: 'activo', pago: 'al-dia', ultimoPago: '13/08/2026', categoria: 'Construcción', adhesion: '02/2013' },
];

export type OfertaEstado = 'activa' | 'cerrada' | 'borrador';
export type OfertaModalidad = 'Presencial' | 'Remoto' | 'Híbrido';

export interface Oferta {
  id: string;
  puesto: string;
  empresa: string;
  ubicacion: string;
  modalidad: OfertaModalidad;
  categoria: string;
  publicada: string;
  cierra: string;
  candidatos: number;
  estado: OfertaEstado;
  descripcion: string;
  salario: string;
}

export const ofertas: Oferta[] = [
  { id: 'OF-2301', puesto: 'Chofer de camión de larga distancia', empresa: 'Transportes del Sur', ubicacion: 'San José / Recorrido nacional', modalidad: 'Presencial', categoria: 'Chofer', publicada: '12/08/2026', cierra: '30/08/2026', candidatos: 24, estado: 'activa', descripcion: 'Buscamos chofer profesional con licencia C4 y experiencia mínima de 2 años en recorridos de larga distancia.', salario: '$ 65.000 + viáticos' },
  { id: 'OF-2302', puesto: 'Administrativo contable', empresa: 'Estudio Contable Pereira & Asoc.', ubicacion: 'San José de Mayo', modalidad: 'Presencial', categoria: 'Administración', publicada: '10/08/2026', cierra: '25/08/2026', candidatos: 18, estado: 'activa', descripcion: 'Estudiante avanzado de Contador o Técnico en Administración. Manejo de TANGO y Excel intermedio.', salario: '$ 48.000' },
  { id: 'OF-2303', puesto: 'Vendedor mostrador', empresa: 'Ferretería El Tornillo', ubicacion: 'San José de Mayo', modalidad: 'Presencial', categoria: 'Ventas', publicada: '08/08/2026', cierra: '22/08/2026', candidatos: 11, estado: 'activa', descripcion: 'Atención al cliente en ferretería, conocimiento de productos de construcción y buena disposición.', salario: '$ 42.000 + comisión' },
  { id: 'OF-2304', puesto: 'Operario de depósito', empresa: 'Distribuidora San José SRL', ubicacion: 'San José', modalidad: 'Presencial', categoria: 'Depósito y logística', publicada: '05/08/2026', cierra: '20/08/2026', candidatos: 9, estado: 'activa', descripcion: 'Preparación de pedidos, control de stock y carga/descarga. Se requiere carnet de salud al día.', salario: '$ 40.000' },
  { id: 'OF-2305', puesto: 'Soporte técnico junior', empresa: 'Tecnología MóvilUY', ubicacion: 'Remoto (Uruguay)', modalidad: 'Remoto', categoria: 'Informática', publicada: '03/08/2026', cierra: '18/08/2026', candidatos: 31, estado: 'activa', descripcion: 'Atención de tickets de soporte nivel 1, diagnóstico y derivación. Conocimientos de redes y Windows.', salario: '$ 55.000' },
  { id: 'OF-2306', puesto: 'Cocinero/a', empresa: 'Hotel Ciudad Vieja', ubicacion: 'San José de Mayo', modalidad: 'Presencial', categoria: 'Gastronomía', publicada: '01/08/2026', cierra: '15/08/2026', candidatos: 7, estado: 'cerrada', descripcion: 'Cocina caliente para desayuno y cena. Experiencia comprobable en hotelería o restaurantes.', salario: '$ 50.000' },
  { id: 'OF-2307', puesto: 'Atención al cliente call center', empresa: 'Farmacity San José', ubicacion: 'San José', modalidad: 'Híbrido', categoria: 'Atención al cliente', publicada: '28/07/2026', cierra: '12/08/2026', candidatos: 22, estado: 'cerrada', descripcion: 'Atención telefónica de pedidos y consultas de farmacia. Turnos rotativos mañana/tarde.', salario: '$ 38.000' },
  { id: 'OF-2308', puesto: 'Cadete administrativo', empresa: 'Constructora San José', ubicacion: 'San José', modalidad: 'Presencial', categoria: 'Administración', publicada: '—', cierra: '—', candidatos: 0, estado: 'borrador', descripcion: 'Tareas administrativas generales, archivo y control de documentación de obra.', salario: 'A convenir' },
];

export const categoriasLaborales = [
  'Administración',
  'Chofer',
  'Ventas',
  'Atención al cliente',
  'Depósito y logística',
  'Gastronomía',
  'Informática',
  'Otros',
] as const;

export type Categoria = (typeof categoriasLaborales)[number];

export interface Candidato {
  id: string;
  nombre: string;
  categorias: Categoria[];
  experiencia: number;
  disponibilidad: string;
  cv: boolean;
  certificados: number;
  ciudad: string;
  edad: number;
  resumen: string;
}

export const candidatos: Candidato[] = [
  { id: 'P-5012', nombre: 'Rodrigo Almirón', categorias: ['Chofer', 'Depósito y logística'], experiencia: 8, disponibilidad: 'Inmediata', cv: true, certificados: 3, ciudad: 'San José de Mayo', edad: 34, resumen: 'Chofer profesional C4, experiencia en distribución nacional y carga de camión.' },
  { id: 'P-5013', nombre: 'Valentina López', categorias: ['Administración', 'Atención al cliente'], experiencia: 5, disponibilidad: '15 días', cv: true, certificados: 2, ciudad: 'San José', edad: 28, resumen: 'Administrativa con manejo de TANGO y atención al público en comercio.' },
  { id: 'P-5014', nombre: 'Matías Cabrera', categorias: ['Informática'], experiencia: 3, disponibilidad: 'Inmediata', cv: true, certificados: 4, ciudad: 'Libertad', edad: 25, resumen: 'Técnico en redes y soporte, estudiante de Ing. Sistemas.' },
  { id: 'P-5015', nombre: 'Camila Russo', categorias: ['Gastronomía', 'Atención al cliente'], experiencia: 6, disponibilidad: '30 días', cv: true, certificados: 1, ciudad: 'San José de Mayo', edad: 31, resumen: 'Cocinera con experiencia en hotelería y pastelería.' },
  { id: 'P-5016', nombre: 'Lucas Méndez', categorias: ['Ventas', 'Atención al cliente'], experiencia: 4, disponibilidad: 'Inmediata', cv: true, certificados: 2, ciudad: 'Ciudad del Plata', edad: 27, resumen: 'Vendedor mostrador y teleoperador, experiencia en retail y ferretería.' },
  { id: 'P-5017', nombre: 'Florencia Núñez', categorias: ['Administración'], experiencia: 10, disponibilidad: 'A convenir', cv: true, certificados: 5, ciudad: 'San José de Mayo', edad: 38, resumen: 'Contadora pública, experiencia en estudios contables medianos.' },
  { id: 'P-5018', nombre: 'Ignacio Pereira', categorias: ['Chofer'], experiencia: 12, disponibilidad: 'Inmediata', cv: false, certificados: 2, ciudad: 'Kiyú', edad: 42, resumen: 'Chofer de ómnibus y camión, registro profesional al día.' },
  { id: 'P-5019', nombre: 'Sofía Giménez', categorias: ['Depósito y logística', 'Otros'], experiencia: 2, disponibilidad: 'Inmediata', cv: true, certificados: 1, ciudad: 'San José', edad: 23, resumen: 'Operaria de depósito, manejo de transpaleta y control de stock.' },
];

export type PostulacionEstado = 'enviada' | 'revision' | 'finalizada' | 'no-seleccionado';

export interface Postulacion {
  id: string;
  puesto: string;
  empresa: string;
  fecha: string;
  estado: PostulacionEstado;
  categoria: string;
}

export const postulaciones: Postulacion[] = [
  { id: 'PU-9001', puesto: 'Chofer de camión de larga distancia', empresa: 'Transportes del Sur', fecha: '13/08/2026', estado: 'revision', categoria: 'Chofer' },
  { id: 'PU-9002', puesto: 'Operario de depósito', empresa: 'Distribuidora San José SRL', fecha: '06/08/2026', estado: 'enviada', categoria: 'Depósito y logística' },
  { id: 'PU-9003', puesto: 'Vendedor mostrador', empresa: 'Ferretería El Tornillo', fecha: '29/07/2026', estado: 'finalizada', categoria: 'Ventas' },
  { id: 'PU-9004', puesto: 'Atención al cliente call center', empresa: 'Farmacity San José', fecha: '15/07/2026', estado: 'no-seleccionado', categoria: 'Atención al cliente' },
];

export type NotifCategoria = 'Capacitaciones' | 'Eventos' | 'Comunicados' | 'Bolsa de trabajo' | 'Beneficios para socios';

export interface Notificacion {
  id: string;
  titulo: string;
  cuerpo: string;
  categoria: NotifCategoria;
  fecha: string;
  leida: boolean;
}

export const notificaciones: Notificacion[] = [
  { id: 'N-301', titulo: 'Nueva postulación en tu oferta', cuerpo: 'Rodrigo Almirón se postuló a "Chofer de camión de larga distancia".', categoria: 'Bolsa de trabajo', fecha: 'Hace 12 min', leida: false },
  { id: 'N-302', titulo: 'Capacitación: Gestión de equipos comerciales', cuerpo: 'Inicia el 02/09 a las 18:30 hs en la sede del CCISJ. Cupos limitados.', categoria: 'Capacitaciones', fecha: 'Hace 1 h', leida: false },
  { id: 'N-303', titulo: 'Recordatorio de cuota societaria', cuerpo: 'Tu cuota del mes de agosto vence el 31/08. Evita perder beneficios.', categoria: 'Beneficios para socios', fecha: 'Hace 3 h', leida: false },
  { id: 'N-304', titulo: 'Comunicado: feriado del 25 de agosto', cuerpo: 'La sede permanecerá cerrada por el aniversario de San José.', categoria: 'Comunicados', fecha: 'Ayer', leida: true },
  { id: 'N-305', titulo: 'Evento: Encuentro empresarial del Sur', cuerpo: 'Jueves 12/09, 19:00 hs. Networking con socios y autoridades.', categoria: 'Eventos', fecha: 'Ayer', leida: true },
  { id: 'N-306', titulo: 'Tu oferta fue cerrada', cuerpo: '"Atención al cliente call center" finalizó su período de publicación.', categoria: 'Bolsa de trabajo', fecha: '2 días', leida: true },
];

export interface MovimientoCaja {
  id: string;
  fecha: string;
  concepto: string;
  tipo: 'ingreso' | 'egreso';
  monto: number;
  cuenta: string;
}

export const movimientosCaja: MovimientoCaja[] = [
  { id: 'M-7701', fecha: '14/08/2026', concepto: 'Cobro cuota societaria — Frigorífico Río Negro SA', tipo: 'ingreso', monto: 12500, cuenta: 'Caja de ahorro $' },
  { id: 'M-7702', fecha: '14/08/2026', concepto: 'Pago proveedor de impresión', tipo: 'egreso', monto: 4800, cuenta: 'Caja chica' },
  { id: 'M-7703', fecha: '13/08/2026', concepto: 'Inscripción capacitación gestión comercial', tipo: 'ingreso', monto: 3200, cuenta: 'Caja de ahorro $' },
  { id: 'M-7704', fecha: '13/08/2026', concepto: 'Servicios contables mes en curso', tipo: 'egreso', monto: 22000, cuenta: 'Cuenta corriente $' },
  { id: 'M-7705', fecha: '12/08/2026', concepto: 'Cobro cuota societaria — Hotel Ciudad Vieja', tipo: 'ingreso', monto: 8900, cuenta: 'Caja de ahorro $' },
  { id: 'M-7706', fecha: '12/08/2026', concepto: 'Alquiler de salón para evento', tipo: 'egreso', monto: 15000, cuenta: 'Cuenta corriente $' },
  { id: 'M-7707', fecha: '11/08/2026', concepto: 'Cobro cuota societaria — Panadería La Esquina', tipo: 'ingreso', monto: 5600, cuenta: 'Caja de ahorro $' },
  { id: 'M-7708', fecha: '10/08/2026', concepto: 'Mantenimiento sede — plomería', tipo: 'egreso', monto: 7300, cuenta: 'Caja chica' },
];

export interface Factura {
  id: string;
  numero: string;
  cliente: string;
  fecha: string;
  monto: number;
  estado: 'pagada' | 'pendiente' | 'vencida';
}

export const facturas: Factura[] = [
  { id: 'F-01', numero: 'FEU-001-002145', cliente: 'Distribuidora San José SRL', fecha: '12/08/2026', monto: 12500, estado: 'pagada' },
  { id: 'F-02', numero: 'FEU-001-002144', cliente: 'Frigorífico Río Negro SA', fecha: '02/08/2026', monto: 12500, estado: 'pagada' },
  { id: 'F-03', numero: 'FEU-001-002143', cliente: 'Farmacity San José', fecha: '15/07/2026', monto: 8900, estado: 'vencida' },
  { id: 'F-04', numero: 'FEU-001-002142', cliente: 'Transportes del Sur', fecha: '20/06/2026', monto: 8900, estado: 'vencida' },
  { id: 'F-05', numero: 'FEU-001-002141', cliente: 'Tecnología MóvilUY', fecha: '10/08/2026', monto: 7400, estado: 'pendiente' },
  { id: 'F-06', numero: 'FEU-001-002140', cliente: 'Panadería La Esquina', fecha: '08/08/2026', monto: 5600, estado: 'pendiente' },
];

export interface Actividad {
  id: string;
  titulo: string;
  tipo: 'Capacitación' | 'Evento' | 'Reunión';
  fecha: string;
  inscritos: number;
  cupos: number;
}

export const actividades: Actividad[] = [
  { id: 'A-01', titulo: 'Gestión de equipos comerciales', tipo: 'Capacitación', fecha: '02/09/2026', inscritos: 18, cupos: 25 },
  { id: 'A-02', titulo: 'Encuentro empresarial del Sur', tipo: 'Evento', fecha: '12/09/2026', inscritos: 42, cupos: 80 },
  { id: 'A-03', titulo: 'Taller de facturación electrónica (FEU)', tipo: 'Capacitación', fecha: '19/09/2026', inscritos: 11, cupos: 30 },
  { id: 'A-04', titulo: 'Asamblea de socios — 3er trimestre', tipo: 'Reunión', fecha: '26/09/2026', inscritos: 0, cupos: 120 },
];

export const formatPesos = (n: number) =>
  n.toLocaleString('es-UY', { style: 'currency', currency: 'UYU', minimumFractionDigits: 0 });
