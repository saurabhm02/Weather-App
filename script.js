const API_KEY = "2f4e76d80efc4d57975123033230310";

const hamburger = document.querySelector(".hamburger");
const slidebar = document.querySelector(".slider");


var city = document.getElementById("city");
var state = document.getElementById("state");
var country = document.getElementById("country");
var searchCity = document.getElementById("search");


var cityTemp = document.getElementById("temp");
var weatherIcon = document.getElementById("weatherDesc-img");
var weatherDescription = document.getElementById("desc");
var weatherPressure = document.getElementById("pressure");
var weatherVisibilty = document.getElementById("visibility");
var weatherHumidity = document.getElementById("humidity");


var sunriseTime = document.getElementById("sunrise-time");
var sunsetTime = document.getElementById("sunset-time");
var uviRays = document.getElementById("uvi-rays");
var uviConcernLevel = document.querySelector("#uvi-lvl");
var uviConcernLevel2 = document.querySelector(".uvi-level2");


var hoursIcon = document.querySelectorAll(".hourly-img");
var hoursTemp = document.querySelectorAll(".hourly-temp");

var daysIcon = document.querySelectorAll(".days-icon");
var nextDay = document.querySelectorAll(".prediction-day");
var predictionDesc = document.querySelectorAll(".prediction-desc");
var daysTemp = document.querySelectorAll(".days-temp");

var currentTime = document.querySelector(".time");
var currentDate = document.querySelector(".date");
var aqi = document.querySelector(".Aqi");


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


async function fetchWeatherReport(searchCity){
    try{
        response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${searchCity}&days=7&aqi=yes&alerts=no`);
        data = await response.json();
        todaysWeatherReport(data);
        hoursWeatherReport(data);
        forecastdayReport(data);
        console.log(data);

    }
    catch(e){
        console.log(e);
    }
};

searchCity.addEventListener("keyup", () => {
    fetchWeatherReport(searchCity.value);
});

fetchWeatherReport("phagwara");

function todaysWeatherReport(data){
    city.innerHTML = data?.location?.name;
    state.innerHTML = '<img src="./assets/location2.gif" height="20" alt="">' + data?.location?.region;
    country.innerHTML = data?.location?.country;

    cityTemp.innerHTML = data?.current?.temp_c;
    weatherIcon.setAttribute("src", data?.current?.condition?.icon);
    weatherDescription.innerHTML = data?.current?.condition?.text;
    weatherPressure.innerHTML = data?.current?.pressure_mb + "mb";
    weatherVisibilty.innerHTML = data?.current?.vis_km + "Km";
    weatherHumidity.innerHTML = data?.current?.humidity + "%";

    sunriseTime.innerHTML = data?.forecast?.forecastday[0]?.astro?.sunrise;
    sunsetTime.innerHTML = data?.forecast?.forecastday[0]?.astro?.sunset;
    uviRays.innerHTML = data?.current?.uv + "UVI";
    aqi.innerHTML = Math.round(data?.current?.air_quality?.pm2_5);

    checkUVraysIndex();
    time();
}

function checkUVraysIndex(){
    let uviLevel = Number.parseInt(uviRays.textContent);
    if (uviLevel <= 2) {
        checkUviValue("Good", "#6ae17c");
    } 
    else if (uviLevel <= 5) {
        checkUviValue("Moderate", "#CCE16A");
    } 
    else if (uviLevel <= 7) {
        checkUviValue("High", "#d4b814");
    } 
    else if (uviLevel <= 10) {
        checkUviValue("Very high", "#d43114");
    } 
    else {
        checkUviValue("Etreme high", "#dc15cf");
    }
}

function checkUviValue(level, color) {
    uviConcernLevel.innerHTML = level;
    uviConcernLevel.style.backgroundColor = color;
    uviConcernLevel2.innerHTML = level;
}

function hoursWeatherReport(data){
    hoursTemp.forEach((t, i) => {
        t.innerHTML = data?.forecast?.forecastday[0]?.hour[i]?.temp_c;
    });

    hoursIcon.forEach((t, i) => {
        t.src = data?.forecast?.forecastday[0]?.hour[i]?.condition?.icon;
    });
};


function forecastdayReport(data){
    daysIcon.forEach((icon, i) => {
        icon.src = data?.forecast?.forecastday[i]?.day?.condition?.icon;
    });

    daysTemp.forEach((temp, i) => {
        temp.innerHTML = Math.round(data?.forecast?.forecastday[i]?.day?.maxtemp_c) +
        "°c" +
        `<span> / </span>` +
        Math.round(data?.forecast?.forecastday[i]?.day?.mintemp_c) +
        "°c";
    });

    predictionDesc.forEach((pred, i) => {
        pred.innerHTML = data?.forecast?.forecastday[i]?.day?.condition?.text;
    });

    nextDay.forEach((day, i) => {
        let weekdate = new Date(
          data?.forecast?.forecastday[i + 1]?.date
        ).getDate();
        let weekday =
          weekDays[
            new Date(data?.forecast?.forecastday[i + 1]?.date).getDay()
          ];
    
        day.innerHTML = `${weekday} ${weekdate}`;
    });
};

function time() {
    var timezone = data?.location?.tz_id;
    var now = new Date().toLocaleTimeString("en-US", { timeZone: timezone });
    currentTime.innerHTML = now;

    var today = new Date(data?.forecast?.forecastday[0]?.date);
    currentDate.innerHTML = `${today.getDate()} ${
        monthName[today.getMonth()]
    } ${today.getFullYear()}, ${weekDays[today.getDay()]}`;
}

setInterval(() => {
    time();
}, 1000);


