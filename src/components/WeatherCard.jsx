import React, { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import clouds from "../assets/clouds.svg"
import drizzle from "../assets/drizzle.svg"
import humidity from "../assets/humidity.svg"
import mist from "../assets/mist.svg"
import rain from "../assets/rain.svg"
import snow from "../assets/snow.svg"
import sun from "../assets/sun.svg"
import wind from "../assets/wind.svg"




const WeatherCard = () => {
const inputRef = useRef() 
  const [weatherData, setWeatherData] = useState(false)
 const allIcons = {
  "01d": sun,
  "01n": sun,
  "02d": clouds,
  "02n": clouds,
  "03d": clouds,
  "03n": clouds,
  "04d": drizzle,
  "04n": drizzle,
  "09d": rain,
  "09n": rain,
  "10d": rain,
  "10n": rain,
  "13d": snow,
  "13n": snow,
};


  const search = async (city) => {
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

      const response = await fetch(url)
      const data = await response.json();
      console.log(data)
      const icon = allIcons[data.weather[0].icon] || sun

      setWeatherData({
        humidity: data.main.humidity,
        windspeed: data.wind.speed,
        location: data.name,
        temperature: Math.floor(data.main.temp),
        icon: icon
      })

    } catch (error) {

    }
  }

  useEffect(() => {
    search("new york");
  }, [])



  return (
    <div className="min-h-screen flex items-center justify-center bg-[#d8c8ff]">
      <div className="bg-[#2584aa] from-indigo-500 to-blue-600 rounded-3xl p-6 w-80 shadow-xl text-white flex flex-col items-center">

        {/* Search Bar */}
        <div className="w-full flex items-center bg-white rounded-full px-4 py-2 mb-6">
          <input
          ref={inputRef}
            type="text"
            placeholder="Search"
            className="flex-1 text-gray-700 text-sm focus:outline-none bg-transparent"
          />
          <button onClick={() => {
            search(inputRef.current.value)
          }
          } className="text-gray-600">
            <Search size={18} />
          </button>
        </div>

        {/* Weather Icon */}
        <div className="text-6xl mb-4"><img src={weatherData.icon} alt="" /></div>

        {/* Temperature */}
        <h1 className="text-5xl font-semibold mb-2">{weatherData.temperature}°C</h1>
        <p className="text-xl font-medium">{weatherData.location}</p>

        {/* Weather Info */}
        <div className="flex justify-between w-full mt-6 text-sm text-gray-200">
          <div className="flex flex-col items-center">
            <div className="text-xl mb-1">💧</div>
            <p>{weatherData.humidity}%</p>
            <p>Humidity</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-xl mb-1">💨</div>
            <p>{weatherData.windspeed} Km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
