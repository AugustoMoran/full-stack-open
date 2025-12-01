import { useState } from 'react'
const History = ({allClicks}) => {
  if (allClicks.length === 0 ){
    return(
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  )
}
const Button = ({onClick, text}) => (
  <button onClick={onClick} >{text}</button>
)
const Display = ({value}) => (<div>{value}</div>)

const App = () => {
  const [left, setLeft] = useState(0)

  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])

  const [total, setTotal] = useState(0)

  const [value, setValue] = useState(10)
  
  const [getHelloMsj, setHelloMsj] = useState(null)

  const setToValue = (newValue) => () =>{
    console.log('value now', newValue)
    setValue(newValue)
  }

const hello = (who) => () => {
  console.log('hello', who)
  setHelloMsj(<p> hello {who}</p>)

  }
  
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const upDateLeft = left + 1
    setLeft(upDateLeft)
    setTotal(upDateLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const upDateRight = right + 1
    setRight(upDateRight)
    setTotal(upDateRight + left)
  }
  

  return (
    <div>
      <Display value={`left ${left}`} /> 
      <Button onClick={handleLeftClick} text='left' />
      <Button onClick={handleRightClick} text='right'/>
      <Button onClick= {hello('World')} text='hello World' />
      <Button onClick={hello('react')} text='hello React'/>
      <Display value={getHelloMsj} />
      <Button onClick={setToValue(0)} text='reset' />
      <Button onClick={setToValue(1000)} text='tousand'/>
      <Button onClick={setToValue(value + 1)} text='increment'/>
      <Display value={`right ${right}`} /> 
      <Display value= {`Total ${total}`}/>
      <Display value= {`value ${value}`} />
      <History allClicks={allClicks} />
    </div>
  )
}

export default App