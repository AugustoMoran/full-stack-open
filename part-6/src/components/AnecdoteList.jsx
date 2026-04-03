import { useSelector } from 'react-redux'
import Anecdote from './Anecdote'

const AnecdoteList = ({ anecdotes, onVote }) => {
  const filter = useSelector((state) => state.filter)
  const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
  const filteredAnecdotes = sortedAnecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div>
      {filteredAnecdotes.map((anecdote) => (
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          onVote={() => onVote(anecdote)}
        />
      ))}
    </div>
  )
}

export default AnecdoteList
