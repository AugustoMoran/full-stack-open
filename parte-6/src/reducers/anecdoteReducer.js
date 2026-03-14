export const initialState = []

const anecdoteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE':
      return state.map((anecdote) =>
        anecdote.id === action.payload.id ? action.payload : anecdote
      )
    case 'ADD_ANECDOTE':
      return [...state, action.payload]
    case 'INIT_ANECDOTES':
      return action.payload
    default:
      return state
  }
}

export default anecdoteReducer
