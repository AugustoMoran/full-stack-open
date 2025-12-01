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


const App = () => {
  const [left, setLeft] = useState(0)

  const [right, setRight] = useState(0)

  const [allClicks, setAll] = useState([])

  const [total, setTotal] = useState(0)

  const [value, setValue] = useState(10)
  
  const [getHelloMsj, setHelloMsj] = useState(null)

  const setToValue = (newValue) => () => {
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
      <p>left {left}</p> 
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      <button onClick= {hello('World')} >hola World</button>
      <button onClick={hello('react')}> hola react</button>
      {getHelloMsj}
      <button onClick={setToValue(0)}>restart</button>
      <button onClick={setToValue(1000)}>tousand</button>
      <button onClick={setToValue(value + 1)}>increment</button>
      <p> right {right}</p> 
      <p>Total {total}</p>
      <p>value {value}</p>
      <History allClicks={allClicks} />
    </div>
  )
}

export default App