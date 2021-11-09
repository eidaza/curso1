import React from 'react'

const Notification = ({ message, tipmsg }) => {
  console.log(tipmsg);
  var  tipColor
  if (tipmsg === null) {
    tipColor = 'error'
  }else{
    tipColor = 'msgOk'
  }
    
  if (message === null) {
    return null
  }

  return (
    <div className= {tipColor}>
      {message}
    </div>
  )
}

export default Notification