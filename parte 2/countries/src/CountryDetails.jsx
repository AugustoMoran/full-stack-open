import React, { useEffect, useState } from 'react'
import './App.css'
import service from './service/service'

const CountryDetails = ({ country, onBack }) => {
  if (!country) return null

  const nativeName = country.name?.official || country.name?.common || ''

  const [weather, setWeather] = useState(null)
  const [weatherError, setWeatherError] = useState(null)

  useEffect(() => {
    setWeather(null)
    setWeatherError(null)
    const cap = country.capital ? country.capital[0] : null
    if (!cap) {
      return
    }

    service.getWeather(cap)
      .then((res) => {
        setWeather(res.data)
      })
      .catch((err) => {
        console.error('weather fetch error', err)
        setWeatherError(err.message || 'No se pudo obtener el clima')
      })
  }, [country])

  return (
    <div className="details">
      <button className="back" onClick={onBack}>← Volver</button>
      <h2>{country.name?.common || country.name}</h2>
      {country.flags ? (
        <img src={country.flags.png || country.flags.svg || country.flag} alt={`Bandera de ${country.name?.common}`} className="flag" />
      ) : null}
      <ul>
        <li><strong>Nombre oficial:</strong> {nativeName}</li>
        <li><strong>Capital:</strong> {country.capital ? country.capital.join(', ') : '—'}</li>
        <li><strong>Región:</strong> {country.region || '—'}</li>
        <li><strong>Población:</strong> {country.population?.toLocaleString() || '—'}</li>
        <li><strong>Área:</strong> {country.area ? country.area.toLocaleString() + ' km²' : '—'}</li>
        <li><strong>Idiomas:</strong> {country.languages ? Object.values(country.languages).join(', ') : '—'}</li>
        <li><strong>Moneda(s):</strong> {country.currencies ? Object.values(country.currencies).map(c=>c.name).join(', ') : '—'}</li>
        <li><strong>CCA3:</strong> {country.cca3 || '—'}</li>
      </ul>

      <section className="weather">
        <h3>Clima en {country.capital ? country.capital[0] : '—'}</h3>
        {weatherError ? <div className="error">{weatherError}</div> : null}
        {!weather && !weatherError ? <div>Cargando clima...</div> : null}
        {weather ? (
          <div>
            <div><strong>Temperatura:</strong> {Math.round(weather.main.temp)} °C</div>
            <div><strong>Viento:</strong> {weather.wind.speed} m/s</div>
            {(weather.weather && weather.weather[0]) ? (
              <div>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                <div>{weather.weather[0].description}</div>
              </div>
            ) : null}
          </div>
        ) : null}
      </section>

      <details style={{ marginTop: '1rem' }}>
        <summary style={{ cursor: 'pointer', padding: '0.5rem', fontWeight: 'bold' }}>Mostrar JSON crudo</summary>
        <pre className="raw">
{JSON.stringify(country, null, 2)}
        </pre>
      </details>
    </div>
  )
}

export default CountryDetails
