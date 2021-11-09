import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(Aleatorio(0,5))
  const [votes, setVote] = useState([new Uint8Array(6)])
  
  const handleNextClick = () => {
    setSelected(Aleatorio(0,5))     
  }
  const handleVoteClick = () => {
       const votation = [...votes[0]]   
       votation[selected] +=1      
       setVote([votation])            
  }
  const PickAnect = () =>{
    const votation = [...votes[0]]
    var max = Math.max(...votation);    
    if (max > 0 ){
      let indice = votation.findIndex(anect => anect === max);      
      return (
              <div>    
           {anecdotes[indice]} has {max} votes     
        </div>
      )
    }
    return <div></div>
  }
  
  return (
    <div>
      <table>
        <tbody>
        <tr><td><Display msg='Anecdote of the day' /> </td></tr>        
          <tr><td>{props.anecdotes[selected]}</td></tr>
          <tr>
          <td>  <Button handleClick={handleVoteClick} text='Vote' />
                <Button handleClick={handleNextClick} text='Next anecdote' />
          </td>
          </tr>
          <tr><td><Display msg='Anecdote with most votes'/></td></tr>
          <tr><td><PickAnect /></td>
          </tr>          
        </tbody>
        </table>      
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const Aleatorio=(minimo,maximo)=>{
  return Math.floor((Math.random() * (maximo - minimo + 1)) + minimo);
}

const Display = (props) => {
  return (
  <h1>  
    <div>    
       {props.msg}      
    </div>
  </h1>
)
}
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)