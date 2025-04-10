import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = 'c741be5aeb459206cd02559a1f1678f6'; // Replace this with your actual API key

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      if (!res.ok) {
        throw new Error('City not found');
      }
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchWeather();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-white mb-4">🌤️ Weather Dashboard</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Enter city name"
          className="px-4 py-2 rounded shadow text-sm"
        />
        <button
          onClick={fetchWeather}
          className="bg-white px-4 py-2 rounded shadow text-blue-600 font-semibold"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-white">Loading...</p>}
      {error && <p className="text-red-200">{error}</p>}
      {weather && <WeatherCard data={weather} />}
    </div>
  );
};

export default App;
