// Ejercicio 7.10: Notification Reducer
// Maneja mensajes temporales de notificación

const notificationReducer = (state = null, action) => {
  switch(action.type) {
    case 'SHOW_NOTIFICATION':
      return action.payload
    
    case 'HIDE_NOTIFICATION':
      return null
    
    default:
      return state
  }
}

export default notificationReducer
