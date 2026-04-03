const AnecdoteForm = ({ onCreate }) => {

  const addAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    if (!content.trim()) return
    event.target.anecdote.value = ''
    onCreate(content)
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm
