import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => {
      return (
      <h1>  
        <div>    
           {props.msg}      
        </div>
      </h1>
    )
  
}

const Statistic = (props)  => {
  const sum = props.good +  props.neutral + props.bad
  if (sum > 0) {
  const avg = (props.good - props.bad) / sum 
  const pos = (props.good * 100) / sum
  return (
    <div>
      <table>
        <tbody>
        <tr><td>Good = {props.good}</td></tr>
        <tr><td>Neutral = {props.neutral}</td></tr>
        <tr><td>Bad = {props.bad}</td></tr>
        <tr><td>All = {sum} </td></tr>
        <tr><td>Average = {avg} </td></tr>
        <tr><td>Positive = {pos} %</td></tr>
        </tbody>
       </table>
    </div>    
  )  
  }
  return (
    <div>No feedback given</div>
  ) 
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
    
  const handleGoodClick = () => {
    setGood(good + 1)
    
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }
  const handleBadClick = () => {
    setBad(bad + 1)
  }
 
  return (
    <div>
      <Display msg='Give feedback'/>   
      <Button handleClick={handleGoodClick} text='Good' />   
      <Button handleClick={handleNeutralClick} text='Neutral' /> 
      <Button handleClick={handleBadClick} text='Bad' /> 
      <Display msg='Stadistics'/>
      <Statistic good = {good} neutral = {neutral} bad = {bad} />
      
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)