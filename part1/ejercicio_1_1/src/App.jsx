import { useState } from 'react'
const Header = (props) => {
  console.log(props)
  return(
    <h1>{props.course}</h1>
  )

}
const Part = (props) => {
  console.log(props)
  return(
    <p>{props.parte.name} {props.parte.exercises}</p>
  )
}
const Content = (props) => {
  console.log(props)
  return(
    <div>
      <Part parte = {props.parte1} />
      <Part parte = {props.parte2} />
      <Part parte = {props.parte3} />
   </div> 
  )
}
const Total = (props) => {
  console.log(props)
  return(
    <>Number of exercises {props.parte1.exercises + props.parte2.exercises + props.parte3.exercises}</>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name :'Fundamentals of React',
    exercises : 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises : 7
  }
  const part3 ={
    name : 'State of a component',
    exercises : 14
  }
  return (
    <div>
      <Header course = {course} />
      <Content 
      parte1 = {part1} 
      parte2 = {part2}
      parte3 = {part3} 
      />
 
     <Total
      parte1 = {part1}
      parte2 = {part2}
      parte3 = {part3}
     />
    </div>
  )
}

export default App


