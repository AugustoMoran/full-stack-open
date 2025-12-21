# Full Stack Open - Curso Completo

Este repositorio contiene todos los ejercicios y proyectos del curso [Full Stack Open](https://fullstackopen.com/).

## 📋 Estructura del Repositorio

### Parte 0: Fundamentos de las aplicaciones web
- **0.4**: Diagrama de secuencia - Nueva nota (aplicación tradicional)
- **0.5**: Diagrama de secuencia - SPA (Single Page Application)
- **0.6**: Diagrama de secuencia - Nueva nota en SPA
- **introduccion_a_react**: Primer proyecto React con conceptos básicos

**Contenido**: [`0/`](0/)

---

### Parte 1: Introducción a React

#### 1.1-1.2: `curseinfo`
- Componentes React básicos (Header, Content, Part, Total)
- Props y estructuras de datos

#### 1.3-1.5: `unicafe`
- Estados con `useState`
- Componentes condicionales
- Estadísticas y cálculos dinámicos
- Tablas HTML en React

#### 1.6-1.14: `anectodes`
- Arrays y estados complejos
- Manejo de votaciones
- Búsqueda de máximos en arrays
- Generación de números aleatorios

**Contenido**: [`part1/`](part1/)

---

### Parte 2: Comunicación con el servidor

#### 2.1-2.5: `curseinfo`
- Renderizado de listas
- Componentes reutilizables
- Reduce para sumar valores
- Múltiples cursos

#### 2.6-2.17: `phonebook`
- Formularios controlados
- Filtrado de datos
- Comunicación con servidor (axios)
- CRUD completo (Create, Read, Update, Delete)
- Notificaciones al usuario
- Manejo de errores

#### 2.18-2.20: `countries`
- Consumo de API externa (REST Countries)
- Búsqueda y filtrado
- Renderizado condicional de datos

**Contenido**: [`parte 2/`](parte%202/)

---

### Parte 3: Programación del servidor con Node.js y Express

#### `phonebook-backend`
Aplicación backend completa con:

- ✅ **3.1-3.6**: REST API básica (GET, POST, DELETE)
- ✅ **3.7-3.8**: Morgan middleware con logging personalizado
- ✅ **3.9-3.11**: Integración frontend + backend, deploy a producción
- ✅ **3.12**: Base de datos MongoDB
- ✅ **3.13-3.14**: Operaciones con MongoDB
- ✅ **3.15-3.18**: Validaciones con Mongoose
- ✅ **3.19-3.21**: ESLint y mejoras finales
- ✅ **3.22**: Configuración de producción con variables de entorno

**Tecnologías**:
- Node.js + Express
- MongoDB + Mongoose
- Morgan (HTTP logger)
- CORS
- dotenv
- Deploy en Fly.io

**🌐 Demo en producción**: [https://phonebook-ausar.fly.dev](https://phonebook-ausar.fly.dev)

**Contenido**: [`part 3/phonebook-backend/`](part%203/phonebook-backend/)

---

## 🚀 Instrucciones de Uso

### Proyectos React (Partes 0, 1 y 2)

```bash
cd [nombre-del-proyecto]
npm install
npm run dev
```

La aplicación se abrirá en `http://localhost:5173`

### Backend (Parte 3)

```bash
cd "part 3/phonebook-backend"
npm install

# Crear archivo .env con:
# MONGODB_URI=tu_mongodb_uri
# PORT=3001

npm run dev
```

El servidor se iniciará en `http://localhost:3001`

---

## 📦 Tecnologías Utilizadas

### Frontend
- React 19.2.0
- Vite (build tool)
- Axios (HTTP client)
- ESLint (linter)

### Backend
- Node.js
- Express 5.2.1
- MongoDB + Mongoose 9.0.2
- Morgan (logging)
- CORS
- dotenv

---

## ✅ Progreso del Curso

| Parte | Estado | Ejercicios |
|-------|--------|------------|
| 0 | ✅ Completo | 0.4-0.6 |
| 1 | ✅ Completo | 1.1-1.14 |
| 2 | ✅ Completo | 2.1-2.20 |
| 3 | ✅ Completo | 3.1-3.22 |

---

## 👨‍💻 Autor

**Augusto Moran**

---

## 📝 Licencia

Este proyecto es parte de los ejercicios del curso Full Stack Open de la Universidad de Helsinki.
