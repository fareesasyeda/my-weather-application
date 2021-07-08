//challenge 1: extract date into a function that can be called from anywhere in the code
function formatDate(placeHolderDate) {
  //display day
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  let currentDay = days[placeHolderDate.getDay()];
  //display month
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let currentMonth = months[placeHolderDate.getMonth()];
  //display date
  let currentDate = placeHolderDate.getDate();
  //display year
  let currentYear = placeHolderDate.getFullYear();
  //display hour, use if statement to put a 0 behind hour that is less than 10
  let currentHour = placeHolderDate.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  //display minutes
  let currentMinutes = placeHolderDate.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  //use template literal to display formatted date and time
  let dateSentence = `${currentDay}, ${currentMonth} ${currentDate}, ${currentYear}, ${currentHour}:${currentMinutes}`;
  let displayDate = document.querySelector("#change-date");
  displayDate.innerHTML = dateSentence;
}
let date = new Date();
formatDate(date);

function getForecast(coordinates) {
  console.log(coordinates.lat);
  console.log(coordinates.lon);
  let apiKey = "6cb3c244f40c2fba37f9f592c3aba492";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
}
function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Wed", "Thu", "Fri"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
        <div class="col-2 border rounded shadow">
          <div class="weather-forecast-date">
          ${day} </div>
         <img src="http://openweathermap.org/img/wn/50d@2x.png" alt="" width="36" /> <br />
          <div class ="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max">24°</span>
            <span class="weather-forecast-temperature-min"> 18°</span>
            </div>
        </div></div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

//challenge 2 change name of city based on user input value
function showTemperature(response) {
  //console.log(response);
  console.log(response.data);
  //console.log(response.data.name);
  //console.log(response.data.main.temp);
  //console.log(response.data.weather[0].icon);
  //display name that API is giving us back instead of the name that the user types
  document.querySelector("#city-name").innerHTML = response.data.name;
  fahrenheitTemperature = Math.round(response.data.main.temp);
  document.querySelector("#current-temp").innerHTML = fahrenheitTemperature;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function changeCity(event) {
  event.preventDefault();
  //?let insideSubmitFormButton = document.querySelector("#city-input-value");
  //?let insideUserCity = document.querySelector("#city-name");
  //?insideUserCity.innerHTML = insideSubmitFormButton.value;
  //searchCity(insideSubmitFormButton.value);

  //make an API call to Openweather API
  //Once I get the HTTP response, display city name and temperature
  //function searchCity(city) {
  let apiKey = "6cb3c244f40c2fba37f9f592c3aba492";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  //let cityInput = document.querySelector("#city-input-value");
  //let city = cityInput.value;
  //combining 2 steps in 1
  let city = document.querySelector("#city-input-value").value;
  //can change this to metric
  let units = "imperial";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  console.log(axios);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  //}
}

let submitFormButton = document.querySelector("#submit-button");
//submit type or click type???
submitFormButton.addEventListener("click", changeCity);

displayForecast();
//week 5
//3
//function showTemperature(response) {
//console.log(response);
//}
//1

//bonus change from celcius to fahrenheit and viceversa
//?
//function celciusTemp(event) {
//event.preventDefault();
//let currentTemp = document.querySelector("#current-temp");
//let conv = (currentTemp.value - 32) * 0.5555;
//currentTemp.innerHTML = conv;
//}
function convertToCelciusTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let celciusTemp = (fahrenheitTemperature - 32) * (5 / 9);
  currentTemp.innerHTML = Math.round(celciusTemp);
}

function convertToFahrenheitTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current-temp");
  let fahrenheitTemp = fahrenheitTemperature;
  currentTemp.innerHTML = Math.round(fahrenheitTemp);
}

let fahrenheitClick = document.querySelector("#fahrenheit-conversion");
fahrenheitClick.addEventListener("click", convertToFahrenheitTemp);

let celciusClick = document.querySelector("#celcius-conversion");
celciusClick.addEventListener("click", convertToCelciusTemp);

let fahrenheitTemperature = null;
