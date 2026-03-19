# Team Task Board

Solucion full stack para la prueba tecnica Team Task Board. El proyecto incluye autenticacion con JWT, tablero kanban con drag and drop, filtros, CRUD de tareas, roles basicos y una capa de internacionalizacion con soporte real para espanol e ingles, proyecto en el cuel un usuario de manera sencilla sea en español o inglés, puede configurar, crear, editar o filtrar sus tareas.

## Stack

### Frontend
- React 19
- TypeScript
- Vite
- Material UI (MUI)
- React Router DOM
- React Hook Form + Zod
- Axios
- dnd-kit
- i18next + react-i18next

### Backend
- Node.js
- Express
- TypeScript
- Prisma ORM
- SQLite
- JWT
- bcrypt
- Zod

## Estructura

```bash
team-task-board-deliverable/
  frontend/
  backend/
  docs/
  README.md
```

## Funcionalidades cubiertas

- Registro, login y logout
- JWT con rutas protegidas
- Roles `ADMIN` y `MEMBER`
- CRUD de tareas
- Cambio de estado por formulario y por drag and drop
- Filtros por estado, prioridad, asignado y busqueda por titulo
- Vista kanban responsive
- Vista tabla de apoyo
- Auditoria basica: `createdBy`, `createdAt`, `updatedAt`
- i18n real en frontend para espanol e ingles

## Variables de entorno

### Backend
Copia `backend/.env.example` a `backend/.env`

```env
PORT=4000
DATABASE_URL="file:./dev.db"
JWT_ACCESS_SECRET="change-me-super-secret"
JWT_EXPIRES_IN="8h"
CORS_ORIGIN="http://localhost:5173"
SEED_ADMIN_EMAIL="admin@teamboard.dev"
SEED_ADMIN_PASSWORD="Admin123*"
```

### Frontend
Copia `frontend/.env.example` a `frontend/.env`

```env
VITE_API_URL=http://localhost:4000/api
```

## Como correr el proyecto

### 1. Backend

```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run seed
npm run dev
```

API disponible en:
- `http://localhost:4000/api`
- `GET /api/health`

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

App disponible en:
- `http://localhost:5173`

## Usuario demo inicial

Despues de ejecutar el seed:

- Email: `admin@teamboard.dev`
- Password: `Admin123*`

## Scripts utiles

### Backend
- `npm run dev`
- `npm run build`
- `npm run seed`
- `npm run prisma:generate`

### Frontend
- `npm run dev`
- `npm run build`

## Endpoints principales

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/logout`
- `GET /api/auth/me`

### Users
- `GET /api/users`

### Tasks
- `GET /api/tasks`
- `POST /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id`
- `PATCH /api/tasks/:id/status`
- `DELETE /api/tasks/:id`

## Validacion tecnica aplicada en esta version

- Limpieza de configuracion TypeScript en backend
- Tipado correcto de params en controladores y `asyncHandler`
- Ajuste tipado para firma de JWT
- Internacionalizacion aplicada a vistas principales, formularios, filtros, chips y mensajes base
- Eliminacion de dependencia del idioma hardcodeado en componentes clave
- Preparacion de `.env.example` para entrega limpia
- Entrega pensada sin `node_modules`, `dist` ni base de datos local para que el evaluador instale desde cero

## Base de datos

Se usa SQLite por velocidad de setup y facilidad de evaluacion local, con Prisma como capa de acceso (incluida en la carpeta backend).

Entidades:
- `User`
- `Task`

Relaciones:
- `Task.assignedToId -> User.id`
- `Task.createdById -> User.id`

## Documentos incluidos

- `docs/technical-decisions.md`
- `docs/delivery-documents.md`
- `docs/checklist-requirements.md`
- `docs/architecture.md`

## Nota de evaluacion

La entrega limpia recomendada es la carpeta fuente sin `node_modules`, sin `dist` y sin `.env` reales. El evaluador solo debe copiar los `.env.example`, instalar dependencias, correr Prisma y levantar frontend y backend.
