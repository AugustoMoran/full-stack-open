import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)
  const increasiByOne =  () =>{
      handleClick()
      setCounter(counter + 1)  
      }
  const setToZero = () => setCounter(0)

  const handleClick = () => console.log('clicked')

  return (
    <div>
      <div>{counter}</div>

      <button onClick={increasiByOne}>
        plus
      </button>

      <button onClick={setToZero}>
        zero
      </button>
    </div>
  )
}

export default App