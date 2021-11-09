import React from 'react'

const PersonForm = ({action, handle, value, hanPho, valuePhon}) => {

  return(
    <form  onSubmit={e => action(e)}>
        <div >
          name: <input 
          value  = {value}
          onChange = {e => handle(e)}/>
        </div>
        <div >
          number: <input 
          value  = {valuePhon}
          onChange = {e => hanPho(e)}/>
        </div>
        <div>
          <button type="submit">add</button>              
        </div>                    
    </form>        
  ) 
}
    
export default PersonForm
