import "./style.css";

const map = L.map("map").setView([40.76, -73.98], 15);

const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

fetch("/data.json")
  .then((response) => response.json())
  .then((json) => {
    json.forEach((item) => {
      let marker = L.marker([item.latitude, item.longitude]).addTo(map);
      marker.bindPopup(`${item.Restaurant}`);
    });
  });

const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

const restaurantName = document.getElementById("restaurant-name");
const restaurantPriceValue = document.getElementById("restaurant-price");
const restaurantFoodValue = document.getElementById("restaurant-food");
const restaurantServiceValue = document.getElementById("restaurant-service");

const error = document.getElementById("error");
const errorContainer = document.getElementById("error-container");

searchButton.addEventListener("click", () => {
  let searchValue = searchInput.value;
  fetch("/data.json")
    .then((response) => response.json())
    .then((json) => {
      json.forEach((item) => {
        if (item.Restaurant === searchValue) {
          map.setView([item.latitude, item.longitude], 18);
          restaurantName.innerText = item.Restaurant;
          restaurantPriceValue.innerText = item.Price + "$";
          restaurantFoodValue.innerText = item.Food;
          restaurantServiceValue.innerText = item.Service;
          marker.bindPopup(item.Restaurant).openPopup();
          if (errorContainer.classList.contains("hidden") === false) {
            errorContainer.classList.add("hidden");
            searchInput.classList.replace(
              "border-rose-500",
              "border-slate-600"
            );
          } else {
            console.log("error container is hidden");
          }
        } else {
          searchInput.classList.replace("border-slate-600", "border-rose-500");
          error.innerText = "Restaurant " + searchValue + " not found!";
          errorContainer.classList.remove("hidden");
        }
      });
    });
});

const priceFilter = document.getElementById("price-filter");

priceFilter.addEventListener("change", () => {
  let priceValue = priceFilter.value;
  fetch("/data.json")
    .then((response) => response.json())
    .then((json) => {
      json.forEach((item) => {
        if (item.Price === priceValue) {
          map.removeLayer(marker);
          let marker = L.marker([item.latitude, item.longitude]).addTo(map);
          marker.bindPopup(item.Restaurant).openPopup();
        }
      });
    });
});
