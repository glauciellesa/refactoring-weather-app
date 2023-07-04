const createTextNode = (text) => document.createTextNode(text);

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
      createElement("div", { class: "contentBx" }, [
        createElement("h2", { class: "h2" }, [createTextNode(dayOfTheWeek)]),
        createElement("h4", { class: "h4" }, [
          createTextNode(data.weather[0].description),
        ]),
        createElement("div", { class: "color" }, [
          createElement("h3", { class: "h3" }, [createTextNode("Temp:")]),
          createElement("span", { class: "current-temp" }, [
            createTextNode(data.main.temp + "°C"),
          ]),
        ]),
        createElement("div", { class: "details" }, [
          createElement("h3", { class: "minMax" }, [createTextNode("More:")]),
          createElement("span", { class: "min-temp" }, [
            createTextNode(data.main.temp_min + "°C"),
          ]),
          createElement("span", { class: "max-temp" }, [
            createTextNode(data.main.temp_max + "°C"),
          ]),
        ]),
      ]),
    ]);
    container.appendChild(card);
  }
};

export default displayData;
