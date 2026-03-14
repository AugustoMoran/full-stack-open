import deepFreeze from 'deep-freeze'
import { describe, expect, test } from 'vitest'
import anecdoteReducer, { initialState } from './reducers/anecdoteReducer'

describe('anecdote reducer', () => {
  test('returns the initial state when state undefined', () => {
    const action = { type: 'DO_NOTHING' }
    const newState = anecdoteReducer(undefined, action)

    expect(newState).toEqual(initialState)
  })

  test('initializes anecdotes when INIT_ANECDOTES action arrives', () => {
    const action = {
      type: 'INIT_ANECDOTES',
      payload: [
        { content: 'first', id: '1', votes: 0 },
        { content: 'second', id: '2', votes: 0 }
      ]
    }

    const newState = anecdoteReducer([], action)

    expect(newState).toEqual(action.payload)
  })

  test('votes increment immutably', () => {
    const state = [
      { content: 'first', id: '1', votes: 0 },
      { content: 'second', id: '2', votes: 0 }
    ]
    const action = {
      type: 'VOTE',
      payload: { content: 'second', id: '2', votes: 1 }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toEqual([
      { content: 'first', id: '1', votes: 0 },
      { content: 'second', id: '2', votes: 1 }
    ])
  })

  test('adds anecdote without mutating state', () => {
    const state = [{ content: 'initial', id: '1', votes: 0 }]
    const action = {
      type: 'ADD_ANECDOTE',
      payload: { content: 'new', id: '2', votes: 0 }
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)

    expect(newState).toEqual([
      { content: 'initial', id: '1', votes: 0 },
      { content: 'new', id: '2', votes: 0 }
    ])
  })
})
