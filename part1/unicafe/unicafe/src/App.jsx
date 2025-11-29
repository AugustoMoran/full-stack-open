import { useState } from 'react'
const Display = ({counter}) => <div>{counter}</div>

const App = () => {
  const [ counter, setCounter ] = useState(0)
  console.log('rendering with counter value', counter)

  const Buton = ({onClick, Text}) => <button onClick={onClick}> {Text}</button>
  
  const handleClick = () => console.log('clicked')

  const increasiByOne =  () =>{
    console.log('increasing, value before', counter)
    handleClick()
    setCounter(counter + 1)  
      
  }
  const setToZero = () => {
    console.log('resetting to zero, value before', counter)
    setCounter(0)
  }
  
  const descreasiByOne = () => {
    console.log('decreasing, value before', counter)
    setCounter(counter - 1)}


  return (
    <div>
      <Display counter = {counter} />

      <Buton onClick={increasiByOne} Text={"plus"} />
      <Buton onClick={setToZero} Text={"zero"} />
      <Buton onClick={descreasiByOne} Text={"restar"} />
    </div>
  )
}

export default App