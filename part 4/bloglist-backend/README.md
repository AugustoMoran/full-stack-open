# Bloglist Backend — Full Stack Open Parte 4

Backend para la aplicación Bloglist (parte 4 del curso).

## 🧩 Funcionalidades
- API REST para blogs y usuarios
- Autenticación con JWT
- Pruebas automatizadas con `node --test`

## ⚙️ Configuración

1) Instalar dependencias:

```bash
npm install
```

2) Variables de entorno:

Crea un archivo `.env` basado en `.env.example`:

```bash
cp .env.example .env
```

Variables esperadas:
- `PORT`
- `MONGODB_URI`
- `TEST_MONGODB_URI`
- `SECRET`

3) Ejecutar en desarrollo:

```bash
npm run dev
```

Servidor en `http://localhost:3003`.

## 🧪 Tests

```bash
npm test
```

## 📁 Endpoints principales
- `POST /api/users`
- `POST /api/login`
- `GET /api/blogs`
- `POST /api/blogs`

## ✅ Estado
Listo para entrega (parte 4).
