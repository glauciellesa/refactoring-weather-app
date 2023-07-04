export const getCityLocation = async (url) => {
  const container = document.querySelector(".container");
  const cityNameContainer = document.querySelector(".city-name");
  let coordinates;
  // Fetching first api to get the City coordinates
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const lon = data.city.coord.lon;
      const lat = data.city.coord.lat;
      cityNameContainer.innerHTML = data.city.name;

      coordinates = { lon: lon, lat: lat };
    })
    .catch((error) => {
      // If there are errors, send out an error message
      console.error("Error:", "not a place!");
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
      return alert("Are you sure you aren't holding your map upside down?");
    });

  return coordinates;
};
