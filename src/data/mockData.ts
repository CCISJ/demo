// Fictitious Spanish mock data for the CCISJ system mockups.
// All names, RUTs, companies and figures are invented for visual purposes only.

export type SocioEstado = 'activo' | 'inactivo';
export type SocioPago = 'al-dia' | 'deudor';
export type SocioTipo = 'comun' | 'directivo';

export interface Socio {
  id: string;
  empresa: string;
  rut: string;
  /** Número de empresa en BPS. Lo mantiene el propio socio desde su portal. */
  bps: string;
  tipo: SocioTipo;
  contacto: string;
  email: string;
  telefono: string;
  domicilio: string;
  estado: SocioEstado;
  pago: SocioPago;
  ultimoPago: string;
  categoria: string;
  adhesion: string;
  /** La cuenta del portal la crea el CCISJ; el socio no se registra solo. */
  cuentaActiva: boolean;
  ultimoAcceso: string;
  /**
   * Cargo mensual que ese socio le reintegra al Centro, ADEMÁS de la cuota.
   * Es opcional e independiente para cada socio, y se puede editar en
   * cualquier momento — a diferencia de la cuota, que se fija una vez al año
   * y rige los doce meses. `undefined` significa que no tiene reintegro.
   */
  reintegro?: number;
}

export const socios: Socio[] = [
  { id: 'S-1042', empresa: 'Distribuidora San José SRL', rut: '210458930012', bps: '1450872', tipo: 'directivo', contacto: 'Marta Echevarría', email: 'marta@distribuidorasj.com.uy', telefono: '099 452 310', domicilio: 'Av. Artigas 1234, San José de Mayo', estado: 'activo', pago: 'al-dia', ultimoPago: '12/08/2026', categoria: 'Comercio mayorista', adhesion: '03/2018', cuentaActiva: true, ultimoAcceso: '14/08/2026', reintegro: 1800 },
  { id: 'S-1043', empresa: 'Frigorífico Río Negro SA', rut: '215678120015', bps: '1122045', tipo: 'directivo', contacto: 'Juan Carlos Pereyra', email: 'jcpereyra@frigorificorn.com.uy', telefono: '098 221 540', domicilio: 'Ruta 3 km 92, San José de Mayo', estado: 'activo', pago: 'al-dia', ultimoPago: '02/08/2026', categoria: 'Industria frigorífica', adhesion: '11/2015', cuentaActiva: true, ultimoAcceso: '13/08/2026', reintegro: 2400 },
  { id: 'S-1044', empresa: 'Farmacity San José', rut: '219843210021', bps: '2087341', tipo: 'comun', contacto: 'Lucía Fernández', email: 'lucia@farmacitysj.com.uy', telefono: '091 778 120', domicilio: 'Treinta y Tres 640, San José de Mayo', estado: 'activo', pago: 'deudor', ultimoPago: '15/06/2026', categoria: 'Farmacia', adhesion: '07/2021', cuentaActiva: true, ultimoAcceso: '28/07/2026', reintegro: 950 },
  { id: 'S-1045', empresa: 'Transportes del Sur', rut: '213245780018', bps: '1583920', tipo: 'comun', contacto: 'Diego Martínez', email: 'diego@transportessur.com.uy', telefono: '099 654 220', domicilio: 'Camino Real 2210, Libertad', estado: 'inactivo', pago: 'deudor', ultimoPago: '20/03/2026', categoria: 'Logística y transporte', adhesion: '02/2019', cuentaActiva: false, ultimoAcceso: '11/03/2026' },
  { id: 'S-1046', empresa: 'Tecnología MóvilUY', rut: '218765430011', bps: '2214508', tipo: 'comun', contacto: 'Carolina Sosa', email: 'carolina@moviluy.com.uy', telefono: '098 112 330', domicilio: 'Sarandí 419, San José de Mayo', estado: 'activo', pago: 'al-dia', ultimoPago: '10/08/2026', categoria: 'Tecnología', adhesion: '09/2022', cuentaActiva: true, ultimoAcceso: '14/08/2026' },
  { id: 'S-1047', empresa: 'Panadería La Esquina', rut: '211234560014', bps: '1309477', tipo: 'comun', contacto: 'Raúl Giménez', email: 'raul@panaderialaesquina.com.uy', telefono: '099 887 410', domicilio: 'Asamblea 877, San José de Mayo', estado: 'activo', pago: 'al-dia', ultimoPago: '08/08/2026', categoria: 'Alimentación', adhesion: '04/2017', cuentaActiva: true, ultimoAcceso: '09/08/2026' },
  { id: 'S-1048', empresa: 'Estudio Contable Pereira & Asoc.', rut: '214567890019', bps: '1041286', tipo: 'directivo', contacto: 'Ana Pereira', email: 'ana@estudiopereira.com.uy', telefono: '092 334 550', domicilio: '25 de Mayo 512, San José de Mayo', estado: 'activo', pago: 'al-dia', ultimoPago: '14/08/2026', categoria: 'Servicios profesionales', adhesion: '01/2014', cuentaActiva: true, ultimoAcceso: '14/08/2026', reintegro: 1200 },
  { id: 'S-1049', empresa: 'Ferretería El Tornillo', rut: '217654320013', bps: '1967230', tipo: 'comun', contacto: 'Pedro Vázquez', email: 'pedro@eltornillo.com.uy', telefono: '099 221 880', domicilio: 'Larrañaga 1103, San José de Mayo', estado: 'activo', pago: 'deudor', ultimoPago: '28/05/2026', categoria: 'Ferretería', adhesion: '06/2020', cuentaActiva: true, ultimoAcceso: '02/08/2026' },
  { id: 'S-1050', empresa: 'Hotel Ciudad Vieja', rut: '216789540012', bps: '1276893', tipo: 'comun', contacto: 'Sandra Ríos', email: 'sandra@hotelcv.com.uy', telefono: '098 556 770', domicilio: 'Ituzaingó 260, San José de Mayo', estado: 'activo', pago: 'al-dia', ultimoPago: '11/08/2026', categoria: 'Hotelería y turismo', adhesion: '03/2016', cuentaActiva: true, ultimoAcceso: '12/08/2026', reintegro: 3100 },
  { id: 'S-1051', empresa: 'Agroinsumos del Sur', rut: '213987650017', bps: '1499015', tipo: 'comun', contacto: 'Fernando Larrosa', email: 'fernando@agroinsumos.com.uy', telefono: '099 344 120', domicilio: 'Ruta 11 km 145, Ecilda Paullier', estado: 'inactivo', pago: 'deudor', ultimoPago: '10/02/2026', categoria: 'Agroinsumos', adhesion: '08/2018', cuentaActiva: false, ultimoAcceso: '19/01/2026' },
  { id: 'S-1052', empresa: 'Librería y Papelera Centro', rut: '212345670016', bps: '1845663', tipo: 'comun', contacto: 'Beatriz Acosta', email: 'bea@libreriacentro.com.uy', telefono: '091 220 990', domicilio: 'Ciganda 348, San José de Mayo', estado: 'activo', pago: 'al-dia', ultimoPago: '09/08/2026', categoria: 'Librería', adhesion: '05/2019', cuentaActiva: true, ultimoAcceso: '10/08/2026' },
  { id: 'S-1053', empresa: 'Constructora San José', rut: '215432100018', bps: '1008754', tipo: 'directivo', contacto: 'Marcelo Domínguez', email: 'marcelo@constructorasj.com.uy', telefono: '098 776 100', domicilio: 'Rodó 1590, San José de Mayo', estado: 'activo', pago: 'al-dia', ultimoPago: '13/08/2026', categoria: 'Construcción', adhesion: '02/2013', cuentaActiva: true, ultimoAcceso: '13/08/2026', reintegro: 1500 },
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
  { id: 'OF-2301', puesto: 'Chofer de camión de larga distancia', empresa: 'Transportes del Sur', ubicacion: 'San José / Recorrido nacional', modalidad: 'Presencial', categoria: 'Chofer', publicada: '12/08/2026', cierra: '30/08/2026', candidatos: 7, estado: 'activa', descripcion: 'Buscamos chofer profesional con licencia C4 y experiencia mínima de 2 años en recorridos de larga distancia.', salario: '$ 65.000 + viáticos' },
  { id: 'OF-2302', puesto: 'Administrativo contable', empresa: 'Estudio Contable Pereira & Asoc.', ubicacion: 'San José de Mayo', modalidad: 'Presencial', categoria: 'Administración', publicada: '10/08/2026', cierra: '25/08/2026', candidatos: 6, estado: 'activa', descripcion: 'Estudiante avanzado de Contador o Técnico en Administración. Manejo de TANGO y Excel intermedio.', salario: '$ 48.000' },
  { id: 'OF-2303', puesto: 'Vendedor mostrador', empresa: 'Ferretería El Tornillo', ubicacion: 'San José de Mayo', modalidad: 'Presencial', categoria: 'Ventas', publicada: '08/08/2026', cierra: '22/08/2026', candidatos: 5, estado: 'activa', descripcion: 'Atención al cliente en ferretería, conocimiento de productos de construcción y buena disposición.', salario: '$ 42.000 + comisión' },
  { id: 'OF-2304', puesto: 'Operario de depósito', empresa: 'Distribuidora San José SRL', ubicacion: 'San José', modalidad: 'Presencial', categoria: 'Depósito y logística', publicada: '05/08/2026', cierra: '20/08/2026', candidatos: 6, estado: 'activa', descripcion: 'Preparación de pedidos, control de stock y carga/descarga. Se requiere carnet de salud al día.', salario: '$ 40.000' },
  { id: 'OF-2305', puesto: 'Soporte técnico junior', empresa: 'Tecnología MóvilUY', ubicacion: 'Remoto (Uruguay)', modalidad: 'Remoto', categoria: 'Informática', publicada: '03/08/2026', cierra: '18/08/2026', candidatos: 4, estado: 'activa', descripcion: 'Atención de tickets de soporte nivel 1, diagnóstico y derivación. Conocimientos de redes y Windows.', salario: '$ 55.000' },
  { id: 'OF-2306', puesto: 'Cocinero/a', empresa: 'Hotel Ciudad Vieja', ubicacion: 'San José de Mayo', modalidad: 'Presencial', categoria: 'Gastronomía', publicada: '01/08/2026', cierra: '15/08/2026', candidatos: 5, estado: 'cerrada', descripcion: 'Cocina caliente para desayuno y cena. Experiencia comprobable en hotelería o restaurantes.', salario: '$ 50.000' },
  { id: 'OF-2307', puesto: 'Atención al cliente call center', empresa: 'Farmacity San José', ubicacion: 'San José', modalidad: 'Híbrido', categoria: 'Atención al cliente', publicada: '28/07/2026', cierra: '12/08/2026', candidatos: 9, estado: 'cerrada', descripcion: 'Atención telefónica de pedidos y consultas de farmacia. Turnos rotativos mañana/tarde.', salario: '$ 38.000' },
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
  documento: string;
  email: string;
  telefono: string;
  categorias: Categoria[];
  experiencia: number;
  disponibilidad: string;
  cv: boolean;
  certificados: number;
  ciudad: string;
  edad: number;
  resumen: string;
  /** Alta en el padrón del Centro. */
  registro: string;
  /** Última vez que entró al portal. */
  ultimoAcceso: string;
  /** Postulaciones enviadas en total, no las de una oferta. */
  postulacionesEnviadas: number;
  estado: 'activo' | 'inactivo';
}

