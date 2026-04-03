# Bloglist Backend — Full Stack Open Parte 7

Backend API Express + MongoDB para la aplicación Bloglist.

## 🚀 Setup

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar MongoDB

Asegúrate de tener MongoDB corriendo:

```bash
# En Windows (si tienes MongoDB instalado):
mongod

# O usar MongoDB Atlas (cloud):
# Actualizar MONGODB_URI en .env
```

### 3. Configurar variables de entorno

Editar `.env`:

```
PORT=3003
MONGODB_URI=mongodb://localhost:27017/bloglist
SECRET=your-super-secret-key-change-in-production
```

### 4. Iniciar servidor

```bash
# Desarrollo (con nodemon):
npm run dev

# Producción:
npm start
```

Servidor corriendo en `http://localhost:3003`

---

## 📚 API Endpoints

### Autenticación

```
POST   /api/auth/register     { name, username, password }
POST   /api/auth/login        { username, password }
```

### Blogs

```
GET    /api/blogs                      Lista todos los blogs
GET    /api/blogs/:id                  Obtener blog por ID
POST   /api/blogs                      Crear blog (requiere token)
PUT    /api/blogs/:id                  Actualizar blog (requiere token)
DELETE /api/blogs/:id                  Eliminar blog (requiere token)
```

### Usuarios

```
GET    /api/users                      Lista todos los usuarios
GET    /api/users/:id                  Obtener usuario por ID (con sus blogs)
```

### Comentarios

```
GET    /api/blogs/:id/comments         Obtener comentarios de un blog
POST   /api/blogs/:id/comments         Crear comentario en un blog
```

---

## 🔐 Autenticación

Los endpoints protegidos requieren:

```
Authorization: Bearer <token>
```

El token se recibe al hacer login/register.

---

## 📊 Estructura de Datos

### User
```javascript
{
  _id: ObjectId,
  name: String,
  username: String (unique),
  passwordHash: String (bcrypt hash),
  blogs: [ObjectId],
  createdAt: Date,
  updatedAt: Date
}
```

### Blog
```javascript
{
  _id: ObjectId,
  title: String,
  author: String,
  url: String,
  likes: Number,
  user: ObjectId (referencia a User),
  comments: [Comment],
  createdAt: Date,
  updatedAt: Date
}
```

### Comment
```javascript
{
  _id: ObjectId,
  text: String,
  user: ObjectId (referencia a User, nullable),
  blog: ObjectId (referencia a Blog),
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🧪 Usar con Frontend

El frontend espera el backend en `http://localhost:3003`.

Configurar en `frontend/.env`:
```
VITE_API_URL=http://localhost:3003
```

O usar el valor por defecto en `src/config.js`.

---

## 📝 Datos de Prueba

```
Username: mluukkai
Password: mluukkai

Username: jsmith
Password: jsmith
```

Estos se pueden crear usando el endpoint `/api/auth/register`.

---

## 🐛 Troubleshooting

**MongoDB connection error:**
- Verificar que MongoDB está corriendo (`mongod`)
- Verificar `MONGODB_URI` en `.env`

**Token invalid:**
- Incluir `Authorization: Bearer <token>` en headers
- Token expira en 7 días

**CORS errors:**
- CORS está habilitado para todas las origins
- Cambiar en `server.js` si es necesario

---

**Ready for Full Stack Open submission!** 🎉
