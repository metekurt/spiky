import React, { useState, useEffect } from "react";
import monthNames from "../constants";
import "./ForecastView.css";

const ForecastView = (props) => {
  const { weather, temp, datetime } = props.data[props.index];
  const [dayName, setDayName] = useState("");

  useEffect(() => {
    setDayName(
      datetime.split("-")[2] +
        " " +
        monthNames[parseInt(datetime.split("-")[1], 10) - 1]
    );
  }, [props]);

  return (
    <div className="forecast">
      <div className="temperature-details">
        <div>{temp}&#730;C</div>
      </div>
      <div className="forecast-details">
        <h3>{props.city}</h3>
        <p>{dayName} </p>
        <div>
          <div className="weather-icon">
            <img alt={weather.icon} src={`icons/${weather.icon}.png`}></img>
            <p>{weather["description"]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForecastView;
