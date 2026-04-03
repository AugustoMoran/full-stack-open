import anecdoteService from './services/anecdotes'
import { setNotification } from './actions/notificationActions'

export const voteAnecdote = (id) => {
	return async (dispatch, getState) => {
		const anecdoteToVote = getState().anecdotes.find((a) => a.id === id)
		if (!anecdoteToVote) return
		const updatedAnecdote = await anecdoteService.update(id, {
			...anecdoteToVote,
			votes: anecdoteToVote.votes + 1
		})
		dispatch({
			type: 'VOTE',
			payload: updatedAnecdote
		})
		dispatch(setNotification(`Voted '${updatedAnecdote.content}'`, 5))
	}
}

export const createAnecdote = (content) => {
	return async (dispatch) => {
		const newAnecdote = await anecdoteService.createNew(content)
		dispatch({
			type: 'ADD_ANECDOTE',
			payload: newAnecdote
		})
		dispatch(setNotification(`Added '${newAnecdote.content}'`, 5))
	}
}

export const initializeAnecdotes = () => {
	return async (dispatch) => {
		const anecdotes = await anecdoteService.getAll()
		dispatch({
			type: 'INIT_ANECDOTES',
			payload: anecdotes
		})
	}
}