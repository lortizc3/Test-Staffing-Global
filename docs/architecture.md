# Arquitectura de la solución

## Visión general

```text
React 19 + MUI SPA
        |
        v
 Express API REST + JWT
        |
        v
 Prisma ORM
        |
        v
      SQLite
```

## Frontend
Responsabilidades principales:
- Autenticación y persistencia del token en cliente
- Protección de rutas
- Consumo de API REST
- Formularios de registro, login y tareas
- Vista principal con filtros y tablero kanban
- Cambio de estado por drag and drop

## Backend
Responsabilidades principales:
- Registro, login y lectura de usuario autenticado
- Validación de payloads
- Reglas de negocio básicas de tareas
- Protección de endpoints con JWT
- Consulta persistente de usuarios y tareas

## Base de datos
### User
- id
- name
- email
- passwordHash
- role
- createdAt
- updatedAt

### Task
- id
- title
- description
- status
- priority
- assignedToId
- createdById
- createdAt
- updatedAt

## Flujo principal
1. Usuario se registra o inicia sesión
2. Frontend guarda token JWT
3. El token se envía en `Authorization: Bearer <token>`
4. Backend valida el token y habilita rutas protegidas
5. El usuario consulta, crea, edita, mueve o elimina tareas
