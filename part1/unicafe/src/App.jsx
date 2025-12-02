import { useState } from 'react'

const Header = ({text}) => (<h1>{text}</h1>)

const Button = ({onClick, text}) => (<button onClick ={onClick}>{text}</button>)

const StaticLine = ({text,value}) => (
<table>
  <tbody>
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  </tbody>
</table>
)

const Statics = ({good,neutral,bad}) => {
  const total = good + neutral + bad
  const average = (good - bad) / total
  const positive = (good / total)*100
    if (total === 0){
      return(
        <div> no feedback give </div>
      )
    }else {
       return(
        <div>
          <StaticLine text='good' value={good} />
          <StaticLine text='neutral' value={neutral} />
          <StaticLine text='bad' value={bad} />
          <StaticLine text='total' value={total} />
          <StaticLine text='average' value={average} />
          <StaticLine text='positive' value={`${positive}%`} />
        </div>
      )
    }
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const incrementGood = () => (setGood(good + 1))
  const incrementNeutral = () => (setNeutral(neutral + 1))
  const incrementBad = () => (setBad(bad + 1))
  return (
    <div>
      <Header text ='give feedback' />
      <Button onClick={incrementGood} text='good' />
      <Button onClick={incrementNeutral} text='neutral' />
      <Button onClick={incrementBad} text='bad' />
      <Header text ='status' />
      <Statics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App

