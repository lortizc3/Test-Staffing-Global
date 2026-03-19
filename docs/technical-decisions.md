# Decisiones tecnicas - version auditada final

## 1. Arquitectura separada frontend/backend
Se mantuvo una separacion clara entre interfaz, API y persistencia para facilitar mantenimiento, lectura y escalabilidad.

## 2. React 19 + TypeScript + Vite
Se eligio una base moderna y liviana para el frontend. React 19 cubre el requerimiento del reto, Vite mejora DX y TypeScript reduce errores de integracion.

## 3. MUI como sistema visual
Se respeto MUI como libreria principal y se mantuvieron intactas las decisiones visuales ya hechas en colores, gradientes y border radius. La auditoria solo toco aspectos tecnicos.

## 4. Prisma + SQLite
Se mantuvo Prisma como ORM y SQLite como motor local porque permiten una evaluacion rapida y un setup sencillo. Prisma aporta tipado, relaciones claras y una capa de acceso consistente.

## 5. JWT stateless
La autenticacion usa JWT porque el frontend y el backend estan desacoplados. Esto simplifica la proteccion de rutas y evita manejo de sesiones server-side para este alcance.

## 6. Backend por capas
Se conservaron rutas, controladores, servicios, repositorios y utilidades para no mezclar responsabilidades y facilitar la evolucion del proyecto.

## 7. Seed documentado
El seed crea el usuario admin inicial y evita friccion para quien revise la prueba. Quedo soportado por `.env.example` y README actualizado.

## 8. i18n real en frontend
En esta iteracion se corrigio la internacionalizacion para que no fuera solo decorativa. Se aplico a:
- shell principal
- login y registro
- dashboard
- formularios de tarea
- filtros
- chips de estado y prioridad
- detalle de tarea
- tabla de tareas
- selector de idioma
- textos de carga


## 12. Entrega limpia
La version final recomendada excluye `node_modules`, `dist`, `.env` reales, `dev.db` local y basura de sistema para que el evaluador reciba solo codigo fuente y documentacion util.
