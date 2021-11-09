import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return <h1>{props.course}</h1>           
}

const Content = (props) => {
 return (
    <div>
      <h2>Content: </h2>
    <ul>
    {props.parts.map(note => (
          <li key = {note.names}>Chapter: {note.names} , Exercises: {note.exercises}</li>
        ))}
     </ul>
     </div>)     
}

const Total = (props) => {
  const numb=(props.parts.map(tot => Number(tot.exercises)))
  
  let tot = 0;
  tot =  numb.reduce((result,number)=> result+number);
  return (
    <div>
     <h2>Exercises: </h2>
     <ul>     
           Number of exercises: {tot}  

     </ul>
    </div> 
   )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      names: 'Fundamentals of React',
      exercises: 10
    },
    {
      names: 'Using props to pass data',
      exercises: 7
    },
    {
      names: 'State of a component',
      exercises: 14
    }
  ]    
  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )   
}

ReactDOM.render(<App />, document.getElementById('root'))