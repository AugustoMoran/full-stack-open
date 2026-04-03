import { describe, expect, test } from 'vitest'
import filterReducer, { setFilter } from './reducers/filterReducer'

describe('filter reducer', () => {
  test('returns initial state when action unknown', () => {
    const newState = filterReducer(undefined, { type: 'DO_NOTHING' })
    expect(newState).toBe('')
  })

  test('sets filter value', () => {
    const action = setFilter('react')
    const newState = filterReducer('', action)
    expect(newState).toBe('react')
  })
})
