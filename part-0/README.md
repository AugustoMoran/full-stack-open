# Parte 0: Fundamentos de las aplicaciones web

Diagramas de secuencia que muestran cómo funcionan las aplicaciones web tradicionales y las Single Page Applications (SPA).

## Ejercicios Completados

### 0.4: Nueva nota (aplicación tradicional)
**Archivo**: [0.4_nueva_nota.md](0.4_nueva_nota.md)

Diagrama de secuencia que muestra el proceso de agregar una nueva nota en una aplicación web tradicional:
- Usuario escribe una nota y hace clic en "Guardar"
- Navegador envía POST al servidor
- Servidor responde con 201 Created
- Navegador actualiza la lista de notas

### 0.5: SPA (Single Page Application)
**Archivo**: [0.5_spa.md](0.5_spa.md)

Diagrama de secuencia que muestra cómo carga una SPA:
- Usuario abre la URL
- Navegador obtiene HTML + CSS + JS
- JavaScript ejecuta fetch para obtener las notas
- Servidor responde con JSON
- JavaScript renderiza las notas en la página

### 0.6: Nueva nota en SPA
**Archivo**: [0.6_nueva_nota_spa.md](0.6_nueva_nota_spa.md)

Diagrama de secuencia que muestra cómo se agrega una nota en una SPA:
- Usuario escribe una nota y hace clic en "Guardar"
- JavaScript envía POST con los datos
- Servidor responde con 201 Created
- JavaScript agrega la nota al DOM sin recargar la página

## Formato de los Diagramas

Todos los diagramas están escritos en formato **Mermaid** (sequenceDiagram), que es compatible con GitHub y muchas otras plataformas.

## Visualización

Para visualizar estos diagramas:
1. **En GitHub**: Los archivos .md se renderizan automáticamente
2. **En VS Code**: Instala la extensión "Markdown Preview Mermaid Support"
3. **Online**: Copia y pega el contenido en https://mermaid.live/

## Conceptos Clave

- **Aplicación tradicional**: Cada acción recarga toda la página
- **SPA**: La página se carga una vez y el contenido se actualiza dinámicamente con JavaScript
- **HTTP POST**: Método para enviar datos al servidor
- **JSON**: Formato de intercambio de datos entre cliente y servidor

## Proyecto de Introducción

Además de los diagramas, esta carpeta incluye un proyecto básico de introducción a React:

**Carpeta**: [`introduccion_a_react/`](introduccion_a_react/)

- Primeros pasos con React
- Componentes básicos
- Props
- Renderizado dinámico

```bash
cd introduccion_a_react
npm install
npm run dev
```

---

✅ **Listo para entrega**
