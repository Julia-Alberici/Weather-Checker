import { latitude, longitude } from "../../components/select/Select"
import cloudImage from "../../assets/images/cloud.png"
import "./WeatherShow.css"
import axios from "axios"
import { useEffect, useState } from "react"

export default function WeatherShow() {
  const [weather, setWeather] = useState("loading")

  useEffect(() => {
    const infoWeather = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&lang=pt_br&units=metric`
      )
      const { data } = response
      const weather = {
        city: data.name,
        sky: data.weather[0].description,
        temp: parseInt(data.main.temp),
        maxTemp: parseInt(data.main.temp_max),
        minTemp: parseInt(data.main.temp_min),
      }
      setWeather(weather)
    }

    infoWeather()
  }, [])
  return (
    <div className="weather-wrapper">
      <h1>{weather.city}</h1>
      <p>{weather.sky}</p>
      <div className="main-degrees">
        <span>{weather.temp}°</span>
        <img src={cloudImage} alt="" />
      </div>
      <div className="max-min-wrapper">
        <p>
          max: <span>{weather.maxTemp}º</span>
        </p>
        <p>
          min: <span>{weather.minTemp}°</span>
        </p>
      </div>
    </div>
  )
}
