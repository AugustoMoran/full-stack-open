import { useDispatch } from 'react-redux'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { setNotification } from './actions/notificationActions'

const App = () => {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  const { data: anecdotes, isLoading, isError, error } = useQuery({
    queryKey: ['anecdotes'],
    queryFn: anecdoteService.getAll,
    retry: false
  })

  const createAnecdoteMutation = useMutation({
    mutationFn: anecdoteService.createNew,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch(setNotification(`Added '${newAnecdote.content}'`, 5))
    },
    onError: (mutationError) => {
      dispatch(
        setNotification(
          mutationError?.message ?? 'Failed to create anecdote',
          5
        )
      )
    }
  })

  const voteMutation = useMutation({
    mutationFn: (updatedAnecdote) =>
      anecdoteService.update(updatedAnecdote.id, updatedAnecdote),
    onSuccess: (updatedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      dispatch(setNotification(`Voted '${updatedAnecdote.content}'`, 5))
    },
    onError: (mutationError) => {
      dispatch(
        setNotification(
          mutationError?.message ?? 'Failed to send vote',
          5
        )
      )
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
  }

  const handleCreate = (content) => {
    createAnecdoteMutation.mutate(content)
  }

  if (isLoading) {
    return (
      <div>
        <h1>Anecdotes</h1>
        <Notification />
        <Filter />
        <div>loading data...</div>
      </div>
    )
  }

  if (isError) {
    return (
      <div>
        <h1>Anecdotes</h1>
        <Notification />
        <Filter />
        <div className="error">
          Anecdote service is not available due to server problems.{' '}
          {error?.message ? `(${error.message})` : ''}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdoteList anecdotes={anecdotes ?? []} onVote={handleVote} />
      <AnecdoteForm onCreate={handleCreate} />
    </div>
  )
}

export default App
