import React from 'react'

const Countrieprv = ({name, capital, population, flags}) => {         
  return (
    <>
    <h3 >{name}</h3>
    <p>Capital: {capital}</p>
    <p>population: {population}</p>
    <img src={flags} alt={name} />
    </>
  )
}

export default Countrieprv