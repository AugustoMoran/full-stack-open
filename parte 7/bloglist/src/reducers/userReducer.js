// Ejercicio 7.13: User Reducer
// Maneja información del usuario autenticado

const userReducer = (state = null, action) => {
  switch(action.type) {
    case 'SET_USER':
      // Usuario logueado
      return action.payload
    
    case 'LOGOUT_USER':
      // Usuario deslogueado
      return null
    
    default:
      return state
  }
}

export default userReducer
