# CCISJ — Next.js

Conversión del mockup original de Bolt (React + Vite) a **Next.js 16.3.3 con App Router**.

## Ejecutar

Requiere Node.js 20.9 o superior.

```bash
npm install
npm run dev
```

Abrí `http://localhost:3000`.

## Rutas principales

- `/` — login/demo de roles
- `/admin` — backoffice CCISJ
- `/admin/socios`
- `/admin/bolsa`
- `/admin/candidatos`
- `/admin/notificaciones`
- `/admin/caja`
- `/admin/facturacion`
- `/admin/gestoria`
- `/empresa` — portal de empresa
- `/empresa/ofertas`
- `/empresa/candidatos`
- `/empresa/notificaciones`
- `/empresa/perfil`
- `/postulante` — portal del postulante
- `/postulante/empleos`
- `/postulante/postulaciones`
- `/postulante/cv`
- `/postulante/notificaciones`

## Qué cambió respecto al proyecto de Bolt

- Vite fue reemplazado por Next.js App Router.
- La navegación basada en `useState` fue reemplazada por URLs reales de Next.
- Se conservaron los componentes, vistas, Tailwind, iconos y datos mock originales.
- Login y los tres perfiles siguen funcionando como demostración visual.
- Las secciones que en el proyecto original eran placeholders continúan como placeholders.

## Nota

El proyecto está pensado como maqueta/prototipo. Todavía no incluye autenticación, base de datos ni lógica real de permisos.
