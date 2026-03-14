import { describe, expect, test, vi, beforeEach } from 'vitest'

vi.mock('./services/anecdotes', () => ({
  __esModule: true,
  default: {
    getAll: vi.fn(),
    createNew: vi.fn(),
    update: vi.fn()
  }
}))

vi.mock('./actions/notificationActions', () => ({
  __esModule: true,
  setNotification: vi.fn((message, seconds) => ({
    type: 'MOCK_NOTIFICATION',
    payload: { message, seconds }
  }))
}))

import anecdoteService from './services/anecdotes'
import { initializeAnecdotes, createAnecdote, voteAnecdote } from './actions'
import { setNotification } from './actions/notificationActions'

describe('anecdote async actions', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('initializeAnecdotes dispatches INIT_ANECDOTES with data from service', async () => {
    const dispatch = vi.fn()
    const mockedData = [
      { id: '1', content: 'first', votes: 0 },
      { id: '2', content: 'second', votes: 0 }
    ]

    anecdoteService.getAll.mockResolvedValue(mockedData)

    await initializeAnecdotes()(dispatch)

    expect(anecdoteService.getAll).toHaveBeenCalled()
    expect(dispatch).toHaveBeenCalledWith({
      type: 'INIT_ANECDOTES',
      payload: mockedData
    })
  })

  test('createAnecdote dispatches ADD_ANECDOTE and notification', async () => {
    const dispatch = vi.fn()
    const newAnecdote = { id: '10', content: 'New', votes: 0 }

    anecdoteService.createNew.mockResolvedValue(newAnecdote)

    await createAnecdote('New')(dispatch)

    expect(anecdoteService.createNew).toHaveBeenCalledWith('New')
    expect(dispatch).toHaveBeenCalledWith({
      type: 'ADD_ANECDOTE',
      payload: newAnecdote
    })
    expect(setNotification).toHaveBeenCalledWith(`Added '${newAnecdote.content}'`, 5)
    expect(dispatch).toHaveBeenCalledWith({
      type: 'MOCK_NOTIFICATION',
      payload: { message: `Added '${newAnecdote.content}'`, seconds: 5 }
    })
  })

  test('voteAnecdote updates via service and dispatches VOTE + notification', async () => {
    const dispatch = vi.fn()
    const state = {
      anecdotes: [
        { id: '1', content: 'Learn React', votes: 0 }
      ]
    }
    const updatedAnecdote = { id: '1', content: 'Learn React', votes: 1 }

    anecdoteService.update.mockResolvedValue(updatedAnecdote)

    await voteAnecdote('1')(dispatch, () => state)

    expect(anecdoteService.update).toHaveBeenCalledWith('1', {
      id: '1',
      content: 'Learn React',
      votes: 1
    })
    expect(dispatch).toHaveBeenCalledWith({
      type: 'VOTE',
      payload: updatedAnecdote
    })
    expect(setNotification).toHaveBeenCalledWith(`Voted '${updatedAnecdote.content}'`, 5)
    expect(dispatch).toHaveBeenCalledWith({
      type: 'MOCK_NOTIFICATION',
      payload: { message: `Voted '${updatedAnecdote.content}'`, seconds: 5 }
    })
  })
})
