import React from 'react'

const Find = ({ searchValue, handleChangeValue }) => {
    return(
        
      <form className="filter-container">
        filter shown with: 
        <input
          type="text"
          name="name"
          value={searchValue.name}
          onChange={e => handleChangeValue(e)}                 
        />
        </form>
  
    )
}

export default Find
