// Ejercicio 7.14: Users List Reducer
// Maneja la lista completa de usuarios (diferente del user logueado)

const usersReducer = (state = [], action) => {
  switch(action.type) {
    case 'SET_USERS':
      // Cargar lista de usuarios del servidor
      return action.payload
    
    default:
      return state
  }
}

export default usersReducer
