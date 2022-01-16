import React, { useState, useEffect } from 'react'
import Axios from 'axios'

const ShowWeather = ({city}) => {
    const [weather, setWeather] = useState([])

    useEffect(() => {
        Axios
        .get('http://api.openweathermap.org/data/2.5/weather', {
            params: {
                q: city,
                appid: process.env.REACT_APP_WEATHER_API_KEY
            }
        })
        .then(response => {
            setWeather(response.data)
            })
    }, [city])

    if (Object.keys(weather).length > 0) {
        return (
            <div>
                <p>Sää kaupungissa {city}</p>
                <p>Lämpötila {(weather.main.temp - 273.15).toFixed(2)}°C</p>
                <img alt={`Sää kaupungissa ${city}`} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
                <p>Tuulen nopeus {weather.wind.speed}m/s suuntaan {weather.wind.deg} astetta</p>
            </div>
        )
    } else  {
        return <p>Odotetaan dataa...</p>
    }
}

const Country = ({country}) => {
    return (
        <div>
            <h2>{country.name.common}</h2>
            <h3>{country.translations.fin.common}</h3>
            <p>Pääkaupunki: {country.capital[0]}</p>
            <p>Väkimäärä: {country.population}</p>
            <ul>
                {Object.values(country.languages).map( (language, id) =>
                    <li key={id}><p>{language}</p></li>
                )}
            </ul>
            <img alt={`Maan ${country.translations.fin.common} lippu`} src={country.flags.png} />
            <ShowWeather city={country.capital[0]} />
        </div>
    )
}

export default Country