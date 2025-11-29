import { useState } from 'react'
const Display = ({counter}) =>{
  return(
  <div>{counter}</div>
)
}
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const Buton = ({click, Text}) =>{
    return(
      <button onClick={click}> {Text}</button>
    )
  }
  const handleClick = () => console.log('clicked')

  const increasiByOne =  () =>{
      handleClick()
      setCounter(counter + 1)  
      
  }
  const setToZero = () => setCounter(0)
  
  const descreasiByOne = () => {setCounter(counter - 1)}


  return (
    <div>
      <Display counter = {counter} />

      <Buton
       click={increasiByOne}
       Text={"plus"} />
      <Buton
       click={setToZero}
       Text={"zero"} />
      <Buton
       click={descreasiByOne}
       Text={"restar"} />
    </div>
  )
}

export default App