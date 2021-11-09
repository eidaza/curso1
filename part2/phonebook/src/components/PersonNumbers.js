import React from 'react'

const PersonNumbers = ({ name, number, delPersBook }) => {    
    return (
        <p> {name} 
        - {number}
        <button onClick={e => delPersBook ({name})}>Delete</button>
    
    </p>
    )
}

export default PersonNumbers