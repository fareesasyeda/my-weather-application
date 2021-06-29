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

//challenge 2 change name of city based on user input value
function showTemperature(response) {
  //console.log(response);
  //console.log(response.data);
  //console.log(response.data.name);
  console.log(response.data.main.temp);
  //display name that API is giving us back instead of the name that the user types
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].main;
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
  let units = "metric";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);
  console.log(axios);
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
  //}
}
let submitFormButton = document.querySelector("#submit-button");
//submit type or click type???
submitFormButton.addEventListener("click", changeCity);

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
//currentTemp.innerHTML = 29;
//}
//function convertTofahrenheitTemp(event) {
//event.preventDefault();
//let currentTemp = document.querySelector("#current-temp");
//currentTemp.innerHTML = 66;
//}
//let celciusClick = document.querySelector("#celcius-conversion");
//celciusClick.addEventListener("click", celciusTemp);
//let fahrenheitClick = document.querySelector("#fahrenheit-conversion");
//fahrenheitClick.addEventListener("click", convertTofahrenheitTemp);