export const candidatos: Candidato[] = [
  { id: 'P-5012', nombre: 'Rodrigo Almirón', documento: '4.128.550-3', email: 'ralmiron@gmail.com', telefono: '099 310 445', categorias: ['Chofer', 'Depósito y logística'], experiencia: 8, disponibilidad: 'Inmediata', cv: true, certificados: 3, ciudad: 'San José de Mayo', edad: 34, registro: '14/02/2024', ultimoAcceso: '14/08/2026', postulacionesEnviadas: 7, estado: 'activo', resumen: 'Chofer profesional C4, experiencia en distribución nacional y carga de camión.' },
  { id: 'P-5013', nombre: 'Valentina López', documento: '5.012.884-1', email: 'valen.lopez@gmail.com', telefono: '098 774 120', categorias: ['Administración', 'Atención al cliente'], experiencia: 5, disponibilidad: '15 días', cv: true, certificados: 2, ciudad: 'San José', edad: 28, registro: '03/09/2024', ultimoAcceso: '13/08/2026', postulacionesEnviadas: 4, estado: 'activo', resumen: 'Administrativa con manejo de TANGO y atención al público en comercio.' },
  { id: 'P-5014', nombre: 'Matías Cabrera', documento: '5.334.019-7', email: 'matias.cabrera@outlook.com', telefono: '091 556 830', categorias: ['Informática'], experiencia: 3, disponibilidad: 'Inmediata', cv: true, certificados: 4, ciudad: 'Libertad', edad: 25, registro: '22/01/2025', ultimoAcceso: '14/08/2026', postulacionesEnviadas: 3, estado: 'activo', resumen: 'Técnico en redes y soporte, estudiante de Ing. Sistemas.' },
  { id: 'P-5015', nombre: 'Camila Russo', documento: '4.776.201-9', email: 'camila.russo@gmail.com', telefono: '099 118 204', categorias: ['Gastronomía', 'Atención al cliente'], experiencia: 6, disponibilidad: '30 días', cv: true, certificados: 1, ciudad: 'San José de Mayo', edad: 31, registro: '11/11/2023', ultimoAcceso: '02/08/2026', postulacionesEnviadas: 9, estado: 'activo', resumen: 'Cocinera con experiencia en hotelería y pastelería.' },
  { id: 'P-5016', nombre: 'Lucas Méndez', documento: '5.190.663-4', email: 'lucasmendez88@gmail.com', telefono: '098 440 917', categorias: ['Ventas', 'Atención al cliente'], experiencia: 4, disponibilidad: 'Inmediata', cv: true, certificados: 2, ciudad: 'Ciudad del Plata', edad: 27, registro: '30/05/2025', ultimoAcceso: '12/08/2026', postulacionesEnviadas: 2, estado: 'activo', resumen: 'Vendedor mostrador y teleoperador, experiencia en retail y ferretería.' },
  { id: 'P-5017', nombre: 'Florencia Núñez', documento: '4.208.117-2', email: 'flor.nunez@estudiocontable.uy', telefono: '092 663 401', categorias: ['Administración'], experiencia: 10, disponibilidad: 'A convenir', cv: true, certificados: 5, ciudad: 'San José de Mayo', edad: 38, registro: '08/03/2023', ultimoAcceso: '09/08/2026', postulacionesEnviadas: 5, estado: 'activo', resumen: 'Contadora pública, experiencia en estudios contables medianos.' },
  { id: 'P-5018', nombre: 'Ignacio Pereira', documento: '3.901.442-6', email: 'ignacio.pereira@gmail.com', telefono: '099 002 718', categorias: ['Chofer'], experiencia: 12, disponibilidad: 'Inmediata', cv: false, certificados: 2, ciudad: 'Kiyú', edad: 42, registro: '19/07/2023', ultimoAcceso: '21/02/2026', postulacionesEnviadas: 11, estado: 'inactivo', resumen: 'Chofer de ómnibus y camión, registro profesional al día.' },
  { id: 'P-5019', nombre: 'Sofía Giménez', documento: '5.487.330-8', email: 'sofi.gimenez@gmail.com', telefono: '091 887 265', categorias: ['Depósito y logística', 'Otros'], experiencia: 2, disponibilidad: 'Inmediata', cv: true, certificados: 1, ciudad: 'San José', edad: 23, registro: '02/06/2026', ultimoAcceso: '14/08/2026', postulacionesEnviadas: 1, estado: 'activo', resumen: 'Operaria de depósito, manejo de transpaleta y control de stock.' },
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
export type NotifPrioridad = 'comun' | 'emergente';
export type NotifDestinatario =
  | 'todos'
  | 'directivos'
  | 'no-directivos'
  | 'postulantes';

export interface Notificacion {
  id: string;
  titulo: string;
  cuerpo: string;
  categoria: NotifCategoria;
  fecha: string;
  leida: boolean;
  prioridad: NotifPrioridad;
  destinatario: NotifDestinatario;
}

export const notificaciones: Notificacion[] = [
  { id: 'N-310', titulo: 'Tu postulación pasó a revisión', cuerpo: 'Transportes del Sur está revisando tu postulación a "Chofer de camión de larga distancia".', categoria: 'Bolsa de trabajo', fecha: 'Hace 25 min', leida: false, prioridad: 'comun', destinatario: 'postulantes' },
  { id: 'N-309', titulo: 'Nueva oferta en tu categoría', cuerpo: 'Distribuidora San José SRL publicó "Operario de depósito". Coincide con tu perfil.', categoria: 'Bolsa de trabajo', fecha: 'Hace 2 h', leida: false, prioridad: 'comun', destinatario: 'postulantes' },
  { id: 'N-311', titulo: 'Taller gratuito de entrevistas laborales', cuerpo: 'Sábado 20/09, 10:00 hs en la sede del CCISJ. Abierto a todos los postulantes registrados.', categoria: 'Capacitaciones', fecha: 'Ayer', leida: true, prioridad: 'comun', destinatario: 'postulantes' },
  { id: 'N-308', titulo: 'Corte de suministro eléctrico programado', cuerpo: 'UTE informa corte de energía en la zona de la sede el viernes de 14 a 18 hs. Se recomienda reprogramar trámites presenciales.', categoria: 'Comunicados', fecha: 'Hace 8 min', leida: false, prioridad: 'emergente', destinatario: 'todos' },
  { id: 'N-307', titulo: 'Convocatoria urgente: reunión de directiva', cuerpo: 'Se solicita la presencia de todos los socios directivos mañana a las 9:00 hs por un tema institucional urgente.', categoria: 'Comunicados', fecha: 'Hace 20 min', leida: false, prioridad: 'emergente', destinatario: 'directivos' },
  { id: 'N-301', titulo: 'Nueva postulación en tu oferta', cuerpo: 'Rodrigo Almirón se postuló a "Operario de depósito".', categoria: 'Bolsa de trabajo', fecha: 'Hace 12 min', leida: false, prioridad: 'comun', destinatario: 'todos' },
  { id: 'N-302', titulo: 'Capacitación: Gestión de equipos comerciales', cuerpo: 'Inicia el 02/09 a las 18:30 hs en la sede del CCISJ. Cupos limitados.', categoria: 'Capacitaciones', fecha: 'Hace 1 h', leida: false, prioridad: 'comun', destinatario: 'todos' },
  { id: 'N-303', titulo: 'Recordatorio de cuota societaria', cuerpo: 'Tu cuota del mes de agosto vence el 30/09. Evita perder beneficios.', categoria: 'Beneficios para socios', fecha: 'Hace 3 h', leida: false, prioridad: 'comun', destinatario: 'no-directivos' },
  { id: 'N-304', titulo: 'Comunicado: feriado del 25 de agosto', cuerpo: 'La sede permanecerá cerrada por el aniversario de San José.', categoria: 'Comunicados', fecha: 'Ayer', leida: true, prioridad: 'comun', destinatario: 'todos' },
  { id: 'N-305', titulo: 'Evento: Encuentro empresarial del Sur', cuerpo: 'Jueves 12/09, 19:00 hs. Networking con socios y autoridades.', categoria: 'Eventos', fecha: 'Ayer', leida: true, prioridad: 'comun', destinatario: 'todos' },
  { id: 'N-306', titulo: 'Tu oferta fue cerrada', cuerpo: '"Atención al cliente call center" finalizó su período de publicación.', categoria: 'Bolsa de trabajo', fecha: '2 días', leida: true, prioridad: 'comun', destinatario: 'todos' },
];

/** Quién está mirando el portal. Decide qué notificaciones le llegan. */
export type Portal = 'admin' | 'empresa' | 'postulante';

/**
 * Cada portal recibe lo suyo.
 *
 * El admin ve todo porque es quien emite. La empresa del ejemplo es socio
 * directivo, así que no le llega lo dirigido a no directivos. El postulante
 * no es socio: las comunicaciones institucionales y los beneficios de socio
 * no van dirigidos a él.
 */
export const categoriasPorPortal: Record<Portal, NotifCategoria[]> = {
  admin: ['Capacitaciones', 'Eventos', 'Comunicados', 'Bolsa de trabajo', 'Beneficios para socios'],
  empresa: ['Capacitaciones', 'Eventos', 'Comunicados', 'Bolsa de trabajo', 'Beneficios para socios'],
  postulante: ['Capacitaciones', 'Eventos', 'Bolsa de trabajo'],
};

export const notificacionesDe = (portal: Portal) =>
  notificaciones.filter((n) => {
    if (portal === 'admin') return true;
    if (!categoriasPorPortal[portal].includes(n.categoria)) return false;
    if (portal === 'postulante') return n.destinatario === 'postulantes';
    // La empresa del ejemplo es socio directivo.
    return n.destinatario === 'todos' || n.destinatario === 'directivos';
  });

/** Sin leer en ese portal: el número del menú sale de acá, no escrito a mano. */
export const sinLeerDe = (portal: Portal) => notificacionesDe(portal).filter((n) => !n.leida).length;

// ---------------------------------------------------------------------------
// Cuotas societarias: el valor se fija una vez al año (en enero) y rige los
// 12 meses. La cuota de un mes se abona durante ese mes y tiene de plazo
// hasta el fin del mes siguiente (configurable vía `mesesPlazo`).
// ---------------------------------------------------------------------------

export interface CuotaAnual {
  anio: number;
  valor: number;
}

export const cuotasPorAnio: CuotaAnual[] = [
  { anio: 2023, valor: 7200 },
  { anio: 2024, valor: 8400 },
  { anio: 2025, valor: 9800 },
  { anio: 2026, valor: 11500 },
];

export interface ConfigCuotas {
  mesesPlazo: number; // 1 = la cuota de un mes vence a fin del mes siguiente
}

export const configCuotas: ConfigCuotas = { mesesPlazo: 1 };

const nombresMes = [
  'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
  'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre',
];

/** El período que muestra toda la demo. */
export const periodoActual = { mes: 7, anio: 2026, label: 'Agosto 2026' };

/**
 * Mes en que vence la cuota de `mesCuota` (0 = enero) con ese plazo.
 * Por defecto usa enero, que es el ejemplo con el que se explica la regla
 * en Configuración; las pantallas que hablan del mes en curso pasan el suyo.
 */
export const nombreMesVencimiento = (mesesPlazo: number, mesCuota = 0) => {
  const idx = (((mesCuota + mesesPlazo) % 12) + 12) % 12;
  return nombresMes[idx];
};

// ---------------------------------------------------------------------------
// Gastos del mes: cargos adicionales que se SUMAN a la cuota societaria de
// cada socio ese mes (no son gastos operativos del Centro). El total que un
// socio termina abonando es cuota base + gastos del mes.
// ---------------------------------------------------------------------------

export interface GastoDelMes {
  id: string;
  concepto: string;
  monto: number;
}

export const gastosDelMes: GastoDelMes[] = [
  { id: 'G-01', concepto: 'Fondo de mantenimiento edilicio', monto: 350 },
  { id: 'G-02', concepto: 'Aporte a capacitaciones', monto: 150 },
];

// ---------------------------------------------------------------------------
// Reintegros a socios: cada socio puede tener un reintegro propio que se SUMA
// a lo que paga ese mes. Es opcional —no todos lo tienen— y editable en
// cualquier momento desde la ficha del socio o desde Configuración.
//
// El total que abona un socio es entonces:
//
//     cuota vigente del año  +  gastos del mes  +  reintegro del socio
//
// Los dos primeros términos son iguales para todos; el tercero es lo único
// que varía socio por socio.
// ---------------------------------------------------------------------------

/** Total mensual de un socio: cuota base + gastos del mes + su reintegro. */
export const totalMensualSocio = (
  socio: Pick<Socio, 'reintegro'>,
  cuotaBase: number,
  gastosMes: number,
) => cuotaBase + gastosMes + (socio.reintegro ?? 0);

export interface MovimientoCaja {
  id: string;
  fecha: string;
  concepto: string;
  tipo: 'ingreso' | 'egreso';
  monto: number;
  cuenta: string;
}

export const movimientosCaja: MovimientoCaja[] = [
  { id: 'M-7709', fecha: '14/08/2026', concepto: 'Cobro cuota societaria — Estudio Contable Pereira & Asoc.', tipo: 'ingreso', monto: 13200, cuenta: 'Caja de ahorro $' },
  { id: 'M-7702', fecha: '14/08/2026', concepto: 'Pago proveedor de impresión', tipo: 'egreso', monto: 4800, cuenta: 'Caja chica' },
  { id: 'M-7710', fecha: '13/08/2026', concepto: 'Cobro cuota societaria — Constructora San José', tipo: 'ingreso', monto: 13500, cuenta: 'Cuenta corriente $' },
  { id: 'M-7703', fecha: '13/08/2026', concepto: 'Inscripción capacitación gestión comercial', tipo: 'ingreso', monto: 3200, cuenta: 'Caja de ahorro $' },
  { id: 'M-7704', fecha: '13/08/2026', concepto: 'Servicios contables mes en curso', tipo: 'egreso', monto: 22000, cuenta: 'Cuenta corriente $' },
  { id: 'M-7711', fecha: '12/08/2026', concepto: 'Cobro cuota societaria — Distribuidora San José SRL', tipo: 'ingreso', monto: 13800, cuenta: 'Caja de ahorro $' },
  { id: 'M-7706', fecha: '12/08/2026', concepto: 'Alquiler de salón para evento', tipo: 'egreso', monto: 15000, cuenta: 'Cuenta corriente $' },
  { id: 'M-7705', fecha: '11/08/2026', concepto: 'Cobro cuota societaria — Hotel Ciudad Vieja', tipo: 'ingreso', monto: 15100, cuenta: 'Caja de ahorro $' },
  { id: 'M-7712', fecha: '10/08/2026', concepto: 'Cobro cuota societaria — Tecnología MóvilUY', tipo: 'ingreso', monto: 12000, cuenta: 'Caja de ahorro $' },
  { id: 'M-7708', fecha: '10/08/2026', concepto: 'Mantenimiento sede — plomería', tipo: 'egreso', monto: 7300, cuenta: 'Caja chica' },
  { id: 'M-7713', fecha: '09/08/2026', concepto: 'Cobro cuota societaria — Librería y Papelera Centro', tipo: 'ingreso', monto: 12000, cuenta: 'Caja de ahorro $' },
  { id: 'M-7707', fecha: '08/08/2026', concepto: 'Cobro cuota societaria — Panadería La Esquina', tipo: 'ingreso', monto: 12000, cuenta: 'Caja de ahorro $' },
  { id: 'M-7701', fecha: '02/08/2026', concepto: 'Cobro cuota societaria — Frigorífico Río Negro SA', tipo: 'ingreso', monto: 14400, cuenta: 'Caja de ahorro $' },
];

export type FacturaEstado = 'pagada' | 'pendiente' | 'vencida';
export type FacturaTipo = 'e-Factura' | 'e-Ticket' | 'Nota de crédito';
/** Acuse de DGI del comprobante fiscal electrónico. */
export type FacturaDgi = 'aceptado' | 'pendiente';

export interface Factura {
  id: string;
  numero: string;
  tipo: FacturaTipo;
  cliente: string;
  rut: string;
  /** Mes de cuota que cubre, o el servicio facturado. */
  concepto: string;
  fecha: string;
  vencimiento: string;
  monto: number;
  estado: FacturaEstado;
  dgi: FacturaDgi;
}

/**
 * Un comprobante por socio y por mes. Los importes coinciden con el total
 * que calcula totalMensualSocio: cuota vigente + gastos del mes + reintegro.
 * Los cuatro socios deudores aparecen dos veces —el comprobante viejo ya
 * vencido y el de agosto todavía en plazo—, que es lo que ve quien cobra.
 */
// Los importes viejos no coinciden con los de agosto porque los gastos del
// mes cambian mes a mes: en marzo todavía no existía el aporte a capacitaciones.
export const facturas: Factura[] = [
  { id: 'F-16', numero: 'FEU-001-002153', tipo: 'e-Factura', cliente: 'Agroinsumos del Sur', rut: '213987650017', concepto: 'Cuota agosto 2026', fecha: '14/08/2026', vencimiento: '30/09/2026', monto: 12000, estado: 'pendiente', dgi: 'pendiente' },
  { id: 'F-15', numero: 'FEU-001-002152', tipo: 'e-Factura', cliente: 'Ferretería El Tornillo', rut: '217654320013', concepto: 'Cuota agosto 2026', fecha: '14/08/2026', vencimiento: '30/09/2026', monto: 12000, estado: 'pendiente', dgi: 'aceptado' },
  { id: 'F-14', numero: 'FEU-001-002151', tipo: 'e-Factura', cliente: 'Transportes del Sur', rut: '213245780018', concepto: 'Cuota agosto 2026', fecha: '14/08/2026', vencimiento: '30/09/2026', monto: 12000, estado: 'pendiente', dgi: 'aceptado' },
  { id: 'F-13', numero: 'FEU-001-002150', tipo: 'e-Factura', cliente: 'Farmacity San José', rut: '219843210021', concepto: 'Cuota agosto 2026', fecha: '14/08/2026', vencimiento: '30/09/2026', monto: 12950, estado: 'pendiente', dgi: 'aceptado' },
  { id: 'F-12', numero: 'FEU-001-002149', tipo: 'e-Factura', cliente: 'Estudio Contable Pereira & Asoc.', rut: '214567890019', concepto: 'Cuota agosto 2026', fecha: '14/08/2026', vencimiento: '30/09/2026', monto: 13200, estado: 'pagada', dgi: 'aceptado' },
  { id: 'F-11', numero: 'FEU-001-002148', tipo: 'e-Factura', cliente: 'Constructora San José', rut: '215432100018', concepto: 'Cuota agosto 2026', fecha: '13/08/2026', vencimiento: '30/09/2026', monto: 13500, estado: 'pagada', dgi: 'aceptado' },
  { id: 'F-10', numero: 'FEU-001-002147', tipo: 'e-Ticket', cliente: 'Consumidor final', rut: '—', concepto: 'Inscripción capacitación gestión comercial', fecha: '13/08/2026', vencimiento: '13/08/2026', monto: 3200, estado: 'pagada', dgi: 'aceptado' },
  { id: 'F-09', numero: 'FEU-001-002146', tipo: 'e-Factura', cliente: 'Distribuidora San José SRL', rut: '210458930012', concepto: 'Cuota agosto 2026', fecha: '12/08/2026', vencimiento: '30/09/2026', monto: 13800, estado: 'pagada', dgi: 'aceptado' },
  { id: 'F-08', numero: 'FEU-001-002145', tipo: 'e-Factura', cliente: 'Hotel Ciudad Vieja', rut: '216789540012', concepto: 'Cuota agosto 2026', fecha: '11/08/2026', vencimiento: '30/09/2026', monto: 15100, estado: 'pagada', dgi: 'aceptado' },
  { id: 'F-07', numero: 'FEU-001-002144', tipo: 'e-Factura', cliente: 'Tecnología MóvilUY', rut: '218765430011', concepto: 'Cuota agosto 2026', fecha: '10/08/2026', vencimiento: '30/09/2026', monto: 12000, estado: 'pagada', dgi: 'aceptado' },
  { id: 'F-06', numero: 'FEU-001-002143', tipo: 'e-Factura', cliente: 'Librería y Papelera Centro', rut: '212345670016', concepto: 'Cuota agosto 2026', fecha: '09/08/2026', vencimiento: '30/09/2026', monto: 12000, estado: 'pagada', dgi: 'aceptado' },
  { id: 'F-05', numero: 'FEU-001-002142', tipo: 'e-Factura', cliente: 'Panadería La Esquina', rut: '211234560014', concepto: 'Cuota agosto 2026', fecha: '08/08/2026', vencimiento: '30/09/2026', monto: 12000, estado: 'pagada', dgi: 'aceptado' },
  { id: 'F-04', numero: 'FEU-001-002138', tipo: 'e-Factura', cliente: 'Frigorífico Río Negro SA', rut: '215678120015', concepto: 'Cuota agosto 2026', fecha: '02/08/2026', vencimiento: '30/09/2026', monto: 14400, estado: 'pagada', dgi: 'aceptado' },
  { id: 'F-03', numero: 'FEU-001-002119', tipo: 'e-Factura', cliente: 'Farmacity San José', rut: '219843210021', concepto: 'Cuota junio 2026', fecha: '30/06/2026', vencimiento: '31/07/2026', monto: 12950, estado: 'vencida', dgi: 'aceptado' },
  { id: 'F-02', numero: 'FEU-001-002104', tipo: 'e-Factura', cliente: 'Ferretería El Tornillo', rut: '217654320013', concepto: 'Cuota mayo 2026', fecha: '31/05/2026', vencimiento: '30/06/2026', monto: 12000, estado: 'vencida', dgi: 'aceptado' },
  { id: 'F-01', numero: 'FEU-001-002071', tipo: 'e-Factura', cliente: 'Transportes del Sur', rut: '213245780018', concepto: 'Cuota marzo 2026', fecha: '31/03/2026', vencimiento: '30/04/2026', monto: 11850, estado: 'vencida', dgi: 'aceptado' },
  { id: 'F-00', numero: 'FEU-001-002055', tipo: 'e-Factura', cliente: 'Agroinsumos del Sur', rut: '213987650017', concepto: 'Cuota febrero 2026', fecha: '28/02/2026', vencimiento: '31/03/2026', monto: 11850, estado: 'vencida', dgi: 'aceptado' },
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
