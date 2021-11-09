import React from "react";

const Filter = ({ searchValue, handleChangeValue }) => {
  return (
    <div>
      <form className="filter-container">
        <input
          type="text"
          name="name"
          value={searchValue.name}
          onChange={e => handleChangeValue(e)}         
        />       
      </form>
    </div>
  );
};

export default Filter;
