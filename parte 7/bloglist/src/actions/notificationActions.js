// Notification Action Creators

export const showNotification = (message) => ({
  type: 'SHOW_NOTIFICATION',
  payload: message
})

export const hideNotification = () => ({
  type: 'HIDE_NOTIFICATION'
})
