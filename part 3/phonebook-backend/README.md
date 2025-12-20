# Phonebook Backend - Full Stack Open Part 3

Backend para la aplicación Phonebook del curso Full Stack Open.

## Tecnologías

- Node.js
- Express
- Morgan (logging)
- CORS

## Ejercicios completados

- ✅ 3.1: Lista de contactos (GET /api/persons)
- ✅ 3.2: Página de info (GET /info)
- ✅ 3.3: Obtener un contacto (GET /api/persons/:id)
- ✅ 3.4: Eliminar contacto (DELETE /api/persons/:id)
- ✅ 3.5: Agregar contacto (POST /api/persons)
- ✅ 3.6: Validaciones (nombre y número requeridos, nombre único)
- ✅ 3.7-3.8: Morgan middleware con body logging
- ✅ 3.9: Frontend integrado con backend
- ✅ 3.10: Deploy a Fly.io
- ✅ 3.11: Frontend production build

## Desarrollo local

```bash
npm install
npm run dev
```

La aplicación correrá en http://localhost:3001

## Deploy

La aplicación está desplegada en Fly.io:

**🌐 URL:** https://phonebook-ausar.fly.dev

Endpoints en producción:
- https://phonebook-ausar.fly.dev/api/persons
- https://phonebook-ausar.fly.dev/info

## Scripts disponibles

- `npm start` - Inicia el servidor
- `npm run dev` - Inicia el servidor en modo desarrollo con nodemon
- `npm run build:ui` - Compila el frontend y lo copia al backend
- `npm run deploy` - Despliega a Fly.io
- `npm run deploy:full` - Compila frontend y despliega todo
- `npm run logs:prod` - Ver logs de producción

## API Endpoints

- `GET /api/persons` - Lista todos los contactos
- `GET /api/persons/:id` - Obtiene un contacto específico
- `POST /api/persons` - Agrega un nuevo contacto
- `DELETE /api/persons/:id` - Elimina un contacto
- `GET /info` - Muestra información sobre la agenda
