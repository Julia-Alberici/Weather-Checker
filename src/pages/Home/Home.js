import PlacesAutocomplete from "../../components/select/Select"
import "./Home.css"
import { useLoadScript } from "@react-google-maps/api"
import { useState } from "react"
import WeatherShow from "../weather-show/WeatherShow"

const libraries = ["places"]

export default function Home() {
  const [selected, setSelected] = useState(null)
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_MAPS_API_KEY,
    libraries,
  })

  return (
    <>
      <div className="nav-top">
        {selected !== null ? (
          <button onClick={() => setSelected(null)} className="icon">
            <i className="fa-solid fa-arrow-left-long"></i>
          </button>
        ) : (
          ""
        )}
      </div>
      {selected === null ? (
        <div className="select-wrapper">
          <h1 className="title">Como está o tempo hoje?</h1>
          {isLoaded === false ? (
            <div>Loading...</div>
          ) : (
            <PlacesAutocomplete setSelected={setSelected} />
          )}
        </div>
      ) : (
        <WeatherShow />
      )}
    </>
  )
}
