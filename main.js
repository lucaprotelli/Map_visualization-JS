import "./style.css";

const map = L.map("map").setView([51.505, -0.09], 13);

const osm = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

fetch("/data.json")
  .then((response) => response.json())
  .then((json) => console.log(json));
