// OpenWeatherMap API key (replace with your own API key)
const apiKey = 'YOUR_API_KEY'; 
const apiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Elements
const searchBtn = document.getElementById('search-btn');
const currentLocationBtn = document.getElementById('current-location-btn');
const cityInput = document.getElementById('city-input');
const locationElement = document.getElementById('location');
const descriptionElement = document.getElementById('description');
const temperatureElement = document.getElementById('temperature');
const humidityElement = document.getElementById('humidity');
const windElement = document.getElementById('wind');

// Function to fetch weather data based on city name
function fetchWeatherByCity(city) {
    const url = `${apiBaseUrl}?q=${city}&units=metric&appid=${apiKey}`;
    fetchWeatherData(url);
}

// Function to fetch weather data based on coordinates
function fetchWeatherByCoordinates(lat, lon) {
    const url = `${apiBaseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    fetchWeatherData(url);
}

// Fetch weather data from API
function fetchWeatherData(url) {
    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeatherData(data);
            } else {
                alert('City not found. Please try again.');
            }
        })
        .catch(error => {
            alert('An error occurred while fetching weather data.');
        });
}

// Display fetched weather data
function displayWeatherData(data) {
    const { name } = data;
    const { description } = data.weather[0];
    const { temp } = data.main;
    const { humidity } = data.main;
    const { speed } = data.wind;

    locationElement.textContent = `Location: ${name}`;
    descriptionElement.textContent = `Weather: ${description}`;
    temperatureElement.textContent = `Temperature: ${temp}°C`;
    humidityElement.textContent = `Humidity: ${humidity}%`;
    windElement.textContent = `Wind Speed: ${speed} m/s`;
}

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        fetchWeatherByCity(city);
    } else {
        alert('Please enter a city name.');
    }
});

// Event listener for current location button
currentLocationBtn.addEventListener('click', () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetchWeatherByCoordinates(latitude, longitude);
        }, () => {
            alert('Unable to retrieve your location.');
        });
    } else {
        alert('Geolocation is not supported by your browser.');
    }
});
