const apiKey = 'd155dc3e22416fa927d32b09bdf0ec35'; // Replace with your OpenWeatherMap API key

async function getWeather() {
  const city = document.getElementById('cityInput').value;
  const error = document.getElementById('errorMessage');
  const weatherBox = document.getElementById('weatherData');
  const location = document.getElementById('location');
  const description = document.getElementById('description');
  const temperature = document.getElementById('temperature');
  const icon = document.getElementById('weatherIcon');

  error.textContent = '';
  weatherBox.classList.add('hidden');

  if (!city) {
    error.textContent = 'Please enter a city name.';
    return;
  }

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );
    if (!res.ok) throw new Error('City not found');

    const data = await res.json();
    location.textContent = `${data.name}, ${data.sys.country}`;
    description.textContent = data.weather[0].description;
    temperature.textContent = `Temperature: ${data.main.temp} °C`;
    icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherBox.classList.remove('hidden');
  } catch (err) {
    error.textContent = 'Error: ' + err.message;
  }
}
