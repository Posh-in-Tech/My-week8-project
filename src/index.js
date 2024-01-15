function refreshWeather(response) {
  let temperatureElement = document.querySelector("#temperature");
  let temperature = response.data.temperature.current;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(temperature);
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
  let windSpeedElement = document.querySelector("#windSpeed");
  windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);

  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src=${response.data.condition.icon_url} class="weather-app-icon"/>`;
  getForecast(response.data.city);
}
function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
  let apiKey = "3fbddf9ed4t6a6835a713f4c067a6o68";
  let apiURL = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  console.log(apiURL);
  axios.get(apiURL).then(refreshWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-form-input");
  searchCity(searchInput.value);
}

function formatDay(timestamp){
  let date= new Date(timestamp * 1000);
  let days=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  return days[date.getDay()];
}
function getForecast(city){
let apiKey="3fbddf9ed4t6a6835a713f4c067a6o68";
let apiUrl=`https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";
  
  response.data.daily.forEach(function(day, index){
  if (index < 5) {
  
  days.forEach(function (day) {
    forecastHtml += `

          <div class="weather-forecast-day">
            <div class="weather-forecast-date">${formatDay(day.time)}</div>
            <img src= "${day.condition.icon_url}"  class= "weather-forecast-icon"
          />
            <div class="weather-forecast-temperatures">
              <span class="weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}</span>
              <span class="weather-forecast-temperature-min">${Math.round(day.temperature.minimim)}</span>
            </div>
          </div>
    `;
  });
  }
  }
   let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}
    
let searchFormElemnt = document.querySelector("#search-form");
searchFormElemnt.addEventListener("submit", handleSearchSubmit);

searchCity("Durban");
