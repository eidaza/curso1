import React, { useState, useEffect} from "react";
import axios from 'axios';
require('dotenv').config();

const Weather = ({ Capital }) => { 
    const [weather, setWeater] = useState([]);
    const pass = process.env.REACT_APP_API_KEY
    useEffect(() => {
        axios
          .get(`http://api.openweathermap.org/data/2.5/weather?q=${Capital}&APPID=${pass}`)
          .then(response => {
            setWeater(response.data);
          });
      }, [Capital]);
   
      var temp = weather.main;
      var speed = weather.wind;
     
    return (
        <div>
            <h3>wheater in {Capital}</h3>
            temp {temp.temp}<p></p>
            speed {speed.speed}
        </div>
        )
}

export default Weather