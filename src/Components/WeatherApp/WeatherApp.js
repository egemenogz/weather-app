import React, { useState, useEffect } from "react";
import "./WeatherApp.css";
import { WeatherData } from "../CityProvider/Cities";

import searchIcon from "../Assets/search.png";
import cloud from "../Assets/cloud.png";
import humi from "../Assets/humidity.png";
import wind from "../Assets/wind.png";

export const WeatherApp = () => {
  const [search, setSearch] = useState("Istanbul");
  const [weatherdata, setWeatherdata] = useState(null);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      const data = await WeatherData(search);
      console.log(data)
      setWeatherdata(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container">
      <div className="top-bar">
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div
          className="search-icon"
          onClick={() => {
            getData();
          }}
        >
          <img src={searchIcon} alt="" />
        </div>
      </div>
      {weatherdata !== null ? (
        <>
          <div className="weather-image">
            <img src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`} alt="imgicon"/>
          </div>
          <div className="weather-temp">{parseFloat(weatherdata.main.temp).toFixed(1)}°C</div>
          <div className="weather-location">{weatherdata.name}</div>
          <div className="data-container">
            <div className="element">
              <img src={humi} alt="" className="icon" />
              <div className="data">
                <div className="humidity-percent">{weatherdata.main.humidity}%</div>
                <div className="text">Humidity</div>
              </div>
            </div>
            <div className="element">
              <img src={wind} alt="" className="icon" />
              <div className="data">
                <div className="wind">{parseFloat(weatherdata.wind.speed).toFixed(1)} km/h</div>
                <div className="text">Wind Speed</div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};
