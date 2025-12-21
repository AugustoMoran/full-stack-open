# 📦 Guía de Entregas - Full Stack Open

Este documento detalla cómo usar y entregar cada parte del curso.

## 📂 Estructura para Entregas

```
full-stack-open/
├── 0/                          # Parte 0: Diagramas
├── part1/                      # Parte 1: Intro a React
├── parte 2/                    # Parte 2: Servidor
├── part 3/phonebook-backend/   # Parte 3: Backend
└── README.md                   # Documentación principal
```

---

## Parte 0: Fundamentos de las aplicaciones web

### Ejercicios: 0.4 - 0.6

**Ubicación**: [`0/`](0/)

**Archivos**:
- `0.4_nueva_nota.md` - Diagrama de secuencia aplicación tradicional
- `0.5_spa.md` - Diagrama de secuencia SPA
- `0.6_nueva_nota_spa.md` - Diagrama nueva nota en SPA

**Formato**: Diagramas en formato Mermaid (secuenceDiagram)

**✅ Listo para entrega**: Sí

---

## Parte 1: Introducción a React

### Proyectos

#### 1.1-1.2: `curseinfo`
- **Ubicación**: [`part1/curseinfo/`](part1/curseinfo/)
- **Ejercicios**: Componentes, props, estructuras de datos
- **Comando**: `npm run dev`

#### 1.3-1.5: `unicafe`
- **Ubicación**: [`part1/unicafe/`](part1/unicafe/)
- **Ejercicios**: Estados, componentes condicionales, estadísticas
- **Comando**: `npm run dev`

#### 1.6-1.14: `anectodes`
- **Ubicación**: [`part1/anectodes/`](part1/anectodes/)
- **Ejercicios**: Arrays complejos, votaciones
- **Comando**: `npm run dev`

**✅ Listo para entrega**: Sí

---

## Parte 2: Comunicación con el servidor

### Proyectos

#### 2.1-2.5: `curseinfo`
- **Ubicación**: [`parte 2/curseinfo/`](parte%202/curseinfo/)
- **Ejercicios**: Renderizado de listas, reduce
- **Comando**: `npm run dev`

#### 2.6-2.17: `phonebook`
- **Ubicación**: [`parte 2/phonebook/`](parte%202/phonebook/)
- **Ejercicios**: Formularios, axios, CRUD, notificaciones
- **Comandos**:
  ```bash
  npm run dev        # Frontend en puerto 5173
  npm run server     # JSON Server en puerto 3001 (desarrollo)
  ```
- **Nota**: En producción usa el backend de la parte 3

#### 2.18-2.20: `countries`
- **Ubicación**: [`parte 2/countries/`](parte%202/countries/)
- **Ejercicios**: API externa (REST Countries)
- **Comando**: `npm run dev`

**✅ Listo para entrega**: Sí

---

## Parte 3: Programación del servidor con Node.js

### Proyecto Principal: `phonebook-backend`

**Ubicación**: [`part 3/phonebook-backend/`](part%203/phonebook-backend/)

**Ejercicios completados**: 3.1 - 3.22

### 🚀 Instrucciones de Configuración

#### Paso 1: Instalar dependencias
```bash
cd "part 3/phonebook-backend"
npm install
```

#### Paso 2: Configurar variables de entorno
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales:
# MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/phonebook?retryWrites=true&w=majority
# PORT=3001
```

#### Paso 3: Ejecutar en desarrollo
```bash
npm run dev
```

El servidor estará en `http://localhost:3001`

### 📡 Endpoints API

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/persons` | Obtener todos los contactos |
| GET | `/api/persons/:id` | Obtener un contacto específico |
| POST | `/api/persons` | Crear nuevo contacto |
| PUT | `/api/persons/:id` | Actualizar contacto existente |
| DELETE | `/api/persons/:id` | Eliminar contacto |
| GET | `/info` | Información de la agenda |

### 🌐 Deploy en Producción

**URL en vivo**: https://phonebook-ausar.fly.dev

**Para redesplegar**:
```bash
npm run deploy:full
```

Este comando:
1. Construye el frontend
2. Copia el build al backend
3. Despliega a Fly.io

### 📋 Archivos de Testing

Carpeta [`requests/`](part%203/phonebook-backend/requests/):
- `get_all_persons.rest` - Obtener todos
- `get_one_person.rest` - Obtener uno
- `create_person.rest` - Crear contacto
- `delete_person.rest` - Eliminar contacto
- `test_validation.rest` - Probar validaciones

**Uso**: Abrir con REST Client extension de VS Code

**✅ Listo para entrega**: Sí

---

## 🔧 Requisitos del Sistema

### Frontend (Partes 0, 1, 2)
- Node.js >= 18
- npm >= 9

### Backend (Parte 3)
- Node.js >= 18
- npm >= 9
- MongoDB Atlas account (gratuito)

---

## 📝 Checklist de Entrega

### Parte 0
- [x] Diagramas en formato Mermaid
- [x] 0.4, 0.5, 0.6 completados

### Parte 1
- [x] curseinfo funcionando
- [x] unicafe funcionando
- [x] anectodes funcionando
- [x] ESLint configurado

### Parte 2
- [x] curseinfo con múltiples cursos
- [x] phonebook con CRUD completo
- [x] countries con API externa
- [x] Notificaciones implementadas
- [x] Manejo de errores

### Parte 3
- [x] API REST completa
- [x] MongoDB integrado
- [x] Validaciones con Mongoose
- [x] ESLint configurado
- [x] Frontend integrado
- [x] Deploy en producción
- [x] Variables de entorno configuradas
- [x] README completo con instrucciones
- [x] .env.example incluido

---

## 🎯 Links de Entrega

Para el sistema de entregas del curso, proporciona:

**GitHub Repository**: [Tu URL aquí]

**Parte 3 - App en producción**: https://phonebook-ausar.fly.dev

---

## 📧 Autor

**Augusto Moran**

---

## ℹ️ Notas Adicionales

- Todos los proyectos tienen ESLint configurado
- Los diagramas usan sintaxis de Mermaid
- El backend usa CommonJS (`require`)
- El frontend usa ES6 Modules (`import/export`)
- MongoDB usa Mongoose para validaciones
- CORS habilitado en el backend
