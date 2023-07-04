import Data from "./config.js";

export const getDataWeather = async (coord) => {
  let data;
  // Fetching final data according to the coordinates
  await fetch(
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
      coord.lat +
      "&lon=" +
      coord.lon +
      "&appid=" +
      Data.key
  )
    .then((response) => response.json())
    .then((result) => {
      data = result;
      console.log(
        "Welcome to this basic weather app. this is not a product but the product of an academic exercise."
      );
    });

  return data;
};
