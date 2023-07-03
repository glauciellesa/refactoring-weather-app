import Data from "./config.js";
const container = document.querySelector(".container");

const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const createElement = (element, attributes, children) => {
  const e = document.createElement(element);
  if (attributes != null) {
    for (const [key, value] of Object.entries(attributes)) {
      e.setAttribute(key, value);
    }
  }
  if (children != null) {
    for (const child of children) {
      e.appendChild(child);
    }
  }
  return e;
};

const displayData = (result) => {
  // Removing all child elements from Container before creating new set of elements
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  // Looping through 5 days of weather data
  for (let i = 0; i < 5; i++) {
    // Use the remainder operator (%) to switch from saturday (last in array) back to sunday (first in array)
    const date = new Date();

    let dayOfTheWeek = weekdays[(date.getDay() + i) % 7];

    const data = result.list[i];

    // Create the elements with Data
    const card = createElement("div", { class: "card" }, [
      createElement("div", { class: "imgBx" }, [
        createElement("img", {
          src:
            "http://openweathermap.org/img/wn/" +
            data.weather[0].icon +
            "@2x.png",
        }),
      ]),
      createElement("div", { class: "contentBx" }),
    ]);

    const contentBox = document.createElement("div");
    contentBox.classList.add("contentBx");
    card.appendChild(contentBox);

    const cardHeader = document.createElement("h2");
    cardHeader.innerHTML = dayOfTheWeek;
    contentBox.appendChild(cardHeader);

    const tempDescription = document.createElement("h4");
    tempDescription.innerHTML = data.weather[0].description;
    contentBox.appendChild(tempDescription);

    const currentTempBox = document.createElement("div");
    currentTempBox.classList.add("color");
    contentBox.appendChild(currentTempBox);

    const currentTempHeader = document.createElement("h3");
    currentTempHeader.innerHTML = "Temp:";
    currentTempBox.appendChild(currentTempHeader);

    const currentTemp = document.createElement("span");
    currentTemp.classList.add("current-temp");
    currentTemp.innerHTML = data.main.temp + "°C";
    currentTempBox.appendChild(currentTemp);

    const minMaxTemperatures = document.createElement("div");
    minMaxTemperatures.classList.add("details");
    contentBox.appendChild(minMaxTemperatures);

    const minMaxTempHeader = document.createElement("h3");
    minMaxTempHeader.innerHTML = "More:";
    minMaxTemperatures.appendChild(minMaxTempHeader);

    const minTemp = document.createElement("span");
    minTemp.classList.add("min-temp");
    minTemp.innerHTML = data.main.temp_min + "°C";
    minMaxTemperatures.appendChild(minTemp);

    const maxTemp = document.createElement("span");
    maxTemp.classList.add("max-temp");
    maxTemp.innerHTML = data.main.temp_max + "°C";
    minMaxTemperatures.appendChild(maxTemp);

    container.appendChild(card);
  }
};

const getCityLocation = async (url) => {
  const cityNameContainer = document.querySelector(".city-name");
  let coo;
  // Fetching first api to get the City coordinates
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const lon = data.city.coord.lon;
      const lat = data.city.coord.lat;
      cityNameContainer.innerHTML = data.city.name;
      console.log(lon, lat);
      coo = { lon: lon, lat: lat };
    })
    .catch((error) => {
      // If there are errors, send out an error message
      console.error("Error:", "not a place!");
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      return alert("Are you sure you aren't holding your map upside down?");
    });

  return coo;
};

const getDataWeather = async (coord) => {
  console.log(coord);
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
