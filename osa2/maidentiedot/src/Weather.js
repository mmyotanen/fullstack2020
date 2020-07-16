import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ capital }) => {
  const [weather, setWeather] = useState([]);
  const APIKEY = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${capital}&APPID=${APIKEY}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  }, []);

  if (weather.length === 0) {
    return null;
  }

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature: {Math.round(weather.main.temp - 273.15)} Celsius </p>

      <p>wind: {weather.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
