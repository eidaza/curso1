import React, { useState, useEffect} from "react";
import axios from 'axios'
import Countryprv from "./Countryprv";
import CountryLng from "./CountryLng";
import Weather from "./Weather";

function Country({ namecountry }) {
  const [country, setCountry] = useState([]);

  useEffect(() => {
    axios
      .get(`https://restcountries.com/v3.1/name/${namecountry}`)
      .then(response => {
        setCountry(response.data);
      });
  }, [namecountry]);

  var lengnam = Object.values(country).map(x => x.languages);
  const LangList = { ...lengnam[0] };

  return (
    <div>
      {Object.values(country).map(x => (
        <Countryprv key={x.name.common} name={x.name.common}
          capital={x.capital}
          population={x.population}
          flags={x.flags.png} />
      )
      )}
      <h3>languages</h3>
      {Object.values(LangList).map(x => (
        <CountryLng Key={x} Lang={x} />
      )
      )}
      {Object.values(country).map(x => (
        <>
          <Weather Capital={x.capital} />
        </>
      ))}
    </div>
  );
}

export default Country