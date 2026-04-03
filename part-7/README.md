# Full Stack Open - Parte 7

Solución completa para los ejercicios 7.1 a 7.21 del curso Full Stack Open.

## 📁 Estructura del Proyecto

```
parte 7/
├── bloglist/          # Frontend React + Redux + Router + Tailwind
│   ├── src/           # Componentes y lógica
│   ├── package.json   # Dependencias del frontend
│   └── README.md      # Instrucciones específicas del frontend
│
├── backend/           # Backend Express + MongoDB
│   ├── routes/        # Rutas API (auth, blogs, users, comments)
│   ├── models/        # Esquemas Mongoose (User, Blog)
│   ├── middleware/    # Middleware de autenticación
│   ├── package.json   # Dependencias del backend
│   └── README.md      # Instrucciones específicas del backend
│
└── README.md          # Este archivo
```

## 🚀 Inicio Rápido

### Frontend

```bash
cd bloglist
npm install
npm run dev
```

Abierto en: `http://localhost:5174`

### Backend

```bash
cd backend
npm install
node server.js
```

Corriendo en: `http://localhost:3003`

## 📚 Ejercicios Completados

- ✅ **7.1-7.3**: React Router
- ✅ **7.4-7.8**: Custom Hooks
- ✅ **7.10-7.13**: Redux (Notifications, Blogs, User)
- ✅ **7.14-7.17**: Vistas (Users, User Detail, Blog Detail, Navigation)
- ✅ **7.18-7.19**: Comentarios (GET y POST)
- ✅ **7.20-7.21**: Tailwind CSS (Diseño completo)

## 🔒 Credenciales de Prueba

```
Usuario: mluukkai | Contraseña: mluukkai
Usuario: jsmith    | Contraseña: jsmith
Usuario: jane      | Contraseña: jane123
```

## 🔧 Stack Tecnológico

**Frontend:**
- React 19
- Redux 5
- React Router DOM 7
- Tailwind CSS 4
- Axios
- Vite

**Backend:**
- Express.js 4
- MongoDB 7 (Atlas Cloud)
- Mongoose ODM
- JWT (jsonwebtoken)
- bcryptjs

## 📝 Notas

El backend incluido (`/backend`) no es parte de los ejercicios 7.1-7.21 oficiales, pero fue agregado para crear una aplicación completa y funcional con persistencia de datos en MongoDB Atlas.

Para más información, consulta los README.md específicos en cada carpeta.
