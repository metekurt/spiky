import React from "react";
import "./NoCityPage.css";

const NoCityPage = (props) => {
  return (
    <div>
      {props.city === "" ? (
        <div className="no-input">
          <h1>No city is selected!</h1>
          <p>Type any city name to get weekly forecast data</p>
        </div>
      ) : (
        <div className="no-city">
          <h1>City doesn't exist!</h1>
          <p>Type a valid city name to get weekly forecast data</p>
        </div>
      )}
    </div>
  );
};

export default NoCityPage;
