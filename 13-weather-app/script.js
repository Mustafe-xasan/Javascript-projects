const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherResult = document.getElementById('weatherResult');
const cityNameDisplay = document.getElementById('cityName');
const tempDisplay = document.getElementById('temperature');
const conditionDisplay = document.getElementById('condition');
const errorDisplay = document.getElementById('errorMessage');

const fetchWeather = async () => {
    const city = cityInput.value.trim();

    if (!city) {
        errorDisplay.innerText = "Please enter a city name!";
        weatherResult.style.display = "none";
        return;
    }

    try {
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`;
        const geoResponse = await fetch(geoUrl);
        const geoData = await geoResponse.json();

        if (!geoData.results || geoData.results.length === 0) {
            errorDisplay.innerText = "City not found. Try again.";
            weatherResult.style.display = "none";
            return;
        }

        const { latitude: lat, longitude: lon, name } = geoData.results[0];

        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;
        const weatherResponse = await fetch(weatherUrl);
        const weatherData = await weatherResponse.json();

        errorDisplay.innerText = "";
        weatherResult.style.display = "block";

        cityNameDisplay.innerText = name;
        tempDisplay.innerText = weatherData.current_weather.temperature;
        conditionDisplay.innerText = "Weather is looking clear!";
    } catch (err) {
        errorDisplay.innerText = "Something went wrong. Check connection.";
        weatherResult.style.display = "none";
        console.error(err);
    }
};

searchBtn.addEventListener('click', fetchWeather);

cityInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") fetchWeather();
});
