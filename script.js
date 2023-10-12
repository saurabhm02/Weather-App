const API_KEY = "2b894fd71873476c9ce210205230410";
const API_KEY2 = "88019d70248bb4ce60a400e0cb528fee";

const hamburger = document.querySelector(".hamburger");
const slidebar = document.querySelector(".slidebar");


var city = document.getElementById("city");
var state = document.getElementById("state");
var country = document.getElementById("country");
var searchCity = document.getElementById("search");
var countryFlag = document.getElementById("countryIcon");

var cityTemp = document.getElementById("temp");
var weatherIcon = document.getElementById("weather-icon");
var weatherDescription = document.getElementById("description");
var weatherPressure = document.getElementById("pressure");
var weatherVisibilty = document.getElementById("visibility");
var weatherHumidity = document.getElementById("humidity");

var sunriseTime = document.getElementById("sunrise-time");
var sunsetTime = document.getElementById("sunset-time");
var moonRise  = document.getElementById("moonrise-time");
var moonSet = document.getElementById("moonset-time");

var uviRays = document.getElementById("uvi-rays");
var uviConcernLevel = document.querySelector(".uvi-level");
var uviConcernLevel2 = document.querySelector(".uvi-level2");


var hoursIcon = document.querySelectorAll(".hourly-icon");
var hoursTemp = document.querySelectorAll(".hours-temp");


var daysIcon = document.querySelectorAll(".days-icon");
var nextDay = document.querySelectorAll(".prediction-day");
var predictionDesc = document.querySelectorAll(".prediction-desc");
var daysTemp = document.querySelectorAll(".days-temp");


var currentTime = document.querySelector(".time");
var currentDate = document.querySelector(".date");
var aqi = document.querySelector(".aqi");



var monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
var weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  slidebar.classList.toggle("active");
});

const copyright = document.getElementById("copyright");
copyright.innerHTML = new Date().getFullYear();

window.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

var response;
var data;
async function fetchWeatherReport(searchCity) {
  try{
    response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchCity}&days=7&aqi=yes&alerts=no`
    );
    data = await response.json();
  
    todayWeatherReport();
    console.log(data);
    hoursWeatherReport();
    forecastdayReport();
  }
  catch(e){
    console.log(e);
  }
}


fetchWeatherReport("phagwara");

searchCity.addEventListener("keyup", () => {
  fetchWeatherReport(searchCity.value);
});


function todayWeatherReport() {
  city.innerHTML = data?.location?.name;
  state.innerHTML = '<img src="./assets/location5.gif" height="20" style="color: white" alt="">' + data?.location?.region + ",";
  country.innerHTML = data?.location?.country;

  cityTemp.innerHTML = data?.current?.temp_c;
  weatherDescription.innerHTML = data?.current?.condition?.text;
  weatherIcon.setAttribute("src", data?.current?.condition?.icon);
  weatherPressure.innerHTML = data?.current?.pressure_mb + "mb";
  weatherVisibilty.innerHTML = data?.current?.vis_km + " km";
  weatherHumidity.innerHTML = data?.current?.humidity + "%";

  sunriseTime.innerHTML = data?.forecast?.forecastday[0]?.astro?.sunrise;
  sunsetTime.innerHTML = data?.forecast?.forecastday[0]?.astro?.sunset;
  moonRise.innerHTML = data?.forecast?.forecastday[0]?.astro?.moonrise;
  moonSet.innerHTML = data?.forecast?.forecastday[0]?.astro?.moonset;
  uviRays.innerHTML = data?.current?.uv + " UVI";
  aqi.innerHTML = Math.round(data?.current?.air_quality?.pm2_5);

  checkUVraysIndex();
  time();
}

function checkUVraysIndex() {
  let uviLevel = Number.parseInt(uviRays.textContent);
  if (uviLevel <= 2) {
    checkUviValue("Good", "#6ae17c");
  } else if (uviLevel <= 5) {
    checkUviValue("Moderate", "#CCE16A");
  } else if (uviLevel <= 7) {
    checkUviValue("Hight", "#d4b814");
  } else if (uviLevel <= 10) {
    checkUviValue("Very hight", "#d43114");
  } else {
    checkUviValue("Etreme hight", "#dc15cf");
  }
}

function checkUviValue(level, color) {
  uviConcernLevel.innerHTML = level;
  uviConcernLevel.style.backgroundColor = color;
  uviConcernLevel2.innerHTML = level;
}


function hoursWeatherReport() {
  hoursTemp.forEach((t, i) => {
    t.innerHTML = data.forecast.forecastday[0].hour[i].temp_c;
  });

  hoursIcon.forEach((t, i) => {
    t.src = data.forecast.forecastday[0].hour[i].condition.icon;
  });
}


function forecastdayReport() {
  daysIcon.forEach((icon, index) => {
    icon.src = data.forecast.forecastday[index].day.condition.icon;
  });

  daysTemp.forEach((temp, index) => {
    temp.innerHTML =
      Math.round(data.forecast.forecastday[index].day.maxtemp_c) +
      "°c" +
      `<span> / </span>` +
      Math.round(data.forecast.forecastday[index].day.mintemp_c) +
      "°c";
  });

  predictionDesc.forEach((d, index) => {
    d.innerHTML = data.forecast.forecastday[index].day.condition.text;
  });

  nextDay.forEach((day, index) => {
    let weekdate = new Date(
      data.forecast.forecastday[index + 1].date
    ).getDate();
    let weekday =
      weekDays[
        new Date(data.forecast.forecastday[index + 1].date).getDay()
      ];

    day.innerHTML = `${weekday} ${weekdate}`;
  });
}

function time() {
  var timezone = data.location.tz_id;
  var now = new Date().toLocaleTimeString("en-US", { timeZone: timezone });
  currentTime.innerHTML = now;

  var today = new Date(data.
    
    
    forecast.forecastday[0].date);
  currentDate.innerHTML = `${today.getDate()} ${
    monthName[today.getMonth()]
  } ${today.getFullYear()}, ${weekDays[today.getDay()]}`;
}

setInterval(() => {
  time();
}, 1000);


// For Dark theme













// For find Country Flag

// async function fetchSearchWeatherInfo(){
//   try{
//       const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY2}&units=metric`);
//       const data = await response.json();
//       renderWeatherInfo(data); 
//   }
//   catch(err){
//       console.log(err);
//   }
// };

// function renderWeatherInfo(weatherInfo){
//   countryFlag.innerHTML = `<img src="https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png">`; 
// };



