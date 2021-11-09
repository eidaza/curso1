import React, { useState, useEffect, useReducer } from "react";
import Filter from "./Filter";
import CountrieDat from "./CountrieDat";
import Country from "./country";
import axios from 'axios'


const CountriesComp = () => {  
  const [countries, setCountries] = useState([]);
  const [filterInput, setFilterInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: ""      
    }
  );  
  const [showAll, setShowAll] = useState(false)
  const [CountrySH,  SetCountrySH] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {                 
        setCountries(response.data)         
      })
  }, []);

const varcount = Object.values(countries).map (x => x.name.common)

 const handleFilterCountries = event => {
    const { name, value } = event.target;
    setFilterInput({ [name]: value });
  };

  const filterCountries = list => {
    return list.filter(item => {
      return (
        item.toLowerCase().includes(filterInput.name.toLowerCase())                
      );
    });
  };
      
  const countriesList = filterCountries(varcount);
 
  const action = (event) => {
    SetCountrySH(event.Country)
    setShowAll(!showAll)  
  }

   return (
    <div>      
          <Filter
            searchValue={filterInput}
            handleChangeValue={handleFilterCountries}
          />
          <p></p>
        {countriesList.length <= 10 && countriesList.length > 1 ? (countriesList.map (x=>         
          <CountrieDat key={x} Country= {x} action = {action} showAll={showAll}/>
          ))
          : countriesList.length === 1 ? 
          (countriesList.map (x=> 
            <Country key={x} namecountry= {x}  />
          )) 
          : <h5>Too many matches, specify another filter</h5>}
          {
            showAll?
            <Country key={CountrySH} namecountry= {CountrySH} />
            :
            <p></p>
          }
    </div>
  )
};

export default CountriesComp;
