import { useState } from 'react'
const Button = ({onClick, text}) => (
  <button onClick={onClick}>{text}</button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  const anecdotaAleatoria = () => {
    const anecdotaElegida = (Math.floor(Math.random() * anecdotes.length))
      setSelected(anecdotaElegida)
  }
  const votar = () => {
    const copyVotes = [...votes]
      copyVotes[selected] = copyVotes[selected] + 1
      setVotes(copyVotes)
  }
    const mayorCantidadDeVotos = Math.max(...votes)
    const indexMasVotada = votes.indexOf(mayorCantidadDeVotos)
  
  return (
    <div>
      <h3>{anecdotes[selected]}</h3>
      <h3>has {votes[selected]} votes</h3>
      <Button onClick={anecdotaAleatoria} text="next anecdote"/>
      <Button onClick={votar} text="vote" />
      <h3>anecdota mas votada : {anecdotes[indexMasVotada]}</h3>
      <h3>cantidad de votos {mayorCantidadDeVotos}</h3>
    </div>
  )
}

export default App