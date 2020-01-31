// 1. Get DOM
// // 2. Make request
// // 3. Handle response
// // 4. Display data

//get DOM nodes
var humidity = document.getElementsByClassName('humidity');
var temperature = document.getElementsByClassName('temperature');
var wind_speed = document.getElementsByClassName('wind_speed');
var pressure = document.getElementsByClassName('pressure');
var button = document.getElementById('button');
var button_city = document.getElementById('button_city');
var cityValue = document.querySelector('input');
var container = document.getElementById('container');
var containerItem = document.getElementsByClassName('container__item');
var cityName = document.getElementsByClassName('city');

//
function getCurrentPosition() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position)  {
            getRemoteDataByCoords(position.coords.latitude, position.coords.longitude);
        })
    } else {
        alert('Not available in your browser')
    }
}

function getInputValue() {
    if (cityValue.value !== '') {
        getRemoteDataByCity(cityValue.value);
        cityValue.value = '';
    } else {
        alert("Enter city!");
    }
}

function getRemoteDataByCoords(latitude, longitude) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&APPID=779f8fe9a775d15846a07933a0dd312c`)
        .then(response => response.json())
        .then(response => displayData(response, 0))
}

function getRemoteDataByCity(city) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=779f8fe9a775d15846a07933a0dd312c`)
        .then(response => response.json())
        .then(response => {
            displayData(response, 1);
            cityValue.placeholder = 'Enter city';
        })
        .catch(() => cityValue.placeholder = "Wrong city, try again")
}

//display remote data
function displayData(data, index) {
    humidity[index].querySelector('span').innerText = data.main.humidity;
    temperature[index].querySelector('span').innerText = Math.round(data.main.temp);
    wind_speed[index].querySelector('span').innerText = data.wind.speed;
    pressure[index].querySelector('span').innerText = Math.round(data.main.pressure / 1.33322);
    cityName[index].innerText = data.name;
    switch (data.weather[0].main) {
        case "Rain":
           containerItem[index].style.background = 'url("rain.jpg")';
           break;
        case "Clouds":
            containerItem[index].style.backgroundImage = 'url("clouds.jpg")';
            break;
        case "Snow":
            containerItem[index].style.backgroundImage = 'url("snow.jpg")';
            break;
        case "Clear":
            containerItem[index].style.backgroundImage = 'url("clear.jpeg")';
            break;
    }
}

function getValueFromButton() {
    button_city.querySelector('span').innerText = cityValue.value;
}

//Initialize click event to get remote data
button.addEventListener("click", getCurrentPosition);
button_city.addEventListener("click", getInputValue);
cityValue.addEventListener('input', getValueFromButton);
