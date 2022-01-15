import React from "react";
import "./Search.css";
import searchIcon from "../../../src/search-icon.png";

const Search = (props) => {
  return (
    <div className="searchBar">
      <div>
        <input
          type="text"
          placeholder="Search City"
          maxLength="50"
          value={props.city}
          onChange={props.handleCity}
        />
        <a
          onClick={() => {
            props.fetchData();
          }}
        >
          <img src={searchIcon}></img>
        </a>
      </div>
    </div>
  );
};

export default Search;
