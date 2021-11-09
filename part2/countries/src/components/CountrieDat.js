import React from 'react'

const CountrieDat = ({ Country, action }) => {         
  return (
    <li>
      {Country}          
      <button onClick={e => action({Country},e)}>show</button>
    </li>   
    )
}

export default CountrieDat