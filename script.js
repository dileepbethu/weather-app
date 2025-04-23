const getWeatherBtn = document.getElementById('getWeatherBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');
const spinner = document.getElementById('spinner');

// Initialize map (default center to world view)
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 18,
}).addTo(map);

getWeatherBtn.addEventListener('click', async () => {
  const city = cityInput.value.trim();

  if (!city) {
    weatherResult.classList.add('hidden');
    return;
  }

  weatherResult.classList.add('hidden');
  spinner.classList.remove('hidden');

  try {
    const apiKey = '2c2a7ba6e2cd60b473cf80c9058c23c2'; // Your real API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);
    const data = await response.json();

    spinner.classList.add('hidden');

    if (data.cod === 200) {
      weatherResult.innerHTML = `
        <h2>${data.name} (${data.sys.country})</h2>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Condition: ${data.weather[0].description}</p>
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
      `;

      // 🎯 Move map to city coordinates!
      map.setView([data.coord.lat, data.coord.lon], 10);
    } else {
      weatherResult.innerHTML = `<p>City not found. Please try again.</p>`;
    }

    weatherResult.classList.remove('hidden');
  } catch (error) {
    console.error(error);
    spinner.classList.add('hidden');
    weatherResult.innerHTML = `<p>Something went wrong!</p>`;
    weatherResult.classList.remove('hidden');
  }
});
