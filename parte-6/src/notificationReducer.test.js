import { describe, expect, test } from 'vitest'
import notificationReducer from './reducers/notificationReducer'

describe('notification reducer', () => {
  test('starts with empty string', () => {
    const newState = notificationReducer(undefined, { type: 'DO_NOTHING' })
    expect(newState).toBe('')
  })

  test('sets a notification', () => {
    const action = {
      type: 'SET_NOTIFICATION',
      payload: 'Hello world'
    }

    const newState = notificationReducer('', action)
    expect(newState).toBe('Hello world')
  })

  test('clears the notification', () => {
    const action = { type: 'CLEAR_NOTIFICATION' }
    const newState = notificationReducer('Hello', action)
    expect(newState).toBe('')
  })
})
