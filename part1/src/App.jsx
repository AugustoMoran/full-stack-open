const Hello = (props) =>{
  return (
  <> 
   <p>hello {props.name}</p>
  </>
  )
}
const Hello2 = (props) =>{
  return (
    <div>
      <p>Hello my name is {props.name} and i {props.age} years old</p>
    </div>
  )
}
const App = () => {
  console.log('hello component')
  const friends = [
    {name :'andy', age: 30},
    {name : 'ausar', age : 4}

  ]
   const now = new Date()
   const a = 10
   const b = 20
   const miNombre = 'Augusto'
   const miEdad = 29
   console.log(now, a+b)
  return (
    <div>
      <p>Hello world, it is {now.toString()}</p> 
      <p>{a} plus {b} = {a + b}</p>
      <Hello name = 'Augusto'/>
      <Hello name = 'capo'/>
      <Hello name = 'crack'/>
      <Hello2 name= 'Augusto' age= '29'/>
      <Hello2 name= {miNombre} age= {miEdad} />
      <p>mi amigo {friends[0].name} tiene {friends[0].age} anios</p>
      <p>mi hijo {friends[1].name} tiene {friends[1].age} anios</p>
    </div>
  )
}

export default App