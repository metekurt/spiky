import React, { Component } from "react";
import "./App.css";
import ForecastView from "./components/ForecastView/ForecastView";
import LineChart from "./components/LineChart/LineChart";
import NoCityPage from "./components/NoCityPage/NoCityPage";
import Search from "./components/Search/Search";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import { getWeeklyWeather } from "./Api/weather-api";

class App extends Component {
  state = {
    showForecast: false,
    loading: false,
    city: "",
    cityInput: "",
    weeklyData: [],
    selectedIndex: 0,
  };

  onCityChangeHandler = (e) => {
    const city = e.target.value;
    this.setState({ city: city });
  };

  getSelectedIndex = (index) => {
    this.setState({ selectedIndex: index });
  };

  getForecast = () => {
    this.setState({ loading: true });
    const { city } = this.state;
    if (city !== "") {
      getWeeklyWeather(city).then((response) => {
        this.setState({
          selectedIndex: 0,
          loading: false,
          cityInput: response.data["city_name"],
        });
        if ((response.data.data && response.data.data.length) > 0) {
          this.setState({
            weeklyData: response.data.data
              ? response.data.data.slice(0, 7)
              : [],
            showForecast: true,
          });
        } else {
          this.setState({ showForecast: false, loading: false });
        }
      });
    } else {
      this.setState({ showForecast: false, cityInput: "", loading: false });
    }
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Weather Forecaster</h1>
        </header>
        <div className="container">
          <div className="change-location">
            <Search
              city={this.state.city}
              fetchData={this.getForecast}
              handleCity={this.onCityChangeHandler}
            />
          </div>
          {this.state.loading ? (
            <LoadingPage />
          ) : this.state.showForecast ? (
            <div>
              <div className="main d-flex flex-column">
                <div className="forecast-section">
                  <ForecastView
                    data={this.state.weeklyData}
                    city={this.state.cityInput}
                    index={this.state.selectedIndex}
                  />
                </div>
              </div>
              <div className="line-chart">
                <LineChart
                  data={this.state.weeklyData}
                  city={this.state.cityInput}
                  selectedIndex={this.getSelectedIndex}
                />
              </div>
            </div>
          ) : (
            <NoCityPage city={this.state.cityInput} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
