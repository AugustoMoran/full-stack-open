// Ejercicio 7.11: Blog Reducer
// Maneja la lista de blog posts

const blogReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_BLOGS':
      // Cargar blogs del servidor
      return action.payload
    
    case 'ADD_BLOG':
      // Agregar nuevo blog
      return [...state, action.payload]
    
    case 'UPDATE_BLOG':
      // Actualizar blog (like, etc)
      return state.map(blog =>
        blog.id === action.payload.id ? action.payload : blog
      )
    
    case 'DELETE_BLOG':
      // Eliminar blog
      return state.filter(blog => blog.id !== action.payload)
    
    default:
      return state
  }
}

export default blogReducer
