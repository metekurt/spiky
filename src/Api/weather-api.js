import axios from "axios";

const BASE_URL = "https://api.weatherbit.io/v2.0/forecast/daily";
const API_KEY = "23cd3312d6e84610aaba25b489730c13";

export const getWeeklyWeather = (city) => {
  return axios.get(`${BASE_URL}?&city=${city}&key=${API_KEY}`);
};
