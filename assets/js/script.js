var cityInputEl = document.querySelector("#city");
var recentButtonsEl = document.querySelector("#recent-buttons");
var currentContainerEl = document.querySelector("#current-container");
var citySearchName = document.querySelector("#city-search-name");
var userFormEl = document.querySelector("#user-form");
//var lat =
//var lon =

var currentTemp = document.createElement("p");
var currentDate = document.createElement("h2");
var currentIcon = document.createElement("img");
var currentHumidity = document.createElement("p");
var currentWindSpeed = document.createElement("p");
var currentUVIndex = document.createElement("p");



var formSubmitHandler = function (event) {
    // prevent page from refreshing
    event.preventDefault();

    // get value from input element
    var city = cityInputEl.value.trim();

    if (city) {
        getLatLon(city);

        // clear old content
        currentContainerEl.textContent = "";
        cityInputEl.value = "";
    } else {
        alert("Please enter a city name");
    }
};


// retreives lat lon
var getLatLon = function (city) {
    // format the geocoding api url
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&limit=5&appid=2b1131d7b23faa62fd4da013c15d11ec";

    fetch(apiUrl).then(function (response) {
        // console.log(response);
        response.json().then(function (data) {
            // console.log(data[0].lat, data[0].lon);
            useLatLon(data[0].lat, data[0].lon, data[0].name);
        });
    });
}
// inserts lat lon into openweather api
var useLatLon = function (lat, lon, city) {

    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&units=imperial&appid=2b1131d7b23faa62fd4da013c15d11ec";

    fetch(apiUrl).then(function (response) {
        console.log(response);
        response.json().then(function (data) {
            // console.log(data);
            // console.log(city);
            renderCurrentWeather(city, data);
            fiveDayForecast(data);
        })
    })

};
// render current weather container
var renderCurrentWeather = function (cityName, cityData) {
    console.log(cityName, cityData);
    citySearchName.textContent = cityName;
    currentIcon.setAttribute("src", "http://openweathermap.org/img/w/" + cityData.current.weather[0].icon + ".png");
    currentTemp.textContent = "Temperature - " + cityData.current.temp;
    currentHumidity.textContent = "Humidity - " + cityData.current.humidity;
    currentWindSpeed.textContent = "Wind Speed - " + cityData.current.wind_speed;
    currentUVIndex.textContent = "UV Index - " + cityData.current.uvi;
    currentDate.textContent = moment().format("L");

    currentContainerEl.appendChild(currentDate);
    currentContainerEl.appendChild(currentIcon);
    currentContainerEl.appendChild(currentTemp);
    currentContainerEl.appendChild(currentWindSpeed);
    currentContainerEl.appendChild(currentHumidity);
    currentContainerEl.appendChild(currentUVIndex);

};
// render 5 day forecast container
var fiveDayForecast = function (data) {
    for (let i = 0; i < 5; i++) {
        const element = data.daily[i];
        console.log(element);
        var fiveDayTemp = document.createElement("p");
        var fiveDayWind = document.createElement("p");
        var fiveDayHumidity = document.createElement("p");
        var fiveDayIcon = document.createElement("img");
        var fiveDayDate = document.createElement("h3");

        fiveDayDate.textContent = moment().add(i + 1, "days").format("L");
        document.querySelector("#day-" + (i + 1)).append(fiveDayDate);

        fiveDayIcon.setAttribute("src", "http://openweathermap.org/img/w/" + data.daily[i].weather[0].icon + ".png");
        document.querySelector("#day-" + (i + 1)).append(fiveDayIcon);

        fiveDayTemp.textContent = "Temperature - " + data.daily[i].temp.day;
        document.querySelector("#day-" + (i + 1)).append(fiveDayTemp);

        fiveDayWind.textContent = "Wind Speed - " + data.daily[i].wind_speed;
        document.querySelector("#day-" + (i + 1)).append(fiveDayWind);

        fiveDayHumidity.textContent = "Humidity - " + data.daily[i].humidity;
        document.querySelector("#day-" + (i + 1)).append(fiveDayHumidity);
       
    }

};



userFormEl.addEventListener("submit", formSubmitHandler);
// recentButtonsEl.addEventListener("click", buttonClickHandler);

// "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely&appid=2b1131d7b23faa62fd4da013c15d11ec";