import Data from "./components/config.js";
import { getCityLocation } from "./components/getCityLocation.js";
import { getDataWeather } from "./components/getDataWeather.js";
import displayData from "./components/displayData.js";

const container = document.querySelector(".container");

window.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.querySelector("#searchBar");
  // Event will start on a keyup action
  searchBar.addEventListener("keyup", async (event) => {
    // checking the action for specific key (Enter)
    if (event.key === "Enter") {
      // Store target in variable
      const thisCity = event.target.value.toLowerCase();
      const apiUrl =
        "https://api.openweathermap.org/data/2.5/forecast/?q=" +
        thisCity +
        "&appid=" +
        Data.key;
      event.currentTarget.value = "";

      const coord = await getCityLocation(apiUrl);
      const result = await getDataWeather(coord);
      displayData(result);
    }
  });
});
