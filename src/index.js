let now = new Date();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[now.getDay()];
let minutes = now.getMinutes();
let hours = now.getHours();
let currentDate = document.querySelector("#date");
if (minutes < 10) {
  currentDate.innerHTML = `${day}, ${hours}:0${minutes}`;
} else {
  currentDate.innerHTML = `${day}, ${hours}:${minutes}`;
}
if (hours < 10) {
  currentDate.innerHTML = `${day}, 0${hours}:${minutes}`;
} else {
  currentDate.innerHTML = `${day}, ${hours}:${minutes}`;
}

function citySearch(event) {
  event.preventDefault();
  let input = document.querySelector("#input");
  let apiKey = "6a119ce5ad60b9883a83a56308bcd89c";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

let button = document.querySelector("#submit");
button.addEventListener("click", citySearch);

function showTemperature(result) {
  let city = document.querySelector("h1");
  let cityName = result.data.name;
  city.innerHTML = cityName;
  let temperature = Math.round(result.data.main.temp);
  let currentTemperature = document.querySelector("#degrees");
  currentTemperature.innerHTML = temperature;
  let humidityValue = result.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = humidityValue;
  let windSpeed = Math.round(result.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = windSpeed;
}

function showCurrentTemp(location) {
  let lon = location.coords.longitude;
  let lat = location.coords.latitude;
  let apiKey = "6a119ce5ad60b9883a83a56308bcd89c";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrentTemp);
}

let currentButton = document.querySelector("#current-temp");
currentButton.addEventListener("click", getCurrentPosition);
